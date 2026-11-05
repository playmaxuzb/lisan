// @ts-nocheck
// In-app back / forward: remembers the pages visited in this tab so the buttons know what is possible.
const KEY = 'lisan.nav'; let st = { s: [], i: -1 }; const subs = new Set();
try { const o = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (o && Array.isArray(o.s)) st = o; } catch (e){}
const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch (e){} subs.forEach((f) => f()); };
const cur = () => location.hash || '#/';
export function navTrack(){ const h = cur();
  if (st.s[st.i] === h) {}
  else if (st.s[st.i - 1] === h) st.i--;
  else if (st.s[st.i + 1] === h) st.i++;
  else { st.s = st.s.slice(0, st.i + 1); st.s.push(h); if (st.s.length > 200) st.s.shift(); st.i = st.s.length - 1; }
  save(); }
export const canBack = () => st.i > 0;
export const canFwd = () => st.i < st.s.length - 1;
export const goBack = () => { if (canBack()) history.back(); else location.hash = '#/'; };
export const goFwd = () => { if (canFwd()) history.forward(); };
export const onNav = (f) => { subs.add(f); return () => subs.delete(f); };
