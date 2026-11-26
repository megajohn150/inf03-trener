<?php // Uruchamia test.sh. Każdy wzór musi przejść, każdy typowy błąd i SELECT 1 muszą odpaść.
require __DIR__ . '/../sprawdz.php';
$zle = 0; $n = 0;
$php = false;
foreach (json_decode(stream_get_contents(STDIN), true, 512, JSON_THROW_ON_ERROR) as $z) {
    $seed = __DIR__ . '/..' . ($z['seed'] ?? '/sql/sklep.sql');
    foreach ([[$z['wzor'], true], [$z['zle'], false], [$php ? '<?php echo 1;' : 'SELECT 1', false]] as [$sql, $ma]) {
        $n++;
        if ($php = ($z['typ'] ?? '') === 'php') {
            $o = ['ok' => true];
            foreach ($z['zamien'] ?? [null] as $v) {
                $zm = fn($s) => $v === null ? $s : preg_replace('/=\s*' . $z['zamien'][0] . '\s*;/', "= $v;", $s, 1);
                $o = ocenPhp(['kod' => $zm($sql), 'wzor' => $zm($z['wzor'])] + $z);
                if (!$o['ok']) break;
            }
        } else $o = ocen($seed, ['sql' => $sql] + $z);
        if ($o['ok'] !== $ma) { $zle++; echo "BŁĄD {$z['id']}: $sql → ", $o['powod'] ?? 'przeszło', "\n"; }
    }
}
echo "Sprawdzeń: $n, błędów: $zle\n";
exit($zle ? 1 : 0);
