// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Store, COURSES, LEVELS, LANGS, activeLangs } from '@/core/engine';
import { LNAME } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { Auth } from '@/core/auth';
import { Pro, findUserByEmail, readEnt, grant, revoke, listAdmins, addAdmin, removeAdmin, addVideo, deleteVideo, listVideos, commerce, prices, money, paywallOn, paymentsReady } from '@/core/pro';
import { useApp, useStore, I } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { Back } from '@/views/Pro';
import { Player } from '@/views/Videos';

const dt = (t) => t >= 3.9e12 ? '∞' : t > Date.now() ? new Date(t).toISOString().slice(0, 10) : '—';

export default function Admin({ tab = 'access' }){
  useStore(); const { u } = useApp(); const p = u.p;
  if (!Pro.admin) return <div><TopBar/><main className="mx-auto max-w-xl px-4 py-10"><div className="card p-7 text-center flex flex-col items-center gap-3">
    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-200"><I.lock className="w-6 h-6"/></span>
    <h1 className="text-xl font-extrabold text-ink">{p.adminT}</h1><p className="text-ink-2">{Auth.user ? p.notAdmin : p.adminSignIn}</p>
    <a className="btn ghost" href="#/profile">{u.home}</a></div></main></div>;
  const tabs = [['access', p.grants], ['videos', p.videos], ['admins', p.admins], ['shop', p.shop]];
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <Back label={u.home}/>
      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-ink">{p.adminT}</h1>
      <nav className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">{tabs.map(([k, l]) => <a key={k} href={'#/admin/' + k} className={`chip ${tab === k ? 'on' : ''}`}>{l}</a>)}</nav>
      <div className="mt-5">{tab === 'videos' ? <VideosAdmin/> : tab === 'admins' ? <Admins/> : tab === 'shop' ? <Shop/> : <Access/>}</div>
    </main>
  </div>;
}

function Access(){
  const { u, toast } = useApp(); const p = u.p; const [email, setEmail] = useState(''); const [users, setUsers] = useState(null); const [sel, setSel] = useState(null); const [ent, setEnt] = useState(null);
  const [what, setWhat] = useState('all'); const [months, setMonths] = useState(12); const [busy, setBusy] = useState(false);
  const search = async (e) => { e.preventDefault(); setBusy(true); try { const r = await findUserByEmail(email); setUsers(r); if (r.length === 1) choose(r[0]); } catch (er){ toast(p.err + ' ' + (er.code || er.message)); } setBusy(false); };
  const choose = async (x) => { setSel(x); setEnt(await readEnt(x.uid)); };
  const doGrant = async () => { setBusy(true); try { setEnt(await grant(sel.uid, what, +months || 0)); toast(p.granted); } catch (er){ toast(p.err + ' ' + (er.code || er.message)); } setBusy(false); };
  const doRevoke = async (w) => { setBusy(true); try { setEnt(await revoke(sel.uid, w)); toast(p.revoked); } catch (er){ toast(p.err); } setBusy(false); };
  return <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr] items-start">
    <form className="card p-5 flex flex-col gap-3" onSubmit={search}>
      <div className="font-bold text-ink">{p.findUser}</div>
      <input className="field" type="email" dir="ltr" placeholder="name@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <button className="btn self-start" disabled={busy}>{p.search}</button>
      {users && !users.length && <div className="text-sm text-[#A3262C]">{p.userNotFound}</div>}
      {users && users.length > 1 && users.map((x) => <button type="button" key={x.uid} onClick={() => choose(x)} className="chip">{x.profile.username || x.uid}</button>)}
    </form>
    {sel && ent && <div className="card p-5 flex flex-col gap-4">
      <div><div className="font-bold text-ink"><bdi dir="ltr">@{sel.profile.username || '—'}</bdi></div><div className="text-sm text-ink-2" dir="ltr">{sel.profile.email} · {sel.uid.slice(0, 10)}…</div></div>
      <div className="rounded-2xl bg-paper border-[1.5px] border-line p-3 text-sm flex flex-col gap-1.5">
        <div className="flex justify-between gap-2"><span>{p.pro}</span><span className="flex items-center gap-2"><b dir="ltr">{dt(ent.all)}</b>{ent.all > Date.now() && <button className="text-[#A3262C] text-xs font-semibold" onClick={() => doRevoke('all')}>{p.revoke}</button>}</span></div>
        {Object.entries(ent.courses).filter(([, v]) => v > Date.now()).map(([k, v]) => <div key={k} className="flex justify-between gap-2"><span className="inline-flex items-center gap-1.5"><Flag lang={k} size="sm"/>{LNAME[u.lang || 'en'] ? LNAME[Store.profile().native][k] : k}</span><span className="flex items-center gap-2"><b dir="ltr">{dt(v)}</b><button className="text-[#A3262C] text-xs font-semibold" onClick={() => doRevoke(k)}>{p.revoke}</button></span></div>)}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm font-semibold text-ink-2 flex flex-col gap-1.5">{p.grantWhat}<select className="field" value={what} onChange={(e) => setWhat(e.target.value)}><option value="all">{p.pro}</option>{LANGS.map((l) => <option key={l} value={l}>{LNAME[Store.profile().native][l]}</option>)}</select></label>
        <label className="text-sm font-semibold text-ink-2 flex flex-col gap-1.5">{p.months}<select className="field" value={months} onChange={(e) => setMonths(e.target.value)}>{[1, 3, 6, 12, 24, 0].map((m) => <option key={m} value={m}>{m || '∞'}</option>)}</select></label>
      </div>
      <button className="btn self-start" disabled={busy} onClick={doGrant}>{p.grantBtn}</button>
    </div>}
  </div>;
}

