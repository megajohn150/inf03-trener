CREATE TABLE klienci (
  id INT PRIMARY KEY AUTO_INCREMENT,
  imie VARCHAR(30) NOT NULL,
  nazwisko VARCHAR(40) NOT NULL,
  miasto VARCHAR(40),
  rok_urodzenia INT
);
INSERT INTO klienci VALUES
(1,'Anna','Nowak','Kraków',1990),(2,'Piotr','Kowalski','Gdańsk',1985),
(3,'Ewa','Wiśniewska','Kraków',2001),(4,'Jan','Nowicki','Poznań',1978),
(5,'Maria','Lis','Gdańsk',1995),(6,'Tomasz','Zając',NULL,2000),
(7,'Anna','Krawczyk','Kraków',1985),(8,'Adam','Nowak','Łódź',2003);

CREATE TABLE produkty (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nazwa VARCHAR(50) NOT NULL,
  kategoria VARCHAR(30) NOT NULL,
  cena DECIMAL(8,2) NOT NULL,
  ilosc INT NOT NULL
);
INSERT INTO produkty VALUES
(1,'Klawiatura mechaniczna','akcesoria',249.99,12),(2,'Mysz bezprzewodowa','akcesoria',89.00,40),
(3,'Monitor 24 cale','monitory',599.00,7),(4,'Monitor 27 cali','monitory',899.50,3),
(5,'Laptop biurowy','komputery',2499.00,5),(6,'Laptop gamingowy','komputery',5299.00,2),
(7,'Podkładka','akcesoria',19.90,100),(8,'Kabel HDMI','kable',29.90,0),
(9,'Kabel USB-C','kable',35.00,60),(10,'Kamera internetowa','akcesoria',100.00,15);

CREATE TABLE zamowienia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  klient_id INT NOT NULL,
  data_zam DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  FOREIGN KEY (klient_id) REFERENCES klienci(id)
);
INSERT INTO zamowienia VALUES
(1,1,'2025-11-03','zrealizowane'),(2,2,'2025-12-20','zrealizowane'),
(3,1,'2026-01-15','zrealizowane'),(4,3,'2026-02-02','anulowane'),
(5,5,'2026-02-28','w trakcie'),(6,1,'2026-03-10','w trakcie'),
(7,7,'2026-03-11','nowe'),(8,2,'2026-04-01','nowe');

CREATE TABLE pozycje (
  id INT PRIMARY KEY AUTO_INCREMENT,
  zamowienie_id INT NOT NULL,
  produkt_id INT NOT NULL,
  sztuk INT NOT NULL,
  FOREIGN KEY (zamowienie_id) REFERENCES zamowienia(id),
  FOREIGN KEY (produkt_id) REFERENCES produkty(id)
);
INSERT INTO pozycje VALUES
(1,1,1,1),(2,1,2,2),(3,2,5,1),(4,3,3,2),(5,3,8,3),(6,4,6,1),
(7,5,2,1),(8,5,7,4),(9,6,9,5),(10,7,4,1),(11,7,8,1),(12,8,1,1),(13,8,10,2);
