// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WaveGridBackground from '@/ui/Wave';
import { Store, LANGS } from '@/core/engine';
import { SELF } from '@/core/strings_app';
import { Auth, emailSignIn, googleSignIn, phoneStart, phoneVerify, sendWelcome } from '@/core/auth';
import { COUNTRIES, defaultCountry } from '@/core/countries';
import { CountryPicker } from '@/views/CountryPicker';
import { Flag } from '@/core/flags';
import { useApp, I, Logo } from '@/ui/kit';
import { AvatarPicker } from '@/views/AvatarPicker';
import { avatarSrc } from '@/core/avatars';

export default function Onboarding(){
  const { u, toast } = useApp();
  const p = Store.profile();
  const initial = p && p.native && !p.username ? 'username' : (Store.meta.pendingNative && !p ? 'signin' : 'native');
  const [step, setStep] = useState(initial);
  useEffect(() => { const q = Store.profile(); if (q && q.native && !q.username) setStep('username'); });

  const pickNative = (l) => { Store.meta.pendingNative = l; const q = Store.profile(); if (q){ Store.updateProfile({ native: l }); setStep(q.username ? 'native' : 'username'); } else { Store.saveMeta(); setStep('signin'); } };

  return <div className="relative min-h-screen overflow-hidden bg-[#EEF4FF]">
    <div className="fixed inset-0">
      <WaveGridBackground colorBase="#F5F8FF" colorHigh="#3F76FF" gridSize={36} waveAmplitude={0.35} vignette={false}/>
    </div>
    <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
      <header className="px-5 sm:px-8 pt-5 flex items-center justify-between"><span className="pointer-events-auto"><Logo/></span></header>
      <main className="flex-1 grid place-items-center px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .28 }}
            className="pointer-events-auto w-full max-w-[560px] rounded-[28px] bg-white/95 backdrop-blur border-[1.5px] border-line shadow-card p-6 sm:p-8">
            {step === 'native' && <NativeStep u={u} onPick={pickNative}/>}
            {step === 'signin' && <SignInStep u={u} toast={toast} onBack={() => setStep('native')} onDone={() => setStep('username')}/>}
            {step === 'username' && <UsernameStep u={u} onBack={() => { const q = Store.profile(); if (q && q.kind === 'guest' && !q.username){ delete Store.meta.profiles[q.id]; Store.meta.current = null; Store.saveMeta(); } setStep('signin'); }}/>}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="pb-5 text-center text-xs text-ink-3">A1 · A2 · B1 · B2 · C1 · C2</footer>
    </div>
  </div>;
}

function NativeStep({ u, onPick }){
  return <div>
    <div className="text-xs font-semibold uppercase tracking-[.14em] text-brand-600">{u.kicker}</div>
    <h1 className="mt-2 text-[1.65rem] sm:text-3xl font-extrabold leading-tight text-ink">{u.heroTitle}</h1>
    <p className="mt-3 text-ink-2 leading-relaxed text-[.97rem]">{u.heroLead}</p>
    <div className="mt-6 rounded-2xl border-[1.5px] border-line bg-paper p-4">
      <div className="font-bold text-ink">{u.chooseNative}</div>
      <div className="text-sm text-ink-2 mt-0.5">{u.chooseNativeD}</div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {LANGS.map((l) => <button key={l} onClick={() => onPick(l)} data-native={l}
          className="group flex items-center gap-3 min-h-[56px] px-3 rounded-xl bg-mist border-[1.5px] border-[#E2E6EE] hover:border-brand-500 hover:bg-white transition text-start">
          <Flag lang={l} size="md"/><span className="font-semibold text-ink group-hover:text-brand-600" lang={l}>{SELF[l]}</span>
        </button>)}
      </div>
    </div>
  </div>;
}

