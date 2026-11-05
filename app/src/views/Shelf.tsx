// @ts-nocheck
// Home bookshelf: every course is a book standing on an endless shelf. The book in the middle turns to show its cover;
// opening it grows a sheet of paper out of the cover with the levels on the left and the cover bleeding in like ink.
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Store, LEVELS, COURSES, courseIds } from '@/core/engine';
import { LEARN, SELF, LNAME } from '@/core/strings_app';
import { hasAccess } from '@/core/pro';
import { mine } from '@/core/mydict';
import { dueCount } from '@/core/srs';
import { act } from '@/core/activity';
import { useApp, useStore, I } from '@/ui/kit';

/* ---------- book design per language ---------- */
export const BOOK = {
  ru: { bg: '#C9372C', fg: '#F6EEDF', ac: '#1F3FB0', g: 'Ж' }, en: { bg: '#1F3FB0', fg: '#F6EEDF', ac: '#E8A33D', g: 'Aa' }, ar: { bg: '#0F6B53', fg: '#F6EEDF', ac: '#E8C26A', g: 'ض' },
  uz: { bg: '#127F8C', fg: '#F6EEDF', ac: '#E8C26A', g: 'Oʻ' }, es: { bg: '#E3A21A', fg: '#2A1A0A', ac: '#C9372C', g: 'Ñ' }, zh: { bg: '#A3171F', fg: '#F4D58A', ac: '#141414', g: '字' },
  de: { bg: '#1C1C1C', fg: '#F6EEDF', ac: '#E3B21A', g: 'ß' }, fr: { bg: '#ECE5D4', fg: '#1F3FB0', ac: '#C9372C', g: 'Ç' }, it: { bg: '#2F7A48', fg: '#F6EEDF', ac: '#C9372C', g: 'È' },
  tr: { bg: '#B3202C', fg: '#F6EEDF', ac: '#F6EEDF', gc: '#B3202C', g: 'Ğ' }, ja: { bg: '#F1ECE1', fg: '#141414', ac: '#C8102E', gc: '#F1ECE1', g: 'あ' }, ko: { bg: '#233A7A', fg: '#F6EEDF', ac: '#C8102E', g: '한' }
};
const REGIONS = [['eu', ['en', 'de', 'fr', 'it', 'es', 'ru']], ['me', ['ar', 'tr', 'uz']], ['as', ['zh', 'ja', 'ko']]];
const regionOf = (t) => (REGIONS.find((r) => r[1].includes(t)) || [''])[0];
export const bookFont = (t) => t === 'ar' ? '"Amiri","IBM Plex Sans Arabic",serif' : t === 'zh' ? '"Noto Sans SC",sans-serif' : t === 'ja' ? '"Noto Sans JP",sans-serif' : t === 'ko' ? '"Noto Sans KR",sans-serif' : '"Lora",Georgia,serif';
const uiFont = (n) => n === 'ar' ? '"IBM Plex Sans Arabic",sans-serif' : n === 'zh' ? '"Noto Sans SC",sans-serif' : n === 'ja' ? '"Noto Sans JP",sans-serif' : n === 'ko' ? '"Noto Sans KR",sans-serif' : 'Inter,sans-serif';
const passedOf = (tr) => LEVELS.filter((L) => Store.passed(tr, L)).length;
const EASE = 'cubic-bezier(.2,.8,.2,1)';
const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const sstep = (x) => x * x * (3 - 2 * x);

