// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, LEVELS, ensureTrack, level, COURSES, STRESS, setStress, track } from '@/core/engine';
import { mine } from '@/core/mydict';
import { LEARN, SELF } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { useApp, useStore, I } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { hasAccess, paywallOn, money, prices, ownsLang } from '@/core/pro';
import { dueCount, size } from '@/core/srs';
import { offlineSupported, isOffline, download, remove, sizeOf } from '@/core/offline';
import { useVideos, videoFits, VideoGrid } from '@/views/Videos';

function Tools({ tr }){ const { u, toast } = useApp(); const p = u.p; const c = COURSES[tr]; const [dl, setDl] = useState(-1);
  const due = dueCount(tr); const pl = Store.d.placement && Store.d.placement[tr];
  const off = isOffline(tr); const mb = (b) => (b / 1048576).toFixed(0) + ' MB';
  const doDl = async () => { if (off){ await remove(tr); toast(p.dlRemoved); return; } setDl(0); try { const b = await download(tr, (x) => setDl(x)); toast(p.dlDone + ' · ' + mb(b)); } catch (e){ toast(p.err); } setDl(-1); };
  const T = ({ href = null, onClick = null, icon, title, sub, hot = false, data }) => { const cls = `card card-hover p-4 flex items-center gap-3 text-start ${hot ? '!border-brand-500' : ''}`;
    const inner = <><span className={`grid place-items-center w-11 h-11 rounded-xl text-lg font-bold flex-none ${hot ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 ring-1 ring-brand-200'}`}>{icon}</span><div className="min-w-0"><div className="font-bold text-ink">{title}</div><div className="text-xs text-ink-2">{sub}</div></div></>;
    return href ? <a href={href} className={cls} data-tool={data}>{inner}</a> : <button onClick={onClick} className={cls} data-tool={data}>{inner}</button>; };
  return <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    <T href={'#/placement/' + tr} icon="◎" title={p.placement} sub={pl ? p.lastResult + ': ' + pl.L : p.placementSub} data="placement"/>
    <T href={'#/review/' + tr} icon="↻" hot={due > 0} title={p.review} sub={due ? due + ' ' + p.dueN : size(tr) ? size(tr) + ' ' + p.inReview : p.reviewSub} data="review"/>
    <T href={'#/games/' + tr} icon="🎮" title={u.x.games} sub={u.x.gamesD} data="games"/>
    {offlineSupported() && <T onClick={dl >= 0 ? null : doDl} icon={off ? '✓' : '⤓'} title={off ? p.dlDone : p.offlineT} sub={dl >= 0 ? Math.round(dl * 100) + '%' : off ? mb(sizeOf(tr)) + ' · ' + p.dlRemove : p.offlineD} data="offline"/>}
  </div>; }

export function useTrack(tr){ const [T, setT] = useState(null); useEffect(() => { let on = true; ensureTrack(tr).then((x) => on && setT(x)); return () => { on = false; }; }, [tr]); return T; }
export function Spinner(){ return <div className="py-24 grid place-items-center"><div className="w-9 h-9 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin"/></div>; }
export function AudioBtn(){ const { u, openAudio } = useApp(); return <button className="iconbtn" onClick={openAudio} aria-label={u.audio} title={u.audio}><I.vol/></button>; }

function TrackVideos({ tr }){ const { u } = useApp(); const c = COURSES[tr]; const all = useVideos(); const list = (all || []).filter((v) => v.t === c.t && videoFits(v, c.n, c.t, ''));
  if (!list.length) return null; return <section className="mt-10"><h2 className="text-xl font-extrabold text-ink mb-4">{u.p.videos}</h2><VideoGrid list={list} n={c.n} tr={tr}/></section>; }

function DictCard({ tr }){ const { u } = useApp(); const x = u.x; const T = track(tr); const n = LEVELS.reduce((a, L) => a + level(tr, L).vocab.length, 0); const my = mine(tr).length;
  return <a href={'#/dict/' + tr} className="mt-8 card card-hover p-5 sm:p-6 flex items-center gap-4 bg-gradient-to-br from-white to-brand-50" data-dict-card>
    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-500 text-white flex-none"><I.book className="w-7 h-7"/></span>
    <div className="flex-1 min-w-0"><div className="font-extrabold text-ink text-lg">{x.dict}</div><div className="text-sm text-ink-2">{x.dictD}</div>
      <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs"><span className="chip !min-h-[26px] !px-2.5">A1–C2 · {n}+ {x.entries}</span><span className="chip !min-h-[26px] !px-2.5">★ {x.myWords} · {my}</span></div></div>
    <I.next className="w-5 h-5 text-brand-600 rtl:rotate-180 flex-none"/></a>; }

