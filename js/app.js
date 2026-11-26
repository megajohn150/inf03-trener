'use strict';
// INF.03 – trener: router i widoki. Sprawdzarki zadań i api() są w zadania.js, dane w dane/*.js.

const app = document.getElementById('app');
const miesza = t => { t = [...t]; for (let i = t.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [t[i], t[j]] = [t[j], t[i]]; } return t; };
const procent = (a, b) => b ? Math.round(100 * a / b) : 0;
const data = ms => new Date(ms).toLocaleDateString('pl-PL');
const BLAD_POL = 'Brak połączenia z aplikacją. Uruchom start.command.';
const icon = id => `<svg class="ic" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const TONE = { sql: 'var(--t-blue)', php: 'var(--t-pink)', html: 'var(--t-yellow)', css: 'var(--t-sage)', js: 'var(--t-kraft)' };
const tematow = n => n === 1 ? 'temat' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'tematy' : 'tematów';

// ---- postęp: plik na dysku, a localStorage jako zapas (Safari potrafi je wyczyścić) ----
let P = { czas: 0, abcd: {}, sql: {}, egz: [], ark: {} };
async function wczytaj() {
  let lokalny = null, plik = null;
  try { lokalny = JSON.parse(localStorage.getItem('inf03')); } catch {}
  try { plik = await (await fetch('api.php?co=postep')).json(); } catch {}
  for (const x of [lokalny, plik]) if (x && x.czas > P.czas) P = { ...P, ...x };
}
async function zapisz() {
  P.czas = Date.now();
  try { localStorage.setItem('inf03', JSON.stringify(P)); } catch {}
  try { await api('postep', P); uwaga(''); } catch { uwaga('Postęp jest zapisany tylko w przeglądarce. Uruchom start.command, żeby zapisywał się też na dysku.'); }
}
function uwaga(t) { const u = document.getElementById('sysmsg'); u.querySelector('span').textContent = t; u.hidden = !t; }

// ---- rejestr zadań i liczniki (P.sql przechowuje wyniki zadań ze wszystkich kursów, 1 = zaliczone) ----
const ZADANIE = {};
for (const k of KURSY) for (const t of k.tematy) t.zadania.forEach((z, i) => { ZADANIE[z.id] = { z, k, t, n: i + 1 }; });
const zrobione = t => t.zadania.filter(z => P.sql[z.id] === 1).length;
const wKursie = k => k.tematy.reduce((s, t) => [s[0] + zrobione(t), s[1] + t.zadania.length], [0, 0]);
const umie = q => P.abcd[q.id]?.ok === 1;
const kurs = id => KURSY.find(k => k.id === id);
const DZ = Object.keys(DZIALY).map(d => ({ d, nazwa: DZIALY[d], q: ABCD.filter(q => q.d == d) }));

// ---- następna porcja: na zmianę teoria → SQL/PHP/JS → HTML/CSS, gdy wszystko zrobione: powtórka ----
function nastepne() {
  const grupy = [['abcd'], ['sql', 'php', 'js'], ['html', 'css']];
  const cel = g => {
    if (g[0] === 'abcd') return ABCD.some(q => !umie(q)) ? { href: '#/abcd', label: 'Teoria · seria 10 pytań' } : null;
    for (const id of g) { const k = kurs(id), t = k.tematy.find(t => zrobione(t) < t.zadania.length); if (t) return { href: `#/kurs/${id}/${t.id}`, label: `${k.nazwa} · ${t.tytul}` }; }
    return null;
  };
  const teraz = grupy.findIndex(g => g.includes(P.ost));
  for (let i = 1; i <= 3; i++) { const c = cel(grupy[(teraz + i) % 3]); if (c) return c; }
  return { href: '#/powtorka', label: 'Powtórka' };
}
function idzDalej() { const { href } = nastepne(); if (location.hash === href) trasa(); else location.hash = href; }

