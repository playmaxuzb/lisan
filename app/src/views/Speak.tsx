// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Speech, shuffle, disp } from '@/core/engine';
import { canListen, listen, grade, stopListen } from '@/core/listen';
import { skill } from '@/core/activity';
import { useApp, I, PlayBtn, Tgt, Seg, Progress, ReportBtn, tcls, tdir } from '@/ui/kit';

const tone = (s) => s >= 85 ? 'text-[#14935B]' : s >= 60 ? 'text-[#B07A10]' : 'text-[#D9363E]';
/* one big microphone button + result for a target phrase */
export function MicCheck({ say, tl, onResult = null, compact = false }){
  const { u } = useApp(); const x = u.x; const [st, setSt] = useState('idle'); const [res, setRes] = useState(null); const [err, setErr] = useState('');
  useEffect(() => { setRes(null); setErr(''); setSt('idle'); return () => stopListen(); }, [say]);
  if (!canListen()) return <div className="rounded-2xl bg-[#FFF8E6] border-[1.5px] border-[#E7C976] p-3.5 text-sm text-[#6B4E0A]" data-nomic>{x.noMic}</div>;
  const go = async () => { if (st === 'rec'){ stopListen(); return; } Speech.stop(); setErr(''); setSt('rec');
    const r = await listen(tl, {}); setSt('idle');
    if (r.error){ setErr(r.error === 'denied' ? x.micDenied : r.error === 'nospeech' ? x.nothing : r.error === 'unsupported' ? x.noMic : x.micErr); return; }
    const g = grade(say, r.alts, tl); setRes(g); onResult && onResult(g); };
  return <div className="flex flex-col items-center gap-3">
    <button type="button" onClick={go} data-mic className={`relative grid place-items-center ${compact ? 'w-14 h-14' : 'w-20 h-20'} rounded-full text-white shadow-soft transition ${st === 'rec' ? 'bg-[#D9363E] scale-105' : 'bg-brand-500 hover:bg-brand-600'}`} aria-label={x.tapMic}>
      {st === 'rec' && <span className="absolute inset-0 rounded-full bg-[#D9363E]/40 animate-ping"/>}<I.mic className={compact ? 'w-6 h-6 relative' : 'w-8 h-8 relative'}/></button>
    <div className="text-sm font-semibold text-ink-2">{st === 'rec' ? x.listening : res ? x.tryAgain : x.tapMic}</div>
    {err && <div className="text-sm text-[#A3262C] text-center max-w-sm" dir="auto">{err}</div>}
    {res && <div className="w-full rounded-2xl bg-paper border-[1.5px] border-line p-4 flex flex-col items-center gap-2 text-center" data-speak-result={res.score}>
      <div className={`text-4xl font-extrabold ${tone(res.score)}`} dir="ltr">{res.score}%</div>
      <div className={`${tcls(tl)} text-xl font-bold flex flex-wrap justify-center gap-x-2 gap-y-1`} dir={tdir(tl)}>{res.marks.map((m, i) => <span key={i} className={m.ok ? 'text-[#14935B]' : 'text-[#D9363E] underline decoration-2 underline-offset-4'}>{m.w}</span>)}</div>
      <div className="text-sm text-ink-2">{res.score >= 85 ? x.perfect : res.score >= 60 ? x.almost : x.retry}</div>
      {res.heard && <div className="text-xs text-ink-3"><span>{x.heard}: </span><span className={tcls(tl)} dir={tdir(tl)}>{res.heard}</span></div>}
    </div>}
  </div>;
}

export function SpeakTab({ lv }){
  const { u } = useApp(); const x = u.x; const tl = lv.t; const [mode, setMode] = useState('words'); const [seed, setSeed] = useState(0);
  const q = useMemo(() => { const w = lv.vocab.map((v) => ({ ...v, k: 'v' })); const s = lv.sentences.filter((s) => s.say.length < 90).map((s) => ({ ...s, k: 's' }));
    const pool = mode === 'words' ? w : mode === 'phrases' ? s : [...w, ...s]; return shuffle(pool).slice(0, 10); }, [lv, mode, seed]);
  const [i, setI] = useState(0); const [scores, setScores] = useState({}); const first = useRef({});
  useEffect(() => { setI(0); setScores({}); first.current = {}; }, [q]);
  useEffect(() => { const it = q[i]; if (it){ const t = setTimeout(() => Speech.say(it.say, tl), 300); return () => clearTimeout(t); } }, [i, q]);
  const it = q[i];
  const onRes = (g) => { setScores((s) => ({ ...s, [i]: Math.max(s[i] || 0, g.score) })); if (!first.current[i]){ first.current[i] = 1; skill(lv.tr, 'speak', g.score >= 80); } };
  const head = <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg sm:text-xl font-extrabold text-ink">{x.speakT}</h2><p className="text-sm text-ink-2 max-w-2xl">{x.speakD}</p></div>
    <Seg value={mode} onChange={(m) => { setMode(m); }} options={[['words', x.sWords], ['phrases', x.sPhrases], ['mix', x.sMix]]}/></div>;
  if (!it){ const vals = Object.values(scores); const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / q.length) : 0;
    return <div>{head}<div className="card p-8 max-w-md mx-auto text-center flex flex-col items-center gap-3"><div className="text-5xl">🎙️</div><div className="text-sm text-ink-2">{x.avg}</div><div className={`text-4xl font-extrabold ${tone(avg)}`} dir="ltr">{avg}%</div>
      <button className="btn" onClick={() => setSeed(seed + 1)}>{u.again}</button></div></div>; }
  return <div>{head}
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-4"><span className="text-sm font-bold text-ink-2" dir="ltr">{i + 1}/{q.length}</span><Progress value={i / q.length * 100} className="flex-1"/></div>
      <motion.div key={i + ':' + seed} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-5 sm:p-7 flex flex-col items-center gap-3 text-center" data-speak-card>
        <div className="self-end -mb-3"><ReportBtn data={{ tr: lv.tr, L: lv.L, kind: it.k, id: it.id, src: it.src, m: it.m, tl, e: it.e, say: it.say }}/></div>
        {it.e && <div className="text-5xl" aria-hidden="true">{it.e}</div>}
        <Tgt tl={tl} className={`${it.k === 's' ? 'text-2xl' : 'text-3xl'} font-extrabold text-ink`}>{it.t}</Tgt>
        {it.pr && <div className="text-brand-700" dir="auto">{it.pr}</div>}
        <div className="text-ink-2">{it.m}</div>
        <div className="flex gap-2"><PlayBtn say={it.say} tl={tl} label={u.play}/><PlayBtn say={it.say} tl={tl} slow label={u.speed}/></div>
        <div className="w-full mt-2"><MicCheck say={it.say} tl={tl} onResult={onRes}/></div>
      </motion.div>
      <div className="mt-4 flex justify-between gap-2"><button className="btn ghost sm" disabled={i === 0} onClick={() => setI(i - 1)}><I.back className="w-4 h-4 rtl:rotate-180"/>{u.prev}</button>
        <button className="btn sm" onClick={() => setI(i + 1)} data-speak-next>{scores[i] != null ? u.next : x.skip}<I.next className="w-4 h-4 rtl:rotate-180"/></button></div>
    </div>
  </div>;
}
