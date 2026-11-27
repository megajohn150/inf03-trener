// Pomocnicze funkcje kryteriów: klikają w Twoją stronę jak egzaminator (k.doc to dokument w ramce oceny).
// kalkulator: ustawia formularz cateringu i zwraca kwotę z akapitu #wynik.
const kalkulator = (k, opcja, porcje, dostawa) => {
  const d = k.doc;
  d.getElementById('danie').selectedIndex = opcja; d.getElementById('porcje').value = porcje; d.getElementById('dostawa').checked = dostawa;
  [...d.querySelectorAll('button, input[type=button], input[type=submit]')].find(b => /Oblicz/.test(b.textContent || b.value)).click();
  const m = d.getElementById('wynik').textContent.match(/\d+(?:[.,]\d+)?/);
  return m ? Math.round(parseFloat(m[0].replace(',', '.')) * 100) / 100 : NaN;
};
// adopcja: wypełnia formularz schroniska, klika „Wyślij” i zwraca tekst #komunikat.
const adopcja = (k, imie, email, zgoda, zwierze = 0) => {
  const d = k.doc;
  d.getElementById('imie').value = imie; d.getElementById('email').value = email; d.getElementById('zgoda').checked = zgoda; d.getElementById('zwierze').selectedIndex = zwierze;
  d.getElementById('wyslij').click();
  return d.getElementById('komunikat').textContent.trim();
};
// wiersze tabeli z danymi (bez wiersza nagłówków)
const wiersze = (doc, sel) => [...doc.querySelectorAll(sel + ' tr')].filter(tr => tr.querySelector('td'));
// style tylko w styl.css: sprawdzane w źródle, bo skrypt strony może sam ustawić atrybut style
const bezStylowWHtml = k => k.doc.querySelector('link[href="styl.css"]') && !/<style|\sstyle\s*=/i.test(k.php);

