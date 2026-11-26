// HTML: spr = [selektor] | [selektor, liczba] | [selektor, 'tekst'];  CSS: por = { selektor: [właściwości] } porównywane ze wzorem;  JS: wyr = wyrażenia porównywane ze wzorem
const HTML = [
{ id: 'html-struktura', tytul: 'Struktura i semantyka', lekcja: `
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="pl"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Tytuł w karcie przeglądarki&lt;/title&gt;
  &lt;link rel="stylesheet" href="styl.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;&lt;h1&gt;Nagłówek strony&lt;/h1&gt;&lt;/header&gt;
  &lt;nav&gt;menu&lt;/nav&gt;
  &lt;main&gt;
    &lt;section&gt;&lt;h2&gt;Część&lt;/h2&gt;&lt;/section&gt;
    &lt;article&gt;samodzielny wpis&lt;/article&gt;
  &lt;/main&gt;
  &lt;aside&gt;boczny panel&lt;/aside&gt;
  &lt;footer&gt;stopka&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
<ul><li>Arkusze wymagają: deklaracji HTML5, języka <code>pl</code>, kodowania i tytułu. To łatwe punkty.</li><li>Bloki semantyczne (<code>header</code>, <code>nav</code>, <code>main</code>, <code>section</code>, <code>aside</code>, <code>footer</code>) zamiast samych <code>div</code>.</li><li>Nagłówki <code>h1</code>–<code>h6</code> według ważności, akapit to <code>p</code>.</li></ul>`,
  zadania: [
  { id: 'html1', t: 'Napisz kompletny szkielet: HTML5, język polski, kodowanie UTF-8, tytuł „Moja strona”, w body nagłówek h1 „Witaj”.', wzor: '<!DOCTYPE html>\n<html lang="pl">\n<head><meta charset="UTF-8"><title>Moja strona</title></head>\n<body><h1>Witaj</h1></body>\n</html>', zle: '<html><head><title>Moja strona</title></head><body><h1>Witaj</h1></body></html>', spr: [['!doctype'], ['html[lang="pl"]'], ['meta[charset="UTF-8" i]'], ['title', 'Moja strona'], ['body > h1', 'Witaj']], pod: 'Zacznij od <!DOCTYPE html>.' },
  { id: 'html2', t: 'Zbuduj body z blokami: header (z h1 „Kino”), main z dwiema sekcjami section, oraz footer.', wzor: '<header><h1>Kino</h1></header>\n<main><section></section><section></section></main>\n<footer></footer>', zle: '<div><h1>Kino</h1></div><main><section></section></main><footer></footer>', spr: [['header h1', 'Kino'], ['main > section', 2], ['footer']], pod: 'Dwie sekcje wewnątrz main.' },
  { id: 'html3', t: 'Dodaj do head dołączenie arkusza stylów styl.css.', wzor: '<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"><title>Strona</title><link rel="stylesheet" href="styl.css"></head><body></body></html>', zle: '<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"><title>Strona</title><style src="styl.css"></style></head><body></body></html>', spr: [['head link[rel="stylesheet"][href="styl.css"]']], start: '<!DOCTYPE html>\n<html lang="pl">\n<head>\n  <meta charset="UTF-8">\n  <title>Strona</title>\n</head>\n<body></body>\n</html>', pod: '<link rel="stylesheet" href="…">' },
  { id: 'html4', t: 'Napisz nawigację nav z trzema odnośnikami: „Start” do index.html, „Galeria” do galeria.html i „Kontakt” do kontakt.html.', wzor: '<nav><a href="index.html">Start</a> <a href="galeria.html">Galeria</a> <a href="kontakt.html">Kontakt</a></nav>', zle: '<nav><a href="index.html">Start</a> <a href="galeria.html">Galeria</a></nav>', spr: [['nav a', 3], ['nav a[href="index.html"]', 'Start'], ['nav a[href="galeria.html"]', 'Galeria'], ['nav a[href="kontakt.html"]', 'Kontakt']], pod: 'Trzy znaczniki a z atrybutem href.' },
  { id: 'html5', t: 'Napisz artykuł article z nagłówkiem h2 „Nowości”, dwoma akapitami i pogrubionym słowem „promocja” (strong) w pierwszym akapicie.', wzor: '<article><h2>Nowości</h2><p>Trwa <strong>promocja</strong>!</p><p>Zapraszamy.</p></article>', zle: '<article><h2>Nowości</h2><p>Trwa promocja!</p><p>Zapraszamy.</p></article>', spr: [['article h2', 'Nowości'], ['article p', 2], ['article p:first-of-type strong', 'promocja']], pod: '<strong> wewnątrz pierwszego <p>.' } ] },
{ id: 'html-tresc', tytul: 'Listy, odnośniki, obrazy, media', lekcja: `
<pre>&lt;ul&gt;&lt;li&gt;punktowana&lt;/li&gt;&lt;/ul&gt;
&lt;ol type="A" start="3"&gt;&lt;li&gt;numerowana od C&lt;/li&gt;&lt;/ol&gt;
&lt;a href="https://example.com" target="_blank"&gt;w nowej karcie&lt;/a&gt;
&lt;a href="mailto:szkola@example.com"&gt;napisz&lt;/a&gt;
&lt;img src="kot.jpg" alt="Rudy kot" title="Mruczek" width="300"&gt;
&lt;video src="film.mp4" controls&gt;&lt;/video&gt;
&lt;audio src="dzwiek.mp3" controls&gt;&lt;/audio&gt;</pre>
<ul><li><code>alt</code> to tekst zastępczy (dostępność), <code>title</code> to dymek po najechaniu.</li><li>Lista w liście: <code>ul</code> wewnątrz <code>li</code>.</li><li>Obraz jako odnośnik: <code>&lt;a href="duzy.jpg"&gt;&lt;img src="maly.jpg" alt="…"&gt;&lt;/a&gt;</code>.</li></ul>`,
  zadania: [
  { id: 'html6', t: 'Lista numerowana z trzema krokami: „Umyj”, „Pokrój”, „Podaj”.', wzor: '<ol><li>Umyj</li><li>Pokrój</li><li>Podaj</li></ol>', zle: '<ul><li>Umyj</li><li>Pokrój</li><li>Podaj</li></ul>', spr: [['ol > li', 3], ['ol > li', 'Pokrój']], pod: 'Numerowana to ol.' },
  { id: 'html7', t: 'Lista punktowana: „Owoce” z zagnieżdżoną listą punktowaną „jabłko”, „gruszka”, potem „Warzywa”.', wzor: '<ul><li>Owoce<ul><li>jabłko</li><li>gruszka</li></ul></li><li>Warzywa</li></ul>', zle: '<ul><li>Owoce</li><ul><li>jabłko</li><li>gruszka</li></ul><li>Warzywa</li></ul>', spr: [['ul > li > ul > li', 2], ['body > ul > li', 2]], pod: 'Zagnieżdżona lista musi być wewnątrz li.' },
  { id: 'html8', t: 'Obraz las.jpg z tekstem alternatywnym „Las jesienią” i dymkiem „Jesień”, o szerokości 400 pikseli.', wzor: '<img src="las.jpg" alt="Las jesienią" title="Jesień" width="400">', zle: '<img src="las.jpg" title="Las jesienią" width="400">', spr: [['img[src="las.jpg"][alt="Las jesienią"][title="Jesień"][width="400"]']], pod: 'Atrybuty alt, title i width.' },
  { id: 'html9', t: 'Odnośnik „Pobierz cennik” do pliku cennik.pdf, otwierany w nowej karcie, oraz odnośnik „Napisz do nas” na adres biuro@example.com.', wzor: '<a href="cennik.pdf" target="_blank">Pobierz cennik</a>\n<a href="mailto:biuro@example.com">Napisz do nas</a>', zle: '<a href="cennik.pdf">Pobierz cennik</a>\n<a href="biuro@example.com">Napisz do nas</a>', spr: [['a[href="cennik.pdf"][target="_blank"]', 'Pobierz cennik'], ['a[href="mailto:biuro@example.com"]', 'Napisz do nas']], pod: 'target="_blank" oraz mailto:' },
  { id: 'html10', t: 'Miniatura mini.png (tekst alternatywny „Plaża”) będąca odnośnikiem do duzy.png, a pod nią film film.mp4 z kontrolkami.', wzor: '<a href="duzy.png"><img src="mini.png" alt="Plaża"></a>\n<video src="film.mp4" controls></video>', zle: '<img src="mini.png" alt="Plaża"><a href="duzy.png">duży</a>\n<video src="film.mp4"></video>', spr: [['a[href="duzy.png"] > img[src="mini.png"][alt="Plaża"]'], ['video[src="film.mp4"][controls]']], pod: 'img wewnątrz a; atrybut controls.' } ] },
{ id: 'html-tabele', tytul: 'Tabele', lekcja: `
<pre>&lt;table&gt;
  &lt;tr&gt;&lt;th&gt;Imię&lt;/th&gt;&lt;th&gt;Wynik&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Ola&lt;/td&gt;&lt;td&gt;35&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="2"&gt;komórka na dwie kolumny&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td rowspan="2"&gt;na dwa wiersze&lt;/td&gt;&lt;td&gt;a&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;b&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;</pre>
<ul><li><code>tr</code> to wiersz, <code>th</code> komórka nagłówkowa, <code>td</code> zwykła.</li><li>Komórka scalona przez <code>colspan</code> lub <code>rowspan</code> zastępuje kilka komórek, więc w danym wierszu pisz ich mniej.</li><li>Na egzaminie tabele często generuje skrypt PHP w pętli.</li></ul>`,
  zadania: [
  { id: 'html11', t: 'Tabela z nagłówkami „Produkt” i „Cena” oraz dwoma wierszami: Chleb 4 zł, Mleko 3 zł.', wzor: '<table><tr><th>Produkt</th><th>Cena</th></tr><tr><td>Chleb</td><td>4 zł</td></tr><tr><td>Mleko</td><td>3 zł</td></tr></table>', zle: '<table><tr><td>Produkt</td><td>Cena</td></tr><tr><td>Chleb</td><td>4 zł</td></tr><tr><td>Mleko</td><td>3 zł</td></tr></table>', spr: [['table th', 2], ['table th', 'Produkt'], ['table td', 4], ['table td', 'Mleko']], pod: 'Nagłówki to th.' },
  { id: 'html12', t: 'Tabela 2 × 2, w której pierwszy wiersz ma jedną komórkę „Plan lekcji” na całą szerokość, a drugi dwie komórki: „pon”, „wt”.', wzor: '<table><tr><td colspan="2">Plan lekcji</td></tr><tr><td>pon</td><td>wt</td></tr></table>', zle: '<table><tr><td>Plan lekcji</td><td></td></tr><tr><td>pon</td><td>wt</td></tr></table>', spr: [['td[colspan="2"]', 'Plan lekcji'], ['tr', 2], ['td', 3]], pod: 'colspan="2".' },
  { id: 'html13', t: 'Tabela, w której pierwsza komórka „Matematyka” zajmuje dwa wiersze, obok są komórki „poniedziałek” i (wiersz niżej) „czwartek”.', wzor: '<table><tr><td rowspan="2">Matematyka</td><td>poniedziałek</td></tr><tr><td>czwartek</td></tr></table>', zle: '<table><tr><td rowspan="2">Matematyka</td><td>poniedziałek</td></tr><tr><td></td><td>czwartek</td></tr></table>', spr: [['td[rowspan="2"]', 'Matematyka'], ['tr', 2], ['td', 3]], pod: 'Drugi wiersz ma tylko jedną komórkę.' },
  { id: 'html14', t: 'Tabela z nagłówkiem tabeli caption „Wyniki”, sekcją thead z nagłówkami „Imię” i „Punkty” oraz tbody z jednym wierszem: Adam, 12.', wzor: '<table><caption>Wyniki</caption><thead><tr><th>Imię</th><th>Punkty</th></tr></thead><tbody><tr><td>Adam</td><td>12</td></tr></tbody></table>', zle: '<table><tr><th>Imię</th><th>Punkty</th></tr><tr><td>Adam</td><td>12</td></tr></table><p>Wyniki</p>', spr: [['table > caption', 'Wyniki'], ['thead th', 2], ['tbody td', 'Adam']], pod: 'caption zaraz po <table>.' },
  { id: 'html15', t: 'Tabela 3 wiersze × 3 kolumny, w każdej komórce td numer od 1 do 9 (wierszami).', wzor: '<table><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td></tr><tr><td>7</td><td>8</td><td>9</td></tr></table>', zle: '<table><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td></tr></table>', spr: [['tr', 3], ['tr:nth-child(3) td:nth-child(3)', '9'], ['tr:nth-child(2) td:first-child', '4']], pod: 'Trzy tr po trzy td.' } ] },
{ id: 'html-formularze', tytul: 'Formularze', lekcja: `
<pre>&lt;form action="zapisz.php" method="post"&gt;
  &lt;label for="imie"&gt;Imię&lt;/label&gt; &lt;input type="text" id="imie" name="imie" required&gt;
  &lt;input type="email" name="email" placeholder="adres e-mail"&gt;
  &lt;input type="number" name="ile" min="1" max="10"&gt;
  &lt;input type="password" name="haslo"&gt;  &lt;input type="date" name="data"&gt;
  &lt;label&gt;&lt;input type="radio" name="plec" value="k"&gt; kobieta&lt;/label&gt;
  &lt;label&gt;&lt;input type="checkbox" name="zgoda" checked&gt; zgoda&lt;/label&gt;
  &lt;select name="miasto"&gt;&lt;option&gt;Kraków&lt;/option&gt;&lt;option selected&gt;Gdańsk&lt;/option&gt;&lt;/select&gt;
  &lt;textarea name="opis" rows="4" cols="30"&gt;&lt;/textarea&gt;
  &lt;button type="submit"&gt;Wyślij&lt;/button&gt; &lt;input type="reset" value="Wyczyść"&gt;
&lt;/form&gt;</pre>
<ul><li>Bez <code>name</code> pole nie zostanie wysłane.</li><li>Przyciski radio w jednej grupie mają <b>ten sam</b> <code>name</code>.</li><li><code>label for</code> wskazuje <code>id</code> pola; klik w etykietę zaznacza pole.</li></ul>`,
  zadania: [
  { id: 'html16', t: 'Formularz wysyłający metodą post do logowanie.php: pole tekstowe login, pole hasła haslo i przycisk „Zaloguj”.', wzor: '<form action="logowanie.php" method="post"><input type="text" name="login"> <input type="password" name="haslo"> <button>Zaloguj</button></form>', zle: '<form action="logowanie.php"><input type="text" name="login"> <input type="text" name="haslo"> <button>Zaloguj</button></form>', spr: [['form[action="logowanie.php"][method="post" i]'], ['input[name="login"]:not([type]), input[name="login"][type="text"]'], ['input[type="password"][name="haslo"]'], ['form button, form input[type="submit"]']], pod: 'method="post", type="password".' },
  { id: 'html17', t: 'Pole e-mail o nazwie email z etykietą „E-mail” powiązaną przez for i id, wymagane.', wzor: '<label for="email">E-mail</label> <input type="email" id="email" name="email" required>', zle: '<label>E-mail</label> <input type="email" name="email">', spr: [['label[for="email"]', 'E-mail'], ['input#email[type="email"][name="email"][required]']], pod: 'for etykiety = id pola, atrybut required.' },
  { id: 'html18', t: 'Trzy przyciski radio do wyboru rozmiaru (name rozmiar, wartości S, M, L) z etykietami; M ma być zaznaczony.', wzor: '<label><input type="radio" name="rozmiar" value="S"> S</label><label><input type="radio" name="rozmiar" value="M" checked> M</label><label><input type="radio" name="rozmiar" value="L"> L</label>', zle: '<label><input type="radio" name="s" value="S"> S</label><label><input type="radio" name="m" value="M" checked> M</label><label><input type="radio" name="l" value="L"> L</label>', spr: [['input[type="radio"][name="rozmiar"]', 3], ['input[name="rozmiar"][value="M"][checked]'], ['label', 3]], pod: 'Ten sam name w całej grupie.' },
  { id: 'html19', t: 'Lista rozwijana name="kolor" z opcjami „czerwony”, „zielony”, „niebieski” (value takie same jak tekst) oraz pole liczbowe ile od 1 do 5.', wzor: '<select name="kolor"><option value="czerwony">czerwony</option><option value="zielony">zielony</option><option value="niebieski">niebieski</option></select>\n<input type="number" name="ile" min="1" max="5">', zle: '<select name="kolor"><option>czerwony</option><option>zielony</option></select>\n<input type="number" name="ile">', spr: [['select[name="kolor"] option', 3], ['option[value="niebieski"]', 'niebieski'], ['input[type="number"][name="ile"][min="1"][max="5"]']], pod: 'Atrybuty min i max.' },
  { id: 'html20', t: 'Formularz GET z polem wielowierszowym uwagi (5 wierszy), polem wyboru zgoda z etykietą „Akceptuję regulamin” oraz przyciskami „Wyślij” (submit) i „Wyczyść” (reset).', wzor: '<form method="get"><textarea name="uwagi" rows="5"></textarea><label><input type="checkbox" name="zgoda"> Akceptuję regulamin</label><button type="submit">Wyślij</button><button type="reset">Wyczyść</button></form>', zle: '<form method="get"><input name="uwagi"><label><input type="checkbox" name="zgoda"> Akceptuję regulamin</label><button type="submit">Wyślij</button></form>', spr: [['form[method="get" i] textarea[name="uwagi"][rows="5"]'], ['label', 'Akceptuję regulamin'], ['input[type="checkbox"][name="zgoda"]'], ['[type="reset"]']], pod: 'textarea, checkbox i type="reset".' } ] }
];

