// @ts-nocheck
import React, { useState } from 'react';
import { Store, COURSES, activeLangs } from '@/core/engine';
import { FB } from '@/core/auth';
import { useApp, I, LogoMark } from '@/ui/kit';

function Stars({ value, onPick }){ const [h, setH] = useState(0);
  return <div className="flex items-center gap-1" dir="ltr" onMouseLeave={() => setH(0)}>{[1, 2, 3, 4, 5].map((k) => <button key={k} type="button" onMouseEnter={() => setH(k)} onClick={() => onPick(k)} aria-label={k + ' / 5'} data-star={k}
    className="p-0.5 transition-transform hover:scale-110"><svg viewBox="0 0 24 24" className="w-8 h-8"><path d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L2.9 9.4l6.3-.9z" fill={(h || value) >= k ? '#FFC24B' : 'none'} stroke={(h || value) >= k ? '#F0A500' : '#C5CEDF'} strokeWidth="1.5" strokeLinejoin="round"/></svg></button>)}</div>; }

export default function Footer(){
  const { u } = useApp(); const x = u.x; const [rated, setRated] = useState(() => Store.meta.rated || 0);
  const rate = async (k) => { setRated(k); Store.meta.rated = k; Store.saveMeta(); const f = FB(); if (f){ try { await f.F.setDoc(f.F.doc(f.db, 'ratings', (Store.profile() || {}).uid || Store.meta.current || 'anon' + Date.now()), { stars: k, at: Date.now(), native: (Store.profile() || {}).native || '' }); } catch (e){} } };
  const badges = [[activeLangs().length + ' ' + x.ftLangs, I.globe], [Object.keys(COURSES).length + ' ' + x.ftCourses, I.book], [x.ftCefr, I.chart], [x.ftCert, I.star], [x.ftOff, I.check], [x.ftAudio, I.vol]];
  return <footer className="mt-4 bg-[#0F1630] text-white" data-footer>
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
      <div>
        <div className="inline-flex items-center gap-3" dir="ltr"><LogoMark className="w-12 h-12"/><span className="text-[2rem] font-extrabold tracking-[-.03em] bg-gradient-to-r from-white to-[#9DBBFF] bg-clip-text text-transparent" style={{ fontFamily: 'Inter,sans-serif' }}>Lisan</span></div>
        <p className="mt-3 text-[#B9C4DD] max-w-md leading-relaxed">{x.ftTag}</p>
        <h3 className="mt-7 text-lg font-extrabold">{x.ftProud} ❤</h3>
        <div className="mt-3 flex flex-wrap gap-2">{badges.map(([t, Ic], i) => <span key={i} className="inline-flex items-center gap-2 rounded-full bg-white/[.07] ring-1 ring-white/15 px-3.5 py-2 text-sm font-semibold"><Ic className="w-4 h-4 text-[#9DBBFF]"/>{t}</span>)}</div>
      </div>
      <div className="rounded-3xl bg-white/[.06] ring-1 ring-white/12 p-6 flex flex-col items-center text-center gap-2" data-rate>
        <div className="text-lg font-extrabold">{x.rateT}</div><div className="text-sm text-[#B9C4DD]">{x.rateD}</div>
        <div className="mt-2"><Stars value={rated} onPick={rate}/></div>
        {rated > 0 && <div className="text-sm font-semibold text-[#FFC24B]">{x.rateThanks}</div>}
      </div>
    </div>
    <div className="border-t border-white/10"><div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 text-sm text-[#8F9BB8] flex flex-wrap items-center justify-between gap-2"><span dir="ltr">© {new Date().getFullYear()} Lisan</span><span>{x.rights}</span></div></div>
  </footer>;
}
