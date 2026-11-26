<?php
$polaczenie = mysqli_connect('localhost', 'root', '', 'wypozyczalnia');
if (!empty($_POST['rower']) && !empty($_POST['data']) && !empty($_POST['dni'])) {
    $zapytanie = mysqli_prepare($polaczenie, 'INSERT INTO wypozyczenia (rower_id, data_wyp, dni) VALUES (?, ?, ?)');
    mysqli_stmt_bind_param($zapytanie, 'isi', $_POST['rower'], $_POST['data'], $_POST['dni']);
    mysqli_stmt_execute($zapytanie);
}
?>
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Wypożyczalnia rowerów</title>
  <link rel="stylesheet" href="styl.css">
</head>
<body>
  <header><h1>Wypożyczalnia rowerów</h1><img src="baner_maly.jpg" alt="Rower na bulwarze"></header>
  <div class="uklad">
    <section id="lewa">
      <h3>Najdroższe rowery</h3>
      <ul>
        <?php
        $wynik = mysqli_query($polaczenie, 'SELECT nazwa, cena FROM rowery ORDER BY cena DESC LIMIT 3');
        while ($rower = mysqli_fetch_assoc($wynik)) echo "<li>{$rower['nazwa']}: <span class='cena'>{$rower['cena']} zł</span></li>";
        ?>
      </ul>
    </section>
    <section id="srodek">
      <?php
      $wynik = mysqli_query($polaczenie, 'SELECT nazwa, typ, cena FROM rowery');
      while ($rower = mysqli_fetch_assoc($wynik)) echo "<div class='rower'><h4>{$rower['nazwa']}</h4><p>{$rower['typ']}, {$rower['cena']} zł za dzień</p></div>";
      ?>
    </section>
    <section id="prawa">
      <h3>Nowe wypożyczenie</h3>
      <form method="post">
        <label>Numer roweru: <input type="number" name="rower"></label><br>
        <label>Data: <input type="date" name="data"></label><br>
        <label>Liczba dni: <input type="number" name="dni"></label><br>
        <button type="submit">Wypożycz</button>
      </form>
    </section>
  </div>
  <footer>
    <form method="post">
      <label>Numer roweru: <input type="number" name="id"></label>
      <button type="submit">Pokaż opis</button>
    </form>
    <?php
    if (!empty($_POST['id'])) {
        $zapytanie = mysqli_prepare($polaczenie, 'SELECT opis FROM rowery WHERE id = ?');
        mysqli_stmt_bind_param($zapytanie, 'i', $_POST['id']);
        mysqli_stmt_execute($zapytanie);
        $rower = mysqli_fetch_assoc(mysqli_stmt_get_result($zapytanie));
        if ($rower) echo "<p>{$rower['opis']}</p>";
    }
    mysqli_close($polaczenie);
    ?>
    <p>Stronę wykonał: 00000000000</p>
  </footer>
</body>
</html>
