/* Lisan offline support: the app shell, course data and audio are cached so downloaded courses work without internet. */
const V = 'lisan-v4';
// audio packs that were re-recorded: drop the old cached copies once
const AUDIO_REDO = { 'lisan-v4': ['de-'] };
const SHELL = V + '-shell', DATA = 'lisan-data', AUDIO = 'lisan-audio', FONTS = 'lisan-fonts';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(SHELL).then((c) => c.addAll(['./', './index.html'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('lisan-v') && !k.startsWith(V)).map((k) => caches.delete(k)))).then(async () => { const redo = AUDIO_REDO[V] || []; if (!redo.length) return; const c = await caches.open(AUDIO); for (const r of await c.keys()){ const f = r.url.split('/audio/')[1] || ''; if (redo.some((p) => f.startsWith(p))) await c.delete(r); } }).then(() => self.clients.claim())); });
const cacheFirst = async (req, name) => { const c = await caches.open(name); const hit = await c.match(req, { ignoreSearch: true }); if (hit) return hit; const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; };
const staleWhile = async (req, name) => { const c = await caches.open(name); const hit = await c.match(req, { ignoreSearch: true });
  const net = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit); return hit || net; };
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return; const url = new URL(req.url);
  if (url.origin === location.origin){
    if (req.mode === 'navigate') { e.respondWith(fetch(req).then((r) => { caches.open(SHELL).then((c) => c.put('./index.html', r.clone())); return r; }).catch(() => caches.match('./index.html'))); return; }
    if (url.pathname.includes('/audio/')) { e.respondWith(cacheFirst(req, AUDIO)); return; }
    if (url.pathname.includes('/data/')) { e.respondWith(staleWhile(req, DATA)); return; }
    if (url.pathname.includes('/assets/') || url.pathname.includes('/avatars/')) { e.respondWith(cacheFirst(req, SHELL)); return; }
    if (/lisan-config\.json|firebase-config\.json/.test(url.pathname)) { e.respondWith(fetch(req).catch(() => caches.match(req))); return; }
    return;
  }
  if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) e.respondWith(staleWhile(req, FONTS));
});

/* daily reminder (Chrome on Android, when the app is installed) */
const dayKey = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
async function remindCheck(){ const c = await caches.open('lisan-meta'); const r = await c.match('remind.json'); if (!r) return; const cfg = await r.json(); if (!cfg.on) return;
  const today = dayKey(); if (cfg.done === today || cfg.shown === today) return; const [h, m] = (cfg.time || '19:00').split(':').map(Number); const now = new Date(); if (now.getHours() * 60 + now.getMinutes() < h * 60 + m) return;
  cfg.shown = today; await c.put('remind.json', new Response(JSON.stringify(cfg))); await self.registration.showNotification(cfg.title || 'Lisan', { body: cfg.body || '', icon: 'icon.svg', tag: 'lisan-remind' }); }
self.addEventListener('periodicsync', (e) => { if (e.tag === 'lisan-remind') e.waitUntil(remindCheck()); });
self.addEventListener('notificationclick', (e) => { e.notification.close(); e.waitUntil(self.clients.matchAll({ type: 'window' }).then((l) => { const w = l[0]; if (w) return w.focus(); return self.clients.openWindow('./'); })); });
