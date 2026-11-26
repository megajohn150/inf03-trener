#!/bin/bash
# Sprawdza, że wzorcowe odpowiedzi SQL przechodzą, a błędne nie. Wymaga włączonego MySQL w XAMPP.
cd "$(dirname "$0")/.." || exit 1
/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc dane/sql.js dane/php.js dane/arkusze.js -e '
print(JSON.stringify([...SQL.flatMap(t => t.zadania), ...PHP.flatMap(t => t.zadania.map(z => ({...z, typ: "php"}))), ...ARKUSZE.flatMap(a => a.kwerendy.map(z => ({...z, seed: `/arkusze/${a.id}/baza.sql`})))]))' | /Applications/XAMPP/xamppfiles/bin/php testy/test.php
