<?php
// Host chroni przed DNS rebinding, własny nagłówek przed POST z obcych stron.
$post = $_SERVER['REQUEST_METHOD'] === 'POST';
if (!in_array($_SERVER['HTTP_HOST'] ?? '', ['127.0.0.1:8003', 'localhost:8003'], true)
    || ($post && ($_SERVER['HTTP_X_INF03'] ?? '') !== '1')) { http_response_code(403); exit; }

require __DIR__ . '/sprawdz.php';
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$wyslij = function ($d, int $kod = 200) { http_response_code($kod); echo json_encode($d, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE); exit; };
$surowe = $post ? file_get_contents('php://input') : '';
$dane = $post ? json_decode($surowe, true) : null;
if ($post && !is_array($dane)) $wyslij(['blad' => 'Nieprawidłowy JSON'], 400);
$nazwa = fn($n) => is_string($n) && preg_match('/^[a-z0-9]+$/', $n) ? $n : $wyslij(['blad' => 'Nieprawidłowa nazwa'], 400);

$bladBazy = fn($e) => in_array($e->getCode(), [2002, 2003], true) ? 'Włącz MySQL w XAMPP i spróbuj ponownie.'
    : ($e->getCode() === 1045 ? 'Brak użytkownika ćwiczeń: uruchom sql/instalacja.sql.' : $e->getMessage());

switch ($_GET['co'] ?? '') {
    case 'postep':
        $plik = __DIR__ . '/dane/postep.json';
        if (!$post) { is_file($plik) ? readfile($plik) : print 'null'; exit; }
        // Zapis przez plik tymczasowy: przerwany zapis nie zniszczy postępu. Surowy tekst, bo PHP zamieniłby {} na [].
        if (file_put_contents("$plik.tmp", $surowe) === false || !rename("$plik.tmp", $plik))
            $wyslij(['blad' => 'Nie udało się zapisać postępu'], 500);
        $wyslij(['ok' => true]);
    case 'sql':
        if (!$post || !is_string($dane['sql'] ?? null) || !is_string($dane['wzor'] ?? null)) $wyslij(['blad' => 'Brak danych'], 400);
        if (trim($dane['sql']) === '') $wyslij(['ok' => false, 'powod' => 'Wpisz zapytanie.']);
        $seed = isset($dane['arkusz']) ? __DIR__ . '/arkusze/' . $nazwa($dane['arkusz']) . '/baza.sql' : __DIR__ . '/sql/sklep.sql';
        if (!is_file($seed)) $wyslij(['blad' => 'Brak bazy arkusza'], 404);
        try { $wyslij(ocen($seed, $dane)); }
        catch (mysqli_sql_exception $e) {
            $wyslij(['blad' => $bladBazy($e)], 503);
        }
    case 'uruchom': // konsola bez oceniania: jedno polecenie na świeżej bazie sklepu
        if (!$post || !is_string($dane['sql'] ?? null)) $wyslij(['blad' => 'Brak danych'], 400);
        if (trim($dane['sql']) === '') $wyslij(['powod' => 'Wpisz zapytanie.']);
        try {
            $w = wykonaj(__DIR__ . '/sql/sklep.sql', $dane['sql'], null);
            $wyslij(['kolumny' => $w['kolumny'], 'wiersze' => array_slice($w['wiersze'], 0, 100), 'zmienione' => $w['zmienione']]);
        } catch (mysqli_sql_exception $e) {
            if (in_array($e->getCode(), [2002, 2003, 1045], true)) $wyslij(['blad' => $bladBazy($e)], 503);
            $wyslij(['powod' => bladSql($e)]);
        }
    case 'php':
        if (!$post || !is_string($dane['kod'] ?? null) || !is_string($dane['wzor'] ?? null)) $wyslij(['blad' => 'Brak danych'], 400);
        if (trim($dane['kod']) === '') $wyslij(['ok' => false, 'powod' => 'Wpisz kod.']);
        try { $wyslij(ocenPhp($dane)); }
        catch (mysqli_sql_exception $e) { $wyslij(['blad' => $bladBazy($e)], 503); }
    case 'praca':
        $kat = __DIR__ . '/praca/' . $nazwa($_GET['arkusz'] ?? '');
        $pliki = [];
        foreach (is_dir($kat) ? scandir($kat) : [] as $p) {
            if (!is_file("$kat/$p") || $p[0] === '.') continue;
            $pliki[$p] = preg_match('/\.(php|html?|css|js|txt|sql)$/i', $p) ? file_get_contents("$kat/$p")
                : (preg_match('/\.(jpe?g|png|gif)$/i', $p) ? (getimagesize("$kat/$p") ?: null) : null);
        }
        $wyslij((object) $pliki);
}
$wyslij(['blad' => 'Nieznana akcja'], 404);
