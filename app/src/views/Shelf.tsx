// @ts-nocheck
// Home bookshelf: every course is a book with its country's flag and colours. Hovering a book (or tapping it on a phone)
// turns it to face you; clicking the open book grows a sheet out of its cover with the levels and the dictionary.
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Store, LEVELS, COURSES } from '@/core/engine';
import { LEARN, LNAME } from '@/core/strings_app';
import { Flag, FlagIn } from '@/core/flags';
import { hasAccess } from '@/core/pro';
import { mine } from '@/core/mydict';
import { dueCount } from '@/core/srs';
import { act } from '@/core/activity';
import { useApp, useStore, I } from '@/ui/kit';

/* colours that people associate with each country */
export const BOOK = {
  ru: { bg: '#24418F', fg: '#FFFFFF', ac: '#D52B1E', g: 'Ж' }, en: { bg: '#1E2A5A', fg: '#FFFFFF', ac: '#B22234', g: 'Aa' }, ar: { bg: '#0B6E4F', fg: '#FFFFFF', ac: '#C9A227', g: 'ض' },
  uz: { bg: '#0099B5', fg: '#FFFFFF', ac: '#1EB53A', g: 'Oʻ' }, es: { bg: '#C60B1E', fg: '#FFFFFF', ac: '#FFC400', gc: '#5A0610', g: 'Ñ' }, zh: { bg: '#DE2910', fg: '#FFDE00', ac: '#FFDE00', gc: '#DE2910', g: '字' },
  de: { bg: '#1A1A1A', fg: '#FFCE00', ac: '#DD0000', gc: '#FFCE00', g: 'ß' }, fr: { bg: '#0055A4', fg: '#FFFFFF', ac: '#EF4135', g: 'Ç' }, it: { bg: '#008C45', fg: '#FFFFFF', ac: '#CD212A', g: 'È' },
  tr: { bg: '#E30A17', fg: '#FFFFFF', ac: '#FFFFFF', gc: '#E30A17', g: 'Ğ' }, ja: { bg: '#F5F1E8', fg: '#141414', ac: '#BC002D', gc: '#FFFFFF', g: 'あ' }, ko: { bg: '#0047A0', fg: '#FFFFFF', ac: '#CD2E3A', g: '한' }
};
const ORDER = ['en', 'ru', 'ar', 'zh', 'es', 'de', 'fr', 'it', 'tr', 'ja', 'ko', 'uz'];
export const bookFont = (t) => t === 'ar' ? '"Amiri","IBM Plex Sans Arabic",serif' : t === 'zh' ? '"Noto Sans SC",sans-serif' : t === 'ja' ? '"Noto Sans JP",sans-serif' : t === 'ko' ? '"Noto Sans KR",sans-serif' : '"Lora",Georgia,serif';
const uiFont = (n) => n === 'ar' ? '"IBM Plex Sans Arabic",sans-serif' : n === 'zh' ? '"Noto Sans SC",sans-serif' : n === 'ja' ? '"Noto Sans JP",sans-serif' : n === 'ko' ? '"Noto Sans KR",sans-serif' : 'Inter,sans-serif';
export const langName = (n, t) => { const s = (LNAME[n] || LNAME.en)[t] || t; return n === 'ru' || n === 'uz' || n === 'es' || n === 'fr' || n === 'it' ? s.charAt(0).toUpperCase() + s.slice(1) : s; };
const passedOf = (tr) => LEVELS.filter((L) => Store.passed(tr, L)).length;
const EASE = 'cubic-bezier(.2,.8,.2,1)';
const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => typeof matchMedia !== 'undefined' && matchMedia('(hover:hover) and (pointer:fine)').matches;
const sstep = (x) => x * x * (3 - 2 * x);