const DOM = '<div class="karta">Karta</div><p id="tekst">Akapit <a href="#">link</a></p><ul><li>pierwszy</li><li class="wazne">drugi</li><li>trzeci</li></ul>';
const CSS3 = [
{ id: 'css-selektory', tytul: 'Selektory, kolory, tekst', lekcja: `
<pre>p { color: navy; }                 /* znacznik */
.wazne { font-weight: bold; }      /* klasa */
#menu { background-color: #eee; } /* id */
nav a { text-decoration: none; }   /* potomek */
ul &gt; li { list-style-type: square; } /* bezpośrednie dziecko */
h1, h2 { font-family: Arial, sans-serif; } /* kilka naraz */
a:hover { color: red; }            /* po najechaniu */
li:first-child, li:nth-child(2n) { … }</pre>
<ul><li>Kolor: nazwa (<code>Tomato</code>), <code>#ff6347</code>, <code>rgb(255, 99, 71)</code>.</li><li>Tekst: <code>font-size</code>, <code>font-style: italic</code>, <code>font-weight</code>, <code>text-align</code>, <code>text-transform: uppercase</code>, <code>line-height</code>, <code>letter-spacing</code>.</li><li>Ważność: id &gt; klasa &gt; znacznik; przy remisie wygrywa późniejsza reguła.</li></ul>`,
  zadania: [
  { id: 'css1', t: 'Ustaw akapitom kolor tekstu Navy i krój Verdana.', html: DOM, wzor: 'p { color: Navy; font-family: Verdana; }', zle: 'p { color: Navy; }', por: { p: ['color', 'fontFamily'] }, pod: 'color i font-family.' },
  { id: 'css2', t: 'Element listy z klasą wazne: pogrubienie i kolor czerwony.', html: DOM, wzor: '.wazne { font-weight: bold; color: red; }', zle: 'li { font-weight: bold; color: red; }', por: { li: ['fontWeight', 'color'] }, pod: 'Selektor klasy zaczyna się od kropki.' },
  { id: 'css3', t: 'Odnośnik wewnątrz akapitu #tekst: bez podkreślenia, kolor zielony (green).', html: DOM, wzor: '#tekst a { text-decoration: none; color: green; }', zle: 'a { text-decoration: underline; color: green; }', por: { a: ['textDecorationLine', 'color'] }, pod: 'Selektor potomka: #tekst a.' },
  { id: 'css4', t: 'Div .karta: tekst wielkimi literami, wyśrodkowany, rozmiar 20px, kursywa.', html: DOM, wzor: '.karta { text-transform: uppercase; text-align: center; font-size: 20px; font-style: italic; }', zle: '.karta { text-transform: uppercase; text-align: center; font-size: 20px; }', por: { '.karta': ['textTransform', 'textAlign', 'fontSize', 'fontStyle'] }, pod: 'font-style: italic.' },
  { id: 'css5', t: 'Co drugi element listy (2., 4., …) ma tło LightGray, a pierwszy element listy kolor tekstu Gray.', html: DOM, wzor: 'li:nth-child(even) { background-color: LightGray; } li:first-child { color: Gray; }', zle: 'li:nth-child(odd) { background-color: LightGray; } li:first-child { color: Gray; }', por: { li: ['backgroundColor', 'color'] }, pod: ':nth-child(even) lub (2n).' } ] },
{ id: 'css-pudelko', tytul: 'Model pudełkowy i tło', lekcja: `
<pre>.blok {
  width: 300px; height: 150px;
  padding: 10px;              /* wewnątrz, między treścią a ramką */
  border: 2px solid black;
  margin: 20px auto;          /* na zewnątrz; auto po bokach centruje blok */
  border-radius: 15px;        /* zaokrąglenie (50% = koło) */
  box-shadow: 5px 5px 10px gray;
  background: url(tlo.jpg) no-repeat center / cover;
}</pre>
<ul><li>Kolejność wartości: góra, prawo, dół, lewo (zgodnie z ruchem wskazówek zegara).</li><li>Domyślnie <code>width</code> nie obejmuje padding i border; <code>box-sizing: border-box</code> to zmienia.</li><li>Rodzaje ramki: <code>solid</code>, <code>dashed</code>, <code>dotted</code>, <code>double</code>.</li></ul>`,
  zadania: [
  { id: 'css6', t: '.karta: szerokość 200px, margines wewnętrzny 15px, ramka 3px kropkowana (dotted) w kolorze Teal.', html: DOM, wzor: '.karta { width: 200px; padding: 15px; border: 3px dotted Teal; }', zle: '.karta { width: 200px; margin: 15px; border: 3px dotted Teal; }', por: { '.karta': ['width', 'paddingTop', 'paddingLeft', 'borderTopWidth', 'borderTopStyle', 'borderTopColor'] }, pod: 'Margines wewnętrzny to padding.' },
  { id: 'css7', t: '.karta: marginesy zewnętrzne 10px u góry i u dołu oraz 30px po bokach, zaokrąglenie rogów 8px.', html: DOM, wzor: '.karta { margin: 10px 30px; border-radius: 8px; }', zle: '.karta { margin: 30px 10px; border-radius: 8px; }', por: { '.karta': ['marginTop', 'marginLeft', 'marginBottom', 'borderTopLeftRadius'] }, pod: 'Dwie wartości: pion, poziom.' },
  { id: 'css8', t: '.karta: szerokość 50% i wyśrodkowanie bloku w poziomie marginesami.', html: DOM, wzor: '.karta { width: 50%; margin-left: auto; margin-right: auto; }', zle: '.karta { width: 50%; text-align: center; }', por: { '.karta': ['width', 'marginLeft', 'marginRight'] }, pod: 'margin: 0 auto.' },
  { id: 'css9', t: '.karta: cień 4px w prawo, 4px w dół, rozmycie 6px, kolor Gray oraz tło Khaki.', html: DOM, wzor: '.karta { box-shadow: 4px 4px 6px Gray; background-color: Khaki; }', zle: '.karta { box-shadow: 4px 4px Gray; background-color: Khaki; }', por: { '.karta': ['boxShadow', 'backgroundColor'] }, pod: 'box-shadow: x y rozmycie kolor.' },
  { id: 'css10', t: 'Akapit #tekst: tylko dolna ramka 2px ciągła Black i odstęp wewnętrzny 5px tylko z lewej.', html: DOM, wzor: '#tekst { border-bottom: 2px solid Black; padding-left: 5px; }', zle: '#tekst { border: 2px solid Black; padding-left: 5px; }', por: { '#tekst': ['borderBottomWidth', 'borderBottomStyle', 'borderTopStyle', 'paddingLeft', 'paddingTop'] }, pod: 'border-bottom zamiast border.' } ] },
{ id: 'css-uklad', tytul: 'Układ: float, flex, grid', lekcja: `
<pre>/* flex: bloki obok siebie */
.kontener { display: flex; justify-content: space-between; align-items: center; }
#lewy { width: 25%; } #srodek { width: 50%; } #prawy { width: 25%; }

/* float: starsza metoda, wciąż w kluczach CKE */
#lewy, #srodek, #prawy { float: left; }
footer { clear: both; }

/* grid */
.siatka { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 10px; }

/* pozycjonowanie */
.menu { position: fixed; top: 0; } .znaczek { position: absolute; right: 0; }</pre>
<p>Klucz CKE uznaje każdy sposób (float i clear, flex albo grid), byle układ zgadzał się z ilustracją.</p>`,
  zadania: [
  { id: 'css11', t: 'Trzy bloki #a, #b, #c obok siebie w proporcjach 25%, 50%, 25% (dowolną metodą).', html: '<div class="k"><div id="a">A</div><div id="b">B</div><div id="c">C</div></div>', wzor: '.k { display: flex; } #a, #c { width: 25%; } #b { width: 50%; }', zle: '#a, #c { width: 25%; } #b { width: 50%; }', por: {}, uklad: ['#a', '#b', '#c'], pod: 'display: flex na rodzicu albo float: left na blokach.' },
  { id: 'css12', t: 'Elementy .k > div rozłożone równo w poziomie: pierwszy przy lewej, ostatni przy prawej krawędzi (flex).', html: '<div class="k"><div>1</div><div>2</div><div>3</div></div>', wzor: '.k { display: flex; justify-content: space-between; }', zle: '.k { display: flex; justify-content: center; }', por: { '.k': ['display', 'justifyContent'] }, pod: 'justify-content: space-between.' },
  { id: 'css13', t: 'Siatka .s z trzema kolumnami równej szerokości i odstępem 10px.', html: '<div class="s"><div>1</div><div>2</div><div>3</div><div>4</div></div>', wzor: '.s { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }', zle: '.s { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }', por: { '.s': ['display', 'gridTemplateColumns', 'columnGap', 'rowGap'] }, pod: 'repeat(3, 1fr) albo 1fr 1fr 1fr.' },
  { id: 'css14', t: 'Obrazek-ramka .z opływany przez tekst z lewej strony (stoi po prawej), a stopka f nie opływa niczego.', html: '<div class="z" style="width:50px;height:50px"></div><p>tekst</p><footer class="f">stopka</footer>', wzor: '.z { float: right; } .f { clear: both; }', zle: '.z { float: left; } .f { clear: both; }', por: { '.z': ['float'], '.f': ['clear'] }, pod: 'float: right i clear: both.' },
  { id: 'css15', t: 'Pasek .m przyklejony do górnej krawędzi okna (nie przewija się), na całą szerokość.', html: '<div class="m">menu</div><p>treść</p>', wzor: '.m { position: fixed; top: 0; width: 100%; }', zle: '.m { position: absolute; top: 0; width: 100%; }', por: { '.m': ['position', 'top', 'width'] }, pod: 'position: fixed.' } ] },
{ id: 'css-rwd', tytul: 'Media queries, listy, przejścia', lekcja: `
<pre>@media (max-width: 800px) {        /* ekrany do 800 px */
  #lewy, #srodek, #prawy { width: 100%; float: none; }
}
ul { list-style-type: circle; }     /* disc, circle, square, decimal, none */
ul { list-style-image: url(kropka.png); }
img { opacity: 0.5; transition: opacity 0.3s; }
img:hover { opacity: 1; }
a { cursor: pointer; } .ukryj { display: none; }</pre>
<ul><li>Klucz sprawdza media query, zmieniając szerokość okna przeglądarki.</li><li><code>visibility: hidden</code> ukrywa, ale zostawia puste miejsce; <code>display: none</code> nie.</li></ul>`,
  zadania: [
  { id: 'css16', t: 'Bloki #a i #b mają po 50% szerokości obok siebie, a na ekranach do 600px po 100% jeden pod drugim.', html: '<div class="k"><div id="a">A</div><div id="b">B</div></div>', wzor: '.k { display: flex; } #a, #b { width: 50%; } @media (max-width: 600px) { .k { display: block; } #a, #b { width: 100%; } }', zle: '.k { display: flex; } #a, #b { width: 50%; }', szer: [800, 500], por: { '#a': ['width'], '#b': ['width'] }, uklad: ['#a', '#b'], pod: '@media (max-width: 600px) { … }' },
  { id: 'css17', t: 'Lista ul ma znaczniki kwadratowe (square), a elementy li wcięcie 5px z lewej (padding).', html: DOM, wzor: 'ul { list-style-type: square; } li { padding-left: 5px; }', zle: 'ul { list-style-type: circle; } li { padding-left: 5px; }', por: { ul: ['listStyleType'], li: ['paddingLeft'] }, pod: 'list-style-type.' },
  { id: 'css18', t: 'Odnośniki w #tekst po najechaniu kursorem zmieniają kolor na Orange.', html: DOM, wzor: '#tekst a:hover { color: Orange; }', zle: '#tekst a { color: Orange; }', por: { a: ['color'] }, musi: ':hover', musiOpis: 'Użyj pseudoklasy :hover.', pod: 'Selektor z :hover.' },
  { id: 'css19', t: 'Ukryj element .karta tak, żeby nie zajmował miejsca, a akapitowi #tekst ustaw przezroczystość 0.6.', html: DOM, wzor: '.karta { display: none; } #tekst { opacity: 0.6; }', zle: '.karta { visibility: hidden; } #tekst { opacity: 0.6; }', por: { '.karta': ['display'], '#tekst': ['opacity'] }, pod: 'display: none.' },
  { id: 'css20', t: 'Ustaw wszystkim elementom (*) krój Tahoma, a body kolor tła DarkSlateGray i biały tekst.', html: DOM, wzor: '* { font-family: Tahoma; } body { background-color: DarkSlateGray; color: white; }', zle: 'p { font-family: Tahoma; } body { background-color: DarkSlateGray; color: white; }', por: { body: ['backgroundColor', 'color'], li: ['fontFamily'], '.karta': ['fontFamily'] }, pod: 'Selektor uniwersalny *.' } ] }
];

