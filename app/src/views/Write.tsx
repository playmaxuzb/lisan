// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LineHoverLink } from '@/components/ui/line-hover-link';
import { Store, Speech, checkTyped, norm } from '@/core/engine';
import { useApp, useStore, I, PlayPair, Tgt, Seg, tcls, tdir } from '@/ui/kit';
import { Keyboard, KB, applyKey } from '@/views/Level';

/* Writing styles per script. The label is drawn in the font itself. */
const FONTS = {
  ar: [['Amiri', 'نسخ', 'Amiri:wght@400;700'], ['Aref Ruqaa', 'رقعة', 'Aref+Ruqaa:wght@400;700'], ['Reem Kufi', 'كوفي', 'Reem+Kufi:wght@400;600'], ['IBM Plex Sans Arabic', 'حديث', 'IBM+Plex+Sans+Arabic:wght@500']],
  zh: [['Noto Sans SC', '黑体', 'Noto+Sans+SC:wght@500'], ['Noto Serif SC', '宋体', 'Noto+Serif+SC:wght@500'], ['Ma Shan Zheng', '楷书', 'Ma+Shan+Zheng'], ['Long Cang', '行书', 'Long+Cang']],
  ja: [['Noto Sans JP', 'ゴシック', 'Noto+Sans+JP:wght@500'], ['Noto Serif JP', '明朝', 'Noto+Serif+JP:wght@500'], ['Klee One', '教科書体', 'Klee+One:wght@600'], ['Yomogi', '手書き', 'Yomogi']],
  ko: [['Noto Sans KR', '고딕', 'Noto+Sans+KR:wght@500'], ['Noto Serif KR', '명조', 'Noto+Serif+KR:wght@500'], ['Nanum Pen Script', '손글씨', 'Nanum+Pen+Script'], ['Gowun Batang', '바탕', 'Gowun+Batang']],
  ru: [['Lora', 'Lora', 'Lora:wght@500'], ['Inter', 'Inter', 'Inter:wght@500'], ['Marck Script', 'Прописи', 'Marck+Script'], ['Caveat', 'Caveat', 'Caveat:wght@500']],
  lat: [['Lora', 'Lora', 'Lora:wght@500'], ['Inter', 'Inter', 'Inter:wght@500'], ['Caveat', 'Caveat', 'Caveat:wght@500'], ['Dancing Script', 'Dancing', 'Dancing+Script:wght@500']],
};
const VARIANTS = ['slide', 'grow', 'scribble', 'arc'];
export const fontsFor = (tl) => FONTS[tl] || FONTS.lat;
const loaded = new Set();
function loadFont(spec){ if (loaded.has(spec)) return; loaded.add(spec); const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=' + spec + '&display=swap'; document.head.appendChild(l); }

export function WriteTab({ lv }){
  const { u } = useApp(); const [mode, setMode] = useState('trace');
  return <div>
    <div className="mb-4"><Seg value={mode} onChange={setMode} options={[['trace', u.trace], ['dict', u.dict], ['copy', u.copy]]}/></div>
    {mode === 'trace' ? <Trace lv={lv}/> : mode === 'dict' ? <Typing lv={lv} kind="dict"/> : <Typing lv={lv} kind="copy"/>}
  </div>;
}

function FontPicker({ tl }){
  useStore(); const { u } = useApp(); const F = fontsFor(tl); const st = Store.d.settings; const cur = (st.font && st.font[tl]) || F[0][0];
  useEffect(() => { F.forEach((f) => loadFont(f[2])); }, [tl]);
  return <div className="rounded-2xl bg-paper border-[1.5px] border-line p-4 self-start">
    <div className="text-sm font-bold text-ink">{u.font}</div><div className="text-xs text-ink-2">{u.fontD}</div>
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3" role="radiogroup" aria-label={u.font}>
      {F.map(([fam, label], k) => <LineHoverLink key={fam} variant={VARIANTS[k % VARIANTS.length]} role="radio" aria-checked={cur === fam} tabIndex={0}
        onClick={(e) => { e.preventDefault(); st.font = Object.assign({}, st.font, { [tl]: fam }); Store.save(); }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); st.font = Object.assign({}, st.font, { [tl]: fam }); Store.save(); } }}
        className={`text-2xl leading-tight pb-1 ${cur === fam ? 'text-brand-600 font-semibold' : 'text-ink-2 hover:text-ink'}`} style={{ fontFamily: `"${fam}"`, color: cur === fam ? '#2A5EEB' : '#4A5677' }} dir={tdir(tl)}>
        {label}{cur === fam && <span className="ms-1.5 text-xs align-top">●</span>}
      </LineHoverLink>)}
    </div>
  </div>;
}

