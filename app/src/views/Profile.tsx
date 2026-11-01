// @ts-nocheck
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Store, activeLangs, LEVELS, COURSES } from '@/core/engine';
import { SELF, LEARN } from '@/core/strings_app';
import { signOutAll, sendWelcome, Auth } from '@/core/auth';
import { Flag } from '@/core/flags';
import { COVERS, avatarSrc, fileToDataURL } from '@/core/avatars';
import { useApp, useStore, I, Sheet } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { AvatarPicker } from '@/views/AvatarPicker';

export default function Profile(){
  useStore(); const { u, toast } = useApp(); const p = Store.profile();
  const [name, setName] = useState(p.username); const [coverOpen, setCoverOpen] = useState(false); const [avOpen, setAvOpen] = useState(false); const [langOpen, setLangOpen] = useState(false);
  const coverRef = useRef(null);
  const cover = p.coverImg ? `url(${p.coverImg}) center/cover` : (COVERS[p.cover || 0] || COVERS[0]);
  const d = Store.d; const passedN = Object.values(d.passed || {}).reduce((a, o) => a + Object.values(o).filter(Boolean).length, 0);
  const started = new Set(Object.keys(d.best || {}).map((k) => k.split(':')[0])); Object.keys(d.passed || {}).forEach((k) => started.add(k));
  const best = Math.max(0, ...Object.values(d.best || {}));
  const weakN = Object.values(d.weak || {}).reduce((a, o) => a + Object.keys(o).length, 0);
  const saveName = () => { const v = name.trim(); if (!/^[\p{L}\p{N}_]{3,24}$/u.test(v)){ toast(u.usernameShort); return; } Store.updateProfile({ username: v }); toast(u.saved); };
  const upCover = async (e) => { const f = e.target.files && e.target.files[0]; if (!f) return; try { Store.updateProfile({ coverImg: await fileToDataURL(f, 1400, 500, .82) }); setCoverOpen(false); } catch (err){} e.target.value = ''; };
  const myCourses = Object.keys(COURSES).filter((id) => COURSES[id].n === p.native && started.has(id));
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-6 pb-16">
      <div className="card overflow-hidden">
        <div className="relative h-40 sm:h-52" style={{ background: cover }} data-cover>
          <button className="absolute top-3 end-3 btn ghost sm !bg-white/90" onClick={() => setCoverOpen(true)}><I.camera className="w-4 h-4"/>{u.changeCover}</button>
        </div>
        <div className="px-5 sm:px-7 pb-6">
          <div className="-mt-12 sm:-mt-14 flex flex-wrap items-start gap-4">
            <button onClick={() => setAvOpen(true)} className="relative group" aria-label={u.photo}>
              <img src={avatarSrc(p)} alt="" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white bg-brand-50 shadow-card"/>
              <span className="absolute bottom-1 end-1 grid place-items-center w-8 h-8 rounded-full bg-brand-500 text-white ring-2 ring-white"><I.edit className="w-4 h-4"/></span>
            </button>
            <div className="pt-14 sm:pt-16 min-w-0"><div className="text-2xl font-extrabold text-ink truncate"><bdi dir="ltr">@{p.username}</bdi></div>
              <div className="text-sm text-ink-2">{p.kind === 'guest' ? u.guestAcc : (p.email || p.phone || p.kind)}</div></div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[[passedN, u.statLevels], [started.size, u.statCourses], [best, u.statBest, '%'], [weakN, u.statWeak]].map(([v, l, s], k) => <div key={k} className="rounded-2xl bg-paper border-[1.5px] border-line p-4">
              <div className="flex items-baseline text-3xl font-extrabold text-brand-600" dir="ltr"><AnimatedNumber value={v}/>{s && <span className="text-xl">{s}</span>}</div><div className="text-xs text-ink-2 mt-1">{l}</div></div>)}
          </div>

          <section className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-[1.5px] border-line p-4">
              <label className="text-sm font-bold text-ink" htmlFor="uname">{u.username}</label>
              <div className="mt-2 flex gap-2"><div className="relative flex-1" dir="ltr"><span className="absolute inset-y-0 start-3 grid place-items-center text-ink-3">@</span><input id="uname" className="field ps-8" dir="ltr" value={name} onChange={(e) => setName(e.target.value)} maxLength={24}/></div><button className="btn" onClick={saveName}>{u.save}</button></div>
            </div>
            <div className="rounded-2xl border-[1.5px] border-line p-4">
              <div className="text-sm font-bold text-ink">{u.nativeLang}</div>
              <div className="mt-2 flex items-center gap-3"><Flag lang={p.native} size="md"/><span className="flex-1 font-semibold text-ink">{SELF[p.native]}</span><button className="btn ghost sm" onClick={() => setLangOpen(true)} data-change-native><I.globe className="w-4 h-4"/>{u.change}</button></div>
            </div>
          </section>

          {myCourses.length > 0 && <section className="mt-7"><h2 className="font-bold text-ink mb-3">{u.myCourses}</h2>
            <div className="grid gap-2.5 sm:grid-cols-2">{myCourses.map((id) => <a key={id} href={'#/learn/' + id} className="rounded-2xl border-[1.5px] border-line bg-white hover:border-brand-500 p-3.5 flex items-center gap-3 transition">
              <Flag lang={COURSES[id].t} size="md"/><span className="flex-1 font-semibold text-ink">{LEARN[p.native](COURSES[id].t)}</span>
              <span className="flex gap-1">{LEVELS.map((L) => <span key={L} className={`w-2.5 h-2.5 rounded-full ${Store.passed(id, L) ? 'bg-brand-500' : 'bg-brand-100'}`}/>)}</span></a>)}</div></section>}

          <div className="mt-8 flex flex-wrap gap-2">{p.email && Auth.email && <button className="btn ghost" data-resend onClick={async () => { const r = await sendWelcome(true); toast(r.ok ? u.welcomeSent : u.welcomeFail + r.error); }}><I.mail className="w-4 h-4"/>{u.resendWelcome}</button>}<button className="btn ghost" onClick={async () => { await signOutAll(); location.hash = '#/'; }}><I.logout className="w-4 h-4 rtl:rotate-180"/>{u.signOut}</button></div>
        </div>
      </div>
    </main>

    <Sheet open={coverOpen} onClose={() => setCoverOpen(false)} dir={u.dir}>
      <h2 className="text-xl font-extrabold text-ink mb-4">{u.cover}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{COVERS.map((c, k) => <button key={k} onClick={() => { Store.updateProfile({ cover: k, coverImg: '' }); setCoverOpen(false); }} className={`h-20 rounded-2xl border-[2px] ${!p.coverImg && (p.cover || 0) === k ? 'border-brand-500 ring-4 ring-brand-500/15' : 'border-line'}`} style={{ background: c }}/>)}</div>
      <div className="mt-4 flex gap-2"><button className="btn" onClick={() => coverRef.current.click()}><I.camera className="w-4 h-4"/>{u.uploadCover}</button><button className="btn ghost" onClick={() => setCoverOpen(false)}>{u.close}</button></div>
      <input ref={coverRef} type="file" accept="image/*" hidden onChange={upCover}/>
    </Sheet>

    <Sheet open={avOpen} onClose={() => setAvOpen(false)} dir={u.dir}>
      <h2 className="text-xl font-extrabold text-ink">{u.chooseAvatar}</h2>
      <AvatarPicker u={u} avatar={p.avatar} photo={p.photo} onAvatar={(a) => Store.updateProfile({ avatar: a, photo: '' })} onPhoto={(ph) => Store.updateProfile({ photo: ph })}/>
      <div className="mt-4 flex gap-2">{p.photo && <button className="btn ghost" onClick={() => Store.updateProfile({ photo: '' })}>{u.removePhoto}</button>}<button className="btn" onClick={() => setAvOpen(false)}>{u.done}</button></div>
    </Sheet>

    <Sheet open={langOpen} onClose={() => setLangOpen(false)} dir={u.dir}>
      <h2 className="text-xl font-extrabold text-ink">{u.chooseNative}</h2><p className="text-sm text-ink-2 mt-1">{u.chooseNativeD}</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">{activeLangs().map((l) => <button key={l} data-native={l} onClick={() => { Store.updateProfile({ native: l }); setLangOpen(false); }}
        className={`flex items-center gap-3 min-h-[54px] px-3 rounded-xl border-[1.5px] transition text-start ${p.native === l ? 'bg-white border-brand-500 text-brand-600' : 'bg-mist border-[#E2E6EE] hover:border-brand-400 text-ink'}`}>
        <Flag lang={l} size="md"/><span className="font-semibold" lang={l}>{SELF[l]}</span></button>)}</div>
    </Sheet>
  </div>;
}
