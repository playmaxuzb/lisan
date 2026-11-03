// @ts-nocheck
// Download a whole language (its lessons and every audio pack) into the browser for offline use.
import { COURSES, LEVELS, Store } from './engine';
const KEY = 'lisan.offline';
const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e){ return {}; } };
const put = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e){} Store.emit(); };
export const offlineSupported = () => typeof caches !== 'undefined' && 'serviceWorker' in navigator;
export function registerSW(){ if (!('serviceWorker' in navigator) || location.hostname === 'localhost' && !/sw=1/.test(location.search)) return;
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {})); }
export const isOffline = (tr) => !!get()[tr];
const urls = (tr) => { const c = COURSES[tr]; const out = ['data/' + c.bank + '.json', 'data/courses.json', 'data/gloss.json'];
  LEVELS.forEach((L) => { out.push('audio/' + c.t + '-' + L + '.json', 'audio/' + c.t + '-' + L + '-w.json'); }); return out; };
export async function download(tr, onProgress){
  const list = urls(tr); const data = await caches.open('lisan-data'), audio = await caches.open('lisan-audio'); let done = 0, bytes = 0;
  for (const u of list){ const c = u.startsWith('audio/') ? audio : data;
    try { const r = await fetch(u, { cache: 'reload' }); if (r.ok){ const b = await r.clone().blob(); bytes += b.size; await c.put(u, r); } } catch (e){}
    done++; onProgress && onProgress(done / list.length, bytes); }
  const o = get(); o[tr] = { at: Date.now(), bytes }; put(o); return bytes; }
export async function remove(tr){ const c = COURSES[tr]; const audio = await caches.open('lisan-audio');
  const still = Object.keys(get()).filter((k) => k !== tr && COURSES[k] && COURSES[k].t === c.t);
  if (!still.length) for (const L of LEVELS){ await audio.delete('audio/' + c.t + '-' + L + '.json'); await audio.delete('audio/' + c.t + '-' + L + '-w.json'); }
  const o = get(); delete o[tr]; put(o); }
export const sizeOf = (tr) => (get()[tr] || {}).bytes || 0;
