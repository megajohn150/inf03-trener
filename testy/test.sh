#!/bin/bash
# Sprawdza, że wzorcowe odpowiedzi przechodzą, a błędne nie. Wymaga włączonego MySQL w XAMPP.
# Część 1: SQL, PHP i kwerendy arkuszy (PHP z wiersza poleceń). Część 2: HTML, CSS i JS w Chrome bez okna, jeśli jest zainstalowany.
cd "$(dirname "$0")/.." || exit 1
PHP=/Applications/XAMPP/xamppfiles/bin/php
/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc dane/sql.js dane/php.js dane/arkusze.js -e '
print(JSON.stringify([...SQL.flatMap(t => t.zadania), ...PHP.flatMap(t => t.zadania.map(z => ({...z, typ: "php"}))), ...ARKUSZE.flatMap(a => a.kwerendy.map(z => ({...z, seed: `/arkusze/${a.id}/baza.sql`})))]))' | $PHP testy/test.php
KOD=$?

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then
  echo "Brak Google Chrome: testy HTML/CSS/JS otwórz ręcznie pod http://127.0.0.1:8003/testy/test.html"
  exit $KOD
fi
# Osobny port i profil, żeby nie przeszkadzać działającej aplikacji ani Twojemu Chrome.
# Strona testów na koniec wysyła żądanie „koniec?wynik”, a skrypt czyta je z dziennika serwera.
PORT=8013
PROFIL=$(mktemp -d)
DZIENNIK="$PROFIL/serwer.log"
$PHP -S 127.0.0.1:$PORT router.php 2>"$DZIENNIK" >/dev/null &
SERWER=$!
sleep 1
"$CHROME" --headless=new --disable-gpu --no-first-run --user-data-dir="$PROFIL/chrome" "http://127.0.0.1:$PORT/testy/test.html?auto" >/dev/null 2>&1 &
PRZEGLADARKA=$!
trap 'kill $SERWER $PRZEGLADARKA 2>/dev/null; wait 2>/dev/null; rm -rf "$PROFIL"' EXIT
for _ in $(seq 180); do grep -q 'GET /testy/koniec?' "$DZIENNIK" && break; sleep 1; done
LINIA=$(grep -o 'GET /testy/koniec?[^ ]*' "$DZIENNIK" | /usr/bin/head -1)
if [ -z "$LINIA" ]; then echo "Testy w przeglądarce nie skończyły się w 3 minuty."; exit 1; fi
TEKST=$($PHP -r 'echo urldecode(substr($argv[1], strlen("GET /testy/koniec?")));' "$LINIA")
WYNIK=$(echo "$TEKST" | /usr/bin/head -1)
echo "$TEKST" | grep 'BŁĄD'
echo "Przeglądarka: $WYNIK"
[[ "$WYNIK" == *"błędów: 0" ]] || KOD=1
exit $KOD