function SignInStep({ u, toast, onBack, onDone }){
  const { lang } = useApp();
  const [mode, setMode] = useState('email');
  const [cc, setCc] = useState(() => defaultCountry(lang));
  const [going, setGoing] = useState(false);
  const [val, setVal] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState('input'); // input | sent | code
  const [busy, setBusy] = useState(false);
  const guest = () => { Store.createProfile({ kind: 'guest', native: Store.meta.pendingNative }); onDone(); };
  const submit = async (e) => { e.preventDefault(); const v = val.trim();
    const dial = (COUNTRIES.find((c) => c.code === cc) || COUNTRIES[0]).dial;
    const digits = v.replace(/[^0-9]/g, '').replace(/^0+/, '');
    const full = dial + digits;
    const ok = mode === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) : digits.length >= 5 && full.length <= 16;
    if (!ok){ toast(u.invalid); return; } setBusy(true);
    try { if (mode === 'email'){ const r = await emailSignIn(v); if (r === 'sent') setStage('sent'); else onDone(); }
      else { const r = await phoneStart(full, 'phone-submit'); if (r === 'code') setStage('code'); else onDone(); } }
    catch (err){ toast(u.invalid); } setBusy(false); };
  const verify = async (e) => { e.preventDefault(); setBusy(true); try { await phoneVerify(code.trim()); onDone(); } catch (err){ toast(u.invalid); } setBusy(false); };
  const google = async () => { if (!Auth.enabled){ toast(u.needFirebase); return; } setGoing(true); try { const r = await googleSignIn(); if (r !== 'redirect'){ setGoing(false); onDone(); } } catch (e){ setGoing(false); if (!/popup-closed|cancelled-popup/.test((e && e.code) || '')) toast(u.invalid); } };
  const nat = Store.meta.pendingNative;
  return <div>
    <div className="flex items-center justify-between gap-3">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{u.back}</button>
      <span className="inline-flex items-center gap-2 text-sm text-ink-2"><Flag lang={nat} size="sm"/>{SELF[nat]}</span>
    </div>
    <h1 className="mt-4 text-2xl sm:text-[1.7rem] font-extrabold text-ink">{u.signInTitle}</h1>
    <p className="mt-1.5 text-ink-2">{u.signInD}</p>

    {stage === 'sent' ? <div className="mt-6 rounded-2xl border-[1.5px] border-line bg-paper p-5 text-ink"><I.mail className="w-7 h-7 text-brand-500 mb-2"/>{u.linkSent}</div>
    : stage === 'code' ? <form onSubmit={verify} className="mt-6 space-y-3"><div className="text-sm text-ink-2">{u.codeSent}</div>
        <input className="field tracking-[.4em] text-center text-lg" inputMode="numeric" autoComplete="one-time-code" placeholder="••••••" value={code} onChange={(e) => setCode(e.target.value)} aria-label={u.enterCode}/>
        <button className="btn w-full" disabled={busy}>{u.verify}</button></form>
    : <>
      {Object.values(Store.meta.profiles || {}).filter((x) => x.username).length > 0 && <div className="mt-5 flex flex-col gap-2">
        {Object.values(Store.meta.profiles).filter((x) => x.username).slice(0, 4).map((x) => <button key={x.id} onClick={() => { Store.meta.current = x.id; Store.saveMeta(); Store.loadProgress(); Store.emit(); location.hash = '#/'; }}
          className="flex items-center gap-3 rounded-xl bg-white border-[1.5px] border-line hover:border-brand-500 px-3 py-2.5 text-start transition">
          <img src={avatarSrc(x)} alt="" className="w-9 h-9 rounded-full object-cover bg-brand-50"/><span className="flex-1 font-semibold text-ink"><bdi dir="ltr">@{x.username}</bdi></span><Flag lang={x.native} size="sm"/><I.next className="w-4 h-4 text-brand-600 rtl:rotate-180"/></button>)}
      </div>}
      <div className="mt-6 grid grid-cols-2 p-1 rounded-xl bg-mist border-[1.5px] border-[#E2E6EE]">
        {[['email', u.email, I.mail], ['phone', u.phone, I.phone]].map(([k, l, Ic]) => <button key={k} onClick={() => { setMode(k); setVal(''); }}
          className={`min-h-[40px] rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition ${mode === k ? 'bg-white text-brand-600 shadow-sm ring-1 ring-line' : 'text-ink-2'}`}><Ic className="w-4 h-4"/>{l}</button>)}
      </div>
      <form onSubmit={submit} className="mt-3 space-y-3">
        {mode === 'email' ? <input className="field" dir="ltr" type="email" autoComplete="email" placeholder={u.emailPh} value={val} onChange={(e) => setVal(e.target.value)} aria-label={u.email}/>
        : <div className="flex gap-2" dir="ltr"><CountryPicker value={cc} onChange={setCc} lang={lang} u={u}/>
            <input className="field flex-1 min-w-0" dir="ltr" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 123 45 67" value={val} onChange={(e) => setVal(e.target.value)} aria-label={u.phone} data-phone/></div>}
        <button className="btn w-full" disabled={busy} id="phone-submit">{u.cont}</button>
      </form>
      <button onClick={google} disabled={going} data-google className="mt-3 w-full min-h-[48px] rounded-xl bg-white border-[1.5px] border-line hover:border-brand-500 inline-flex items-center justify-center gap-3 font-semibold text-ink transition disabled:opacity-70">{going ? <span className="w-5 h-5 rounded-full border-2 border-brand-100 border-t-brand-500 animate-spin"/> : <I.google className="w-5 h-5"/>}{going ? u.toGoogle : u.google}</button>
      <div className="my-5 flex items-center gap-3 text-xs text-ink-3"><span className="h-px flex-1 bg-line"/>{u.orWith}<span className="h-px flex-1 bg-line"/></div>
      <button onClick={guest} data-guest className="w-full rounded-xl bg-mist border-[1.5px] border-[#E2E6EE] hover:border-brand-400 px-4 py-3 text-start flex items-center gap-3 transition">
        <span className="grid place-items-center w-10 h-10 rounded-full bg-white ring-1 ring-line text-brand-600"><I.user className="w-5 h-5"/></span>
        <span><span className="block font-semibold text-ink">{u.guest}</span><span className="block text-sm text-ink-2">{u.guestD}</span></span>
      </button>
      {!Auth.enabled && <p className="mt-4 text-xs text-ink-3 leading-relaxed">{u.localNote}</p>}
    </>}
  </div>;
}