/* the cover (SVG, also used for the poster in the opened book) */
export function CoverArt({ tr }){
  const c = COURSES[tr]; const B = BOOK[c.t]; const p = passedOf(tr); const name = langName(c.n, c.t); const long = name.length > 10;
  return <g>
    <rect width="500" height="714" fill={B.bg}/>
    <rect y="480" width="500" height="234" fill="url(#lsDots)"/>
    <g><rect x="170" y="44" width="160" height="104" rx="10" fill="#fff"/><FlagIn lang={c.t} x={176} y={50} w={148} h={92}/></g>
    <circle cx="250" cy="318" r="122" fill={B.ac}/>
    <circle cx="250" cy="318" r="142" fill="none" stroke={B.fg} strokeWidth="2" strokeDasharray="2 9"/>
    <text x="250" y="322" textAnchor="middle" dominantBaseline="central" fontSize={B.g.length > 1 ? 120 : 150} fontWeight="700" fill={B.gc || B.fg} fontFamily={bookFont(c.t)}>{B.g}</text>
    <text x="250" y="560" textAnchor="middle" fontSize={long ? 50 : 64} fontWeight="800" fill={B.fg} fontFamily={uiFont(c.n)}>{name}</text>
    {LEVELS.map((L, i) => <rect key={L} x={34 + i * 34} y="646" width="26" height="26" rx="6" fill={i < p ? B.fg : 'none'} stroke={B.fg} strokeWidth="1.8"/>)}
    <rect x="370" y="644" width="98" height="30" rx="15" fill={B.fg}/><text x="419" y="664" textAnchor="middle" fontSize="15" fontWeight="800" fill={B.bg} fontFamily="Inter,sans-serif" letterSpacing="1.5">A1–C2</text>
  </g>;
}
function Spine({ tr }){ const c = COURSES[tr]; const B = BOOK[c.t]; const name = langName(c.n, c.t); const stack = ['zh', 'ja', 'ko'].includes(c.n);
  return <div className="bk-sp" style={{ background: B.bg, color: B.fg }}>
    <Flag lang={c.t} size="sm" className="bk-flag"/>
    {stack ? <span className="bk-t bk-tc" style={{ fontFamily: uiFont(c.n) }}>{[...name].map((ch, i) => <span key={i}>{ch}</span>)}</span>
      : <span className="bk-t" style={{ fontFamily: uiFont(c.n) }}>{name}</span>}
    <span className="bk-b">{passedOf(tr)}/6</span>
  </div>; }