// ---- wspólne kawałki ----
const pasek = (a, b) => `<span class="bar" aria-hidden="true"><i style="--p:${procent(a, b)}%"></i></span>`;
const wstecz = (href, label) => `<a class="back" href="${href}">${icon('back')}${esc(label)}</a>`;
const kod = s => `<pre><code>${esc(s)}</code></pre>`;
let zegary = [];
const co = (fn, ms) => { fn(); zegary.push(setInterval(fn, ms)); };
const stopZegary = () => { zegary.forEach(clearInterval); zegary = []; };
const mmss = s => `${s / 60 | 0}:${String(s % 60).padStart(2, '0')}`;
const hms = s => `${s / 3600 | 0}:${String((s / 60 | 0) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// ---- start ----
function start() {
  const tyg = Math.max(0, Math.ceil((new Date(2027, 5, 1) - Date.now()) / 6048e5));
  const n = nastepne();
  const nieudane = Object.keys(P.sql).filter(id => P.sql[id] === 0 && ZADANIE[id]).map(id => ZADANIE[id]);
  const zleQ = ABCD.filter(q => P.abcd[q.id] && !P.abcd[q.id].ok).length;
  const kartki = [
    ...nieudane.slice(0, 2).map(x => `<a class="note note--pink" href="#/powtorka">${esc(x.k.nazwa)} · zadanie ${x.n}<br><span class="note__sub">${esc(x.t.tytul)}</span></a>`),
    zleQ ? `<a class="note note--blue" href="#/abcd">Teoria: pytania z błędem: ${zleQ}. Wrócą w następnej serii.</a>` : '',
  ].filter(Boolean);
  if (nieudane.length > 2) kartki.push(`<a class="note" href="#/powtorka">i jeszcze ${nieudane.length - 2} w powtórce</a>`);
  const egz = P.egz.at(-1), ark = Object.entries(P.ark).filter(([, a]) => a.max);
  const tytulArk = id => ARKUSZE.find(x => x.id === id)?.tytul ?? 'INF.03 ' + (SESJE.find(s => 's-' + s.id === id)?.nazwa ?? id.replace('s-', '').replace('-', ' '));
  app.innerHTML = `
  <section class="today">
    <div class="sheet taped today__main">
      <p class="dateline">${esc(new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}</p>
      <h1 class="title" tabindex="-1">Co dziś ćwiczymy?</h1>
      <p class="lead">Jedna porcja zajmuje około 15–20 minut. Najpierw wracają Twoje błędy, potem nowe rzeczy.</p>
      <div class="actions">
        <a class="btn btn--primary" href="${n.href}">Ucz się dalej</a>
        <a class="btn" href="#/powtorka">Powtórka</a>
      </div>
      <p class="upnext">Następna porcja: <strong>${esc(n.label)}</strong></p>
    </div>
    <aside class="today__side" aria-label="Twój stan">
      <p class="countdown">do czerwca 2027: <span class="ring"><strong>${tyg}</strong><svg aria-hidden="true"><use href="#i-ring"/></svg></span> tyg.</p>
      <div class="notes">${kartki.join('') || '<div class="note">Tu przyklejają się Twoje błędy. Wracają jako pierwsze.</div>'}</div>
    </aside>
  </section>
  <section class="board">
    <div class="sheet">
      <svg class="clip" aria-hidden="true"><use href="#i-clip"/></svg>
      <h2 class="h2">Praktyka</h2>
      ${KURSY.map(k => { const [d, w] = wKursie(k); return `<a class="prow" href="#/kurs/${k.id}"><span class="prow__name"><span class="swatch" style="--tape:${TONE[k.id]}"></span>${esc(k.nazwa)}</span><span class="prow__val">${d} z ${w}</span>${pasek(d, w)}</a>`; }).join('')}
      <a class="board__more" href="#/poradniki">Poradniki: egzamin, grafika, phpMyAdmin ${icon('chev')}</a>
    </div>
    <div class="sheet taped taped--r" style="--tape:var(--t-blue)">
      <h2 class="h2">Teoria</h2>
      ${DZ.map(({ d, nazwa, q }) => { const u = q.filter(umie).length; return `<a class="prow" href="#/abcd/${d}"><span class="prow__name">${esc(nazwa)}</span><span class="prow__val">${u} z ${q.length}</span>${pasek(u, q.length)}</a>`; }).join('')}
    </div>
    <div class="sheet sheet--kraft">
      <svg class="pin" aria-hidden="true"><use href="#i-pin"/></svg>
      <h2 class="h2">Wyniki</h2>
      <p class="res">${egz ? `Egzamin ABCD: <strong>${procent(egz.pkt, egz.max)}%</strong> (${data(egz.czas)}), cel 80%` : 'Egzamin ABCD: jeszcze nie rozwiązany'}</p>
      ${ark.map(([id, a]) => `<p class="res">${esc(tytulArk(id))}: <strong>${procent(a.pkt, a.max)}%</strong> (${data(a.czas)}), cel 85%</p>`).join('') || '<p class="res">Arkusz praktyczny: jeszcze nie oceniony</p>'}
    </div>
  </section>`;
}

// ---- kursy i tematy ----
function kursy() {
  app.innerHTML = `
  <div class="pagehead"><h1 class="title" tabindex="-1">Praktyka</h1><p class="muted">Kursy z zadaniami sprawdzanymi od razu.</p></div>
  <div class="sheet notebook">
    ${KURSY.map((k, i) => { const [d, w] = wKursie(k); return `<a class="nrow is-big" href="#/kurs/${k.id}"><span class="nrow__num">${i + 1}</span><span class="nrow__name">${esc(k.nazwa)}<small>${k.tematy.length} ${tematow(k.tematy.length)}</small></span>${pasek(d, w)}<span class="nrow__val">${d} z ${w}</span></a>`; }).join('')}
  </div>`;
}
function kursLista(id) {
  const k = kurs(id);
  if (!k) return kursy();
  const [d, w] = wKursie(k);
  app.innerHTML = `
  ${wstecz('#/kurs', 'Praktyka')}
  <div class="pagehead"><h1 class="title" tabindex="-1">${esc(k.nazwa)}</h1><p class="muted">${k.tematy.length} ${tematow(k.tematy.length)} · ${d} z ${w} zadań</p></div>
  <div class="sheet notebook">
    ${k.tematy.map((t, i) => { const z = zrobione(t), n = t.zadania.length; return `<a class="nrow" href="#/kurs/${k.id}/${t.id}"><span class="nrow__num">${i + 1}</span><span class="nrow__name">${esc(t.tytul)}</span>${pasek(z, n)}<span class="nrow__val">${z === n ? `${icon('tick')}<span class="sr">${z} z ${n}</span>` : `${z} z ${n}`}</span></a>`; }).join('')}
  </div>`;
}
const TABELE = `klienci   (id, imie, nazwisko, miasto, rok_urodzenia)
produkty  (id, nazwa, kategoria, cena, ilosc)
zamowienia(id, klient_id → klienci.id, data_zam, status)
pozycje   (id, zamowienie_id → zamowienia.id, produkt_id → produkty.id, sztuk)`;

function zadanieHtml({ z, k, n }, i) {
  return `
  <article class="task sheet taped" data-id="${z.id}" style="--tape:${TONE[k.id]}">
    <div class="task__head"><h2 class="task__title">${esc(k.nazwa)} · zadanie ${n}</h2>${P.sql[z.id] === 1 ? `${icon('tick')}<span class="sr">zaliczone</span>` : ''}</div>
    <p class="task__prompt">${esc(z.t)}</p>
    ${z.html && k.id !== 'html' ? `<details class="folder"><summary>${icon('chev')}Kod HTML, na którym działasz</summary>${kod(z.html)}</details>` : ''}
    <label class="sr" for="ta-${i}-${z.id}">Twoje rozwiązanie</label>
    <textarea class="code-input" id="ta-${i}-${z.id}" rows="${k.id === 'sql' ? 3 : 7}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" data-gramm="false">${esc(z.start ?? '')}</textarea>
    <div class="actions">
      <button class="btn btn--primary" data-act="sprawdz">Sprawdź</button>
      <button class="btn" data-act="pod">Podpowiedź</button>
      <button class="btn btn--quiet" data-act="odp">Pokaż rozwiązanie</button>
      <kbd class="shortcut">⌘ / Ctrl + Enter</kbd>
    </div>
    <div class="task__result" role="status" aria-live="polite"></div>
    <div class="task__extra"></div>
    <div class="task__aids"></div>
    <div class="task__preview"></div>
  </article>`;
}
function temat(kId, tId) {
  const k = kurs(kId), t = k?.tematy.find(x => x.id === tId);
  if (!t) return kursLista(kId);
  const nast = k.tematy[k.tematy.indexOf(t) + 1];
  app.innerHTML = `
  <div class="topic">
    <div>${wstecz(`#/kurs/${k.id}`, k.nazwa)}<h1 class="title" tabindex="-1">${esc(t.tytul)}</h1></div>
    <article class="sheet prose">${t.lekcja}</article>
    ${['sql', 'php'].includes(k.id) ? `<details class="folder"><summary>${icon('chev')}Tabele, na których ćwiczysz</summary>${kod(TABELE)}</details>` : ''}
    ${t.zadania.map((z, i) => zadanieHtml(ZADANIE[z.id], i)).join('')}
    <div>${nast ? `<a class="btn btn--primary" href="#/kurs/${k.id}/${nast.id}">Następny temat: ${esc(nast.tytul)}</a>` : '<button class="btn btn--primary" data-act="dalej">Dalej</button>'}</div>
  </div>`;
}
function powtorka() {
  const pula = Object.keys(P.sql).filter(id => ZADANIE[id]);
  // Najpierw niezaliczone, potem losowe zaliczone.
  const lista = [...miesza(pula.filter(id => P.sql[id] !== 1)), ...miesza(pula.filter(id => P.sql[id] === 1))].slice(0, 5);
  app.innerHTML = lista.length ? `
  <div class="topic">
    <div class="pagehead"><h1 class="title" tabindex="-1">Powtórka</h1></div>
    <p class="lead">Pięć zadań, które już robiłeś/aś: najpierw te nieudane, potem losowe zaliczone.</p>
    ${lista.map((id, i) => zadanieHtml(ZADANIE[id], i)).join('')}
    <div><button class="btn" data-act="inne">Inne zadania</button></div>
  </div>` : `
  <div class="topic">
    <h1 class="title" tabindex="-1">Powtórka</h1>
    <div class="note stub pop"><p>Najpierw zrób kilka zadań.</p><p><button class="btn btn--primary" data-act="dalej">Ucz się dalej</button></p></div>
  </div>`;
}

// ---- sprawdzanie zadania ----
async function sprawdz(art) {
  const { z, k } = ZADANIE[art.dataset.id];
  const wynik = art.querySelector('.task__result'), extra = art.querySelector('.task__extra'), podglad = art.querySelector('.task__preview');
  wynik.className = 'task__result'; wynik.textContent = 'Sprawdzam…'; extra.innerHTML = '';
  podglad.innerHTML = '<p class="label frame-label">Podgląd strony · <span>700</span> px</p><div class="frame" data-w="700" data-h="420"></div>';
  const ramkaBox = podglad.querySelector('.frame');
  try {
    const o = await sprawdzZadanie(k.id, z, art.querySelector('textarea').value, ramkaBox);
    const widoczna = ramkaBox.querySelector('iframe:not(.ukryta)');
    if (widoczna) { ramkaBox.dataset.w = parseInt(widoczna.style.width) || 700; podglad.querySelector('.frame-label span').textContent = ramkaBox.dataset.w; dopasujRamki(); }
    else podglad.innerHTML = '';
    wynik.classList.add(o.ok ? 'is-ok' : 'is-bad');
    wynik.innerHTML = `${icon(o.ok ? 'tick' : 'cross')}<span>${o.ok ? 'Dobrze!' : esc(o.powod)}</span>`;
    if (o.kolumny?.length) extra.innerHTML = `<div class="rtable"><table><thead><tr>${o.kolumny.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${o.wiersze.map(w => `<tr>${w.map(v => v === null ? '<td class="null">NULL</td>' : `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (o.wyjscie !== undefined && !o.ok) extra.innerHTML += `${o.dane ? `<p class="test-data">Dane testu: <code>${esc(o.dane)}</code></p>` : ''}<div class="cmp"><figure><figcaption class="label">Twój wynik</figcaption>${kod(o.wyjscie || '(pusto)')}</figure><figure><figcaption class="label">Oczekiwany</figcaption>${kod(o.oczekiwane || '(pusto)')}</figure></div>`;
    if (o.ok && !art.querySelector('.task__head .ic')) art.querySelector('.task__head').insertAdjacentHTML('beforeend', `${icon('tick')}<span class="sr">zaliczone</span>`);
    if (P.sql[z.id] !== 1) P.sql[z.id] = o.ok ? 1 : 0; // raz zaliczone zostaje zaliczone
    P.ost = k.id; zapisz();
  } catch (err) {
    if (!ramkaBox.querySelector('iframe:not(.ukryta)')) podglad.innerHTML = '';
    wynik.classList.add('is-bad');
    wynik.innerHTML = `${icon('cross')}<span>${esc(err instanceof TypeError || err instanceof SyntaxError ? BLAD_POL : err.message)}</span>`;
  }
}
function pomoc(art, rodzaj) {
  const { z } = ZADANIE[art.dataset.id], gdzie = art.querySelector('.task__aids');
  if (gdzie.querySelector(`[data-aid="${rodzaj}"]`)) return;
  gdzie.insertAdjacentHTML(rodzaj === 'pod' ? 'afterbegin' : 'beforeend', rodzaj === 'pod'
    ? `<div class="note pop" data-aid="pod" role="note" aria-label="Podpowiedź">${esc(z.pod)}</div>`
    : `<div class="solution" data-aid="odp"><p class="label">Rozwiązanie wzorcowe</p>${kod(z.wzor)}</div>`);
}

// ---- teoria: seria 10 pytań ----
let SER = null;
function abcd(dzial) {
  const pula = miesza(ABCD.filter(q => !dzial || q.d == dzial));
  // Najpierw błędy, potem nowe, na końcu najdawniej widziane.
  const waga = q => !P.abcd[q.id] ? 1 : P.abcd[q.id].ok ? P.abcd[q.id].czas : 0;
  const seria = pula.sort((a, b) => waga(a) - waga(b)).slice(0, 10);
  SER = { dzial, seria: seria.map(q => ({ q, o: miesza(q.o) })), i: 0, pkt: 0, gotowe: false };
  pytanie();
}
function pytanie() {
  const { q, o } = SER.seria[SER.i], ile = SER.seria.length;
  SER.gotowe = false;
  app.innerHTML = `
  <div class="series">
    <div class="qmeta"><span>Pytanie ${SER.i + 1} z ${ile} · ${esc(DZIALY[q.d])} · klawisze 1–4</span>
      <span class="pips" aria-hidden="true">${SER.seria.map((_, n) => `<i class="${n < SER.i ? 'is-done' : n === SER.i ? 'is-now' : ''}"></i>`).join('')}</span></div>
    <div class="sheet taped" style="--tape:var(--t-blue)">
      <h1 class="q" tabindex="-1">${esc(q.p)}</h1>
      ${q.kod ? kod(q.kod) : ''}
      <ol class="answers">${o.map((x, n) => `<li><button class="answer" data-act="odpowiedz" data-n="${n}"><span class="answer__key">${'ABCD'[n]}</span><span>${esc(x)}</span><span class="answer__mark"></span></button></li>`).join('')}</ol>
      <div class="feedback" role="status" aria-live="polite"></div>
    </div>
  </div>`;
}
function odpowiedz(n) {
  if (!SER || SER.gotowe) return;
  SER.gotowe = true;
  const { q, o } = SER.seria[SER.i], ok = o[n] === q.o[0];
  SER.pkt += ok;
  P.abcd[q.id] = { ok: +ok, czas: Date.now() }; P.ost = 'abcd'; zapisz();
  app.querySelectorAll('.answer').forEach((b, m) => {
    b.disabled = true;
    const znak = b.querySelector('.answer__mark');
    if (m === n) b.querySelector('.answer__key').insertAdjacentHTML('beforeend', '<svg class="keyring" aria-hidden="true"><use href="#i-ring"/></svg>');
    if (o[m] === q.o[0]) { b.classList.add('is-correct'); znak.innerHTML = `${icon('tick')}<span class="sr">poprawna</span>`; }
    else if (m === n) { b.classList.add('is-wrong'); znak.innerHTML = `${icon('cross')}<span class="sr">Twoja odpowiedź, błędna</span>`; }
  });
  const fb = app.querySelector('.feedback');
  fb.innerHTML = `<div class="note note--${ok ? 'sage' : 'pink'} pop"><p class="verdict">${icon(ok ? 'tick' : 'cross')} ${ok ? 'Dobrze' : `Poprawna: ${esc(q.o[0])}`}</p><p>${esc(q.w)}</p></div>
    <button class="btn btn--primary" data-act="nastepne-pytanie">Dalej</button>`;
  fb.querySelector('button').focus();
}
function nastepnePytanie() {
  if (++SER.i < SER.seria.length) return pytanie(), fokus();
  const ile = SER.seria.length;
  app.innerHTML = `
  <div class="series">
    <div class="sheet taped endcard">
      <h1 class="title" tabindex="-1">${SER.pkt === ile ? 'Wzorowo!' : 'Błędy wrócą w następnej serii.'}</h1>
      <p class="score">${SER.pkt} z ${ile}</p>
      <div class="actions"><button class="btn btn--primary" data-act="dalej">Ucz się dalej</button><button class="btn" data-act="seria">Jeszcze jedna seria</button></div>
    </div>
  </div>`;
  fokus();
}

// ---- egzamin ABCD ----
let EGZ = null;
function egzamin() {
  EGZ = null;
  app.innerHTML = `
  <div class="topic">
    <div class="sheet taped today__main">
      <h1 class="title" tabindex="-1">Egzamin ABCD</h1>
      <p class="lead">40 losowych pytań, 60 minut, próg 50% (Twój cel: 80%). Jak na egzaminie: wynik dopiero na końcu.</p>
      <div class="actions"><button class="btn btn--primary" data-act="egzamin-start">Start</button></div>
    </div>
  </div>`;
}
function egzaminStart() {
  EGZ = { pytania: miesza(ABCD).slice(0, 40).map(q => ({ q, o: miesza(q.o) })), koniec: Date.now() + 36e5 };
  app.innerHTML = `
  <div class="exam">
    <form class="sheet" id="test" aria-labelledby="exT">
      <h1 class="title" id="exT" tabindex="-1">Egzamin ABCD</h1>
      ${EGZ.pytania.map(({ q, o }, n) => `
      <fieldset class="eq"><legend><span class="eq__n">${n + 1}.</span><span>${esc(q.p)}</span></legend>
        ${q.kod ? kod(q.kod) : ''}
        <div class="opts">${o.map((x, m) => `<label class="opt"><input type="radio" name="${esc(q.id)}" value="${m}"><span>${esc(x)}</span></label>`).join('')}</div>
      </fieldset>`).join('')}
      <div class="exam__end"><button class="btn btn--primary">Zakończ</button></div>
    </form>
    <aside class="note timer" aria-label="Czas egzaminu">Zostało <strong id="zegar">60:00</strong></aside>
  </div>`;
  const f = document.getElementById('test');
  f.onsubmit = e => {
    e.preventDefault();
    const puste = EGZ.pytania.length - new Set([...new FormData(f).keys()]).size;
    if (!puste || confirm(`Bez odpowiedzi: ${puste}. Zakończyć?`)) egzaminKoniec();
  };
  co(() => {
    const s = Math.max(0, Math.round((EGZ.koniec - Date.now()) / 1000));
    const el = document.getElementById('zegar');
    if (el) el.textContent = mmss(s);
    if (!s) egzaminKoniec();
  }, 1000);
  fokus();
}
function egzaminKoniec() {
  if (!EGZ || EGZ.wynik) return;
  EGZ.wynik = true;
  stopZegary();
  const odp = new FormData(document.getElementById('test')), czas = Date.now(), pytania = EGZ.pytania;
  const zle = pytania.filter(({ q, o }) => {
    const ok = odp.has(q.id) && o[odp.get(q.id)] === q.o[0];
    P.abcd[q.id] = { ok: +ok, czas };
    return !ok;
  });
  const pkt = pytania.length - zle.length;
  P.egz.push({ czas, pkt, max: pytania.length }); zapisz();
  app.innerHTML = `
  <div class="topic">
    <div class="sheet taped">
      <h1 class="title" tabindex="-1">${pkt * 2 >= pytania.length ? 'Zdane!' : 'Jeszcze nie tym razem.'}</h1>
      <p class="score">${pkt} z ${pytania.length} (${procent(pkt, pytania.length)}%)</p>
      <a class="btn btn--primary" href="#/">Na start</a>
    </div>
    ${zle.length ? `<h2 class="h2">Błędne odpowiedzi</h2><div class="wrongs">${zle.map(({ q, o }) => `
      <div class="sheet"><p><strong>${esc(q.p)}</strong></p>${q.kod ? kod(q.kod) : ''}
        <p class="yours">Twoja odpowiedź: ${odp.has(q.id) ? esc(o[odp.get(q.id)]) : 'brak'}</p>
        <p class="right">Poprawna: ${esc(q.o[0])}</p><p class="muted">${esc(q.w)}</p></div>`).join('')}</div>` : ''}
  </div>`;
  scrollTo(0, 0);
  fokus();
}

// ---- arkusze ----
function arkusze() {
  const wynik = id => P.ark[id]?.max ? procent(P.ark[id].pkt, P.ark[id].max) + '%' : '';
  app.innerHTML = `
  <div class="pagehead"><h1 class="title" tabindex="-1">Arkusze praktyczne</h1></div>
  <p class="lead" style="margin-bottom:40px">Najpierw arkusze próbne z automatyczną oceną, potem prawdziwe sesje jako próba generalna. Próg: 75%, Twój cel: 85%.</p>
  <h2 class="h2 section-h">Próbne, oceniane automatycznie</h2>
  <div class="mocks">
    ${ARKUSZE.map((a, i) => `<a class="sheet taped mock ${i % 2 ? 'taped--r' : ''}" href="#/arkusz/${a.id}" style="--tape:var(${i % 2 ? '--t-sage' : '--t-blue'})">
      <h3 class="h2">${esc(a.tytul)}</h3><p class="muted">${esc(a.rodzaj)} · ${a.minuty} min</p>
      ${wynik(a.id) ? `<p class="mock__res">${wynik(a.id)}</p>` : ''}</a>`).join('')}
  </div>
  <h2 class="h2 section-h">Prawdziwe sesje CKE</h2>
  <div class="sheet notebook sessions">
    ${SESJE.map((s, i) => `<a class="nrow" href="#/sesja/${s.id}"><span class="nrow__num">${i + 1}</span><span class="nrow__name">${esc(s.nazwa)}<small>${s.zalaczniki ? 'arkusz, zasady oceniania, załączniki' : 'arkusz, zasady oceniania'}</small></span><span class="nrow__val">${wynik('s-' + s.id)}</span></a>`).join('')}
  </div>
  <p class="older">Starsze testy teoretyczne EE.09 i E.14 (poprzedniczki INF.03): <a href="https://plociennik.info/index.php/informatyka/egzamin-zawodowy/arkusze-z-lat-poprzednich?view=questions" target="_blank" rel="noopener">plociennik.info ${icon('ext')}<span class="sr">(otwiera się w nowej karcie)</span></a></p>`;
}

// Odliczanie arkusza: start zapisany w P.ark[klucz].start, więc trwa też po zamknięciu strony.
function zegarHtml(klucz, minuty) {
  const s = P.ark[klucz]?.start;
  return `<aside class="note timer" aria-label="Odliczanie" data-timer="${klucz}" data-min="${minuty}">
    ${s ? `Zostało <strong data-clock>${hms(minuty * 60)}</strong><button class="btn btn--quiet" data-act="zegar-od-nowa">Zacznij czas od nowa</button>`
      : `<button class="btn btn--primary" data-act="zegar-start">Start: ${minuty} minut</button>`}</aside>`;
}
function uruchomZegar() {
  const box = app.querySelector('[data-timer]'), el = box?.querySelector('[data-clock]');
  if (!el) return;
  const koniec = P.ark[box.dataset.timer].start + box.dataset.min * 6e4;
  co(() => { el.textContent = hms(Math.max(0, Math.round((koniec - Date.now()) / 1000))); }, 1000);
}
function zegarStart(box, odNowa) {
  if (odNowa && !confirm('Zacząć odliczanie od nowa?')) return;
  const klucz = box.dataset.timer;
  P.ark[klucz] = { ...P.ark[klucz], start: Date.now() }; zapisz();
  stopZegary();
  box.outerHTML = zegarHtml(klucz, +box.dataset.min);
  uruchomZegar();
}

function arkusz(id) {
  const a = ARKUSZE.find(x => x.id === id);
  if (!a) return arkusze();
  app.innerHTML = `
  ${wstecz('#/arkusze', 'Arkusze')}
  <div class="sheetpage">
    <div>
      <h1 class="title" tabindex="-1">${esc(a.tytul)}</h1>
      <article class="sheet prose taped">${a.tresc}</article>
      <section class="grade sheet sheet--grid" aria-labelledby="ocenaH">
        <h2 class="h2" id="ocenaH">Ocena</h2>
        <p class="prose">Pracuj w <code>praca/${a.id}</code>. XAMPP musi mieć włączony MySQL, a baza musi być zaimportowana. Ocena otwiera Twoją stronę${a.post ? ' i wysyła formularz' : ' i klika w nią jak egzaminator'}. Wzorcowe rozwiązanie: <code>arkusze/${a.id}/wzor</code> (zajrzyj dopiero po ocenie).</p>
        <button class="btn btn--primary" data-act="ocen" data-id="${a.id}">Oceń moją pracę</button>
        <div class="gradeout" role="status" aria-live="polite"></div>
      </section>
    </div>
    ${zegarHtml(a.id, a.minuty)}
  </div>`;
  uruchomZegar();
}
async function ocenArkusz(a, gdzie) {
  gdzie.innerHTML = '<p class="label" style="margin-top:20px">Sprawdzam…</p>';
  try {
    const pliki = await (await fetch('api.php?co=praca&arkusz=' + a.id)).json();
    if (!(a.strona in pliki)) throw new Error(`Nie ma pliku praca/${a.id}/${a.strona}.`);
    const moje = (pliki['kwerendy.txt'] || '').split(';').map(x => x.slice(Math.max(0, x.search(/\b(SELECT|UPDATE|INSERT|DELETE|CREATE|ALTER)\b/i))).trim()).filter(Boolean);
    const kw = [];
    for (const z of a.kwerendy) {
      let ok = false;
      for (const sql of moje) if ((ok = (await api('sql', { arkusz: a.id, sql, wzor: z.wzor, sprawdz: z.sprawdz ?? null, kolejnosc: z.kolejnosc })).ok)) break;
      kw.push(ok);
    }
    const url = `praca/${a.id}/${a.strona}`;
    gdzie.innerHTML = `<p class="label frame-label" style="margin-top:28px">Podgląd strony · 1200 px</p>
      <div class="frame" data-w="1200" data-h="760"><iframe title="Podgląd Twojej strony" height="760"></iframe></div>
      <ol class="criteria"></ol><p class="sum" aria-live="polite"></p>`;
    const ramka = gdzie.querySelector('iframe');
    ramka.style.width = '1200px';
    await new Promise(r => { ramka.onload = r; ramka.src = url + '?t=' + Date.now(); });
    const doc = ramka.contentDocument, win = ramka.contentWindow;
    const styl = sel => win.getComputedStyle(doc.querySelector(sel));
    const pomiar = async px => {
      ramka.style.width = px + 'px';
      await new Promise(r => setTimeout(r, 80));
      const b = a.bloki.map(s => doc.querySelector(s)?.getBoundingClientRect() ?? {});
      const r = [...doc.querySelectorAll(a.obokSiebie || '.brak')].map(e => e.getBoundingClientRect().left);
      return { top: b.map(x => x.top), left: b.map(x => x.left), width: b.map(x => x.width), obok: r.length > 1 && Math.abs(r[0] - r[1]) > 3 };
    };
    const wasko = await pomiar(700), szeroko = await pomiar(1200);
    dopasujRamki();
    let opis = '';
    if (a.post) {
      const form = doc.querySelector(a.post.form), pole = form?.querySelector('input[name]');
      const dane = new URLSearchParams(new FormData(form ?? undefined));
      if (pole) { dane.set(pole.name, a.post.wartosc); opis = await (await fetch(url, { method: 'POST', body: dane })).text(); }
    }
    // licz: ustawia kalkulator jak egzaminator i zwraca kwotę z akapitu #wynik (arkusze z JS)
    const kalkulator = (opcja, porcje, dostawa) => {
      doc.getElementById('danie').selectedIndex = opcja; doc.getElementById('porcje').value = porcje; doc.getElementById('dostawa').checked = dostawa;
      [...doc.querySelectorAll('button, input[type=button], input[type=submit]')].find(b => /Oblicz/.test(b.textContent || b.value)).click();
      const m = doc.getElementById('wynik').textContent.match(/\d+(?:[.,]\d+)?/);
      return m ? Math.round(parseFloat(m[0].replace(',', '.')) * 100) / 100 : NaN;
    };
    const k = { pliki, kw, doc, win, styl, szeroko, wasko, opis, licz: kalkulator, php: pliki[a.strona], css: pliki['styl.css'] || '' };
    const wyniki = a.kryteria.map(([, , f]) => { if (!f) return null; try { return !!f(k); } catch { return false; } });
    gdzie.querySelector('.criteria').innerHTML = a.kryteria.map(([r, t], n) => wyniki[n] === null
      ? `<li class="crit is-manual"><label><input type="checkbox" data-n="${n}"><span><strong>${esc(r)}</strong> ${esc(t)}<small>do samodzielnej oceny</small></span></label></li>`
      : `<li class="crit ${wyniki[n] ? 'crit--ok' : 'crit--no'}">${icon(wyniki[n] ? 'tick' : 'cross')}<span><span class="sr">${wyniki[n] ? 'spełnione' : 'niespełnione'}: </span><strong>${esc(r)}</strong> ${esc(t)}</span></li>`).join('');
    const licz = () => {
      const pkt = wyniki.filter(x => x === true).length + gdzie.querySelectorAll('input:checked').length, max = wyniki.length;
      gdzie.querySelector('.sum').innerHTML = `<strong>${pkt} z ${max} (${procent(pkt, max)}%)</strong>, próg 75%, Twój cel 85%`;
      P.ark[a.id] = { ...P.ark[a.id], pkt, max, czas: Date.now() }; zapisz();
    };
    gdzie.querySelectorAll('input').forEach(x => x.onchange = licz);
    licz();
  } catch (e) {
    gdzie.innerHTML = `<p class="task__result is-bad">${icon('cross')}<span>${esc(e instanceof SyntaxError || (e instanceof TypeError && /fetch|load/i.test(e.message)) ? BLAD_POL : e.message)}</span></p>`;
  }
}

function sesja(id) {
  const s = SESJE.find(x => x.id === id);
  if (!s) return arkusze();
  const klucz = 's-' + id, a = P.ark[klucz] || {}, plik = r => `https://arkusze.pl/zawodowy/inf03-${id}-egzamin-zawodowy-praktyczny${r}`;
  app.innerHTML = `
  ${wstecz('#/arkusze', 'Arkusze')}
  <div class="sheetpage">
    <div class="topic">
      <h1 class="title" tabindex="-1">INF.03 · ${esc(s.nazwa)}</h1>
      <div class="sheet taped">
        <ol class="steps">
          <li><span>${s.zalaczniki ? `Otwórz <a href="${plik('.pdf')}" target="_blank" rel="noopener">arkusz</a> i pobierz <a href="${plik('-zalaczniki.zip')}">załączniki</a>.` : `Otwórz <a href="${plik('.pdf')}" target="_blank" rel="noopener">arkusz</a> (załączników brak na stronie: utwórz bazę i obrazy według treści).`}</span></li>
          <li><span>Pracuj jak na egzaminie: bez podpowiedzi, z dokumentacją offline.</span></li>
          <li><span>Po czasie otwórz <a href="${plik('-zasady-oceniania.pdf')}" target="_blank" rel="noopener">zasady oceniania</a> i uczciwie policz spełnione kryteria.</span></li>
        </ol>
        <p class="muted" style="margin:0">Pliki pochodzą z arkusze.pl, nie bezpośrednio z CKE.</p>
      </div>
      <form class="sheet sheet--kraft" id="pkt" novalidate>
        <fieldset class="plain"><legend class="h2">Wynik</legend>
          <div class="scoreform">
            <label>Spełnione kryteria<input type="number" name="pkt" min="0" required inputmode="numeric" value="${a.pkt ?? ''}"></label>
            <label>Wszystkie kryteria<input type="number" name="max" min="1" required inputmode="numeric" value="${a.max ?? ''}"></label>
            <button class="btn btn--primary">Zapisz</button>
          </div>
        </fieldset>
        <p class="formmsg" id="ocena" role="status" aria-live="polite">${a.max ? `${procent(a.pkt, a.max)}% (${data(a.czas)})` : ''}</p>
      </form>
    </div>
    ${zegarHtml(klucz, 150)}
  </div>`;
  uruchomZegar();
  document.getElementById('pkt').onsubmit = e => {
    e.preventDefault();
    const f = e.target, msg = document.getElementById('ocena');
    if (!f.reportValidity()) return;
    const pkt = +f.pkt.value, max = +f.max.value;
    msg.className = 'formmsg';
    if (pkt > max) { msg.classList.add('is-bad'); msg.textContent = 'Spełnionych nie może być więcej niż wszystkich.'; return; }
    P.ark[klucz] = { ...P.ark[klucz], pkt, max, czas: Date.now() }; zapisz();
    const p = procent(pkt, max);
    msg.classList.add(p >= 75 ? 'is-ok' : 'is-bad');
    msg.textContent = `${p}%: ${p >= 75 ? 'zdane' : 'poniżej progu 75%'}`;
  };
}

// ---- poradniki ----
function poradniki(id) {
  const p = PORADNIKI.find(x => x.id === id);
  if (p) return void (app.innerHTML = `<div class="topic">${wstecz('#/poradniki', 'Poradniki')}<h1 class="title" tabindex="-1">${esc(p.tytul)}</h1><article class="sheet prose taped" style="--tape:var(--t-pink)">${p.tresc}</article></div>`);
  const wyglad = ['sheet taped', 'sheet sheet--grid taped taped--r', 'sheet sheet--kraft', 'note note--blue'];
  app.innerHTML = `
  <div class="pagehead"><h1 class="title" tabindex="-1">Poradniki</h1></div>
  <div class="guides">${PORADNIKI.map((p, i) => `<a class="guide ${wyglad[i % 4]}" href="#/poradniki/${p.id}" style="--tape:var(--t-pink)">${i % 4 === 2 ? '<svg class="clip" aria-hidden="true"><use href="#i-clip"/></svg>' : ''}<h2 class="h2">${esc(p.tytul)}</h2><p>${esc(p.opis)}</p></a>`).join('')}</div>`;
}

// ---- podglądy: ramka o stałej szerokości (700 lub 1200 px) skalowana do miejsca na ekranie ----
function dopasujRamki() {
  app.querySelectorAll('.frame').forEach(fr => {
    const f = fr.querySelector('iframe:not(.ukryta)');
    if (!f) return;
    const w = +fr.dataset.w, h = +fr.dataset.h, s = Math.min(1, fr.clientWidth / w);
    f.style.transform = `scale(${s})`;
    fr.style.height = `${Math.round(h * s)}px`;
  });
}
addEventListener('resize', dopasujRamki);

// ---- zdarzenia ----
app.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const akcja = b.dataset.act, art = b.closest('.task');
  if (akcja === 'dalej') idzDalej();
  else if (akcja === 'sprawdz') sprawdz(art);
  else if (akcja === 'pod' || akcja === 'odp') pomoc(art, akcja);
  else if (akcja === 'inne') { powtorka(); fokus(); }
  else if (akcja === 'odpowiedz') odpowiedz(+b.dataset.n);
  else if (akcja === 'nastepne-pytanie') nastepnePytanie();
  else if (akcja === 'seria') { abcd(SER.dzial); fokus(); }
  else if (akcja === 'egzamin-start') egzaminStart();
  else if (akcja === 'ocen') ocenArkusz(ARKUSZE.find(x => x.id === b.dataset.id), app.querySelector('.gradeout'));
  else if (akcja === 'zegar-start' || akcja === 'zegar-od-nowa') zegarStart(b.closest('[data-timer]'), akcja === 'zegar-od-nowa');
});
app.addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && e.target.matches('.code-input')) { e.preventDefault(); sprawdz(e.target.closest('.task')); }
});
addEventListener('keydown', e => {
  if (!/^[1-4]$/.test(e.key) || e.metaKey || e.ctrlKey || e.altKey) return;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || !SER || SER.gotowe || !app.querySelector('.answer')) return;
  odpowiedz(+e.key - 1);
});