function UsernameStep({ u, onBack }){
  const { toast } = useApp();
  const p = Store.profile() || {};
  const [name, setName] = useState(p.username || (p.email ? p.email.split('@')[0].replace(/[^\w]/g, '_').slice(0, 20) : '') || (p.name ? p.name.replace(/\s+/g, '_').replace(/[^\p{L}\p{N}_]/gu, '').slice(0, 20) : ''));
  const [avatar, setAvatar] = useState(p.avatar || 'p0');
  const [photo, setPhoto] = useState(p.photo || p.googlePhoto || '');
  const [err, setErr] = useState(false);
  const save = (e) => { e.preventDefault(); const v = name.trim(); if (!/^[\p{L}\p{N}_]{3,24}$/u.test(v)){ setErr(true); return; } Store.updateProfile({ username: v, avatar, photo }); location.hash = '#/'; sendWelcome().then((r) => { if (r.ok) toast(u.welcomeSent); else if (r.error !== 'no-email' && r.error !== 'already' && r.error !== 'no-config') toast(u.welcomeFail + r.error); }); };
  return <form onSubmit={save}>
    <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{u.back}</button>
    <h1 className="mt-4 text-2xl sm:text-[1.7rem] font-extrabold text-ink">{u.usernameTitle}</h1>
    <p className="mt-1.5 text-ink-2">{u.usernameD}</p>
    <div className="mt-5 relative" dir="ltr">
      <span className="absolute inset-y-0 start-4 grid place-items-center text-ink-3 font-semibold">@</span>
      <input className="field ps-9" dir="ltr" value={name} onChange={(e) => { setName(e.target.value); setErr(false); }} placeholder={u.usernamePh} aria-label={u.username} autoFocus maxLength={24} id="username"/>
    </div>
    {err && <div className="mt-2 text-sm text-[#D9363E]">{u.usernameShort}</div>}
    <div className="mt-6 font-bold text-ink">{u.chooseAvatar}</div>
    <AvatarPicker u={u} avatar={avatar} photo={photo} onAvatar={(a) => { setAvatar(a); setPhoto(''); }} onPhoto={setPhoto}/>
    <button className="btn w-full mt-6" id="start">{u.startLearning}</button>
  </form>;
}
