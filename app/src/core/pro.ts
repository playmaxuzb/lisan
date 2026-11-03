// @ts-nocheck
// Paid plans, entitlements, certificates, videos and admin tools.
// Everything that needs a server goes through Firebase (Firestore + Storage); the rules that
// keep it safe live in deploy/firebase/firestore.rules and storage.rules.
import { Store, LEVELS, COURSES } from './engine';
import { FB, Auth, CFG, onAuthUser } from './auth';

const now = () => Date.now();
const ls = { get(k){ try { return localStorage.getItem(k); } catch (e){ return null; } }, set(k, v){ try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e){} } };

export const Pro = { ent: { all: 0, courses: {} }, admin: false, ready: false };
const emit = () => Store.emit();

/* ---------- commerce settings ---------- */
export function commerce(){ return (CFG && CFG.commerce) || {}; }
export function previewMode(){ return ls.get('lisan.preview') === 'pro'; }
export function setPreview(on){ ls.set('lisan.preview', on ? 'pro' : null); emit(); }
export function paywallOn(){ return previewMode() || !!commerce().enabled; }
export function prices(){ return Object.assign({ currency: 'USD', course: 19, monthly: 7.99, yearly: 49.99 }, commerce().prices || {}); }
export function money(v){ const p = prices(); try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: p.currency, maximumFractionDigits: v % 1 ? 2 : 0 }).format(v); } catch (e){ return '$' + v; } }
export function paymentsReady(){ const l = commerce().links || {}; return !!(l.course || l.monthly || l.yearly); }

/* ---------- entitlements ---------- */
function norm(d){ const o = { all: 0, courses: {} }; if (!d) return o;
  const t = (x) => x === true ? 4e12 : (x && x.toMillis ? x.toMillis() : +x || 0);
  o.all = t(d.all); Object.entries(d.courses || {}).forEach(([k, v]) => { o.courses[k] = t(v); }); return o; }
function demoEnt(){ try { return norm(JSON.parse(ls.get('lisan.demoEnt') || 'null')); } catch (e){ return norm(null); } }
function ent(){ if (previewMode()){ const d = demoEnt(), r = Pro.ent; return { all: Math.max(d.all, r.all), courses: Object.assign({}, d.courses, r.courses) }; } return Pro.ent; }
export function isPro(){ return ent().all > now(); }
export function ownsLang(t){ return isPro() || (ent().courses[t] || 0) > now(); }
export function hasAccess(tr, L){ if (!paywallOn() || L === 'A1') return true; const c = COURSES[tr]; return !!c && ownsLang(c.t); }
export function planOf(){ const e = ent(); if (e.all > now()) return { kind: 'pro', until: e.all }; const owned = Object.keys(e.courses).filter((k) => e.courses[k] > now()); return owned.length ? { kind: 'course', langs: owned } : { kind: 'free' }; }

export async function refresh(){
  const f = FB(); const u = Auth.user;
  if (!f || !u){ Pro.ent = norm(null); Pro.admin = false; Pro.ready = true; emit(); return; }
  try { const s = await f.F.getDoc(f.F.doc(f.db, 'ent', u.uid)); Pro.ent = norm(s.exists() ? s.data() : null); } catch (e){}
  try { await f.F.getDoc(f.F.doc(f.db, 'admin', 'probe')); Pro.admin = true; } catch (e){ Pro.admin = false; }
  Pro.ready = true; emit();
}
export function initPro(){
  try { const q = new URLSearchParams(location.search); if (q.get('preview') === 'pro') setPreview(true); if (q.get('preview') === 'off') setPreview(false); } catch (e){}
  onAuthUser(() => refresh()); refresh();
}

