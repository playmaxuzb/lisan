// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, LEVELS, COURSES, courseIds, activeLangs } from '@/core/engine';
import { LNAME, SELF } from '@/core/strings_app';
import { Flag } from '@/core/flags';
import { Auth } from '@/core/auth';
import { Pro, prices, money, checkout, planOf, ownsLang, isPro, paywallOn, previewMode, setPreview, resetDemo, paymentsReady,
  issueCert, certFor, certsOf, findCert, verifyURL, fullName, latinName, canCert } from '@/core/pro';
import { useApp, useStore, I, S } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { Spinner } from '@/views/Track';
import qrcode from 'qrcode-generator';

const fmt = (s, o) => String(s || '').replace(/\{(\w+)\}/g, (_, k) => o[k] != null ? o[k] : '');
export const Back = ({ href = '#/', label }) => <a href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-brand-600"><I.back className="w-4 h-4 rtl:rotate-180"/>{label}</a>;
const Tick = () => <span className="grid place-items-center w-5 h-5 rounded-full bg-[#E8F7EF] text-[#14935B] flex-none mt-0.5"><I.check className="w-3.5 h-3.5"/></span>;

/* ================= pricing ================= */
export function Pricing(){
  useStore(); const { u, toast, lang } = useApp(); const p = u.p; const P = prices(); const plan = planOf(); const n = Store.profile().native;
  const langs = Array.from(new Set(courseIds(n).map((id) => COURSES[id].t)));
  const [pick, setPick] = useState(() => (location.hash.split('/')[2] || langs[0]));
  const [yearly, setYearly] = useState(true);
  const paid = /paid=1/.test(location.hash);
  const buy = (kind, l) => { const r = checkout(kind, l);
    if (r === 'demo') toast(p.demoDone); else if (r === 'notready') toast(p.payNotReady); else if (r === 'signin'){ toast(p.signInToBuy); location.hash = '#/profile'; } };
  const save = Math.round((1 - P.yearly / (P.monthly * 12)) * 100);
  const Card = ({ hl = false, badge = '', title, price, per, desc, feats, cta, onClick, current = false, children = null }) =>
    <div className={`relative card p-6 flex flex-col gap-4 ${hl ? '!border-brand-500 ring-4 ring-brand-500/10' : ''}`}>
      {badge && <span className="absolute -top-3 start-6 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold shadow-soft">{badge}</span>}
      <div><div className="text-lg font-extrabold text-ink">{title}</div><div className="text-sm text-ink-2 mt-1 min-h-[40px]">{desc}</div></div>
      <div className="flex items-baseline gap-1.5" dir="ltr"><span className="text-4xl font-extrabold text-ink">{price}</span>{per && <span className="text-ink-2 text-sm">{per}</span>}</div>
      {children}
      <ul className="flex flex-col gap-2.5 text-sm text-ink">{feats.map((f, i) => <li key={i} className="flex gap-2"><Tick/><span>{f}</span></li>)}</ul>
      <div className="mt-auto pt-2">{current ? <div className="btn soft w-full pointer-events-none">{p.current}</div> : cta && <button className={`btn w-full ${hl ? '' : 'ghost'}`} onClick={onClick}>{cta}</button>}</div>
    </div>;
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-16">
      <Back label={u.home}/>
      <div className="mt-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink">{p.pricingT}</h1>
        <p className="mt-3 text-ink-2 leading-relaxed">{p.pricingSub}</p>
      </div>
      {paid && <div className="mt-6 max-w-2xl mx-auto rounded-2xl p-4 bg-[#E8F7EF] border-[1.5px] border-[#9ED9BC] text-[#0E6B42] text-center font-semibold">{p.paidThanks}</div>}
      {previewMode() && <div className="mt-6 max-w-3xl mx-auto rounded-2xl p-4 bg-[#FFF7E6] border-[1.5px] border-[#F2D49B] text-[#7A5200] text-sm flex flex-wrap items-center gap-3 justify-between">
        <span>{p.previewNote}</span><span className="flex gap-2"><button className="btn sm ghost" onClick={resetDemo}>{p.resetDemo}</button><button className="btn sm ghost" onClick={() => setPreview(false)}>{p.exitPreview}</button></span></div>}
      <div className="mt-8 flex justify-center"><div className="inline-flex rounded-full bg-white border-[1.5px] border-line p-1">
        {[[false, p.monthlyT], [true, p.yearlyT]].map(([v, l]) => <button key={String(v)} onClick={() => setYearly(v)} className={`px-4 h-10 rounded-full text-sm font-semibold ${yearly === v ? 'bg-brand-500 text-white' : 'text-ink-2'}`}>{l}{v && save > 0 && <span dir="ltr" className={`ms-1.5 text-xs ${yearly ? 'text-white/90' : 'text-[#14935B]'}`}>−{save}%</span>}</button>)}
      </div></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3 items-stretch">
        <Card title={p.free} price={money(0)} desc={p.freeD} feats={p.freeF} current={plan.kind === 'free'}/>
        <Card title={p.course} price={money(P.course)} per={p.oneTime} desc={p.courseD} feats={p.courseF} cta={ownsLang(pick) ? null : p.buyLang} onClick={() => buy('course', pick)} current={ownsLang(pick) && !isPro()}>
          <label className="text-xs font-semibold text-ink-2">{p.chooseLang}
            <div className="mt-1.5 flex flex-wrap gap-1.5">{langs.map((t) => <button key={t} onClick={() => setPick(t)} className={`chip !min-h-[34px] !px-2.5 ${pick === t ? 'on' : ''}`}><Flag lang={t} size="sm"/>{LNAME[n][t]}{ownsLang(t) && <I.check className="w-3.5 h-3.5 text-[#14935B]"/>}</button>)}</div></label>
        </Card>
        <Card hl badge={p.bestValue} title={p.pro} price={money(yearly ? +(P.yearly / 12).toFixed(2) : P.monthly)} per={p.perMonth}
          desc={yearly ? fmt(p.billedYearly, { P: money(P.yearly) }) : p.proD} feats={p.proF} cta={p.subscribe} onClick={() => buy(yearly ? 'yearly' : 'monthly')} current={isPro()}/>
      </div>
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {p.faq.map(([q, a], i) => <div key={i} className="rounded-2xl bg-white border-[1.5px] border-line p-5"><div className="font-bold text-ink">{q}</div><div className="mt-1.5 text-sm text-ink-2 leading-relaxed">{a}</div></div>)}
      </section>
      {!paymentsReady() && !previewMode() && <p className="mt-8 text-center text-xs text-ink-3">{p.payNotReady}</p>}
    </main>
  </div>;
}

