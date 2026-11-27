-- Drugi zestaw danych: ta sama struktura co sklep.sql, inne wiersze. Zapytanie z warunkiem „na sztywno” przejdzie na jednym, ale nie na obu.
-- Pilnuj: unikalne ceny i iloczyny cena * ilosc (zadania z kolejnością), jeden najmłodszy klient z Krakowa, wartości na granicach warunków (35, 100).
CREATE TABLE klienci (
  id INT PRIMARY KEY AUTO_INCREMENT,
  imie VARCHAR(30) NOT NULL,
  nazwisko VARCHAR(40) NOT NULL,
  miasto VARCHAR(40),
  rok_urodzenia INT
);
INSERT INTO klienci VALUES
(1,'Kamil','Wójcik','Gdańsk',1992),(2,'Zofia','Nowakowska','Kraków',1999),
(3,'Marek','Lewandowski','Kraków',1988),(4,'Ola','Kamińska',NULL,2004),
(5,'Igor','Mazur','Wrocław',1979),(6,'Julia','Dąbrowska','Gdańsk',1989),
(7,'Piotr','Zieliński','Kraków',2002),(8,'Ewa','Mazur','Wrocław',1996),
(9,'Bartek','Kowal','Gdańsk',2000),(10,'Nina','Sikorska',NULL,1991);

CREATE TABLE produkty (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nazwa VARCHAR(50) NOT NULL,
  kategoria VARCHAR(30) NOT NULL,
  cena DECIMAL(8,2) NOT NULL,
  ilosc INT NOT NULL
);
INSERT INTO produkty VALUES
(1,'Kabel HDMI','kable',24.50,30),(2,'Laptop uczniowski','komputery',1899.00,4),
(3,'Słuchawki','akcesoria',9.99,0),(4,'Monitor 32 cale','monitory',1299.99,2),
(5,'Pendrive 64 GB','akcesoria',35.00,50),(6,'Laptop do grafiki','komputery',6499.00,1),
(7,'Kabel zasilający','kable',15.00,25),(8,'Myszka','akcesoria',100.00,18),
(9,'Monitor przenośny','monitory',749.00,6),(10,'Klawiatura','akcesoria',59.90,22),
(11,'Router','sieć',219.00,9);

CREATE TABLE zamowienia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  klient_id INT NOT NULL,
  data_zam DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  FOREIGN KEY (klient_id) REFERENCES klienci(id)
);
INSERT INTO zamowienia VALUES
(1,3,'2025-10-12','zrealizowane'),(2,1,'2026-01-05','anulowane'),
(3,6,'2026-02-14','zrealizowane'),(4,2,'2026-03-03','nowe'),
(5,3,'2026-03-21','w trakcie'),(6,9,'2026-03-30','nowe'),
(7,1,'2026-04-02','nowe'),(8,7,'2025-12-31','w trakcie');

CREATE TABLE pozycje (
  id INT PRIMARY KEY AUTO_INCREMENT,
  zamowienie_id INT NOT NULL,
  produkt_id INT NOT NULL,
  sztuk INT NOT NULL,
  FOREIGN KEY (zamowienie_id) REFERENCES zamowienia(id),
  FOREIGN KEY (produkt_id) REFERENCES produkty(id)
);
INSERT INTO pozycje VALUES
(1,2,4,1),(2,1,2,1),(3,4,1,3),(4,3,8,2),(5,4,10,1),(6,5,5,4),
(7,6,3,2),(8,7,9,1),(9,8,1,2),(10,5,7,5),(11,3,2,1),(12,7,11,1);
