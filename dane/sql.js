// wzor = poprawne zapytanie, zle = typowy błąd (test.sh pilnuje, że nie przechodzi), sprawdz = stan bazy po poleceniu
const SQL = [
{ id: 'select', tytul: 'SELECT i WHERE', lekcja: `
<p><code>SELECT</code> wybiera kolumny, <code>FROM</code> tabelę, a <code>WHERE</code> wiersze. Gwiazdka oznacza wszystkie kolumny, ale na egzaminie wypisuj tylko te z treści zadania: słowo „jedynie” jest w kryteriach oceny.</p>
<pre>SELECT nazwa, cena
FROM produkty
WHERE kategoria = 'kable' AND cena &lt; 50;</pre>
<ul><li>Tekst i daty piszesz w apostrofach, liczby bez.</li><li>„Różne od” to <code>&lt;&gt;</code> albo <code>!=</code>.</li><li><code>AND</code> działa przed <code>OR</code>, więc przy mieszaniu dawaj nawiasy.</li></ul>`,
  zadania: [
  { id: 'select1', t: 'Wybierz nazwę i cenę wszystkich produktów.', wzor: 'SELECT nazwa, cena FROM produkty', zle: 'SELECT * FROM produkty', pod: 'Dwie kolumny po przecinku, bez WHERE.' },
  { id: 'select2', t: 'Wybierz imię i nazwisko klientów z Krakowa.', wzor: "SELECT imie, nazwisko FROM klienci WHERE miasto = 'Kraków'", zle: 'SELECT imie, nazwisko FROM klienci', pod: 'Miasto to tekst, więc apostrofy.' },
  { id: 'select3', t: 'Wybierz nazwę i ilość produktów, które kosztują co najmniej 100 zł.', wzor: 'SELECT nazwa, ilosc FROM produkty WHERE cena >= 100', zle: 'SELECT nazwa, ilosc FROM produkty WHERE cena > 100', pod: '„Co najmniej” obejmuje też samo 100.' },
  { id: 'select4', t: 'Wybierz nazwę i cenę akcesoriów tańszych niż 100 zł.', wzor: "SELECT nazwa, cena FROM produkty WHERE kategoria = 'akcesoria' AND cena < 100", zle: "SELECT nazwa, cena FROM produkty WHERE kategoria = 'akcesoria' OR cena < 100", pod: 'Oba warunki muszą być spełnione naraz.' },
  { id: 'select5', t: 'Wybierz imię, nazwisko i rok urodzenia klientów z Gdańska lub Krakowa, urodzonych po 1990 roku.', wzor: "SELECT imie, nazwisko, rok_urodzenia FROM klienci WHERE (miasto = 'Gdańsk' OR miasto = 'Kraków') AND rok_urodzenia > 1990", zle: "SELECT imie, nazwisko, rok_urodzenia FROM klienci WHERE miasto = 'Gdańsk' OR miasto = 'Kraków' AND rok_urodzenia > 1990", pod: 'AND wykonuje się przed OR. Użyj nawiasów.' } ] },
{ id: 'order', tytul: 'ORDER BY, LIMIT, DISTINCT', lekcja: `
<p><code>ORDER BY</code> sortuje: <code>ASC</code> rosnąco (domyślnie), <code>DESC</code> malejąco. <code>LIMIT</code> obcina wynik, a <code>DISTINCT</code> usuwa powtórzenia.</p>
<pre>SELECT nazwa, cena
FROM produkty
ORDER BY cena DESC
LIMIT 3;</pre>
<ul><li>„Trzy najdroższe” to zawsze sortowanie <b>i</b> <code>LIMIT</code>.</li><li>Sortować można po kilku kolumnach: <code>ORDER BY nazwisko, imie</code>.</li><li>Kolejność klauzul: <code>WHERE</code> → <code>ORDER BY</code> → <code>LIMIT</code>.</li></ul>`,
  zadania: [
  { id: 'order1', t: 'Wybierz nazwę i cenę produktów od najtańszego do najdroższego.', wzor: 'SELECT nazwa, cena FROM produkty ORDER BY cena', zle: 'SELECT nazwa, cena FROM produkty', kolejnosc: true, pod: 'Rosnąco to domyślny kierunek.' },
  { id: 'order2', t: 'Wybierz nazwę i cenę trzech najdroższych produktów, zaczynając od najdroższego.', wzor: 'SELECT nazwa, cena FROM produkty ORDER BY cena DESC LIMIT 3', zle: 'SELECT nazwa, cena FROM produkty ORDER BY cena LIMIT 3', kolejnosc: true, pod: 'DESC i LIMIT.' },
  { id: 'order3', t: 'Wypisz kategorie produktów bez powtórzeń.', wzor: 'SELECT DISTINCT kategoria FROM produkty', zle: 'SELECT kategoria FROM produkty', pod: 'DISTINCT stoi zaraz po SELECT.' },
  { id: 'order4', t: 'Wybierz nazwisko i imię klientów, alfabetycznie według nazwiska, a przy tym samym nazwisku według imienia.', wzor: 'SELECT nazwisko, imie FROM klienci ORDER BY nazwisko, imie', zle: 'SELECT nazwisko, imie FROM klienci ORDER BY nazwisko, imie DESC', kolejnosc: true, pod: 'Dwie kolumny w ORDER BY po przecinku.' },
  { id: 'order5', t: 'Wybierz imię, nazwisko i rok urodzenia najmłodszego klienta z Krakowa.', wzor: "SELECT imie, nazwisko, rok_urodzenia FROM klienci WHERE miasto = 'Kraków' ORDER BY rok_urodzenia DESC LIMIT 1", zle: "SELECT imie, nazwisko, rok_urodzenia FROM klienci WHERE miasto = 'Kraków' ORDER BY rok_urodzenia LIMIT 1", pod: 'Najmłodszy ma największy rok urodzenia.' } ] },
{ id: 'like', tytul: 'LIKE, IN, BETWEEN, NULL', lekcja: `
<p><code>LIKE</code> szuka wzorca: <code>%</code> to dowolny ciąg znaków (też pusty), <code>_</code> to dokładnie jeden znak.</p>
<pre>SELECT * FROM klienci
WHERE nazwisko LIKE 'Now%'
  AND rok_urodzenia BETWEEN 1980 AND 1999;</pre>
<ul><li><code>BETWEEN a AND b</code> zawiera oba końce.</li><li><code>IN ('a', 'b')</code> zastępuje kilka <code>OR</code>.</li><li>Pustą wartość sprawdza <code>IS NULL</code>. Zapis <code>= NULL</code> nigdy nie jest prawdziwy.</li></ul>`,
  zadania: [
  { id: 'like1', t: 'Wybierz nazwy produktów zaczynających się od słowa „Laptop”.', wzor: "SELECT nazwa FROM produkty WHERE nazwa LIKE 'Laptop%'", zle: "SELECT nazwa FROM produkty WHERE nazwa = 'Laptop'", pod: 'Procent na końcu wzorca.' },
  { id: 'like2', t: 'Wybierz imię i nazwisko klientów, których nazwisko kończy się na „ski” lub „ska”. Użyj jednego wzorca.', wzor: "SELECT imie, nazwisko FROM klienci WHERE nazwisko LIKE '%sk_'", zle: "SELECT imie, nazwisko FROM klienci WHERE nazwisko LIKE '%ski'", pod: 'Jeden dowolny znak to podkreślenie.' },
  { id: 'like3', t: 'Wybierz nazwę i cenę produktów w cenie od 35 do 100 zł włącznie.', wzor: 'SELECT nazwa, cena FROM produkty WHERE cena BETWEEN 35 AND 100', zle: 'SELECT nazwa, cena FROM produkty WHERE cena > 35 AND cena < 100', pod: 'BETWEEN obejmuje oba końce.' },
  { id: 'like4', t: 'Wybierz nazwę i kategorię produktów z kategorii monitory, kable lub komputery.', wzor: "SELECT nazwa, kategoria FROM produkty WHERE kategoria IN ('monitory', 'kable', 'komputery')", zle: "SELECT nazwa, kategoria FROM produkty WHERE kategoria IN ('monitory', 'kable')", pod: 'Lista w nawiasach po IN.' },
  { id: 'like5', t: 'Wybierz imię i nazwisko klientów, którzy nie mają wpisanego miasta.', wzor: 'SELECT imie, nazwisko FROM klienci WHERE miasto IS NULL', zle: 'SELECT imie, nazwisko FROM klienci WHERE miasto = NULL', pod: 'Z NULL nie porównuje się znakiem równości.' } ] },
{ id: 'funkcje', tytul: 'Funkcje i aliasy', lekcja: `
<p>Funkcje przetwarzają wartości, a <code>AS</code> nadaje kolumnie nazwę w wyniku.</p>
<pre>SELECT CONCAT(imie, ' ', nazwisko) AS klient,
       2026 - rok_urodzenia AS wiek
FROM klienci;</pre>
<table><tr><th>Tekst</th><td><code>CONCAT</code>, <code>LEFT(x, n)</code>, <code>UPPER</code>, <code>LENGTH</code></td></tr><tr><th>Liczby</th><td><code>ROUND(x, 2)</code>, <code>FLOOR</code>, <code>CEIL</code></td></tr><tr><th>Daty</th><td><code>YEAR</code>, <code>MONTH</code>, <code>DAY</code>, <code>NOW</code>, <code>CURDATE</code></td></tr></table>
<p><code>LENGTH</code> liczy bajty, a <code>CHAR_LENGTH</code> znaki: dla polskich liter wynik się różni.</p>`,
  zadania: [
  { id: 'funkcje1', t: 'Wypisz imię i nazwisko klientów w jednej kolumnie o nazwie klient, rozdzielone spacją.', wzor: "SELECT CONCAT(imie, ' ', nazwisko) AS klient FROM klienci", zle: "SELECT CONCAT(imie, nazwisko) AS klient FROM klienci", aliasy: true, pod: 'Spacja to osobny argument CONCAT.' },
  { id: 'funkcje2', t: 'Wypisz nazwę produktu i cenę zaokrągloną do pełnych złotych, w kolumnie zaokraglona.', wzor: 'SELECT nazwa, ROUND(cena) AS zaokraglona FROM produkty', zle: 'SELECT nazwa, FLOOR(cena) AS zaokraglona FROM produkty', aliasy: true, pod: 'ROUND bez drugiego argumentu.' },
  { id: 'funkcje3', t: 'Wybierz id i datę zamówień złożonych w 2026 roku.', wzor: 'SELECT id, data_zam FROM zamowienia WHERE YEAR(data_zam) = 2026', zle: 'SELECT id, data_zam FROM zamowienia WHERE data_zam > 2026', pod: 'YEAR wyciąga rok z daty.' },
  { id: 'funkcje4', t: 'Wypisz pierwsze trzy litery nazwy produktu wielkimi literami, w kolumnie kod.', wzor: 'SELECT UPPER(LEFT(nazwa, 3)) AS kod FROM produkty', zle: 'SELECT LEFT(nazwa, 3) AS kod FROM produkty', aliasy: true, pod: 'Funkcje można zagnieżdżać.' },
  { id: 'funkcje5', t: 'Wypisz nazwę i wartość zapasu (cena razy ilość) w kolumnie wartosc, od największej.', wzor: 'SELECT nazwa, cena * ilosc AS wartosc FROM produkty ORDER BY wartosc DESC', zle: 'SELECT nazwa, cena + ilosc AS wartosc FROM produkty ORDER BY wartosc DESC', aliasy: true, kolejnosc: true, pod: 'W ORDER BY można użyć aliasu.' } ] },
{ id: 'group', tytul: 'GROUP BY i HAVING', lekcja: `
<p>Funkcje agregujące liczą jedną wartość z wielu wierszy: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>. <code>GROUP BY</code> liczy je osobno dla każdej grupy.</p>
<pre>SELECT kategoria, COUNT(*) AS ile
FROM produkty
WHERE ilosc &gt; 0
GROUP BY kategoria
HAVING COUNT(*) &gt;= 2;</pre>
<ul><li><code>WHERE</code> odsiewa wiersze <b>przed</b> grupowaniem, <code>HAVING</code> grupy <b>po</b> nim.</li><li><code>COUNT(*)</code> liczy wiersze, <code>COUNT(kolumna)</code> pomija NULL.</li><li>W SELECT obok agregatu wypisuj tylko kolumny z <code>GROUP BY</code>.</li></ul>`,
  zadania: [
  { id: 'group1', t: 'Policz wszystkich klientów.', wzor: 'SELECT COUNT(*) FROM klienci', zle: 'SELECT COUNT(miasto) FROM klienci', pod: 'COUNT(miasto) pominie klienta bez miasta.' },
  { id: 'group2', t: 'Dla każdej kategorii wypisz jej nazwę i liczbę produktów.', wzor: 'SELECT kategoria, COUNT(*) FROM produkty GROUP BY kategoria', zle: 'SELECT kategoria, COUNT(*) FROM produkty', pod: '„Dla każdej” prawie zawsze oznacza GROUP BY.' },
  { id: 'group3', t: 'Wypisz kategorię i średnią cenę w niej, zaokrągloną do 2 miejsc.', wzor: 'SELECT kategoria, ROUND(AVG(cena), 2) FROM produkty GROUP BY kategoria', zle: 'SELECT kategoria, ROUND(AVG(cena)) FROM produkty GROUP BY kategoria', pod: 'ROUND obejmuje AVG.' },
  { id: 'group4', t: 'Wypisz miasta, z których jest co najmniej 2 klientów, i ich liczbę.', wzor: 'SELECT miasto, COUNT(*) FROM klienci GROUP BY miasto HAVING COUNT(*) >= 2', zle: 'SELECT miasto, COUNT(*) FROM klienci GROUP BY miasto HAVING COUNT(*) > 2', pod: 'Warunek na grupę to HAVING.' },
  { id: 'group5', t: 'Dla produktów dostępnych (ilość większa od 0) wypisz kategorię i najniższą cenę, tylko gdy jest niższa niż 100 zł.', wzor: 'SELECT kategoria, MIN(cena) FROM produkty WHERE ilosc > 0 GROUP BY kategoria HAVING MIN(cena) < 100', zle: 'SELECT kategoria, MIN(cena) FROM produkty GROUP BY kategoria HAVING MIN(cena) < 100', pod: 'Jeden warunek do WHERE, drugi do HAVING.' } ] },
{ id: 'join', tytul: 'JOIN: łączenie tabel', lekcja: `
<p>Dane z dwóch tabel łączysz przez klucz obcy: <code>zamowienia.klient_id</code> wskazuje na <code>klienci.id</code>.</p>
<pre>SELECT k.nazwisko, z.data_zam
FROM zamowienia z
JOIN klienci k ON z.klient_id = k.id;</pre>
<ul><li><code>JOIN</code> (czyli <code>INNER JOIN</code>) zwraca tylko pasujące pary.</li><li><code>LEFT JOIN</code> zwraca wszystko z lewej tabeli, a brak pary uzupełnia NULL.</li><li>Bez warunku <code>ON</code> dostaniesz każdy wiersz z każdym.</li><li>Gdy kolumna jest w obu tabelach, dopisz tabelę: <code>k.id</code>.</li></ul>`,
  zadania: [
  { id: 'join1', t: 'Wypisz id zamówienia, jego datę i nazwisko klienta.', wzor: 'SELECT z.id, z.data_zam, k.nazwisko FROM zamowienia z JOIN klienci k ON z.klient_id = k.id', zle: 'SELECT z.id, z.data_zam, k.nazwisko FROM zamowienia z JOIN klienci k ON z.id = k.id', pod: 'Łączy klient_id z id klienta.' },
  { id: 'join2', t: 'Wypisz imię i nazwisko klientów, którzy mają zamówienie o statusie „nowe”.', wzor: "SELECT k.imie, k.nazwisko FROM klienci k JOIN zamowienia z ON z.klient_id = k.id WHERE z.status = 'nowe'", zle: 'SELECT k.imie, k.nazwisko FROM klienci k JOIN zamowienia z ON z.klient_id = k.id', pod: 'JOIN, a potem WHERE.' },
  { id: 'join3', t: 'Wypisz imię i nazwisko klientów, którzy nie złożyli żadnego zamówienia.', wzor: 'SELECT k.imie, k.nazwisko FROM klienci k LEFT JOIN zamowienia z ON z.klient_id = k.id WHERE z.id IS NULL', zle: 'SELECT k.imie, k.nazwisko FROM klienci k LEFT JOIN zamowienia z ON z.klient_id = k.id', pod: 'LEFT JOIN i warunek IS NULL.' },
  { id: 'join4', t: 'Dla każdego klienta, również bez zamówień, wypisz nazwisko, imię i liczbę zamówień.', wzor: 'SELECT k.nazwisko, k.imie, COUNT(z.id) FROM klienci k LEFT JOIN zamowienia z ON z.klient_id = k.id GROUP BY k.id, k.nazwisko, k.imie', zle: 'SELECT k.nazwisko, k.imie, COUNT(*) FROM klienci k LEFT JOIN zamowienia z ON z.klient_id = k.id GROUP BY k.id, k.nazwisko, k.imie', pod: 'COUNT(*) dałby 1 klientowi bez zamówień.' },
  { id: 'join5', t: 'Wypisz nazwę każdego sprzedanego produktu i łączną liczbę sztuk z zamówień innych niż anulowane.', wzor: "SELECT p.nazwa, SUM(x.sztuk) FROM produkty p JOIN pozycje x ON x.produkt_id = p.id JOIN zamowienia z ON x.zamowienie_id = z.id WHERE z.status <> 'anulowane' GROUP BY p.id, p.nazwa", zle: 'SELECT p.nazwa, SUM(x.sztuk) FROM produkty p JOIN pozycje x ON x.produkt_id = p.id GROUP BY p.id, p.nazwa', pod: 'Trzy tabele, czyli dwa JOIN.' } ] },
{ id: 'dml', tytul: 'INSERT, UPDATE, DELETE', lekcja: `
<p>Te polecenia zmieniają dane. Tutaj możesz się mylić: każde sprawdzenie startuje od świeżej bazy.</p>
<pre>INSERT INTO produkty (nazwa, kategoria, cena, ilosc)
VALUES ('Głośnik', 'akcesoria', 120, 10);

UPDATE produkty SET ilosc = 5 WHERE id = 8;

DELETE FROM pozycje WHERE id = 13;</pre>
<ul><li>Bez <code>WHERE</code> zmienisz albo usuniesz <b>wszystkie</b> wiersze.</li><li>Klucz z <code>AUTO_INCREMENT</code> pomiń na liście kolumn.</li><li>Nową wartość można liczyć ze starej: <code>SET cena = cena * 1.1</code>.</li></ul>`,
  zadania: [
  { id: 'dml1', t: 'Dodaj klienta: Olga Wrona, Lublin, rok urodzenia 1999. Klucz ma nadać się sam.', wzor: "INSERT INTO klienci (imie, nazwisko, miasto, rok_urodzenia) VALUES ('Olga', 'Wrona', 'Lublin', 1999)", zle: "INSERT INTO klienci (imie, nazwisko, rok_urodzenia) VALUES ('Olga', 'Wrona', 1999)", sprawdz: 'SELECT * FROM klienci', pod: 'Cztery kolumny, bez id.' },
  { id: 'dml2', t: 'Ustaw ilość produktu „Kabel HDMI” na 25.', wzor: "UPDATE produkty SET ilosc = 25 WHERE nazwa = 'Kabel HDMI'", zle: 'UPDATE produkty SET ilosc = 25', sprawdz: 'SELECT * FROM produkty', pod: 'Nie zapomnij o WHERE.' },
  { id: 'dml3', t: 'Podnieś cenę wszystkich akcesoriów o 10 zł.', wzor: "UPDATE produkty SET cena = cena + 10 WHERE kategoria = 'akcesoria'", zle: "UPDATE produkty SET cena = 10 WHERE kategoria = 'akcesoria'", sprawdz: 'SELECT * FROM produkty', pod: 'Nowa cena zależy od starej.' },
  { id: 'dml4', t: 'Usuń z tabeli pozycje wszystkie wiersze zamówienia o id 4.', wzor: 'DELETE FROM pozycje WHERE zamowienie_id = 4', zle: 'DELETE FROM pozycje WHERE id = 4', sprawdz: 'SELECT * FROM pozycje', pod: 'Warunek dotyczy kolumny zamowienie_id.' },
  { id: 'dml5', t: 'Zmień status na „w trakcie” we wszystkich nowych zamówieniach z marca 2026.', wzor: "UPDATE zamowienia SET status = 'w trakcie' WHERE status = 'nowe' AND YEAR(data_zam) = 2026 AND MONTH(data_zam) = 3", zle: "UPDATE zamowienia SET status = 'w trakcie' WHERE status = 'nowe'", sprawdz: 'SELECT * FROM zamowienia', pod: 'Rok i miesiąc: YEAR, MONTH.' } ] },
{ id: 'ddl', tytul: 'CREATE, ALTER, DROP', lekcja: `
<p>Te polecenia zmieniają strukturę bazy, a nie dane.</p>
<pre>CREATE TABLE marki (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nazwa VARCHAR(40) NOT NULL
);
ALTER TABLE marki ADD kraj VARCHAR(30);
ALTER TABLE marki MODIFY nazwa VARCHAR(80);
ALTER TABLE marki DROP COLUMN kraj;
DROP TABLE marki;</pre>
<ul><li><code>VARCHAR(n)</code> tekst, <code>DECIMAL(8,2)</code> kwoty, <code>DATE</code> data.</li><li><code>DELETE FROM t</code> usuwa wiersze, <code>DROP TABLE t</code> całą tabelę.</li><li>Dostęp: <code>GRANT SELECT ON baza.* TO 'jan'@'localhost'</code>, odebranie: <code>REVOKE … FROM</code>.</li></ul>`,
  zadania: [
  { id: 'ddl1', t: 'Utwórz tabelę marki z kolumnami: id (liczba całkowita, klucz główny, autonumerowanie) i nazwa (tekst do 40 znaków, wymagany).', wzor: 'CREATE TABLE marki (id INT PRIMARY KEY AUTO_INCREMENT, nazwa VARCHAR(40) NOT NULL)', zle: 'CREATE TABLE marki (id INT PRIMARY KEY, nazwa VARCHAR(40) NOT NULL)', kolumnyTabeli: 'marki', pod: 'Typy INT i VARCHAR(40).' },
  { id: 'ddl2', t: 'Dodaj do tabeli klienci kolumnę telefon: tekst do 15 znaków.', wzor: 'ALTER TABLE klienci ADD telefon VARCHAR(15)', zle: 'ALTER TABLE klienci ADD telefon INT', kolumnyTabeli: 'klienci', pod: 'ALTER TABLE … ADD.' },
  { id: 'ddl3', t: 'Zmień kolumnę nazwa w tabeli produkty na tekst do 100 znaków, nadal wymagany.', wzor: 'ALTER TABLE produkty MODIFY nazwa VARCHAR(100) NOT NULL', zle: 'ALTER TABLE produkty MODIFY nazwa VARCHAR(100)', kolumnyTabeli: 'produkty', pod: 'MODIFY nadpisuje też NOT NULL, więc trzeba je powtórzyć.' },
  { id: 'ddl4', t: 'Usuń kolumnę rok_urodzenia z tabeli klienci.', wzor: 'ALTER TABLE klienci DROP COLUMN rok_urodzenia', zle: 'ALTER TABLE klienci DROP COLUMN miasto', kolumnyTabeli: 'klienci', pod: 'ALTER TABLE … DROP COLUMN.' },
  { id: 'ddl5', t: 'Usuń całą tabelę pozycje razem z danymi.', wzor: 'DROP TABLE pozycje', zle: 'DELETE FROM pozycje', kolumnyTabeli: 'pozycje', pod: 'To nie jest DELETE.' } ] }
,
{ id: 'podzapytania', tytul: 'Podzapytania, UNION, widoki', lekcja: `
<p>Zapytanie można wstawić w inne: jako listę dla <code>IN</code> albo jako pojedynczą wartość do porównania.</p>
<pre>SELECT nazwa, cena FROM produkty
WHERE cena &gt; (SELECT AVG(cena) FROM produkty);

SELECT imie, nazwisko FROM klienci
WHERE id IN (SELECT klient_id FROM zamowienia WHERE status = 'nowe');

SELECT miasto FROM klienci UNION SELECT 'Warszawa';

CREATE VIEW drogie AS SELECT nazwa, cena FROM produkty WHERE cena &gt; 500;</pre>
<ul><li><code>UNION</code> skleja wyniki i usuwa powtórzenia, <code>UNION ALL</code> je zostawia.</li><li>Widok (<code>VIEW</code>) to zapisane zapytanie, z którego korzysta się jak z tabeli.</li><li><code>COUNT(DISTINCT kolumna)</code> liczy różne wartości.</li><li>Indeks (<code>CREATE INDEX</code>) przyspiesza wyszukiwanie po kolumnie.</li></ul>`,
  zadania: [
  { id: 'pod1', t: 'Wybierz nazwę i cenę produktów droższych od średniej ceny wszystkich produktów.', wzor: 'SELECT nazwa, cena FROM produkty WHERE cena > (SELECT AVG(cena) FROM produkty)', zle: 'SELECT nazwa, cena FROM produkty WHERE cena > 500', pod: 'Podzapytanie w nawiasie zwraca jedną liczbę.' },
  { id: 'pod2', t: 'Wybierz imię i nazwisko klientów, którzy mają zamówienie w statusie „w trakcie”. Użyj IN z podzapytaniem.', wzor: "SELECT imie, nazwisko FROM klienci WHERE id IN (SELECT klient_id FROM zamowienia WHERE status = 'w trakcie')", zle: "SELECT imie, nazwisko FROM klienci WHERE id IN (SELECT id FROM zamowienia WHERE status = 'w trakcie')", pod: 'Podzapytanie zwraca klient_id.' },
  { id: 'pod3', t: 'Policz, w ilu różnych miastach mieszkają klienci.', wzor: 'SELECT COUNT(DISTINCT miasto) FROM klienci', zle: 'SELECT COUNT(miasto) FROM klienci', pod: 'COUNT(DISTINCT …).' },
  { id: 'pod4', t: 'Wypisz w jednej kolumnie bez powtórzeń wszystkie miasta klientów i wszystkie kategorie produktów.', wzor: 'SELECT miasto FROM klienci UNION SELECT kategoria FROM produkty', zle: 'SELECT miasto FROM klienci UNION ALL SELECT kategoria FROM produkty', pod: 'UNION usuwa powtórzenia.' },
  { id: 'pod5', t: 'Utwórz widok dostepne z nazwą i ilością produktów, których ilość jest większa od 0.', wzor: 'CREATE VIEW dostepne AS SELECT nazwa, ilosc FROM produkty WHERE ilosc > 0', zle: 'CREATE VIEW dostepne AS SELECT nazwa, ilosc FROM produkty', sprawdz: 'SELECT * FROM dostepne', pod: 'CREATE VIEW nazwa AS SELECT …' } ] },
{ id: 'uprawnienia', tytul: 'Użytkownicy, uprawnienia, klucze obce', lekcja: `
<p>Te polecenia często trafiają do kwerend w arkuszu. Na egzaminie wykonujesz je jako <code>root</code> w phpMyAdmin, na karcie SQL.</p>
<pre>CREATE USER 'anna'@'localhost' IDENTIFIED BY 'Haslo1!';
GRANT SELECT, INSERT ON sklep.* TO 'anna'@'localhost';       -- cała baza
GRANT UPDATE ON sklep.produkty TO 'anna'@'localhost';        -- jedna tabela
GRANT ALL PRIVILEGES ON sklep.* TO 'anna'@'localhost' WITH GRANT OPTION;
REVOKE INSERT ON sklep.* FROM 'anna'@'localhost';
DROP USER 'anna'@'localhost';

CREATE TABLE opinie (
  id INT PRIMARY KEY AUTO_INCREMENT,
  produkt_id INT NOT NULL,
  FOREIGN KEY (produkt_id) REFERENCES produkty(id)
);
ALTER TABLE opinie ADD FOREIGN KEY (produkt_id) REFERENCES produkty(id);</pre>
<ul><li>Użytkownik to zawsze para <code>'nazwa'@'host'</code>; bez hosta MySQL przyjmie <code>'%'</code>, czyli dowolny komputer.</li><li><code>GRANT</code> łączy się z <code>TO</code>, a <code>REVOKE</code> z <code>FROM</code>.</li><li><code>baza.*</code> to wszystkie tabele bazy, <code>baza.tabela</code> jedna tabela.</li><li><code>WITH GRANT OPTION</code> pozwala przekazywać uprawnienia dalej.</li></ul>
<p>Konto ćwiczeń nie może tworzyć użytkowników, więc <code>CREATE USER</code>, <code>GRANT</code> i <code>REVOKE</code> są tu sprawdzane po treści polecenia: użytkownik, host, hasło, uprawnienia (w dowolnej kolejności) i baza lub tabela. Klucz obcy naprawdę się wykonuje.</p>`,
  zadania: [
  { id: 'adm1', t: 'Utwórz użytkownika sprzedawca na serwerze localhost z hasłem Sklep2026.', wzor: "CREATE USER 'sprzedawca'@'localhost' IDENTIFIED BY 'Sklep2026'", zle: "CREATE USER 'sprzedawca' IDENTIFIED BY 'Sklep2026'", pod: "Użytkownik to 'nazwa'@'host', hasło po IDENTIFIED BY." },
  { id: 'adm2', t: 'Nadaj użytkownikowi sprzedawca (localhost) prawo odczytu i dodawania danych we wszystkich tabelach bazy sklep.', wzor: "GRANT SELECT, INSERT ON sklep.* TO 'sprzedawca'@'localhost'", zle: "GRANT SELECT, UPDATE ON sklep.* TO 'sprzedawca'@'localhost'", pod: 'Odczyt to SELECT, dodawanie INSERT; wszystkie tabele to sklep.*' },
  { id: 'adm3', t: 'Nadaj użytkownikowi kierownik (localhost) prawa SELECT, UPDATE i DELETE tylko do tabeli produkty w bazie sklep.', wzor: "GRANT SELECT, UPDATE, DELETE ON sklep.produkty TO 'kierownik'@'localhost'", zle: "GRANT SELECT, UPDATE, DELETE ON sklep.* TO 'kierownik'@'localhost'", pod: 'Jedna tabela: baza.tabela.' },
  { id: 'adm4', t: 'Odbierz użytkownikowi sprzedawca (localhost) prawo dodawania danych w bazie sklep.', wzor: "REVOKE INSERT ON sklep.* FROM 'sprzedawca'@'localhost'", zle: "REVOKE INSERT ON sklep.* TO 'sprzedawca'@'localhost'", pod: 'REVOKE … FROM, nie TO.' },
  { id: 'adm5', t: 'Nadaj użytkownikowi admin (localhost) wszystkie uprawnienia do bazy sklep, z prawem przekazywania ich innym.', wzor: "GRANT ALL PRIVILEGES ON sklep.* TO 'admin'@'localhost' WITH GRANT OPTION", zle: "GRANT ALL PRIVILEGES ON sklep.* TO 'admin'@'localhost'", pod: 'ALL PRIVILEGES i WITH GRANT OPTION na końcu.' },
  { id: 'adm6', t: 'Utwórz tabelę opinie: id (liczba całkowita, klucz główny, autonumerowanie), produkt_id (liczba całkowita, wymagana) będąca kluczem obcym do produkty.id oraz tresc (typ TEXT).', wzor: 'CREATE TABLE opinie (id INT PRIMARY KEY AUTO_INCREMENT, produkt_id INT NOT NULL, tresc TEXT, FOREIGN KEY (produkt_id) REFERENCES produkty(id))', zle: 'CREATE TABLE opinie (id INT PRIMARY KEY AUTO_INCREMENT, produkt_id INT NOT NULL, tresc TEXT)',
    sprawdz: "SELECT column_name, column_type, is_nullable, column_key, extra FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'opinie' UNION ALL SELECT column_name, referenced_table_name, referenced_column_name, 'FK', '' FROM information_schema.key_column_usage WHERE table_schema = DATABASE() AND table_name = 'opinie' AND referenced_table_name IS NOT NULL", pod: 'FOREIGN KEY (kolumna) REFERENCES tabela(kolumna) na końcu listy kolumn.' } ] }
];
for (const t of SQL) for (const z of t.zadania) if (z.kolumnyTabeli)
  z.sprawdz = `SELECT column_name, column_type, is_nullable, column_key, extra FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = '${z.kolumnyTabeli}' ORDER BY ordinal_position`;
