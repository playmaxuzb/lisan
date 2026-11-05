// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, LEVELS, level, Packs, Speech, shuffle, COURSES, tokens, norm } from '@/core/engine';
import { LEARN } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { hasAccess } from '@/core/pro';
import { skill } from '@/core/activity';
import { useApp, useStore, useForce, I, PlayBtn, Tgt, Progress, tcls, tdir } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { useTrack, Spinner, AudioBtn } from '@/views/Track';

const GAMES = [['match', '🧩'], ['build', '🧱'], ['spell', '🔤'], ['speed', '⚡'], ['listen', '👂']];
const best = (tr, g) => (Store.d.games && Store.d.games[tr + ':' + g]) || 0;
const setBest = (tr, g, v) => { const s = Store.d.games || (Store.d.games = {}); if (v > (s[tr + ':' + g] || 0)){ s[tr + ':' + g] = v; Store.save(); return true; } return false; };
const open = (tr) => LEVELS.filter((L, i) => Store.unlocked(tr, i) && hasAccess(tr, L));
const uniq = (arr, f) => { const s = new Set(); return arr.filter((x) => { const k = f(x); if (s.has(k)) return false; s.add(k); return true; }); };

export default function Games({ tr, g }){
  useStore(); const { u } = useApp(); const x = u.x; const T = useTrack(tr); const c = COURSES[tr]; const tl = c.t;
  const lvls = open(tr); const [L, setL] = useState(() => { try { return localStorage.getItem('lisan.gameL.' + tr) || ''; } catch (e){ return ''; } });
  const lv0 = lvls.includes(L) ? L : lvls[lvls.length - 1] || 'A1';
  useEffect(() => { Packs.load(tl, lv0); try { localStorage.setItem('lisan.gameL.' + tr, lv0); } catch (e){} }, [lv0]);
  if (!T) return <div><TopBar><AudioBtn/></TopBar><Spinner/></div>;
  const lv = level(tr, lv0); const G = GAMES.find((q) => q[0] === g);
  return <div><TopBar><AudioBtn/></TopBar>
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-6 pb-16">
      <a href={G ? '#/games/' + tr : '#/learn/' + tr} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{G ? x.backGames : u.backLevels}</a>
      <div className="mt-4 flex flex-wrap items-center gap-3"><Flag lang={tl} size="md"/><div className="flex-1 min-w-0"><h1 className="text-2xl font-extrabold text-ink">{G ? x.g[g][0] : x.games} · {LEARN[c.n](tl)}</h1><p className="text-sm text-ink-2">{G ? x.g[g][1] : x.gamesD}</p></div></div>
      <div className="mt-4 flex flex-wrap items-center gap-1.5"><span className="text-xs font-semibold text-ink-3 me-1">{x.pickLevel}:</span>{lvls.map((l) => <button key={l} className={`chip !min-h-[34px] ${l === lv0 ? 'on' : ''}`} onClick={() => setL(l)}>{l}</button>)}</div>
      <div className="mt-5">{!G ? <div className="grid gap-3 sm:grid-cols-2" data-games>{GAMES.map(([k, ic]) => <a key={k} href={'#/games/' + tr + '/' + k} className="card card-hover p-5 flex items-center gap-4" data-game={k}>
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-50 ring-1 ring-brand-200 text-3xl flex-none">{ic}</span>
          <div className="flex-1 min-w-0"><div className="font-extrabold text-ink text-lg">{x.g[k][0]}</div><div className="text-sm text-ink-2">{x.g[k][1]}</div></div>
          {best(tr, k) > 0 && <span className="text-xs font-bold text-[#B07A10] bg-[#FFF8E6] rounded-lg px-2 py-1" dir="ltr">★ {best(tr, k)}</span>}</a>)}</div>
        : <Play key={g + lv0} g={g} lv={lv}/>}</div>
    </main></div>;
}

function Play({ g, lv }){ const [run, setRun] = useState(0); const [score, setScore] = useState(null);
  const done = (s) => { setScore({ s, rec: setBest(lv.tr, g, s) }); };
  if (score) return <End g={g} lv={lv} score={score} again={() => { setScore(null); setRun(run + 1); }}/>;
  const P = { key: run, lv, done }; return g === 'match' ? <Match {...P}/> : g === 'build' ? <Build {...P}/> : g === 'spell' ? <Spell {...P}/> : g === 'speed' ? <Speed {...P}/> : <Listen {...P}/>; }
