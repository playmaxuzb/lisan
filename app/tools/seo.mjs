// Static landing pages for search engines: one page per course, plus sitemap.xml and robots.txt.
// usage: node tools/seo.mjs <dist dir> [site url]
import { build } from 'esbuild';
import fs from 'fs'; import path from 'path'; import os from 'os';
const DIST = process.argv[2] || 'dist'; const SITE = (process.argv[3] || process.env.SITE_URL || 'https://playmaxuzb.github.io/lisan/').replace(/\/?$/, '/');
const tmp = path.join(os.tmpdir(), 'lisan-seo-' + process.pid + '.mjs');
await build({ stdin: { contents: "export { u } from './src/core/i18n'; export { LEARN, SELF, LNAME } from './src/core/strings_app';", resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'error', loader: { '.ts': 'ts' } });
const { u, LEARN, SELF, LNAME } = await import(tmp); fs.unlinkSync(tmp);
const courses = JSON.parse(fs.readFileSync(path.join(DIST, 'data/courses.json'), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LV = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']; const today = new Date().toISOString().slice(0, 10);
const urls = [SITE]; let n = 0;
for (const [tr, c] of Object.entries(courses)){
  const s = u(c.n); const title = LEARN[c.n](c.t) + ' — A1–C2 · Lisan'; const lead = s.heroLead || ''; const rtl = c.n === 'ar';
  const desc = (LEARN[c.n](c.t) + ' (A1–C2). ' + lead).slice(0, 300);
  const url = SITE + 'learn/' + tr + '/'; urls.push(url);
  const alts = Object.entries(courses).filter(([, d]) => d.t === c.t).map(([k, d]) => `<link rel="alternate" hreflang="${d.n}" href="${SITE}learn/${k}/">`).join('\n');
  const ld = { '@context': 'https://schema.org', '@type': 'Course', name: LEARN[c.n](c.t), description: desc, inLanguage: c.n, provider: { '@type': 'Organization', name: 'Lisan', sameAs: SITE }, educationalLevel: 'CEFR A1–C2', isAccessibleForFree: true, url, about: LNAME[c.n] && LNAME[c.n][c.t] };
  const levels = LV.map((L) => `<li><b>${L} · ${esc(s.lv[L])}</b> — ${esc(s.lvd[L])}</li>`).join('\n');
  const html = `<!doctype html><html lang="${c.n}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${url}">
${alts}
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta property="og:image" content="${SITE}icon.svg">
<link rel="icon" href="../../icon.svg"><script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","IBM Plex Sans Arabic",sans-serif;background:#F5F8FF;color:#14213D;line-height:1.6}main{max-width:760px;margin:0 auto;padding:32px 18px 60px}.logo{display:inline-flex;align-items:center;gap:8px;font-weight:800;font-size:20px;color:#14213D;text-decoration:none}.logo span{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#3F76FF;color:#fff}h1{font-size:clamp(26px,5vw,38px);line-height:1.2;margin:28px 0 12px}p{color:#3C4A66;font-size:17px}ul{padding-inline-start:20px}li{margin:8px 0}.btn{display:inline-block;margin-top:18px;background:#3F76FF;color:#fff;font-weight:700;padding:14px 26px;border-radius:14px;text-decoration:none}.card{background:#fff;border:1.5px solid #DCE3EF;border-radius:20px;padding:18px 20px;margin-top:22px}</style></head>
<body><main><a class="logo" href="../../"><span>L</span>Lisan · لِسان</a>
<h1>${esc(LEARN[c.n](c.t))}</h1><p>${esc(lead)}</p>
<a class="btn" id="go" href="../../#/learn/${tr}">${esc(s.startLearning || s.start || 'Start')}</a>
<div class="card"><ul>${levels}</ul></div></main>
<script>document.getElementById('go').addEventListener('click',function(){try{var k='lisan.v2',m=JSON.parse(localStorage.getItem(k)||'{}');if(!m.current){m.pendingNative='${c.n}';m.profiles=m.profiles||{};localStorage.setItem(k,JSON.stringify(m));}}catch(e){}});</script>
</body></html>`;
  fs.mkdirSync(path.join(DIST, 'learn', tr), { recursive: true }); fs.writeFileSync(path.join(DIST, 'learn', tr, 'index.html'), html); n++;
}
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map((x) => `<url><loc>${x}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
console.log('seo pages', n);
