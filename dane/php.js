const POLACZ = "mysqli_connect('localhost', 'inf03cwiczenia', 'cwiczenia', 'inf03cwiczenia')";
const PHP = [
{ id: 'php-podstawy', tytul: 'Zmienne, echo i warunki', lekcja: `
<p>Kod PHP piszesz między <code>&lt;?php</code> a <code>?&gt;</code>. Serwer wykonuje go, zanim strona trafi do przeglądarki, więc użytkownik widzi tylko wynik.</p>
<pre>&lt;?php
$imie = 'Ola';            // zmienna zawsze zaczyna się od $
$wiek = 17;
echo "Cześć, $imie!";     // w cudzysłowie zmienne są podstawiane
echo 'Masz ' . $wiek . ' lat';  // kropka łączy napisy
if ($wiek &gt;= 18) {
    echo 'pełnoletnia';
} elseif ($wiek &gt;= 16) {
    echo 'prawie';
} else {
    echo 'niepełnoletnia';
}
?&gt;</pre>
<ul><li>Każda instrukcja kończy się średnikiem.</li><li>W apostrofach <code>'$imie'</code> zmienna <b>nie</b> jest podstawiana.</li><li>Porównanie: <code>==</code> (wartość), <code>===</code> (wartość i typ); reszta z dzielenia: <code>%</code>.</li><li>Nowa linia w HTML to <code>&lt;br&gt;</code>, nie <code>\\n</code>.</li></ul>`,
  zadania: [
  { id: 'php1', t: 'Zapisz w zmiennej $miasto napis Gdańsk i wypisz: Mieszkam w Gdańsk', wzor: "<?php $miasto = 'Gdańsk'; echo \"Mieszkam w $miasto\";", zle: "<?php $miasto = 'Gdańsk'; echo 'Mieszkam w $miasto';", start: '<?php\n', musi: '\\$miasto', musiOpis: 'Użyj zmiennej $miasto.', pod: 'Cudzysłów podstawia zmienne, apostrof nie.' },
  { id: 'php2', t: 'Zmienne $a = 7 i $b = 3. Wypisz ich sumę, iloczyn i resztę z dzielenia $a przez $b, oddzielone spacjami (wynik: 10 21 1).', wzor: "<?php $a = 7; $b = 3; echo ($a + $b) . ' ' . ($a * $b) . ' ' . ($a % $b);", zle: "<?php $a = 7; $b = 3; echo ($a + $b) . ' ' . ($a * $b) . ' ' . ($a / $b);", start: '<?php\n$a = 7;\n$b = 3;\n', pod: 'Reszta z dzielenia to %.' },
  { id: 'php3', t: 'Zmienna $liczba = 14. Wypisz „parzysta” albo „nieparzysta”. Sprawdzimy też inne wartości.', wzor: "<?php $liczba = 14; echo $liczba % 2 == 0 ? 'parzysta' : 'nieparzysta';", zle: "<?php $liczba = 14; echo 'parzysta';", start: '<?php\n$liczba = 14;\n', zamien: ['14', '9'], pod: 'Liczba parzysta ma resztę 0 z dzielenia przez 2.' },
  { id: 'php4', t: 'Zmienna $punkty = 31 (na 40). Wypisz „zdane”, gdy to co najmniej 75%, w przeciwnym razie „niezdane”.', wzor: "<?php $punkty = 31; if ($punkty / 40 >= 0.75) echo 'zdane'; else echo 'niezdane';", zle: "<?php $punkty = 31; if ($punkty / 40 > 0.75) echo 'zdane'; else echo 'niezdane';", start: '<?php\n$punkty = 31;\n', zamien: ['31', '30', '29'], pod: '75% z 40 to 30 punktów. „Co najmniej” obejmuje 30.' },
  { id: 'php5', t: 'Zmienna $godzina = 14. Wypisz „Dzień dobry” dla godzin 6–17, „Dobry wieczór” dla 18–21, a dla pozostałych „Dobranoc”.', wzor: "<?php $godzina = 14; if ($godzina >= 6 && $godzina <= 17) echo 'Dzień dobry'; elseif ($godzina >= 18 && $godzina <= 21) echo 'Dobry wieczór'; else echo 'Dobranoc';", zle: "<?php $godzina = 14; if ($godzina >= 6 && $godzina <= 17) echo 'Dzień dobry'; else echo 'Dobry wieczór';", start: '<?php\n$godzina = 14;\n', zamien: ['14', '6', '18', '21', '23', '3'], pod: 'if, elseif, else oraz &&.' } ] },
{ id: 'php-petle', tytul: 'Pętle i tablice', lekcja: `
<pre>&lt;?php
for ($i = 1; $i &lt;= 5; $i++) echo $i . ' ';      // 1 2 3 4 5

$owoce = ['jabłko', 'gruszka', 'śliwka'];
echo $owoce[0];             // jabłko (liczymy od zera)
echo count($owoce);         // 3
$owoce[] = 'wiśnia';        // dopisanie na końcu
foreach ($owoce as $owoc) echo "&lt;li&gt;$owoc&lt;/li&gt;";

$ceny = ['chleb' =&gt; 4.5, 'mleko' =&gt; 3.2];   // tablica asocjacyjna
foreach ($ceny as $nazwa =&gt; $cena) echo "$nazwa: $cena zł&lt;br&gt;";
?&gt;</pre>
<ul><li><code>while ($warunek) { … }</code> działa, dopóki warunek jest prawdziwy.</li><li>Wiersz z bazy (<code>mysqli_fetch_assoc</code>) to właśnie tablica asocjacyjna.</li><li>W napisie w cudzysłowie element tablicy zapisuj w klamrach: <code>"{$w['nazwa']}"</code>.</li></ul>`,
  zadania: [
  { id: 'php6', t: 'Wypisz liczby od 10 do 1 oddzielone spacjami.', wzor: "<?php for ($i = 10; $i >= 1; $i--) echo $i . ' ';", zle: "<?php for ($i = 10; $i > 1; $i--) echo $i . ' ';", start: '<?php\n', pod: 'Pętla for z $i-- i warunkiem >= 1.' },
  { id: 'php7', t: 'Policz sumę liczb od 1 do 100 pętlą i wypisz ją.', wzor: '<?php $suma = 0; for ($i = 1; $i <= 100; $i++) $suma += $i; echo $suma;', zle: '<?php $suma = 0; for ($i = 1; $i < 100; $i++) $suma += $i; echo $suma;', start: '<?php\n', musi: 'for|while', musiOpis: 'Użyj pętli.', pod: '$suma += $i dodaje do sumy.' },
  { id: 'php8', t: 'Wypisz elementy tablicy $dni jako listę punktowaną (ul i li).', wzor: "<?php $dni = ['pon', 'wt', 'śr']; echo '<ul>'; foreach ($dni as $d) echo \"<li>$d</li>\"; echo '</ul>';", zle: "<?php $dni = ['pon', 'wt', 'śr']; foreach ($dni as $d) echo \"<li>$d</li>\";", start: "<?php\n$dni = ['pon', 'wt', 'śr'];\n", pod: '<ul> przed pętlą, </ul> po niej.' },
  { id: 'php9', t: 'Dla tablicy $oceny wypisz średnią zaokrągloną do 2 miejsc (funkcje array_sum, count, round).', wzor: '<?php $oceny = [5, 4, 3, 5, 6, 2]; echo round(array_sum($oceny) / count($oceny), 2);', zle: '<?php $oceny = [5, 4, 3, 5, 6, 2]; echo round(array_sum($oceny) / 5, 2);', start: '<?php\n$oceny = [5, 4, 3, 5, 6, 2];\n', pod: 'Dziel przez count, nie przez wpisaną liczbę.' },
  { id: 'php10', t: 'Tablica $ceny ma pary produkt => cena. Wypisz w osobnych akapitach „produkt: cena zł” tylko dla cen powyżej 5.', wzor: "<?php $ceny = ['chleb' => 4.5, 'masło' => 7.99, 'ser' => 12, 'woda' => 2]; foreach ($ceny as $p => $c) if ($c > 5) echo \"<p>$p: $c zł</p>\";", zle: "<?php $ceny = ['chleb' => 4.5, 'masło' => 7.99, 'ser' => 12, 'woda' => 2]; foreach ($ceny as $p => $c) echo \"<p>$p: $c zł</p>\";", start: "<?php\n$ceny = ['chleb' => 4.5, 'masło' => 7.99, 'ser' => 12, 'woda' => 2];\n", pod: 'foreach ($ceny as $produkt => $cena) i if w środku.' } ] },
{ id: 'php-funkcje', tytul: 'Funkcje i napisy', lekcja: `
<pre>&lt;?php
function brutto($netto, $vat = 23) {
    return round($netto * (1 + $vat / 100), 2);
}
echo brutto(100);        // 123
echo brutto(100, 8);     // 108
?&gt;</pre>
<table><tr><th>Napisy</th><td><code>strlen</code> (bajty), <code>mb_strlen</code> (znaki), <code>strtoupper</code>, <code>mb_strtoupper</code>, <code>ucfirst</code>, <code>substr</code>, <code>str_replace</code>, <code>trim</code>, <code>explode</code>, <code>implode</code></td></tr>
<tr><th>Liczby</th><td><code>round</code>, <code>floor</code>, <code>ceil</code>, <code>number_format($x, 2, ',', ' ')</code>, <code>rand</code>, <code>intval</code></td></tr>
<tr><th>Tablice</th><td><code>count</code>, <code>sort</code>, <code>rsort</code>, <code>in_array</code>, <code>array_sum</code>, <code>max</code>, <code>min</code></td></tr></table>
<p>Dla polskich liter używaj wersji <code>mb_</code>, bo litera „ą” zajmuje 2 bajty.</p>`,
  zadania: [
  { id: 'php11', t: 'Napisz funkcję pole($a, $b) zwracającą pole prostokąta i wypisz pole(4, 6).', wzor: '<?php function pole($a, $b) { return $a * $b; } echo pole(4, 6);', zle: '<?php function pole($a, $b) { return 2 * ($a + $b); } echo pole(4, 6);', start: '<?php\n', musi: 'function\\s+pole', musiOpis: 'Zdefiniuj funkcję pole.', pod: 'return zwraca wynik, echo go wypisuje.' },
  { id: 'php12', t: 'Wypisz napis $s wielkimi literami (z polskimi znakami).', wzor: "<?php $s = 'zażółć gęślą jaźń'; echo mb_strtoupper($s);", zle: "<?php $s = 'zażółć gęślą jaźń'; echo strtoupper($s);", start: "<?php\n$s = 'zażółć gęślą jaźń';\n", pod: 'strtoupper nie zna polskich liter.' },
  { id: 'php13', t: 'Zamień w $zdanie każde „kot” na „pies” i wypisz wynik.', wzor: "<?php $zdanie = 'kot ma kota, a kot śpi'; echo str_replace('kot', 'pies', $zdanie);", zle: "<?php $zdanie = 'kot ma kota, a kot śpi'; echo str_replace('kot ', 'pies ', $zdanie);", start: "<?php\n$zdanie = 'kot ma kota, a kot śpi';\n", pod: 'str_replace(szukane, nowe, napis).' },
  { id: 'php14', t: 'Wypisz kwotę $kwota w formacie 12 345,68 (spacja co tysiąc, przecinek, 2 miejsca).', wzor: "<?php $kwota = 12345.678; echo number_format($kwota, 2, ',', ' ');", zle: '<?php $kwota = 12345.678; echo round($kwota, 2);', start: '<?php\n$kwota = 12345.678;\n', pod: 'number_format(liczba, miejsca, przecinek, separator tysięcy).' },
  { id: 'php15', t: 'Napis $lista to imiona po przecinku. Wypisz je posortowane alfabetycznie i połączone „ | ”.', wzor: "<?php $lista = 'Ola,Adam,Zenon,Bartek'; $t = explode(',', $lista); sort($t); echo implode(' | ', $t);", zle: "<?php $lista = 'Ola,Adam,Zenon,Bartek'; $t = explode(',', $lista); echo implode(' | ', $t);", start: "<?php\n$lista = 'Ola,Adam,Zenon,Bartek';\n", pod: 'explode, sort, implode.' } ] },
{ id: 'php-formularze', tytul: 'Formularze: $_POST i $_GET', lekcja: `
<p>Po wysłaniu formularza wartości pól trafiają do tablicy <code>$_POST</code> (metoda post) albo <code>$_GET</code> (metoda get). Kluczem jest atrybut <code>name</code> pola.</p>
<pre>&lt;form method="post"&gt;
  &lt;input type="number" name="ilosc"&gt;
  &lt;button&gt;Oblicz&lt;/button&gt;
&lt;/form&gt;
&lt;?php
if (!empty($_POST['ilosc'])) {             // tylko gdy pole wypełnione
    $ilosc = $_POST['ilosc'];
    echo 'Do zapłaty: ' . $ilosc * 12 . ' zł';
}
?&gt;</pre>
<ul><li>Przy pierwszym wejściu na stronę <code>$_POST</code> jest pusta, więc <b>zawsze</b> sprawdzaj <code>isset</code> albo <code>empty</code>.</li><li><code>empty</code> uzna też <code>"0"</code> za puste. Jeśli zero ma sens, użyj <code>isset</code> i porównania z <code>''</code>.</li><li>Bez <code>action</code> formularz wysyła dane do tej samej strony.</li><li>Tekst od użytkownika wypisuj przez <code>htmlspecialchars</code>, żeby nikt nie wstrzyknął HTML.</li></ul>`,
  zadania: [
  { id: 'php16', t: 'Pole imie przychodzi metodą POST. Wypisz „Witaj, IMIĘ!”, a gdy pola brak lub jest puste, nic nie wypisuj.', wzor: "<?php if (!empty($_POST['imie'])) echo 'Witaj, ' . $_POST['imie'] . '!';", zle: "<?php echo 'Witaj, ' . ($_POST['imie'] ?? '') . '!';", start: '<?php\n', testy: [{ post: { imie: 'Ola' } }, { post: {} }, { post: { imie: '' } }], pod: 'if (!empty($_POST[\'imie\'])).' },
  { id: 'php17', t: 'Pola a i b (POST) to liczby. Wypisz ich sumę.', wzor: "<?php if (isset($_POST['a'], $_POST['b'])) echo $_POST['a'] + $_POST['b'];", zle: "<?php if (isset($_POST['a'], $_POST['b'])) echo $_POST['a'] . $_POST['b'];", start: '<?php\n', testy: [{ post: { a: '2', b: '3' } }, { post: { a: '10', b: '-4' } }, { post: {} }], pod: 'Plus dodaje, kropka skleja.' },
  { id: 'php18', t: 'Pole wiek (POST). Wypisz „pełnoletni”, gdy wiek to co najmniej 18, inaczej „niepełnoletni”. Bez pola nic nie wypisuj.', wzor: "<?php if (isset($_POST['wiek']) && $_POST['wiek'] !== '') echo $_POST['wiek'] >= 18 ? 'pełnoletni' : 'niepełnoletni';", zle: "<?php if (!empty($_POST['wiek'])) echo $_POST['wiek'] > 18 ? 'pełnoletni' : 'niepełnoletni';", start: '<?php\n', testy: [{ post: { wiek: '18' } }, { post: { wiek: '17' } }, { post: {} }], pod: '„Co najmniej” to >=.' },
  { id: 'php19', t: 'Parametr strona w adresie (GET). Wypisz „Strona: N”, a bez parametru „Strona: 1”.', wzor: "<?php echo 'Strona: ' . ($_GET['strona'] ?? 1);", zle: "<?php echo 'Strona: ' . $_GET['strona'];", start: '<?php\n', testy: [{ get: { strona: '3' } }, { get: {} }], pod: 'Operator ?? daje wartość zastępczą.' },
  { id: 'php20', t: 'Pole komentarz (POST) wypisz w akapicie tak, żeby wpisany HTML wyświetlił się jako tekst.', wzor: "<?php if (!empty($_POST['komentarz'])) echo '<p>' . htmlspecialchars($_POST['komentarz']) . '</p>';", zle: "<?php if (!empty($_POST['komentarz'])) echo '<p>' . $_POST['komentarz'] . '</p>';", start: '<?php\n', testy: [{ post: { komentarz: '<b>Super</b> & tanio' } }, { post: {} }], pod: 'htmlspecialchars zamienia < na &lt;.' } ] },
{ id: 'php-baza', tytul: 'Baza danych: odczyt (mysqli)', lekcja: `
<p>Schemat jest zawsze ten sam: połącz, wyślij zapytanie, pobieraj wiersze w pętli, zamknij połączenie.</p>
<pre>&lt;?php
$polaczenie = ${POLACZ};
$wynik = mysqli_query($polaczenie, 'SELECT imie, nazwisko FROM klienci');
while ($wiersz = mysqli_fetch_assoc($wynik)) {
    echo "&lt;li&gt;{$wiersz['imie']} {$wiersz['nazwisko']}&lt;/li&gt;";
}
mysqli_close($polaczenie);
?&gt;</pre>
<ul><li><b>Na egzaminie:</b> <code>mysqli_connect('localhost', 'root', '', 'nazwa_bazy')</code>. <b>Tutaj</b> ćwiczysz na bazie <code>inf03cwiczenia</code>, użytkownik <code>inf03cwiczenia</code>, hasło <code>cwiczenia</code>.</li><li><code>mysqli_fetch_assoc</code> daje <code>$w['kolumna']</code>, <code>mysqli_fetch_row</code> daje <code>$w[0]</code>.</li><li><code>mysqli_num_rows($wynik)</code> zwraca liczbę wierszy.</li><li>Kryterium egzaminu: ostatnią operacją na bazie jest jej zamknięcie.</li></ul>
<p>Tabele: klienci (id, imie, nazwisko, miasto, rok_urodzenia), produkty (id, nazwa, kategoria, cena, ilosc), zamowienia (id, klient_id, data_zam, status), pozycje (id, zamowienie_id, produkt_id, sztuk).</p>`,
  zadania: [
  { id: 'php21', t: 'Połącz się z bazą ćwiczeń i wypisz nazwy wszystkich produktów, każdą w osobnym akapicie. Zamknij połączenie.', wzor: `<?php $p = ${POLACZ}; $w = mysqli_query($p, 'SELECT nazwa FROM produkty'); while ($r = mysqli_fetch_assoc($w)) echo "<p>{$r['nazwa']}</p>"; mysqli_close($p);`, zle: `<?php $p = ${POLACZ}; $w = mysqli_query($p, 'SELECT nazwa FROM produkty'); $r = mysqli_fetch_assoc($w); echo "<p>{$r['nazwa']}</p>"; mysqli_close($p);`, start: `<?php\n$polaczenie = ${POLACZ};\n`, musi: 'mysqli_close|->close', musiOpis: 'Zamknij połączenie.', pod: 'Pętla while z mysqli_fetch_assoc.' },
  { id: 'php22', t: 'Wypisz tabelę HTML z imieniem i nazwiskiem klientów z Krakowa (jeden klient na wiersz tr).', wzor: `<?php $p = ${POLACZ}; $w = mysqli_query($p, "SELECT imie, nazwisko FROM klienci WHERE miasto = 'Kraków'"); echo '<table>'; while ($r = mysqli_fetch_row($w)) echo "<tr><td>$r[0]</td><td>$r[1]</td></tr>"; echo '</table>'; mysqli_close($p);`, zle: `<?php $p = ${POLACZ}; $w = mysqli_query($p, "SELECT imie, nazwisko FROM klienci"); echo '<table>'; while ($r = mysqli_fetch_row($w)) echo "<tr><td>$r[0]</td><td>$r[1]</td></tr>"; echo '</table>'; mysqli_close($p);`, start: `<?php\n$polaczenie = ${POLACZ};\n`, pod: '<table> przed pętlą, <tr><td>…</td></tr> w pętli.' },
  { id: 'php23', t: 'Wypisz „Produktów niedostępnych: N”, gdzie N to liczba produktów o ilości 0. Użyj mysqli_num_rows.', wzor: `<?php $p = ${POLACZ}; $w = mysqli_query($p, 'SELECT id FROM produkty WHERE ilosc = 0'); echo 'Produktów niedostępnych: ' . mysqli_num_rows($w); mysqli_close($p);`, zle: `<?php $p = ${POLACZ}; $w = mysqli_query($p, 'SELECT id FROM produkty'); echo 'Produktów niedostępnych: ' . mysqli_num_rows($w); mysqli_close($p);`, start: `<?php\n$polaczenie = ${POLACZ};\n`, musi: 'mysqli_num_rows|num_rows', musiOpis: 'Użyj mysqli_num_rows.', pod: 'mysqli_num_rows($wynik).' },
  { id: 'php24', t: 'Pole kategoria (POST). Wypisz listę ul z nazwami i cenami produktów z tej kategorii w formacie „nazwa – cena zł”. Użyj zapytania przygotowanego.', wzor: `<?php if (!empty($_POST['kategoria'])) { $p = ${POLACZ}; $z = mysqli_prepare($p, 'SELECT nazwa, cena FROM produkty WHERE kategoria = ?'); mysqli_stmt_bind_param($z, 's', $_POST['kategoria']); mysqli_stmt_execute($z); $w = mysqli_stmt_get_result($z); echo '<ul>'; while ($r = mysqli_fetch_assoc($w)) echo "<li>{$r['nazwa']} – {$r['cena']} zł</li>"; echo '</ul>'; mysqli_close($p); }`, zle: `<?php if (!empty($_POST['kategoria'])) { $p = ${POLACZ}; $w = mysqli_query($p, 'SELECT nazwa, cena FROM produkty'); echo '<ul>'; while ($r = mysqli_fetch_assoc($w)) echo "<li>{$r['nazwa']} – {$r['cena']} zł</li>"; echo '</ul>'; mysqli_close($p); }`, start: '<?php\n', testy: [{ post: { kategoria: 'kable' } }, { post: { kategoria: 'monitory' } }, { post: { kategoria: "x' OR '1'='1" } }], pod: 'mysqli_prepare, mysqli_stmt_bind_param, mysqli_stmt_execute, mysqli_stmt_get_result.' },
  { id: 'php25', t: 'Wypisz w akapicie łączną wartość zamówienia nr 3 (suma sztuk razy cena) w formacie „Razem: X zł”. Policz to w SQL.', wzor: `<?php $p = ${POLACZ}; $w = mysqli_query($p, 'SELECT SUM(x.sztuk * p.cena) FROM pozycje x JOIN produkty p ON x.produkt_id = p.id WHERE x.zamowienie_id = 3'); $r = mysqli_fetch_row($w); echo "<p>Razem: $r[0] zł</p>"; mysqli_close($p);`, zle: `<?php $p = ${POLACZ}; $w = mysqli_query($p, 'SELECT SUM(p.cena) FROM pozycje x JOIN produkty p ON x.produkt_id = p.id WHERE x.zamowienie_id = 3'); $r = mysqli_fetch_row($w); echo "<p>Razem: $r[0] zł</p>"; mysqli_close($p);`, start: `<?php\n$polaczenie = ${POLACZ};\n`, pod: 'SUM(sztuk * cena) z JOIN pozycji i produktów.' } ] },
{ id: 'php-zapis', tytul: 'Baza danych: zapis z formularza', lekcja: `
<pre>&lt;?php
$polaczenie = ${POLACZ};
if (!empty($_POST['nazwa']) &amp;&amp; !empty($_POST['cena'])) {
    $zapytanie = mysqli_prepare($polaczenie,
        'INSERT INTO produkty (nazwa, kategoria, cena, ilosc) VALUES (?, ?, ?, 0)');
    mysqli_stmt_bind_param($zapytanie, 'ssd', $_POST['nazwa'], $_POST['kategoria'], $_POST['cena']);
    mysqli_stmt_execute($zapytanie);
    echo 'Dodano';
}
mysqli_close($polaczenie);
?&gt;</pre>
<ul><li>Typy w <code>bind_param</code>: <code>s</code> tekst, <code>i</code> liczba całkowita, <code>d</code> ułamek.</li><li>Na egzaminie wystarczy też <code>mysqli_query</code> ze zmiennymi w zapytaniu, ale zapytanie przygotowane chroni przed SQL injection.</li><li><code>mysqli_affected_rows($polaczenie)</code> mówi, ile wierszy zmieniono.</li></ul>`,
  zadania: [
  { id: 'php26', t: 'Pola imie, nazwisko i miasto (POST). Gdy imię i nazwisko są wypełnione, dodaj klienta (rok_urodzenia pomiń) i wypisz „Dodano klienta”.', wzor: `<?php if (!empty($_POST['imie']) && !empty($_POST['nazwisko'])) { $p = ${POLACZ}; $z = mysqli_prepare($p, 'INSERT INTO klienci (imie, nazwisko, miasto) VALUES (?, ?, ?)'); mysqli_stmt_bind_param($z, 'sss', $_POST['imie'], $_POST['nazwisko'], $_POST['miasto']); mysqli_stmt_execute($z); echo 'Dodano klienta'; mysqli_close($p); }`, zle: `<?php $p = ${POLACZ}; $z = mysqli_prepare($p, 'INSERT INTO klienci (imie, nazwisko, miasto) VALUES (?, ?, ?)'); $i = $_POST['imie'] ?? ''; $n = $_POST['nazwisko'] ?? ''; $m = $_POST['miasto'] ?? ''; mysqli_stmt_bind_param($z, 'sss', $i, $n, $m); mysqli_stmt_execute($z); echo 'Dodano klienta'; mysqli_close($p);`, start: `<?php\n$polaczenie = ${POLACZ};\n`, testy: [{ post: { imie: 'Iga', nazwisko: 'Bąk', miasto: 'Opole' } }, { post: { imie: '', nazwisko: 'Bąk', miasto: '' } }], sprawdz: 'SELECT imie, nazwisko, miasto FROM klienci', pod: 'Warunek z empty dla obu pól, potem INSERT.' },
  { id: 'php27', t: 'Pola id i ilosc (POST). Ustaw ilość produktu o tym id i wypisz „Zmieniono: N”, gdzie N to liczba zmienionych wierszy.', wzor: `<?php if (isset($_POST['id'], $_POST['ilosc'])) { $p = ${POLACZ}; $z = mysqli_prepare($p, 'UPDATE produkty SET ilosc = ? WHERE id = ?'); mysqli_stmt_bind_param($z, 'ii', $_POST['ilosc'], $_POST['id']); mysqli_stmt_execute($z); echo 'Zmieniono: ' . mysqli_affected_rows($p); mysqli_close($p); }`, zle: `<?php if (isset($_POST['id'], $_POST['ilosc'])) { $p = ${POLACZ}; $z = mysqli_prepare($p, 'UPDATE produkty SET ilosc = ?'); mysqli_stmt_bind_param($z, 'i', $_POST['ilosc']); mysqli_stmt_execute($z); echo 'Zmieniono: ' . mysqli_affected_rows($p); mysqli_close($p); }`, start: `<?php\n$polaczenie = ${POLACZ};\n`, testy: [{ post: { id: '8', ilosc: '30' } }, { post: { id: '99', ilosc: '1' } }], sprawdz: 'SELECT id, ilosc FROM produkty', pod: 'UPDATE … WHERE id = ? i mysqli_affected_rows.' },
  { id: 'php28', t: 'Pole id (POST). Usuń pozycje zamówienia o tym id (tabela pozycje, kolumna zamowienie_id), a potem samo zamówienie. Wypisz „Usunięto”.', wzor: `<?php if (!empty($_POST['id'])) { $p = ${POLACZ}; $id = (int) $_POST['id']; mysqli_query($p, "DELETE FROM pozycje WHERE zamowienie_id = $id"); mysqli_query($p, "DELETE FROM zamowienia WHERE id = $id"); echo 'Usunięto'; mysqli_close($p); }`, zle: `<?php if (!empty($_POST['id'])) { $p = ${POLACZ}; $id = (int) $_POST['id']; mysqli_query($p, "DELETE FROM pozycje WHERE id = $id"); echo 'Usunięto'; mysqli_close($p); }`, start: `<?php\n$polaczenie = ${POLACZ};\n`, testy: [{ post: { id: '5' } }], sprawdz: "SELECT CONCAT((SELECT COUNT(*) FROM pozycje), '/', (SELECT COUNT(*) FROM zamowienia))", pod: 'Najpierw wiersze z kluczem obcym, potem zamówienie. (int) zabezpiecza liczbę.' },
  { id: 'php29', t: 'Pole cena (POST) to liczba. Wypisz nazwy produktów tańszych niż ta cena jako listę ol, a gdy takich nie ma, akapit „Brak produktów”.', wzor: `<?php if (isset($_POST['cena'])) { $p = ${POLACZ}; $c = (float) $_POST['cena']; $w = mysqli_query($p, "SELECT nazwa FROM produkty WHERE cena < $c"); if (mysqli_num_rows($w) == 0) echo '<p>Brak produktów</p>'; else { echo '<ol>'; while ($r = mysqli_fetch_assoc($w)) echo "<li>{$r['nazwa']}</li>"; echo '</ol>'; } mysqli_close($p); }`, zle: `<?php if (isset($_POST['cena'])) { $p = ${POLACZ}; $c = (float) $_POST['cena']; $w = mysqli_query($p, "SELECT nazwa FROM produkty WHERE cena < $c"); echo '<ol>'; while ($r = mysqli_fetch_assoc($w)) echo "<li>{$r['nazwa']}</li>"; echo '</ol>'; mysqli_close($p); }`, start: `<?php\n$polaczenie = ${POLACZ};\n`, testy: [{ post: { cena: '40' } }, { post: { cena: '10' } }], pod: 'Najpierw sprawdź mysqli_num_rows.' },
  { id: 'php30', t: 'Pole status (POST). Zmień status wszystkich zamówień „nowe” na podany i wypisz akapit „Zaktualizowano N zamówień”.', wzor: `<?php if (!empty($_POST['status'])) { $p = ${POLACZ}; $z = mysqli_prepare($p, "UPDATE zamowienia SET status = ? WHERE status = 'nowe'"); mysqli_stmt_bind_param($z, 's', $_POST['status']); mysqli_stmt_execute($z); echo '<p>Zaktualizowano ' . mysqli_affected_rows($p) . ' zamówień</p>'; mysqli_close($p); }`, zle: `<?php if (!empty($_POST['status'])) { $p = ${POLACZ}; $z = mysqli_prepare($p, 'UPDATE zamowienia SET status = ?'); mysqli_stmt_bind_param($z, 's', $_POST['status']); mysqli_stmt_execute($z); echo '<p>Zaktualizowano ' . mysqli_affected_rows($p) . ' zamówień</p>'; mysqli_close($p); }`, start: `<?php\n$polaczenie = ${POLACZ};\n`, testy: [{ post: { status: 'w trakcie' } }], sprawdz: 'SELECT id, status FROM zamowienia', pod: 'WHERE status = \'nowe\'.' } ] },
{ id: 'php-sesje', tytul: 'Sesje, ciasteczka i pliki', lekcja: `
<pre>&lt;?php
session_start();                          // przed jakimkolwiek wypisaniem
$_SESSION['licznik'] = ($_SESSION['licznik'] ?? 0) + 1;

setcookie('motyw', 'ciemny', time() + 3600);   // ważne godzinę
echo $_COOKIE['motyw'] ?? 'jasny';             // widoczne od następnego wejścia

file_put_contents('log.txt', "wejście\\n", FILE_APPEND);  // dopisanie
$linie = file('log.txt', FILE_IGNORE_NEW_LINES);        // tablica linii
echo count($linie);
?&gt;</pre>
<ul><li>Sesja trzyma dane po stronie serwera, a ciasteczko w przeglądarce.</li><li><code>session_destroy()</code> kończy sesję (wylogowanie).</li><li><code>date('Y-m-d')</code> zwraca dzisiejszą datę, <code>header('Location: strona.php')</code> przekierowuje.</li></ul>`,
  zadania: [
  { id: 'php31', t: 'Ciasteczko jezyk może mieć wartość en. Wypisz „Hello”, gdy ma, a w każdym innym przypadku „Cześć”.', wzor: "<?php echo ($_COOKIE['jezyk'] ?? '') === 'en' ? 'Hello' : 'Cześć';", zle: "<?php echo isset($_COOKIE['jezyk']) ? 'Hello' : 'Cześć';", start: '<?php\n', testy: [{ cookie: { jezyk: 'en' } }, { cookie: { jezyk: 'pl' } }, {}], pod: '$_COOKIE i ??.' },
  { id: 'php32', t: 'Uruchom sesję, zapisz w niej pod kluczem uzytkownik wartość z pola login (POST) i wypisz „Zalogowano: LOGIN”.', wzor: "<?php session_start(); if (!empty($_POST['login'])) { $_SESSION['uzytkownik'] = $_POST['login']; echo 'Zalogowano: ' . $_SESSION['uzytkownik']; }", zle: "<?php if (!empty($_POST['login'])) { echo 'Zalogowano: ' . $_POST['login']; }", start: '<?php\n', testy: [{ post: { login: 'ola' } }, {}], musi: 'session_start[\\s\\S]*\\$_SESSION', musiOpis: 'Uruchom sesję i zapisz login w $_SESSION.', pod: 'session_start() na samym początku.' },
  { id: 'php33', t: 'Dopisz do pliku goscie.txt linię z polem imie (POST), a potem wypisz liczbę linii w pliku.', wzor: "<?php if (!empty($_POST['imie'])) file_put_contents('goscie.txt', $_POST['imie'] . \"\\n\", FILE_APPEND); echo count(file('goscie.txt'));", zle: "<?php if (!empty($_POST['imie'])) file_put_contents('goscie.txt', $_POST['imie'] . \"\\n\"); echo count(file('goscie.txt'));", start: '<?php\n', testy: [{ post: { imie: 'Iga' }, pliki: { 'goscie.txt': 'Ala\nOla\n' } }], pod: 'FILE_APPEND dopisuje zamiast nadpisywać.' },
  { id: 'php34', t: 'Plik ceny.txt ma linie „produkt;cena”. Wypisz produkt z najwyższą ceną.', wzor: "<?php $max = -1; $naj = ''; foreach (file('ceny.txt', FILE_IGNORE_NEW_LINES) as $l) { [$n, $c] = explode(';', $l); if ($c > $max) { $max = $c; $naj = $n; } } echo $naj;", zle: "<?php $l = file('ceny.txt', FILE_IGNORE_NEW_LINES); echo explode(';', end($l))[0];", start: '<?php\n', testy: [{ pliki: { 'ceny.txt': 'chleb;4.5\nser;12\nmasło;7.99\nwoda;2' } }], pod: 'file, explode i szukanie maksimum w pętli.' },
  { id: 'php35', t: 'Napisz funkcję czyPelnoletni($rok) zwracającą true, gdy osoba urodzona w danym roku ma w 2026 roku co najmniej 18 lat. Wypisz wynik dla 2008 i 2009 jako „tak” lub „nie” oddzielone spacją.', wzor: "<?php function czyPelnoletni($rok) { return 2026 - $rok >= 18; } echo (czyPelnoletni(2008) ? 'tak' : 'nie') . ' ' . (czyPelnoletni(2009) ? 'tak' : 'nie');", zle: "<?php function czyPelnoletni($rok) { return 2026 - $rok > 18; } echo (czyPelnoletni(2008) ? 'tak' : 'nie') . ' ' . (czyPelnoletni(2009) ? 'tak' : 'nie');", start: '<?php\n', musi: 'function\\s+czyPelnoletni', musiOpis: 'Zdefiniuj funkcję czyPelnoletni.', pod: 'return z porównaniem zwraca true lub false.' } ] }
];