function End({ g, lv, score, again }){ const { u } = useApp(); const x = u.x;
  return <motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-8 max-w-md mx-auto text-center flex flex-col items-center gap-3" data-game-end={score.s}>
    <div className="text-6xl">{score.rec ? '🏆' : '🎉'}</div><div className="text-xl font-extrabold text-ink">{x.bravo}</div>
    <div className="text-sm text-ink-2">{x.scoreT}</div><div className="text-5xl font-extrabold text-brand-600" dir="ltr">{score.s}</div>
    <div className="text-sm text-ink-3">{x.bestT}: <b dir="ltr">{best(lv.tr, g)}</b></div>
    <div className="flex gap-2 mt-2"><button className="btn" onClick={again}>{x.playAgain}</button><a className="btn ghost" href={'#/games/' + lv.tr}>{x.backGames}</a></div></motion.div>; }
const Bar = ({ i, n, right = null }) => <div className="flex items-center gap-3 mb-4"><span className="text-sm font-bold text-ink-2" dir="ltr">{i}/{n}</span><Progress value={i / n * 100} className="flex-1"/>{right}</div>;

/* 1. match pairs */
function Match({ lv, done }){ const { u } = useApp(); const x = u.x; const tl = lv.t; const ROUNDS = 3;
  const rounds = useMemo(() => { const v = shuffle(uniq(lv.vocab.filter((w) => w.m && w.t.length <= 28), (w) => norm(w.m, lv.n))); return [0, 1, 2].map((r) => v.slice(r * 6, r * 6 + 6)); }, [lv]);
  const [r, setR] = useState(0); const [sel, setSel] = useState(null); const [gone, setGone] = useState({}); const [bad, setBad] = useState(null); const [moves, setMoves] = useState(0); const t0 = useRef(Date.now());
  const set = rounds[r] || []; const L = useMemo(() => shuffle(set), [r]); const R = useMemo(() => shuffle(set), [r]);
  const pick = (side, w) => { if (gone[w.id]) return; if (side === 'L') Speech.say(w.say, tl); if (!sel || sel.side === side){ setSel({ side, w }); return; }
    setMoves(moves + 1); if (sel.w.id === w.id){ const ng = { ...gone, [w.id]: 1 }; setGone(ng); setSel(null);
      if (Object.keys(ng).length === set.length){ if (r + 1 < ROUNDS && rounds[r + 1].length){ setTimeout(() => { setR(r + 1); setGone({}); }, 450); } else { const sec = (Date.now() - t0.current) / 1000; const n = rounds.flat().length; setTimeout(() => done(Math.max(10, Math.round(n * 20 - (moves + 1 - n) * 5 - sec / 2))), 450); } } }
    else { setBad([sel.w.id, w.id, sel.side]); setSel(null); setTimeout(() => setBad(null), 500); } };
  const cell = (side, w) => { const on = sel && sel.side === side && sel.w.id === w.id; const isBad = bad && ((side === bad[2] && bad[0] === w.id) || (side !== bad[2] && bad[1] === w.id));
    return <button key={side + w.id} disabled={!!gone[w.id]} onClick={() => pick(side, w)} data-m={side} data-id={w.id}
      className={`min-h-[56px] rounded-2xl border-[1.5px] px-3 py-2 font-semibold transition ${gone[w.id] ? 'opacity-0 pointer-events-none' : isBad ? 'border-[#D9363E] bg-[#FDECEC] animate-[shake_.3s]' : on ? 'border-brand-500 bg-brand-50 ring-4 ring-brand-500/10' : 'border-line bg-white hover:border-brand-400'} ${side === 'L' ? tcls(tl) + ' text-lg' : 'text-sm'}`} dir={side === 'L' ? tdir(tl) : 'auto'}>{side === 'L' ? w.t : w.m}</button>; };
  return <div className="max-w-2xl mx-auto"><Bar i={r + 1} n={ROUNDS} right={<span className="text-sm text-ink-3">{x.moves}: <b dir="ltr">{moves}</b></span>}/>
    <div className="grid grid-cols-2 gap-3"><div className="flex flex-col gap-2.5">{L.map((w) => cell('L', w))}</div><div className="flex flex-col gap-2.5">{R.map((w) => cell('R', w))}</div></div></div>; }

