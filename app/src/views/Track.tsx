// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, LEVELS, ensureTrack, level, COURSES } from '@/core/engine';
import { LEARN, SELF } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { useApp, useStore, I } from '@/ui/kit';
import { TopBar } from '@/views/Home';

export function useTrack(tr){ const [T, setT] = useState(null); useEffect(() => { let on = true; ensureTrack(tr).then((x) => on && setT(x)); return () => { on = false; }; }, [tr]); return T; }
export function Spinner(){ return <div className="py-24 grid place-items-center"><div className="w-9 h-9 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin"/></div>; }
export function AudioBtn(){ const { u, openAudio } = useApp(); return <button className="iconbtn" onClick={openAudio} aria-label={u.audio} title={u.audio}><I.vol/></button>; }

export default function Track({ tr }){
  useStore(); const { u } = useApp(); const T = useTrack(tr); const c = COURSES[tr];
  const [confirm, setConfirm] = useState(false);
  const reset = () => { if (!confirm){ setConfirm(true); return; } delete Store.d.passed[tr]; LEVELS.forEach((L) => { const k = tr + ':' + L; delete Store.d.best[k]; delete Store.d.weak[k]; delete Store.d.last[k]; }); Store.save(); setConfirm(false); };
  return <div>
    <TopBar><AudioBtn/></TopBar>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
      <a href="#/" className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{u.home}</a>
      <div className="mt-4 flex items-center gap-4">
        <Flag lang={c.t} size="xl"/>
        <div><h1 className="text-2xl sm:text-3xl font-extrabold text-ink">{LEARN[c.n](c.t)}</h1><div className="text-ink-2">{u.levelsTitle}</div></div>
      </div>
      {!T ? <Spinner/> : <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((L, i) => { const lv = level(tr, L); const open = Store.unlocked(tr, i), passed = Store.passed(tr, L); const best = Store.d.best[tr + ':' + L];
          return <motion.a key={L} href={`#/learn/${tr}/${L.toLowerCase()}`} data-level={L} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .04 * i }}
            className={`card card-hover p-5 flex flex-col gap-3 ${open ? '' : 'opacity-80'}`}>
            <div className="flex items-center gap-3">
              <span className={`grid place-items-center w-14 h-14 rounded-2xl text-lg font-extrabold ${passed ? 'bg-brand-500 text-white' : open ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-200' : 'bg-mist text-ink-3'}`}>{L}</span>
              <div className="flex-1 min-w-0"><div className="font-bold text-ink text-lg">{u.lv[L]}</div>
                <div className={`text-xs font-semibold inline-flex items-center gap-1 ${passed ? 'text-[#14935B]' : open ? 'text-brand-600' : 'text-ink-3'}`}>{passed ? <><I.check className="w-3.5 h-3.5"/>{u.passed}</> : open ? u.open : <><I.lock className="w-3.5 h-3.5"/>{u.locked}</>}{best != null && <span className="text-ink-3 font-medium ms-1">· {u.best}: {best}%</span>}</div></div>
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
      <div className="mt-8"><button onClick={reset} className={`btn sm ${confirm ? '' : 'ghost'}`}>{u.reset}{confirm ? ' ?' : ''}</button></div>
    </main>
  </div>;
}