const JS = [
{ id: 'js-podstawy', tytul: 'Zmienne, typy, warunki', lekcja: `
<pre>let wiek = 17;              // zmienna
const VAT = 0.23;           // stała
let imie = 'Ola';
console.log('Cześć ' + imie);       // + skleja napisy
console.log(\`Masz \${wiek} lat\`);  // szablon w odwrotnych apostrofach
if (wiek &gt;= 18 &amp;&amp; imie !== '') { … } else if (wiek &gt; 15) { … } else { … }
let wynik = wiek &gt;= 18 ? 'dorosły' : 'dziecko';
parseInt('12') + 1;   // 13
'12' + 1;             // '121'
Math.round(2.5); Math.floor(2.9); Math.max(3, 7); Math.sqrt(16); Math.random();</pre>
<ul><li><code>===</code> porównuje wartość i typ, <code>==</code> zamienia typy.</li><li><code>&amp;&amp;</code> i, <code>||</code> lub, <code>!</code> nie.</li><li>Na egzaminie liczby z formularzy przychodzą jako tekst: zamieniaj je przez <code>Number</code>, <code>parseInt</code> lub <code>parseFloat</code>.</li></ul>`,
  zadania: [
  { id: 'js1', t: 'Napisz funkcję brutto(netto) zwracającą cenę z 23% VAT zaokrągloną do 2 miejsc jako liczbę.', start: 'function brutto(netto) {\n  \n}', wzor: 'function brutto(netto) { return Math.round(netto * 1.23 * 100) / 100; }', zle: 'function brutto(netto) { return netto * 0.23; }', wyr: ['brutto(100)', 'brutto(19.99)', 'brutto(0)'], pod: 'Math.round(x * 100) / 100.' },
  { id: 'js2', t: 'Funkcja ocena(pkt) dla wyniku na 40 punktów zwraca „zdane”, gdy to co najmniej 50%, a inaczej „niezdane”.', start: 'function ocena(pkt) {\n  \n}', wzor: "function ocena(pkt) { return pkt >= 20 ? 'zdane' : 'niezdane'; }", zle: "function ocena(pkt) { return pkt > 20 ? 'zdane' : 'niezdane'; }", wyr: ['ocena(20)', 'ocena(19)', 'ocena(40)'], pod: '50% z 40 to 20.' },
  { id: 'js3', t: 'Funkcja suma(a, b) dostaje liczby jako tekst (np. "2", "3") i zwraca ich sumę jako liczbę.', start: 'function suma(a, b) {\n  \n}', wzor: 'function suma(a, b) { return Number(a) + Number(b); }', zle: 'function suma(a, b) { return a + b; }', wyr: ['suma("2", "3")', 'suma("1.5", "2")'], pod: 'Number albo parseFloat.' },
  { id: 'js4', t: 'Funkcja bilet(wiek) zwraca cenę: dzieci poniżej 7 lat 0, od 7 do 17 lat 10, od 65 lat 12, pozostali 20.', start: 'function bilet(wiek) {\n  \n}', wzor: 'function bilet(wiek) { if (wiek < 7) return 0; if (wiek <= 17) return 10; if (wiek >= 65) return 12; return 20; }', zle: 'function bilet(wiek) { if (wiek < 7) return 0; if (wiek < 17) return 10; if (wiek > 65) return 12; return 20; }', wyr: ['bilet(3)', 'bilet(7)', 'bilet(17)', 'bilet(18)', 'bilet(64)', 'bilet(65)'], pod: 'Sprawdź granice: 7, 17 i 65.' },
  { id: 'js5', t: 'Funkcja przestepny(rok) zwraca true dla roku przestępnego (podzielny przez 4 i nie przez 100, albo podzielny przez 400).', start: 'function przestepny(rok) {\n  \n}', wzor: 'function przestepny(rok) { return (rok % 4 === 0 && rok % 100 !== 0) || rok % 400 === 0; }', zle: 'function przestepny(rok) { return rok % 4 === 0; }', wyr: ['przestepny(2024)', 'przestepny(1900)', 'przestepny(2000)', 'przestepny(2026)'], pod: 'Reszta z dzielenia % i nawiasy.' } ] },
{ id: 'js-petle', tytul: 'Pętle i tablice', lekcja: `
<pre>for (let i = 1; i &lt;= 5; i++) { … }
let i = 0; while (i &lt; 5) { i++; }
const t = [4, 8, 15];
t.push(16);  t.length;  t[0];  t.indexOf(8);  t.includes(15);
for (const x of t) console.log(x);
t.sort((a, b) =&gt; a - b);   // sortowanie liczb rosnąco
t.join(', ');              // '4, 8, 15, 16'
t.reverse(); t.slice(0, 2); t.map(x =&gt; x * 2); t.filter(x =&gt; x &gt; 5);</pre>
<p>Uwaga: <code>sort()</code> bez funkcji sortuje jak napisy, więc 10 trafi przed 9.</p>`,
  zadania: [
  { id: 'js6', t: 'Funkcja silnia(n) zwraca n! (iloczyn liczb od 1 do n), dla 0 zwraca 1. Użyj pętli.', start: 'function silnia(n) {\n  \n}', wzor: 'function silnia(n) { let w = 1; for (let i = 2; i <= n; i++) w *= i; return w; }', zle: 'function silnia(n) { let w = 1; for (let i = 2; i < n; i++) w *= i; return w; }', wyr: ['silnia(0)', 'silnia(1)', 'silnia(5)', 'silnia(10)'], musi: 'for|while', musiOpis: 'Użyj pętli.', pod: 'Mnożenie w pętli do n włącznie.' },
  { id: 'js7', t: 'Funkcja srednia(t) zwraca średnią liczb z tablicy.', start: 'function srednia(t) {\n  \n}', wzor: 'function srednia(t) { let s = 0; for (const x of t) s += x; return s / t.length; }', zle: 'function srednia(t) { let s = 0; for (const x of t) s += x; return s / 2; }', wyr: ['srednia([2, 4, 6])', 'srednia([5])', 'srednia([1, 2, 3, 4])'], pod: 'Suma podzielona przez t.length.' },
  { id: 'js8', t: 'Funkcja najwieksza(t) zwraca największą liczbę z tablicy (także ujemnych).', start: 'function najwieksza(t) {\n  \n}', wzor: 'function najwieksza(t) { let m = t[0]; for (const x of t) if (x > m) m = x; return m; }', zle: 'function najwieksza(t) { let m = 0; for (const x of t) if (x > m) m = x; return m; }', wyr: ['najwieksza([3, 9, 2])', 'najwieksza([-5, -2, -9])'], pod: 'Zacznij od t[0], nie od 0.' },
  { id: 'js9', t: 'Funkcja parzyste(n) zwraca tablicę liczb parzystych od 2 do n włącznie.', start: 'function parzyste(n) {\n  \n}', wzor: 'function parzyste(n) { const t = []; for (let i = 2; i <= n; i += 2) t.push(i); return t; }', zle: 'function parzyste(n) { const t = []; for (let i = 0; i < n; i += 2) t.push(i); return t; }', wyr: ['parzyste(10)', 'parzyste(1)', 'parzyste(7)'], pod: 'push w pętli co 2.' },
  { id: 'js10', t: 'Funkcja posortuj(t) zwraca tablicę liczb posortowaną malejąco.', start: 'function posortuj(t) {\n  \n}', wzor: 'function posortuj(t) { return [...t].sort((a, b) => b - a); }', zle: 'function posortuj(t) { return [...t].sort().reverse(); }', wyr: ['posortuj([3, 10, 9, 1])', 'posortuj([5])'], pod: 'sort((a, b) => b - a).' } ] },
{ id: 'js-napisy', tytul: 'Napisy i funkcje', lekcja: `
<pre>const s = 'Technikum';
s.length;            // 9
s.toUpperCase();     // 'TECHNIKUM'
s.charAt(0); s[0];   // 'T'
s.slice(0, 4);       // 'Tech'
s.indexOf('n');      // 4 (–1, gdy brak)
s.includes('kum');   // true
s.replace('T', 't'); s.replaceAll('a', 'A');
s.split('');         // tablica liter
'  x  '.trim();
(3.14159).toFixed(2);  // '3.14' (napis!)
function pole(r) { return Math.PI * r * r; }
const kwadrat = x =&gt; x * x;</pre>`,
  zadania: [
  { id: 'js11', t: 'Funkcja inicjaly(imie, nazwisko) zwraca np. „J.K.” dla Jan Kowalski.', start: 'function inicjaly(imie, nazwisko) {\n  \n}', wzor: "function inicjaly(imie, nazwisko) { return imie[0].toUpperCase() + '.' + nazwisko[0].toUpperCase() + '.'; }", zle: "function inicjaly(imie, nazwisko) { return imie[0] + nazwisko[0]; }", wyr: ['inicjaly("Jan", "Kowalski")', 'inicjaly("ola", "nowak")'], pod: 'Pierwsza litera to s[0]; też wielką literą.' },
  { id: 'js12', t: 'Funkcja palindrom(s) zwraca true, gdy napis czytany od tyłu jest taki sam (bez rozróżniania wielkości liter).', start: 'function palindrom(s) {\n  \n}', wzor: "function palindrom(s) { const m = s.toLowerCase(); return m === m.split('').reverse().join(''); }", zle: "function palindrom(s) { return s === s.split('').reverse().join(''); }", wyr: ['palindrom("kajak")', 'palindrom("Kajak")', 'palindrom("rower")'], pod: 'split, reverse, join i toLowerCase.' },
  { id: 'js13', t: 'Funkcja samogloski(s) zwraca liczbę samogłosek a, e, i, o, u, y (także ą, ę, ó) w napisie, bez względu na wielkość liter.', start: 'function samogloski(s) {\n  \n}', wzor: "function samogloski(s) { let n = 0; for (const c of s.toLowerCase()) if ('aeiouyąęó'.includes(c)) n++; return n; }", zle: "function samogloski(s) { let n = 0; for (const c of s) if ('aeiou'.includes(c)) n++; return n; }", wyr: ['samogloski("Ala ma kota")', 'samogloski("Gęślą jaźń")', 'samogloski("xyz")'], pod: 'Pętla po literach i includes.' },
  { id: 'js14', t: 'Funkcja cena(x) zwraca napis z kwotą i dwoma miejscami po przecinku, np. cena(5) → „5.00 zł”.', start: 'function cena(x) {\n  \n}', wzor: "function cena(x) { return x.toFixed(2) + ' zł'; }", zle: "function cena(x) { return x + ' zł'; }", wyr: ['cena(5)', 'cena(3.456)', 'cena(0.1 + 0.2)'], pod: 'toFixed(2).' },
  { id: 'js15', t: 'Funkcja login(imie, nazwisko) zwraca małymi literami 3 pierwsze litery imienia i całe nazwisko, np. „jankowalski”.', start: 'function login(imie, nazwisko) {\n  \n}', wzor: 'function login(imie, nazwisko) { return (imie.slice(0, 3) + nazwisko).toLowerCase(); }', zle: 'function login(imie, nazwisko) { return imie.slice(0, 3) + nazwisko; }', wyr: ['login("Jan", "Kowalski")', 'login("Ola", "Nowak")', 'login("Bartosz", "Lis")'], pod: 'slice(0, 3) i toLowerCase.' } ] },
{ id: 'js-dom', tytul: 'DOM: zmiana strony', lekcja: `
<pre>const el = document.getElementById('wynik');
el.innerHTML = '&lt;b&gt;Gotowe&lt;/b&gt;';   // z HTML
el.textContent = 'zwykły tekst';
el.style.backgroundColor = 'yellow';   // właściwości CSS w zapisie camelCase
el.classList.add('wazne'); el.classList.toggle('ukryj');
document.querySelector('.karta');      // pierwszy pasujący
document.querySelectorAll('li');       // wszystkie
const nowy = document.createElement('li');
nowy.textContent = 'czwarty';
document.querySelector('ul').appendChild(nowy);
document.getElementById('obraz').src = 'kot.jpg';</pre>`,
  zadania: [
  { id: 'js16', t: 'Wpisz w akapit #wynik tekst „Witaj!”.', html: '<p id="wynik"></p>', wzor: "document.getElementById('wynik').textContent = 'Witaj!';", zle: "document.getElementById('wynik').value = 'Witaj!';", wyr: ["document.getElementById('wynik').textContent"], opisy: ['treść #wynik'], pod: 'textContent albo innerHTML.' },
  { id: 'js17', t: 'Ustaw akapitowi #info czerwony kolor tekstu i rozmiar 24px.', html: '<p id="info">Uwaga</p>', wzor: "const p = document.getElementById('info'); p.style.color = 'red'; p.style.fontSize = '24px';", zle: "const p = document.getElementById('info'); p.style.color = 'red'; p.style.font-size = '24px';", wyr: ["document.getElementById('info').style.color", "document.getElementById('info').style.fontSize"], opisy: ['kolor #info', 'rozmiar #info'], pod: 'W JS font-size to fontSize.' },
  { id: 'js18', t: 'Dodaj do listy #lista trzy elementy li: „a”, „b”, „c”, używając pętli i createElement.', html: '<ul id="lista"></ul>', wzor: "for (const x of ['a', 'b', 'c']) { const li = document.createElement('li'); li.textContent = x; document.getElementById('lista').appendChild(li); }", zle: "const li = document.createElement('li'); li.textContent = 'a'; document.getElementById('lista').appendChild(li);", wyr: ["document.getElementById('lista').innerHTML"], opisy: ['zawartość listy'], musi: 'createElement', musiOpis: 'Użyj createElement.', pod: 'createElement, textContent, appendChild.' },
  { id: 'js19', t: 'Wszystkim elementom li z klasą zaznacz dodaj klasę wybrany, a pozostałym li nic nie zmieniaj.', html: '<ul><li class="zaznacz">1</li><li>2</li><li class="zaznacz">3</li></ul>', wzor: "document.querySelectorAll('li.zaznacz').forEach(li => li.classList.add('wybrany'));", zle: "document.querySelector('li.zaznacz').classList.add('wybrany');", wyr: ["[...document.querySelectorAll('li')].map(l => l.className)"], opisy: ['klasy elementów li'], pod: 'querySelectorAll i forEach.' },
  { id: 'js20', t: 'Wypisz w #tabliczka tabliczkę mnożenia 1–3 jako tabelę HTML (3 wiersze, 3 kolumny, w komórkach iloczyny).', html: '<div id="tabliczka"></div>', wzor: "let h = '<table>'; for (let i = 1; i <= 3; i++) { h += '<tr>'; for (let j = 1; j <= 3; j++) h += '<td>' + i * j + '</td>'; h += '</tr>'; } document.getElementById('tabliczka').innerHTML = h + '</table>';", zle: "let h = '<table>'; for (let i = 1; i <= 3; i++) { h += '<tr>'; for (let j = 1; j <= 3; j++) h += '<td>' + (i + j) + '</td>'; h += '</tr>'; } document.getElementById('tabliczka').innerHTML = h + '</table>';", wyr: ["[...document.querySelectorAll('#tabliczka td')].map(t => t.textContent).join(' ')"], opisy: ['komórki tabeli'], pod: 'Dwie pętle: wiersze i komórki.' } ] },
{ id: 'js-zdarzenia', tytul: 'Zdarzenia i formularze', lekcja: `
<pre>&lt;input id="ilosc" type="number"&gt;
&lt;input id="dostawa" type="checkbox"&gt;
&lt;select id="rozmiar"&gt;&lt;option value="10"&gt;mała&lt;/option&gt;&lt;option value="15"&gt;duża&lt;/option&gt;&lt;/select&gt;
&lt;button onclick="oblicz()"&gt;Oblicz&lt;/button&gt;
&lt;p id="wynik"&gt;&lt;/p&gt;
&lt;script&gt;
function oblicz() {
  const ilosc = Number(document.getElementById('ilosc').value);
  let koszt = ilosc * Number(document.getElementById('rozmiar').value);
  if (document.getElementById('dostawa').checked) koszt += 5;
  document.getElementById('wynik').innerHTML = 'Koszt: ' + koszt + ' zł';
}
&lt;/script&gt;</pre>
<ul><li>Zamiast <code>onclick</code> w HTML: <code>przycisk.addEventListener('click', oblicz)</code>.</li><li>Radio: <code>document.querySelector('input[name="r"]:checked').value</code>.</li><li><code>value</code> zawsze jest tekstem.</li></ul>
<p>W testach klikamy przycisk za Ciebie, więc obsługa ma działać po kliknięciu, a nie po załadowaniu strony.</p>`,
  zadania: [
  { id: 'js21', html: '<input id="imie"><button id="ok">OK</button><p id="wynik"></p>', t: 'Po kliknięciu #ok wypisz w #wynik „Cześć, IMIĘ!”, gdzie imię pochodzi z pola #imie.', wzor: "document.getElementById('ok').onclick = () => { document.getElementById('wynik').textContent = 'Cześć, ' + document.getElementById('imie').value + '!'; };", zle: "document.getElementById('wynik').textContent = 'Cześć, ' + document.getElementById('imie').value + '!';", wyr: ["(document.getElementById('imie').value = 'Ola', document.getElementById('ok').click(), document.getElementById('wynik').textContent)"], opisy: ['imię Ola i klik'], pod: 'Kod w funkcji obsługującej kliknięcie.' },
  { id: 'js22', html: '<input id="a" type="number"><input id="b" type="number"><button id="licz">=</button><span id="wynik"></span>', t: 'Po kliknięciu #licz wypisz w #wynik sumę liczb z pól #a i #b.', wzor: "document.getElementById('licz').addEventListener('click', () => { document.getElementById('wynik').textContent = Number(document.getElementById('a').value) + Number(document.getElementById('b').value); });", zle: "document.getElementById('licz').addEventListener('click', () => { document.getElementById('wynik').textContent = document.getElementById('a').value + document.getElementById('b').value; });", wyr: ["(document.getElementById('a').value = '2', document.getElementById('b').value = '3', document.getElementById('licz').click(), document.getElementById('wynik').textContent)"], opisy: ['2 + 3'], pod: 'Zamień tekst na liczby.' },
  { id: 'js23', html: '<input id="kg" type="number"><input id="ekspres" type="checkbox"><button id="cena">Policz</button><p id="wynik"></p>', t: 'Przesyłka kosztuje 3 zł za kg, a ekspres (zaznaczone #ekspres) dodaje 10 zł. Po kliknięciu #cena wypisz w #wynik „Koszt: X zł”.', wzor: "document.getElementById('cena').onclick = () => { let k = 3 * Number(document.getElementById('kg').value); if (document.getElementById('ekspres').checked) k += 10; document.getElementById('wynik').textContent = 'Koszt: ' + k + ' zł'; };", zle: "document.getElementById('cena').onclick = () => { let k = 3 * Number(document.getElementById('kg').value); document.getElementById('wynik').textContent = 'Koszt: ' + k + ' zł'; };", wyr: ["(kg.value = '4', ekspres.checked = false, cena.click(), wynik.textContent)", "(kg.value = '4', ekspres.checked = true, cena.click(), wynik.textContent)"], opisy: ['4 kg bez ekspresu', '4 kg z ekspresem'], pod: 'Właściwość checked.' },
  { id: 'js24', html: '<label><input type="radio" name="p" value="20" checked> mała</label><label><input type="radio" name="p" value="30"> duża</label><input id="szt" type="number" value="1"><button id="zamow">Zamów</button><p id="wynik"></p>', t: 'Pizza: cena z zaznaczonego radio (name p) razy liczba sztuk z #szt. Po kliknięciu #zamow wypisz w #wynik samą kwotę.', wzor: "zamow.onclick = () => { wynik.textContent = Number(document.querySelector('input[name=\"p\"]:checked').value) * Number(szt.value); };", zle: "zamow.onclick = () => { wynik.textContent = Number(document.querySelector('input[name=\"p\"]').value) * Number(szt.value); };", wyr: ["(document.querySelectorAll('[name=p]')[1].checked = true, szt.value = '2', zamow.click(), wynik.textContent)"], opisy: ['duża × 2'], pod: ':checked w selektorze.' },
  { id: 'js25', html: '<input id="haslo" type="password"><button id="spr">Sprawdź</button><p id="wynik"></p>', t: 'Po kliknięciu #spr wypisz w #wynik „Hasło za krótkie”, gdy ma mniej niż 8 znaków, „Brak cyfry”, gdy nie zawiera cyfry, a inaczej „Hasło poprawne”.', wzor: "spr.onclick = () => { const h = haslo.value; wynik.textContent = h.length < 8 ? 'Hasło za krótkie' : !/[0-9]/.test(h) ? 'Brak cyfry' : 'Hasło poprawne'; };", zle: "spr.onclick = () => { const h = haslo.value; wynik.textContent = h.length < 8 ? 'Hasło za krótkie' : 'Hasło poprawne'; };", wyr: ["(haslo.value = 'abc1', spr.click(), wynik.textContent)", "(haslo.value = 'abcdefgh', spr.click(), wynik.textContent)", "(haslo.value = 'abcdefg1', spr.click(), wynik.textContent)"], opisy: ['abc1', 'abcdefgh', 'abcdefg1'], pod: 'length i sprawdzenie cyfry pętlą albo /[0-9]/.test().' } ] }
];
