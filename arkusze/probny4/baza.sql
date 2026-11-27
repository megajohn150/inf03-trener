CREATE TABLE zwierzeta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  imie VARCHAR(30) NOT NULL,
  gatunek VARCHAR(20) NOT NULL,
  wiek INT NOT NULL,
  przyjety DATE NOT NULL
);
INSERT INTO zwierzeta VALUES
(1,'Burek','pies',3,'2025-09-14'),(2,'Mruczek','kot',2,'2025-11-02'),(3,'Fafik','pies',7,'2024-06-20'),
(4,'Luna','kot',5,'2026-01-08'),(5,'Reksio','pies',1,'2026-02-15'),(6,'Puszek','kot',9,'2023-12-01'),
(7,'Azor','pies',4,'2025-05-30'),(8,'Kropka','królik',2,'2026-03-03');

-- Bez klucza obcego: dodajesz go w zapytaniu 4.
CREATE TABLE adopcje (
  id INT PRIMARY KEY AUTO_INCREMENT,
  zwierze_id INT NOT NULL,
  opiekun VARCHAR(50) NOT NULL,
  data_adopcji DATE NOT NULL
);
INSERT INTO adopcje VALUES
(1,6,'Anna Kowal','2025-12-20'),(2,3,'Jan Wrona','2026-02-11'),(3,8,'Ewa Lis','2026-04-04'),(4,7,'Piotr Bąk','2025-08-19');
