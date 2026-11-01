// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, LEVELS, level, Packs, Speech, shuffle, COURSES, PASS, EXAM_N, buildExam, markAnswer, finishExam, checkTyped, norm, disp } from '@/core/engine';
import { LEARN } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { useApp, useStore, useForce, I, PlayBtn, PlayPair, Tgt, Words, bodyHTML, Html, Seg, Progress, tcls, tdir, nt } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { useTrack, Spinner, AudioBtn } from '@/views/Track';
import { WriteTab } from '@/views/Write';

const TAB_ICON = { letters: 'Aa', words: '🖼', phrases: '💬', grammar: '§', read: '📖', talk: '🗣', write: '✍︎', exam: '✓' };

export default function LevelView({ tr, L, tab }){
  useStore(); const { u } = useApp(); const T = useTrack(tr); const c = COURSES[tr]; const i = LEVELS.indexOf(L);
  useEffect(() => { Packs.load(c.t, L); }, [tr, L]);
  if (i < 0){ location.hash = '#/learn/' + tr; return null; }
  if (!T) return <div><TopBar><AudioBtn/></TopBar><Spinner/></div>;
  const lv = level(tr, L);
  const tabs = [...(lv.alphabet ? ['letters'] : []), 'words', 'phrases', 'grammar', 'read', 'talk', 'write', 'exam'];
  const cur = tabs.includes(tab) ? tab : tabs[0];
  const unlocked = Store.unlocked(tr, i);
  const go = (t) => { location.hash = `#/learn/${tr}/${L.toLowerCase()}/${t}`; };
  return <div>
    <TopBar><AudioBtn/></TopBar>
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-5">
      <a href={'#/learn/' + tr} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{u.backLevels}</a>
      <div className="mt-3 flex items-center gap-3">
        <Flag lang={c.t} size="md"/>
        <h1 className="text-xl sm:text-2xl font-extrabold text-ink">{LEARN[c.n](c.t)} · <span className="text-brand-600">{L}</span> <span className="text-ink-2 font-semibold text-lg">{u.lv[L]}</span></h1>
      </div>
      <nav className="mt-4 -mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-1" aria-label="tabs">
        {tabs.map((t) => <button key={t} onClick={() => go(t)} data-tab={t} className={`chip ${cur === t ? 'on' : ''}`}><span aria-hidden="true" className="text-xs opacity-80">{TAB_ICON[t]}</span>{u.tabs[t]}{!unlocked && t !== 'exam' && <I.lock className="w-3.5 h-3.5"/>}</button>)}
      </nav>
    </div>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-5 pb-16">
      <AnimatePresence mode="wait"><motion.div key={cur} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
        {!unlocked && cur !== 'exam' ? <Locked lv={lv} i={i} go={go}/> :
         cur === 'letters' ? <Letters lv={lv} go={go}/> : cur === 'words' ? <WordsTab lv={lv}/> : cur === 'phrases' ? <Phrases lv={lv}/> :
         cur === 'grammar' ? <Grammar lv={lv}/> : cur === 'read' ? <Reading lv={lv}/> : cur === 'talk' ? <Talk lv={lv}/> :
         cur === 'write' ? <WriteTab lv={lv}/> : <Exam lv={lv}/>}
      </motion.div></AnimatePresence>
    </main>
  </div>;
}

function Locked({ lv, i, go }){ const { u } = useApp();
  return <div className="card p-6 sm:p-8 max-w-xl mx-auto text-center flex flex-col items-center gap-3">
    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-200"><I.lock className="w-6 h-6"/></span>
    <h2 className="text-xl font-extrabold text-ink">{u.lockT}</h2><p className="text-ink-2">{u.lockD}</p>
    <div className="flex flex-wrap justify-center gap-2 mt-2"><a className="btn ghost" href={`#/learn/${lv.tr}/${LEVELS[i - 1].toLowerCase()}`}>{u.goPrev}</a><button className="btn" onClick={() => go('exam')}>{u.takeExam}</button></div>
  </div>; }

