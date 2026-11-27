<?php
$polaczenie = mysqli_connect('localhost', 'root', '', 'biblioteka');
?>
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Biblioteka szkolna</title>
  <link rel="stylesheet" href="styl.css">
</head>
<body>
  <header><img src="logo.png" alt="Półka z książkami"><h1>Biblioteka szkolna</h1></header>
  <nav>
    <a href="biblioteka.php">Wszystkie</a>
    <?php
    $wynik = mysqli_query($polaczenie, 'SELECT DISTINCT gatunek FROM ksiazki ORDER BY gatunek');
    while ($wiersz = mysqli_fetch_assoc($wynik)) {
        $gatunek = $wiersz['gatunek'];
        echo "<a href='biblioteka.php?gatunek=" . urlencode($gatunek) . "'>$gatunek</a> ";
    }
    ?>
  </nav>
  <div class="uklad">
    <section id="katalog">
      <h2>Katalog</h2>
      <table>
        <tr><th>Tytuł</th><th>Autor</th><th>Rok</th><th>Dostępność</th></tr>
        <?php
        $zapytanie = 'SELECT ksiazki.tytul, autorzy.imie, autorzy.nazwisko, ksiazki.rok, ksiazki.dostepna FROM ksiazki JOIN autorzy ON ksiazki.autor_id = autorzy.id';
        if (!empty($_GET['gatunek'])) {
            $gatunek = mysqli_real_escape_string($polaczenie, $_GET['gatunek']);
            $zapytanie .= " WHERE ksiazki.gatunek = '$gatunek'";
        }
        $wynik = mysqli_query($polaczenie, $zapytanie . ' ORDER BY ksiazki.tytul');
        while ($ksiazka = mysqli_fetch_assoc($wynik)) {
            $dostepnosc = $ksiazka['dostepna'] ? 'dostępna' : 'wypożyczona';
            echo "<tr><td>{$ksiazka['tytul']}</td><td>{$ksiazka['imie']} {$ksiazka['nazwisko']}</td><td>{$ksiazka['rok']}</td><td>$dostepnosc</td></tr>";
        }
        ?>
      </table>
    </section>
    <aside id="statystyki">
      <h2>Statystyki</h2>
      <?php
      $wynik = mysqli_query($polaczenie, 'SELECT COUNT(*) FROM ksiazki');
      $liczbaKsiazek = mysqli_fetch_row($wynik)[0];
      $wynik = mysqli_query($polaczenie, 'SELECT COUNT(*) FROM wypozyczenia WHERE data_zwrotu IS NULL');
      $liczbaWypozyczonych = mysqli_fetch_row($wynik)[0];
      echo "<p>Książek w katalogu: $liczbaKsiazek</p><p>Wypożyczonych teraz: $liczbaWypozyczonych</p>";
      mysqli_close($polaczenie);
      ?>
    </aside>
  </div>
  <footer><p>Stronę wykonał: 00000000000</p></footer>
</body>
</html>