/* the cover, drawn as SVG so the same art serves the book face and the ink-revealed poster */
export function CoverArt({ tr, idp = '' }){
  const c = COURSES[tr]; const B = BOOK[c.t]; const p = passedOf(tr); const title = SELF[c.t]; const sub = LEARN[c.n](c.t);
  const long = String(title).length > 9;
  return <g>
    <rect width="500" height="714" fill={B.bg}/>
    <rect y="470" width="500" height="244" fill="url(#lsDots)"/>
    <circle cx="250" cy="300" r="150" fill={B.ac}/>
    <circle cx="250" cy="300" r="172" fill="none" stroke={B.fg} strokeWidth="2" strokeDasharray="2 9"/>
    <text x="250" y="304" textAnchor="middle" dominantBaseline="central" fontSize={B.g.length > 1 ? 150 : 190} fontWeight="700" fill={B.gc || B.fg} fontFamily={bookFont(c.t)}>{B.g}</text>
    <text x="34" y="58" fontSize="17" letterSpacing="4" fontWeight="700" fill={B.fg} fontFamily="Inter,sans-serif">LISAN · لِسان</text>
    <rect x="378" y="38" width="90" height="28" fill="none" stroke={B.fg} strokeWidth="1.6"/><text x="423" y="58" textAnchor="middle" fontSize="15" fontWeight="700" fill={B.fg} fontFamily="Inter,sans-serif" letterSpacing="1">A1–C2</text>
    <text x="250" y="548" textAnchor="middle" fontSize={long ? 52 : 66} fontWeight="700" fill={B.fg} fontFamily={bookFont(c.t)} lang={c.t}>{title}</text>
    <text x="250" y="596" textAnchor="middle" fontSize="23" fontWeight="600" fill={B.fg} fontFamily={uiFont(c.n)}>{sub}</text>
    {LEVELS.map((L, i) => <g key={L}><rect x={34 + i * 34} y="646" width="26" height="26" fill={i < p ? B.fg : 'none'} stroke={B.fg} strokeWidth="1.6"/></g>)}
    <rect x="378" y="644" width="90" height="30" fill={B.fg}/><text x="423" y="665" textAnchor="middle" fontSize="15" fontWeight="800" fill={B.bg} fontFamily="Inter,sans-serif" letterSpacing="2">LISAN</text>
  </g>;
}
function Spine({ tr }){ const c = COURSES[tr]; const B = BOOK[c.t]; const cjk = ['zh', 'ja', 'ko'].includes(c.t);
  return <div className="bk-sp" style={{ background: B.bg, color: B.fg }}>
    <span className="bk-g" style={{ background: B.ac, color: B.gc || B.fg, fontFamily: bookFont(c.t) }}>{B.g}</span>
    {cjk ? <span className="bk-t bk-tc" style={{ fontFamily: bookFont(c.t) }} lang={c.t}>{[...SELF[c.t]].map((ch, i) => <span key={i}>{ch}</span>)}</span>
      : <span className="bk-t" style={{ fontFamily: bookFont(c.t) }} lang={c.t}>{SELF[c.t]}</span>}
    <span className="bk-l">LISAN</span><span className="bk-b">{passedOf(tr)}/6</span>
  </div>; }