function writeItems(lv){
  const tl = lv.t;
  if (tl === 'zh') return lv.vocab.filter((v) => v.say.length <= 2).map((v) => ({ text: v.say, say: v.say, m: v.m, pr: v.pr }));
  if (tl === 'ja' || tl === 'ko'){ const A = (lv.alphabet || []).map((a) => ({ text: a.letter, say: a.nameSay, m: a.name })); return A.concat(lv.vocab.filter((v) => v.say.replace(/\s/g, '').length <= (tl === 'ja' ? 2 : 3)).map((v) => ({ text: v.t, say: v.say, m: v.m, pr: v.pr }))); }
  if (lv.alphabet) return lv.alphabet.map((a) => ({ text: a.letter.replace(' ', tl === 'ar' ? ' ' : ''), say: a.nameSay, m: a.name }));
  return lv.vocab.filter((v) => v.say.length <= 14).map((v) => ({ text: v.t, say: v.say, m: v.m, pr: v.pr }));
}

function Trace({ lv }){
  useStore(); const { u } = useApp(); const tl = lv.t; const items = useMemo(() => writeItems(lv), [lv]); const [i, setI] = useState(0); const it = items[i % items.length];
  const font = (Store.d.settings.font && Store.d.settings.font[tl]) || fontsFor(tl)[0][0];
  const cv = useRef(null); const strokes = useRef([]); const cur = useRef(null);
  const draw = () => { const c = cv.current; if (!c) return; const dpr = devicePixelRatio || 1; const w = c.clientWidth, h = c.clientHeight;
    if (c.width !== Math.round(w * dpr)){ c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h); g.fillStyle = '#fff'; g.fillRect(0, 0, w, h);
    const base = h * .7, top = h * .2, mid = (base + top) / 2; g.strokeStyle = '#C9DAFF'; g.lineWidth = 1;
    if (tl === 'zh' || tl === 'ja' || tl === 'ko'){ const s = Math.min(h * .78, w * .9); const x0 = (w - s) / 2, y0 = (h - s) / 2; g.strokeRect(x0, y0, s, s); g.setLineDash([6, 6]); g.beginPath(); g.moveTo(x0, y0 + s / 2); g.lineTo(x0 + s, y0 + s / 2); g.moveTo(x0 + s / 2, y0); g.lineTo(x0 + s / 2, y0 + s); g.moveTo(x0, y0); g.lineTo(x0 + s, y0 + s); g.moveTo(x0 + s, y0); g.lineTo(x0, y0 + s); g.stroke(); g.setLineDash([]); }
    else { [top, base].forEach((y) => { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }); g.setLineDash([6, 6]); g.beginPath(); g.moveTo(0, mid); g.lineTo(w, mid); g.stroke(); g.setLineDash([]); }
    const box = tl === 'zh' || tl === 'ja' || tl === 'ko';
    let size = box ? Math.min(h * .62, (w * .85) / Math.max(1, it.text.length)) : h * .5; g.font = `${size}px "${font}"`; let tw = g.measureText(it.text).width; if (tw > w - 60){ size = size * (w - 60) / tw; g.font = `${size}px "${font}"`; }
    g.direction = tl === 'ar' ? 'rtl' : 'ltr'; g.textAlign = 'center'; g.textBaseline = box ? 'middle' : 'alphabetic'; g.fillStyle = '#C2D6FF'; g.fillText(it.text, w / 2, box ? h / 2 : base);
    g.strokeStyle = '#2A5EEB'; g.lineWidth = Math.max(4, h / 42); g.lineCap = 'round'; g.lineJoin = 'round';
    strokes.current.forEach((s) => { g.beginPath(); s.forEach((p, k) => k ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); if (s.length === 1) g.lineTo(s[0][0] + .1, s[0][1]); g.stroke(); }); };
  useEffect(() => { strokes.current = []; draw(); const f = () => draw(); addEventListener('resize', f);
    if (document.fonts && document.fonts.load) document.fonts.load(`40px "${font}"`, it.text).then(draw).catch(() => {}); return () => removeEventListener('resize', f); }, [i, font, lv]);
  const pos = (e) => { const r = cv.current.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  return <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
    <div className="card p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3"><PlayPair say={it.say} tl={tl} u={u}/><div className="flex-1 min-w-0 px-2"><Tgt tl={tl} className="font-bold text-ink">{it.text}</Tgt>{it.pr && <span className="text-sm text-brand-700 ms-2">{it.pr}</span>}<div className="text-sm text-ink-2 truncate">{it.m}</div></div><span className="text-sm text-ink-3 font-semibold" dir="ltr">{i % items.length + 1}/{items.length}</span></div>
      <canvas ref={cv} className="w-full h-[260px] sm:h-[320px] rounded-2xl border-[1.5px] border-line touch-none cursor-crosshair" aria-label={u.trace}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); cur.current = [pos(e)]; strokes.current.push(cur.current); draw(); }}
        onPointerMove={(e) => { if (!cur.current) return; cur.current.push(pos(e)); draw(); }}
        onPointerUp={() => { cur.current = null; }} onPointerCancel={() => { cur.current = null; }}/>
      <div className="mt-3 flex items-center justify-between gap-2">
        <button className="btn ghost sm" onClick={() => setI((i - 1 + items.length) % items.length)}><I.back className="w-4 h-4 rtl:rotate-180"/>{u.prev}</button>
        <button className="btn soft sm" onClick={() => { strokes.current = []; draw(); }}>{u.clear}</button>
        <button className="btn sm" onClick={() => { setI((i + 1) % items.length); Speech.say(items[(i + 1) % items.length].say, tl); }}>{u.next}<I.next className="w-4 h-4 rtl:rotate-180"/></button>
      </div>
    </div>
    <FontPicker tl={tl}/>
  </div>;
}

