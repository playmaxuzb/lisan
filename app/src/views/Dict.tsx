// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Store, LEVELS, level, lines, norm, disp, sayOf, pronOf, COURSES, Packs, track, Speech } from '@/core/engine';
import { LEARN } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { add as srsAdd } from '@/core/srs';
import { mine, isSaved, saveWord, removeWord } from '@/core/mydict';
import { useApp, useStore, I, PlayBtn, Tgt, Seg, ReportBtn, tcls, tdir } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { useTrack, Spinner, AudioBtn } from '@/views/Track';

/* the whole course: every vocabulary item from A1 to C2 plus the common-word list */
function allEntries(tr){ const T = track(tr); const out = []; const seen = new Set();
  LEVELS.forEach((L) => { const lv = level(tr, L); lv.vocab.forEach((v) => { const k = norm(v.src, T.t); if (seen.has(k)) return; seen.add(k); out.push({ src: v.src, t: v.t, say: v.say, pr: v.pr, m: v.m, e: v.e, L, id: v.id }); }); });
  lines(T.bank.common).forEach((l) => { const f = l.split('|'); const m = f[1 + T.mi]; if (!m) return; const k = norm(f[0], T.t); if (seen.has(k)) return; seen.add(k); out.push({ src: f[0], t: disp(f[0]), say: sayOf(f[0]), pr: pronOf(f[0], T.t, T.n), m, L: '' }); });
  return out; }
const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[ًٌٍَُِّْـ]/g, '').replace(/ё/g, 'е');

function DictPlay({ e, tl, label }){ const [on, setOn] = useState(false);
  const go = async () => { setOn(true); const Ls = e.L ? [e.L] : []; for (const L of Ls){ await Packs.one(tl + '-' + L + '-w'); if (Packs.find(e.say, tl, false)) break; await Packs.one(tl + '-' + L); if (Packs.find(e.say, tl, false)) break; } await Speech.say(e.say, tl); setOn(false); };
  return <button type="button" className={`iconbtn ${on ? 'speaking' : ''}`} onClick={go} aria-label={label}><I.play/></button>; }

