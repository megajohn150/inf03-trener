CREATE TABLE rowery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nazwa VARCHAR(40) NOT NULL,
  typ VARCHAR(20) NOT NULL,
  opis TEXT NOT NULL,
  cena INT NOT NULL
);
INSERT INTO rowery VALUES
(1,'Wiatr','miejski','Lekki rower miejski z koszykiem i oświetleniem.',35),
(2,'Skała','górski','Rower górski z pełną amortyzacją.',70),
(3,'Szosa','szosowy','Szybki rower na asfalt z karbonową ramą.',90),
(4,'Tramwaj','miejski','Wygodny rower miejski z siedmioma biegami.',40),
(5,'Świerk','górski','Rower górski na łatwe szlaki leśne.',55),
(6,'Maluch','dziecięcy','Rower dla dzieci od sześciu lat.',25),
(7,'Iskra','elektryczny','Rower elektryczny o zasięgu 80 km.',120),
(8,'Bulwar','miejski','Rower miejski z niską ramą.',35);

CREATE TABLE wypozyczenia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rower_id INT NOT NULL,
  data_wyp DATE NOT NULL,
  dni INT NOT NULL,
  FOREIGN KEY (rower_id) REFERENCES rowery(id)
);
INSERT INTO wypozyczenia VALUES
(1,1,'2026-05-01',2),(2,3,'2026-05-02',5),(3,2,'2026-05-02',3),(4,7,'2026-05-10',1),
(5,4,'2026-05-15',7),(6,2,'2026-06-01',4),(7,6,'2026-06-03',3),(8,8,'2026-06-04',2);