/* ---------- the shelf ---------- */
export default function Shelf({ book = null }){
  useStore(); const { u, go } = useApp(); const x = u.x; const n = Store.profile().native;
  const ids = REGIONS.flatMap(([, ls]) => ls).map((t) => n + '-' + t).filter((tr) => COURSES[tr]);
  const N = ids.length, C = N * 3;
  const startIdx = (() => { const lp = Store.d.lastPlace; if (lp && ids.includes(lp.tr)) return ids.indexOf(lp.tr);
    const a = act().tr || {}; let bt = null, bk = ''; for (const tr of ids){ const ks = Object.keys(a[tr] || {}).sort(); const k = ks[ks.length - 1] || ''; if (k > bk){ bk = k; bt = tr; } } return bt ? ids.indexOf(bt) : 0; })();
  const sec = useRef(null), stage = useRef(null), tapes = useRef([]), covers = useRef([]), spines = useRef([]), cur = useRef(null), ring = useRef(null), ind = useRef(null), tabs = useRef({}), caps = useRef([]), dlg = useRef(null), circles = useRef([]);
  const S = useRef({ s: startIdx + N, T: startIdx + N, hover: -1, lift: new Array(C).fill(0), active: -1, dir: 1, mx: -1e4, my: -1e4, cx: -1e4, cy: -1e4, tX: 0, tY: 0, on: false, inSec: false, open: false, drag: null, wheelT: 0, dims: null }).current;
  const [detail, setDetail] = useState(null); const opened = useRef(false);
  const rel = (v) => { let r = ((v - S.s) % C + C) % C; if (r >= C / 2) r -= C; return r; };
  const B = (r) => Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) * 0.5;
  const measure = () => { const el = sec.current; if (!el) return; const pr = document.createElement('div'); pr.style.cssText = 'position:absolute;visibility:hidden;height:var(--H)'; el.appendChild(pr); const H = pr.getBoundingClientRect().height; pr.remove();
    const d = { H, ws: H * 0.2, d: H * 0.7, gap: H * 0.035 }; S.dims = d; const st = stage.current; st.style.setProperty('--H', H + 'px'); st.style.setProperty('--ws', d.ws + 'px'); st.style.setProperty('--d', d.d + 'px'); };
  const F = (r) => { const { ws, d, gap } = S.dims; return r * (ws + gap) + (d - ws + 1.6 * gap) * B(r); };
  const go2 = (t) => { S.T = t; };
  const idxOfTarget = () => ((Math.round(S.T) % N) + N) % N;

  /* caption swap: the new line slides in through its mask, the old one slides out */
  const caption = (i, dir) => { const tr = ids[i]; const c = COURSES[tr]; const k = passedOf(tr);
    const texts = [LEARN[n](c.t), SELF[c.t] + ' · ' + (LNAME.en[c.t] || '').toUpperCase(), k + '/6 ' + x.passedN + ' · ' + x.shelfHint];
    caps.current.forEach((m, j) => { if (!m) return; const sp = document.createElement('span'); sp.textContent = texts[j]; sp.className = 'cap-l'; if (j === 1) sp.lang = c.t;
      const olds = [...m.children].filter((e) => !e.dataset.leaving); m.appendChild(sp); if (reduced() || !olds.length){ olds.forEach((e) => e.remove()); return; }
      sp.animate([{ transform: `translateY(${dir * 105}%)` }, { transform: 'translateY(0)' }], { duration: 650, easing: EASE, fill: 'both' });
      olds.forEach((e) => { e.dataset.leaving = '1'; const a = e.animate([{ transform: getComputedStyle(e).transform === 'none' ? 'translateY(0)' : getComputedStyle(e).transform }, { transform: `translateY(${-dir * 105}%)` }], { duration: 650, easing: EASE, fill: 'both' }); a.onfinish = () => e.remove(); }); });
    const rg = regionOf(c.t); const b = tabs.current[rg]; const el = ind.current;
    if (b && el){ el.style.width = b.offsetWidth + 'px'; el.style.transform = `translateX(${b.offsetLeft}px)`; }
    Object.entries(tabs.current).forEach(([k2, bt]) => bt && bt.classList.toggle('on', k2 === rg)); };

  /* ---------- animation loop ---------- */
  useLayoutEffect(() => { measure(); let raf = 0, last = performance.now();
    const frame = (now) => { const dt = Math.min(0.05, (now - last) / 1000); last = now; if (!S.dims){ raf = requestAnimationFrame(frame); return; }
      const red = reduced(); const k = red ? 1e3 : S.drag && S.drag.moved ? 18 : 5.2; S.s += (S.T - S.s) * (1 - Math.exp(-k * dt)); if (Math.abs(S.T - S.s) < 1e-4) S.s = S.T;
      if (Math.abs(S.s) > N * 6){ const sh = Math.round(S.s / N) * N - N; S.s -= sh; S.T -= sh; }
      const W = sec.current.clientWidth; const { H, ws, d } = S.dims;
      for (let v = 0; v < C; v++){ const el = tapes.current[v]; if (!el) continue; const r = rel(v); const xx = F(r);
        if (Math.abs(xx) > W / 2 + 1.5 * d){ if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden'; continue; } el.style.visibility = 'visible';
        const tgt = S.hover === v && Math.abs(r) > .5 ? 1 : 0; S.lift[v] += (tgt - S.lift[v]) * (red ? 1 : 1 - Math.exp(-12 * dt));
        const o = sstep(Math.max(0, 1 - Math.abs(r)));
        const ry = -90 * o + S.tY * o, rx = S.tX * o, rz = -4.5 * o, z = o * 0.2 * H, y = -o * 0.025 * H - S.lift[v] * 0.045 * H;
        el.style.transform = `translate3d(${xx}px,${y}px,${z}px) rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg)`; el.style.zIndex = String(Math.round(100 - Math.abs(r) * 4));
        spines.current[v] && spines.current[v].style.setProperty('--shade', String(o * .55)); covers.current[v] && covers.current[v].style.setProperty('--shade', String((1 - o) * .5)); }
      const ai = ((Math.round(S.s) % N) + N) % N; if (ai !== S.active){ const dir = Math.sign(S.T - S.s) || S.dir; S.dir = dir; S.active = ai; caption(ai, dir); }
      // tilt towards the pointer, and the cursor states
      const rect = sec.current.getBoundingClientRect(); const cyS = rect.top + rect.height * 0.5 + 18; const cxS = rect.left + W / 2;
      S.on = S.inSec && !S.open && Math.abs(S.mx - cxS) < 0.55 * d && Math.abs(S.my - cyS) < 0.55 * H && Math.abs(S.T - S.s) < .3;
      const tY = S.on ? (S.mx - cxS) / (0.55 * d) * 9 : S.inSec ? (S.mx - cxS) / W * 5 : 0, tX = S.on ? -(S.my - cyS) / (H / 2) * 6 : 0;
      S.tY += (tY - S.tY) * (1 - Math.exp(-7 * dt)); S.tX += (tX - S.tX) * (1 - Math.exp(-7 * dt));
      if (ring.current){ const sc = S.open ? 0 : sstep(Math.max(0, 1 - Math.abs(S.T - S.s) * 3)); ring.current.style.transform = `scale(${sc})`; }
      if (cur.current){ const a = red ? 1 : 1 - Math.exp(-16 * dt); S.cx += (S.mx - S.cx) * a; S.cy += (S.my - S.cy) * a; if (S.cx < -1e3){ S.cx = S.mx; S.cy = S.my; }
        cur.current.style.transform = `translate3d(${S.cx}px,${S.cy}px,0)`; const hv = S.hover >= 0 && Math.abs(rel(S.hover)) > .5;
        cur.current.className = 'bk-cur' + (S.inSec && !S.open ? ' show' : '') + (S.on ? ' open' : hv ? ' spine' : S.btn ? ' btn' : ''); }
      raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame); const onR = () => measure(); addEventListener('resize', onR);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onR); }; }, [N, n]);

  /* ---------- input ---------- */
  useEffect(() => { const el = sec.current;
    const down = (e) => { if (S.open || e.button > 0) return; S.drag = { x: e.clientX, T: S.T, moved: false, id: e.pointerId }; };
    const move = (e) => { S.mx = e.clientX; S.my = e.clientY; if (S.inSec && !S.open){ const hv = hitAt(e.clientX, e.clientY); S.hover = hv == null ? -1 : hv; } S.btn = !!(e.target.closest && e.target.closest('button,a')) && !e.target.closest('.bk'); const D = S.drag; if (!D || S.open) return; const dx = e.clientX - D.x;
      if (!D.moved && Math.abs(dx) > 5){ D.moved = true; try { el.setPointerCapture(D.id); } catch (er){} } if (D.moved) S.T = D.T - dx / (S.dims.ws + S.dims.gap); };
    const up = (e) => { const D = S.drag; S.drag = null; if (D && D.moved){ S.T = Math.round(S.T); S.suppress = Date.now(); return; } if (D && !S.open && !(e.target.closest && e.target.closest('button,a,nav'))){ const v = hitAt(e.clientX, e.clientY); if (v != null) clickTape(v); } };
    const wheel = (e) => { if (S.open || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; e.preventDefault(); S.T += e.deltaX / (S.dims.ws + S.dims.gap) * 0.5; clearTimeout(S.wheelT); S.wheelT = setTimeout(() => { S.T = Math.round(S.T); }, 160); };
    const enter = () => { S.inSec = true; }, leave = () => { S.inSec = false; S.hover = -1; };
    el.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up); el.addEventListener('wheel', wheel, { passive: false }); el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave);
    const key = (e) => { if (/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '')) return; if (e.key === 'Escape' && S.open){ close(); return; }
      if (S.open) return; const r = sec.current.getBoundingClientRect(); if (r.bottom < 80 || r.top > innerHeight - 80) return;
      if (e.key === 'ArrowRight'){ S.T = Math.round(S.T) + 1; e.preventDefault(); } else if (e.key === 'ArrowLeft'){ S.T = Math.round(S.T) - 1; e.preventDefault(); } else if (e.key === 'Enter' && document.activeElement === document.body) openBook(ids[idxOfTarget()]); };
    addEventListener('keydown', key);
    return () => { el.removeEventListener('pointerdown', down); removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); el.removeEventListener('wheel', wheel); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); removeEventListener('keydown', key); }; }, [N]);
  const hitAt = (cx, cy) => { if (!S.dims || !sec.current) return null; const rc = sec.current.getBoundingClientRect(); const W = rc.width; const lx = cx - rc.left - W / 2, ly = cy - (rc.top + rc.height * 0.5 + 18); const { H, ws, d, gap } = S.dims;
    if (Math.abs(ly) > H * 0.56) return null; let best = null, bd = 1e9; for (let v = 0; v < C; v++){ const r = rel(v); const o = sstep(Math.max(0, 1 - Math.abs(r))); const half = (ws + (d - ws) * o) / 2 + gap / 2; const dx = Math.abs(F(r) - lx); if (dx < half && dx < bd){ bd = dx; best = v; } } return best; };
  const clickTape = (v) => { const r = rel(v); if (Math.abs(r) < .5) openBook(ids[v % N]); else S.T = Math.round(S.T + r); };
  const jump = (rg) => { const t = rg ? ids.findIndex((tr) => regionOf(COURSES[tr].t) === rg) : 0; if (t < 0) return; const curI = Math.round(S.T); let best = curI, bd = 1e9;
    for (let k = -2; k <= 2; k++){ const cand = Math.floor(curI / N) * N + t + k * N; if (Math.abs(cand - curI) < bd){ bd = Math.abs(cand - curI); best = cand; } } S.T = best; };

  /* ---------- open / close the book ---------- */
  const openBook = (tr) => { opened.current = true; go('book/' + tr); };
  const close = () => { if (opened.current){ opened.current = false; history.back(); } else go(''); };
  const coverRect = () => { const v = Math.round(S.s); const vi = ((v % C) + C) % C; const el = covers.current[vi]; return el ? el.getBoundingClientRect() : null; };
  useEffect(() => { if (book && ids.includes(book)){ const i = ids.indexOf(book); if (idxOfTarget() !== i){ const base = Math.floor(Math.round(S.T) / N) * N; S.s = S.T = base + i; S.active = -1; }
      setDetail(book); requestAnimationFrame(() => requestAnimationFrame(() => animOpen())); }
    else if (!book && S.open) animClose(); }, [book]);
  const animOpen = () => { const el = dlg.current; if (!el) return; S.open = true; S.T = Math.round(S.T); document.documentElement.style.overflow = 'hidden';
    const r = coverRect() || { left: innerWidth / 2 - 100, top: innerHeight / 2 - 150, right: innerWidth / 2 + 100, bottom: innerHeight / 2 + 150, width: 200, height: 300 };
    const W = innerWidth, H = innerHeight, red = reduced(); el.style.visibility = 'visible'; el.scrollTop = 0; el.getAnimations().forEach((a) => a.cancel());
    el.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    el.animate([{ clipPath: `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round 3px)`, transform: 'rotate(-4.5deg)' }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', transform: 'rotate(0deg)' }], { duration: red ? 1 : 1050, easing: 'cubic-bezier(.76,0,.18,1)', fill: 'both' });
    el.querySelectorAll('.rise').forEach((e, i) => e.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }], { duration: red ? 1 : 900, delay: red ? 0 : 620 + i * 75, easing: EASE, fill: 'both' }));
    const BL = [[150, 330, 0], [340, 600, 120], [250, 120, 220], [90, 760, 300], [400, 250, 360], [260, 860, 420], [230, 470, 180]]; const t0 = performance.now() + (red ? -5000 : 520);
    circles.current.forEach((c) => c && c.setAttribute('r', '0'));
    const ink = (now) => { BL.forEach(([, , dl], j) => { const p = Math.max(0, Math.min(1, (now - t0 - dl) / 1250)); const c = circles.current[j]; if (c) c.setAttribute('r', String(720 * (1 - Math.pow(1 - p, 3)))); }); if (now - t0 < 2400 && S.open) requestAnimationFrame(ink); };
    requestAnimationFrame(ink); };
  const animClose = () => { const el = dlg.current; if (!el) return; const r = coverRect(); const W = innerWidth, H = innerHeight; document.documentElement.style.overflow = '';
    if (!r || reduced()){ el.style.visibility = 'hidden'; el.getAnimations().forEach((a) => a.cancel()); S.open = false; setDetail(null); return; }
    el.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    const a = el.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)', transform: 'rotate(0deg)' }, { clipPath: `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round 3px)`, transform: 'rotate(-4.5deg)' }], { duration: 850, easing: 'cubic-bezier(.76,0,.18,1)', fill: 'both' });
    a.onfinish = () => { el.style.visibility = 'hidden'; el.getAnimations().forEach((q) => q.cancel()); S.open = false; setDetail(null); }; };
  useEffect(() => () => { document.documentElement.style.overflow = ''; }, []);

  const lp = Store.d.lastPlace && COURSES[Store.d.lastPlace.tr] && COURSES[Store.d.lastPlace.tr].n === n ? Store.d.lastPlace : null;
  const present = REGIONS.filter(([, ls]) => ls.some((t) => COURSES[n + '-' + t]));
  return <section ref={sec} className="bk-sec" aria-label="Courses shelf" dir="ltr" data-shelf>
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true"><defs><pattern id="lsDots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.4" fill="rgba(0,0,0,.16)"/></pattern></defs></svg>
    <div className="bk-head" dir={u.dir}>
      <div className="min-w-0"><div className="text-sm text-[#6D6A63]">{u.hello}, <bdi dir="ltr" className="font-semibold text-[#141414]">@{Store.profile().username}</bdi></div><h1 className="bk-h1">{u.whatLearn}</h1></div>
      {lp && <a href={`#/learn/${lp.tr}/${lp.L.toLowerCase()}${lp.tab ? '/' + lp.tab : ''}`} className="bk-box bk-cont" data-continue><I.play className="w-3.5 h-3.5"/>{x.contT}: {LEARN[n](COURSES[lp.tr].t)} · {lp.L}</a>}
    </div>
    <nav className="bk-tabs" aria-label="Regions" dir={u.dir}>
      <span ref={ind} className="bk-ind" aria-hidden="true"/>
      <button className="bk-tab" onClick={() => jump('')}>{x.shAll}</button>
      {present.map(([rg]) => <button key={rg} ref={(e) => (tabs.current[rg] = e)} className="bk-tab" onClick={() => jump(rg)} data-region={rg}>{x['sh' + rg[0].toUpperCase() + rg[1]]}</button>)}
    </nav>
    <div className="bk-plank" aria-hidden="true"/>
    <div className="bk-persp"><div ref={stage} className="bk-stage">
      {Array.from({ length: C }, (_, v) => { const tr = ids[v % N]; return <div key={v} ref={(e) => (tapes.current[v] = e)} className="bk" data-book={tr} data-v={v}
>
        <div ref={(e) => (spines.current[v] = e)} className="bk-face bk-spf"><Spine tr={tr}/></div>
        <div ref={(e) => (covers.current[v] = e)} className="bk-face bk-cvf"><svg viewBox="0 0 500 714" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true"><CoverArt tr={tr}/></svg></div>
      </div>; })}
    </div></div>
    <button ref={ring} className="bk-ring" onClick={() => openBook(ids[idxOfTarget()])} aria-label={x.openCourse} data-open-ring><I.play className="w-3.5 h-3.5 translate-x-[1px]"/></button>
    <div className="bk-cap" aria-live="polite">
      <div className="bk-mask bk-c1" ref={(e) => (caps.current[0] = e)}/>
      <div className="bk-mask bk-c2" ref={(e) => (caps.current[1] = e)}/>
      <div className="bk-mask bk-c3" ref={(e) => (caps.current[2] = e)} dir={u.dir}/>
    </div>
    <button className="bk-arrow bk-al" onClick={() => { S.T = Math.round(S.T) - 1; }} aria-label={x.prevB} data-prev><svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 1 L1 5 L5 9 M1 5 H17"/></svg></button>
    <button className="bk-arrow bk-ar" onClick={() => { S.T = Math.round(S.T) + 1; }} aria-label={x.nextB} data-next-book><svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M13 1 L17 5 L13 9 M17 5 H1"/></svg></button>
    <div className="bk-grain" aria-hidden="true"/>
    <div ref={cur} className="bk-cur" aria-hidden="true"><span className="bk-cr"/><span className="bk-cd"/><span className="bk-cl">{x.openB}</span></div>
    <BookDetail dref={dlg} circles={circles} tr={detail} close={close}/>
  </section>;
}

