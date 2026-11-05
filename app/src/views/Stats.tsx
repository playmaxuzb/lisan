// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Store, LEVELS, COURSES, courseIds } from '@/core/engine';
import { LEARN } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { act, streak, secToday, goalDone, setGoal, lastDays, totalSec, skills, remind, setRemind, enableNotifications, icsFile, flush, dayKey } from '@/core/activity';
import { fmt } from '@/core/strings_x';
import { useApp, useStore, I, Progress } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { Back } from '@/views/Pro';

export const hm = (sec, x) => { const m = Math.round(sec / 60); if (m < 60) return m + ' ' + x.mm; return Math.floor(m / 60) + ' ' + x.hh + ' ' + (m % 60 ? (m % 60) + ' ' + x.mm : ''); };
function Ring({ pct, children }){ const r = 34, c = 2 * Math.PI * r; return <div className="relative w-24 h-24 flex-none"><svg viewBox="0 0 80 80" className="w-24 h-24 -rotate-90"><circle cx="40" cy="40" r={r} fill="none" stroke="#E6EDFF" strokeWidth="8"/><circle cx="40" cy="40" r={r} fill="none" stroke={pct >= 100 ? '#14935B' : '#3F76FF'} strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, pct / 100))} style={{ transition: 'stroke-dashoffset .6s' }}/></svg><div className="absolute inset-0 grid place-items-center text-center">{children}</div></div>; }

