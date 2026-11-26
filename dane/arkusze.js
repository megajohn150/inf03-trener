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
    ['Skrypt', 'Kotlet × 2 bez dostawy = 48 zł', k => k.licz(1, '2', false) === 48],
    ['Skrypt', 'Zupa × 3 z dostawą = 42 zł', k => k.licz(0, '3', true) === 42],
    ['Skrypt', 'Sernik × 10: rabat 10% = 108 zł', k => k.licz(2, '10', false) === 108],
    ['Skrypt', 'Kotlet × 10 z dostawą: rabat przed dostawą = 231 zł', k => k.licz(1, '10', true) === 231],
    ['Skrypt', '0 porcji: komunikat „Podaj liczbę porcji”', k => { k.licz(0, '0', false); return /Podaj liczbę porcji/.test(k.doc.getElementById('wynik').textContent); }],
    ['Skrypt', 'Format wyniku „Do zapłaty: X zł”', k => { k.licz(1, '1', false); return /^Do zapłaty:\s*24(\.0+|,0+)?\s*zł$/.test(k.doc.getElementById('wynik').textContent.trim()); }],
    ['Ręcznie', 'Zrzuty pokazują cały ekran z paskiem zadań', null],
    ['Ręcznie', 'Nazwy zmiennych są po polsku lub angielsku i mówią, co zawierają', null]
  ]
}];
