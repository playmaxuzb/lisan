// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Store, COURSES, LEVELS, courseIds } from '@/core/engine';
import { LNAME } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { listVideos, videoEmbed, hasAccess, Pro } from '@/core/pro';
import { useApp, useStore, I, Sheet } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { Spinner } from '@/views/Track';
import { Back } from '@/views/Pro';

let CACHE = null;
export function useVideos(){ const [v, setV] = useState(CACHE); useEffect(() => { let on = true; listVideos().then((x) => { CACHE = x; on && setV(x); }); return () => { on = false; }; }, [Pro.ready]); return v; }
export const videoFits = (v, n, t, L) => (!v.n || v.n === n) && (!t || !v.t || v.t === t) && (!L || !v.L || v.L === L);

export function Player({ v }){ const e = videoEmbed(v.url || '');
  return <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#0F1B3D]">{e.kind === 'iframe'
    ? <iframe src={e.src} className="w-full h-full" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen title={v.title}/>
    : <video src={e.src} controls playsInline preload="metadata" className="w-full h-full bg-black"/>}</div>; }

function Tile({ v, n, onOpen, locked }){ const { u } = useApp();
  return <button onClick={() => onOpen(v)} className="card card-hover p-3 text-start flex flex-col gap-3" data-video>
    <div className="relative aspect-video rounded-xl bg-gradient-to-br from-brand-600 to-[#162F73] grid place-items-center text-white overflow-hidden">
      <span className="grid place-items-center w-14 h-14 rounded-full bg-white/95 text-brand-600 shadow-soft">{locked ? <I.lock className="w-6 h-6"/> : <I.play className="w-6 h-6 ms-0.5"/>}</span>
      <div className="absolute top-2 start-2 flex gap-1.5">{v.t && <span className="px-2 py-0.5 rounded-md bg-white/90 text-ink text-xs font-bold inline-flex items-center gap-1"><Flag lang={v.t} size="sm"/>{LNAME[n][v.t]}</span>}{v.L && <span className="px-2 py-0.5 rounded-md bg-white/90 text-brand-700 text-xs font-bold">{v.L}</span>}</div>
    </div>
    <div className="px-1 pb-1"><div className="font-bold text-ink leading-snug" dir="auto">{v.title}</div>{v.desc && <div className="text-sm text-ink-2 mt-1 line-clamp-2" dir="auto">{v.desc}</div>}</div>
  </button>; }

export function VideoGrid({ list, n, tr = null }){
  const { u } = useApp(); const [open, setOpen] = useState(null);
  const locked = (v) => tr && v.L && !v.free && !hasAccess(tr, v.L);
  return <>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((v) => <Tile key={v.id} v={v} n={n} locked={locked(v)} onOpen={(x) => locked(x) ? (location.hash = '#/pricing/' + (x.t || '')) : setOpen(x)}/>)}</div>
    <Sheet open={!!open} onClose={() => setOpen(null)} dir={u.dir} wide>{open && <div className="flex flex-col gap-3"><Player v={open}/><div className="font-extrabold text-lg text-ink" dir="auto">{open.title}</div>{open.desc && <p className="text-ink-2 leading-relaxed" dir="auto">{open.desc}</p>}</div>}</Sheet>
  </>;
}

export default function Videos(){
  useStore(); const { u } = useApp(); const p = u.p; const n = Store.profile().native; const all = useVideos();
  const langs = Array.from(new Set(courseIds(n).map((id) => COURSES[id].t))); const [t, setT] = useState(''); const [L, setL] = useState('');
  const list = (all || []).filter((v) => videoFits(v, n, t, L));
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-16">
      <Back label={u.home}/>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl sm:text-3xl font-extrabold text-ink">{p.videos}</h1><p className="text-ink-2 mt-1">{p.videosSub}</p></div>
        {Pro.admin && <a className="btn sm" href="#/admin/videos">+ {p.addVideo}</a>}
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button className={`chip ${!t ? 'on' : ''}`} onClick={() => setT('')}>{p.all}</button>
        {langs.map((x) => <button key={x} className={`chip ${t === x ? 'on' : ''}`} onClick={() => setT(x)}><Flag lang={x} size="sm"/>{LNAME[n][x]}</button>)}
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button className={`chip ${!L ? 'on' : ''}`} onClick={() => setL('')}>{p.allLevels}</button>
        {LEVELS.map((x) => <button key={x} className={`chip ${L === x ? 'on' : ''}`} onClick={() => setL(x)}>{x}</button>)}
      </div>
      <div className="mt-5">{!all ? <Spinner/> : list.length ? <VideoGrid list={list} n={n} tr={t ? courseIds(n).find((id) => COURSES[id].t === t) : null}/> :
        <div className="card p-10 text-center flex flex-col items-center gap-3"><span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-200"><I.play className="w-6 h-6"/></span><div className="font-bold text-ink">{p.videosNone}</div><div className="text-sm text-ink-2 max-w-md">{p.videosSoon}</div></div>}</div>
    </main>
  </div>;
}
