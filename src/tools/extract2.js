const vm=require('vm'),fs=require('fs');
const ctx={}; vm.createContext(ctx); vm.runInContext(fs.readFileSync('/home/claude/lisan/data_all.js','utf8').replace(/^const (\w+) =/gm,'globalThis.$1 ='),ctx);
const L=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const sayOf=s=>String(s).replace(/\([^)]*\)/g,' ').replace(/\+/g,'').replace(/́/g,'').replace(/\s+/g,' ').trim();
const re=/([\p{L}\p{M}+'’́]+(?:-[\p{L}\p{M}+́]+)*)/gu;
const out={};
for (const [B,lang] of [['RU','ru'],['EN','en'],['AR','ar']]){ const bank=ctx[B];
 for (const lv of ['A1','A2','B1','B2','C1','C2']){ const D=bank.levels[lv]; const main=new Map(), words=new Map();
  const add=(m,src,alt)=>{ src=String(src).replace(/\([^)]*\)/g,' ').replace(/\s+/g,' ').trim(); if(!src||!/\p{L}/u.test(src)) return; const k=(alt?'B|':'')+sayOf(src).toLowerCase(); if(!m.has(k)&&!(m===words&&main.has(k))) m.set(k,{k,src,alt:!!alt}); };
  const tok=src=>{ (String(src).match(re)||[]).forEach(w=>add(words,w)); };
  D.vocab.forEach(t=>L(t.w).forEach(l=>add(main,l.split('|')[1])));
  L(D.sentences).forEach(l=>{const s=l.split('|')[0]; add(main,s); tok(s);});
  D.grammar.forEach(g=>{ L(g.ex).forEach(l=>{const s=l.split('|')[0]; add(main,s); tok(s);}); (Array.isArray(g.body)?g.body:[g.body]).forEach(b=>(b.match(/\[\[(.+?)\]\]/g)||[]).forEach(x=>add(main,x.slice(2,-2)))); (g.quiz||[]).forEach(q=>{ (String(q[0]).match(/\[\[(.+?)\]\]/g)||[]).forEach(x=>add(main,x.slice(2,-2))); }); });
  D.readings.forEach(r=>{ add(main,r.title); tok(r.title); L(r.sents).forEach(l=>{const s=l.split('|')[0]; add(main,s); tok(s);}); });
  D.dialogues.forEach(d=>L(d.lines).forEach(l=>{ const f=l.split('|'); add(main,f[1], f[0]==='B'); add(main,f[1]); tok(f[1]); }));
  if (lv==='A1'){ L(bank.alphabet).forEach(l=>{ const f=l.split('|'); if(lang==='ru'){add(main,f[1]);add(main,f[3]);} else if(lang==='en'){add(main,f[0].split(' ')[0]+'.'); add(main,f[3]);} else {add(main,f[7]); add(main,f[4]);} }); }
  // words already in main are removed from words pack
  for (const k of [...words.keys()]) if (main.has(k)) words.delete(k);
  out[lang+'-'+lv]=[...main.values()]; out[lang+'-'+lv+'-w']=[...words.values()];
 }}
fs.writeFileSync('items2.json',JSON.stringify(out));
let tot=0; for (const k in out){ tot+=out[k].length; } console.log('total clips',tot); for (const k in out) process.stdout.write(k+':'+out[k].length+' '); console.log();
