const PORADNIKI = [
{ id: 'egzamin', tytul: 'Egzamin praktyczny krok po kroku', opis: 'Plan na 150 minut i lista rzeczy, o których łatwo zapomnieć.', tresc: `
<h3>Plan czasu</h3>
<table><tr><th>0–10 min</th><td>Przeczytaj cały arkusz. Zaznacz nazwy plików, folderów, kolory i wymiary.</td></tr>
<tr><th>10–30 min</th><td>Baza: import w phpMyAdmin, zapytania, zrzuty ekranu, plik kwerendy.txt.</td></tr>
<tr><th>30–40 min</th><td>Grafika: skalowanie, format, nazwa pliku.</td></tr>
<tr><th>40–80 min</th><td>HTML: struktura, bloki, treść, formularze.</td></tr>
<tr><th>80–105 min</th><td>CSS: kolory, wymiary, układ, media query.</td></tr>
<tr><th>105–140 min</th><td>Skrypty PHP lub JS.</td></tr>
<tr><th>140–150 min</th><td>Kontrola: nazwy plików, działanie w przeglądarce, przeglądarka.txt, zapis wszystkich plików.</td></tr></table>
<h3>Łatwe punkty, które ludzie tracą</h3>
<ul><li>Zrzut musi pokazywać <b>cały ekran z paskiem zadań</b>, nie wykadrowany fragment.</li>
<li>Słowo „jedynie” w zapytaniu: wybierz dokładnie te kolumny, bez <code>*</code>.</li>
<li>Nazwy plików i folderów dokładnie jak w treści (także wielkość liter i rozszerzenie).</li>
<li>Deklaracja <code>&lt;!DOCTYPE html&gt;</code>, <code>lang="pl"</code>, <code>meta charset</code>, tytuł.</li>
<li>Style tylko w zewnętrznym pliku, jeśli arkusz tak mówi (bez atrybutu <code>style</code>).</li>
<li>Formatowanie przez klasę, gdy arkusz mówi o klasie: użycie id bywa liczone jako błąd.</li>
<li>Ostatnią operacją na bazie jest jej zamknięcie (<code>mysqli_close</code>).</li>
<li>Nazwy zmiennych po polsku lub angielsku i zgodne z przeznaczeniem.</li>
<li>Jeśli PHP nie działa, egzaminator sprawdza kod źródłowy, więc nawet niedokończony skrypt może dać punkty.</li></ul>
<h3>Gdy coś nie działa</h3>
<ul><li>Pusta strona PHP: szukaj brakującego średnika lub nawiasu; włącz wyświetlanie błędów.</li>
<li>Błąd połączenia: nazwa bazy taka jak w phpMyAdmin, użytkownik <code>root</code>, puste hasło.</li>
<li>Style nie działają: sprawdź ścieżkę w <code>link href</code> i odśwież stronę z pominięciem pamięci podręcznej.</li>
<li>Skrypt JS nie działa: otwórz konsolę (F12) i przeczytaj pierwszy czerwony błąd.</li></ul>` },
{ id: 'grafika', tytul: 'Grafika w GIMP', opis: 'Skalowanie, kadrowanie, zmiana formatu i przezroczystość.', tresc: `
<p>Na egzaminie zwykle trzeba przeskalować obraz z zachowaniem proporcji, czasem przyciąć go lub zmienić format.</p>
<h3>Skalowanie</h3><ol><li><b>Obraz → Skaluj obraz…</b></li><li>Upewnij się, że łańcuch przy szerokości i wysokości jest <b>połączony</b> (zachowanie proporcji).</li><li>Wpisz szerokość w pikselach, wysokość policzy się sama.</li><li><b>Skaluj</b>.</li></ol>
<p>Kontrola: 1200 × 800 skalowane do szerokości 300 daje 300 × 200 (dzielisz obie liczby przez 4).</p>
<h3>Zapis w innym formacie</h3><ol><li><b>Plik → Wyeksportuj jako…</b> (Zapisz jako tworzy tylko plik .xcf GIMP-a).</li><li>Wpisz nazwę z rozszerzeniem, np. <code>logo.png</code>.</li><li>Dla JPEG ustaw jakość, np. 80–90.</li></ol>
<h3>Kadrowanie</h3><p>Narzędzie <b>Kadrowanie</b> (Shift+C): zaznacz obszar, wpisz pozycję i rozmiar w opcjach narzędzia, zatwierdź Enterem.</p>
<h3>Przezroczystość</h3><p><b>Warstwa → Przezroczystość → Dodaj kanał alfa</b>, zaznacz tło (różdżka), Delete, eksport do PNG. JPEG nie zapisze przezroczystości.</p>
<h3>Inne częste polecenia</h3><ul><li>Obrót: <b>Obraz → Przekształć → Obróć o 90°</b>.</li><li>Odcienie szarości: <b>Kolory → Desaturacja</b>.</li><li>Rozmiar płótna (bez skalowania): <b>Obraz → Rozmiar płótna</b>.</li></ul>` },
{ id: 'phpmyadmin', tytul: 'phpMyAdmin i zrzuty ekranu', opis: 'Import bazy, wykonywanie zapytań i dokumentowanie wyników.', tresc: `
<h3>Import bazy</h3><ol><li>Wejdź na <code>http://localhost/phpmyadmin</code>.</li><li>Utwórz bazę: <b>Nowa</b>, wpisz nazwę z arkusza, metoda porównywania napisów <code>utf8mb4_polish_ci</code> (lub domyślna), <b>Utwórz</b>.</li><li>Wybierz bazę po lewej, karta <b>Import</b>, wybierz plik .sql, <b>Importuj</b>.</li><li>Zrób zrzut całego ekranu pokazujący komunikat o powodzeniu i tabele bazy.</li></ol>
<h3>Zapytania</h3><ol><li>Wybierz bazę, karta <b>SQL</b>, wpisz zapytanie, <b>Wykonaj</b>.</li><li>Zrzut całego ekranu z zapytaniem i wynikiem (cały ekran z paskiem zadań).</li><li>Skopiuj zapytanie do <code>kwerendy.txt</code> (lub nazwy z arkusza); każde zakończ średnikiem.</li></ol>
<h3>Zrzut ekranu</h3><ul><li>Windows: klawisz <b>PrtSc</b>, potem wklej w Paint i zapisz jako PNG lub JPG. <b>Win+Shift+S</b> wycina tylko fragment, więc na egzaminie lepiej PrtSc.</li><li>macOS (do ćwiczeń): <b>Cmd+Shift+3</b> zapisuje cały ekran.</li></ul>
<h3>Użytkownicy i uprawnienia</h3><p>Karta <b>Konta użytkowników</b> → <b>Dodaj konto użytkownika</b>, albo w SQL: <code>CREATE USER</code>, <code>GRANT</code>, <code>REVOKE</code>. Zapytania o uprawnienia sprawdzisz przez <code>SHOW GRANTS FOR</code>.</p>
<h3>Eksport (kopia)</h3><p>Karta <b>Eksport</b> → metoda szybka, format SQL → <b>Eksportuj</b>. To samo z wiersza poleceń: <code>mysqldump -u root nazwa_bazy &gt; kopia.sql</code>.</p>` },
{ id: 'sciaga', tytul: 'Ściąga: wzorce skryptów', opis: 'Szkielety PHP i JS, które pojawiają się w niemal każdym arkuszu.', tresc: `
<h3>PHP: lista z bazy</h3><pre>&lt;?php
$polaczenie = mysqli_connect('localhost', 'root', '', 'baza');
$wynik = mysqli_query($polaczenie, 'SELECT nazwa, cena FROM produkty');
while ($wiersz = mysqli_fetch_assoc($wynik)) {
    echo "&lt;li&gt;{$wiersz['nazwa']} – {$wiersz['cena']} zł&lt;/li&gt;";
}
mysqli_close($polaczenie);
?&gt;</pre>
<h3>PHP: formularz zapisujący do bazy</h3><pre>&lt;?php
$polaczenie = mysqli_connect('localhost', 'root', '', 'baza');
if (!empty($_POST['nazwa'])) {
    $nazwa = $_POST['nazwa'];
    mysqli_query($polaczenie, "INSERT INTO produkty (nazwa) VALUES ('$nazwa')");
}
mysqli_close($polaczenie);
?&gt;</pre>
<h3>JS: obliczenie po kliknięciu</h3><pre>&lt;button onclick="oblicz()"&gt;Oblicz&lt;/button&gt;
&lt;script&gt;
function oblicz() {
  const ilosc = Number(document.getElementById('ilosc').value);
  let koszt = ilosc * 12;
  if (document.getElementById('dostawa').checked) koszt += 10;
  document.getElementById('wynik').innerHTML = 'Koszt: ' + koszt + ' zł';
}
&lt;/script&gt;</pre>
<h3>CSS: trzy kolumny i wersja wąska</h3><pre>.kontener { display: flex; }
#lewy, #prawy { width: 25%; } #srodek { width: 50%; }
@media (max-width: 800px) {
  .kontener { display: block; }
  #lewy, #srodek, #prawy { width: 100%; }
}</pre>` }
];
const SESJE = [
  ['2026-czerwiec', 'czerwiec 2026', true], ['2026-styczen', 'styczeń 2026', true], ['2025-czerwiec', 'czerwiec 2025', true], ['2025-styczen', 'styczeń 2025', false],
  ['2024-czerwiec', 'czerwiec 2024', false], ['2024-styczen', 'styczeń 2024', true], ['2023-czerwiec', 'czerwiec 2023', true], ['2023-styczen', 'styczeń 2023', true],
  ['2022-czerwiec', 'czerwiec 2022', true], ['2022-styczen', 'styczeń 2022', true], ['2021-czerwiec', 'czerwiec 2021', true]
].map(([id, nazwa, zalaczniki]) => ({ id, nazwa, zalaczniki }));
