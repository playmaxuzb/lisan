// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, COURSES, LEVELS, level, shuffle, disp, Packs, Speech } from '@/core/engine';
import { LEARN } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { useApp, useStore, useForce, I, PlayBtn, Tgt, Progress, Html, bodyHTML, tcls, tdir } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { useTrack, Spinner, AudioBtn } from '@/views/Track';
import { Back } from '@/views/Pro';

const fmt = (s, o) => String(s || '').replace(/\{(\w+)\}/g, (_, k) => o[k] != null ? o[k] : '');
const PER = 10, NEED = 8;
function mcq(pool, it, get){ const seen = new Set([get(it)]); const out = [it]; for (const x of shuffle(pool)){ const g = get(x); if (!g || seen.has(g)) continue; seen.add(g); out.push(x); if (out.length >= 4) break; } return shuffle(out); }
// No pictures in tests: the learner must understand the word or sentence itself.
function stage(tr, L){
  const lv = level(tr, L); const V = lv.vocab, Sn = lv.sentences; const qs = [];
  const vs = shuffle(V).slice(0, 6); const ss = shuffle(Sn).slice(0, 3);
  const mean = (it) => ({ kind: 'mean', item: it, opts: mcq(V, it, (x) => x.m).map((x) => ({ label: x.m, ok: x === it })) });
  vs.slice(0, 3).forEach((it) => qs.push(mean(it)));
  if (vs[3]) qs.push({ kind: 'rev', item: vs[3], opts: mcq(V, vs[3], (x) => x.say).map((x) => ({ label: x.t, ok: x === vs[3], tgt: 1 })) });
  vs.slice(4, 6).forEach((it) => qs.push({ kind: 'listen', item: it, opts: mcq(V, it, (x) => x.say).map((x) => ({ label: x.t, ok: x === it, tgt: 1 })) }));
  ss.slice(0, 2).forEach((it) => qs.push({ kind: 'sent', item: it, opts: mcq(Sn, it, (x) => x.m).map((x) => ({ label: x.m, ok: x === it })) }));
  if (ss[2]) qs.push({ kind: 'lsent', item: ss[2], opts: mcq(Sn, ss[2], (x) => x.m).map((x) => ({ label: x.m, ok: x === ss[2] })) });
  const g = []; lv.grammar.forEach((x) => x.quiz.forEach((q) => g.push(q)));
  if (g.length){ const q = shuffle(g)[0]; qs.push({ kind: 'gram', item: q, opts: shuffle(q.opts.map((o, i) => ({ label: disp(o), ok: i === 0, tgt: 1 }))) }); }
  while (qs.length < PER){ const it = shuffle(Sn)[0]; qs.push({ kind: 'sent', item: it, opts: mcq(Sn, it, (x) => x.m).map((x) => ({ label: x.m, ok: x === it })) }); }
  return shuffle(qs.slice(0, PER));
}

