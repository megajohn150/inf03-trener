-- Jednorazowo: /Applications/XAMPP/xamppfiles/bin/mysql -u root < sql/instalacja.sql
-- Użytkownik widzi wyłącznie bazę do ćwiczeń, więc błędne DROP nie ruszy innych baz.
CREATE DATABASE IF NOT EXISTS inf03cwiczenia CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;
CREATE USER IF NOT EXISTS 'inf03cwiczenia'@'localhost' IDENTIFIED BY 'cwiczenia';
GRANT ALL PRIVILEGES ON inf03cwiczenia.* TO 'inf03cwiczenia'@'localhost';
