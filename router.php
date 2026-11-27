<?php
// Router wbudowanego serwera PHP: każde żądanie (strona, pliki, praca/*.php) musi przyjść z tego komputera.
// Nagłówek Host chroni przed DNS rebinding: obca strona nie podszyje się pod 127.0.0.1.
$port = $_SERVER['SERVER_PORT'];
if (!in_array($_SERVER['HTTP_HOST'] ?? '', ["127.0.0.1:$port", "localhost:$port"], true)) {
    http_response_code(403);
    exit;
}
return false; // dalej zwykła obsługa: plik statyczny albo skrypt PHP
