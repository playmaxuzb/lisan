// @ts-nocheck
import { Store, norm, COURSES } from './engine';
/* personal words (saved from lessons or typed by the learner) */
export const mine = (tr) => { const m = Store.d.mydict || (Store.d.mydict = {}); return m[tr] || (m[tr] = []); };
export const isSaved = (tr, src) => mine(tr).some((w) => norm(w.src, COURSES[tr].t) === norm(src, COURSES[tr].t));
export function saveWord(tr, src, m, extra = {}){ if (isSaved(tr, src)) return false; mine(tr).unshift(Object.assign({ src: String(src).trim(), m: String(m || '').trim(), at: Date.now() }, extra)); Store.save(); return true; }
export function removeWord(tr, src){ const t = COURSES[tr].t; const a = mine(tr); const i = a.findIndex((w) => norm(w.src, t) === norm(src, t)); if (i >= 0){ a.splice(i, 1); Store.save(); } }