export default function Track({ tr }){
  useStore(); const { u } = useApp(); const T = useTrack(tr); const c = COURSES[tr];
  const [confirm, setConfirm] = useState(false);
  const reset = () => { if (!confirm){ setConfirm(true); return; } delete Store.d.passed[tr]; if (Store.d.placed) delete Store.d.placed[tr]; if (Store.d.placement) delete Store.d.placement[tr]; LEVELS.forEach((L) => { const k = tr + ':' + L; delete Store.d.best[k]; delete Store.d.weak[k]; delete Store.d.last[k]; }); Store.save(); setConfirm(false); };
  return <div>
    <TopBar><AudioBtn/></TopBar>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
      <a href="#/" className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{u.home}</a>
      <div className="mt-4 flex items-center gap-4">
        <Flag lang={c.t} size="xl"/>
        <div><h1 className="text-2xl sm:text-3xl font-extrabold text-ink">{LEARN[c.n](c.t)}</h1><div className="text-ink-2">{u.levelsTitle}</div></div>
      </div>
      <Tools tr={tr}/>
      {!T ? <Spinner/> : <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((L, i) => { const lv = level(tr, L); const open = Store.unlocked(tr, i), passed = Store.passed(tr, L); const best = Store.d.best[tr + ':' + L];
          return <motion.a key={L} href={`#/learn/${tr}/${L.toLowerCase()}`} data-level={L} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .04 * i }}
            className={`card card-hover p-5 flex flex-col gap-3 ${open ? '' : 'opacity-80'}`}>
            <div className="flex items-center gap-3">
              <span className={`grid place-items-center w-14 h-14 rounded-2xl text-lg font-extrabold ${passed ? 'bg-brand-500 text-white' : open ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-200' : 'bg-mist text-ink-3'}`}>{L}</span>
              <div className="flex-1 min-w-0"><div className="font-bold text-ink text-lg">{u.lv[L]}</div>
                <div className={`text-xs font-semibold inline-flex items-center gap-1 ${passed ? 'text-[#14935B]' : open ? 'text-brand-600' : 'text-ink-3'}`}>{passed ? <><I.check className="w-3.5 h-3.5"/>{u.passed}</> : !hasAccess(tr, L) ? <span className="text-[#B07A10] inline-flex items-center gap-1"><I.star className="w-3.5 h-3.5"/>{u.p.proBadge}</span> : open ? u.open : <><I.lock className="w-3.5 h-3.5"/>{u.locked}</>}{best != null && <span className="text-ink-3 font-medium ms-1">· {u.best}: {best}%</span>}</div></div>
            </div>
            <p className="text-sm text-ink-2 leading-relaxed">{u.lvd[L]}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 text-xs">
              {lv.alphabet && <span className="chip !min-h-[28px] !px-2.5">{lv.alphabet.length} {u.lettersN}</span>}
              <span className="chip !min-h-[28px] !px-2.5">{lv.vocab.length} {u.words}</span>
              <span className="chip !min-h-[28px] !px-2.5">{lv.sentences.length} {u.phrases}</span>
              <span className="chip !min-h-[28px] !px-2.5">{lv.grammar.length} {u.topics}</span>
            </div>
          </motion.a>; })}
      </div>}
      {T && <DictCard tr={tr}/>}
      {c.t === 'ru' && <div className="mt-4 card p-4 flex items-center gap-3" data-stress>
        <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-200 text-lg font-bold flex-none tgt" lang="ru">а́</span>
        <div className="flex-1 min-w-0"><div className="font-bold text-ink">{u.x.stressT}</div><div className="text-xs text-ink-2">{u.x.stressD}</div></div>
        <button onClick={() => setStress(!STRESS.on)} role="switch" aria-checked={STRESS.on} className={`relative w-12 h-7 rounded-full transition flex-none ${STRESS.on ? 'bg-brand-500' : 'bg-[#D5DCE8]'}`}><span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${STRESS.on ? 'start-6' : 'start-1'}`}/></button></div>}
      <TrackVideos tr={tr}/>
      <div className="mt-8"><button onClick={reset} className={`btn sm ${confirm ? '' : 'ghost'}`}>{u.reset}{confirm ? ' ?' : ''}</button></div>
    </main>
  </div>;
}
