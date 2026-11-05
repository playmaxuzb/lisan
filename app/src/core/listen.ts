// @ts-nocheck
// Speech recognition for pronunciation practice: the browser listens, we compare what it heard with the target word by word.
import { SPEECH_LANG, norm, sayOf } from './engine';

const SR = () => (typeof window !== 'undefined') && (window.SpeechRecognition || window.webkitSpeechRecognition);
export const canListen = () => !!SR();
const CHARS = (tl) => tl === 'zh' || tl === 'ja';

let cur = null;
export function stopListen(){ try { cur && cur.abort(); } catch (e){} cur = null; }
/* resolves with { alts: [transcript...], error } */
export function listen(tl, { onStart = null, maxMs = 9000 } = {}){
  return new Promise((res) => { const C = SR(); if (!C){ res({ alts: [], error: 'unsupported' }); return; }
    stopListen(); const r = new C(); cur = r; r.lang = SPEECH_LANG[tl] || tl; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
    let alts = [], err = null, done = false; const fin = () => { if (done) return; done = true; clearTimeout(t); cur = null; res({ alts, error: alts.length ? null : err }); };
    r.onstart = () => onStart && onStart(); r.onresult = (e) => { const out = []; for (let i = 0; i < e.results.length; i++){ const R = e.results[i]; for (let j = 0; j < R.length; j++) out.push(R[j].transcript); } alts = out; };
    r.onerror = (e) => { err = e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'denied' : e.error === 'no-speech' ? 'nospeech' : e.error || 'error'; };
    r.onend = fin; const t = setTimeout(() => { try { r.stop(); } catch (e){} }, maxMs);
    try { r.start(); } catch (e){ err = 'error'; fin(); } }); }

/* number words the recogniser often writes as digits */
const NUM = { ru: ['ноль','один','два','три','четыре','пять','шесть','семь','восемь','девять','десять'], en: ['zero','one','two','three','four','five','six','seven','eight','nine','ten'], de: ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn'],
  fr: ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix'], it: ['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci'], es: ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'],
  tr: ['sıfır','bir','iki','üç','dört','beş','altı','yedi','sekiz','dokuz','on'], uz: ['nol','bir','ikki','uch','toʻrt','besh','olti','yetti','sakkiz','toʻqqiz','oʻn'] };
const fold = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ё/g, 'е').replace(/[ʻʼ’'`‘]/g, '');
function toks(s, tl){ const n = norm(s, tl); if (CHARS(tl)) return [...n.replace(/\s+/g, '')].filter((c) => /[\p{L}\p{N}]/u.test(c)); if (tl === 'ko') return [...n.replace(/\s+/g, '')]; return n.split(' ').filter(Boolean); }
const same = (a, b, tl) => { if (a === b) return true; const fa = fold(a), fb = fold(b); if (fa === fb) return true;
  if (/^\d+$/.test(b)) return !/^\d+$/.test(a) || a === b; // the recogniser writes numbers as digits
  if (!CHARS(tl) && tl !== 'ko' && fa.length >= 5 && lev(fa, fb) <= 1) return true; return false; };
function lev(a, b){ const m = a.length, n = b.length; const d = Array.from({ length: m + 1 }, (_, i) => [i]); for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
/* LCS alignment: which target units were heard */
function align(T, H, tl){ const m = T.length, n = H.length; const L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = same(T[i], H[j], tl) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ok = new Array(m).fill(false); let i = 0, j = 0; while (i < m && j < n){ if (same(T[i], H[j], tl)){ ok[i] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; } return ok; }
/* score against the best alternative; returns { score 0..100, marks: [{w, ok}], heard } */
export function grade(target, alts, tl){ const T = toks(target, tl); let best = { score: -1, ok: [], heard: '' };
  for (const a of alts){ const H = toks(a, tl); if (!H.length) continue; const ok = align(T, H, tl); const hit = ok.filter(Boolean).length; const extra = Math.max(0, H.length - T.length);
    const sc = T.length ? Math.round(100 * hit / (T.length + extra * 0.5)) : 0; if (sc > best.score) best = { score: sc, ok, heard: a }; }
  if (best.score < 0) best = { score: 0, ok: new Array(T.length).fill(false), heard: '' };
  // map units back to visible words
  let marks;
  if (CHARS(tl)){ marks = T.map((w, i) => ({ w, ok: best.ok[i] })); }
  else { const shown = sayOf(target).split(/\s+/).filter(Boolean); let k = 0; marks = shown.map((w) => { const n = toks(w, tl).length; const seg = best.ok.slice(k, k + n); k += n; return { w, ok: n === 0 ? true : seg.every(Boolean) }; }); }
  return { score: Math.max(0, Math.min(100, best.score)), marks, heard: best.heard }; }
