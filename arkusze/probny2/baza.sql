CREATE TABLE dania (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nazwa VARCHAR(50) NOT NULL,
  typ VARCHAR(20) NOT NULL,
  cena DECIMAL(6,2) NOT NULL,
  kalorie INT NOT NULL
);
INSERT INTO dania VALUES
(1,'Zupa pomidorowa','zupa',9.00,180),(2,'Żurek','zupa',11.00,320),(3,'Kotlet schabowy','danie główne',24.00,850),
(4,'Pierogi ruskie','danie główne',19.00,620),(5,'Łosoś z warzywami','danie główne',32.00,540),(6,'Sernik','deser',12.00,390),
(7,'Szarlotka','deser',10.00,410),(8,'Sałatka grecka','danie główne',18.00,350);
CREATE TABLE zamowienia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  danie_id INT NOT NULL,
  porcje INT NOT NULL,
  data_zam DATE NOT NULL,
  FOREIGN KEY (danie_id) REFERENCES dania(id)
);
INSERT INTO zamowienia VALUES (1,3,2,'2026-05-04'),(2,1,10,'2026-05-04'),(3,6,4,'2026-05-05'),(4,5,1,'2026-05-06'),(5,3,12,'2026-05-07');
