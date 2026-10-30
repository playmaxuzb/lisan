// @ts-nocheck
// Sign-in and cloud sync through Firebase, plus a welcome email through EmailJS.
// Both are switched on by keys in public/lisan-config.json (or the older firebase-config.json);
// without them, accounts and progress stay on the device.
import { Store, setSaveHook } from './engine';
let fb = null;
export const Auth = { ready: false, enabled: false, user: null, email: null, pendingRedirect: false };

async function loadConfig(){
  for (const f of ['lisan-config.json', 'firebase-config.json']){
    try { const r = await fetch(f, { cache: 'no-store' }); if (!r.ok) continue; const j = await r.json();
      if (j && j.apiKey) return { firebase: j }; if (j && (j.firebase || j.emailjs)) return j; } catch (e){}
  }
  return {};
}

export async function initAuth(){
  const cfg = await loadConfig();
  if (cfg.emailjs && cfg.emailjs.publicKey && cfg.emailjs.serviceId && cfg.emailjs.templateId) Auth.email = cfg.emailjs;
  if (cfg.firebase && cfg.firebase.apiKey){
    try {
      const [{ initializeApp }, A, F] = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')]);
      const app = initializeApp(cfg.firebase); const auth = A.getAuth(app); const db = F.getFirestore(app);
      try { auth.languageCode = (Store.profile() && Store.profile().native) || Store.meta.pendingNative || navigator.language; } catch (e){}
      fb = { app, auth, db, A, F }; Auth.enabled = true;
      // back from Google (redirect flow on phones)
      try { const res = await Promise.race([A.getRedirectResult(auth), new Promise((r) => setTimeout(() => r(null), 6000))]); if (res && res.user) await afterLogin(res.user, 'google'); } catch (e){}
      // back from the email sign-in link
      if (A.isSignInWithEmailLink(auth, location.href)){
        const email = localStorage.getItem('lisan.emailForSignIn') || prompt('Email');
        if (email){ const cred = await A.signInWithEmailLink(auth, email, location.href); localStorage.removeItem('lisan.emailForSignIn'); await afterLogin(cred.user, 'email'); history.replaceState(null, '', location.pathname); }
      }
      A.onAuthStateChanged(auth, (u) => { Auth.user = u; });
    } catch (e){ Auth.enabled = false; }
  }
  Auth.ready = true;
  setSaveHook(debounce(syncUp, 1500));
  return Auth;
}
function debounce(f, ms){ let t; return (...a) => { clearTimeout(t); t = setTimeout(() => f(...a), ms); }; }
async function syncUp(){ if (!fb || !Auth.user) return; const p = Store.profile(); if (!p || p.uid !== Auth.user.uid) return;
  try { await fb.F.setDoc(fb.F.doc(fb.db, 'users', Auth.user.uid), { profile: p, progress: Store.d, updated: Date.now() }, { merge: true }); } catch (e){} }

async function afterLogin(user, kind){
  let remote = null; try { const s = await fb.F.getDoc(fb.F.doc(fb.db, 'users', user.uid)); if (s.exists()) remote = s.data(); } catch (e){}
  const native = (Store.profile() && Store.profile().native) || Store.meta.pendingNative;
  const base = { id: 'fb_' + user.uid, uid: user.uid, kind, email: user.email || '', phone: user.phoneNumber || '', name: user.displayName || '', googlePhoto: user.photoURL || '' };
  const fresh = { native, username: '', avatar: '', photo: '' };
  Store.createProfile(Object.assign({}, base, remote && remote.profile ? remote.profile : fresh, { id: base.id, uid: user.uid, kind, email: base.email || (remote && remote.profile && remote.profile.email) || '' }));
  if (remote && remote.progress){ Store.d = Object.assign(Store.d, remote.progress); Store.save(); }
  return Store.profile();
}

