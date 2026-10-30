// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES, countryName, flagEmoji } from '@/core/countries';

/* Country code button with an arrow; opens a searchable list of countries named in the user's language. */
export function CountryPicker({ value, onChange, lang, u }){
  const [open, setOpen] = useState(false); const [q, setQ] = useState(''); const box = useRef(null); const search = useRef(null);
  const list = useMemo(() => COUNTRIES.map((c) => ({ ...c, name: countryName(c.code, lang) })).sort((a, b) => a.name.localeCompare(b.name, lang)), [lang]);
  const cur = list.find((c) => c.code === value) || list[0];
  const shown = useMemo(() => { const k = q.trim().toLowerCase().replace(/^\+/, ''); if (!k) return list;
    return list.filter((c) => c.name.toLowerCase().includes(k) || c.dial.slice(1).startsWith(k) || c.code.toLowerCase() === k || countryName(c.code, 'en').toLowerCase().includes(k)); }, [q, list]);
  useEffect(() => { if (!open) return; setTimeout(() => search.current && search.current.focus(), 30);
    const f = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); }; const k = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', f); document.addEventListener('keydown', k); return () => { document.removeEventListener('pointerdown', f); document.removeEventListener('keydown', k); }; }, [open]);
  return <div ref={box} className="relative shrink-0">
    <button type="button" onClick={() => { setOpen(!open); setQ(''); }} aria-haspopup="listbox" aria-expanded={open} aria-label={u.countryCode} data-country-btn
      className="h-[48px] min-w-[112px] px-3 rounded-xl bg-mist border-[1.5px] border-[#E2E6EE] hover:border-brand-400 inline-flex items-center gap-2 font-semibold text-ink" dir="ltr">
      <span className="text-xl leading-none">{flagEmoji(cur.code)}</span><span>{cur.dial}</span>
      <svg viewBox="0 0 20 20" className={`w-4 h-4 text-ink-3 transition ${open ? 'rotate-180' : ''}`} aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .15 }}
      className="absolute z-40 mt-2 start-0 w-[min(320px,calc(100vw-48px))] rounded-2xl bg-white border-[1.5px] border-line shadow-card overflow-hidden">
      <div className="p-2 border-b border-line/70"><input ref={search} value={q} onChange={(e) => setQ(e.target.value)} placeholder={u.searchCountry} className="field !min-h-[40px] text-sm" data-country-search/></div>
      <ul role="listbox" className="max-h-72 overflow-y-auto py-1">
        {shown.map((c) => <li key={c.code}><button type="button" role="option" aria-selected={c.code === value} data-country={c.code} onClick={() => { onChange(c.code); setOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2 text-start hover:bg-brand-50 ${c.code === value ? 'bg-brand-50 text-brand-700' : 'text-ink'}`}>
          <span className="text-xl leading-none">{flagEmoji(c.code)}</span><span className="flex-1 truncate">{c.name}</span><span className="text-sm text-ink-3 font-semibold" dir="ltr">{c.dial}</span></button></li>)}
        {!shown.length && <li className="px-3 py-4 text-sm text-ink-3 text-center">—</li>}
      </ul>
    </motion.div>}</AnimatePresence>
  </div>;
}