/* ---------- the opened book ---------- */
function Rise({ children, className = '' }){ return <div className="bk-mk"><div className={'rise ' + className}>{children}</div></div>; }
function BookDetail({ dref, circles, tr, close }){
  const { u } = useApp(); const x = u.x;
  const c = tr ? COURSES[tr] : null;
  const BL = [[150, 330], [340, 600], [250, 120], [90, 760], [400, 250], [260, 860], [230, 470]].map(([a, b]) => [a * 500 / 474, b * 714 / 900]);
  return <div ref={dref} className="bk-dlg" role="dialog" aria-modal="true" aria-label={c ? LEARN[c.n](c.t) : ''} dir="ltr" data-book-detail>
    <button className="bk-box bk-close" onClick={close} data-close-book><I.x className="w-3.5 h-3.5"/>{x.closeB}</button>
    {c && <div className="bk-dgrid">
      <div className="bk-dleft" dir={u.dir}>
        <Rise className="bk-sub"><span lang={c.t}>{SELF[c.t]}</span> · {(LNAME.en[c.t] || '').toUpperCase()}</Rise>
        <Rise className="bk-dt">{LEARN[c.n](c.t)}</Rise>
        <Rise className="bk-meta">A1 — C2 · {passedOf(tr)}/6 {x.passedN}{dueCount(tr) ? ' · ↻ ' + dueCount(tr) : ''}</Rise>
        <Rise className="bk-lh">{x.levelsT}</Rise>
        <div className="bk-levels">{LEVELS.map((L, i) => { const passed = Store.passed(tr, L), open = Store.unlocked(tr, i), paid = hasAccess(tr, L); const best = Store.d.best[tr + ':' + L];
          return <Rise key={L}><a href={`#/learn/${tr}/${L.toLowerCase()}`} className={`bk-lv ${passed ? 'is-pass' : open ? 'is-open' : ''}`} data-lv={L}>
            <span className="bk-lvb">{L}</span>
            <span className="bk-lvt"><b>{u.lv[L]}</b><small>{u.lvd[L]}</small></span>
            <span className="bk-lvs">{passed ? <><I.check className="w-3.5 h-3.5"/>{best != null ? best + '%' : ''}</> : !paid ? <I.star className="w-3.5 h-3.5"/> : open ? <I.next className="w-3.5 h-3.5 rtl:rotate-180"/> : <I.lock className="w-3.5 h-3.5"/>}</span>
          </a></Rise>; })}</div>
        <Rise><a href={'#/dict/' + tr} className="bk-dict" data-book-dict><span className="bk-dicti"><I.book className="w-5 h-5"/></span><span className="flex-1 min-w-0"><b>{x.dict}</b><small>{x.dictD}</small></span><span className="bk-tag">★ {mine(tr).length}</span></a></Rise>
        <Rise className="bk-tools"><a href={'#/placement/' + tr} className="bk-box">◎ {u.p.placement}</a><a href={'#/review/' + tr} className="bk-box">↻ {u.p.review}</a><a href={'#/games/' + tr} className="bk-box">🎮 {x.games}</a><a href={'#/learn/' + tr} className="bk-box">{x.fullCourse}</a></Rise>
      </div>
      <div className="bk-poster" aria-hidden="true">
        <svg viewBox="0 0 500 714" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="bkInk" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="120" xChannelSelector="R" yChannelSelector="G"/></filter>
            <mask id="bkMask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="900" height="1114"><g filter="url(#bkInk)">{BL.map(([cx, cy], j) => <circle key={j} ref={(e) => (circles.current[j] = e)} cx={cx} cy={cy} r="0" fill="#fff"/>)}</g></mask>
            <clipPath id="bkClip"><rect width="500" height="714" rx="4"/></clipPath>
          </defs>
          <g clipPath="url(#bkClip)" mask="url(#bkMask)"><CoverArt tr={tr}/></g>
        </svg>
      </div>
    </div>}
  </div>;
}
