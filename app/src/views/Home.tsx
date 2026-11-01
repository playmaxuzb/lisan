// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import WaveGridBackground from '@/ui/Wave';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Store, LEVELS, courseIds, COURSES, activeLangs } from '@/core/engine';
import { SELF, LEARN, LNAME } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { avatarSrc } from '@/core/avatars';
import { useApp, useStore, I, Logo, Progress } from '@/ui/kit';

export function TopBar({ children = null }){
  const { u, go } = useApp(); const p = Store.profile();
  return <header className="sticky top-0 z-30 bg-[#EEF4FF]/85 backdrop-blur border-b border-line/70">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3">
      <a href="#/" aria-label={u.home}><Logo small/></a>
      <div className="flex-1 min-w-0 flex items-center justify-end gap-2">{children}</div>
      {p && <a href="#/profile" className="inline-flex items-center gap-2 rounded-full bg-white border-[1.5px] border-line ps-1 pe-3 py-1 hover:border-brand-500 transition" data-profile-link>
        <img src={avatarSrc(p)} alt="" className="w-8 h-8 rounded-full object-cover bg-brand-50"/>
        <span className="text-sm font-semibold text-ink max-w-[110px] truncate hidden sm:inline"><bdi dir="ltr">@{p.username}</bdi></span>
      </a>}
    </div>
  </header>;
}

function InView({ children }){ const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting){ setOn(true); io.disconnect(); } }, { threshold: .3 }); ref.current && io.observe(ref.current); return () => io.disconnect(); }, []);
  return <div ref={ref}>{children(on)}</div>; }

export default function Home(){
  useStore(); const { u, lang, go } = useApp(); const p = Store.profile(); const n = p.native;
  const ids = courseIds(n);
  const passedOf = (tr) => LEVELS.filter((L) => Store.passed(tr, L)).length;
  const stats = [[activeLangs().length, u.languages], [Object.keys(COURSES).length, u.courses], [6, u.levels], [1200, u.picWords, '+']];
  const featIcon = { listen: I.listen, tap: I.tap, pen: I.pen, check: I.exam };
  return <div>
    <TopBar/>
    <section className="relative h-[340px] sm:h-[380px] overflow-hidden border-b border-line">
      <div className="absolute inset-0"><WaveGridBackground colorBase="#F5F8FF" colorHigh="#3F76FF" gridSize={34} waveAmplitude={0.3} vignette={false}/></div>
      <div className="relative z-10 h-full mx-auto max-w-6xl px-4 sm:px-6 flex items-end pb-8 pointer-events-none">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-auto max-w-xl rounded-3xl bg-white/90 backdrop-blur border-[1.5px] border-line shadow-card p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <img src={avatarSrc(p)} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500 ring-offset-2 bg-brand-50"/>
            <div className="min-w-0"><div className="text-ink-2 text-sm">{u.hello},</div><div className="font-extrabold text-xl text-ink truncate"><bdi dir="ltr">@{p.username}</bdi></div></div>
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-ink leading-tight">{u.whatLearn}</h1>
          <div className="mt-2 inline-flex items-center gap-2 text-sm text-ink-2">{u.yourNative}: <Flag lang={n} size="sm"/><b className="text-ink">{SELF[n]}</b>
            <a href="#/profile" className="text-brand-600 font-semibold hover:underline">{u.change}</a></div>
        </motion.div>
      </div>
    </section>

    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((tr, i) => { const t = COURSES[tr].t; const k = passedOf(tr); return <motion.a key={tr} href={'#/learn/' + tr} data-course={tr}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .04 * i }}
          className="card card-hover p-5 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Flag lang={t} size="lg"/>
            <div className="min-w-0 flex-1"><div className="text-lg font-bold text-ink">{LEARN[n](t)}</div><div className="text-sm text-ink-3" lang={t}>{SELF[t]}</div></div>
            <span className="iconbtn"><I.next className="rtl:rotate-180"/></span>
          </div>
          <div className="flex gap-1.5">{LEVELS.map((L, j) => <span key={L} className={`flex-1 rounded-lg text-center text-[11px] font-bold py-1 ${Store.passed(tr, L) ? 'bg-brand-500 text-white' : Store.unlocked(tr, j) ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-200' : 'bg-mist text-ink-3'}`}>{L}</span>)}</div>
          <div><div className="flex justify-between text-xs text-ink-2 mb-1.5"><span>{u.progress}</span><span className="font-semibold">{k}/6</span></div><Progress value={k / 6 * 100}/></div>
        </motion.a>; })}
      </div>

      <InView>{(on) => <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(([v, l, plus], i) => <div key={i} className="rounded-2xl bg-white border-[1.5px] border-line p-4 sm:p-5">
          <div className="flex items-baseline text-3xl sm:text-4xl font-extrabold text-brand-600 leading-none" dir="ltr"><AnimatedNumber value={on ? v : 0}/>{plus && <span className="ms-0.5">{plus}</span>}</div>
          <div className="mt-2 text-sm text-ink-2">{l}</div>
        </div>)}
      </div>}</InView>

      <section className="mt-12">
        <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{u.featT}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {u.feats.map(([k, t, d]) => { const Ic = featIcon[k]; return <div key={k} className="rounded-2xl bg-white border-[1.5px] border-line p-5">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200"><Ic className="w-5 h-5"/></span>
            <div className="mt-3 font-bold text-ink">{t}</div><div className="mt-1 text-sm text-ink-2 leading-relaxed">{d}</div></div>; })}
        </div>
      </section>
    </main>
    <footer className="border-t border-line py-6 text-center text-xs text-ink-3">Lisan · لِسان · {LEVELS.join(' · ')}</footer>
  </div>;
}