/* shown instead of a paid level */
export function Paywall({ tr, L }){
  const { u } = useApp(); const p = u.p; const c = COURSES[tr]; const n = c.n; const P = prices();
  return <div className="card p-6 sm:p-8 max-w-xl mx-auto text-center flex flex-col items-center gap-3" data-paywall>
    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[#FFF4DA] text-[#B07A10] ring-1 ring-[#F2D49B]"><I.star className="w-6 h-6"/></span>
    <h2 className="text-xl font-extrabold text-ink">{fmt(p.unlockT, { L })}</h2>
    <p className="text-ink-2 leading-relaxed">{fmt(p.unlockD, { LANG: LNAME[n][c.t] })}</p>
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      <a className="btn" href={'#/pricing/' + c.t}>{fmt(p.buyFor, { P: money(P.course) })}</a>
      <a className="btn ghost" href={'#/pricing/' + c.t}>{p.seePlans}</a>
    </div>
    <a className="text-sm text-brand-600 font-semibold hover:underline mt-1" href={`#/learn/${tr}/a1`}>{p.tryFree}</a>
  </div>;
}

/* ================= certificates ================= */
const CEFR_EN = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper-Intermediate', C1: 'Advanced', C2: 'Proficiency' };
const DO_EN = {
  A1: 'Can understand and use familiar everyday expressions and very basic phrases, introduce themselves and ask simple personal questions.',
  A2: 'Can understand frequently used expressions on everyday topics and communicate in simple, routine exchanges about familiar matters.',
  B1: 'Can deal with most situations while travelling, describe experiences, events, hopes and plans, and give brief reasons for opinions.',
  B2: 'Can understand the main ideas of complex texts and interact with a degree of fluency and spontaneity on a wide range of subjects.',
  C1: 'Can understand demanding, longer texts and express ideas fluently and spontaneously for social, academic and professional purposes.',
  C2: 'Can understand virtually everything heard or read and express themselves precisely, distinguishing finer shades of meaning.' };
const LATIN = (l) => !['ar', 'ru', 'zh', 'ja', 'ko'].includes(l);
const dateStr = (t, l) => { try { return new Date(t).toLocaleDateString(l === 'ar' ? 'ar-EG-u-nu-latn' : l, { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e){ return new Date(t).toISOString().slice(0, 10); } };
function QR({ text, size = 104 }){ const svg = useMemo(() => { const q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); }, [text]);
  return <div style={{ width: size, height: size }} className="[&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: svg }}/>; }
const Guilloche = ({ id }) => <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1123 794" preserveAspectRatio="none" aria-hidden="true">
  <defs><pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M0 14 Q7 0 14 14 T28 14" fill="none" stroke="#C9A24A" strokeWidth=".7" opacity=".55"/><path d="M0 14 Q7 28 14 14 T28 14" fill="none" stroke="#1B2B5E" strokeWidth=".5" opacity=".25"/></pattern></defs>
  <rect x="14" y="14" width="1095" height="766" fill="none" stroke="#1B2B5E" strokeWidth="3"/>
  <rect x="24" y="24" width="1075" height="746" fill="none" stroke={`url(#${id})`} strokeWidth="18"/>
  <rect x="38" y="38" width="1047" height="718" fill="none" stroke="#C9A24A" strokeWidth="1.5"/>
  {[[38, 38], [1085, 38], [38, 756], [1085, 756]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><circle r="11" fill="#fff" stroke="#C9A24A" strokeWidth="1.5"/><circle r="5" fill="#1B2B5E"/></g>)}
  <g opacity=".05" transform="translate(561 420)">{Array.from({ length: 36 }, (_, i) => <ellipse key={i} rx="250" ry="70" fill="none" stroke="#1B2B5E" strokeWidth="1.2" transform={`rotate(${i * 5})`}/>)}</g>
</svg>;
function Seal({ L }){ return <svg viewBox="0 0 140 140" className="w-[132px] h-[132px]" aria-hidden="true">
  <defs><radialGradient id="sg" cx="40%" cy="35%"><stop offset="0" stopColor="#F3D98B"/><stop offset=".6" stopColor="#C9A24A"/><stop offset="1" stopColor="#9C7726"/></radialGradient>
    <path id="sp" d="M70 70 m-50 0 a50 50 0 1 1 100 0 a50 50 0 1 1 -100 0"/></defs>
  {Array.from({ length: 24 }, (_, i) => <path key={i} d="M70 4 L76 18 L64 18Z" fill="#B48A2E" transform={`rotate(${i * 15} 70 70)`}/>)}
  <circle cx="70" cy="70" r="58" fill="url(#sg)" stroke="#8A6A1F" strokeWidth="2"/><circle cx="70" cy="70" r="44" fill="none" stroke="#FFF4D2" strokeWidth="1.2" strokeDasharray="2 3"/>
  <text fontSize="8.5" fontWeight="700" fill="#5A4210" letterSpacing="2.2" fontFamily="Inter,Arial"><textPath href="#sp" startOffset="0">LISAN · LANGUAGE CERTIFICATE · CEFR ·</textPath></text>
  <text x="70" y="80" textAnchor="middle" fontSize="34" fontWeight="800" fill="#3F2E08" fontFamily="Lora,Georgia,serif">{L}</text>
</svg>; }

export function Certificate({ cert }){
  const ui = S(cert.n); const n = cert.n, t = cert.t, en = n === 'en'; const T = ui.p; const nm = cert.name || {};
  const main = fullName(nm), lat = latinName(nm); const rtl = n === 'ar';
  const nameFont = n === 'ar' ? '"Amiri",serif' : n === 'zh' ? '"Noto Serif SC","Noto Sans SC",serif' : n === 'ja' ? '"Noto Sans JP",serif' : n === 'ko' ? '"Noto Sans KR",serif' : '"Lora",Georgia,serif';
  const course = LNAME[n][t], courseEn = LNAME.en[t];
  return <div className="cert relative bg-[#FFFDF7] text-[#1B2B5E] overflow-hidden" style={{ width: 1123, height: 794, fontFamily: 'Inter,"IBM Plex Sans Arabic","Noto Sans SC",sans-serif' }} data-cert={cert.id}>
    <Guilloche id={'g' + cert.id.replace(/\W/g, '')}/>
    <div className="absolute inset-0 px-[88px] pt-[64px] pb-[56px] flex flex-col items-center text-center">
      <div className="flex items-center gap-3" dir="ltr"><span className="grid place-items-center w-11 h-11 rounded-xl bg-[#1B2B5E] text-white text-xl font-bold">L</span>
        <span className="text-[22px] font-extrabold tracking-[.18em]">LISAN<span className="ms-2 text-[#B48A2E] tracking-normal" style={{ fontFamily: '"Amiri",serif' }}>لِسان</span></span></div>
      <div className="mt-5 text-[13px] tracking-[.35em] text-[#B48A2E] font-semibold">CERTIFICATE OF ACHIEVEMENT</div>
      {!en && <div className="mt-1 text-[30px] font-bold" dir={rtl ? 'rtl' : 'ltr'} lang={n} style={{ fontFamily: nameFont }}>{T.certTitle}</div>}
      {en && <div className="mt-1 text-[34px] font-bold" style={{ fontFamily: nameFont }}>Certificate of Achievement</div>}
      <div className="mt-4 text-[15px] text-[#4A5677]" dir={rtl ? 'rtl' : 'ltr'}>{T.certIntro}</div>{!en && <div className="text-[12px] text-[#8A93AE] tracking-wide" dir="ltr">This is to certify that</div>}
      <div className="mt-2 text-[46px] leading-tight font-bold text-[#0F1B3D]" dir="auto" lang={n} style={{ fontFamily: nameFont }}>{main}</div>
      {lat && lat !== main && <div className="text-[20px] text-[#4A5677] tracking-wide" dir="ltr" style={{ fontFamily: '"Lora",Georgia,serif' }}>{lat}</div>}
      <div className="w-[520px] h-px bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent my-3"/>
      <p className="max-w-[860px] text-[16.5px] leading-[1.65] text-[#1B2B5E]" dir={rtl ? 'rtl' : 'ltr'} lang={n}>{fmt(T.certBody, { LANG: course, L: cert.L, LV: ui.lv[cert.L], P: cert.score })}</p>
      {!en && <p className="max-w-[860px] mt-1.5 text-[13px] leading-[1.6] text-[#5B6684]" dir="ltr">has successfully completed the {courseEn} course at level {cert.L} ({CEFR_EN[cert.L]}) of the Common European Framework of Reference for Languages (CEFR) and passed the final examination with a score of {cert.score}%.</p>}
      <p className="max-w-[760px] mt-2.5 text-[12.5px] italic leading-[1.55] text-[#6B7491]" dir={rtl ? 'rtl' : 'ltr'}>“{(T.can || {})[cert.L] || DO_EN[cert.L]}”</p>
      <div className="mt-auto w-full grid grid-cols-[1fr_auto_1fr] items-end gap-6" dir="ltr">
        <div className="text-start text-[12.5px] leading-[1.7]">
          <div className="text-[#8A93AE] uppercase tracking-[.15em] text-[10.5px]">{en ? 'Date of issue' : T.issued + ' · Date of issue'}</div>
          <div className="font-semibold text-[14px]">{dateStr(cert.issued, n)}</div>
          <div className="mt-2 text-[#8A93AE] uppercase tracking-[.15em] text-[10.5px]">{en ? 'Certificate No.' : T.certId + ' · Certificate No.'}</div>
          <div className="font-mono font-semibold text-[14px] tracking-wider">{cert.id}</div>
          <div className="mt-9 w-[230px] border-t border-[#1B2B5E]/50 pt-1 text-[11.5px] relative"><span className="absolute -top-8 start-2 text-[26px] leading-none text-[#1B2B5E] italic" style={{ fontFamily: '"Marck Script","Caveat","Lora",cursive' }}>Lisan</span>Lisan Examinations Board</div>
        </div>
        <div className="flex flex-col items-center"><Seal L={cert.L}/><div className="text-[11px] mt-1 tracking-[.2em] text-[#8A6A1F] font-semibold">{CEFR_EN[cert.L].toUpperCase()}</div></div>
        <div className="flex items-end justify-end gap-3 text-end">
          <div className="text-[11px] leading-[1.6] text-[#5B6684] max-w-[170px]"><div className="uppercase tracking-[.15em] text-[10.5px] text-[#8A93AE]">{en ? 'Verify' : T.verify + ' · Verify'}</div><div className="break-all">{verifyURL(cert.id).replace(/^https?:\/\//, '')}</div></div>
          <div className="p-1.5 bg-white border border-[#C9A24A]/60 rounded"><QR text={verifyURL(cert.id)} size={96}/></div>
        </div>
      </div>
    </div>
  </div>;
}
function Fit({ children, w = 1123, h = 794 }){ const ref = useRef(null); const [s, setS] = useState(.5);
  useEffect(() => { const f = () => ref.current && setS(Math.min(1, ref.current.clientWidth / w)); f(); const ro = new ResizeObserver(f); ro.observe(ref.current); return () => ro.disconnect(); }, []);
  return <div ref={ref} className="w-full"><div style={{ height: h * s }} className="relative"><div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: 'top left' }} className="absolute top-0 left-0 shadow-card rounded-sm" dir="ltr">{children}</div></div></div>; }

async function snap(id){ const el = document.querySelector(`[data-print="${id}"] .cert`); const { toPng } = await import('html-to-image');
  return toPng(el, { pixelRatio: 2.4, cacheBust: true, width: 1123, height: 794, style: { transform: 'none' } }); }
export async function downloadPNG(cert){ const url = await snap(cert.id); const a = document.createElement('a'); a.href = url; a.download = cert.id + '.png'; a.click(); }
export async function downloadPDF(cert){ const url = await snap(cert.id); const { jsPDF } = await import('jspdf'); const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  pdf.addImage(url, 'PNG', 0, 0, 297, 210); pdf.setProperties({ title: 'Lisan certificate ' + cert.id }); pdf.save(cert.id + '.pdf'); }

export function CertPage({ id, tr, L }){
  useStore(); const { u, toast } = useApp(); const p = u.p;
  const existing = id ? (Store.d.certs || {})[id] : certFor(tr, L);
  const [cert, setCert] = useState(existing || null); const [busy, setBusy] = useState('');
  if (!cert && id) return <div><TopBar/><main className="mx-auto max-w-3xl px-4 py-10 text-center text-ink-2">{p.verifyNo}</main></div>;
  if (!cert) return <IssueForm tr={tr} L={L} onDone={(c) => { setCert(c); location.hash = '#/cert/' + c.id; }}/>;
  const run = (k, f) => async () => { setBusy(k); try { await f(cert); } catch (e){ toast(p.dlFail); } setBusy(''); };
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-16">
      <Back href="#/certs" label={p.myCerts}/>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink">{p.cert} · {LNAME[cert.n][cert.t]} {cert.L}</h1>
        <div className="flex flex-wrap gap-2">
          <button className="btn" disabled={!!busy} onClick={run('pdf', downloadPDF)}>{busy === 'pdf' ? '…' : p.downloadPdf}</button>
          <button className="btn ghost" disabled={!!busy} onClick={run('png', downloadPNG)}>{busy === 'png' ? '…' : p.downloadImg}</button>
          <button className="btn ghost" onClick={() => { navigator.clipboard && navigator.clipboard.writeText(verifyURL(cert.id)); toast(p.copied); }}>{p.copyLink}</button>
        </div>
      </div>
      <div className="mt-5" data-print={cert.id}><Fit><Certificate cert={cert}/></Fit></div>
      {!cert.online && <p className="mt-4 text-sm text-ink-3">{p.localOnly}</p>}
    </main>
  </div>;
}

function IssueForm({ tr, L, onDone }){
  const { u, toast } = useApp(); const p = u.p; const c = COURSES[tr]; const n = c.n; const ok = canCert(tr, L);
  const [f, setF] = useState({ first: '', middle: '', last: '', lfirst: '', lmiddle: '', llast: '' }); const [sure, setSure] = useState(false); const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF(Object.assign({}, f, { [k]: e.target.value }));
  const needLatin = !LATIN(n); const valid = f.first.trim().length >= 2 && f.last.trim().length >= 2 && (!needLatin || (f.lfirst.trim().length >= 2 && f.llast.trim().length >= 2)) && sure;
  const go = async () => { if (!valid) return; setBusy(true); const nm = needLatin ? f : { first: f.first, middle: f.middle, last: f.last }; const cert = await issueCert(tr, L, nm); setBusy(false); toast(p.issuedOk); onDone(cert); };
  const In = ({ k, label, latin = false, opt = false }) => <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-2">{label}{opt && <span className="font-normal text-ink-3"> ({p.optional})</span>}
    <input className="field" value={f[k]} onChange={set(k)} dir={latin ? 'ltr' : 'auto'} autoComplete={k.includes('first') ? 'given-name' : k.includes('last') ? 'family-name' : 'additional-name'}/></label>;
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-6 pb-16">
      <Back href={`#/learn/${tr}`} label={u.backLevels}/>
      {!ok ? <div className="card p-7 mt-5 text-center text-ink-2">{p.certNeedPass}</div> :
      <div className="card p-6 sm:p-8 mt-5 flex flex-col gap-5">
        <div className="flex items-center gap-3"><span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FFF4DA] text-[#B07A10] ring-1 ring-[#F2D49B] font-extrabold">{L}</span>
          <div><h1 className="text-xl font-extrabold text-ink">{p.certNameT}</h1><div className="text-sm text-ink-2">{LNAME[n][c.t]} · {L} · {u.best}: {Store.d.best[tr + ':' + L]}%</div></div></div>
        <p className="text-ink-2 leading-relaxed text-[15px]">{p.certNameD}</p>
        {In({ k: 'first', label: p.first })}{In({ k: 'middle', label: p.middle, opt: true })}{In({ k: 'last', label: p.last })}
        {needLatin && <div className="rounded-2xl bg-paper border-[1.5px] border-line p-4 flex flex-col gap-3"><div className="text-sm font-bold text-ink">{p.latinT}</div>
          <div className="grid sm:grid-cols-3 gap-3">{In({ k: 'lfirst', label: p.first, latin: true })}{In({ k: 'lmiddle', label: p.middle, latin: true, opt: true })}{In({ k: 'llast', label: p.last, latin: true })}</div></div>}
        {(f.first || f.last) && <div className="rounded-2xl border-[1.5px] border-dashed border-[#C9A24A] bg-[#FFFDF7] p-4 text-center"><div className="text-xs text-ink-3">{p.preview}</div>
          <div className="text-2xl font-bold text-ink mt-1" dir="auto" style={{ fontFamily: n === 'ar' ? '"Amiri",serif' : '"Lora",serif' }}>{fullName(f)}</div>{needLatin && latinName(f) && <div className="text-ink-2" dir="ltr">{latinName(f)}</div>}</div>}
        <label className="flex items-start gap-3 text-sm text-ink cursor-pointer"><input type="checkbox" className="mt-1 w-4 h-4 accent-[#2A5EEB]" checked={sure} onChange={(e) => setSure(e.target.checked)}/><span>{p.confirmName}</span></label>
        <button className="btn self-start" disabled={!valid || busy} onClick={go} data-issue>{busy ? '…' : p.issue}</button>
      </div>}
    </main>
  </div>;
}

export function CertList(){
  useStore(); const { u } = useApp(); const p = u.p; const list = certsOf(); const n = Store.profile().native;
  const ready = []; courseIds(n).forEach((tr) => LEVELS.forEach((L) => { if (Store.passed(tr, L) && !certFor(tr, L)) ready.push([tr, L]); }));
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <Back label={u.home}/>
      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-ink">{p.myCerts}</h1>
      <p className="mt-2 text-ink-2">{p.certsSub}</p>
      {ready.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2">{ready.map(([tr, L]) => <a key={tr + L} href={`#/cert/new/${tr}/${L}`} className="card card-hover p-4 flex items-center gap-3">
        <Flag lang={COURSES[tr].t} size="md"/><div className="flex-1"><div className="font-bold text-ink">{LNAME[n][COURSES[tr].t]} · {L}</div><div className="text-sm text-[#14935B] font-semibold">{p.readyToIssue}</div></div><span className="btn sm">{p.getCert}</span></a>)}</div>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{list.map((c) => <a key={c.id} href={'#/cert/' + c.id} className="card card-hover p-4 flex gap-4 items-center">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-[#F3D98B] to-[#B48A2E] text-[#3F2E08] font-extrabold text-lg">{c.L}</span>
        <div className="min-w-0"><div className="font-bold text-ink">{LNAME[n][c.t] || c.t} · {c.L}</div><div className="text-sm text-ink-2 truncate" dir="auto">{fullName(c.name)}</div><div className="text-xs text-ink-3 font-mono" dir="ltr">{c.id}</div></div></a>)}</div>
      {!list.length && !ready.length && <div className="card p-8 mt-6 text-center text-ink-2">{p.noCerts}</div>}
    </main>
  </div>;
}

export function Verify({ id }){
  const { u, lang } = useApp(); const p = u.p; const [st, setSt] = useState({ loading: !!id, cert: null }); const [q, setQ] = useState(id || '');
  useEffect(() => { if (!id) return; setSt({ loading: true, cert: null }); findCert(id).then((c) => setSt({ loading: false, cert: c })); }, [id]);
  const c = st.cert;
  return <div>
    <TopBar/>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">{p.verifyT}</h1>
      <form className="mt-4 flex gap-2 max-w-lg" onSubmit={(e) => { e.preventDefault(); location.hash = '#/verify/' + q.trim().toUpperCase(); }}>
        <input className="field font-mono" dir="ltr" placeholder="LSN-FRB1-XXXX-XXXX" value={q} onChange={(e) => setQ(e.target.value)}/><button className="btn">{p.verify}</button></form>
      {st.loading ? <Spinner/> : id && (c ? <div className="mt-6 flex flex-col gap-4">
        <div className={`rounded-2xl p-4 border-[1.5px] font-semibold flex items-center gap-2 ${c.verified ? 'bg-[#E8F7EF] border-[#9ED9BC] text-[#0E6B42]' : 'bg-[#FFF7E6] border-[#F2D49B] text-[#7A5200]'}`}><I.check className="w-5 h-5"/>{c.verified ? p.verifyOk : p.verifyLocal}</div>
        <div className="grid sm:grid-cols-4 gap-3 text-sm">{[[p.holder, fullName(c.name) + (latinName(c.name) ? ' · ' + latinName(c.name) : '')], [p.langLevel, (LNAME[lang] || LNAME.en)[c.t] + ' · ' + c.L], [u.best, c.score + '%'], [p.issued, dateStr(c.issued, c.n)]].map(([k, v], i) =>
          <div key={i} className="rounded-2xl bg-white border-[1.5px] border-line p-3"><div className="text-xs text-ink-3">{k}</div><div className="font-bold text-ink mt-0.5" dir="auto">{v}</div></div>)}</div>
        <div data-print={c.id}><Fit><Certificate cert={c}/></Fit></div>
      </div> : <div className="mt-6 rounded-2xl p-4 bg-[#FDECEC] border-[1.5px] border-[#F2B8BB] text-[#A3262C] font-semibold">{p.verifyNo}</div>)}
    </main>
  </div>;
}