// ---- router ----
const TRASY = [
  [/^\/?$/, start], [/^\/kurs$/, kursy], [/^\/kurs\/([\w-]+)$/, kursLista], [/^\/kurs\/([\w-]+)\/([\w-]+)$/, temat],
  [/^\/sql$/, () => kursLista('sql')], [/^\/sql\/([\w-]+)$/, id => temat('sql', id)],
  [/^\/powtorka$/, powtorka], [/^\/abcd(?:\/(\d+))?$/, abcd], [/^\/egzamin$/, egzamin], [/^\/arkusze$/, arkusze],
  [/^\/arkusz\/([\w-]+)$/, arkusz], [/^\/sesja\/([\w-]+)$/, sesja], [/^\/poradniki(?:\/([\w-]+))?$/, poradniki],
];
const SEKCJA = { kurs: 'kurs', sql: 'kurs', powtorka: 'kurs', abcd: 'abcd', egzamin: 'egzamin', arkusze: 'arkusze', arkusz: 'arkusze', sesja: 'arkusze', poradniki: 'poradniki' };
function fokus() { app.querySelector('h1')?.focus({ preventScroll: true }); }
let pierwszy = true;
function trasa() {
  stopZegary();
  const sciezka = location.hash.replace(/^#/, '') || '/';
  const hit = TRASY.find(([re]) => re.test(sciezka));
  if (hit) hit[1](...sciezka.match(hit[0]).slice(1)); else start();
  const sek = SEKCJA[sciezka.split('/')[1]];
  document.querySelectorAll('.tabs a').forEach(a => a.dataset.sec === sek ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  scrollTo(0, 0);
  if (!pierwszy) fokus();
  pierwszy = false;
}
addEventListener('hashchange', trasa);
wczytaj().then(trasa);
