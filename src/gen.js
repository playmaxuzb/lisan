// Merge legacy banks + master curriculum into final RU / EN / AR banks.
const vm=require('vm'),fs=require('fs'),path=require('path');
const ctx={console,M:{}}; vm.createContext(ctx);
for (const f of ['data_ru.js','data_en.js','data_ar.js']) vm.runInContext(fs.readFileSync(f,'utf8').replace(/^const (RU|EN|AR) =/m,'globalThis.$1 ='),ctx);
for (const f of fs.readdirSync('m').filter(f=>f.endsWith('.js')).sort()) vm.runInContext(fs.readFileSync('m/'+f,'utf8'),ctx);
const {RU,EN,AR,M}=ctx;
const L=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const AR_STRIP=/[ً-ْٰـ]/g;
const arp=s=>String(s).replace(AR_STRIP,'');
const rup=s=>String(s).replace(/\+/g,'');
const key=(s,lang)=>{ s=String(s).replace(/\+/g,'').toLowerCase(); if(lang==='ar') s=s.replace(AR_STRIP,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه'); if(lang==='ru') s=s.replace(/ё/g,'е'); return s.replace(/[.,!?;:«»"()—\-–؟،؛…]/g,' ').replace(/\s+/g,' ').trim(); };
const LV=['A1','A2','B1','B2','C1','C2'];
function build(bank, lang){
  const seenV=new Set(), seenS=new Set();
  // legacy first
  LV.forEach(lv=>{ const D=bank.levels[lv];
    D.vocab.forEach(t=>{ t.w=L(t.w).filter(l=>{ const k=key(l.split('|')[1],lang); if(seenV.has(k)) return false; seenV.add(k); return true; }).join('\n'); });
    D.sentences=L(D.sentences).filter(l=>{ const k=key(l.split('|')[0],lang); if(seenS.has(k)) return false; seenS.add(k); return true; }).join('\n');
  });
  LV.forEach(lv=>{ const D=bank.levels[lv], X=M[lv]; if(!X) return;
    X.vocab.forEach(th=>{ const [tar,tru]=th.t.split('::'); const rows=[];
      L(th.w).forEach(l=>{ const [e,ru,en,ar]=l.split('|'); const src = lang==='ru'?ru:lang==='en'?en:ar; const k=key(src,lang); if(seenV.has(k)) return; seenV.add(k);
        if (lang==='ru') rows.push([e,ru,arp(ar)].join('|')); else if (lang==='en') rows.push([e,en,arp(ar),rup(ru)].join('|')); else rows.push([e,ar,rup(ru)].join('|')); });
      if (rows.length) D.vocab.push({t: lang==='ru'?tar: lang==='en'? th.t : tru, w: rows.join('\n')}); });
    const S=[]; L(X.sentences).forEach(l=>{ const [ru,en,ar]=l.split('|'); const src=lang==='ru'?ru:lang==='en'?en:ar; const k=key(src,lang); if(seenS.has(k)) return; seenS.add(k);
      S.push(lang==='ru'?[ru,arp(ar)].join('|'): lang==='en'?[en,arp(ar),rup(ru)].join('|'):[ar,rup(ru)].join('|')); });
    D.sentences = L(D.sentences).concat(S).join('\n');
    X.readings.forEach(r=>{ const [tru,ten,tar]=r.t.split('|'); const sents=L(r.s).map(l=>{ const [ru,en,ar]=l.split('|'); return lang==='ru'?[ru,arp(ar)].join('|'): lang==='en'?[en,arp(ar),rup(ru)].join('|'):[ar,rup(ru)].join('|'); }).join('\n');
      D.readings.push(lang==='ru'?{title:tru,tr:arp(tar),sents,gloss:''}: lang==='en'?{title:ten,tr:arp(tar)+'::'+rup(tru),sents,gloss:''}:{title:tar,tr:rup(tru),sents,gloss:''}); });
    X.dialogues.forEach(d=>{ const [tar,tru]=d.t.split('::'); const lines=L(d.l).map(l=>{ const [w,ru,en,ar]=l.split('|'); return lang==='ru'?[w,ru,arp(ar)].join('|'): lang==='en'?[w,en,arp(ar),rup(ru)].join('|'):[w,ar,rup(ru)].join('|'); }).join('\n');
      D.dialogues.push({title: lang==='ru'?tar: lang==='en'? d.t : tru, lines}); });
  });
  return bank;
}
const out={RU:build(RU,'ru'),EN:build(EN,'en'),AR:build(AR,'ar')};
let js=''; for (const k in out) js+=`const ${k} = ${JSON.stringify(out[k])};\n`;
fs.writeFileSync('data_all.js',js);
for (const k in out){ LV.forEach(lv=>{ const D=out[k].levels[lv]; const v=D.vocab.reduce((a,t)=>a+L(t.w).length,0); console.log(k,lv,'vocab',v,'sent',L(D.sentences).length,'read',D.readings.length,'dlg',D.dialogues.length); }); }