function VideosAdmin(){
  const { u, toast } = useApp(); const p = u.p; const n = Store.profile().native;
  const [list, setList] = useState(null); const [f, setF] = useState({ title: '', desc: '', url: '', t: '', L: '', n: '', free: false }); const [file, setFile] = useState(null); const [prog, setProg] = useState(-1); const [prevUrl, setPrev] = useState('');
  const load = () => listVideos().then(setList); useEffect(() => { load(); }, []);
  const set = (k) => (e) => setF(Object.assign({}, f, { [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const save = async (e) => { e.preventDefault(); if (!f.title || (!f.url && !file)){ toast(p.needTitle); return; } setProg(0);
    try { await addVideo(f, file, setProg); toast(p.saved); setF({ title: '', desc: '', url: '', t: f.t, L: f.L, n: f.n, free: false }); setFile(null); load(); } catch (er){ toast(p.err + ' ' + (er.code || er.message)); } setProg(-1); };
  const del = async (v) => { if (!confirm(p.confirmDel)) return; try { await deleteVideo(v); load(); } catch (er){ toast(p.err); } };
  return <div className="grid gap-5 lg:grid-cols-[1fr_1fr] items-start">
    <form className="card p-5 flex flex-col gap-3" onSubmit={save}>
      <div className="font-bold text-ink">{p.addVideo}</div>
      <input className="field" placeholder={p.vTitle} value={f.title} onChange={set('title')} dir="auto"/>
      <textarea className="field !py-3 min-h-[80px]" placeholder={p.vDesc} value={f.desc} onChange={set('desc')} dir="auto"/>
      <input className="field" dir="ltr" placeholder={p.vUrl} value={f.url} onChange={(e) => { set('url')(e); setPrev(e.target.value); }} disabled={!!file}/>
      <label className="text-sm text-ink-2 flex flex-col gap-1.5">{p.vFile}<input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0] || null)} className="text-sm"/></label>
      <div className="grid grid-cols-3 gap-2">
        <select className="field" value={f.t} onChange={set('t')} aria-label={p.vLang}><option value="">{p.vLang}: {p.all}</option>{activeLangs().map((l) => <option key={l} value={l}>{LNAME[n][l]}</option>)}</select>
        <select className="field" value={f.L} onChange={set('L')} aria-label={p.vLevel}><option value="">{p.allLevels}</option>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select>
        <select className="field" value={f.n} onChange={set('n')} aria-label={p.vNative}><option value="">{p.vNative}: {p.all}</option>{activeLangs().map((l) => <option key={l} value={l}>{LNAME[n][l]}</option>)}</select>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" checked={f.free} onChange={set('free')} className="w-4 h-4 accent-[#2A5EEB]"/>{p.vFree}</label>
      {prog >= 0 && <div className="h-2 rounded-full bg-mist overflow-hidden"><div className="h-full bg-brand-500" style={{ width: Math.round(prog * 100) + '%' }}/></div>}
      <button className="btn self-start" disabled={prog >= 0}>{p.save}</button>
      {prevUrl && !file && <Player v={{ url: prevUrl, title: f.title }}/>}
    </form>
    <div className="flex flex-col gap-2.5">{(list || []).map((v) => <div key={v.id} className="card p-3 flex items-center gap-3">
      <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600"><I.play className="w-4 h-4"/></span>
      <div className="flex-1 min-w-0"><div className="font-semibold text-ink truncate" dir="auto">{v.title}</div><div className="text-xs text-ink-3">{[v.t && LNAME[n][v.t], v.L, v.n && '→ ' + LNAME[n][v.n], v.free && p.vFree].filter(Boolean).join(' · ') || p.all}</div></div>
      {!String(v.id).startsWith('static') && <button className="btn sm ghost !text-[#A3262C]" onClick={() => del(v)}>{p.del}</button>}</div>)}
      {list && !list.length && <div className="text-ink-3 text-sm">{p.videosNone}</div>}</div>
  </div>;
}

function Admins(){
  const { u, toast } = useApp(); const p = u.p; const [list, setList] = useState([]); const [email, setEmail] = useState('');
  const load = () => listAdmins().then(setList).catch(() => {}); useEffect(() => { load(); }, []);
  return <div className="card p-5 max-w-xl flex flex-col gap-3">
    <div className="text-sm text-ink-2">{p.adminsD}</div>
    <form className="flex gap-2" onSubmit={async (e) => { e.preventDefault(); try { await addAdmin(email); setEmail(''); load(); toast(p.saved); } catch (er){ toast(p.ownerOnly); } }}>
      <input className="field" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" required/><button className="btn">{p.add}</button></form>
    {list.map((x) => <div key={x} className="flex items-center justify-between rounded-xl bg-paper border-[1.5px] border-line px-3 py-2"><span dir="ltr">{x}</span><button className="text-[#A3262C] text-sm font-semibold" onClick={async () => { try { await removeAdmin(x); load(); } catch (er){ toast(p.ownerOnly); } }}>{p.del}</button></div>)}
  </div>;
}

function Shop(){
  const { u } = useApp(); const p = u.p; const P = prices(); const c = commerce(); const l = c.links || {};
  const row = (k, v, ok) => <div className="flex justify-between gap-3 py-2 border-b border-line/60 last:border-0"><span className="text-ink-2">{k}</span><span className={`font-semibold ${ok === false ? 'text-[#A3262C]' : 'text-ink'}`} dir="ltr">{v}</span></div>;
  return <div className="card p-5 max-w-2xl text-sm">
    {row(p.paywall, paywallOn() ? 'ON' : 'OFF')}
    {row(p.course, money(P.course))}{row(p.pro + ' / ' + p.monthlyT, money(P.monthly))}{row(p.pro + ' / ' + p.yearlyT, money(P.yearly))}
    {row('Stripe · ' + p.course, l.course ? '✓' : '✗', !!l.course)}{row('Stripe · ' + p.monthlyT, l.monthly ? '✓' : '✗', !!l.monthly)}{row('Stripe · ' + p.yearlyT, l.yearly ? '✓' : '✗', !!l.yearly)}
    <p className="mt-4 text-ink-2 leading-relaxed">{p.shopHelp}</p>
  </div>;
}
