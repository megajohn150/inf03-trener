#!/bin/bash
# Dwuklik: uruchamia aplikację tylko dla tego Maca. Zamknięcie okna ją wyłącza.
cd "$(dirname "$0")" || exit 1
(sleep 1; open http://127.0.0.1:8003/) &
exec /Applications/XAMPP/xamppfiles/bin/php -S 127.0.0.1:8003
