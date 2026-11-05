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
import { Pro, planOf, paywallOn } from '@/core/pro';
import { dueCount } from '@/core/srs';
import { certsOf } from '@/core/pro';
import { GoalCard } from '@/views/Stats';
import Shelf from '@/views/Shelf';
import { canBack, canFwd, goBack, goFwd, onNav } from '@/core/nav';

function Menu(){ const { u } = useApp(); const p = u.p; const [open, setOpen] = useState(false); const ref = useRef(null);
  useEffect(() => { const f = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; addEventListener('pointerdown', f); return () => removeEventListener('pointerdown', f); }, []);
  const items = [['#/stats', u.x.stats, I.chart], ['#/certs', p.myCerts, I.star], ['#/videos', p.videos, I.play], ['#/pricing', p.plans, I.cards], ['#/verify', p.verifyT, I.check], ['#/schools', u.x.schools, I.school], ...(Pro.admin ? [['#/admin', p.adminT, I.edit]] : [])];
  return <div className="relative" ref={ref}>
    <button className="iconbtn" onClick={() => setOpen(!open)} aria-label={p.menu} aria-expanded={open} data-menu><I.grid/></button>
    {open && <div className="absolute end-0 mt-2 w-60 rounded-2xl bg-white border-[1.5px] border-line shadow-card p-1.5 z-40">{items.map(([h, l, Ic]) =>
      <a key={h} href={h} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-ink font-semibold hover:bg-brand-50"><Ic className="w-4.5 h-4.5 w-[18px] h-[18px] text-brand-600"/>{l}</a>)}</div>}
  </div>; }

function NavBtns(){ const { u } = useApp(); const [, rf] = useState(0); useEffect(() => onNav(() => rf((x) => x + 1)), []);
  const b = 'grid place-items-center w-9 h-9 rounded-full bg-white border-[1.5px] border-line text-ink transition hover:border-brand-500 hover:text-brand-600 disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink';
  return <div className="flex items-center gap-1.5 flex-none" data-nav>
    <button className={b} onClick={goBack} disabled={!canBack() && location.hash.replace(/^#\/?/, '') === ''} aria-label={u.x.back} title={u.x.back} data-nav-back><I.back className="w-[18px] h-[18px] rtl:rotate-180"/></button>
    <button className={b} onClick={goFwd} disabled={!canFwd()} aria-label={u.x.fwd} title={u.x.fwd} data-nav-fwd><I.next className="w-[18px] h-[18px] rtl:rotate-180"/></button>
  </div>; }

export function TopBar({ children = null }){
  const { u, go } = useApp(); const p = Store.profile();
  return <header className="sticky top-0 z-30 bg-[#EEF4FF]/85 backdrop-blur border-b border-line/70">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3">
      <NavBtns/>
      <a href="#/" aria-label={u.home}><Logo small tight/></a>
      <div className="flex-1 min-w-0 flex items-center justify-end gap-2">{children}{p && <Menu/>}</div>
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

function QuickRow(){ const { u } = useApp(); const p = u.p; const n = Store.profile().native; const due = courseIds(n).reduce((a, tr) => a + dueCount(tr), 0); const plan = planOf();
  const firstDue = courseIds(n).find((tr) => dueCount(tr) > 0);
  const tiles = [
    [firstDue ? '#/review/' + firstDue : '#/review/' + (Object.keys(Store.d.best || {}).map((k) => k.split(':')[0]).find((tr) => COURSES[tr] && COURSES[tr].n === n) || courseIds(n)[0]), p.review, due ? due + ' ' + p.dueN : p.reviewSub, '↻', due > 0],
    ['#/certs', p.myCerts, certsOf().length ? certsOf().length + ' · ' + p.cert : p.certsSub, '★', false],
    ['#/videos', p.videos, p.videosSub, '▶', false],
    ['#/pricing', plan.kind === 'pro' ? p.pro : p.plans, plan.kind === 'free' ? p.upgradeSub : p.current, '◆', paywallOn() && plan.kind === 'free']];
  return <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">{tiles.map(([h, t, d, ic, hot]) => <a key={t} href={h} className={`card card-hover p-4 flex items-center gap-3 ${hot ? '!border-brand-500' : ''}`}>
    <span className={`grid place-items-center w-11 h-11 rounded-xl text-lg font-bold flex-none ${hot ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 ring-1 ring-brand-200'}`}>{ic}</span>
    <div className="min-w-0"><div className="font-bold text-ink truncate">{t}</div><div className="text-xs text-ink-2 truncate">{d}</div></div></a>)}</div>; }

export default function Home({ book = null }){
  useStore(); const { u, lang, go } = useApp(); const p = Store.profile(); const n = p.native;
  const ids = courseIds(n);
  const passedOf = (tr) => LEVELS.filter((L) => Store.passed(tr, L)).length;
  const stats = [[activeLangs().length, u.languages], [Object.keys(COURSES).length, u.courses], [6, u.levels], [1200, u.picWords, '+']];
  const featIcon = { listen: I.listen, tap: I.tap, pen: I.pen, check: I.exam };
  return <div>
    <TopBar/>
    <Shelf book={book}/>

    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-4"><GoalCard compact/></div>
      <QuickRow/>
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
    <footer className="border-t border-line py-6 text-center text-xs text-ink-3">Lisan · لِسان · {LEVELS.join(' · ')}<div className="mt-1 opacity-80" dir="ltr">Voices: VOICEVOX:青山龍星 · VOICEVOX:No.7 · Supertonic · Piper</div></footer>
  </div>;
}
