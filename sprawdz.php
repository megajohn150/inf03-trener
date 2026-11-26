<?php
const BAZA = 'inf03cwiczenia';

function polacz(): mysqli
{
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $db = mysqli_init();
    $db->options(MYSQLI_OPT_LOCAL_INFILE, 0);
    $db->real_connect('localhost', BAZA, 'cwiczenia');
    $db->set_charset('utf8mb4');
    return $db;
}

function odswiez(mysqli $db, string $seed): void
{
    $db->query('DROP DATABASE IF EXISTS ' . BAZA);
    $db->query('CREATE DATABASE ' . BAZA . ' CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci');
    $db->select_db(BAZA);
    $db->multi_query(file_get_contents($seed));
    while ($db->more_results()) $db->next_result();
}

/** Wykonuje jedno polecenie na świeżej kopii danych, więc zadania nie wpływają na siebie. */
function wykonaj(string $seed, string $sql, ?string $sprawdz): array
{
    $db = polacz();
    odswiez($db, $seed);
    $db->query('SET SESSION max_statement_time=3');
    $r = $db->query($sql);
    $zmienione = $db->affected_rows;
    if ($sprawdz !== null) $r = $db->query($sprawdz);
    $wynik = $r instanceof mysqli_result
        ? ['kolumny' => array_column($r->fetch_fields(), 'name'), 'wiersze' => $r->fetch_all()]
        : ['kolumny' => null, 'wiersze' => []];
    $db->close();
    return $wynik + ['zmienione' => $zmienione];
}

function ocen(string $seed, array $z): array
{
    $sprawdz = $z['sprawdz'] ?? null;
    $wzor = wykonaj($seed, $z['wzor'], $sprawdz);
    try {
        $moje = wykonaj($seed, $z['sql'], $sprawdz);
    } catch (mysqli_sql_exception $e) {
        return ['ok' => false, 'powod' => 'Błąd SQL: ' . $e->getMessage()];
    }
    $odp = ['ok' => false, 'kolumny' => $moje['kolumny'], 'wiersze' => array_slice($moje['wiersze'], 0, 50)];
    if ($moje['kolumny'] === null) return $odp + ['powod' => 'To polecenie nie zwraca wyników, a zadanie wymaga SELECT.'];
    if (count($moje['kolumny']) !== count($wzor['kolumny']))
        return $odp + ['powod' => 'Kolumn: ' . count($moje['kolumny']) . ', a powinno być ' . count($wzor['kolumny']) . '.'];
    if (!empty($z['aliasy']) && array_map('mb_strtolower', $moje['kolumny']) !== array_map('mb_strtolower', $wzor['kolumny']))
        return $odp + ['powod' => 'Nazwy kolumn powinny brzmieć: ' . implode(', ', $wzor['kolumny']) . '.'];
    if (count($moje['wiersze']) !== count($wzor['wiersze']))
        return $odp + ['powod' => 'Wierszy: ' . count($moje['wiersze']) . ', a powinno być ' . count($wzor['wiersze']) . '.'];
    $norm = fn($w) => json_encode(array_map(fn($v) => is_numeric($v) ? round((float) $v, 6) : $v, $w), JSON_INVALID_UTF8_SUBSTITUTE);
    $a = array_map($norm, $moje['wiersze']);
    $b = array_map($norm, $wzor['wiersze']);
    $sa = $a; $sb = $b; sort($sa); sort($sb);
    if ($sa !== $sb) return $odp + ['powod' => $sprawdz ? 'Polecenie działa, ale baza po nim wygląda inaczej niż powinna.' : 'Liczba wierszy się zgadza, ale wartości są inne.'];
    if (!empty($z['kolejnosc']) && $a !== $b) return $odp + ['powod' => 'Dane są dobre, ale w złej kolejności.'];
    // shortcut: jeden zestaw danych, warunek „na sztywno” przejdzie; dodać drugi zestaw, gdy to zacznie przeszkadzać
    return ['ok' => true] + $odp;
}