/* 2. build the sentence */
function Build({ lv, done }){ const { u } = useApp(); const x = u.x; const tl = lv.t; const force = useForce(); const N = 8;
  const qs = useMemo(() => shuffle(lv.sentences.filter((s) => { const t = tokens(s.src, tl); return t.length >= 3 && t.length <= 8 && new Set(t.map((w) => w.toLowerCase())).size === t.length; })).slice(0, N).map((s) => { const w = tokens(s.src, tl); return { s, w, pool: shuffle(w.map((t, i) => ({ t, i }))), ch: [], res: null }; }), [lv]);
  const [i, setI] = useState(0); const [ok, setOk] = useState(0); const q = qs[i];
  useEffect(() => { if (!q) done(ok * 10); }, [i]);
  if (!q) return null;
  const used = new Set(q.ch); const check = () => { q.res = norm(q.ch.map((k) => q.pool[k].t).join(' '), tl) === norm(q.w.join(' '), tl); if (q.res) setOk(ok + 1); skill(lv.tr, 'read', q.res); Speech.say(q.s.say, tl); force(); };
  const next = () => setI(i + 1);
  return <div className="max-w-2xl mx-auto"><Bar i={i + 1} n={qs.length}/>
    <div className="card p-5 sm:p-6"><div className="text-lg text-ink mb-4" dir="auto">{q.s.m}</div>
      <div className="min-h-[60px] rounded-2xl border-[1.5px] border-dashed border-brand-300 bg-paper p-2.5 flex flex-wrap gap-2" dir={tdir(tl)}>{q.ch.map((k, j) => <button key={j} disabled={q.res != null} onClick={() => { q.ch.splice(j, 1); force(); }} className={`px-3.5 py-2 rounded-xl bg-brand-500 text-white font-semibold ${tcls(tl)}`}>{q.pool[k].t}</button>)}</div>
      <div className="mt-3 flex flex-wrap gap-2" dir={tdir(tl)}>{q.pool.map((p, k) => used.has(k) ? null : <button key={k} data-pool disabled={q.res != null} onClick={() => { q.ch.push(k); force(); }} className={`px-3.5 py-2 rounded-xl bg-white border-[1.5px] border-line hover:border-brand-500 font-semibold text-ink ${tcls(tl)}`}>{p.t}</button>)}</div>
      {q.res == null ? <div className="mt-4"><button className="btn" data-check disabled={q.ch.length !== q.pool.length} onClick={check}>{u.check}</button></div>
        : <div className={`mt-4 rounded-2xl p-3.5 border-[1.5px] flex flex-wrap items-center justify-between gap-2 ${q.res ? 'bg-[#E8F7EF] border-[#9ED9BC] text-[#0E6B42]' : 'bg-[#FDECEC] border-[#F2B8BB] text-[#A3262C]'}`}><span>{q.res ? u.correct : <>{u.wrongIs} <Tgt tl={tl} className="font-bold">{q.s.t}</Tgt></>}</span><button className="btn sm" onClick={next} data-next>{u.next}</button></div>}
    </div></div>; }

