// @ts-nocheck
// Spaced repetition (a light SM-2): every word or sentence the learner meets in an exam, or adds
// from "learn new", gets a card. Wrong answers come back the same day; right ones wait longer each time.
import { Store, LEVELS, level, ensureTrack, COURSES, setAnswerHook } from './engine';
import { hasAccess } from './pro';
const DAY = 864e5, now = () => Date.now();
const deck = (tr) => { const s = Store.d.srs || (Store.d.srs = {}); return s[tr] || (s[tr] = {}); };
export function add(tr, id, dueIn = 0){ const d = deck(tr); if (!d[id]) d[id] = { d: now() + dueIn, i: 0, e: 2.5, r: 0, l: 0, a: now() }; return d[id]; }
export function grade(tr, id, g){ const c = add(tr, id);
  if (g === 0){ c.r = 0; c.l++; c.i = 0; c.e = Math.max(1.3, c.e - .2); c.d = now() + 10 * 6e4; }
  else { const i = c.r === 0 ? [1, 1, 3][g - 1] : c.r === 1 ? [2, 3, 6][g - 1] : Math.max(c.i + 1, Math.round(c.i * (g === 1 ? 1.2 : g === 2 ? c.e : c.e * 1.3)));
    c.e = Math.max(1.3, c.e + (g === 1 ? -.15 : g === 3 ? .15 : 0)); c.i = i; c.r++; c.d = now() + i * DAY; }
  Store.save(); return c; }
export function preview(tr, id, g){ const c = (deck(tr)[id]) || { i: 0, e: 2.5, r: 0 };
  if (g === 0) return 10 / 1440; return c.r === 0 ? [1, 1, 3][g - 1] : c.r === 1 ? [2, 3, 6][g - 1] : Math.max(c.i + 1, Math.round(c.i * (g === 1 ? 1.2 : g === 2 ? c.e : c.e * 1.3))); }
export function due(tr){ const d = deck(tr), t = now(); return Object.keys(d).filter((k) => d[k].d <= t).sort((a, b) => d[a].d - d[b].d); }
export function dueCount(tr){ const s = Store.d.srs && Store.d.srs[tr]; if (!s) return 0; const t = now(); let n = 0; for (const k in s) if (s[k].d <= t) n++; return n; }
export function size(tr){ return Object.keys((Store.d.srs && Store.d.srs[tr]) || {}).length; }
export function mastered(tr){ const s = (Store.d.srs && Store.d.srs[tr]) || {}; return Object.values(s).filter((c) => c.i >= 21).length; }
export function itemOf(tr, id){ const L = id.split(':')[0]; const lv = level(tr, L); if (!lv) return null; const [, k, i] = id.split(':');
  const arr = k === 'v' ? lv.vocab : k === 's' ? lv.sentences : null; return arr ? arr[+i] || null : null; }
export async function learnNew(tr, n = 10){ await ensureTrack(tr); const d = deck(tr); const out = [];
  LEVELS.forEach((L, i) => { if (out.length >= n || !Store.unlocked(tr, i) || !hasAccess(tr, L)) return; const lv = level(tr, L);
    for (const it of lv.vocab){ if (out.length >= n) break; if (!d[it.id]){ add(tr, it.id); out.push(it.id); } } });
  Store.save(); return out; }
export function initSrs(){ setAnswerHook((tr, item, ok) => { if (!item || !item.id || !/:(v|s):/.test(item.id)) return; const d = deck(tr);
  if (!ok){ const c = add(tr, item.id); c.d = now(); if (c.r > 0){ c.r = 0; c.l++; c.i = 0; } } else if (!d[item.id]) add(tr, item.id, DAY); }); }