export default function Placement({ tr }){
  useStore(); const { u } = useApp(); const p = u.p; const T = useTrack(tr); const c = COURSES[tr]; const tl = c.t; const force = useForce();
  const [st, setSt] = useState(null);
  useEffect(() => { Packs.load(tl, LEVELS[st ? st.li : 0]); }, [st && st.li]);
  const q = st && !st.done ? st.qs[st.i] : null;
  useEffect(() => { if (q && (q.kind === 'listen' || q.kind === 'lsent')){ const t = setTimeout(() => Speech.say(q.item.say, tl), 250); return () => clearTimeout(t); } }, [st && st.li, st && st.i]);
  if (!T) return <div><TopBar><AudioBtn/></TopBar><Spinner/></div>;
  const start = () => setSt({ li: 0, qs: stage(tr, 'A1'), i: 0, right: 0, passed: -1, done: false });
  const pickAns = (k) => { if (q.picked != null) return; q.picked = k; if (q.opts[k].ok) st.right++; if (q.kind !== 'gram' && q.kind !== 'rev') Speech.say(q.item.say || '', tl); else if (q.opts[k].tgt && q.kind === 'rev') Speech.say(q.item.say, tl); force(); };
  const next = () => {
    if (st.i + 1 < st.qs.length){ st.i++; force(); return; }
    const ok = st.right >= NEED; const L = LEVELS[st.li];
    if (ok && st.li < 5){ setSt({ li: st.li + 1, qs: stage(tr, LEVELS[st.li + 1]), i: 0, right: 0, passed: st.li, done: false, log: [...(st.log || []), [L, st.right]] }); return; }
    const passed = ok ? st.li : st.passed; const place = Math.min(5, passed + 1);
    const d = Store.d; (d.placed || (d.placed = {})); if (place > 0) d.placed[tr] = Math.max(d.placed[tr] || 0, place);
    (d.placement || (d.placement = {}))[tr] = { L: LEVELS[place], at: Date.now(), passed }; Store.save();
    setSt(Object.assign({}, st, { done: true, passed, place, log: [...(st.log || []), [L, st.right]] }));
  };
  let body;
  if (!st){ const prev = Store.d.placement && Store.d.placement[tr];
    body = <div className="card p-6 sm:p-8 max-w-2xl mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold text-ink">{p.placement}</h2>
      <p className="text-ink-2 leading-relaxed">{p.placementInfo}</p>
      <div className="flex gap-1.5">{LEVELS.map((L) => <span key={L} className="flex-1 rounded-lg text-center text-xs font-bold py-1.5 bg-brand-50 text-brand-700 ring-1 ring-brand-200">{L}</span>)}</div>
      {prev && <div className="text-sm text-ink-2">{p.lastResult}: <b className="text-ink">{prev.L}</b></div>}
      <div className="flex flex-wrap gap-2"><button className="btn" onClick={start} data-start-placement>{p.placementStart}</button><a className="btn ghost" href={`#/learn/${tr}/a1`}>{p.startA1}</a></div>
    </div>;
  } else if (st.done){
    const L = LEVELS[st.place];
    body = <div className="card p-7 sm:p-9 max-w-2xl mx-auto text-center flex flex-col items-center gap-4" data-placed={L}>
      <div className="text-sm font-bold uppercase tracking-wider text-brand-600">{p.placementResult}</div>
      <motion.div initial={{ scale: .6 }} animate={{ scale: 1 }} className="grid place-items-center w-28 h-28 rounded-full bg-brand-500 text-white text-4xl font-extrabold shadow-soft">{L}</motion.div>
      <div className="text-xl font-bold text-ink">{u.lv[L]}</div>
      <p className="text-ink-2 max-w-md">{st.place > 0 ? fmt(p.placementOpen, { L }) : p.placementA1}</p>
      <div className="flex gap-1.5 w-full max-w-md">{LEVELS.map((x, i) => { const r = (st.log || []).find((y) => y[0] === x); return <div key={x} className="flex-1 text-center"><div className={`rounded-lg text-xs font-bold py-1.5 ${i <= st.passed ? 'bg-[#14935B] text-white' : i === st.place ? 'bg-brand-500 text-white' : 'bg-mist text-ink-3'}`}>{x}</div><div className="text-[11px] text-ink-3 mt-1" dir="ltr">{r ? r[1] + '/' + PER : ''}</div></div>; })}</div>
      <div className="flex flex-wrap justify-center gap-2"><a className="btn" href={`#/learn/${tr}/${L.toLowerCase()}`}>{p.goLevel} {L}</a><a className="btn ghost" href={'#/learn/' + tr}>{u.backLevels}</a></div>
    </div>;
  } else {
    const L = LEVELS[st.li]; const prog = (st.li * PER + st.i) / (6 * PER) * 100;
    body = <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4"><span className="px-2.5 py-1 rounded-lg bg-brand-500 text-white text-xs font-bold">{L}</span><span className="text-sm font-bold text-ink-2" dir="ltr">{st.i + 1}/{PER}</span><Progress value={prog} className="flex-1"/></div>
      <motion.div key={st.li + ':' + st.i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-5 sm:p-7">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-4">{p['pq_' + q.kind]}</div>
        <div className="mb-5">{q.kind === 'rev' ? <div className="text-2xl font-bold text-ink" dir="auto">{q.item.m}</div> : (q.kind === 'listen' || q.kind === 'lsent') ? <div className="flex items-center gap-3"><button className="grid place-items-center w-16 h-16 rounded-full bg-brand-500 text-white shadow-soft" onClick={() => Speech.say(q.item.say, tl)} aria-label={u.play}><I.play className="w-7 h-7"/></button><PlayBtn say={q.item.say} tl={tl} slow label={u.speed}/></div>
          : q.kind === 'gram' ? <Html className="text-lg font-medium text-ink" html={bodyHTML(String(disp(q.item.q)).replace(/[<>&]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[ch])), tl).replace(/___/g, '<b>____</b>')} tl={tl}/>
          : <div className="flex items-center gap-3 flex-wrap"><Tgt tl={tl} className={`${q.kind === 'sent' ? 'text-xl' : 'text-3xl'} font-extrabold text-ink`}>{q.item.t}</Tgt><PlayBtn say={q.item.say} tl={tl} label={u.play}/></div>}</div>
        <div className="grid gap-2.5 sm:grid-cols-2">{q.opts.map((o, k) => <button key={k} disabled={q.picked != null} data-opt={o.ok ? 1 : 0} onClick={() => pickAns(k)}
          className={`qopt ${q.picked != null ? (o.ok ? 'right' : q.picked === k ? 'wrong' : '') : ''}`} dir={o.tgt ? tdir(tl) : 'auto'}><span className={o.tgt ? tcls(tl) : ''}>{o.label}</span></button>)}</div>
        {q.picked != null && <div className="mt-6 flex justify-end"><button className="btn" onClick={next} data-next>{u.next}<I.next className="w-4 h-4 rtl:rotate-180"/></button></div>}
      </motion.div>
      <div className="mt-4 text-center"><button className="text-sm text-ink-3 hover:text-ink-2" onClick={() => { st.right = -99; st.i = st.qs.length - 1; next(); }}>{p.stopHere}</button></div>
    </div>;
  }
  return <div>
    <TopBar><AudioBtn/></TopBar>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <Back href={'#/learn/' + tr} label={u.backLevels}/>
      <div className="mt-4 mb-6 flex items-center gap-3"><Flag lang={tl} size="lg"/><div><h1 className="text-2xl font-extrabold text-ink">{p.placement}</h1><div className="text-ink-2 text-sm">{LEARN[c.n](tl)} · {p.placementSub}</div></div></div>
      {body}
    </main>
  </div>;
}