/* 3. letter puzzle */
const units = (w, tl) => (tl === 'zh' || tl === 'ja' || tl === 'ko') ? [...w.replace(/\s/g, '')] : [...w];
function Spell({ lv, done }){ const { u } = useApp(); const x = u.x; const tl = lv.t; const N = 8;
  const qs = useMemo(() => { const cjk = tl === 'zh' || tl === 'ja' || tl === 'ko'; return shuffle(lv.vocab.filter((v) => { const s = v.say; return cjk ? s.length >= 2 && s.length <= 4 : !/[\s\-]/.test(s) && s.length >= 3 && s.length <= 10; })).slice(0, N); }, [lv]);
  const [i, setI] = useState(0); const [got, setGot] = useState([]); const [res, setRes] = useState(null); const [pts, setPts] = useState(0); const [hints, setHints] = useState(0);
  const it = qs[i]; const target = it ? units(it.say.toLowerCase(), tl) : []; const pool = useMemo(() => it ? shuffle(target.map((c, k) => ({ c, k }))) : [], [i]);
  useEffect(() => { if (it){ setGot([]); setRes(null); setHints(0); const t = setTimeout(() => Speech.say(it.say, tl), 250); return () => clearTimeout(t); } }, [i]);
  useEffect(() => { if (!it) done(pts); }, [i]);
  if (!it) return null;
  const used = new Set(got); const put = (k) => { if (res != null) return; const g2 = [...got, k]; setGot(g2); if (g2.length === target.length){ const ok = g2.map((j) => pool[j].c).join('') === target.join(''); setRes(ok); if (ok) setPts(pts + Math.max(4, 10 - hints * 3)); skill(lv.tr, 'write', ok); Speech.say(it.say, tl); } };
  const hint = () => { const nk = got.length; if (nk >= target.length || res != null) return; const need = target[nk]; const j = pool.findIndex((p, k) => !used.has(k) && p.c === need); if (got.some((g, k) => pool[g].c !== target[k])){ setGot([]); return; } if (j >= 0){ setHints(hints + 1); put(j); } };
  return <div className="max-w-xl mx-auto"><Bar i={i + 1} n={qs.length} right={<span className="text-sm text-ink-3">{x.scoreT}: <b dir="ltr">{pts}</b></span>}/>
    <div className="card p-6 flex flex-col items-center gap-4 text-center" data-spell-game>
      {it.e && <div className="text-6xl" aria-hidden="true">{it.e}</div>}<div className="text-xl font-bold text-ink">{it.m}</div><PlayBtn say={it.say} tl={tl} label={u.play}/>
      <div className="flex flex-wrap justify-center gap-1.5" dir={tdir(tl)}>{target.map((c, k) => <span key={k} className={`grid place-items-center w-10 h-12 rounded-xl border-[1.5px] text-xl font-bold ${tcls(tl)} ${got[k] != null ? (res == null ? 'border-brand-500 bg-brand-50 text-ink' : res ? 'border-[#14935B] bg-[#E8F7EF] text-[#0E6B42]' : 'border-[#D9363E] bg-[#FDECEC] text-[#A3262C]') : 'border-dashed border-line'}`} onClick={() => { if (res == null && got.length) setGot(got.slice(0, k)); }}>{got[k] != null ? pool[got[k]].c : ''}</span>)}</div>
      <div className="flex flex-wrap justify-center gap-2" dir={tdir(tl)}>{pool.map((p, k) => <button key={k} disabled={used.has(k) || res != null} onClick={() => put(k)} data-tile className={`w-11 h-11 rounded-xl border-[1.5px] text-lg font-bold transition ${tcls(tl)} ${used.has(k) ? 'opacity-25 border-line' : 'border-line bg-white hover:border-brand-500'}`}>{p.c}</button>)}</div>
      {res == null ? <button className="btn ghost sm" onClick={hint}>💡 {x.hint}</button> : <div className="flex flex-col items-center gap-2"><Tgt tl={tl} className="text-2xl font-extrabold text-ink">{it.t}</Tgt>
        <div className="flex gap-2">{!res && <button className="btn ghost sm" onClick={() => { setGot([]); setRes(null); }}>{x.tryAgain}</button>}<button className="btn sm" onClick={() => setI(i + 1)} data-next>{u.next}</button></div></div>}
    </div></div>; }

