const esc = s => String(s ?? '').replace(/[&<>"']/g, c => `&#${c.charCodeAt()};`);
const KURSY = [
  { id: 'sql', nazwa: 'SQL', tematy: SQL }, { id: 'php', nazwa: 'PHP', tematy: PHP }, { id: 'html', nazwa: 'HTML', tematy: HTML },
  { id: 'css', nazwa: 'CSS', tematy: CSS3 }, { id: 'js', nazwa: 'JavaScript', tematy: JS }
];

async function api(co, dane) {
  const r = await fetch('api.php?co=' + co, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-INF03': '1' }, body: JSON.stringify(dane) });
  const j = await r.json();
  if (!r.ok) throw new Error(j.blad || 'Błąd serwera');
  return j;
}

function ramka(kod, gdzie, px, ukryta) {
  return new Promise(res => {
    const f = document.createElement('iframe');
    f.sandbox = 'allow-same-origin'; // bez skryptów: podgląd HTML i CSS
    f.title = 'Podgląd'; f.className = ukryta ? 'ukryta' : 'podglad maly';
    f.style.width = px + 'px';
    f.onload = () => res(f);
    f.srcdoc = kod;
    gdzie.append(f);
  });
}
const tekst = e => e.textContent.replace(/\s+/g, ' ').trim();

// spr: [selektor] istnieje, [selektor, liczba] tyle elementów, [selektor, 'tekst'] element z takim tekstem
async function ocenHtml(z, kod, gdzie) {
  const d = (await ramka(kod, gdzie, 700)).contentDocument;
  for (const [sel, ma] of z.spr) {
    if (sel === '!doctype') { if (d.doctype?.name !== 'html') return { ok: false, powod: 'Brakuje <!DOCTYPE html>.' }; continue; }
    const el = [...d.querySelectorAll(sel)];
    if (typeof ma === 'number' ? el.length !== ma : typeof ma === 'string' ? !el.some(e => tekst(e) === ma) : !el.length)
      return { ok: false, powod: typeof ma === 'number' ? `Elementów „${sel}”: ${el.length}, a powinno być ${ma}.` : typeof ma === 'string' ? `Nie ma „${sel}” z tekstem „${ma}”.` : `Nie znaleziono: ${sel}` };
  }
  return { ok: true };
}

// Porównuje wyliczone style Twojego CSS i wzoru, więc każdy poprawny zapis przechodzi.
async function ocenCss(z, kod, gdzie) {
  const dok = c => `<!DOCTYPE html><meta charset="utf-8"><style>${c}</style>${z.html}`;
  for (const px of z.szer || [700]) {
    gdzie.querySelectorAll('iframe').forEach(f => f.remove());
    const a = await ramka(dok(kod), gdzie, px), b = await ramka(dok(z.wzor), gdzie, px, true);
    const styl = (f, e, w) => { const [pseudo, wl] = w.includes('|') ? w.split('|') : [null, w]; return f.contentWindow.getComputedStyle(e, pseudo)[wl]; };
    for (const [sel, wlasciwosci] of Object.entries(z.por)) {
      const ea = [...a.contentDocument.querySelectorAll(sel)], eb = [...b.contentDocument.querySelectorAll(sel)];
      for (let i = 0; i < eb.length; i++) for (const w of wlasciwosci)
        if (styl(a, ea[i], w) !== styl(b, eb[i], w)) {
          const p = { ok: false, powod: `${sel}: ${w} ma wartość ${styl(a, ea[i], w)}, a powinno być ${styl(b, eb[i], w)}${z.szer ? ` (ekran ${px} px)` : ''}.` };
          b.remove();
          return p;
        }
    }
    for (const sel of z.uklad || []) {
      const [ra, rb] = [a, b].map(f => f.contentDocument.querySelector(sel).getBoundingClientRect());
      if (['left', 'top', 'width'].some(k => Math.abs(ra[k] - rb[k]) > 2)) {
        b.remove();
        return { ok: false, powod: `Blok ${sel} stoi w innym miejscu albo ma inną szerokość niż powinien${z.szer ? ` (ekran ${px} px)` : ''}.` };
      }
    }
    b.remove();
  }
  if (z.musi && !new RegExp(z.musi, 'i').test(kod)) return { ok: false, powod: z.musiOpis };
  return { ok: true };
}

// Kod działa w odizolowanej ramce; wyr to wyrażenia, których wartości porównujemy ze wzorem.
function wynikiJs(z, kod) {
  return new Promise(res => {
    const f = document.createElement('iframe');
    const koniec = d => { clearTimeout(limit); removeEventListener('message', on); f.remove(); res(d); };
    const on = e => { if (e.source === f.contentWindow) koniec(e.data); };
    const limit = setTimeout(() => koniec({ blad: 'Kod nie odpowiada. Sprawdź warunek pętli.' }), 3000);
    addEventListener('message', on);
    const S = 'script';
    f.sandbox = 'allow-scripts'; f.className = 'ukryta'; f.title = 'Test';
    f.srcdoc = `<!DOCTYPE html><meta charset="utf-8"><body>${z.html || ''}<${S}>var __b = null; addEventListener('error', e => { __b = __b || e.message; });</${S}>
<${S}>${kod.replace(/<\/script/gi, '<\\/script')}\n</${S}>
<${S}>{ const w = __b ? [] : ${JSON.stringify(z.wyr).replace(/</g, '\\u003c')}.map(x => { try { const v = (0, eval)(x); return JSON.stringify(v) ?? String(v); } catch (e) { return 'błąd: ' + e.message; } });
parent.postMessage(__b ? { blad: __b } : { w }, '*'); }</${S}>`;
    document.body.append(f);
  });
}
async function ocenJs(z, kod) {
  const a = await wynikiJs(z, kod), b = await wynikiJs(z, z.wzor);
  if (a.blad) return { ok: false, powod: 'Błąd: ' + a.blad };
  const i = b.w.findIndex((x, n) => x !== a.w[n]);
  if (i >= 0) return { ok: false, powod: `Test ${z.opisy?.[i] ?? z.wyr[i]}: wyszło ${a.w[i]}, a powinno być ${b.w[i]}.` };
  if (z.musi && !new RegExp(z.musi, 'i').test(kod)) return { ok: false, powod: z.musiOpis };
  return { ok: true };
}

// zamien: pierwsza liczba to wartość startowa zmiennej; podmieniamy ją, żeby sprawdzić wszystkie gałęzie warunku.
const wariant = (s, z, v) => v === undefined ? s : s.replace(new RegExp(`=\\s*${z.zamien[0]}\\s*;`), `= ${v};`);
async function ocenPhp(z, kod) {
  let o;
  for (const v of z.zamien || [undefined]) {
    o = await api('php', { kod: wariant(kod, z, v), wzor: wariant(z.wzor, z, v), testy: z.testy, sprawdz: z.sprawdz ?? null, musi: z.musi, musiOpis: z.musiOpis });
    if (!o.ok) return v === undefined ? o : { ...o, powod: `${o.powod} (dla wartości ${v})` };
  }
  return o;
}

function sprawdzZadanie(typ, z, kod, gdzie) {
  if (!kod.trim()) return { ok: false, powod: 'Wpisz rozwiązanie.' };
  if (typ === 'sql') return api('sql', { sql: kod, wzor: z.wzor, sprawdz: z.sprawdz ?? null, kolejnosc: z.kolejnosc, aliasy: z.aliasy });
  if (typ === 'php') return ocenPhp(z, kod);
  return { html: ocenHtml, css: ocenCss, js: ocenJs }[typ](z, kod, gdzie);
}
