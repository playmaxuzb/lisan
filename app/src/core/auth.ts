// @ts-nocheck
// Optional Firebase sign-in + cloud sync. Works only when public/firebase-config.json exists;
// otherwise the app keeps accounts and progress on the device.
import { Store, setSaveHook } from './engine';
let fb = null; // {app, auth, db, mod}
export const Auth = { ready:false, enabled:false, user:null };
export async function initAuth(){
  try { const r = await fetch('firebase-config.json', {cache:'no-store'}); if (!r.ok) throw 0; const cfg = await r.json(); if (!cfg || !cfg.apiKey) throw 0;
    const [{ initializeApp }, A, F] = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')]);
    const app = initializeApp(cfg); const auth = A.getAuth(app); const db = F.getFirestore(app); fb = {app, auth, db, A, F}; Auth.enabled = true;
    // finish an email-link sign-in if we came back from the email
    if (A.isSignInWithEmailLink(auth, location.href)){ const email = localStorage.getItem('lisan.emailForSignIn') || prompt('Email'); if (email){ const cred = await A.signInWithEmailLink(auth, email, location.href); localStorage.removeItem('lisan.emailForSignIn'); await afterLogin(cred.user, 'email'); history.replaceState(null,'',location.pathname); } }
    A.onAuthStateChanged(auth, u => { Auth.user = u; });
  } catch(e) { Auth.enabled = false; }
  Auth.ready = true;
  setSaveHook(debounce(syncUp, 1500));
  return Auth;
}
function debounce(f, ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>f(...a), ms); }; }
async function syncUp(){ if (!fb || !Auth.user) return; const p = Store.profile(); if (!p || p.uid !== Auth.user.uid) return;
  try { await fb.F.setDoc(fb.F.doc(fb.db, 'users', Auth.user.uid), { profile: p, progress: Store.d, updated: Date.now() }, { merge: true }); } catch(e){} }
async function afterLogin(user, kind){
  let remote = null; try { const s = await fb.F.getDoc(fb.F.doc(fb.db, 'users', user.uid)); if (s.exists()) remote = s.data(); } catch(e){}
  const base = { id: 'fb_' + user.uid, uid: user.uid, kind, email: user.email || '', phone: user.phoneNumber || '' };
  const native = (Store.profile() && Store.profile().native) || Store.meta.pendingNative;
  Store.createProfile(Object.assign(base, remote && remote.profile ? remote.profile : { native, username: '', avatar: '' }, { id: base.id, uid: user.uid }));
  if (remote && remote.progress){ Store.d = Object.assign(Store.d, remote.progress); Store.save(); }
  return Store.profile();
}
export async function googleSignIn(){ if (!fb) throw new Error('nofb'); const p = new fb.A.GoogleAuthProvider(); const cred = await fb.A.signInWithPopup(fb.auth, p); return afterLogin(cred.user, 'google'); }
export async function emailSignIn(email){
  if (!fb){ return Store.createProfile({ kind:'email', email, native: Store.meta.pendingNative }); }
  const url = location.origin + location.pathname; await fb.A.sendSignInLinkToEmail(fb.auth, email, { url, handleCodeInApp: true }); localStorage.setItem('lisan.emailForSignIn', email); return 'sent';
}
let confirmation = null;
export async function phoneStart(phone, btnId){
  if (!fb){ return Store.createProfile({ kind:'phone', phone, native: Store.meta.pendingNative }); }
  const v = new fb.A.RecaptchaVerifier(fb.auth, btnId, { size: 'invisible' }); confirmation = await fb.A.signInWithPhoneNumber(fb.auth, phone, v); return 'code';
}
export async function phoneVerify(code){ const cred = await confirmation.confirm(code); return afterLogin(cred.user, 'phone'); }
export async function signOutAll(){ try { if (fb) await fb.A.signOut(fb.auth); } catch(e){} Store.signOut(); }