/* Google: a popup on computers; on phones the whole page goes to Google and comes back. */
const mobile = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
export async function googleSignIn(){
  if (!fb) throw new Error('nofb');
  const p = new fb.A.GoogleAuthProvider(); p.setCustomParameters({ prompt: 'select_account' });
  if (mobile()){ await fb.A.signInWithRedirect(fb.auth, p); return 'redirect'; }
  try { const cred = await fb.A.signInWithPopup(fb.auth, p); return afterLogin(cred.user, 'google'); }
  catch (e){ if (e && /popup-blocked|operation-not-supported/.test(e.code || '')){ await fb.A.signInWithRedirect(fb.auth, p); return 'redirect'; } throw e; }
}
export async function emailSignIn(email){
  if (!fb){ return Store.createProfile({ kind: 'email', email, native: Store.meta.pendingNative }); }
  try { const url = location.origin + location.pathname; await fb.A.sendSignInLinkToEmail(fb.auth, email, { url, handleCodeInApp: true }); localStorage.setItem('lisan.emailForSignIn', email); return 'sent'; }
  catch (e){ if (/operation-not-allowed|admin-restricted|configuration-not-found/.test((e && e.code) || '')) return Store.createProfile({ kind: 'email', email, native: Store.meta.pendingNative }); throw e; }
}
let confirmation = null, verifier = null;
export async function phoneStart(phone, btnId){
  if (!fb){ return Store.createProfile({ kind: 'phone', phone, native: Store.meta.pendingNative }); }
  try { if (!verifier) verifier = new fb.A.RecaptchaVerifier(fb.auth, btnId, { size: 'invisible' });
    confirmation = await fb.A.signInWithPhoneNumber(fb.auth, phone, verifier); return 'code'; }
  catch (e){ if (/operation-not-allowed|admin-restricted|configuration-not-found|billing/.test((e && e.code) || '')) return Store.createProfile({ kind: 'phone', phone, native: Store.meta.pendingNative }); throw e; }
}
export async function phoneVerify(code){ const cred = await confirmation.confirm(code); return afterLogin(cred.user, 'phone'); }
export async function signOutAll(){ try { if (fb) await fb.A.signOut(fb.auth); } catch (e){} Store.signOut(); }

/* Welcome email, sent once per account after the username is chosen. */
const WELCOME = {
  ar: ['أهلاً بك في لِسان', 'تم ربط حسابك بمنصة لِسان بنجاح. يمكنك الآن متابعة التعلّم من أي جهاز.'],
  ru: ['Добро пожаловать в Lisan', 'Ваш аккаунт успешно подключён к платформе Lisan. Теперь можно учиться с любого устройства.'],
  en: ['Welcome to Lisan', 'Your account is now connected to the Lisan platform. You can keep learning from any device.'],
  uz: ['Lisanga xush kelibsiz', 'Hisobingiz Lisan platformasiga muvaffaqiyatli ulandi. Endi istalgan qurilmadan oʻrganishingiz mumkin.'],
  es: ['Bienvenido a Lisan', 'Tu cuenta se ha conectado correctamente a la plataforma Lisan. Ya puedes aprender desde cualquier dispositivo.'],
  zh: ['欢迎来到 Lisan', '你的账号已成功连接到 Lisan 平台，现在可以在任何设备上继续学习。'],
};
export async function sendWelcome(force = false){
  const p = Store.profile();
  if (!Auth.email) return { ok: false, error: 'no-config' };
  if (!p || !p.email) return { ok: false, error: 'no-email' };
  if (p.welcomed && !force) return { ok: false, error: 'already' };
  const [subject, message] = WELCOME[p.native] || WELCOME.en;
  try {
    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_id: Auth.email.serviceId, template_id: Auth.email.templateId, user_id: Auth.email.publicKey,
        template_params: { to_email: p.email, email: p.email, to_name: p.name || p.username, username: p.username, subject, message, site_url: location.origin + location.pathname } }) });
    if (r.ok){ Store.updateProfile({ welcomed: Date.now() }); return { ok: true }; }
    const t = await r.text().catch(() => ''); console.warn('EmailJS', r.status, t); return { ok: false, error: r.status + ' ' + t };
  } catch (e){ console.warn('EmailJS', e); return { ok: false, error: String(e && e.message || e) }; }
}
