// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, COURSES, LEVELS, Packs, Speech } from '@/core/engine';
import { LEARN } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import * as SRS from '@/core/srs';
import { hasAccess } from '@/core/pro';
import { useApp, useStore, I, PlayBtn, Tgt, Progress } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { useTrack, Spinner, AudioBtn } from '@/views/Track';
import { Back } from '@/views/Pro';

const fmt = (s, o) => String(s || '').replace(/\{(\w+)\}/g, (_, k) => o[k] != null ? o[k] : '');
const ivl = (d, p) => d < 1 ? '10' + p.min : d < 30 ? d + p.day : Math.round(d / 30) + p.mon;

export default function Review({ tr }){
  useStore(); const { u, toast } = useApp(); const p = u.p; const T = useTrack(tr); const c = COURSES[tr]; const tl = c.t;
  const [queue, setQueue] = useState(null); const [k, setK] = useState(0); const [show, setShow] = useState(false); const [stats, setStats] = useState({ n: 0, ok: 0 });
  useEffect(() => { if (!T) return; const q = SRS.due(tr).filter((id) => hasAccess(tr, id.split(':')[0])).slice(0, 60);
    setQueue(q.map((id) => ({ id, rev: Math.random() < .35 }))); }, [T]);
  useEffect(() => { if (!queue) return; const Ls = new Set(queue.map((x) => x.id.split(':')[0])); Ls.forEach((L) => { Packs.one(tl + '-' + L + '-w'); if (queue.some((x) => x.id.startsWith(L + ':s:'))) Packs.one(tl + '-' + L); }); }, [queue]);
  const cur = queue && queue[k]; const it = cur ? SRS.itemOf(tr, cur.id) : null;
  useEffect(() => { if (it && !cur.rev){ const t = setTimeout(() => Speech.say(it.say, tl), 200); return () => clearTimeout(t); } }, [cur && cur.id, k]);
  if (!T || !queue) return <div><TopBar><AudioBtn/></TopBar><Spinner/></div>;
  const learn = async () => { const ids = await SRS.learnNew(tr, 10); if (!ids.length){ toast(p.noNew); return; } setQueue(ids.map((id) => ({ id, rev: false, fresh: true }))); setK(0); setShow(false); };
  const rate = (g) => { SRS.grade(tr, cur.id, g); setStats({ n: stats.n + 1, ok: stats.ok + (g > 0 ? 1 : 0) });
    if (g === 0) setQueue([...queue, { id: cur.id, rev: cur.rev }]); setShow(false); setK(k + 1); };
  const total = SRS.size(tr), mast = SRS.mastered(tr);
  const Header = <div className="flex flex-wrap items-center gap-4">
    <Flag lang={tl} size="lg"/><div className="flex-1 min-w-0"><h1 className="text-2xl font-extrabold text-ink">{p.review}</h1><div className="text-ink-2 text-sm">{LEARN[c.n](tl)} · {p.reviewSub}</div></div>
    <div className="flex gap-2">{[[total, p.inReview], [mast, p.mastered]].map(([v, l], i) => <div key={i} className="rounded-2xl bg-white border-[1.5px] border-line px-4 py-2 text-center"><div className="text-xl font-extrabold text-brand-600" dir="ltr">{v}</div><div className="text-[11px] text-ink-2">{l}</div></div>)}</div>
  </div>;
  let body;
  if (!it){
    body = <div className="card p-7 sm:p-9 text-center flex flex-col items-center gap-3 max-w-xl mx-auto">
      <span className="grid place-items-center w-16 h-16 rounded-full bg-[#E8F7EF] text-[#14935B]"><I.check className="w-8 h-8"/></span>
      <h2 className="text-xl font-extrabold text-ink">{stats.n ? p.reviewDone : p.reviewNone}</h2>
      {stats.n > 0 && <p className="text-ink-2">{fmt(p.sessionStats, { N: stats.n, OK: Math.round(stats.ok / stats.n * 100) })}</p>}
      <div className="flex flex-wrap justify-center gap-2 mt-2"><button className="btn" onClick={learn} data-learn-new>{p.learnNew}</button><a className="btn ghost" href={'#/learn/' + tr}>{u.backLevels}</a></div>
    </div>;
  } else {
    const opts = [[0, p.again, 'bg-[#FDECEC] text-[#A3262C] border-[#F2B8BB]'], [1, p.hard, 'bg-[#FFF4DA] text-[#7A5200] border-[#F2D49B]'], [2, p.good, 'bg-[#E8F7EF] text-[#0E6B42] border-[#9ED9BC]'], [3, p.easy, 'bg-brand-50 text-brand-700 border-brand-200']];
    body = <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4"><span className="text-sm font-bold text-ink-2" dir="ltr">{k + 1}/{queue.length}</span><Progress value={k / queue.length * 100} className="flex-1"/></div>
      <AnimatePresence mode="wait"><motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="card p-6 sm:p-8 min-h-[300px] flex flex-col items-center text-center gap-4" data-card>
        <div className="text-xs font-bold uppercase tracking-wider text-brand-600">{cur.fresh ? p.newWord : cur.rev ? p.recall : p.recognize}</div>
        {it.e && <div className="text-6xl leading-none">{it.e}</div>}
        {cur.rev && !show ? <div className="text-2xl font-bold text-ink" dir="auto">{it.m}</div> :
          <div className="flex items-center gap-3 flex-wrap justify-center"><Tgt tl={tl} className="text-3xl sm:text-4xl font-extrabold text-ink">{it.t}</Tgt><PlayBtn say={it.say} tl={tl} label={u.play}/></div>}
        {show && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-1.5">
          {it.pr && <div className="text-ink-3 text-sm" dir="ltr">{it.pr}</div>}
          {!cur.rev && <div className="text-xl font-semibold text-ink" dir="auto">{it.m}</div>}
        </motion.div>}
        <div className="mt-auto w-full pt-3">
          {!show ? <button className="btn w-full sm:w-auto sm:min-w-[220px]" onClick={() => { setShow(true); if (cur.rev) Speech.say(it.say, tl); }} data-show>{p.showAns}</button> :
            <div className="grid grid-cols-4 gap-2">{opts.map(([g, l, cls]) => <button key={g} onClick={() => rate(g)} data-grade={g} className={`rounded-xl border-[1.5px] py-2.5 font-semibold text-sm ${cls}`}>{l}<div className="text-[11px] opacity-75 font-medium" dir="ltr">{ivl(SRS.preview(tr, cur.id, g), p)}</div></button>)}</div>}
        </div>
      </motion.div></AnimatePresence>
    </div>;
  }
  return <div>
    <TopBar><AudioBtn/></TopBar>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <Back href={'#/learn/' + tr} label={u.backLevels}/>
      <div className="mt-4 mb-6">{Header}</div>
      {body}
    </main>
  </div>;
}