function H({ children, right = null }){ return <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg sm:text-xl font-extrabold text-ink">{children}</h2>{right && <div className="flex flex-wrap items-center gap-2">{right}</div>}</div>; }
const useWord = (lv) => { const { openWord } = useApp(); return (raw, ctxM, gloss) => openWord(raw, lv.tr, gloss, ctxM); };

/* ---------- letters ---------- */
function Letters({ lv, go }){
  const { u } = useApp(); const A = lv.alphabet; const [i, setI] = useState(0); const a = A[i]; const tl = lv.t; const ar = tl === 'ar';
  const cjk = tl === 'zh' || tl === 'ja' || tl === 'ko'; const big = cjk ? a.letter : a.letter.replace(' ', '');
  return <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
    <div className="card p-5 sm:p-6">
      <div className="ruled grid place-items-center min-h-[220px] !p-6" dir={tdir(tl)}>
        <div className="flex items-end gap-6 flex-wrap justify-center">
          <span className={`${tcls(tl)} text-7xl sm:text-8xl font-semibold text-ink leading-none`} lang={tl}>{big}</span>
          {tl === 'zh' ? <span className="tgt-zh text-6xl text-brand-600" lang="zh">{a.nameSay}</span> : (tl === 'ja' || tl === 'ko') ? (a.forms ? <span className={`${tcls(tl)} text-6xl sm:text-7xl text-brand-600 leading-none`} lang={tl}>{a.forms}</span> : null) :
            <span className="text-6xl sm:text-7xl text-brand-600 leading-none" style={{ fontFamily: ar ? '"Aref Ruqaa", serif' : '"Marck Script","Caveat",cursive' }}>{big}</span>}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <button className="btn ghost sm" onClick={() => setI((i - 1 + A.length) % A.length)}><I.back className="w-4 h-4 rtl:rotate-180"/>{u.prev}</button>
        <span className="text-sm text-ink-3 font-semibold" dir="ltr">{i + 1} / {A.length}</span>
        <button className="btn sm" onClick={() => setI((i + 1) % A.length)}>{u.next}<I.next className="w-4 h-4 rtl:rotate-180"/></button>
      </div>
    </div>
    <div className="card p-5 sm:p-6 flex flex-col gap-4">
      <div><div className="text-xs font-semibold uppercase tracking-wider text-ink-3">{u.name}</div>
        <div className="mt-1 flex items-center gap-3 text-2xl font-bold"><Tgt tl={tl === 'zh' || tl === 'ja' ? 'en' : tl}>{a.name}</Tgt><PlayPair say={a.nameSay} tl={tl} u={u}/></div></div>
      <div><div className="text-xs font-semibold uppercase tracking-wider text-ink-3">{u.sound}</div><div className="mt-1 text-ink text-[1.05rem] leading-relaxed" dir="auto">{a.sound}</div></div>
      {a.forms && tl === 'ar' && <div><div className="text-xs font-semibold uppercase tracking-wider text-ink-3">{u.forms}</div><div className="mt-1 tgt-ar text-3xl text-ink" dir="rtl">{a.letter} {a.forms}</div></div>}
      <div><div className="text-xs font-semibold uppercase tracking-wider text-ink-3">{u.example}</div>
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-paper border-[1.5px] border-line p-3">
          <span className="text-4xl" aria-hidden="true">{a.e}</span>
          <div className="flex-1 min-w-0"><Tgt tl={tl} className="block text-xl font-semibold text-ink">{a.exT}</Tgt>{a.expr && <div className="text-sm text-brand-700" dir="auto">{a.expr}</div>}<div className="text-sm text-ink-2">{a.m}</div></div>
          <PlayPair say={a.exSay} tl={tl} u={u}/>
        </div></div>
      <button className="btn ghost sm self-start" onClick={() => go('write')}><I.pen className="w-4 h-4"/>{u.trace}</button>
    </div>
    <div className="lg:col-span-2 flex flex-wrap gap-2" dir={tdir(tl)}>
      {A.map((x, k) => <button key={k} onClick={() => { setI(k); Speech.say(x.nameSay, tl); }} className={`min-w-[52px] h-12 px-2 rounded-xl border-[1.5px] font-semibold transition ${k === i ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-line text-ink hover:border-brand-400'} ${tcls(tl)}`}>{x.letter.split(' ')[0]}</button>)}
    </div>
  </div>;
}

/* ---------- words ---------- */
function WordsTab({ lv }){
  const { u } = useApp(); const tl = lv.t; const [theme, setTheme] = useState(-1); const [mode, setMode] = useState('cards'); const weak = Store.weak(lv.tr + ':' + lv.L);
  const items = lv.vocab.filter((v) => theme < 0 || v.theme === theme);
  return <div>
    <H right={<Seg value={mode} onChange={setMode} options={[['cards', u.cards], ['flash', u.flash]]}/>}>{u.tabs.words} · {lv.vocab.length}</H>
    <div className="-mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
      <button className={`chip ${theme < 0 ? 'on' : ''}`} onClick={() => setTheme(-1)}>{u.all} · {lv.vocab.length}</button>
      {lv.themes.map((t, k) => <button key={k} className={`chip ${theme === k ? 'on' : ''}`} onClick={() => setTheme(k)}>{nt(t, lv.n)}</button>)}
    </div>
    {mode === 'flash' ? <Flash key={theme} items={items} lv={lv}/> :
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" data-words>
      {items.map((v) => <div key={v.id} className={`rounded-2xl bg-white border-[1.5px] p-4 flex flex-col items-center text-center gap-1.5 ${weak[v.id] ? 'border-[#F2B8BB]' : 'border-line'}`}>
        <div className="text-[2.6rem] leading-none my-1" aria-hidden="true">{v.e}</div>
        <Tgt tl={tl} className="text-lg font-bold text-ink break-words max-w-full">{v.t}</Tgt>
        {v.pr && <div className="text-xs text-brand-700 break-words max-w-full" dir="auto">{v.pr}</div>}
        <div className="text-sm text-ink-2 break-words max-w-full">{v.m}</div>
        <div className="mt-auto pt-1"><PlayPair say={v.say} tl={tl} u={u}/></div>
      </div>)}
    </div>}
  </div>;
}
function Flash({ items, lv }){
  const { u } = useApp(); const tl = lv.t; const [q, setQ] = useState(() => shuffle(items)); const [k, setK] = useState(0); const [flip, setFlip] = useState(false); const [known, setKnown] = useState(0);
  useEffect(() => { if (q[k]) Speech.say(q[k].say, tl); }, [k, q]);
  if (k >= q.length) return <div className="card p-8 max-w-md mx-auto text-center flex flex-col items-center gap-3"><div className="text-5xl">🎉</div><div className="text-2xl font-extrabold text-ink" dir="ltr">{known} / {q.length}</div><button className="btn" onClick={() => { setQ(shuffle(items)); setK(0); setKnown(0); setFlip(false); }}>{u.again}</button></div>;
  const v = q[k]; const ans = (ok) => { const w = Store.weak(lv.tr + ':' + lv.L); if (ok){ setKnown(known + 1); if (w[v.id]){ w[v.id]--; if (w[v.id] <= 0) delete w[v.id]; } } else w[v.id] = (w[v.id] || 0) + 1; Store.save(); setFlip(false); setK(k + 1); };
  return <div className="max-w-md mx-auto">
    <div className="text-center text-sm text-ink-3 mb-2" dir="ltr">{k + 1} / {q.length}</div>
    <Progress value={k / q.length * 100} className="mb-4"/>
    <motion.div key={v.id + flip} initial={{ rotateY: 70, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} className="card p-8 flex flex-col items-center gap-3 text-center min-h-[300px] justify-center">
      <div className="text-6xl" aria-hidden="true">{v.e}</div>
      <Tgt tl={tl} className="text-3xl font-extrabold text-ink">{v.t}</Tgt>
      <PlayPair say={v.say} tl={tl} u={u}/>
      {flip ? <>{v.pr && <div className="text-brand-700" dir="auto">{v.pr}</div>}<div className="text-xl text-ink-2">{v.m}</div></> : <button className="btn ghost" onClick={() => setFlip(true)}>{u.flip}</button>}
    </motion.div>
    <div className="mt-4 grid grid-cols-2 gap-3"><button className="btn ghost" onClick={() => ans(false)}><I.x className="w-4 h-4"/>{u.didnt}</button><button className="btn" onClick={() => ans(true)}><I.check className="w-4 h-4"/>{u.knew}</button></div>
  </div>;
}

/* ---------- sentence list ---------- */
export function SentList({ arr, lv, playing = -1 }){
  const { u } = useApp(); const tl = lv.t; const word = useWord(lv);
  return <div className="flex flex-col gap-2.5">{arr.map((s, k) => <div key={k} className={`rounded-2xl bg-white border-[1.5px] p-3.5 sm:p-4 flex gap-3 items-start transition ${playing === k ? 'border-brand-500 ring-4 ring-brand-500/10' : 'border-line'}`}>
    <div className="flex flex-col gap-1.5"><PlayBtn say={s.say} tl={tl} label={u.play}/><PlayBtn say={s.say} tl={tl} slow label={u.speed}/></div>
    <div className="flex-1 min-w-0"><Tgt tl={tl} className="block text-[1.12rem] font-semibold text-ink leading-relaxed"><Words src={s.src} tl={tl} ctx={s.m} onWord={(w, c) => word(w, c)}/></Tgt>
      {s.pr && <div className="text-sm text-brand-700 mt-0.5" dir="auto">{s.pr}</div>}<div className="text-[.95rem] text-ink-2 mt-1">{s.m}</div></div>
  </div>)}</div>;
}
function useChain(lv){ const [idx, setIdx] = useState(-1); const [on, setOn] = useState(false);
  useEffect(() => () => Speech.stop(), []);
  const run = async (arr, slow = false) => { if (on){ Speech.stop(); setOn(false); setIdx(-1); return; } setOn(true); await Speech.chain(arr.map((s) => ({ say: s.say, o: { slow } })), lv.t, (i, start) => { if (start){ setIdx(i); document.querySelector(`[data-chain="${i}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } }); setOn(false); setIdx(-1); };
  return { idx, on, run }; }
function Phrases({ lv }){ const { u } = useApp(); const ch = useChain(lv);
  return <div><H right={<button className="btn sm" onClick={() => ch.run(lv.sentences)}>{ch.on ? <><I.x className="w-4 h-4"/>{u.stop}</> : <><I.play className="w-4 h-4"/>{u.listenAll}</>}</button>}>{u.tabs.phrases} · {lv.sentences.length}</H>
    <div>{lv.sentences.length > 0 && <SentListChain arr={lv.sentences} lv={lv} playing={ch.idx}/>}</div></div>; }
function SentListChain(props){ return <div>{/* wrapper adds data-chain anchors */}<SentListAnchors {...props}/></div>; }
function SentListAnchors({ arr, lv, playing }){ return <div className="flex flex-col gap-2.5">{arr.map((s, k) => <div key={k} data-chain={k}><SentList arr={[s]} lv={lv} playing={playing === k ? 0 : -1}/></div>)}</div>; }

/* ---------- grammar ---------- */
function Grammar({ lv }){
  const { u } = useApp(); const tl = lv.t; const [open, setOpen] = useState(0);
  if (!lv.grammar.length) return <div className="card p-6 text-ink-2">—</div>;
  return <div className="flex flex-col gap-3">{lv.grammar.map((g, gi) => <div key={gi} className="card overflow-hidden" data-gram={gi}>
    <button className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-start" onClick={() => setOpen(open === gi ? -1 : gi)} aria-expanded={open === gi}>
      <span className="font-bold text-ink text-[1.05rem]">{g.title}</span><span className="text-xs font-semibold text-ink-3 shrink-0" dir="ltr">{gi + 1}/{lv.grammar.length} <span className="text-brand-600 text-base ms-1">{open === gi ? '−' : '+'}</span></span>
    </button>
    {open === gi && <div className="px-4 sm:px-5 pb-5 border-t border-line/70 pt-4">
      <Html className="gbody text-ink" html={bodyHTML(g.body, tl)} tl={tl}/>
      {g.ex.length > 0 && <><h3 className="mt-5 mb-3 font-bold text-ink">{u.examples}</h3><SentList arr={g.ex} lv={lv}/></>}
      {g.quiz.length > 0 && <><h3 className="mt-6 mb-3 font-bold text-ink">{u.checkUnd}</h3><div className="flex flex-col gap-3">{g.quiz.map((q, qi) => <MiniQ key={qi} q={q} tl={tl}/>)}</div></>}
    </div>}
  </div>)}</div>;
}
function MiniQ({ q, tl }){ const opts = useMemo(() => shuffle(q.opts.map((o, i) => ({ o, ok: i === 0 }))), [q]); const [pick, setPick] = useState(-1);
  return <div className="rounded-2xl bg-paper border-[1.5px] border-line p-4">
    <Html className="font-medium text-ink mb-3" html={bodyHTML(String(disp(q.q)).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])), tl).replace(/___/g, '<b>____</b>')} tl={tl}/>
    <div className="grid gap-2 sm:grid-cols-2">{opts.map((x, i) => <button key={i} disabled={pick >= 0} onClick={() => { setPick(i); if (x.ok) Speech.say(x.o, tl); }} className={`qopt ${pick >= 0 ? (x.ok ? 'right' : pick === i ? 'wrong' : '') : ''} ${tcls(tl)}`} dir={tdir(tl)}>{disp(x.o)}</button>)}</div>
  </div>; }

/* ---------- reading ---------- */
function Reading({ lv }){
  const { u } = useApp(); const tl = lv.t; const [ri, setRi] = useState(0); const [tr, setTr] = useState(false); const r = lv.readings[ri]; const ch = useChain(lv); const word = useWord(lv);
  if (!r) return <div className="card p-6 text-ink-2">—</div>;
  return <div>
    {lv.readings.length > 1 && <div className="-mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">{lv.readings.map((x, k) => <button key={k} className={`chip ${ri === k ? 'on' : ''}`} onClick={() => { Speech.stop(); setRi(k); }}><span className={tcls(tl)} dir={tdir(tl)}>{x.title}</span></button>)}</div>}
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div><Tgt tl={tl} as="h2" className="text-2xl font-extrabold text-ink">{r.title}</Tgt><div className="text-ink-2 text-sm mt-0.5">{r.tr}</div></div>
      <div className="flex flex-wrap gap-2"><button className="btn sm" onClick={() => ch.run(r.sents)}>{ch.on ? <><I.x className="w-4 h-4"/>{u.stop}</> : <><I.play className="w-4 h-4"/>{u.listenAll}</>}</button>
        <button className="btn ghost sm" onClick={() => ch.run(r.sents, true)} aria-label={u.speed}><I.slow className="w-4 h-4"/></button>
        <button className="btn ghost sm" onClick={() => setTr(!tr)}>{tr ? u.hideTr : u.showTr}</button></div>
    </div>
    <div className={`ruled ${tl === 'ar' ? 'ar' : ''} ${tl === 'zh' ? 'tgt-zh' : tl === 'ja' ? 'tgt-ja' : tl === 'ko' ? 'tgt-ko' : ''}`} dir={tdir(tl)} lang={tl}>
      {r.sents.map((s, k) => <React.Fragment key={k}><span data-chain={k} className={`sent ${ch.idx === k ? 'playing' : ''}`}><Words src={s.src} tl={tl} ctx={s.m} onWord={(w, c) => word(w, c, r.gloss)}/></span>{tl === 'zh' ? '' : ' '}{tr && <span className="trl" dir="auto">{s.m}</span>}</React.Fragment>)}
    </div>
    <p className="mt-3 text-sm text-ink-3">{u.tapHint}</p>
  </div>;
}

/* ---------- dialogues ---------- */
function Talk({ lv }){
  const { u } = useApp(); const tl = lv.t; const [di, setDi] = useState(0); const d = lv.dialogues[di]; const [act, setAct] = useState(-1); const [role, setRole] = useState(false); const [shown, setShown] = useState({}); const [turn, setTurn] = useState(false);
  const resolver = useRef(null); const word = useWord(lv); const [talking, setTalking] = useState('');
  useEffect(() => () => Speech.stop(), []);
  if (!d) return <div className="card p-6 text-ink-2">—</div>;
  const play = async (slow) => { Speech.stop(); const id = Speech.chainId; setShown({});
    for (let k = 0; k < d.lines.length; k++){ if (id !== Speech.chainId) break; const l = d.lines[k]; setAct(k); document.querySelector(`[data-line="${k}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      if (role && l.who === 'B'){ setTurn(true); await new Promise((r) => { resolver.current = r; }); setTurn(false); if (id !== Speech.chainId) break; setShown((s) => ({ ...s, [k]: true })); }
      setTalking(l.who); await Speech.speak(l.say, tl, { slow, alt: l.who === 'B' }); setTalking(''); await new Promise((r) => setTimeout(r, 450)); }
    setAct(-1); };
  const Av = ({ who }) => <div className={`flex flex-col items-center gap-1 ${talking === who ? 'talking' : ''}`}>
    <svg viewBox="0 0 80 80" className={`w-16 h-16 transition ${talking === who ? 'scale-110' : ''}`} aria-hidden="true"><circle cx="40" cy="40" r="38" fill={who === 'A' ? '#3F76FF' : '#0EA5A4'} opacity=".14"/><circle cx="40" cy="33" r="15" fill={who === 'A' ? '#3F76FF' : '#0EA5A4'}/><path d="M14 72c4-14 14-20 26-20s22 6 26 20" fill={who === 'A' ? '#3F76FF' : '#0EA5A4'}/><ellipse className="mouth" cx="40" cy="39" rx="4" ry="2" fill="#fff"/><circle cx="34.5" cy="31" r="1.8" fill="#fff"/><circle cx="45.5" cy="31" r="1.8" fill="#fff"/></svg>
    <span className="text-xs font-bold text-ink-2">{who === 'B' && role ? 'B · ' + u.you : who}</span></div>;
  return <div>
    {lv.dialogues.length > 1 && <div className="-mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">{lv.dialogues.map((x, k) => <button key={k} className={`chip ${di === k ? 'on' : ''}`} onClick={() => { Speech.stop(); setDi(k); setAct(-1); }}>{nt(x.title, lv.n)}</button>)}</div>}
    <H right={<><button className="btn sm" onClick={() => play(false)}><I.play className="w-4 h-4"/>{u.listenAll}</button><button className="btn ghost sm" onClick={() => play(true)} aria-label={u.speed}><I.slow className="w-4 h-4"/></button>
      <label className="chip cursor-pointer"><input type="checkbox" checked={role} onChange={(e) => { Speech.stop(); setRole(e.target.checked); setShown({}); }} className="accent-brand-500"/>{u.roleplay}</label></>}>{nt(d.title, lv.n)}</H>
    <div className="card p-4 sm:p-6">
      <div className="flex justify-between px-2 sm:px-8 mb-4" dir={tdir(tl)}><Av who="A"/><Av who="B"/></div>
      <div className="flex flex-col gap-3" dir={tdir(tl)}>
        {d.lines.map((l, k) => { const hide = role && l.who === 'B' && !shown[k]; return <div key={k} data-line={k} className={`flex items-start gap-2 ${l.who === 'B' ? 'flex-row-reverse' : ''}`}>
          <PlayBtn say={l.say} tl={tl} alt={l.who === 'B'} label={u.play}/>
          <div className={`bubble ${act === k ? 'active' : ''} ${hide ? 'hidden-line' : ''} ${l.who === 'B' ? '!bg-paper' : ''}`}>
            <Tgt tl={tl} className="bt block text-[1.08rem] font-semibold text-ink"><Words src={l.src} tl={tl} ctx={l.m} onWord={(w, c) => word(w, c)}/></Tgt>
            {l.pr && <div className="bt text-sm text-brand-700" dir="auto">{l.pr}</div>}
            <div className="text-sm text-ink-2 mt-0.5" dir="auto">{l.m}</div>
          </div></div>; })}
      </div>
      {turn && <div className="mt-4 rounded-2xl bg-brand-50 border-[1.5px] border-brand-200 p-4 flex flex-wrap items-center justify-between gap-3"><span className="text-ink">{u.yourTurn}</span><button className="btn sm" onClick={() => resolver.current && resolver.current()}>{u.next}</button></div>}
    </div>
  </div>;
}

/* ---------- exam ---------- */
export const KB = {
  ru: ['йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбюё'], en: ['qwertyuiop', 'asdfghjkl', "zxcvbnm'"],
  ar: ['ضصثقفغعهخحجد', 'شسيبلاتنمكط', 'ئءؤرىةوزظذ', 'أإآ'], uz: ['qwertyuiop', 'asdfghjkl', 'zxcvbnmʻʼ'], es: ['qwertyuiopáé', 'asdfghjklñíó', 'zxcvbnmúü¿¡'],
  zh: ['āáǎàēéěè', 'īíǐìōóǒò', 'ūúǔùǖǘǚǜ'],
  de: ['qwertzuiopü', 'asdfghjklöä', 'yxcvbnmß'], fr: ['azertyuiopéè', 'qsdfghjklmàù', 'wxcvbnçêâîôûëïœ'], it: ['qwertyuiopèé', 'asdfghjklòàù', 'zxcvbnmì'], tr: ['ertyuıopğü', 'asdfghjklşi', 'zcvbnmöç', 'qwx'],
  ja: ['あいうえおかきくけこ', 'さしすせそたちつてと', 'なにぬねのはひふへほ', 'まみむめもやゆよらりるれろ', 'わをんがぎぐげござじずぜぞ', 'だでどばびぶべぼぱぴぷぺぽ', 'ゃゅょっーアイウエオ']
};
export function Keyboard({ tl, onKey }){
  return <div className="kbd mt-3" dir={tdir(tl)}>{(KB[tl] || []).map((r, k) => <div key={k} className="krow">{[...r].map((c) => <button key={c} type="button" className={tcls(tl)} onClick={() => onKey(c)}>{c}</button>)}</div>)}
    <div className="krow"><button type="button" className="!min-w-[120px]" onClick={() => onKey(' ')}>␣</button><button type="button" className="!min-w-[64px]" onClick={() => onKey('BS')}>⌫</button></div></div>;
}
export const applyKey = (v, k) => k === 'BS' ? [...v].slice(0, -1).join('') : v + k;

function Exam({ lv }){
  const { u } = useApp(); const tl = lv.t; const key = lv.tr + ':' + lv.L; const [ex, setEx] = useState(null); const force = useForce(); const [kb, setKb] = useState(false); const [typed, setTyped] = useState('');
  const q = ex && !ex.done ? ex.qs[ex.i] : null;
  useEffect(() => { if (q && q.prompt && q.prompt.listen) { const t = setTimeout(() => Speech.say(q.prompt.listen, tl), 250); return () => clearTimeout(t); } }, [ex, ex && ex.i]);
  const start = () => { setEx(buildExam(lv)); setTyped(''); setKb(false); window.scrollTo({ top: 0 }); };
  if (!ex){ const best = Store.d.best[key]; const weak = Store.weak(key); const wl = [...lv.vocab, ...lv.sentences, ...(lv.alphabet || [])].filter((x) => weak[x.id]);
    return <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr] items-start">
      <div className="card p-6 sm:p-7 flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold text-ink">{u.examTitle} {lv.L}</h2><p className="text-ink-2 leading-relaxed">{u.examInfo}</p>
        <div className="grid grid-cols-3 gap-2">{[[EXAM_N, u.q], [PASS + '%', u.passMark], [best != null ? best + '%' : '—', u.best]].map(([v, l], k) => <div key={k} className="rounded-2xl bg-paper border-[1.5px] border-line p-3 text-center"><div className="text-2xl font-extrabold text-brand-600" dir="ltr">{v}</div><div className="text-xs text-ink-2 mt-1">{l}</div></div>)}</div>
        <button className="btn self-start" onClick={start} data-start-exam>{u.start}</button>
      </div>
      <div className="card p-6"><h3 className="font-bold text-ink mb-3">{u.weakN}: {wl.length}</h3>
        {wl.length ? <div className="flex flex-wrap gap-2">{wl.slice(0, 30).map((x) => <span key={x.id} className="chip !min-h-[34px]"><span className={tcls(tl)} dir={tdir(tl)}>{x.t || x.letter}</span><PlayBtn say={x.say || x.nameSay} tl={tl} className="!w-7 !h-7 [&>svg]:!w-3 [&>svg]:!h-3"/></span>)}</div> : <p className="text-ink-3">—</p>}</div>
    </div>; }
  if (ex.done) return <ExamResult lv={lv} ex={ex} start={start}/>;
  const answered = q.picked != null || q.given != null || q.result != null;
  const next = () => { ex.i++; setTyped(''); setKb(false); if (ex.i >= ex.qs.length) finishExam(lv, ex); force(); window.scrollTo({ top: 0 }); };
  const prompt = (p) => { if (p.listen != null) return <div className="flex items-center gap-3"><button className="grid place-items-center w-16 h-16 rounded-full bg-brand-500 text-white shadow-soft" onClick={() => Speech.say(p.listen, tl)} aria-label={u.play}><I.play className="w-7 h-7"/></button><PlayBtn say={p.listen} tl={tl} slow label={u.speed}/>{p.emo && <span className="text-5xl">{p.emo}</span>}</div>;
    if (p.gram != null) return <Html className="text-lg font-medium text-ink" html={bodyHTML(String(disp(p.gram)).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])), tl).replace(/___/g, '<b>____</b>')} tl={tl}/>;
    if (p.text != null) return <div className="flex items-center gap-3">{p.emo && <span className="text-5xl">{p.emo}</span>}<span className="text-2xl font-bold text-ink">{p.text}</span></div>;
    return <div className="flex items-center gap-3 flex-wrap"><Tgt tl={tl} className={`${p.small ? 'text-xl' : 'text-3xl'} font-extrabold text-ink`}>{p.word}</Tgt><PlayBtn say={p.say} tl={tl} label={u.play}/></div>; };
  let body;
  if (q.type === 'mcq') body = <><div className="mb-5">{prompt(q.prompt)}</div><div className="grid gap-2.5 sm:grid-cols-2">{q.opts.map((o, k) => <button key={k} data-opt={o.ok ? 1 : 0} disabled={q.picked != null}
    onClick={() => { q.picked = k; markAnswer(lv, q, o.ok); if (o.tgt) Speech.say(q.item.say || q.item.nameSay, tl); force(); }}
    className={`qopt ${q.picked != null ? (o.ok ? 'right' : q.picked === k ? 'wrong' : '') : ''}`} dir={o.tgt ? tdir(tl) : 'auto'}><span className={o.tgt ? tcls(tl) : ''}>{o.label}</span></button>)}</div></>;
  else if (q.type === 'spell') body = <><div className="mb-5">{prompt(q.prompt)}</div>
    <form onSubmit={(e) => { e.preventDefault(); if (q.given != null) return; q.given = typed; q.ok = checkTyped(typed, q.item, tl); markAnswer(lv, q, q.ok); force(); }}>
      <input className={`field text-lg ${tcls(tl)}`} dir={tdir(tl)} value={q.given != null ? q.given : typed} disabled={q.given != null} onChange={(e) => setTyped(e.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} lang={tl} aria-label={u.type} data-spell/>
      {q.given == null && <div className="mt-3 flex gap-2"><button className="btn">{u.check}</button>{KB[tl] && <button type="button" className="btn ghost sm" onClick={() => setKb(!kb)}><I.kb className="w-4 h-4"/>{u.showKb}</button>}</div>}
    </form>
    {q.given != null && <Feedback ok={q.ok} u={u} tl={tl} item={q.item}/>}{kb && q.given == null && <Keyboard tl={tl} onKey={(k) => setTyped(applyKey(typed, k))}/>}</>;
  else if (q.type === 'order'){ const used = new Set(q.chosen); body = <>
    <div className="text-ink-2 mb-3 text-lg" dir="auto">{q.item.m}</div>
    <div className="min-h-[60px] rounded-2xl border-[1.5px] border-dashed border-brand-300 bg-paper p-2.5 flex flex-wrap gap-2" dir={tdir(tl)}>{q.chosen.map((pi, k) => <button key={k} disabled={q.result != null} onClick={() => { q.chosen.splice(k, 1); force(); }} className={`px-3.5 py-2 rounded-xl bg-brand-500 text-white font-semibold ${tcls(tl)}`}>{q.pool[pi].w}</button>)}</div>
    <div className="mt-3 flex flex-wrap gap-2" dir={tdir(tl)}>{q.pool.map((p, pi) => used.has(pi) ? null : <button key={pi} data-pool disabled={q.result != null} onClick={() => { q.chosen.push(pi); force(); }} className={`px-3.5 py-2 rounded-xl bg-white border-[1.5px] border-line hover:border-brand-500 font-semibold text-ink ${tcls(tl)}`}>{p.w}</button>)}</div>
    {q.result == null && <div className="mt-4 flex gap-2"><button className="btn" data-check disabled={q.chosen.length !== q.pool.length} onClick={() => { const got = q.chosen.map((pi) => q.pool[pi].w).join(' '); q.result = norm(got, tl) === norm(q.words.join(' '), tl); markAnswer(lv, q, q.result); Speech.say(q.item.say, tl); force(); }}>{u.check}</button><button className="btn ghost sm" onClick={() => { q.chosen = []; force(); }}>{u.orderReset}</button></div>}
    {q.result != null && <Feedback ok={q.result} u={u} tl={tl} item={q.item}/>}</>; }
  return <div className="max-w-2xl mx-auto">
    <div className="flex items-center gap-3 mb-4"><span className="text-sm font-bold text-ink-2" dir="ltr">{ex.i + 1}/{ex.qs.length}</span><Progress value={ex.i / ex.qs.length * 100} className="flex-1"/></div>
    <motion.div key={ex.i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-5 sm:p-7" data-q={q.kind}>
      <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-4">{u[q.kind]}</div>{body}
      {answered && <div className="mt-6 flex justify-end"><button className="btn" onClick={next} data-next>{ex.i + 1 < ex.qs.length ? u.next : u.done}<I.next className="w-4 h-4 rtl:rotate-180"/></button></div>}
    </motion.div>
  </div>;
}
function Feedback({ ok, u, tl, item }){ return <div className={`mt-4 rounded-2xl p-3.5 border-[1.5px] ${ok ? 'bg-[#E8F7EF] border-[#9ED9BC] text-[#0E6B42]' : 'bg-[#FDECEC] border-[#F2B8BB] text-[#A3262C]'}`}>{ok ? u.correct : <>{u.wrongIs} <Tgt tl={tl} className="font-bold">{item.t}</Tgt></>}</div>; }
function ExamResult({ lv, ex, start }){
  const { u } = useApp(); const tl = lv.t; const right = ex.qs.filter((q) => q.correct).length; const pct = Math.round(right / ex.qs.length * 100); const pass = pct >= PASS; const i = LEVELS.indexOf(lv.L);
  const mist = ex.qs.filter((q) => !q.correct);
  const ansText = (q) => q.type === 'mcq' ? (q.opts[q.picked] || {}).label : q.type === 'spell' ? q.given : q.chosen.map((pi) => q.pool[pi].w).join(' ');
  const corr = (q) => q.type === 'mcq' ? q.opts.find((o) => o.ok) : { label: q.item.t, tgt: 1 };
  return <div className="max-w-2xl mx-auto flex flex-col gap-4">
    <div className="card p-7 text-center flex flex-col items-center gap-3" data-result={pct}>
      <motion.div initial={{ scale: .6 }} animate={{ scale: 1 }} className={`text-6xl font-extrabold ${pass ? 'text-[#14935B]' : 'text-[#D9363E]'}`} dir="ltr">{pct}%</motion.div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider border-2 ${pass ? 'border-[#14935B] text-[#14935B]' : 'border-[#D9363E] text-[#D9363E]'}`}>{pass ? 'PASS' : 'RETRY'} · {lv.L}</span>
      <p className="text-ink max-w-md">{pass ? u.passedMsg : u.failedMsg}</p>
      <div className="flex flex-wrap justify-center gap-2">{pass && i < 5 && <a className="btn" href={`#/learn/${lv.tr}/${LEVELS[i + 1].toLowerCase()}`}>{u.nextLevel} {LEVELS[i + 1]}</a>}<button className={`btn ${pass ? 'ghost' : ''}`} onClick={start}>{u.startNew}</button><a className="btn ghost" href={'#/learn/' + lv.tr}>{u.backLevels}</a></div>
    </div>
    <div className="card p-5 sm:p-6"><h3 className="font-bold text-ink mb-3">{u.review} · {mist.length}</h3>
      {mist.length ? <div className="flex flex-col gap-2.5">{mist.map((q, k) => { const c = corr(q); return <div key={k} className="rounded-2xl bg-paper border-[1.5px] border-line p-3.5 flex gap-3 items-start">
        <PlayBtn say={q.item.say || q.item.nameSay} tl={tl}/>
        <div className="min-w-0"><div className="text-xs text-ink-3">{u[q.kind]}{q.item.m ? ' · ' + q.item.m : ''}</div>
          <div className="text-[#A3262C] line-through decoration-1">{ansText(q) || '—'}</div>
          <div className={`text-[#0E6B42] font-bold ${c.tgt ? tcls(tl) : ''}`} dir="auto">{c.label}</div></div></div>; })}</div> : <p className="text-ink-2">{u.noMist}</p>}
    </div>
  </div>;
}