/* ---------- checkout ---------- */
// Stripe Payment Links: one link for "one language" and one each for monthly / yearly Pro.
// client_reference_id carries the account and the language so the webhook knows what to unlock.
export function checkout(kind, lang){
  const l = commerce().links || {}; const u = Auth.user;
  if (previewMode() && !paymentsReady()){ const d = JSON.parse(ls.get('lisan.demoEnt') || '{"all":0,"courses":{}}');
    if (kind === 'course') d.courses[lang] = 4e12; else d.all = now() + (kind === 'yearly' ? 365 : 31) * 864e5;
    ls.set('lisan.demoEnt', JSON.stringify(d)); emit(); return 'demo'; }
  if (!paymentsReady()) return 'notready';
  if (!u) return 'signin';
  let url = kind === 'course' ? (typeof l.course === 'string' ? l.course : (l.course || {})[lang]) : l[kind];
  if (!url) return 'notready';
  const ref = (u.uid + '__' + (kind === 'course' ? lang : kind)).replace(/[^A-Za-z0-9_-]/g, '');
  const q = new URLSearchParams({ client_reference_id: ref }); if (u.email) q.set('prefilled_email', u.email);
  location.href = url + (url.includes('?') ? '&' : '?') + q.toString(); return 'redirect';
}
export function resetDemo(){ ls.set('lisan.demoEnt', null); emit(); }

/* ---------- admin: grants ---------- */
export async function findUserByEmail(email){
  const f = FB(); if (!f) throw new Error('nofb');
  const q = f.F.query(f.F.collection(f.db, 'users'), f.F.where('profile.email', '==', email.trim().toLowerCase()), f.F.limit(5));
  let s = await f.F.getDocs(q); if (s.empty){ const q2 = f.F.query(f.F.collection(f.db, 'users'), f.F.where('profile.email', '==', email.trim()), f.F.limit(5)); s = await f.F.getDocs(q2); }
  return s.docs.map((d) => ({ uid: d.id, profile: (d.data() || {}).profile || {} }));
}
export async function readEnt(uid){ const f = FB(); const s = await f.F.getDoc(f.F.doc(f.db, 'ent', uid)); return norm(s.exists() ? s.data() : null); }
export async function grant(uid, what, months){
  const f = FB(); const ref = f.F.doc(f.db, 'ent', uid); const cur = await readEnt(uid);
  const until = months ? Math.max(now(), what === 'all' ? cur.all : (cur.courses[what] || 0)) + months * 30.44 * 864e5 : 4e12;
  const patch = what === 'all' ? { all: until } : { courses: { [what]: until } };
  await f.F.setDoc(ref, Object.assign(patch, { updated: now(), by: Auth.user && Auth.user.email || '' }), { merge: true });
  return readEnt(uid);
}
export async function revoke(uid, what){
  const f = FB(); const ref = f.F.doc(f.db, 'ent', uid);
  await f.F.setDoc(ref, what === 'all' ? { all: 0 } : { courses: { [what]: 0 } }, { merge: true }); return readEnt(uid);
}
export async function listAdmins(){ const f = FB(); const s = await f.F.getDocs(f.F.collection(f.db, 'admins')); return s.docs.map((d) => d.id); }
export async function addAdmin(email){ const f = FB(); await f.F.setDoc(f.F.doc(f.db, 'admins', email.trim().toLowerCase()), { added: now() }); }
export async function removeAdmin(email){ const f = FB(); await f.F.deleteDoc(f.F.doc(f.db, 'admins', email)); }