export default function Dict({ tr }){
  useStore(); const { u, toast } = useApp(); const x = u.x; const T = useTrack(tr); const c = COURSES[tr]; const tl = c.t;
  const [tab, setTab] = useState('all'); const [q, setQ] = useState(''); const [lvl, setLvl] = useState(''); const [n, setN] = useState(60); const [nw, setNw] = useState({ src: '', m: '' });
  const all = useMemo(() => T ? allEntries(tr) : [], [T, tr]);
  const list = useMemo(() => { const f = fold(q.trim()); let a = tab === 'mine' ? mine(tr).map((w) => ({ ...w, t: disp(w.src), say: sayOf(w.src), pr: pronOf(w.src, tl, c.n), own: true })) : all;
    if (lvl && tab !== 'mine') a = a.filter((e) => e.L === lvl);
    if (f) a = a.filter((e) => fold(e.say).includes(f) || fold(e.m).includes(f) || fold(e.pr || '').includes(f));
    if (f && tab !== 'mine') a = a.slice().sort((p, r) => (fold(r.say).startsWith(f) ? 1 : 0) - (fold(p.say).startsWith(f) ? 1 : 0));
    return a; }, [all, q, tab, lvl, Store.d.mydict && Store.d.mydict[tr] && Store.d.mydict[tr].length]);
  useEffect(() => setN(60), [q, tab, lvl]);
  if (!T) return <div><TopBar><AudioBtn/></TopBar><Spinner/></div>;
  const srs = (Store.d.srs && Store.d.srs[tr]) || {};
  const addOwn = (e) => { e.preventDefault(); if (!nw.src.trim() || !nw.m.trim()) return; saveWord(tr, nw.src, nw.m, { own: true }); setNw({ src: '', m: '' }); toast(x.savedW); };
  return <div>
    <TopBar><AudioBtn/></TopBar>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <a href={'#/learn/' + tr} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{u.backLevels}</a>
      <div className="mt-4 flex items-center gap-3"><Flag lang={tl} size="md"/><div><h1 className="text-2xl font-extrabold text-ink">{x.dict} · {LEARN[c.n](tl)}</h1><p className="text-sm text-ink-2">{x.dictD}</p></div></div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Seg value={tab} onChange={setTab} options={[['all', x.allW + ' · ' + all.length], ['mine', x.myWords + ' · ' + mine(tr).length]]}/>
        {tab === 'all' && <div className="flex gap-1.5 flex-wrap">{['', ...LEVELS].map((L) => <button key={L} className={`chip !min-h-[34px] ${lvl === L ? 'on' : ''}`} onClick={() => setLvl(L)}>{L || x.allW}</button>)}</div>}
      </div>
      <div className="mt-3 relative"><I.search className="w-5 h-5 absolute top-1/2 -translate-y-1/2 start-3 text-ink-3"/><input className="field !ps-10" value={q} onChange={(e) => setQ(e.target.value)} placeholder={x.dictSearch} dir="auto" data-dict-search/></div>
      {tab === 'mine' && <form onSubmit={addOwn} className="mt-3 card p-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto] items-end" data-add-word>
        <label className="block"><span className="text-xs font-semibold text-ink-2">{x.wordF}</span><input className={`field mt-1 ${tcls(tl)}`} dir={tdir(tl)} lang={tl} value={nw.src} onChange={(e) => setNw({ ...nw, src: e.target.value })}/></label>
        <label className="block"><span className="text-xs font-semibold text-ink-2">{x.meaningF}</span><input className="field mt-1" dir="auto" value={nw.m} onChange={(e) => setNw({ ...nw, m: e.target.value })}/></label>
        <button className="btn"><I.plus className="w-4 h-4"/>{x.addBtn}</button></form>}
      <div className="mt-4 text-sm text-ink-3">{list.length} {x.entries}</div>
      {!list.length ? <div className="card p-6 mt-2 text-ink-2 text-center">{tab === 'mine' && !q ? x.myWordsNone : x.noResults}</div> :
      <div className="mt-2 card divide-y divide-line/70 overflow-hidden" data-dict-list>{list.slice(0, n).map((e, i) => { const inRev = e.id && srs[e.id];
        return <div key={(e.id || e.src) + i} className="flex items-center gap-3 px-3.5 sm:px-4 py-3">
          <span className="w-9 text-2xl text-center flex-none" aria-hidden="true">{e.e || ''}</span>
          <div className="flex-1 min-w-0"><div className="flex items-baseline gap-2 flex-wrap"><Tgt tl={tl} className="text-lg font-bold text-ink">{e.t}</Tgt>{e.L && <span className="text-[11px] font-bold text-brand-600 bg-brand-50 rounded-md px-1.5 py-0.5">{e.L}</span>}</div>
            {e.pr && <div className="text-xs text-brand-700" dir="auto">{e.pr}</div>}<div className="text-sm text-ink-2" dir="auto">{e.m}</div></div>
          <DictPlay e={e} tl={tl} label={u.play}/>
          {e.own || tab === 'mine' ? <button className="iconbtn" onClick={() => removeWord(tr, e.src)} aria-label={x.remove} title={x.remove}><I.x/></button> :
            e.id ? <button className={`iconbtn ${inRev ? '!text-[#14935B]' : ''}`} onClick={() => { if (!inRev){ srsAdd(tr, e.id); Store.save(); toast(x.addReview + ' ✓'); } }} aria-label={inRev ? x.inRev : x.addReview} title={inRev ? x.inRev : x.addReview}>{inRev ? <I.check/> : <I.plus/>}</button>
            : <button className="iconbtn" onClick={() => { saveWord(tr, e.src, e.m); toast(x.savedW); }} aria-label={x.saveWord} title={x.saveWord}><I.star/></button>}
          {!e.own && <ReportBtn data={{ tr, L: e.L, kind: 'v', id: e.id || '', src: e.src, m: e.m, tl, e: e.e, say: e.say }}/>}
        </div>; })}</div>}
      {list.length > n && <div className="mt-4 text-center"><button className="btn ghost" onClick={() => setN(n + 100)}>{x.more} · {list.length - n}</button></div>}
    </main>
  </div>;
}
