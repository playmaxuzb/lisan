/* Lisan offline support: the app shell, course data and audio are cached so downloaded courses work without internet. */
const V = 'lisan-v3';
const SHELL = V + '-shell', DATA = 'lisan-data', AUDIO = 'lisan-audio', FONTS = 'lisan-fonts';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(SHELL).then((c) => c.addAll(['./', './index.html'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('lisan-v') && !k.startsWith(V)).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
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