/* streak + daily goal (home page and statistics) */
export function GoalCard({ compact = false }){
  useStore(); const { u } = useApp(); const x = u.x; const a = act(); const s = streak(); const today = secToday(); const pct = Math.round(today / (a.goal * 60) * 100); const done = goalDone();
  const [, rf] = useState(0); useEffect(() => { const t = setInterval(() => rf((v) => v + 1), 15000); return () => clearInterval(t); }, []);
  const left = Math.max(0, Math.ceil(a.goal - today / 60));
  return <div className="card p-4 sm:p-5 flex items-center gap-4" data-goal-card>
    <Ring pct={pct}><div><div className="text-xl font-extrabold text-ink leading-none" dir="ltr">{Math.floor(today / 60)}<span className="text-xs text-ink-3">/{a.goal}</span></div><div className="text-[10px] text-ink-3 font-semibold mt-0.5">{x.mm}</div></div></Ring>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2"><span className={`inline-flex items-center gap-1 text-2xl font-extrabold ${s ? 'text-[#F06A1E]' : 'text-ink-3'}`} dir="ltr"><I.fire className="w-6 h-6"/>{s}</span><span className="font-bold text-ink">{x.streak}</span></div>
      <div className={`text-sm mt-0.5 ${done ? 'text-[#14935B] font-semibold' : 'text-ink-2'}`}>{done ? x.goalDone : fmt(x.minLeft, { N: left })}</div>
      {!compact && <div className="mt-2 flex flex-wrap items-center gap-1.5"><span className="text-xs font-semibold text-ink-3 me-1">{x.goalT}:</span>{[5, 10, 15, 20, 30].map((m) => <button key={m} className={`chip !min-h-[30px] !px-2.5 text-xs ${a.goal === m ? 'on' : ''}`} onClick={() => setGoal(m)} data-goal={m}>{m} {x.mm}</button>)}</div>}
      {compact && <a href="#/stats" className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">{x.stats}<I.next className="w-3.5 h-3.5 rtl:rotate-180"/></a>}
    </div>
    {compact && <div className="hidden sm:flex items-end gap-1.5" dir="ltr" aria-hidden="true">{lastDays(7).map(([k, sec]) => { const d = new Date(k + 'T12:00:00'); return <div key={k} className="flex flex-col items-center gap-1">
      <span className={`grid place-items-center w-8 h-8 rounded-full text-xs font-bold ${goalDone(k) ? 'bg-[#F06A1E] text-white' : sec ? 'bg-brand-100 text-brand-700' : 'bg-mist text-ink-3'}`}>{goalDone(k) ? <I.fire className="w-4 h-4"/> : d.getDate()}</span>
      <span className={`text-[10px] ${k === dayKey() ? 'font-bold text-ink' : 'text-ink-3'}`}>{d.toLocaleDateString(undefined, { weekday: 'narrow' })}</span></div>; })}</div>}
  </div>;
}

export function RemindCard(){
  useStore(); const { u, toast } = useApp(); const x = u.x; const r = remind() || { on: false, time: '19:00' }; const goal = act().goal;
  const texts = (t) => ({ time: t, title: x.remindTitle, body: fmt(x.remindBody, { N: goal }) });
  const toggle = async () => { if (r.on){ await setRemind(Object.assign({}, r, { on: false })); return; }
    const p = await enableNotifications(); if (p === 'none'){ toast(x.notifNone); return; } if (p !== 'granted'){ toast(x.notifBlocked); return; }
    await setRemind(Object.assign({}, r, texts(r.time), { on: true })); toast(x.remindOn); };
  return <div className="card p-4 sm:p-5 flex flex-col gap-3" data-remind>
    <div className="flex items-center gap-3"><span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 flex-none"><I.bell className="w-5 h-5"/></span>
      <div className="flex-1 min-w-0"><div className="font-bold text-ink">{x.remind}</div><div className="text-xs text-ink-2">{x.remindD}</div></div>
      <button onClick={toggle} role="switch" aria-checked={!!r.on} className={`relative w-12 h-7 rounded-full transition flex-none ${r.on ? 'bg-brand-500' : 'bg-[#D5DCE8]'}`} data-remind-toggle><span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${r.on ? 'start-6' : 'start-1'}`}/></button></div>
    <div className="flex flex-wrap items-center gap-2">
      <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink">{x.time}<input type="time" className="field !w-auto !min-h-[40px] !py-1" value={r.time || '19:00'} onChange={(e) => setRemind(Object.assign({}, r, texts(e.target.value)))}/></label>
      <button className="btn ghost sm" onClick={() => icsFile(r.time || '19:00', x.remindTitle, fmt(x.remindBody, { N: goal }))} title={x.addCalD} data-ics>📅 {x.addCal}</button>
    </div>
  </div>;
}

function Bars({ days, x }){ const max = Math.max(60, ...days.map((d) => d[1]));
  return <div className="flex items-end gap-2 h-32" dir="ltr">{days.map(([k, s]) => { const d = new Date(k + 'T12:00:00'); const lab = d.toLocaleDateString(undefined, { weekday: 'short' });
    return <div key={k} className="flex-1 flex flex-col items-center gap-1 h-full justify-end"><span className="text-[10px] text-ink-3 font-semibold">{s >= 60 ? Math.round(s / 60) : ''}</span>
      <div className={`w-full max-w-[34px] rounded-t-lg ${goalDone(k) ? 'bg-[#14935B]' : 'bg-brand-400'}`} style={{ height: Math.max(3, s / max * 100) + '%', opacity: s ? 1 : .25 }}/><span className={`text-[11px] ${k === dayKey() ? 'font-bold text-ink' : 'text-ink-3'}`}>{lab}</span></div>; })}</div>; }

function CourseStats({ tr }){ const { u } = useApp(); const x = u.x; const c = COURSES[tr]; const deck = (Store.d.srs && Store.d.srs[tr]) || {}; const cards = Object.values(deck);
  const learned = cards.filter((k) => k.r >= 1).length; const passed = LEVELS.filter((L) => Store.passed(tr, L)).length; const sk = skills(tr); const t = totalSec(tr);
  const SK = ['vocab', 'listen', 'read', 'gram', 'write', 'speak'];
  return <div className="card p-5 flex flex-col gap-4" data-course-stats={tr}>
    <div className="flex items-center gap-3"><Flag lang={c.t} size="md"/><div className="flex-1 min-w-0"><div className="font-extrabold text-ink text-lg">{LEARN[c.n](c.t)}</div><div className="text-xs text-ink-2">{x.courseP}: {Math.round(passed / 6 * 100)}%</div></div><a href={'#/learn/' + tr} className="btn ghost sm">{x.open}</a></div>
    <Progress value={passed / 6 * 100}/>
    <div className="grid grid-cols-3 gap-2 text-center">{[[hm(t, x), x.timeT], [learned, x.wordsL, cards.length ? cards.length + ' ' + x.wordsInRev : ''], [passed + '/6', x.levelsP]].map(([v, l, sub], k) => <div key={k} className="rounded-2xl bg-paper border-[1.5px] border-line p-2.5"><div className="text-lg font-extrabold text-brand-600" dir="ltr">{v}</div><div className="text-[11px] text-ink-2 leading-tight mt-0.5">{l}</div>{sub && <div className="text-[10px] text-ink-3">{sub}</div>}</div>)}</div>
    <div><div className="text-xs font-bold uppercase tracking-wider text-ink-3 mb-2">{x.skillsT}</div>
      <div className="grid gap-2">{SK.map((k) => { const v = sk[k]; const p = v && v[1] ? Math.round(v[0] / v[1] * 100) : null; return <div key={k} className="flex items-center gap-3"><span className="w-28 sm:w-32 text-sm text-ink truncate">{x.sk[k]}</span><Progress value={p || 0} className="flex-1"/><span className="w-20 text-end text-xs text-ink-2" dir="ltr">{p == null ? '—' : p + '% · ' + v[1]}</span></div>; })}</div></div>
    <div><div className="text-xs font-bold uppercase tracking-wider text-ink-3 mb-2">{x.last7}</div><Bars days={lastDays(7, tr)} x={x}/></div>
  </div>; }

export default function Stats(){
  useStore(); const { u } = useApp(); const x = u.x; const n = Store.profile().native; useEffect(() => { flush(); }, []);
  const ids = courseIds(n).filter((tr) => totalSec(tr) > 0 || (Store.d.srs && Store.d.srs[tr] && Object.keys(Store.d.srs[tr]).length) || LEVELS.some((L) => Store.d.best[tr + ':' + L] != null) || (Store.d.sk && Store.d.sk[tr]))
    .sort((a, b) => totalSec(b) - totalSec(a));
  const a = act();
  return <div><TopBar/>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <Back label={u.home}/>
      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2"><I.chart className="w-7 h-7 text-brand-600"/>{x.stats}</h1><p className="text-ink-2">{x.statsD}</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2"><GoalCard/><RemindCard/></div>
      <div className="mt-4 card p-5"><div className="flex flex-wrap items-baseline justify-between gap-2 mb-3"><h2 className="font-extrabold text-ink">{x.last7}</h2><div className="text-sm text-ink-2">{x.total}: <b className="text-ink">{hm(totalSec(), x)}</b> · {x.bestStreak}: <b className="text-ink" dir="ltr">{a.best}</b></div></div><Bars days={lastDays(7)} x={x}/></div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">{ids.length ? ids.map((tr) => <CourseStats key={tr} tr={tr}/>) : <div className="card p-6 text-ink-2">{x.noData}</div>}</div>
    </main></div>;
}
