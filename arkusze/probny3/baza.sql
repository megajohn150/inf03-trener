CREATE TABLE autorzy (
  id INT PRIMARY KEY AUTO_INCREMENT,
  imie VARCHAR(30) NOT NULL,
  nazwisko VARCHAR(40) NOT NULL
);
INSERT INTO autorzy VALUES
(1,'Andrzej','Sapkowski'),(2,'Stanisław','Lem'),(3,'Olga','Tokarczuk'),(4,'Henryk','Sienkiewicz'),(5,'Jacek','Dukaj');

CREATE TABLE ksiazki (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tytul VARCHAR(80) NOT NULL,
  autor_id INT NOT NULL,
  gatunek VARCHAR(30) NOT NULL,
  rok INT NOT NULL,
  dostepna BOOLEAN NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES autorzy(id)
);
INSERT INTO ksiazki VALUES
(1,'Ostatnie życzenie',1,'fantastyka',1993,1),(2,'Solaris',2,'fantastyka',1961,0),
(3,'Bieguni',3,'powieść',2007,1),(4,'Krzyżacy',4,'powieść historyczna',1900,1),
(5,'Lód',5,'fantastyka',2007,0),(6,'Księgi Jakubowe',3,'powieść historyczna',2014,1),
(7,'Cyberiada',2,'fantastyka',1965,1),(8,'Quo vadis',4,'powieść historyczna',1896,0),
(9,'Prowadź swój pług przez kości umarłych',3,'kryminał',2009,1),(10,'Sezon burz',1,'fantastyka',2013,1);

CREATE TABLE wypozyczenia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ksiazka_id INT NOT NULL,
  czytelnik VARCHAR(50) NOT NULL,
  data_wyp DATE NOT NULL,
  data_zwrotu DATE,
  FOREIGN KEY (ksiazka_id) REFERENCES ksiazki(id)
);
INSERT INTO wypozyczenia VALUES
(1,2,'Kasia Nowak','2026-04-01',NULL),(2,5,'Tomek Lis','2026-04-03',NULL),
(3,1,'Kasia Nowak','2026-03-10','2026-03-24'),(4,8,'Kasia Nowak','2026-04-10',NULL),
(5,3,'Ola Mróz','2026-02-02','2026-02-20'),(6,7,'Tomek Lis','2026-01-15','2026-01-30');
