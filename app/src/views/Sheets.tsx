// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Store, Speech, AUTO_LANGS, lookupWord, disp, track } from '@/core/engine';
import { useApp, useStore, Sheet, I, PlayPair, Tgt } from '@/ui/kit';

/* Slider + a clickable percentage that animates; each click lowers the value by one step and wraps to the top. */
export function PercentControl({ label, icon: Ic, value, min, max, step, onChange, hint }){
  const pct = Math.round(value * 100);
  const lower = () => { let v = Math.round((value - step) * 100) / 100; if (v < min - 1e-9) v = max; onChange(v); };
  return <div className="rounded-2xl bg-paper border-[1.5px] border-line p-4">
    <div className="flex items-center gap-3">
      <span className="grid place-items-center w-10 h-10 rounded-xl bg-white ring-1 ring-line text-brand-600"><Ic className="w-5 h-5"/></span>
      <span className="flex-1 font-semibold text-ink">{label}</span>
      <button type="button" onClick={lower} title={hint} aria-label={`${label}: ${pct}%`} data-pct={label}
        className="group inline-flex items-center rounded-xl bg-white border-[1.5px] border-line hover:border-brand-500 px-2.5 py-1 text-2xl font-extrabold text-brand-600 tabular-nums select-none" dir="ltr">
        <AnimatedNumber value={pct}/><span className="text-lg ms-0.5">%</span>
      </button>
    </div>
    <input type="range" className="mt-3 w-full accent-[#3F76FF]" min={min} max={max} step={0.01} value={value} onChange={(e) => onChange(+e.target.value)} aria-label={label}/>
    <div className="mt-1 text-xs text-ink-3">{hint}</div>
  </div>;
}

export function AudioSheet({ open, onClose, tl }){
  useStore(); const { u } = useApp(); const st = Store.d.settings; const [, rf] = useState(0);
  useEffect(() => { if (open) Speech.init(() => rf((x) => x + 1)); }, [open]);
  const set = (k, v) => { st[k] = v; Store.save(); };
  const vs = tl ? Speech.list(tl) : []; const curSel = tl ? (st.voice[tl] || (AUTO_LANGS.includes(tl) ? 'auto' : 'lisan')) : 'lisan';
  const sample = { ar: 'مَرْحَبًا', ru: 'Здравствуйте', en: 'Hello', uz: 'Salom', es: 'Hola', zh: '你好' }[tl || 'en'];
  return <Sheet open={open} onClose={onClose} dir={u.dir}>
    <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-extrabold text-ink">{u.audio}</h2><button className="iconbtn" onClick={onClose} aria-label={u.close}><I.x/></button></div>
    <div className="flex flex-col gap-3">
      {tl && <label className="block"><span className="text-sm font-semibold text-ink">{u.voice}</span>
        <select className="field mt-1.5" value={curSel} onChange={(e) => { st.voice[tl] = e.target.value; Store.save(); }}>
          {AUTO_LANGS.includes(tl) && <option value="auto">{u.autoVoice}</option>}
          <option value="lisan">{u.lisanVoice}</option>
          {vs.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{u.deviceVoice}: {v.name} ({v.lang})</option>)}
        </select></label>}
      <PercentControl label={u.volume} icon={I.vol} value={st.volume == null ? 1 : st.volume} min={0} max={1} step={0.1} onChange={(v) => set('volume', Math.max(0, Math.min(1, v)))} hint={u.pctHint}/>
      <PercentControl label={u.speed} icon={I.speed} value={st.rate || 1} min={0.5} max={1.5} step={0.1} onChange={(v) => set('rate', Math.max(0.5, Math.min(1.5, v)))} hint={u.pctHint}/>
      <div className="flex gap-2">{tl && <button className="btn" onClick={() => Speech.say(sample, tl)}><I.play className="w-4 h-4"/>{u.test}</button>}<button className="btn ghost" onClick={onClose}>{u.close}</button></div>
      <p className="text-xs text-ink-3 leading-relaxed">{u.audioNote}</p>
      {tl === 'uz' && <p className="text-xs text-ink-3 leading-relaxed">{u.uzNote}</p>}
    </div>
  </Sheet>;
}

export function WordSheet({ data, onClose }){
  const { u } = useApp(); const [info, setInfo] = useState(null);
  useEffect(() => { if (!data) { setInfo(null); return; } const T = track(data.tr); const r = lookupWord(data.tr, data.raw, data.gloss); setInfo({ ...r, tl: T.t }); Speech.say(r.say, T.t); }, [data]);
  const open = !!(data && info);
  return <Sheet open={open} onClose={onClose} dir={u.dir}>{open && <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3 flex-wrap">{info.v && info.v.e && <span className="text-4xl" aria-hidden="true">{info.v.e}</span>}<Tgt tl={info.tl} className="text-3xl font-extrabold text-ink">{disp(data.raw)}</Tgt><span className="flex-1"/><PlayPair say={info.say} tl={info.tl} u={u}/></div>
    {info.pr && <div><div className="text-xs font-semibold uppercase tracking-wider text-ink-3">{u.pron}</div><div className="text-lg text-brand-700" dir="auto">{info.pr}</div></div>}
    <div><div className="text-xs font-semibold uppercase tracking-wider text-ink-3">{u.meaning}</div>
      <div className="text-xl text-ink mt-0.5">{info.m ? info.m : <><span className="text-ink-3 text-base">{u.notFound}</span><div className="text-base text-ink-2 mt-1">{data.ctxM}</div></>}</div></div>
    <button className="btn ghost" onClick={onClose}>{u.close}</button>
  </div>}</Sheet>;
}
