#!/bin/bash
set -e
node gen.js > /dev/null
node gen2.js > /dev/null
python3 - <<'PY'
import json
def L(p): return [x.strip() for x in open(p,encoding='utf8') if x.strip()]
import re
H=re.compile('[ً-ْٰـ]')
def n(s,t):
    s=s.replace('+','').replace('́','').lower().strip()
    if t=='ar': s=H.sub('',s).replace('أ','ا').replace('إ','ا').replace('آ','ا').replace('ٱ','ا').replace('ى','ي')
    if t=='ru': s=s.replace('ё','е')
    return s
G={'ru':{},'en':{},'ar':{}}
for l in L('gloss_ru.txt'): w,m=l.split('|',1); G['ru'].setdefault(n(w,'ru'),m)
for l in L('gloss_en.txt'): f=l.split('|'); G['en'].setdefault(n(f[0],'en'),[f[1],f[2]])
for l in L('gloss_ar.txt'): w,m=l.split('|',1); G['ar'].setdefault(n(w,'ar'),m)
js=open('data_all.js',encoding='utf8').read()
for k,t in [('RU','ru'),('EN','en'),('AR','ar')]:
    B=json.loads(re.search(r'const '+k+r' = (\{.*?\});\n',js,re.S).group(1))
    for lv in B['levels'].values():
        for r in lv.get('readings',[]):
            for l in (r.get('gloss') or '').split('\n'):
                l=l.strip()
                if not l: continue
                f=l.split('|')
                G[t].setdefault(n(f[0],t), [f[1],f[2]] if t=='en' else f[1])
open('gloss.js','w').write('const GL='+json.dumps(G,ensure_ascii=False,separators=(',',':'))+';\nconst ENPR='+open('enpr.json').read()+';\n')
PY
OUT=lisan.html
{
echo '<title>Lisan Language Academy</title>'
echo '<meta name="claude:viewport-fit-sides" content="cover">'
echo '<meta name="description" content="Learn Russian, English, Arabic, Uzbek and Spanish from A1 to C2">'
echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=Marck+Script&display=swap">'
echo '<style>'; cat style.css; echo '</style>'
echo '<div id="app"></div>'
echo '<script>'; cat translit.js data_all.js data_new.js gloss.js app.js; echo '</script>'
} > $OUT
wc -c $OUT
