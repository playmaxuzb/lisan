// @ts-nocheck
// Study time, daily goal, streak, skill accuracy and the daily reminder.
import { Store, setAnswerHook, COURSES } from './engine';

export const dayKey = (t = Date.now()) => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const back = (k, n) => { const [y, m, d] = k.split('-').map(Number); return dayKey(new Date(y, m - 1, d - n, 12).getTime()); };
export function act(){ const a = Store.d.act || (Store.d.act = {}); a.days = a.days || {}; a.tr = a.tr || {}; if (!a.goal) a.goal = 10; a.best = a.best || 0; return a; }

/* ---------- time ---------- */
let pending = {}, lastInput = Date.now(), timer = null;
export function noteInput(){ lastInput = Date.now(); }
export function studyRoute(route){ const r = route[0]; if (r === 'learn' && route[1]) return route[1]; if (['review', 'placement', 'games', 'dict', 'speak'].includes(r) && route[1]) return route[1]; return null; }
export function startClock(getRoute){ if (timer) return; ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((e) => addEventListener(e, noteInput, { passive: true }));
  let n = 0; timer = setInterval(() => { const tr = studyRoute(getRoute()); const audio = document.querySelector('.speaking, .playing, .talking');
    if (tr && COURSES[tr] && document.visibilityState === 'visible' && (Date.now() - lastInput < 120000 || audio)){ pending[tr] = (pending[tr] || 0) + 15; }
    if (++n % 4 === 0) flush(); }, 15000);
  addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); }); }
export function flush(){ const ks = Object.keys(pending); if (!ks.length || !Store.meta.current) return; const a = act(); const k = dayKey();
  const before = goalDone();
  ks.forEach((tr) => { const s = pending[tr]; a.days[k] = (a.days[k] || 0) + s; const t = a.tr[tr] || (a.tr[tr] = {}); t[k] = (t[k] || 0) + s; }); pending = {};
  const keys = Object.keys(a.days).sort(); if (keys.length > 400) keys.slice(0, keys.length - 400).forEach((x) => delete a.days[x]);
  a.best = Math.max(a.best, streak()); Store.save(); if (!before && goalDone()) goalHook && goalHook(); }
let goalHook = null; export function onGoal(f){ goalHook = f; }
export const secToday = () => (act().days[dayKey()] || 0) + Object.values(pending).reduce((x, y) => x + y, 0);
export const goalDone = (k = dayKey()) => { const a = act(); const s = (a.days[k] || 0) + (k === dayKey() ? Object.values(pending).reduce((x, y) => x + y, 0) : 0); return s >= a.goal * 60; };
export function streak(){ let k = dayKey(); let n = 0; if (!goalDone(k)) k = back(k, 1); while (goalDone(k)){ n++; k = back(k, 1); } return n; }
export function setGoal(min){ act().goal = min; Store.save(); }
export function lastDays(n = 7, tr = null){ const a = act(); const src = tr ? (a.tr[tr] || {}) : a.days; const out = []; let k = dayKey(); for (let i = 0; i < n; i++){ out.unshift([k, src[k] || 0]); k = back(k, 1); } return out; }
export const totalSec = (tr = null) => Object.values(tr ? (act().tr[tr] || {}) : act().days).reduce((x, y) => x + y, 0);

/* ---------- skills ---------- */
export const SKILL = { kMean: 'vocab', kRev: 'vocab', kListen: 'listen', kLetter: 'listen', pq_listen: 'listen', pq_lsent: 'listen', kSent: 'read', pq_sent: 'read', kOrder: 'read', kGram: 'gram', pq_gram: 'gram', kSpell: 'write', speak: 'speak', game: 'vocab', pq_mean: 'vocab', pq_rev: 'vocab' };
export function skill(tr, name, ok){ const s = Store.d.sk || (Store.d.sk = {}); const t = s[tr] || (s[tr] = {}); const c = t[name] || (t[name] = [0, 0]); if (ok) c[0]++; c[1]++; Store.save(); }
export const skills = (tr) => (Store.d.sk && Store.d.sk[tr]) || {};
export function initActivity(){ setAnswerHook((tr, item, ok, kind) => { const n = SKILL[kind]; if (n){ const s = Store.d.sk || (Store.d.sk = {}); const t = s[tr] || (s[tr] = {}); const c = t[n] || (t[n] = [0, 0]); if (ok) c[0]++; c[1]++; } }); }

/* ---------- reminder ---------- */
export const remind = () => Store.d.settings.remind || null;
export async function setRemind(cfg){ Store.d.settings.remind = cfg; Store.save(); await pushToSW(); }
async function pushToSW(){ try { const c = await caches.open('lisan-meta'); const r = remind(); await c.put('remind.json', new Response(JSON.stringify(Object.assign({}, r, { done: goalDone() ? dayKey() : '', goal: act().goal, title: r && r.title, body: r && r.body })))); } catch (e){} }
export async function enableNotifications(){ if (!('Notification' in window)) return 'none'; let p = Notification.permission; if (p === 'default') p = await Notification.requestPermission(); if (p !== 'granted') return p;
  try { const reg = await navigator.serviceWorker.ready; if (reg.periodicSync){ try { await reg.periodicSync.register('lisan-remind', { minInterval: 3 * 3600e3 }); } catch (e){} } } catch (e){} return 'granted'; }
export async function checkRemindNow(){ const r = remind(); await pushToSW(); if (!r || !r.on || typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  const [h, m] = (r.time || '19:00').split(':').map(Number); const now = new Date(); if (now.getHours() * 60 + now.getMinutes() < h * 60 + m) return;
  if (goalDone() || r.shown === dayKey()) return; r.shown = dayKey(); Store.save();
  try { const reg = await navigator.serviceWorker.ready; reg.showNotification(r.title || 'Lisan', { body: r.body || '', icon: 'icon.svg', tag: 'lisan-remind' }); } catch (e){} }
export function icsFile(time, title, body){ const [h, m] = (time || '19:00').split(':'); const d = new Date(); const ymd = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  const esc = (s) => String(s).replace(/[,;\\]/g, (c) => '\\' + c).replace(/\n/g, ' ');
  const url = location.origin + location.pathname;
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lisan//Reminder//EN', 'BEGIN:VEVENT', 'UID:lisan-daily-' + Date.now() + '@lisan', 'DTSTAMP:' + ymd + 'T000000', 'DTSTART:' + ymd + 'T' + h.padStart(2, '0') + m.padStart(2, '0') + '00', 'DURATION:PT15M', 'RRULE:FREQ=DAILY',
    'SUMMARY:' + esc(title), 'DESCRIPTION:' + esc(body + ' ' + url), 'URL:' + url, 'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc(title), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'lisan-reminder.ics'; document.body.appendChild(a); a.click(); a.remove(); }
