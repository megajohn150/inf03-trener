#!/bin/bash
# Sprawdza, że wzorcowe odpowiedzi przechodzą, a błędne nie. Wymaga włączonego MySQL w XAMPP.
# Część 1: SQL, PHP i kwerendy arkuszy (PHP z wiersza poleceń). Część 2: HTML, CSS i JS w domyślnej przeglądarce.
cd "$(dirname "$0")/.." || exit 1
PHP=/Applications/XAMPP/xamppfiles/bin/php
/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc dane/sql.js dane/php.js dane/arkusze.js -e '
print(JSON.stringify([...SQL.flatMap(t => t.zadania), ...PHP.flatMap(t => t.zadania.map(z => ({...z, typ: "php"}))), ...ARKUSZE.flatMap(a => a.kwerendy.map(z => ({...z, seed: `/arkusze/${a.id}/baza.sql`})))]))' | $PHP testy/test.php
KOD=$?

# Testy HTML/CSS/JS otwierają się w domyślnej przeglądarce, na osobnym porcie, żeby nie przeszkadzać działającej aplikacji.
# Strona testów na koniec wysyła żądanie „koniec?wynik”, a skrypt czyta je z dziennika serwera, więc działa to w każdej przeglądarce.
PORT=8013
TMP=$(mktemp -d)
DZIENNIK="$TMP/serwer.log"
$PHP -S 127.0.0.1:$PORT router.php 2>"$DZIENNIK" >/dev/null &
SERWER=$!
trap 'kill $SERWER 2>/dev/null; wait 2>/dev/null; rm -rf "$TMP"' EXIT
sleep 1
echo "Testy HTML/CSS/JS w domyślnej przeglądarce (nowa karta, można ją potem zamknąć)…"
open "http://127.0.0.1:$PORT/testy/test.html?auto"
for _ in $(seq 180); do grep -q 'GET /testy/koniec?' "$DZIENNIK" && break; sleep 1; done
LINIA=$(grep -o 'GET /testy/koniec?[^ ]*' "$DZIENNIK" | /usr/bin/head -1)
if [ -z "$LINIA" ]; then echo "Testy w przeglądarce nie skończyły się w 3 minuty."; exit 1; fi
TEKST=$($PHP -r 'echo urldecode(substr($argv[1], strlen("GET /testy/koniec?")));' "$LINIA")
WYNIK=$(echo "$TEKST" | /usr/bin/head -1)
echo "$TEKST" | grep 'BŁĄD'
echo "Przeglądarka: $WYNIK"
[[ "$WYNIK" == *"błędów: 0" ]] || KOD=1
exit $KOD