/* 4. speed round: 60 seconds, word -> meaning */
function Speed({ lv, done }){ const { u } = useApp(); const x = u.x; const tl = lv.t; const SEC = 60;
  const pool = useMemo(() => uniq(lv.vocab.filter((v) => v.m), (v) => norm(v.m, lv.n)), [lv]);
  const mk = () => { const it = pool[Math.floor(Math.random() * pool.length)]; const opts = shuffle([it, ...shuffle(pool.filter((p) => p !== it)).slice(0, 3)]); return { it, opts, pick: -1 }; };
  const [q, setQ] = useState(mk); const [pts, setPts] = useState(0); const [left, setLeft] = useState(SEC); const [run, setRun] = useState(false); const end = useRef(0);
  useEffect(() => { if (!run) return; const t = setInterval(() => { const l = Math.max(0, Math.ceil((end.current - Date.now()) / 1000)); setLeft(l); if (l <= 0){ clearInterval(t); done(pts); } }, 200); return () => clearInterval(t); }, [run, pts]);
  if (!run) return <div className="card p-8 max-w-md mx-auto text-center flex flex-col items-center gap-3"><div className="text-6xl">⚡</div><div className="text-ink-2">{x.g.speed[1]}</div><button className="btn" onClick={() => { end.current = Date.now() + SEC * 1000; setRun(true); }} data-start>{x.play}</button></div>;
  const ans = (k) => { if (q.pick >= 0) return; const ok = q.opts[k] === q.it; setQ({ ...q, pick: k }); skill(lv.tr, 'vocab', ok); if (ok) setPts(pts + 1); setTimeout(() => setQ(mk()), ok ? 250 : 700); };
  return <div className="max-w-xl mx-auto">
    <div className="flex items-center gap-3 mb-4"><span className={`text-2xl font-extrabold w-14 ${left <= 10 ? 'text-[#D9363E]' : 'text-ink'}`} dir="ltr">{left}s</span><Progress value={left / SEC * 100} className="flex-1"/><span className="text-lg font-extrabold text-brand-600" dir="ltr">★ {pts}</span></div>
    <div className="card p-6 flex flex-col items-center gap-4"><Tgt tl={tl} className="text-3xl font-extrabold text-ink text-center">{q.it.t}</Tgt>
      <div className="grid gap-2.5 w-full sm:grid-cols-2">{q.opts.map((o, k) => <button key={k} onClick={() => ans(k)} data-opt={o === q.it ? 1 : 0} className={`qopt ${q.pick >= 0 ? (o === q.it ? 'right' : q.pick === k ? 'wrong' : '') : ''}`} dir="auto">{o.m}</button>)}</div></div></div>; }

/* 5. listen and catch */
function Listen({ lv, done }){ const { u } = useApp(); const x = u.x; const tl = lv.t; const N = 10;
  const pool = useMemo(() => uniq(lv.vocab, (v) => norm(v.say, tl)), [lv]); const qs = useMemo(() => shuffle(pool).slice(0, N).map((it) => ({ it, opts: shuffle([it, ...shuffle(pool.filter((p) => p !== it)).slice(0, 3)]), pick: -1 })), [pool]);
  const [i, setI] = useState(0); const [pts, setPts] = useState(0); const force = useForce(); const q = qs[i];
  useEffect(() => { if (q){ const t = setTimeout(() => Speech.say(q.it.say, tl), 300); return () => clearTimeout(t); } }, [i]);
  useEffect(() => { if (!q) done(pts * 10); }, [i]);
  if (!q) return null;
  const ans = (k) => { if (q.pick >= 0) return; q.pick = k; const ok = q.opts[k] === q.it; skill(lv.tr, 'listen', ok); if (ok) setPts(pts + 1); force(); setTimeout(() => setI(i + 1), ok ? 600 : 1300); };
  return <div className="max-w-xl mx-auto"><Bar i={i + 1} n={qs.length} right={<span className="text-lg font-extrabold text-brand-600" dir="ltr">★ {pts}</span>}/>
    <div className="card p-6 flex flex-col items-center gap-5"><button className="grid place-items-center w-20 h-20 rounded-full bg-brand-500 text-white shadow-soft" onClick={() => Speech.say(q.it.say, tl)} aria-label={u.play}><I.play className="w-8 h-8"/></button><PlayBtn say={q.it.say} tl={tl} slow label={u.speed}/>
      <div className="grid gap-2.5 w-full grid-cols-2">{q.opts.map((o, k) => <button key={k} onClick={() => ans(k)} data-opt={o === q.it ? 1 : 0} className={`qopt ${q.pick >= 0 ? (o === q.it ? 'right' : q.pick === k ? 'wrong' : '') : ''} ${tcls(tl)}`} dir={tdir(tl)}>{o.t}{q.pick >= 0 && o === q.it && <div className="text-xs text-ink-2 font-normal mt-0.5" dir="auto">{o.m}</div>}</button>)}</div></div></div>; }