function Typing({ lv, kind }){
  const { u } = useApp(); const tl = lv.t;
  const items = useMemo(() => kind === 'dict' ? lv.vocab.filter((v) => (tl === 'zh' || tl === 'ja') ? v.say.length <= 4 : v.say.length <= 24) : lv.sentences, [lv, kind]);
  const [i, setI] = useState(0); const [val, setVal] = useState(''); const [res, setRes] = useState(null); const [kb, setKb] = useState(false); const it = items[i % items.length];
  useEffect(() => { if (kind === 'dict') { const t = setTimeout(() => Speech.say(it.say, tl), 200); return () => clearTimeout(t); } }, [i]);
  const check = (e) => { e.preventDefault(); setRes(checkTyped(val, it, tl)); if (kind === 'copy') Speech.say(it.say, tl); };
  const next = () => { setI(i + 1); setVal(''); setRes(null); };
  return <div className="card p-5 sm:p-6 max-w-2xl">
    {kind === 'dict' ? <div className="flex items-center gap-3 mb-4">
        <button className="grid place-items-center w-16 h-16 rounded-full bg-brand-500 text-white shadow-soft" onClick={() => Speech.say(it.say, tl)} aria-label={u.play}><I.play className="w-7 h-7"/></button>
        <PlayPair say={it.say} tl={tl} u={u}/><span className="text-5xl" aria-hidden="true">{it.e}</span><span className="flex-1"/><span className="text-sm text-ink-3 font-semibold" dir="ltr">{i % items.length + 1}/{items.length}</span></div>
      : <div className="mb-4"><p className="text-sm text-ink-2 mb-2">{u.copyHint}</p><div className="rounded-2xl bg-paper border-[1.5px] border-line p-4"><Tgt tl={tl} className="block text-xl font-semibold text-ink leading-relaxed">{it.t}</Tgt>{it.pr && <div className="text-sm text-brand-700">{it.pr}</div>}<div className="text-ink-2 mt-1">{it.m}</div><div className="mt-2 flex items-center gap-2"><PlayPair say={it.say} tl={tl} u={u}/><span className="flex-1"/><span className="text-sm text-ink-3 font-semibold" dir="ltr">{i % items.length + 1}/{items.length}</span></div></div></div>}
    {kind === 'dict' && <label className="block text-sm text-ink-2 mb-1.5">{u.type}</label>}
    <form onSubmit={check}>
      <input className={`field text-lg ${tcls(tl)}`} dir={tdir(tl)} lang={tl} value={val} onChange={(e) => { setVal(e.target.value); setRes(null); }} autoComplete="off" autoCapitalize="off" spellCheck={false}/>
      <div className="mt-3 flex flex-wrap gap-2"><button className="btn">{u.check}</button><button type="button" className="btn ghost" onClick={next}>{u.next}</button>{KB[tl] && <button type="button" className="btn ghost sm" onClick={() => setKb(!kb)}><I.kb className="w-4 h-4"/>{u.showKb}</button>}</div>
    </form>
    {res != null && <div className={`mt-4 rounded-2xl p-3.5 border-[1.5px] ${res ? 'bg-[#E8F7EF] border-[#9ED9BC] text-[#0E6B42]' : 'bg-[#FDECEC] border-[#F2B8BB] text-[#A3262C]'}`}>{res ? u.correct : <>{u.wrongIs} <Tgt tl={tl} className="font-bold">{it.t}</Tgt>{kind === 'dict' && <span className="text-ink-2"> — {it.m}</span>}</>}</div>}
    {kb && <Keyboard tl={tl} onKey={(k) => setVal(applyKey(val, k))}/>}
  </div>;
}