/** Uruchamia kod PHP w osobnym procesie: bez dostępu do plików poza katalogiem tymczasowym, z limitem czasu. */
function uruchomPhp(string $kod, array $test, ?string $sprawdz): array
{
    $db = polacz();
    odswiez($db, __DIR__ . '/sql/sklep.sql');
    $kat = realpath(sys_get_temp_dir()) . '/inf03_' . bin2hex(random_bytes(6));
    mkdir($kat, 0700);
    file_put_contents("$kat/kod.php", $kod);
    file_put_contents("$kat/start.php", '<?php (function () { $t = json_decode(stream_get_contents(STDIN), true);
        $_POST = $t["post"] ?? []; $_GET = $t["get"] ?? []; $_COOKIE = $t["cookie"] ?? []; $_REQUEST = $_POST + $_GET;
        $_SERVER["REQUEST_METHOD"] = $_POST ? "POST" : "GET"; })();');
    foreach ($test['pliki'] ?? [] as $n => $tresc) file_put_contents("$kat/" . basename($n), $tresc);
    $opcje = ['display_errors' => '1', 'html_errors' => '0', 'log_errors' => '0', 'error_reporting' => (string) E_ALL, 'max_execution_time' => '4', 'memory_limit' => '64M',
        'open_basedir' => $kat, 'session.save_path' => $kat, 'allow_url_fopen' => '0', 'auto_prepend_file' => "$kat/start.php", 'output_buffering' => '65536',
        'disable_functions' => 'exec,shell_exec,system,passthru,popen,proc_open,pcntl_exec,pcntl_fork,mail,putenv,dl,ini_set,set_time_limit'];
    $cmd = [PHP_BINARY];
    foreach ($opcje as $o => $w) array_push($cmd, '-d', "$o=$w");
    $cmd[] = "$kat/kod.php";
    $proc = proc_open($cmd, [['pipe', 'r'], ['file', "$kat/.wyjscie", 'w'], ['file', "$kat/.wyjscie", 'a']], $rury, $kat);
    fwrite($rury[0], json_encode($test));
    fclose($rury[0]);
    $koniec = microtime(true) + 5;
    $czas = false;
    while (($s = proc_get_status($proc))['running']) {
        if (microtime(true) > $koniec || filesize("$kat/.wyjscie") > 200000) { proc_terminate($proc, 9); $czas = true; break; }
        usleep(5000);
        clearstatcache();
    }
    proc_close($proc);
    $wyjscie = file_get_contents("$kat/.wyjscie", false, null, 0, 20000);
    $pliki = [];
    foreach (array_diff(scandir($kat), ['.', '..']) as $p) {
        if (isset($test['pliki'][$p])) $pliki[$p] = file_get_contents("$kat/$p");
        if (is_file("$kat/$p")) unlink("$kat/$p");
    }
    @rmdir($kat);
    $stan = [];
    if ($sprawdz !== null) { $db->select_db(BAZA); $stan = $db->query($sprawdz)->fetch_all(); }
    $db->close();
    return ['wyjscie' => str_replace(["$kat/", $kat], ['', '.'], $wyjscie), 'stan' => $stan, 'pliki' => $pliki, 'czas' => $czas];
}

function ocenPhp(array $z): array
{
    // Ćwiczenia działają na osobnej bazie; konto root sięgnęłoby prawdziwych danych.
    if (preg_match('/[\'"]root[\'"]/i', $z['kod'])) return ['ok' => false, 'powod' => 'W ćwiczeniach łącz się jako inf03cwiczenia (dane w lekcji), nie jako root.'];
    $norm = fn($s) => trim(preg_replace(['/\s+/u', '/>\s+</', '/\s*(<br)\s*\/?>\s*/i'], [' ', '><', '<br>'], str_replace("'", '"', $s)));
    foreach (($z['testy'] ?? []) ?: [[]] as $t) {
        $wzor = uruchomPhp($z['wzor'], $t, $z['sprawdz'] ?? null);
        $moje = uruchomPhp($z['kod'], $t, $z['sprawdz'] ?? null);
        $odp = ['ok' => false, 'wyjscie' => $moje['wyjscie'], 'oczekiwane' => $wzor['wyjscie'], 'dane' => $t ? json_encode($t, JSON_UNESCAPED_UNICODE) : null];
        if ($moje['czas']) return $odp + ['powod' => 'Skrypt działał za długo. Sprawdź warunek pętli.'];
        if ($norm($moje['wyjscie']) !== $norm($wzor['wyjscie'])) return $odp + ['powod' => preg_match('/(Parse|Fatal) error|Warning:/', $moje['wyjscie']) ? 'Skrypt zgłasza błąd.' : 'Wynik jest inny niż oczekiwany.'];
        if ($moje['stan'] !== $wzor['stan']) return $odp + ['powod' => 'Wynik jest dobry, ale baza wygląda inaczej niż powinna.'];
        if ($moje['pliki'] !== $wzor['pliki']) return $odp + ['powod' => 'Zawartość pliku jest inna niż powinna.'];
    }
    if (!empty($z['musi']) && !preg_match('/' . $z['musi'] . '/i', $z['kod'])) return ['ok' => false, 'powod' => $z['musiOpis']];
    return ['ok' => true, 'wyjscie' => $moje['wyjscie']];
}