export default function Shelf({ book = null }){
  useStore(); const { u, go } = useApp(); const x = u.x; const n = Store.profile().native;
  const ids = ORDER.map((t) => n + '-' + t).filter((tr) => COURSES[tr]); const N = ids.length, C = N * 3;
  const startIdx = (() => { const lp = Store.d.lastPlace; if (lp && ids.includes(lp.tr)) return ids.indexOf(lp.tr);
    const a = act().tr || {}; let bt = null, bk = ''; for (const tr of ids){ const ks = Object.keys(a[tr] || {}).sort(); const k = ks[ks.length - 1] || ''; if (k > bk){ bk = k; bt = tr; } } return bt ? ids.indexOf(bt) : 0; })();
  const sec = useRef(null), stage = useRef(null), tapes = useRef([]), covers = useRef([]), spines = useRef([]), caps = useRef([]), dlg = useRef(null), circles = useRef([]), chips = useRef({}), chipRow = useRef(null);
  const S = useRef({ s: startIdx + N, T: startIdx + N, sel: startIdx + N, o: null, lift: new Array(C).fill(0), active: -1, dir: 1, mx: -1e4, my: -1e4, tX: 0, tY: 0, inSec: false, open: false, drag: null, wheelT: 0, dims: null, hovT: 0 }).current;
  if (!S.o){ S.o = new Array(C).fill(0); S.o[S.sel] = 1; }
  const stepRef = useRef(null);
  const [detail, setDetail] = useState(null); const [activeTr, setActiveTr] = useState(ids[startIdx]); const opened = useRef(false);
  const rel = (v, s = S.s) => { let r = ((v - s) % C + C) % C; if (r >= C / 2) r -= C; return r; };
  const vNear = (i) => { const base = Math.round(S.T); let best = base, bd = 1e9; for (let k = -2; k <= 2; k++){ const c2 = Math.floor(base / N) * N + i + k * N; if (Math.abs(c2 - base) < bd){ bd = Math.abs(c2 - base); best = c2; } } return best; };
  const wrapV = (v) => ((v % C) + C) % C;
  const measure = () => { const el = sec.current; if (!el) return; const pr = document.createElement('div'); pr.style.cssText = 'position:absolute;visibility:hidden;height:var(--H)'; el.appendChild(pr); const H = pr.getBoundingClientRect().height; pr.remove();
    const cr = chipRow.current; const top = cr ? cr.offsetTop + cr.offsetHeight + 34 : 74; el.style.setProperty('--top', top + 'px');
    S.dims = { H, ws: H * 0.2, d: H * 0.7, gap: H * 0.04 }; const st = stage.current; st.style.setProperty('--H', H + 'px'); st.style.setProperty('--ws', S.dims.ws + 'px'); st.style.setProperty('--d', S.dims.d + 'px'); };
  /* x of every book: spines step evenly; each open book pushes its neighbours aside by half of its extra width */
  /* real on-screen width of a book while it turns: the spine shrinks with cos, the cover grows with sin */
  const widthOf = (o) => { const { ws, d, gap } = S.dims; const th = sstep(Math.max(0, Math.min(1, o))) * Math.PI / 2; return ws * Math.cos(th) + d * Math.sin(th) + 1.6 * gap * Math.sin(th); };
  const layout = () => { const { ws, gap } = S.dims; const out = new Array(C); const rs = new Array(C), ex = new Array(C);
    for (let v = 0; v < C; v++){ rs[v] = rel(v); ex[v] = S.o[v] < 1e-3 ? 0 : (widthOf(S.o[v]) - ws) / 2; }
    for (let v = 0; v < C; v++){ let xx = rs[v] * (ws + gap); for (let w = 0; w < C; w++){ if (!ex[w] || w === v) continue; xx += (rs[v] > rs[w] ? 1 : -1) * ex[w]; } out[v] = xx; } return out; };
  const select = (v) => { v = wrapV(v); if (S.sel === v) return; S.sel = v; };
  const centerSel = () => { S.sel = wrapV(Math.round(S.T)); };

  /* caption: the language name slides through its mask */
  const caption = (i, dir) => { const tr = ids[i]; const c = COURSES[tr]; setActiveTr(tr);
    const texts = [langName(n, c.t), passedOf(tr) + '/6 · ' + x.passedN];
    caps.current.forEach((m, j) => { if (!m) return; const sp = document.createElement('span'); sp.textContent = texts[j]; sp.className = 'cap-l';
      const olds = [...m.children].filter((e) => !e.dataset.leaving); m.appendChild(sp); if (reduced() || !olds.length){ olds.forEach((e) => e.remove()); return; }
      sp.animate([{ transform: `translateY(${dir * 105}%)` }, { transform: 'translateY(0)' }], { duration: 600, easing: EASE, fill: 'both' });
      olds.forEach((e) => { e.dataset.leaving = '1'; const a = e.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${-dir * 105}%)` }], { duration: 600, easing: EASE, fill: 'both' }); a.onfinish = () => e.remove(); }); });
     };

  useLayoutEffect(() => { measure(); let raf = 0, last = performance.now();
    const frame = (now) => { const dt = Math.min(0.05, (now - last) / 1000); last = now; if (!S.dims){ raf = requestAnimationFrame(frame); return; }
      const red = reduced(); const k = red ? 1e3 : S.drag && S.drag.moved ? 18 : 5.2; const prevS = S.s; S.s += (S.T - S.s) * (1 - Math.exp(-k * dt)); if (Math.abs(S.T - S.s) < 1e-4) S.s = S.T;
      if (Math.abs(S.s) > N * 6){ const sh = Math.round(S.s / N) * N - N; S.s -= sh; S.T -= sh; S.sel = wrapV(S.sel); }
      // while the shelf scrolls (arrows, drag, tabs) the book in the middle is the open one
      if (Math.abs(S.T - S.s) > .02 || (S.drag && S.drag.moved)) S.sel = wrapV(Math.round(S.s));
      const ko = red ? 1 : 1 - Math.exp(-(Math.abs(S.T - S.s) > .02 ? 14 : 9) * dt); for (let v = 0; v < C; v++){ const tg = v === S.sel ? 1 : 0; S.o[v] += (tg - S.o[v]) * ko; if (Math.abs(S.o[v] - tg) < 1e-3) S.o[v] = tg; }
      const W = sec.current.clientWidth; const { H, d } = S.dims; const xs = layout(); S.xs = xs;
      for (let v = 0; v < C; v++){ const el = tapes.current[v]; if (!el) continue; const xx = xs[v];
        if (Math.abs(xx) > W / 2 + 1.5 * d){ if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden'; continue; } el.style.visibility = 'visible';
        const o = sstep(S.o[v]); const lt = S.hoverV === v && v !== S.sel ? 1 : 0; S.lift[v] += (lt - S.lift[v]) * (red ? 1 : 1 - Math.exp(-12 * dt));
        const tilt = v === S.sel ? 1 : 0; const ry = -90 * o + S.tY * o * tilt, rx = S.tX * o * tilt, rz = -3.5 * o, z = o * 0.16 * H, y = -o * 0.02 * H - S.lift[v] * 0.04 * H;
        el.style.transform = `translate3d(${xx}px,${y}px,${z}px) rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg)`; el.style.zIndex = String(Math.round(100 + o * 50 - Math.abs(rel(v)) * 2));
        spines.current[v] && spines.current[v].style.setProperty('--shade', String(o * .55)); covers.current[v] && covers.current[v].style.setProperty('--shade', String((1 - o) * .5)); }
      const ai = S.sel % N; if (ai !== S.active){ const dir = S.active < 0 ? 1 : (rel(S.sel) >= 0 ? 1 : -1); S.active = ai; caption(ai, dir); }
      // the open book leans a little towards the mouse
      const rect = sec.current.getBoundingClientRect(); const bx = rect.left + W / 2 + (xs[S.sel] || 0); const by = S.cy0 != null ? rect.top + S.cy0 : 0;
      const onB = S.inSec && !S.open && finePointer() && Math.abs(S.mx - bx) < 0.55 * d && Math.abs(S.my - by) < 0.55 * H;
      const tY = onB ? (S.mx - bx) / (0.55 * d) * 8 : 0, tX = onB ? -(S.my - by) / (H / 2) * 5 : 0; S.tY += (tY - S.tY) * (1 - Math.exp(-7 * dt)); S.tX += (tX - S.tX) * (1 - Math.exp(-7 * dt));
      raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame); const onR = () => { measure(); S.cy0 = stage.current.offsetTop; }; onR(); addEventListener('resize', onR); try { document.fonts.ready.then(onR); } catch (e){} setTimeout(onR, 600);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onR); }; }, [N, n]);

  /* which book is under the pointer (geometry, so it works with the 3D transforms) */
  const hitAt = (cx, cy) => { if (!S.dims || !S.xs || !sec.current) return null; const rc = sec.current.getBoundingClientRect(); const lx = cx - rc.left - rc.width / 2, ly = cy - (rc.top + (S.cy0 || 0)); const { H, ws, d, gap } = S.dims;
    if (Math.abs(ly) > H * 0.55) return null; let best = null, bd = 1e9; for (let v = 0; v < C; v++){ const half = widthOf(S.o[v]) / 2 + gap / 2; const dx = Math.abs(S.xs[v] - lx); if (dx < half && dx < bd){ bd = dx; best = v; } } return best; };

  useEffect(() => { const el = sec.current;
    const down = (e) => { if (S.open || e.button > 0) return; if (e.target.closest && e.target.closest('button,a,.bk-chips')) return; S.drag = { x: e.clientX, T: S.T, moved: false, id: e.pointerId, type: e.pointerType }; };
    const move = (e) => { S.mx = e.clientX; S.my = e.clientY; const D = S.drag;
      if (D && !S.open){ const dx = e.clientX - D.x; if (!D.moved && Math.abs(dx) > 6){ D.moved = true; try { el.setPointerCapture(D.id); } catch (er){} } if (D.moved){ S.T = D.T - dx / (S.dims.ws + S.dims.gap); return; } }
      if (S.inSec && !S.open && e.pointerType === 'mouse'){ const v = hitAt(e.clientX, e.clientY); S.hoverV = v; el.style.cursor = v != null ? 'pointer' : ''; clearTimeout(S.hovT); if (v != null && v !== S.sel) S.hovT = setTimeout(() => { if (S.hoverV === v && Math.abs(S.T - S.s) < .05) select(v); }, 90); } };
    const up = (e) => { const D = S.drag; S.drag = null; if (!D) return; if (D.moved){ S.T = Math.round(S.T); centerSel(); return; }
      const v = hitAt(e.clientX, e.clientY); if (v == null) return; if (v === S.sel && S.o[v] > .6) openBook(ids[v % N]); else { select(v); if (D.type !== 'mouse'){ S.T = Math.round(S.T + rel(v)); } } };
    const wheel = (e) => { if (S.open || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; e.preventDefault(); S.T += e.deltaX / (S.dims.ws + S.dims.gap) * 0.5; clearTimeout(S.wheelT); S.wheelT = setTimeout(() => { S.T = Math.round(S.T); centerSel(); }, 160); };
    const enter = () => { S.inSec = true; }, leave = () => { S.inSec = false; S.hoverV = null; clearTimeout(S.hovT); };
    el.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', () => { S.drag = null; }); el.addEventListener('wheel', wheel, { passive: false }); el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave);
    const key = (e) => { if (/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '')) return; if (e.key === 'Escape' && S.open){ close(); return; }
      if (S.open) return; const r = sec.current.getBoundingClientRect(); if (r.bottom < 80 || r.top > innerHeight - 80) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){ stepRef.current(e.key === 'ArrowRight' ? 1 : -1); e.preventDefault(); } else if (e.key === 'Enter' && document.activeElement === document.body) openBook(ids[S.sel % N]); };
    addEventListener('keydown', key);
    return () => { el.removeEventListener('pointerdown', down); removeEventListener('pointermove', move); removeEventListener('pointerup', up); el.removeEventListener('wheel', wheel); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); removeEventListener('keydown', key); }; }, [N]);
  const step = (dlt) => { const base = Math.round(S.s) + rel(S.sel, Math.round(S.s)); S.T = Math.round(base) + dlt; };
  stepRef.current = step;
  const jumpTo = (tr) => { const i = ids.indexOf(tr); if (i < 0) return; const v = vNear(i); S.T = v; S.sel = wrapV(v); };

  /* ---------- open / close ---------- */
  const openBook = (tr) => { opened.current = true; go('book/' + tr); };
  const close = () => { if (opened.current){ opened.current = false; history.back(); } else go(''); };
  const coverRect = () => { const el = covers.current[S.sel]; return el ? el.getBoundingClientRect() : null; };
  useEffect(() => { if (book && ids.includes(book)){ if (ids[S.sel % N] !== book){ const v = vNear(ids.indexOf(book)); S.s = S.T = v; S.sel = wrapV(v); S.o.fill(0); S.o[S.sel] = 1; S.active = -1; }
      setDetail(book); requestAnimationFrame(() => requestAnimationFrame(() => animOpen())); }
    else if (!book && S.open) animClose(); }, [book]);
  const animOpen = () => { const el = dlg.current; if (!el) return; S.open = true; document.documentElement.style.overflow = 'hidden';
    const r = coverRect() || { left: innerWidth / 2 - 100, top: innerHeight / 2 - 150, right: innerWidth / 2 + 100, bottom: innerHeight / 2 + 150, width: 200, height: 300 };
    const W = innerWidth, H = innerHeight, red = reduced(); el.style.visibility = 'visible'; el.scrollTop = 0; el.getAnimations().forEach((a) => a.cancel());
    el.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    el.animate([{ clipPath: `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round 6px)`, transform: 'rotate(-3.5deg)' }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', transform: 'rotate(0deg)' }], { duration: red ? 1 : 950, easing: 'cubic-bezier(.76,0,.18,1)', fill: 'both' });
    el.querySelectorAll('.rise').forEach((e, i) => e.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }], { duration: red ? 1 : 800, delay: red ? 0 : 520 + i * 55, easing: EASE, fill: 'both' }));
    const BL = [0, 120, 220, 300, 360, 420, 180]; const t0 = performance.now() + (red ? -5000 : 450); circles.current.forEach((c) => c && c.setAttribute('r', '0'));
    const ink = (now) => { BL.forEach((dl, j) => { const p = Math.max(0, Math.min(1, (now - t0 - dl) / 1150)); const c = circles.current[j]; if (c) c.setAttribute('r', String(720 * (1 - Math.pow(1 - p, 3)))); }); if (now - t0 < 2200 && S.open) requestAnimationFrame(ink); };
    requestAnimationFrame(ink); };
  const animClose = () => { const el = dlg.current; if (!el) return; const r = coverRect(); const W = innerWidth, H = innerHeight; document.documentElement.style.overflow = '';
    if (!r || reduced()){ el.style.visibility = 'hidden'; el.getAnimations().forEach((a) => a.cancel()); S.open = false; setDetail(null); return; }
    el.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    const a = el.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)', transform: 'rotate(0deg)' }, { clipPath: `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round 6px)`, transform: 'rotate(-3.5deg)' }], { duration: 750, easing: 'cubic-bezier(.76,0,.18,1)', fill: 'both' });
    a.onfinish = () => { el.style.visibility = 'hidden'; el.getAnimations().forEach((q) => q.cancel()); S.open = false; setDetail(null); }; };
  useEffect(() => () => { document.documentElement.style.overflow = ''; }, []);

  const lp = Store.d.lastPlace && COURSES[Store.d.lastPlace.tr] && COURSES[Store.d.lastPlace.tr].n === n ? Store.d.lastPlace : null;
  return <section ref={sec} className="bk-sec" aria-label="Courses" dir="ltr" data-shelf>
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true"><defs><pattern id="lsDots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.2" fill="rgba(0,0,0,.14)"/></pattern></defs></svg>
    <div ref={chipRow} className="bk-chips no-scrollbar" dir={u.dir} role="tablist" aria-label="Languages">
      {ids.map((tr) => { const t = COURSES[tr].t; return <button key={tr} ref={(e) => (chips.current[tr] = e)} role="tab" aria-selected={activeTr === tr} className={`bk-chip ${activeTr === tr ? 'on' : ''}`} onClick={() => jumpTo(tr)} data-chip={t}>
        <Flag lang={t} size="sm"/><span>{langName(n, t)}</span></button>; })}
    </div>
    <div className="bk-plank" aria-hidden="true"/>
    <div className="bk-persp"><div ref={stage} className="bk-stage">
      {Array.from({ length: C }, (_, v) => { const tr = ids[v % N]; return <div key={v} ref={(e) => (tapes.current[v] = e)} className="bk" data-book={tr} data-v={v}>
        <div ref={(e) => (spines.current[v] = e)} className="bk-face bk-spf"><Spine tr={tr}/></div>
        <div ref={(e) => (covers.current[v] = e)} className="bk-face bk-cvf"><svg viewBox="0 0 500 714" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true"><CoverArt tr={tr}/></svg></div>
      </div>; })}
    </div></div>
    <div className="bk-cap" aria-live="polite">
      <div className="bk-mask bk-c1" ref={(e) => (caps.current[0] = e)} dir={u.dir}/>
      <div className="bk-mask bk-c3" ref={(e) => (caps.current[1] = e)} dir={u.dir}/>
      <div className="bk-acts" dir={u.dir}>
        <button className="btn sm" onClick={() => openBook(ids[S.sel % N])} data-open-book><I.book className="w-4 h-4"/>{x.openCourse}</button>
        {lp && <a href={`#/learn/${lp.tr}/${lp.L.toLowerCase()}${lp.tab ? '/' + lp.tab : ''}`} className="btn ghost sm" data-continue><I.play className="w-3.5 h-3.5"/>{x.contT}: {langName(n, COURSES[lp.tr].t)} {lp.L}</a>}
      </div>
    </div>
    <button className="bk-arrow bk-al" onClick={() => step(-1)} aria-label={x.prevB} data-prev><I.back className="w-5 h-5"/></button>
    <button className="bk-arrow bk-ar" onClick={() => step(1)} aria-label={x.nextB} data-next-book><I.next className="w-5 h-5"/></button>
    <BookDetail dref={dlg} circles={circles} tr={detail} close={close}/>
  </section>;
}

function Rise({ children, className = '' }){ return <div className="bk-mk"><div className={'rise ' + className}>{children}</div></div>; }
function BookDetail({ dref, circles, tr, close }){
  const { u } = useApp(); const x = u.x; const c = tr ? COURSES[tr] : null;
  const BL = [[150, 330], [340, 600], [250, 120], [90, 760], [400, 250], [260, 860], [230, 470]].map(([a, b]) => [a * 500 / 474, b * 714 / 900]);
  return <div ref={dref} className="bk-dlg" role="dialog" aria-modal="true" aria-label={c ? langName(c.n, c.t) : ''} dir="ltr" data-book-detail>
    <div className="bk-dbar" dir={u.dir}><button className="btn ghost sm" onClick={close} data-close-book><I.x className="w-4 h-4"/>{x.closeB}</button></div>
    {c && <div className="bk-dgrid">
      <div className="bk-dleft" dir={u.dir}>
        <Rise className="bk-dhead"><Flag lang={c.t} size="lg"/><span className="bk-dt">{langName(c.n, c.t)}</span></Rise>
        <Rise className="bk-meta">A1 — C2 · {passedOf(tr)}/6 {x.passedN}{dueCount(tr) ? ' · ↻ ' + dueCount(tr) : ''}</Rise>
        <div className="bk-levels">{LEVELS.map((L, i) => { const passed = Store.passed(tr, L), open = Store.unlocked(tr, i), paid = hasAccess(tr, L); const best = Store.d.best[tr + ':' + L];
          return <Rise key={L}><a href={`#/learn/${tr}/${L.toLowerCase()}`} className={`bk-lv ${passed ? 'is-pass' : open ? 'is-open' : 'is-lock'}`} data-lv={L}>
            <span className="bk-lvb">{L}</span>
            <span className="bk-lvt"><b>{u.lv[L]}</b><small>{passed ? u.passed + (best != null ? ' · ' + best + '%' : '') : !paid ? u.p.proBadge : open ? u.open : u.locked}</small></span>
            <span className="bk-lvs">{passed ? <I.check className="w-4 h-4"/> : !paid ? <I.star className="w-4 h-4"/> : open ? <I.next className="w-4 h-4 rtl:rotate-180"/> : <I.lock className="w-4 h-4"/>}</span>
          </a></Rise>; })}</div>
        <Rise><a href={'#/dict/' + tr} className="bk-dict" data-book-dict><span className="bk-dicti"><I.book className="w-5 h-5"/></span><span className="flex-1 min-w-0"><b>{x.dict}</b><small>{x.dictD}</small></span><span className="bk-tag">★ {mine(tr).length}</span></a></Rise>
        <Rise className="bk-tools"><a href={'#/placement/' + tr} className="btn ghost sm">◎ {u.p.placement}</a><a href={'#/review/' + tr} className="btn ghost sm">↻ {u.p.review}</a><a href={'#/games/' + tr} className="btn ghost sm">🎮 {x.games}</a></Rise>
      </div>
      <div className="bk-poster" aria-hidden="true">
        <svg viewBox="0 0 500 714" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="bkInk" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="120" xChannelSelector="R" yChannelSelector="G"/></filter>
            <mask id="bkMask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="900" height="1114"><g filter="url(#bkInk)">{BL.map(([cx, cy], j) => <circle key={j} ref={(e) => (circles.current[j] = e)} cx={cx} cy={cy} r="0" fill="#fff"/>)}</g></mask>
            <clipPath id="bkClip"><rect width="500" height="714" rx="10"/></clipPath>
          </defs>
          <g clipPath="url(#bkClip)" mask="url(#bkMask)"><CoverArt tr={tr}/></g>
        </svg>
      </div>
    </div>}
  </div>;
}