const ARKUSZE = [{
  id: 'probny1', tytul: 'Wypożyczalnia rowerów', rodzaj: 'PHP i baza danych', strona: 'rowery.php', minuty: 150,
  bloki: ['#lewa', '#srodek', '#prawa'], obokSiebie: '#srodek .rower', post: { form: 'footer form', wartosc: '1' },
  tresc: `
<p>Przygotuj witrynę wypożyczalni. Pliki startowe: <a href="arkusze/probny1/baza.sql" download>baza.sql</a> i <a href="arkusze/probny1/baner.jpg" download>baner.jpg</a>. Wszystkie rezultaty zapisuj w folderze <code>praca/probny1</code>.</p>
<h3>Baza danych</h3>
<ol><li>W phpMyAdmin utwórz bazę <code>wypozyczalnia</code> i zaimportuj <code>baza.sql</code>. Zrzut całego ekranu zapisz jako <code>import.png</code>.</li>
<li>Wykonaj zapytania, zapisz je w <code>kwerendy.txt</code> (każde zakończ średnikiem), a zrzuty jako <code>kw1.png</code>–<code>kw4.png</code>:
<ul><li>1: jedynie nazwa, typ i cena rowerów miejskich</li>
<li>2: jedynie nazwa i cena trzech najdroższych rowerów, od najdroższego</li>
<li>3: jedynie nazwa roweru, data i liczba dni wypożyczeń dłuższych niż 3 dni (relacja)</li>
<li>4: podniesienie ceny rowerów górskich o 5 zł</li></ul></li></ol>
<h3>Grafika</h3><p>Przeskaluj <code>baner.jpg</code> z zachowaniem proporcji do szerokości 300 px i zapisz jako <code>baner_maly.jpg</code>.</p>
<h3>Strona rowery.php</h3>
<ul><li>HTML5, język polski, kodowanie UTF-8, tytuł „Wypożyczalnia rowerów”.</li>
<li><b>Nagłówek</b> (<code>header</code>): nagłówek pierwszego stopnia „Wypożyczalnia rowerów” i obraz <code>baner_maly.jpg</code> z tekstem alternatywnym „Rower na bulwarze”.</li>
<li>Trzy sekcje (<code>section</code>): lewa, środkowa i prawa, o id <code>lewa</code>, <code>srodek</code>, <code>prawa</code>.</li>
<li><b>Lewa:</b> nagłówek trzeciego stopnia „Najdroższe rowery” i lista punktowana ze skryptu 1.</li>
<li><b>Środkowa:</b> bloki rowerów ze skryptu 2.</li>
<li><b>Prawa:</b> nagłówek trzeciego stopnia „Nowe wypożyczenie” i formularz POST: pole numeryczne (numer roweru), data, pole numeryczne (liczba dni), przycisk „Wypożycz”, etykiety.</li>
<li><b>Stopka</b> (<code>footer</code>): formularz POST z polem numerycznym i przyciskiem „Pokaż opis”, wynik skryptu 4 oraz napis „Stronę wykonał: ” i Twój numer.</li></ul>
<h3>Styl styl.css</h3>
<ul><li>Cała strona: krój Verdana.</li><li>Nagłówek i stopka: tło SteelBlue, biały tekst, wyrównanie do środka.</li>
<li>Sekcje obok siebie, szerokości 25%, 50%, 25%, a na ekranach do 800 px jedna pod drugą.</li>
<li>Lewa i prawa: tło LightCyan. Środkowa: tło WhiteSmoke.</li><li>Elementy listy: margines wewnętrzny 5 px.</li>
<li>Klasa <code>cena</code>: tło Gold, zaokrąglenie 10 px.</li><li>Klasa <code>rower</code>: bloki obok siebie, tekst wyśrodkowany.</li></ul>
<h3>Skrypty PHP</h3>
<ul><li>Połącz się z bazą <code>wypozyczalnia</code>, a na końcu zamknij połączenie. Zmienne nazwij zgodnie z przeznaczeniem.</li>
<li><b>Skrypt 1:</b> wynik zapytania 2 jako elementy listy „nazwa: cena zł”. Cena w elemencie <code>span</code> klasy <code>cena</code>.</li>
<li><b>Skrypt 2:</b> każdy rower jako blok klasy <code>rower</code>: nazwa w nagłówku czwartego stopnia i akapit „typ, cena zł za dzień”.</li>
<li><b>Skrypt 3:</b> gdy wszystkie pola są wypełnione, dodaje wypożyczenie do bazy.</li>
<li><b>Skrypt 4:</b> po podaniu numeru wyświetla w stopce akapit z opisem roweru.</li></ul>`,
  kwerendy: [
    { id: 'p1k1', wzor: "SELECT nazwa, typ, cena FROM rowery WHERE typ = 'miejski'", zle: 'SELECT nazwa, typ, cena FROM rowery' },
    { id: 'p1k2', wzor: 'SELECT nazwa, cena FROM rowery ORDER BY cena DESC LIMIT 3', zle: 'SELECT nazwa, cena FROM rowery ORDER BY cena LIMIT 3', kolejnosc: true },
    { id: 'p1k3', wzor: 'SELECT r.nazwa, w.data_wyp, w.dni FROM wypozyczenia w JOIN rowery r ON w.rower_id = r.id WHERE w.dni > 3', zle: 'SELECT r.nazwa, w.data_wyp, w.dni FROM wypozyczenia w JOIN rowery r ON w.rower_id = r.id WHERE w.dni >= 3' },
    { id: 'p1k4', wzor: "UPDATE rowery SET cena = cena + 5 WHERE typ = 'górski'", zle: 'UPDATE rowery SET cena = cena + 5', sprawdz: 'SELECT * FROM rowery' } ],
  // k: pliki, kw (zaliczone kwerendy), doc, styl(selektor), szeroko, wasko, opis (odpowiedź na formularz stopki), php, css
  kryteria: [
    ['Baza', 'Import udokumentowany w import.png', k => 'import.png' in k.pliki],
    ['Baza', 'Zapytanie 1: rowery miejskie', k => k.kw[0]], ['Baza', 'Zapytanie 2: trzy najdroższe', k => k.kw[1]],
    ['Baza', 'Zapytanie 3: relacja i warunek', k => k.kw[2]], ['Baza', 'Zapytanie 4: aktualizacja cen', k => k.kw[3]],
    ['Baza', 'Zrzuty kw1.png–kw4.png', k => [1, 2, 3, 4].every(n => `kw${n}.png` in k.pliki)],
    ['Zawartość', 'baner_maly.jpg ma 300 × 200 px (± 5)', k => { const g = k.pliki['baner_maly.jpg']; return g && g[0] === 300 && Math.abs(g[1] - 200) <= 5; }],
    ['Zawartość', 'HTML5, język polski, kodowanie', k => k.doc.doctype?.name === 'html' && k.doc.documentElement.lang === 'pl' && /charset/i.test(k.php)],
    ['Zawartość', 'Tytuł strony', k => k.doc.title.trim() === 'Wypożyczalnia rowerów'],
    ['Zawartość', 'header, trzy section i footer', k => k.doc.querySelector('header') && k.doc.querySelector('footer') && ['lewa', 'srodek', 'prawa'].every(i => k.doc.querySelector('section#' + i))],
    ['Zawartość', 'Nagłówki h1 i h3', k => k.doc.querySelector('header h1')?.textContent.trim() === 'Wypożyczalnia rowerów' && /Najdroższe rowery/.test(k.doc.querySelector('#lewa h3')?.textContent) && /Nowe wypożyczenie/.test(k.doc.querySelector('#prawa h3')?.textContent)],
    ['Zawartość', 'Baner z tekstem alternatywnym', k => k.doc.querySelector('header img')?.alt === 'Rower na bulwarze'],
    ['Zawartość', 'Formularz wypożyczenia: pola, etykieta, przycisk', k => { const f = k.doc.querySelector('#prawa form'); return f && f.querySelectorAll('input[type=number]').length === 2 && f.querySelector('input[type=date]') && f.querySelector('label') && f.querySelector('button, input[type=submit]'); }],
    ['Zawartość', 'Formularz w stopce i podpis', k => k.doc.querySelector('footer form input[type=number]') && /Stronę wykonał/.test(k.doc.querySelector('footer').textContent)],
    ['Działanie', 'Dołączony styl.css, bez stylów w HTML', k => k.doc.querySelector('link[href="styl.css"]') && !k.doc.querySelector('style, [style]')],
    ['Działanie', 'Oba formularze wysyłają metodą POST', k => k.doc.forms.length === 2 && [...k.doc.forms].every(f => f.method === 'post')],
    ['Działanie', 'Szeroki ekran: sekcje obok siebie', k => k.szeroko.top.every(t => Math.abs(t - k.szeroko.top[0]) < 3) && new Set(k.szeroko.left).size === 3],
    ['Styl', 'Krój Verdana', k => /verdana/i.test(k.styl('body').fontFamily)],
    ['Styl', 'Nagłówek i stopka: tło, kolor, wyrównanie', k => ['header', 'footer'].every(s => k.styl(s).backgroundColor === 'rgb(70, 130, 180)' && k.styl(s).color === 'rgb(255, 255, 255)' && k.styl(s).textAlign === 'center')],
    ['Styl', 'Tła sekcji', k => ['#lewa', '#prawa'].every(s => k.styl(s).backgroundColor === 'rgb(224, 255, 255)') && k.styl('#srodek').backgroundColor === 'rgb(245, 245, 245)'],
    ['Styl', 'Szerokości 25%, 50%, 25%', k => { const s = k.szeroko.width, c = s[0] + s[1] + s[2]; return [.25, .5, .25].every((u, i) => Math.abs(s[i] / c - u) < .02); }],
    ['Styl', 'Do 800 px sekcje jedna pod drugą', k => k.wasko.top[0] < k.wasko.top[1] && k.wasko.top[1] < k.wasko.top[2] && /@media/.test(k.css)],
    ['Styl', 'Elementy listy: padding 5 px', k => k.styl('#lewa li').padding === '5px'],
    ['Styl', 'Klasa cena: tło i zaokrąglenie', k => k.styl('.cena').backgroundColor === 'rgb(255, 215, 0)' && k.styl('.cena').borderRadius === '10px'],
    ['Styl', 'Klasa rower: obok siebie, wyśrodkowana', k => { const r = [...k.doc.querySelectorAll('#srodek .rower')]; return k.szeroko.obok && k.styl('.rower').textAlign === 'center' && r.length > 1; }],
    ['Skrypt', 'Połączenie z bazą wypozyczalnia', k => /(mysqli|PDO)/.test(k.php) && /wypozyczalnia/.test(k.php) && k.doc.querySelector('.rower')],
    ['Skrypt', 'Połączenie zamknięte', k => /mysqli_close\s*\(|->close\s*\(\s*\)|=\s*null\s*;/.test(k.php)],
    ['Skrypt', 'Skrypt 1: trzy elementy „nazwa: cena zł”', k => { const l = [...k.doc.querySelectorAll('#lewa li')]; return l.length === 3 && l.every(e => /^\S.*:\s*\d+\s*zł$/.test(e.textContent.trim())) && l.every(e => e.querySelector('span.cena')); }],
    ['Skrypt', 'Skrypt 2: wszystkie rowery', k => { const r = [...k.doc.querySelectorAll('#srodek .rower')]; return r.length === 8 && r.every(e => e.querySelector('h4') && /^.+,\s*\d+ zł za dzień$/.test(e.querySelector('p')?.textContent.trim())); }],
    ['Skrypt', 'Skrypt 3: sprawdza pola i czyta $_POST', k => /\$_(POST|REQUEST)/.test(k.php) && /(empty|isset)\s*\(/.test(k.php) && /INSERT\s+INTO/i.test(k.php)],
    ['Skrypt', 'Skrypt 4: opis roweru numer 1', k => k.opis.includes('Lekki rower miejski z koszykiem')],
    ['Ręcznie', 'Zrzuty pokazują cały ekran z paskiem zadań', null],
    ['Ręcznie', 'Skrypt 3 naprawdę dodał rekord (sprawdź w phpMyAdmin)', null],
    ['Ręcznie', 'Nazwy zmiennych są po polsku lub angielsku i mówią, co zawierają', null]
  ]
},
{
  id: 'probny2', tytul: 'Catering Smakosz', rodzaj: 'JavaScript i baza danych', strona: 'catering.html', minuty: 150,
  bloki: ['#kalkulator', '#oferta'],
  tresc: `
<p>Przygotuj stronę cateringu z kalkulatorem zamówienia. Pliki startowe: <a href="arkusze/probny2/baza.sql" download>baza.sql</a> i <a href="arkusze/probny2/talerz.jpg" download>talerz.jpg</a>. Rezultaty zapisuj w folderze <code>praca/probny2</code>.</p>
<h3>Baza danych</h3>
<ol><li>Utwórz bazę <code>catering</code> i zaimportuj <code>baza.sql</code>. Zrzut: <code>import.png</code>.</li>
<li>Zapytania zapisz w <code>kwerendy.txt</code> (każde zakończ średnikiem), zrzuty jako <code>kw1.png</code>–<code>kw4.png</code>:
<ul><li>1: jedynie nazwa i cena deserów</li><li>2: typ dania i liczba dań każdego typu</li>
<li>3: jedynie nazwa i kalorie dań mających mniej niż 400 kalorii, od najmniej kalorycznego</li>
<li>4: dodanie do tabeli dania kolumny <code>wege</code> typu logicznego</li></ul></li></ol>
<h3>Grafika</h3><p>Przeskaluj <code>talerz.jpg</code> do 150 × 150 px i zapisz w formacie PNG jako <code>talerz.png</code>.</p>
<h3>Strona catering.html</h3>
<ul><li>HTML5, język polski, kodowanie UTF-8, tytuł „Catering Smakosz”, styl w pliku <code>styl.css</code>.</li>
<li><b>Nagłówek</b> (<code>header</code>): obraz <code>talerz.png</code> z tekstem alternatywnym „Talerz” i nagłówek pierwszego stopnia „Catering Smakosz”.</li>
<li><b>Sekcja</b> <code>section</code> o id <code>kalkulator</code>: nagłówek drugiego stopnia „Zamów obiad”, lista rozwijana o id <code>danie</code> z opcjami „Zupa pomidorowa” (wartość 9), „Kotlet schabowy” (24), „Sernik” (12), pole numeryczne o id <code>porcje</code>, pole wyboru o id <code>dostawa</code> z etykietą „Dostawa (+15 zł)”, przycisk „Oblicz” i akapit o id <code>wynik</code>. Pola mają etykiety.</li>
<li><b>Panel</b> <code>aside</code> o id <code>oferta</code>: nagłówek drugiego stopnia „Nasza oferta” i tabela z nagłówkami „Danie”, „Cena” oraz trzema wierszami: Zupa pomidorowa 9 zł, Kotlet schabowy 24 zł, Sernik 12 zł.</li>
<li><b>Stopka</b>: akapit „Stronę wykonał: ” i Twój numer.</li></ul>
<h3>Styl styl.css</h3>
<ul><li>Wszystkie elementy: krój Tahoma.</li><li>Nagłówek i stopka: tło Sienna, biały tekst.</li>
<li>Sekcja kalkulatora: tło OldLace, szerokość 60%. Panel oferty: tło Wheat, szerokość 40%. Stoją obok siebie, a na ekranach do 700 px jeden pod drugim.</li>
<li>Tabela: obramowania komórek 1 px ciągłe w kolorze Sienna, scalone (<code>border-collapse</code>), marginesy wewnętrzne komórek 5 px.</li>
<li>Przycisk: tło Sienna, biały tekst, zaokrąglenie 5 px. Akapit wyniku: rozmiar czcionki 24 px.</li></ul>
<h3>Skrypt JavaScript</h3>
<p>Po kliknięciu „Oblicz”:</p>
<ul><li>gdy liczba porcji jest mniejsza niż 1 lub pusta, w akapicie <code>wynik</code> wypisz „Podaj liczbę porcji”;</li>
<li>w przeciwnym razie policz koszt: cena dania razy liczba porcji; od 10 porcji udziel rabatu 10%; za dostawę dolicz 15 zł (po rabacie);</li>
<li>wypisz „Do zapłaty: X zł”.</li></ul>`,
  kwerendy: [
    { id: 'p2k1', wzor: "SELECT nazwa, cena FROM dania WHERE typ = 'deser'", zle: 'SELECT nazwa, cena FROM dania' },
    { id: 'p2k2', wzor: 'SELECT typ, COUNT(*) FROM dania GROUP BY typ', zle: 'SELECT typ, COUNT(*) FROM dania' },
    { id: 'p2k3', wzor: 'SELECT nazwa, kalorie FROM dania WHERE kalorie < 400 ORDER BY kalorie', zle: 'SELECT nazwa, kalorie FROM dania WHERE kalorie < 400 ORDER BY kalorie DESC', kolejnosc: true },
    { id: 'p2k4', wzor: 'ALTER TABLE dania ADD wege BOOLEAN', zle: 'ALTER TABLE dania ADD wege INT', sprawdz: "SELECT column_name, column_type FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'dania' ORDER BY ordinal_position" } ],
  kryteria: [
    ['Baza', 'Import udokumentowany w import.png', k => 'import.png' in k.pliki],
    ['Baza', 'Zapytanie 1: desery', k => k.kw[0]], ['Baza', 'Zapytanie 2: grupowanie typów', k => k.kw[1]],
    ['Baza', 'Zapytanie 3: warunek i sortowanie', k => k.kw[2]], ['Baza', 'Zapytanie 4: nowa kolumna logiczna', k => k.kw[3]],
    ['Baza', 'Zrzuty kw1.png–kw4.png', k => [1, 2, 3, 4].every(n => `kw${n}.png` in k.pliki)],
    ['Zawartość', 'talerz.png: 150 × 150 px, format PNG', k => { const g = k.pliki['talerz.png']; return g && g[0] === 150 && g[1] === 150 && g.mime === 'image/png'; }],
    ['Zawartość', 'HTML5, język polski, kodowanie, tytuł', k => k.doc.doctype?.name === 'html' && k.doc.documentElement.lang === 'pl' && /charset/i.test(k.php) && k.doc.title.trim() === 'Catering Smakosz'],
    ['Zawartość', 'header, section#kalkulator, aside#oferta, footer', k => k.doc.querySelector('header') && k.doc.querySelector('section#kalkulator') && k.doc.querySelector('aside#oferta') && k.doc.querySelector('footer')],
    ['Zawartość', 'Nagłówki h1 i h2', k => k.doc.querySelector('header h1')?.textContent.trim() === 'Catering Smakosz' && /Zamów obiad/.test(k.doc.querySelector('#kalkulator h2')?.textContent) && /Nasza oferta/.test(k.doc.querySelector('#oferta h2')?.textContent)],
    ['Zawartość', 'Obraz z tekstem alternatywnym', k => k.doc.querySelector('header img[src="talerz.png"]')?.alt === 'Talerz'],
    ['Zawartość', 'Lista rozwijana: trzy dania z cenami', k => { const o = [...k.doc.querySelectorAll('select#danie option')]; return o.length === 3 && o.map(x => x.value).join() === '9,24,12' && /Kotlet schabowy/.test(o[1].textContent); }],
    ['Zawartość', 'Pola porcje i dostawa z etykietami, przycisk', k => k.doc.querySelector('input#porcje[type=number]') && k.doc.querySelector('input#dostawa[type=checkbox]') && k.doc.querySelectorAll('#kalkulator label').length >= 2 && [...k.doc.querySelectorAll('button, input[type=button], input[type=submit]')].some(b => /Oblicz/.test(b.textContent || b.value))],
    ['Zawartość', 'Tabela oferty: nagłówki i 3 wiersze', k => k.doc.querySelectorAll('#oferta th').length === 2 && k.doc.querySelectorAll('#oferta tr').length === 4 && /Sernik/.test(k.doc.querySelector('#oferta table').textContent)],
    ['Zawartość', 'Stopka z podpisem', k => /Stronę wykonał/.test(k.doc.querySelector('footer')?.textContent)],
    ['Działanie', 'Dołączony styl.css, bez stylów w HTML', k => k.doc.querySelector('link[href="styl.css"]') && !k.doc.querySelector('style, [style]')],
    ['Działanie', 'Szeroki ekran: kalkulator i oferta obok siebie', k => Math.abs(k.szeroko.top[0] - k.szeroko.top[1]) < 3 && k.szeroko.left[0] < k.szeroko.left[1]],
    ['Działanie', 'Do 700 px: jeden pod drugim', k => k.wasko.top[0] < k.wasko.top[1] && /@media/.test(k.css)],
    ['Styl', 'Krój Tahoma', k => /tahoma/i.test(k.styl('body').fontFamily) && /tahoma/i.test(k.styl('select').fontFamily)],
    ['Styl', 'Nagłówek i stopka: Sienna, biały tekst', k => ['header', 'footer'].every(s => k.styl(s).backgroundColor === 'rgb(160, 82, 45)' && k.styl(s).color === 'rgb(255, 255, 255)')],
    ['Styl', 'Tła kalkulatora i oferty', k => k.styl('#kalkulator').backgroundColor === 'rgb(253, 245, 230)' && k.styl('#oferta').backgroundColor === 'rgb(245, 222, 179)'],
    ['Styl', 'Szerokości 60% i 40%', k => { const [a, b] = k.szeroko.width; return Math.abs(a / (a + b) - .6) < .02; }],
    ['Styl', 'Tabela: obramowania scalone, padding 5 px', k => k.styl('table').borderCollapse === 'collapse' && k.styl('td').borderTopStyle === 'solid' && k.styl('td').borderTopColor === 'rgb(160, 82, 45)' && k.styl('td').paddingTop === '5px'],
    ['Styl', 'Przycisk: Sienna, biały, zaokrąglenie 5 px', k => { const s = k.styl('button'); return s.backgroundColor === 'rgb(160, 82, 45)' && s.color === 'rgb(255, 255, 255)' && s.borderTopLeftRadius === '5px'; }],
    ['Styl', 'Wynik: czcionka 24 px', k => k.styl('#wynik').fontSize === '24px'],
    ['Skrypt', 'Kotlet × 2 bez dostawy = 48 zł', k => kalkulator(k, 1, '2', false) === 48],
    ['Skrypt', 'Zupa × 3 z dostawą = 42 zł', k => kalkulator(k, 0, '3', true) === 42],
    ['Skrypt', 'Sernik × 10: rabat 10% = 108 zł', k => kalkulator(k, 2, '10', false) === 108],
    ['Skrypt', 'Kotlet × 10 z dostawą: rabat przed dostawą = 231 zł', k => kalkulator(k, 1, '10', true) === 231],
    ['Skrypt', '0 porcji: komunikat „Podaj liczbę porcji”', k => { kalkulator(k, 0, '0', false); return /Podaj liczbę porcji/.test(k.doc.getElementById('wynik').textContent); }],
    ['Skrypt', 'Format wyniku „Do zapłaty: X zł”', k => { kalkulator(k, 1, '1', false); return /^Do zapłaty:\s*24(\.0+|,0+)?\s*zł$/.test(k.doc.getElementById('wynik').textContent.trim()); }],
    ['Ręcznie', 'Zrzuty pokazują cały ekran z paskiem zadań', null],
    ['Ręcznie', 'Nazwy zmiennych są po polsku lub angielsku i mówią, co zawierają', null]
  ]
},
{
  id: 'probny3', tytul: 'Biblioteka szkolna', rodzaj: 'PHP, adres GET i tabela', strona: 'biblioteka.php', minuty: 150,
  bloki: ['#katalog', '#statystyki'], wasko: 500, get: ['gatunek=fantastyka', 'gatunek=' + encodeURIComponent('powieść historyczna')],
  tresc: `
<p>Przygotuj katalog szkolnej biblioteki z filtrowaniem po gatunku. Pliki startowe: <a href="arkusze/probny3/baza.sql" download>baza.sql</a> i <a href="arkusze/probny3/ksiazki.jpg" download>ksiazki.jpg</a>. Rezultaty zapisuj w folderze <code>praca/probny3</code>.</p>
<h3>Baza danych</h3>
<ol><li>Utwórz bazę <code>biblioteka</code> i zaimportuj <code>baza.sql</code>. Zrzut: <code>import.png</code>.</li>
<li>Zapytania zapisz w <code>kwerendy.txt</code> (każde zakończ średnikiem), zrzuty jako <code>kw1.png</code>–<code>kw4.png</code>:
<ul><li>1: jedynie tytuł i rok wydania książek z gatunku fantastyka, od najnowszej</li>
<li>2: jedynie imię i nazwisko autora oraz tytuł książek wydanych po 2000 roku (relacja)</li>
<li>3: czytelnik i liczba wypożyczonych przez niego książek, których jeszcze nie oddał (data zwrotu pusta)</li>
<li>4: nadanie użytkownikowi <code>bibliotekarz</code> na serwerze localhost uprawnień do odczytu i modyfikacji danych w tabeli <code>ksiazki</code> bazy <code>biblioteka</code></li></ul></li></ol>
<h3>Grafika</h3><p>Przeskaluj <code>ksiazki.jpg</code> z zachowaniem proporcji do szerokości 400 px i zapisz w formacie PNG jako <code>logo.png</code>.</p>
<h3>Strona biblioteka.php</h3>
<ul><li>HTML5, język polski, kodowanie UTF-8, tytuł „Biblioteka szkolna”, styl w pliku <code>styl.css</code>.</li>
<li><b>Nagłówek</b> (<code>header</code>): obraz <code>logo.png</code> z tekstem alternatywnym „Półka z książkami” i nagłówek pierwszego stopnia „Biblioteka szkolna”.</li>
<li><b>Menu</b> (<code>nav</code>): odnośnik „Wszystkie” do <code>biblioteka.php</code> i odnośniki do gatunków ze skryptu 1.</li>
<li><b>Sekcja</b> <code>section</code> o id <code>katalog</code>: nagłówek drugiego stopnia „Katalog” i tabela z nagłówkami „Tytuł”, „Autor”, „Rok”, „Dostępność”, wypełniana skryptem 2.</li>
<li><b>Panel</b> <code>aside</code> o id <code>statystyki</code>: nagłówek drugiego stopnia „Statystyki” i wynik skryptu 3.</li>
<li><b>Stopka</b>: akapit „Stronę wykonał: ” i Twój numer.</li></ul>
<h3>Styl styl.css</h3>
<ul><li>Cała strona: krój Georgia.</li><li>Nagłówek i stopka: tło DarkGreen, biały tekst.</li><li>Odnośniki menu bez podkreślenia.</li>
<li>Katalog: szerokość 70%, statystyki: 30%, obok siebie; na ekranach do 600 px jeden pod drugim.</li>
<li>Tabela: obramowania 1 px scalone (<code>border-collapse</code>), marginesy wewnętrzne komórek 6 px; komórki nagłówkowe: tło DarkSeaGreen, biały tekst; co drugi wiersz tabeli tło Honeydew.</li></ul>
<h3>Skrypty PHP</h3>
<ul><li>Połącz się z bazą <code>biblioteka</code>, a na końcu zamknij połączenie.</li>
<li><b>Skrypt 1:</b> dla każdego gatunku z tabeli <code>ksiazki</code> (bez powtórzeń) odnośnik do <code>biblioteka.php?gatunek=NAZWA</code> z nazwą gatunku jako tekstem.</li>
<li><b>Skrypt 2:</b> wiersze tabeli: tytuł, autor jako „imię nazwisko”, rok i „dostępna” albo „wypożyczona”. Gdy w adresie jest parametr <code>gatunek</code>, tylko książki z tego gatunku. Zabezpiecz parametr przed SQL injection.</li>
<li><b>Skrypt 3:</b> akapity „Książek w katalogu: N” i „Wypożyczonych teraz: M” (wypożyczenia bez daty zwrotu).</li></ul>`,
  kwerendy: [
    { id: 'p3k1', wzor: "SELECT tytul, rok FROM ksiazki WHERE gatunek = 'fantastyka' ORDER BY rok DESC", zle: "SELECT tytul, rok FROM ksiazki WHERE gatunek = 'fantastyka' ORDER BY rok", kolejnosc: true },
    { id: 'p3k2', wzor: 'SELECT a.imie, a.nazwisko, k.tytul FROM ksiazki k JOIN autorzy a ON k.autor_id = a.id WHERE k.rok > 2000', zle: 'SELECT a.imie, a.nazwisko, k.tytul FROM ksiazki k JOIN autorzy a ON k.id = a.id WHERE k.rok > 2000' },
    { id: 'p3k3', wzor: 'SELECT czytelnik, COUNT(*) FROM wypozyczenia WHERE data_zwrotu IS NULL GROUP BY czytelnik', zle: 'SELECT czytelnik, COUNT(*) FROM wypozyczenia GROUP BY czytelnik' },
    { id: 'p3k4', wzor: "GRANT SELECT, UPDATE ON biblioteka.ksiazki TO 'bibliotekarz'@'localhost'", zle: "GRANT SELECT ON biblioteka.ksiazki TO 'bibliotekarz'@'localhost'" } ],
  // k.get[0]: strona z ?gatunek=fantastyka, k.get[1]: z ?gatunek=powieść historyczna
  kryteria: [
    ['Baza', 'Import udokumentowany w import.png', k => 'import.png' in k.pliki],
    ['Baza', 'Zapytanie 1: fantastyka od najnowszej', k => k.kw[0]], ['Baza', 'Zapytanie 2: relacja autorów i książek', k => k.kw[1]],
    ['Baza', 'Zapytanie 3: niezwrócone, grupowanie', k => k.kw[2]], ['Baza', 'Zapytanie 4: uprawnienia bibliotekarza', k => k.kw[3]],
    ['Baza', 'Zrzuty kw1.png–kw4.png', k => [1, 2, 3, 4].every(n => `kw${n}.png` in k.pliki)],
    ['Zawartość', 'logo.png: 400 × 200 px, format PNG', k => { const g = k.pliki['logo.png']; return g && g[0] === 400 && Math.abs(g[1] - 200) <= 3 && g.mime === 'image/png'; }],
    ['Zawartość', 'HTML5, język polski, kodowanie, tytuł', k => k.doc.doctype?.name === 'html' && k.doc.documentElement.lang === 'pl' && /charset/i.test(k.php) && k.doc.title.trim() === 'Biblioteka szkolna'],
    ['Zawartość', 'Nagłówek: logo z tekstem alternatywnym i h1', k => k.doc.querySelector('header img[src="logo.png"]')?.alt === 'Półka z książkami' && k.doc.querySelector('header h1')?.textContent.trim() === 'Biblioteka szkolna'],
    ['Zawartość', 'nav, section#katalog, aside#statystyki, footer', k => k.doc.querySelector('nav') && k.doc.querySelector('section#katalog') && k.doc.querySelector('aside#statystyki') && k.doc.querySelector('footer')],
    ['Zawartość', 'Nagłówki h2 Katalog i Statystyki', k => /Katalog/.test(k.doc.querySelector('#katalog h2')?.textContent) && /Statystyki/.test(k.doc.querySelector('#statystyki h2')?.textContent)],
    ['Zawartość', 'Tabela: cztery nagłówki th', k => [...k.doc.querySelectorAll('#katalog th')].map(t => t.textContent.trim()).join() === 'Tytuł,Autor,Rok,Dostępność'],
    ['Zawartość', 'Stopka z podpisem', k => /Stronę wykonał/.test(k.doc.querySelector('footer')?.textContent)],
    ['Działanie', 'Dołączony styl.css, bez stylów w HTML', bezStylowWHtml],
    ['Działanie', 'Szeroki ekran: katalog i statystyki obok siebie', k => Math.abs(k.szeroko.top[0] - k.szeroko.top[1]) < 3 && k.szeroko.left[0] < k.szeroko.left[1]],
    ['Działanie', 'Do 600 px: jeden pod drugim', k => k.wasko.top[0] < k.wasko.top[1] && /@media/.test(k.css)],
    ['Styl', 'Krój Georgia', k => /georgia/i.test(k.styl('body').fontFamily)],
    ['Styl', 'Nagłówek i stopka: DarkGreen, biały tekst', k => ['header', 'footer'].every(s => k.styl(s).backgroundColor === 'rgb(0, 100, 0)' && k.styl(s).color === 'rgb(255, 255, 255)')],
    ['Styl', 'Odnośniki menu bez podkreślenia', k => k.styl('nav a').textDecorationLine === 'none'],
    ['Styl', 'Szerokości 70% i 30%', k => { const [a, b] = k.szeroko.width; return Math.abs(a / (a + b) - .7) < .02; }],
    ['Styl', 'Tabela: obramowania scalone, padding 6 px', k => k.styl('table').borderCollapse === 'collapse' && k.styl('td').borderTopStyle === 'solid' && k.styl('td').paddingTop === '6px'],
    ['Styl', 'Nagłówki tabeli: DarkSeaGreen, biały tekst', k => k.styl('th').backgroundColor === 'rgb(143, 188, 143)' && k.styl('th').color === 'rgb(255, 255, 255)'],
    ['Styl', 'Co drugi wiersz tło Honeydew', k => { const t = wiersze(k.doc, '#katalog').map(r => k.win.getComputedStyle(r).backgroundColor === 'rgb(240, 255, 240)'); return t.length > 2 && t.every((x, i) => i === 0 || x !== t[i - 1]); }],
    ['Skrypt', 'Połączenie z bazą biblioteka i zamknięcie', k => /(mysqli|PDO)/.test(k.php) && /biblioteka/.test(k.php) && /mysqli_close\s*\(|->close\s*\(\s*\)|=\s*null\s*;/.test(k.php) && wiersze(k.doc, '#katalog').length > 0],
    ['Skrypt', 'Skrypt 1: „Wszystkie” i odnośniki do czterech gatunków', k => { const a = [...k.doc.querySelectorAll('nav a')]; const g = a.map(x => new URL(x.href).searchParams.get('gatunek')).filter(Boolean).sort(); return a.length === 5 && g.join() === 'fantastyka,kryminał,powieść,powieść historyczna'; }],
    ['Skrypt', 'Skrypt 2: wszystkie 10 książek, autor „imię nazwisko”', k => { const w = wiersze(k.doc, '#katalog'); return w.length === 10 && w.some(r => /Solaris/.test(r.textContent) && /Stanisław Lem/.test(r.textContent)); }],
    ['Skrypt', 'Skrypt 2: dostępność (3 wypożyczone, 7 dostępnych)', k => { const t = wiersze(k.doc, '#katalog').map(r => r.textContent); return t.filter(x => /wypożyczona/.test(x)).length === 3 && t.filter(x => /dostępna/.test(x)).length === 7; }],
    ['Skrypt', 'Skrypt 2: ?gatunek=fantastyka daje 5 książek', k => { const w = wiersze(k.get[0], '#katalog'); return w.length === 5 && w.some(r => /Sezon burz/.test(r.textContent)); }],
    ['Skrypt', 'Skrypt 2: gatunek ze spacją i polskimi literami (3 książki)', k => wiersze(k.get[1], '#katalog').length === 3],
    ['Skrypt', 'Skrypt 2: parametr zabezpieczony przed SQL injection', k => /\$_(GET|REQUEST)/.test(k.php) && /real_escape_string|prepare\s*\(|->prepare/.test(k.php)],
    ['Skrypt', 'Skrypt 3: liczba książek i wypożyczonych', k => { const t = k.doc.querySelector('#statystyki')?.textContent.replace(/\s+/g, ' ') ?? ''; return /Książek w katalogu:\s*10/.test(t) && /Wypożyczonych teraz:\s*3/.test(t); }],
    ['Ręcznie', 'Zrzuty pokazują cały ekran z paskiem zadań', null],
    ['Ręcznie', 'Nazwy zmiennych są po polsku lub angielsku i mówią, co zawierają', null]
  ]
},
{
  id: 'probny4', tytul: 'Schronisko Łapa', rodzaj: 'JavaScript: galeria i formularz', strona: 'schronisko.html', minuty: 150,
  bloki: ['#galeria', '#adopcja'],
  tresc: `
<p>Przygotuj stronę schroniska z galerią i formularzem adopcji. Pliki startowe: <a href="arkusze/probny4/baza.sql" download>baza.sql</a>, <a href="arkusze/probny4/zwierze1.jpg" download>zwierze1.jpg</a>, <a href="arkusze/probny4/zwierze2.jpg" download>zwierze2.jpg</a>, <a href="arkusze/probny4/zwierze3.jpg" download>zwierze3.jpg</a>. Rezultaty zapisuj w folderze <code>praca/probny4</code> (skopiuj tam też obrazy).</p>
<h3>Baza danych</h3>
<ol><li>Utwórz bazę <code>schronisko</code> i zaimportuj <code>baza.sql</code>. Zrzut: <code>import.png</code>.</li>
<li>Zapytania zapisz w <code>kwerendy.txt</code> (każde zakończ średnikiem), zrzuty jako <code>kw1.png</code>–<code>kw4.png</code>:
<ul><li>1: jedynie imię i wiek psów młodszych niż 5 lat</li><li>2: gatunek i średni wiek zwierząt każdego gatunku</li>
<li>3: jedynie imię zwierzęcia i opiekun z adopcji w 2026 roku (relacja)</li>
<li>4: dodanie w tabeli <code>adopcje</code> klucza obcego <code>zwierze_id</code> wskazującego na <code>zwierzeta.id</code></li></ul></li></ol>
<h3>Grafika</h3><p>Wytnij ze środka <code>zwierze1.jpg</code> kwadrat 600 × 600 px, przeskaluj go do 150 × 150 px i zapisz w formacie PNG jako <code>ikona.png</code>.</p>
<h3>Strona schronisko.html</h3>
<ul><li>HTML5, język polski, kodowanie UTF-8, tytuł „Schronisko Łapa”, styl w pliku <code>styl.css</code>.</li>
<li><b>Nagłówek</b>: obraz <code>ikona.png</code> z tekstem alternatywnym „Łapa” i nagłówek pierwszego stopnia „Schronisko Łapa”.</li>
<li><b>Sekcja</b> o id <code>galeria</code>: nagłówek drugiego stopnia „Nasi podopieczni”, duży obraz o id <code>duze</code> (plik <code>zwierze1.jpg</code>), akapit o id <code>opis</code> z tekstem „Burek” oraz trzy miniatury klasy <code>miniatura</code>: <code>zwierze1.jpg</code>, <code>zwierze2.jpg</code>, <code>zwierze3.jpg</code> z tekstami alternatywnymi „Burek”, „Mruczek”, „Fafik”.</li>
<li><b>Sekcja</b> o id <code>adopcja</code>: nagłówek drugiego stopnia „Adopcja”, przycisk o id <code>pokaz</code> z napisem „Pokaż formularz”, formularz o id <code>formularz</code> i akapit o id <code>komunikat</code>. Formularz: pole tekstowe <code>imie</code>, pole e-mail <code>email</code>, lista <code>zwierze</code> z opcjami Burek, Mruczek, Fafik, pole wyboru <code>zgoda</code> z etykietą „Zapoznałem się z regulaminem” i przycisk <code>wyslij</code> „Wyślij” (typ <code>button</code>). Pola mają etykiety, a podane nazwy to ich id.</li>
<li><b>Stopka</b>: akapit „Stronę wykonał: ” i Twój numer.</li></ul>
<h3>Styl styl.css</h3>
<ul><li>Cała strona: krój Trebuchet MS.</li><li>Nagłówek i stopka: tło Teal, biały tekst.</li>
<li>Sekcje obok siebie po 50%, a na ekranach do 800 px jedna pod drugą. Sekcja adopcji: tło MintCream.</li>
<li>Miniatury: szerokość 120 px, obramowanie 3 px ciągłe Teal, kursor w kształcie dłoni; po najechaniu przezroczystość 0.7.</li>
<li>Formularz jest na początku ukryty. Akapit komunikatu: kolor DarkRed, pogrubienie.</li></ul>
<h3>Skrypt JavaScript</h3>
<ul><li>Kliknięcie miniatury: duży obraz pokazuje ten sam plik, a akapit <code>opis</code> jej tekst alternatywny.</li>
<li>Kliknięcie <code>pokaz</code>: pokazuje formularz i zmienia napis na „Ukryj formularz”; ponowne kliknięcie ukrywa formularz i przywraca „Pokaż formularz”.</li>
<li>Kliknięcie <code>wyslij</code> wypisuje w akapicie <code>komunikat</code>: „Podaj imię”, gdy imię jest puste; „Podaj poprawny e-mail”, gdy e-mail nie zawiera znaku @; „Zaakceptuj regulamin”, gdy zgoda nie jest zaznaczona; w przeciwnym razie „Dziękujemy, IMIĘ! Skontaktujemy się w sprawie: ZWIERZĘ”.</li></ul>`,
  kwerendy: [
    { id: 'p4k1', wzor: "SELECT imie, wiek FROM zwierzeta WHERE gatunek = 'pies' AND wiek < 5", zle: 'SELECT imie, wiek FROM zwierzeta WHERE wiek < 5' },
    { id: 'p4k2', wzor: 'SELECT gatunek, AVG(wiek) FROM zwierzeta GROUP BY gatunek', zle: 'SELECT gatunek, AVG(wiek) FROM zwierzeta' },
    { id: 'p4k3', wzor: 'SELECT z.imie, a.opiekun FROM adopcje a JOIN zwierzeta z ON a.zwierze_id = z.id WHERE YEAR(a.data_adopcji) = 2026', zle: 'SELECT z.imie, a.opiekun FROM adopcje a JOIN zwierzeta z ON a.zwierze_id = z.id' },
    { id: 'p4k4', wzor: 'ALTER TABLE adopcje ADD FOREIGN KEY (zwierze_id) REFERENCES zwierzeta(id)', zle: 'ALTER TABLE adopcje ADD INDEX (zwierze_id)',
      sprawdz: "SELECT column_name, referenced_table_name, referenced_column_name FROM information_schema.key_column_usage WHERE table_schema = DATABASE() AND table_name = 'adopcje' AND referenced_table_name IS NOT NULL" } ],
  // Kryteria liczone po kolei: „formularz ukryty na starcie” stoi przed tymi, które klikają.
  kryteria: [
    ['Baza', 'Import udokumentowany w import.png', k => 'import.png' in k.pliki],
    ['Baza', 'Zapytanie 1: psy młodsze niż 5 lat', k => k.kw[0]], ['Baza', 'Zapytanie 2: średni wiek gatunków', k => k.kw[1]],
    ['Baza', 'Zapytanie 3: adopcje z 2026 roku (relacja)', k => k.kw[2]], ['Baza', 'Zapytanie 4: klucz obcy', k => k.kw[3]],
    ['Baza', 'Zrzuty kw1.png–kw4.png', k => [1, 2, 3, 4].every(n => `kw${n}.png` in k.pliki)],
    ['Zawartość', 'ikona.png: 150 × 150 px, format PNG', k => { const g = k.pliki['ikona.png']; return g && g[0] === 150 && g[1] === 150 && g.mime === 'image/png'; }],
    ['Zawartość', 'HTML5, język polski, kodowanie, tytuł', k => k.doc.doctype?.name === 'html' && k.doc.documentElement.lang === 'pl' && /charset/i.test(k.php) && k.doc.title.trim() === 'Schronisko Łapa'],
    ['Zawartość', 'Nagłówek: ikona z tekstem alternatywnym i h1', k => k.doc.querySelector('header img[src="ikona.png"]')?.alt === 'Łapa' && k.doc.querySelector('header h1')?.textContent.trim() === 'Schronisko Łapa'],
    ['Zawartość', 'Sekcje galeria i adopcja, nagłówki h2, stopka', k => /Nasi podopieczni/.test(k.doc.querySelector('section#galeria h2')?.textContent) && /Adopcja/.test(k.doc.querySelector('section#adopcja h2')?.textContent) && /Stronę wykonał/.test(k.doc.querySelector('footer')?.textContent)],
    ['Zawartość', 'Duży obraz, opis i trzy miniatury z tekstami alternatywnymi', k => { const m = [...k.doc.querySelectorAll('img.miniatura')]; return /zwierze1\.jpg$/.test(k.doc.getElementById('duze')?.getAttribute('src')) && k.doc.getElementById('opis')?.textContent.trim() === 'Burek' && m.map(x => x.alt).join() === 'Burek,Mruczek,Fafik' && m.every((x, i) => x.getAttribute('src') === `zwierze${i + 1}.jpg`); }],
    ['Zawartość', 'Formularz: pola, lista, zgoda, przycisk, etykiety', k => { const f = k.doc.getElementById('formularz'); return f && f.querySelector('#imie') && f.querySelector('input#email[type=email]') && f.querySelectorAll('select#zwierze option').length === 3 && f.querySelector('input#zgoda[type=checkbox]') && f.querySelector('#wyslij[type=button]') && f.querySelectorAll('label').length >= 4 && k.doc.getElementById('pokaz') && k.doc.getElementById('komunikat'); }],
    ['Działanie', 'Dołączony styl.css, bez stylów w HTML', bezStylowWHtml],
    ['Działanie', 'Szeroki ekran: sekcje obok siebie', k => Math.abs(k.szeroko.top[0] - k.szeroko.top[1]) < 3 && k.szeroko.left[0] < k.szeroko.left[1]],
    ['Działanie', 'Do 800 px: jedna pod drugą', k => k.wasko.top[0] < k.wasko.top[1] && /@media/.test(k.css)],
    ['Styl', 'Krój Trebuchet MS', k => /trebuchet ms/i.test(k.styl('body').fontFamily)],
    ['Styl', 'Nagłówek i stopka: Teal, biały tekst', k => ['header', 'footer'].every(s => k.styl(s).backgroundColor === 'rgb(0, 128, 128)' && k.styl(s).color === 'rgb(255, 255, 255)')],
    ['Styl', 'Szerokości po 50%, tło adopcji MintCream', k => { const [a, b] = k.szeroko.width; return Math.abs(a / (a + b) - .5) < .02 && k.styl('#adopcja').backgroundColor === 'rgb(245, 255, 250)'; }],
    ['Styl', 'Miniatury: 120 px, obramowanie Teal, kursor dłoni', k => { const s = k.styl('.miniatura'); return s.width === '120px' && s.borderTopWidth === '3px' && s.borderTopStyle === 'solid' && s.borderTopColor === 'rgb(0, 128, 128)' && s.cursor === 'pointer'; }],
    ['Styl', 'Miniatury: przezroczystość po najechaniu', k => /\.miniatura\s*:hover[^}]*opacity\s*:\s*0?\.7/.test(k.css)],
    ['Styl', 'Komunikat: DarkRed, pogrubiony', k => k.styl('#komunikat').color === 'rgb(139, 0, 0)' && +k.styl('#komunikat').fontWeight >= 700],
    ['Styl', 'Formularz na początku ukryty', k => k.styl('#formularz').display === 'none'],
    ['Skrypt', 'Miniatura zmienia duży obraz i opis', k => { const m = k.doc.querySelectorAll('.miniatura'), d = k.doc.getElementById('duze'), o = k.doc.getElementById('opis'); m[2].click(); const a = /zwierze3\.jpg$/.test(d.src) && o.textContent.trim() === 'Fafik'; m[1].click(); return a && /zwierze2\.jpg$/.test(d.src) && o.textContent.trim() === 'Mruczek'; }],
    ['Skrypt', 'Przycisk pokazuje i ukrywa formularz, zmienia napis', k => { const p = k.doc.getElementById('pokaz'), f = () => k.styl('#formularz').display; p.click(); const a = f() !== 'none' && p.textContent.trim() === 'Ukryj formularz'; p.click(); return a && f() === 'none' && p.textContent.trim() === 'Pokaż formularz'; }],
    ['Skrypt', 'Puste imię: „Podaj imię”', k => adopcja(k, '', 'ola@example.com', true) === 'Podaj imię'],
    ['Skrypt', 'E-mail bez @: „Podaj poprawny e-mail”', k => adopcja(k, 'Ola', 'ola.example.com', true) === 'Podaj poprawny e-mail'],
    ['Skrypt', 'Bez zgody: „Zaakceptuj regulamin”', k => adopcja(k, 'Ola', 'ola@example.com', false) === 'Zaakceptuj regulamin'],
    ['Skrypt', 'Poprawne dane: podziękowanie z imieniem i zwierzęciem', k => adopcja(k, 'Ola', 'ola@example.com', true, 1) === 'Dziękujemy, Ola! Skontaktujemy się w sprawie: Mruczek'],
    ['Ręcznie', 'Zrzuty pokazują cały ekran z paskiem zadań', null],
    ['Ręcznie', 'Nazwy zmiennych są po polsku lub angielsku i mówią, co zawierają', null]
  ]
}];