/* ---------- videos ---------- */
export async function listVideos(){
  const out = [];
  try { const r = await fetch('videos.json', { cache: 'no-store' }); if (r.ok){ const j = await r.json(); (j || []).forEach((v, i) => out.push(Object.assign({ id: 'static' + i }, v))); } } catch (e){}
  const f = FB(); if (f){ try { const s = await f.F.getDocs(f.F.collection(f.db, 'videos')); s.docs.forEach((d) => out.push(Object.assign({ id: d.id }, d.data()))); } catch (e){} }
  return out.sort((a, b) => (b.created || 0) - (a.created || 0));
}
export async function addVideo(v, file, onProgress){
  const f = FB(); if (!f) throw new Error('nofb');
  let url = v.url || '', path = '';
  if (file){ const S = await import('firebase/storage'); const st = S.getStorage(f.app); path = 'videos/' + now() + '-' + file.name.replace(/[^\w.-]+/g, '_');
    const task = S.uploadBytesResumable(S.ref(st, path), file, { contentType: file.type || 'video/mp4' });
    await new Promise((res, rej) => task.on('state_changed', (s) => onProgress && onProgress(s.bytesTransferred / s.totalBytes), rej, res));
    url = await S.getDownloadURL(task.snapshot.ref); }
  const doc = { title: v.title || '', desc: v.desc || '', url, path, t: v.t || '', L: v.L || '', n: v.n || '', free: !!v.free, created: now(), by: Auth.user && Auth.user.email || '' };
  const r = await f.F.addDoc(f.F.collection(f.db, 'videos'), doc); return Object.assign({ id: r.id }, doc);
}
export async function deleteVideo(v){ const f = FB(); if (v.path){ try { const S = await import('firebase/storage'); await S.deleteObject(S.ref(S.getStorage(f.app), v.path)); } catch (e){} } await f.F.deleteDoc(f.F.doc(f.db, 'videos', v.id)); }
export function videoEmbed(url){
  const y = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/); if (y) return { kind: 'iframe', src: 'https://www.youtube-nocookie.com/embed/' + y[1] + '?rel=0' };
  const v = url.match(/vimeo\.com\/(\d+)/); if (v) return { kind: 'iframe', src: 'https://player.vimeo.com/video/' + v[1] };
  const g = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/); if (g) return { kind: 'iframe', src: 'https://drive.google.com/file/d/' + g[1] + '/preview' };
  return { kind: 'video', src: url };
}

/* ---------- certificates ---------- */
const B32 = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function code(n){ const a = new Uint8Array(n); crypto.getRandomValues(a); return Array.from(a, (x) => B32[x % 32]).join(''); }
export function certsOf(){ return Object.values(Store.d.certs || {}).sort((a, b) => b.issued - a.issued); }
export function certFor(tr, L){ return certsOf().find((c) => c.tr === tr && c.L === L) || null; }
export function canCert(tr, L){ return Store.passed(tr, L); }
export async function issueCert(tr, L, name){
  const c = COURSES[tr]; const p = Store.profile() || {};
  const id = 'LSN-' + c.t.toUpperCase() + L + '-' + code(4) + '-' + code(4);
  const cert = { id, tr, n: c.n, t: c.t, L, name, score: Store.d.best[tr + ':' + L] || 0, issued: now(), uid: (Auth.user && Auth.user.uid) || '', username: p.username || '' };
  (Store.d.certs || (Store.d.certs = {}))[id] = cert; Store.save();
  const f = FB(); if (f && Auth.user){ try { await f.F.setDoc(f.F.doc(f.db, 'certs', id), cert); cert.online = true; Store.save(); } catch (e){} }
  return cert;
}
export async function findCert(id){
  id = String(id || '').toUpperCase().trim(); const local = (Store.d.certs || {})[id];
  const f = FB(); if (f){ try { const s = await f.F.getDoc(f.F.doc(f.db, 'certs', id)); if (s.exists()) return Object.assign({ verified: true }, s.data()); } catch (e){} }
  return local ? Object.assign({ verified: false, localOnly: true }, local) : null;
}
export const verifyURL = (id) => location.origin + location.pathname + '#/verify/' + id;
export const fullName = (nm) => [nm.first, nm.middle, nm.last].map((x) => (x || '').trim()).filter(Boolean).join(' ');
export const latinName = (nm) => [nm.lfirst, nm.lmiddle, nm.llast].map((x) => (x || '').trim()).filter(Boolean).join(' ');

/* ---------- small helpers for level gating ---------- */
export const levelIdx = (L) => LEVELS.indexOf(L);
