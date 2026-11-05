// @ts-nocheck
// Learners report mistakes in a word, sentence, picture or audio; the team sees them in the admin panel.
import { Store } from './engine';
import { FB, Auth } from './auth';
const QKEY = 'lisan.reports.q';
const q = () => { try { return JSON.parse(localStorage.getItem(QKEY) || '[]'); } catch (e){ return []; } };
const within = (p, ms = 7000) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
const setQ = (a) => { try { localStorage.setItem(QKEY, JSON.stringify(a.slice(-50))); } catch (e){} };
export async function sendReport(r){
  const p = Store.profile() || {}; const doc = Object.assign({}, r, { uid: (Auth.user && Auth.user.uid) || '', email: (Auth.user && Auth.user.email) || p.email || '', user: p.username || '', native: p.native || '', at: Date.now(), status: 'new', ua: navigator.userAgent.slice(0, 160), page: location.hash.slice(0, 120) });
  ['src', 'm', 'note'].forEach((k) => { if (doc[k]) doc[k] = String(doc[k]).slice(0, k === 'note' ? 600 : 400); });
  const a = q(); a.push(doc); setQ(a); // keep a copy until the server confirms
  const f = FB(); if (f){ try { await within(f.F.addDoc(f.F.collection(f.db, 'reports'), doc)); setQ(q().filter((d) => d.at !== doc.at)); flushReports(); return 'sent'; } catch (e){} }
  return 'queued'; }
export async function flushReports(){ const a = q(); const f = FB(); if (!a.length || !f) return; const left = [];
  for (const d of a){ try { await within(f.F.addDoc(f.F.collection(f.db, 'reports'), d)); } catch (e){ left.push(d); } } setQ(left); }
export async function listReports(status = 'new'){ const f = FB(); const Q = f.F.query(f.F.collection(f.db, 'reports'), f.F.where('status', '==', status), f.F.limit(200));
  const s = await f.F.getDocs(Q); return s.docs.map((d) => Object.assign({ id: d.id }, d.data())).sort((a, b) => b.at - a.at); }
export async function setReport(id, status){ const f = FB(); await f.F.setDoc(f.F.doc(f.db, 'reports', id), { status, by: Auth.user && Auth.user.email || '', done: Date.now() }, { merge: true }); }
/* schools that want to work with Lisan */
export async function sendPartner(d){ const f = FB(); const doc = Object.assign({}, d, { at: Date.now(), lang: (Store.profile() || {}).native || '' }); Object.keys(doc).forEach((k) => { if (typeof doc[k] === 'string') doc[k] = doc[k].slice(0, 400); });
  if (f){ try { await within(f.F.addDoc(f.F.collection(f.db, 'partners'), doc)); return 'sent'; } catch (e){} }
  try { const a = JSON.parse(localStorage.getItem('lisan.partner.q') || '[]'); a.push(doc); localStorage.setItem('lisan.partner.q', JSON.stringify(a)); } catch (e){} return 'queued'; }
export async function listPartners(){ const f = FB(); const s = await f.F.getDocs(f.F.collection(f.db, 'partners')); return s.docs.map((d) => Object.assign({ id: d.id }, d.data())).sort((a, b) => b.at - a.at); }
