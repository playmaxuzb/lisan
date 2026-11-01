// @ts-nocheck
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Store, Speech, disp, sayOf, zhc } from '@/core/engine';
import { u as strings } from '@/core/i18n';

/* ---------- app context ---------- */
export const Ctx = createContext<any>(null);
export const useApp = () => useContext(Ctx);
export function useStore(){ const [, f] = useReducer(x => x + 1, 0); useEffect(() => { Store.listeners.add(f); return () => { Store.listeners.delete(f); }; }, []); return Store; }
export function useForce(){ const [, f] = useReducer(x => x + 1, 0); return f; }
export const S = (l: string) => strings(l);

/* ---------- icons ---------- */
const P = (d, extra = {}) => (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{d}</svg>;
export const I = {
  play: P(<path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none"/>),
  slow: P(<><path d="M3 15c0-4 3.5-7 8-7 3.6 0 6 2 7 4.5"/><path d="M18 12.5c1.6 0 3 1 3 2.5H3"/><circle cx="8" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></>),
  vol: P(<><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></>),
  back: P(<path d="M15 5l-7 7 7 7"/>),
  next: P(<path d="M9 5l7 7-7 7"/>),
  lock: P(<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
  check: P(<path d="M5 12.5l4.5 4.5L19 7.5"/>),
  x: P(<path d="M6 6l12 12M18 6L6 18"/>),
  user: P(<><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></>),
  mail: P(<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 7 8.5-7"/></>),
  phone: P(<><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></>),
  camera: P(<><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></>),
  globe: P(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/></>),
  listen: P(<><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/></>),
  tap: P(<><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M12 10.5V9a1.5 1.5 0 0 1 3 0v2"/><path d="M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.5a6 6 0 0 1-4.6-2.2L4.5 15.5a1.6 1.6 0 0 1 2.4-2.1L9 15"/></>),
  pen: P(<><path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z"/><path d="M14 7l3 3"/></>),
  exam: P(<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></>),
  logout: P(<><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 16l-4-4 4-4M6 12h10"/></>),
  edit: P(<><path d="M4 20h4l11-11-4-4L4 16z"/></>),
  star: P(<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>),
  grid: P(<><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></>),
  cards: P(<><rect x="6" y="3" width="12" height="16" rx="2"/><path d="M3 7v12a2 2 0 0 0 2 2h10"/></>),
  kb: P(<><rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></>),
  speed: P(<><path d="M12 13l4-4"/><path d="M4.2 17a9 9 0 1 1 15.6 0"/></>),
  google: (p) => <svg viewBox="0 0 48 48" aria-hidden="true" {...p}><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>,
};

/* ---------- logo ---------- */
export function Logo({ small = false }){
  return <span className="inline-flex items-center gap-2 select-none" dir="ltr">
    <span className={`grid place-items-center rounded-xl bg-brand-500 text-white font-bold shadow-soft ${small ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg'}`}>L</span>
    <span className={`font-extrabold tracking-tight text-ink ${small ? 'text-lg' : 'text-xl'}`}>Lisan<span className="text-brand-500 font-semibold ms-1.5" style={{ fontFamily: '"IBM Plex Sans Arabic"' }}>لِسان</span></span>
  </span>;
}

/* ---------- audio buttons ---------- */
export function PlayBtn({ say, tl, slow = false, alt = false, label = '', className = '' }){
  const [on, setOn] = useState(false);
  if (!say) return null;
  const go = async (e) => { e.stopPropagation(); setOn(true); await Speech.say(say, tl, { slow, alt }); setOn(false); };
  return <button type="button" className={`iconbtn ${on ? 'speaking' : ''} ${className}`} onClick={go} aria-label={label || say}>{slow ? <I.slow/> : <I.play/>}</button>;
}
export function PlayPair({ say, tl, u }){ return <span className="inline-flex gap-1.5"><PlayBtn say={say} tl={tl} label={u.play}/><PlayBtn say={say} tl={tl} slow label={u.speed}/></span>; }

/* ---------- target-language text ---------- */
export const tcls = (tl) => tl === 'ar' ? 'tgt tgt-ar' : tl === 'zh' ? 'tgt tgt-zh' : tl === 'ja' ? 'tgt tgt-ja' : tl === 'ko' ? 'tgt tgt-ko' : 'tgt';
export const tdir = (tl) => tl === 'ar' ? 'rtl' : 'ltr';
export function Tgt({ tl, children, className = '', as: As = 'span', ...r }){ return <As className={`${tcls(tl)} ${className}`} dir={tdir(tl)} lang={tl} {...r}>{children}</As>; }

/* clickable words */
const WRE = /([\p{L}\p{M}+'’́ʻʼ]+(?:-[\p{L}\p{M}+́ʻʼ]+)*)/gu;
export function Words({ src, tl, ctx, onWord }){
  if (tl === 'zh' || tl === 'ja'){
    const parts = String(src).split(/(\s+)/);
    return <>{parts.map((p, i) => /^\s+$/.test(p) ? null : /[\p{L}\p{N}]/u.test(p)
      ? <span key={i} className="w" onClick={(e) => { e.stopPropagation(); onWord(p, ctx); }}>{p}</span> : <span key={i}>{p}</span>)}</>;
  }
  const parts = String(src).split(WRE);
  return <>{parts.map((p, i) => i % 2 ? <span key={i} className="w" onClick={(e) => { e.stopPropagation(); onWord(p, ctx); }}>{disp(p)}</span> : <React.Fragment key={i}>{p}</React.Fragment>)}</>;
}

/* grammar / quiz html with [[target]] spans */
export function bodyHTML(html, tl){
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  return String(html).replace(/\[\[(.+?)\]\]/g, (m, x) => `<span class="say ${tcls(tl)}" dir="${tdir(tl)}" data-say="${esc(sayOf(x))}">${esc(disp(x))}</span>`)
    .replace(/<table>/g, '<div class="tblwrap"><table>').replace(/<\/table>/g, '</table></div>');
}
export function Html({ html, tl, className = '', as: As = 'div' }){
  return <As className={className} dir="auto" onClick={(e) => { const t = e.target.closest('[data-say]'); if (t) Speech.say(t.dataset.say, tl); }} dangerouslySetInnerHTML={{ __html: html }}/>;
}

/* ---------- sheet (bottom drawer / dialog) ---------- */
export function Sheet({ open, onClose, children, dir = 'ltr', wide = false }){
  useEffect(() => { if (!open) return; const k = (e) => { if (e.key === 'Escape') onClose(); }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, [open]);
  return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={onClose}/>
    <motion.div role="dialog" aria-modal="true" dir={dir} className={`relative w-full ${wide ? 'sm:max-w-2xl' : 'sm:max-w-lg'} max-h-[88vh] overflow-y-auto bg-white border-[1.5px] border-line rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-card`}
      initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
      <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line sm:hidden"/>
      {children}
    </motion.div></motion.div>}</AnimatePresence>;
}

/* ---------- toast ---------- */
export function Toasts({ list }){
  return <div className="fixed bottom-5 inset-x-0 z-[60] flex flex-col items-center gap-2 pointer-events-none px-4">
    <AnimatePresence>{list.map((t) => <motion.div key={t.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-auto max-w-md rounded-xl bg-ink text-white px-4 py-2.5 text-sm shadow-card" dir="auto">{t.msg}</motion.div>)}</AnimatePresence>
  </div>;
}

/* ---------- segmented control ---------- */
export function Seg({ value, options, onChange, className = '' }){
  return <div className={`inline-flex p-1 rounded-xl bg-mist border-[1.5px] border-[#E2E6EE] ${className}`} role="tablist">
    {options.map(([v, label]) => <button key={v} role="tab" aria-selected={value === v} onClick={() => onChange(v)}
      className={`min-h-[36px] px-3.5 rounded-lg text-sm font-semibold transition ${value === v ? 'bg-white text-brand-600 shadow-sm ring-1 ring-line' : 'text-ink-2 hover:text-ink'}`}>{label}</button>)}
  </div>;
}
export function Progress({ value, className = '' }){
  return <div className={`h-2 rounded-full bg-brand-50 overflow-hidden ${className}`}><div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: Math.max(0, Math.min(100, value)) + '%' }}/></div>;
}
export const nt = (s, n) => (n === 'zh' || n === 'ja') ? zhc(s || '') : (s || '');
