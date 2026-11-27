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
PORT=8013
PROFIL=$(mktemp -d)
$PHP -S 127.0.0.1:$PORT router.php >/dev/null 2>&1 &
SERWER=$!
trap 'kill $SERWER 2>/dev/null; rm -rf "$PROFIL"' EXIT
sleep 1
DOM=$("$CHROME" --headless=new --disable-gpu --no-first-run --user-data-dir="$PROFIL" --virtual-time-budget=180000 --dump-dom "http://127.0.0.1:$PORT/testy/test.html" 2>/dev/null)
WYNIK=$(echo "$DOM" | grep -o 'Sprawdzeń: [0-9]*, błędów: [0-9]*')
echo "$DOM" | sed -n '/<pre id="log">/,/<\/pre>/p' | sed -e 's/<[^>]*>//g' | grep 'BŁĄD'
if [ -z "$WYNIK" ]; then echo "Testy w przeglądarce się nie zakończyły."; exit 1; fi
echo "Przeglądarka: $WYNIK"
[[ "$WYNIK" == *"błędów: 0" ]] || KOD=1
exit $KOD
