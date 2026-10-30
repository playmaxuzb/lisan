// Build the new course banks: UZ, ES (natives ar/ru/en) and RUE, ARE (native en) from the master curriculum + translations.
const vm=require('vm'),fs=require('fs');
const ctx={console,M:{},GR:{}}; vm.createContext(ctx);
for (const f of fs.readdirSync('m').filter(f=>f.endsWith('.js')).sort()) vm.runInContext(fs.readFileSync('m/'+f,'utf8'),ctx);
vm.runInContext(fs.readFileSync('data_all.js','utf8').replace(/^const (RU|EN|AR) =/mg,'globalThis.$1 ='),ctx);
for (const f of ['x/alpha.js','x/gram_uz.js','x/gram_es.js','x/gram_en.js']) vm.runInContext(fs.readFileSync(f,'utf8').replace(/^const (ALPHA|G1) =/m,'globalThis.$1 ='),ctx);
const {M,GR,ALPHA,RU,AR}=ctx;
const LV=['A1','A2','B1','B2','C1','C2'];
const L=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const arp=s=>String(s).replace(/[ً-ْٰـ]/g,'');
const rup=s=>String(s).replace(/\+/g,'');
// Uzbek apostrophes: oʻ gʻ (U+02BB) and tutuq belgisi ʼ (U+02BC)
const uzn=s=>String(s).replace(/([oOgG])['‘’`ʼ]/g,'$1ʻ').replace(/([A-Za-zʻ])['’`](?=[A-Za-z])/g,'$1ʼ');
const uzBody=s=>String(s).replace(/\[\[(.+?)\]\]/g,(m,x)=>'[['+uzn(x)+']]');
// meaning overrides for lines that name the target language
const OVR={
 uz:{'A1:S:How do':{ar:'كيف تقول «كتاب» بالأوزبكية؟',ru:'Как по-узбекски «книга»?',en:'How do you say "book" in Uzbek?'},
     'B1:RT:How I':{ar:'كيف أتعلّم الأوزبكية',ru:'Как я учу узбекский',en:'How I Learn Uzbek'},
     'B1:RL:I have':{ar:'أتعلّم الأوزبكية منذ سنة.',ru:'Я учу узбекский язык уже год.',en:'I have been learning Uzbek for a year.'},
     'B1:RL:My Russian':{ar:'ساعدني أصدقائي الأوزبك كثيراً.',ru:'Мои узбекские друзья мне очень помогли.',en:'My Uzbek friends helped me a lot.'}},
 es:{'A1:S:How do':{ar:'كيف تقول «كتاب» بالإسبانية؟',ru:'Как по-испански «книга»?',en:'How do you say "book" in Spanish?'},
     'B1:RT:How I':{ar:'كيف أتعلّم الإسبانية',ru:'Как я учу испанский',en:'How I Learn Spanish'},
     'B1:RL:I have':{ar:'أتعلّم الإسبانية منذ سنة.',ru:'Я учу испанский язык уже год.',en:'I have been learning Spanish for a year.'},
     'B1:RL:My Russian':{ar:'ساعدني أصدقائي الإسبان كثيراً.',ru:'Мои испанские друзья мне очень помогли.',en:'My Spanish friends helped me a lot.'}}
};
function readTr(lv){ return L(fs.readFileSync('tr/'+lv+'.txt','utf8')).map(l=>l.split('|')); }
const common = f => L(fs.readFileSync(f,'utf8')).map(l=>{ const p=l.split('|'); return p.join('|'); }).join('\n');

function buildForeign(code){ // code: 'uz' | 'es'
  const col = code==='uz'?2:3; const fix = code==='uz'?uzn:(s=>s);
  const bank={lang:code, nat:['ar','ru','en'], alphabet:ALPHA[code].map(a=>Object.assign({nameSay:a.name},a)), common: code==='uz'? L(fs.readFileSync('x/common_uz.txt','utf8')).map(l=>{const p=l.split('|'); p[0]=uzn(p[0]); return p.join('|');}).join('\n') : common('x/common_es.txt'), levels:{}};
  LV.forEach(lv=>{ const X=M[lv], T=readTr(lv); let k=0; const D={vocab:[],sentences:'',grammar:[],readings:[],dialogues:[]};
    const take=(kind)=>{ const r=T[k++]; if(!r||r[0]!==kind) throw new Error(code+' '+lv+' expected '+kind+' at '+k+' got '+(r&&r.join('|'))); return r; };
    const val=(r,kind)=>{ const o=kind==='DL'?1:0; return fix(r[col+o]); };
    const ov=(kind,r)=>{ const key=lv+':'+kind+':'+(kind==='DL'?r[2]:r[1]); return OVR[code][key]; };
    X.vocab.forEach(th=>{ const h=take('TH'); const [tar,tru]=th.t.split('::'); const rows=[];
      L(th.w).forEach(l=>{ const [e,ru,en,ar]=l.split('|'); const r=take('V'); rows.push([e,val(r,'V'),arp(ar),rup(ru),en].join('|')); });
      D.vocab.push({t:{ar:arp(tar),ru:rup(tru),en:h[1]}, w:rows.join('\n')}); });
    const S=[]; L(X.sentences).forEach(l=>{ const [ru,en,ar]=l.split('|'); const r=take('S'); const o=r[r.length-1]==='*'?ov('S',r):null;
      S.push([val(r,'S'), o?o.ar:arp(ar), o?o.ru:rup(ru), o?o.en:en].join('|')); });
    D.sentences=S.join('\n');
    X.readings.forEach(rd=>{ const [tru,ten,tar]=rd.t.split('|'); const h=take('RT'); const o=h[h.length-1]==='*'?ov('RT',h):null;
      const sents=L(rd.s).map(l=>{ const [ru,en,ar]=l.split('|'); const r=take('RL'); const q=r[r.length-1]==='*'?ov('RL',r):null; return [val(r,'RL'), q?q.ar:arp(ar), q?q.ru:rup(ru), q?q.en:en].join('|'); }).join('\n');
      D.readings.push({title:val(h,'RT'), tr:o?o:{ar:arp(tar),ru:rup(tru),en:ten}, sents, gloss:''}); });
    X.dialogues.forEach(dg=>{ const [tar,tru]=dg.t.split('::'); const h=take('DT');
      const lines=L(dg.l).map(l=>{ const [w,ru,en,ar]=l.split('|'); const r=take('DL'); return [w, val(r,'DL'), arp(ar), rup(ru), en].join('|'); }).join('\n');
      D.dialogues.push({title:{ar:arp(tar),ru:rup(tru),en:h[1]}, lines}); });
    if (k!==T.length) throw new Error(code+' '+lv+' leftover '+(T.length-k));
    D.grammar=(GR[code][lv]||[]).map(g=>({title:g.title, body: code==='uz'?{ar:uzBody(g.body.ar),ru:uzBody(g.body.ru),en:uzBody(g.body.en)}:g.body,
      ex:L(g.ex).map(l=>{ const p=l.split('|'); p[0]=fix(p[0]); return p.join('|'); }).join('\n'), quiz:g.quiz.map(q=>[q[0]].concat(q.slice(1).map(fix)))}));
    bank.levels[lv]=D; });
  return bank;
}
function buildEn(code){ // native English: 'ru' (RUE) or 'ar' (ARE)
  const bank={lang:code, nat:['en'], alphabet:null, common:'', levels:{}};
  const S2=(ru,ar)=> code==='ru'?ru:ar;
  LV.forEach(lv=>{ const X=M[lv], T=readTr(lv); let k=0; const D={vocab:[],sentences:'',grammar:[],readings:[],dialogues:[]};
    const take=(kind)=>{ const r=T[k++]; if(!r||r[0]!==kind) throw new Error('en '+lv+' expected '+kind); return r; };
    X.vocab.forEach(th=>{ const h=take('TH'); const rows=[]; L(th.w).forEach(l=>{ const [e,ru,en,ar]=l.split('|'); take('V'); rows.push([e,S2(ru,ar),en].join('|')); }); D.vocab.push({t:{en:h[1]}, w:rows.join('\n')}); });
    D.sentences=L(X.sentences).map(l=>{ const [ru,en,ar]=l.split('|'); take('S'); return [S2(ru,ar),en].join('|'); }).join('\n');
    X.readings.forEach(rd=>{ const [tru,ten,tar]=rd.t.split('|'); take('RT'); const sents=L(rd.s).map(l=>{ const [ru,en,ar]=l.split('|'); take('RL'); return [S2(ru,ar),en].join('|'); }).join('\n'); D.readings.push({title:S2(tru,tar), tr:{en:ten}, sents, gloss:''}); });
    X.dialogues.forEach(dg=>{ const h=take('DT'); const lines=L(dg.l).map(l=>{ const [w,ru,en,ar]=l.split('|'); take('DL'); return [w,S2(ru,ar),en].join('|'); }).join('\n'); D.dialogues.push({title:{en:h[1]}, lines}); });
    D.grammar=(GR[code+'_en'][lv]||[]).map(g=>({title:g.title, body:g.body, ex:g.ex, quiz:g.quiz}));
    bank.levels[lv]=D; });
  if (code==='ru'){ const en=L(ALPHA.ru_en).map(l=>l.split('|')); bank.alphabet=L(RU.alphabet).map((l,i)=>{ const f=l.split('|'); const e=en[i]; if(e[0]!==f[0].split(' ')[0]) throw new Error('ru alpha '+i);
      return {letter:f[0], name:f[1], nameSay:f[1], sound:{en:e[1]}, ex:f[3], e:f[4], m:{en:e[2]}}; }); }
  else { const en=L(ALPHA.ar_en).map(l=>l.split('|')); bank.alphabet=L(AR.alphabet).map((l,i)=>{ const f=l.split('|'); const e=en[i]; if(e[0]!==f[0]) throw new Error('ar alpha '+i);
      return {letter:f[0], name:e[1], nameSay:f[7], sound:{en:e[2]}, forms:f[3], ex:f[4], e:f[5], m:{en:e[3]}}; }); }
  return bank;
}
function dedupe(bank){ const seen=new Set(); const ne=bank.nat.indexOf('en');
  LV.forEach(lv=>{ bank.levels[lv].vocab.forEach(t=>{ t.w=L(t.w).filter(l=>{ const f=l.split('|'); const k=f[1].toLowerCase()+'|'+String(f[2+ne]).toLowerCase().replace(/\s*\(.*?\)/g,'').trim(); if(seen.has(k)) return false; seen.add(k); return true; }).join('\n'); }); });
  return bank; }
const out={UZ:buildForeign('uz'), ES:buildForeign('es'), RUE:buildEn('ru'), ARE:buildEn('ar')};
for (const k in out) dedupe(out[k]);
let js=''; for (const k in out) js+=`const ${k} = ${JSON.stringify(out[k])};\n`;
fs.writeFileSync('data_new.js',js);
for (const k in out){ LV.forEach(lv=>{ const D=out[k].levels[lv]; const v=D.vocab.reduce((a,t)=>a+L(t.w).length,0); console.log(k,lv,'vocab',v,'sent',L(D.sentences).length,'read',D.readings.length,'dlg',D.dialogues.length,'gram',D.grammar.length); }); }
console.log('bytes',js.length);
