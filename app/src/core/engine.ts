// @ts-nocheck
// Course engine: data loading, parsing, audio, progress, exams. Ported from the original Lisan app.
import { ruToAr, arToRu, ruToLat, arToLat, uzToAr, uzToCyr, esToAr, esToCyr, koToLat } from './translit';

export const LEVELS = ['A1','A2','B1','B2','C1','C2'];
export const LANGS = ['ar','ru','en','uz','es','zh','de','fr','it','tr','ja','ko'];
export const CJK_T = l => l==='zh'||l==='ja';
export const SEG = l => l==='zh'||l==='ja';
export const PASS = 80, EXAM_N = 20;
export const SPEECH_LANG = {ru:'ru-RU', en:'en-US', ar:'ar-SA', uz:'uz-UZ', es:'es-ES', zh:'zh-CN', de:'de-DE', fr:'fr-FR', it:'it-IT', tr:'tr-TR', ja:'ja-JP', ko:'ko-KR'};
export const AUTO_LANGS = ['ar','uz'];
export const RTL = l => l === 'ar';

/* ---------- text helpers ---------- */
export const lines = s => String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
export const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const CJK='⺀-鿿　-〿＀-￯“”‘’—…·《》';
const CJKRE=new RegExp(`([${CJK}]) +(?=[${CJK}])`,'g');
export const zhc = s => String(s).replace(CJKRE,'$1').replace(CJKRE,'$1');
export const isCJK = s => /[一-鿿]/.test(s);
export const pick = (s,n) => { if (s && typeof s==='object' && !Array.isArray(s)) return s[n]!=null ? s[n] : (s.en||s.ar||s.ru||Object.values(s)[0]||''); if(Array.isArray(s)) return n==='ar'?s[0]:s[1]; if(typeof s==='string'&&s.includes('::')){const p=s.split('::');return n==='ar'?p[0]:p[1];} return s; };
export const disp = s => zhc(String(s).replace(/\+(.)/g,'$1́'));
export const sayOf = s => zhc(String(s).replace(/\([^)]*\)/g,' ').replace(/\+/g,'').replace(/́/g,'').replace(/\s+/g,' ').trim());
const HARAKAT = /[ً-ْٰـ]/g;
export function norm(s, tl){
  s = sayOf(String(s)).toLowerCase().trim();
  if (tl==='ar') s = s.replace(HARAKAT,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي');
  if (tl==='ru') s = s.replace(/ё/g,'е');
  return s.replace(/[.,!?;:«»"“”()—\-–؟،؛…¿¡。，？！：；、]/g,' ').replace(/[’'ʻʼ‘`]/g,"'").replace(/\s+/g,' ').trim();
}
export const tokens = (src, tl) => SEG(tl) ? String(src).split(/\s+/).filter(t=>/[\p{L}\p{N}]/u.test(t)) : sayOf(src).replace(/[.,!?;:«»"—؟،؛…¿¡]/g,' ').split(/\s+/).filter(Boolean);

/* ---------- reference data (gloss, english pronunciation) ---------- */
let REF = { GL:{}, ENPR:{} };
export async function loadRef(){ try { const r = await fetch('data/gloss.json'); REF = await r.json(); } catch(e){} }

/* ---------- courses & banks ---------- */
export let COURSES = {};
const BANKS = {}; const BANKP = {};
export async function loadCourses(){ const r = await fetch('data/courses.json'); COURSES = await r.json(); return COURSES; }
export function activeLangs(){ const s=new Set(Object.values(COURSES).map(c=>c.n)); return LANGS.filter(l=>s.has(l)); }
export function courseIds(n){ return Object.keys(COURSES).filter(id=>COURSES[id].n===n); }
export function loadBank(id){ if (BANKS[id]) return Promise.resolve(BANKS[id]); if (BANKP[id]) return BANKP[id];
  BANKP[id] = fetch('data/'+id+'.json').then(r=>r.json()).then(b=>{ BANKS[id]=b; if(b.py) Object.assign(PY,b.py); if(b.rj) Object.assign(RJ,b.rj); if(b.pr){ const m=PR[b.lang+':'+b.nat[0]]||(PR[b.lang+':'+b.nat[0]]={}); Object.assign(m,b.pr); } return b; }); return BANKP[id]; }
const PY={}, RJ={}, PR={};
export function track(tr){ const c=COURSES[tr]; if(!c) return null; const bank=BANKS[c.bank]; const mi=bank?Math.max(0,bank.nat.indexOf(c.n)):0; return {id:tr, n:c.n, t:c.t, bankId:c.bank, bank, mi}; }
export async function ensureTrack(tr){ const c=COURSES[tr]; if(!c) return null; await loadBank(c.bank); return track(tr); }

/* ---------- pronunciation (written in the learner's script) ---------- */
export function pronOf(src, tl, n){
  if (tl==='ru') return n==='ar' ? ruToAr(src) : ruToLat(src);
  if (tl==='ar') return n==='ru' ? arToRu(src) : arToLat(src);
  if (tl==='uz') return n==='ar' ? uzToAr(src) : n==='ru' ? uzToCyr(src) : '';
  if (tl==='es') return n==='ar' ? esToAr(src) : n==='ru' ? esToCyr(src) : '';
  if (tl==='zh') return pinyin(src);
  if (tl==='en'){ if (n!=='ar' && n!=='ru') return ''; const i=n==='ar'?0:1; return String(src).replace(/\([^)]*\)/g,' ').split(/([A-Za-z]+(?:'[A-Za-z]+)?)/).map((t,k)=>{ if(k%2===0) return t.replace(/[.,!?;:"()]/g,'').replace(/\s+/g,' '); const e=REF.ENPR[t.toLowerCase()]; return e?e[i]:t; }).join('').replace(/\s+/g,' ').trim(); }
  // new languages: pronunciation prepared at build time (Arabic / Cyrillic script), romaji, Korean romanization
  const M=PR[tl+':'+n]; if (M){ const k=sayOf(src).replace(/\s+/g,' ').trim().toLowerCase(); if (M[k]) return M[k]; const kk=k.replace(/[.,!?;:«»"“”。、！？，]/g,'').trim(); if (M[kk]) return M[kk]; }
  if (tl==='ja') return romaji(src);
  if (tl==='ko') return koToLat(sayOf(src));
  return '';
}
export function pinyin(src){ const k=sayOf(src).replace(/\s/g,''); if (PY[k]) return PY[k];
  return String(src).split(/\s+/).map(t=>PY[t]||'').filter(Boolean).join(' '); }
export function romaji(src){ const k=sayOf(src).replace(/\s/g,''); if (RJ[k]) return RJ[k];
  return String(src).split(/\s+/).map(t=>RJ[t]||'').filter(Boolean).join(' '); }

/* ---------- parsed levels ---------- */
const cache = {};
function parseSent(l, t, n, mi){ const f=l.split('|'); const src=f[0]; const m = f[1+(mi||0)]; return {src, t:disp(src), say:sayOf(src), m, pr:pronOf(src,t,n)}; }
export function level(tr, L){
  const key=tr+':'+L; if(cache[key]) return cache[key];
  const T=track(tr); if(!T||!T.bank) return null; const {n,t,bank,mi}=T; const D=bank.levels[L];
  const themes=[], vocab=[];
  D.vocab.forEach((th,ti)=>{ themes.push(pick(th.t,n)); lines(th.w).forEach(l=>{ const f=l.split('|'); const it={e:f[0],src:f[1],m:f[2+mi]};
    it.theme=ti; it.t=disp(it.src); it.say=sayOf(it.src); it.pr=pronOf(it.src,t,n); it.id=L+':v:'+vocab.length; it.kind='v'; vocab.push(it); }); });
  const sentences = lines(D.sentences).map((l,i)=>Object.assign(parseSent(l,t,n,mi),{id:L+':s:'+i,kind:'s'}));
  const grammar = (D.grammar||[]).map((g,gi)=>({title:pick(g.title,n), body:pick(g.body,n), ex:lines(g.ex).map(l=>parseSent(l,t,n,mi)).filter(s=>s.m!==''),
    quiz:(g.quiz||[]).map((q,qi)=>({q:pick(q[0],n), opts:q.slice(1), id:L+':g:'+gi+':'+qi, kind:'g'}))})).filter(g=>g.title&&g.body);
  const readings = (D.readings||[]).map(r=>{ const gl={}; lines(r.gloss).forEach(x=>{ const f=x.split('|'); gl[norm(f[0],t)] = f[1+mi]; });
    return {title:disp(r.title), say:sayOf(r.title), tr:pick(r.tr,n), sents:lines(r.sents).map(l=>parseSent(l,t,n,mi)), gloss:gl}; });
  const dialogues = (D.dialogues||[]).map(d=>({title:pick(d.title,n), lines:lines(d.lines).map(l=>{ const f=l.split('|'); const s=parseSent(f.slice(1).join('|'),t,n,mi); s.who=f[0]; return s; })}));
  let alphabet=null;
  if (L==='A1' && Array.isArray(bank.alphabet)){ alphabet = bank.alphabet.map((x,i)=>{ const a={letter:x.letter, name:pick(x.name,n), nameSay:x.nameSay||x.letter.split(' ')[0].toLowerCase(), sound:pick(x.sound,n), forms:x.forms, ex:x.ex, e:x.e, m:pick(x.m,n)};
      a.exT=disp(a.ex); a.exSay=sayOf(a.ex); a.expr=pronOf(a.ex,t,n); a.id='A1:l:'+i; a.kind='l'; if(n==='zh'||n==='ja'){ a.sound=zhc(a.sound||''); a.m=zhc(a.m||''); a.name=zhc(a.name||''); } return a; }); }
  else if (L==='A1' && bank.alphabet){ alphabet = lines(bank.alphabet).map((l,i)=>{ const f=l.split('|'); let a;
      if (t==='ru') a={letter:f[0], name:f[1], nameSay:f[1], sound:f[2], ex:f[3], e:f[4], m:f[5]};
      else if (t==='en') a={letter:f[0], name:pick(f[1],n), nameSay:f[0].split(' ')[0]+'.', sound:pick(f[2],n), ex:f[3], e:f[4], m:n==='ar'?f[5]:f[6]};
      else a={letter:f[0], name:f[1], nameSay:f[7], sound:f[2], forms:f[3], ex:f[4], e:f[5], m:f[6]};
      a.exT=disp(a.ex); a.exSay=sayOf(a.ex); a.expr=pronOf(a.ex,t,n); a.id='A1:l:'+i; a.kind='l'; return a; }); }
  return cache[key]={tr,L,n,t,themes,vocab,sentences,grammar,readings,dialogues,alphabet};
}
export function dict(tr){ const key='d:'+tr; if(cache[key]) return cache[key]; const m={}; const {t}=track(tr);
  LEVELS.forEach(L=>{ const lv=level(tr,L); lv.vocab.forEach(v=>{ const k=norm(v.src,t); if(!m[k]) m[k]=v; if (t==='es'){ const k2=k.replace(/^(el|la|los|las|un|una) /,''); if(!m[k2]) m[k2]=v; } if (t==='en'){ const k2=k.replace(/^(to|the|a|an) /,''); if(!m[k2]) m[k2]=v; } const AR2=ART_NEW[t]; if (AR2){ const k2=k.replace(AR2,''); if(k2&&!m[k2]) m[k2]=v; } k.split(' / ').forEach(x=>{ if(!m[x]) m[x]=v; }); }); }); return cache[key]=m; }
export function common(tr){ const key='c:'+tr; if(cache[key]) return cache[key]; const {t,bank,mi}=track(tr); const m={};
  lines(bank.common).forEach(l=>{ const f=l.split('|'); const w=norm(f[0],t); if(!(w in m) && f[1+mi]) m[w] = f[1+mi]; });
  return cache[key]=m; }

/* light stemmers for word lookup */
const ART_NEW={de:/^(der|die|das|ein|eine|sich) /, fr:/^(le|la|les|un|une|l'|l’|se |s')\s*/, it:/^(il|lo|la|i|gli|le|un|uno|una|l'|l’|un')\s*/};
const DE_SUF=['ungen','heiten','keiten','test','tet','ten','tem','ter','tes','est','ern','em','en','er','es','st','te','et','e','n','s','t'];
const FR_SUF=['issons','issez','issent','aient','erons','eront','ions','iez','ais','ait','ant','ons','ez','ent','ée','ées','és','ai','as','es','e','s','x','é'];
const IT_SUF=['iamo','ate','ete','ite','ano','ono','ato','ita','ito','uto','uta','ava','eva','iva','avo','evo','ivo','erò','irò','arò','i','e','a','o'];
const TR_SUF=['lerimiz','larımız','leri','ları','ler','lar','imiz','ımız','iniz','ınız','dan','den','tan','ten','nın','nin','nun','nün','ım','im','um','üm','ın','in','un','ün','da','de','ta','te','ya','ye','yı','yi','yu','yü','a','e','ı','i','u','ü','m','n','sı','si','su','sü','yor','iyor','ıyor','uyor','üyor','yorum','yorsun','dı','di','du','dü','tı','ti','tu','tü','mak','mek','dım','dim','acak','ecek','mış','miş'];
const UZ_SUF=['larimizdan','larimizga','larimizni','larimiz','laringiz','larining','laridan','larida','lariga','larini','lardan','larda','larga','larni','lari','lar','imizdan','imizga','imizni','imiz','ingizga','ingiz','ning','dagi','dan','da','ga','ka','qa','ni','im','ing','si','i','m','ng','miz','siz','man','san','mi','chi','ku','dir','moqchiman','moqchimiz','moqchi','yapman','yapsan','yapti','yapmiz','yapsiz','ayapti','aman','ayman','yman','asan','aysan','ysan','adi','aydi','ydi','amiz','aymiz','ymiz','asiz','aysiz','ysiz','ishadi','dim','ding','di','dik','dingiz','ishdi','gan','ganman','ib','b','sa','sam','sang','sak','ish','ishi','ishim','ma','may','mayman','madim','madi'];
const RU_SUF=['ями','ами','ого','его','ому','ему','ыми','ими','ешь','ете','ишь','ите','ают','яют','ует','уют','ала','ила','ыла','али','или','ыли','ая','яя','ое','ее','ые','ие','ой','ей','ую','юю','ом','ем','ам','ям','ах','ях','ов','ев','ть','ла','ло','ли','ут','ют','ат','ят','ет','ит','ем','им','у','ю','а','я','ы','и','е','о','ь'];
export function stemLookup(k, tl, D, C){
  const get=w=>{ if(D[w]) return {v:D[w], m:D[w].m}; if(C[w]) return {m:C[w]}; return null; }; const h0=get(k); if (h0) return h0;
  if (tl==='uz'){ let cands=[k]; for (let round=0; round<3; round++){ const next=[]; for (const w of cands){ for (const suf of UZ_SUF){ if (w.length>suf.length+1 && w.endsWith(suf)) next.push(w.slice(0,-suf.length)); } }
      for (const w of next){ const h=get(w)||get(w+'moq')||get(w+'imoq')||get(w.replace(/y$/,'')+'moq')||get(w.replace(/a$/,'')+'moq'); if (h) return h; } cands=[...new Set(next)].slice(0,60); if(!cands.length) break; } return null; }
  if (tl==='es'){ const tries=[]; const w=k;
    if (w.endsWith('es')) tries.push(w.slice(0,-2)); if (w.endsWith('s')) tries.push(w.slice(0,-1)); if (w.endsWith('a')) tries.push(w.slice(0,-1)+'o'); if (w.endsWith('as')) tries.push(w.slice(0,-2)+'o');
    const VE=['o','as','a','amos','áis','an','es','e','emos','éis','en','imos','ís','é','aste','ó','aron','í','iste','ió','ieron','aba','abas','ábamos','aban','ía','ías','íamos','ían','ando','iendo','ado','ido','ada','ida','ados','idos','aré','arás','ará','aremos','arán','eré','erá','iré','irá','aría','ería','iría'];
    for (const e of VE){ if (w.length>e.length+1 && w.endsWith(e)){ const st=w.slice(0,-e.length); tries.push(st+'ar',st+'er',st+'ir'); } }
    for (const t of tries){ const h=get(t); if(h) return h; } return null; }
  if (tl==='ru'){ for (const s of RU_SUF){ if (k.length>s.length+2 && k.endsWith(s)){ const st=k.slice(0,-s.length); for (const e of ['','а','я','о','е','ь','ть','ить','ать','ый','ий','ой']){ const h=get(st+e); if(h) return h; } } } return null; }
  if (tl==='en'){ for (const [s,r] of [['ies','y'],['es',''],['s',''],['ed',''],['ed','e'],['ing',''],['ing','e'],['er',''],['est','']]){ if (k.endsWith(s)){ const h=get(k.slice(0,-s.length)+r); if (h) return h; } } return null; }
  if (tl==='de'||tl==='fr'||tl==='it'||tl==='tr'){ const SUF={de:DE_SUF,fr:FR_SUF,it:IT_SUF,tr:TR_SUF}[tl]; const INF={de:['en','n','e',''],fr:['er','ir','re','e',''],it:['are','ere','ire','o','a','e',''],tr:['mak','mek','']}[tl];
    let cands=[k]; for (let round=0; round<(tl==='tr'?3:1); round++){ const next=[]; for (const w of cands) for (const s of SUF) if (w.length>s.length+1 && w.endsWith(s)) next.push(w.slice(0,-s.length));
      for (const w of next) for (const e of INF){ const h=get(w+e)||(tl==='de'?get(w.replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u')+e):null); if (h) return h; }
      cands=[...new Set(next)].slice(0,60); if(!cands.length) break; } return null; }
  if (tl==='ar'){ for (const p of ['و','ف','ب','ل','ال','وال','بال','لل','فال']){ if (k.startsWith(p)){ const h=get(k.slice(p.length)); if (h) return h; } } return null; }
  return null;
}
export function lookupWord(tr, raw, readingGloss){
  const T=track(tr); const tl=T.t; const k=norm(raw,tl); let m=null, v=null;
  if (readingGloss) m = readingGloss[k] || null;
  const D=dict(tr); v=D[k]||null; if (!m && v) m=v.m;
  const glOK = (tl==='ru'&&T.n==='ar')||(tl==='ar'&&T.n==='ru')||(tl==='en'&&(T.n==='ar'||T.n==='ru'));
  if (!m && glOK){ const G=(REF.GL[tl]||{})[k]; if (G) m = Array.isArray(G) ? (T.n==='ar'?G[0]:G[1]) : G; }
  const C=common(tr);
  if (!m && C[k]) m=C[k];
  if (!m){ const h=stemLookup(k,tl,D,C); if (h){ m=h.m; v=v||h.v||null; } }
  return {m, v, pr: pronOf(raw,tl,T.n), say: sayOf(raw)};
}

/* ---------- profiles & progress ---------- */
const PKEY='lisan.v2';
export const Store = {
  meta:{ current:null, profiles:{} },   // profiles: id -> {id, kind, username, email, phone, avatar, photo, cover, native, created}
  d:{passed:{},best:{},weak:{},last:{},settings:{rate:1,volume:1,voice:{},font:{}}},
  listeners:new Set(),
  load(){ try{ const r=localStorage.getItem(PKEY); if(r) Object.assign(this.meta, JSON.parse(r)); }catch(e){} if (this.meta.current) this.loadProgress(); },
  saveMeta(){ try{ localStorage.setItem(PKEY, JSON.stringify(this.meta)); }catch(e){} this.emit(); },
  profile(){ return this.meta.current ? this.meta.profiles[this.meta.current] : null; },
  loadProgress(){ const id=this.meta.current; let o=null; try{ const r=localStorage.getItem(PKEY+'.p.'+id); if(r) o=JSON.parse(r); }catch(e){}
    if (!o){ try{ const old=localStorage.getItem('lisan.v1'); if (old && !this.meta.migrated){ o=JSON.parse(old); this.meta.migrated=id; this.saveMeta(); } }catch(e){} }
    this.d={passed:{},best:{},weak:{},last:{},settings:{rate:1,volume:1,voice:{},font:{}}}; if (o){ Object.assign(this.d,o); this.d.settings=Object.assign({rate:1,volume:1,voice:{},font:{}},o.settings||{}); } },
  save(){ if (!this.meta.current) return; try{ localStorage.setItem(PKEY+'.p.'+this.meta.current, JSON.stringify(this.d)); }catch(e){} this.emit(); onSaveHook && onSaveHook(this); },
  createProfile(p){ const id=p.id||('u'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)); this.meta.profiles[id]=Object.assign({id, created:Date.now()}, this.meta.profiles[id]||{}, p, {id}); this.meta.current=id; this.saveMeta(); this.loadProgress(); return this.meta.profiles[id]; },
  updateProfile(patch){ const p=this.profile(); if(!p) return; Object.assign(p,patch); this.saveMeta(); onSaveHook && onSaveHook(this); },
  signOut(){ this.meta.current=null; this.saveMeta(); },
  passed(tr,L){ return !!(this.d.passed[tr]&&this.d.passed[tr][L]); },
  unlocked(tr,i){ if(i===0) return true; for(let k=i-1;k<LEVELS.length;k++) if(this.passed(tr,LEVELS[k])) return true; return false; },
  weak(key){ return this.d.weak[key]||(this.d.weak[key]={}); },
  emit(){ this.listeners.forEach(f=>f()); }
};
let onSaveHook = null; export function setSaveHook(f){ onSaveHook=f; }

/* ---------- audio ---------- */
export const Packs = { data:{}, loading:{},
  key(text, alt){ return (alt?'B|':'')+sayOf(text).trim().toLowerCase(); },
  one(id){ if (this.data[id]) return Promise.resolve(); if (this.loading[id]) return this.loading[id];
    this.loading[id] = fetch('audio/'+id+'.json').then(r=>r.ok?r.json():null).then(j=>{ if(j) this.data[id]=j; }).catch(()=>{}).finally(()=>{ delete this.loading[id]; });
    return this.loading[id]; },
  cur:'',
  load(lang, L){ const id=lang+'-'+L; this.cur=id; return this.one(id).then(()=>this.one(id+'-w')); },
  async ensure(text, tl, alt){ let c=this.find(text,tl,alt); if (c) return c; const ps=Object.values(this.loading); if (ps.length){ await Promise.all(ps); c=this.find(text,tl,alt); } return c; },
  find(text, tl, alt){ const ks = alt ? [this.key(text,true), this.key(text,false)] : [this.key(text,false)];
    const order = Object.keys(this.data).filter(id=>id.startsWith(tl+'-')).sort((a,b)=> (b.startsWith(this.cur)?1:0) - (a.startsWith(this.cur)?1:0));
    for (const k of ks) for (const id of order){ const v=this.data[id][k]; if (v) return v; }
    return null; }
};
const audioEl = typeof Audio!=='undefined' ? new Audio() : null; if (audioEl){ audioEl.preload='auto'; try{ audioEl.preservesPitch=true; }catch(e){} }
let toastFn = (m)=>{}; export function setToast(f){ toastFn=f; }
let noAudioMsg = ''; export function setNoAudioMsg(m){ noAudioMsg=m; }
export const Speech = {
  voices:[], chainId:0, pend:null, broken:false,
  ok: typeof window!=='undefined' && typeof window.speechSynthesis!=='undefined',
  init(onChange){ if(!this.ok) return; const load=()=>{ try{ this.voices = speechSynthesis.getVoices(); }catch(e){} onChange&&onChange(); }; load(); try{ speechSynthesis.addEventListener('voiceschanged',load); }catch(e){ speechSynthesis.onvoiceschanged=load; } },
  list(tl){ return this.voices.filter(v=>(v.lang||'').toLowerCase().replace('_','-').startsWith(tl)); },
  score(v){ let s=0; const n=v.name||''; if(/Google/i.test(n)) s+=5; if(/Natural|Neural|Premium|Enhanced|Online/i.test(n)) s+=6; if(/Milena|Yuri|Katya|Svetlana|Dmitry|Dariya|Samantha|Daniel|Karen|Maged|Laila|Majed|Tarik|Zariyah|Hamed|Mariam|Shakir|Salma|Madina|Sardor/i.test(n)) s+=3; if(v.localService) s+=1; return s; },
  mode(tl){ const v=Store.d.settings.voice[tl]; if (v && v!=='lisan' && v!=='auto') return 'device'; if (v==='lisan') return 'clip'; return (AUTO_LANGS.includes(tl) && this.autoVoice(tl)) ? 'auto' : 'clip'; },
  autoVoice(tl){ if (!this.ok || this.broken) return null; const L=this.list(tl); if(!L.length) return null; return L.slice().sort((a,b)=>this.score(b)-this.score(a))[0]; },
  voice(tl, alt){ const L=this.list(tl); if(!L.length) return null; const want=Store.d.settings.voice[tl]; let v = L.find(x=>x.voiceURI===want); const sorted=L.slice().sort((a,b)=>this.score(b)-this.score(a)); if(!v) v=sorted[0]; if(alt){ const other = sorted.find(x=>x!==v); return other||v; } return v; },
  stop(){ this.chainId++; try{ audioEl&&audioEl.pause(); }catch(e){} if (this.pend){ const f=this.pend; this.pend=null; f(); } if(this.ok) try{ speechSynthesis.cancel(); }catch(e){} },
  rate(o){ const st=Store.d.settings; return Math.max(.4,Math.min(2,(st.rate||1)*(o.slow?0.65:1))); },
  vol(){ const st=Store.d.settings; return Math.max(0,Math.min(1,st.volume==null?1:st.volume)); },
  playClip(clip, o){ return new Promise(res=>{ let done=false; const fin=()=>{ if(!done){ done=true; audioEl.onended=audioEl.onerror=null; if(this.pend===fin) this.pend=null; res(); } };
      this.pend=fin; audioEl.onended=fin; audioEl.onerror=fin; const r=this.rate(o); audioEl.src='data:audio/mpeg;base64,'+clip; audioEl.playbackRate=r; audioEl.defaultPlaybackRate=r; audioEl.volume=this.vol();
      const p=audioEl.play(); if (p&&p.catch) p.catch(()=>{ fin(); }); }); },
  speakDevice(text, tl, o, watch){ return new Promise(res=>{ if(!this.ok || !text){ res(false); return; }
      const u = new SpeechSynthesisUtterance(sayOf(text)); u.lang = SPEECH_LANG[tl]; const main=this.voice(tl); const v=this.voice(tl,o.alt); if(v){ u.voice=v; u.lang=v.lang; }
      const sameVoice = o.alt && (!v || v===main); u.rate = Math.max(.3,Math.min(2,this.rate(o)*0.95)); u.pitch = sameVoice?0.82:1; u.volume=this.vol();
      let started=false, done=false; const fin=(ok)=>{ if(!done){ done=true; if(this.pend===stopper) this.pend=null; res(ok); } }; const stopper=()=>fin(true); this.pend=stopper;
      u.onstart=()=>{ started=true; }; u.onend=()=>fin(true); u.onerror=()=>{ if(!started && watch) this.broken=true; fin(started); };
      if (watch) setTimeout(()=>{ if(!started && !done){ try{ speechSynthesis.cancel(); }catch(e){} this.broken=true; fin(false); } }, 1600);
      setTimeout(()=>fin(started), 2500+ sayOf(text).length*240/(u.rate||1)); try{ speechSynthesis.speak(u); }catch(e){ fin(false); } }); },
  async speak(text, tl, o={}){ const m=this.mode(tl);
    if (m==='device'){ const ok=await this.speakDevice(text,tl,o,false); if(!ok && !this.list(tl).length) toastFn(noAudioMsg); return; }
    if (m==='auto'){ const id=this.chainId; const ok=await this.speakDevice(text,tl,o,true); if (ok || id!==this.chainId) return; }
    let clip = Packs.find(text, tl, o.alt); if (!clip && Object.keys(Packs.loading).length) clip = await Packs.ensure(text, tl, o.alt);
    if (clip) return this.playClip(clip, o); const ok=await this.speakDevice(text,tl,o,false); if(!ok) toastFn(noAudioMsg); },
  say(text, tl, o={}){ this.stop(); return this.speak(text,tl,o); },
  async chain(items, tl, onItem){ this.stop(); const id=this.chainId;
    for (let i=0;i<items.length;i++){ if(id!==this.chainId) return false; onItem&&onItem(i,true); await this.speak(items[i].say, tl, items[i].o||{}); onItem&&onItem(i,false); if(id!==this.chainId) return false; await new Promise(r=>setTimeout(r,items[i].pause||350)); }
    return true; }
};
export function primeAudio(){ try{ audioEl.src='data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAABAAAAlgAenp6enp6enp6enp6enp6enp6enp6enp6pqampqampqampqampqampqampqampqamptPT09PT09PT09PT09PT09PT09PT09PT09P/////////////////////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQCcQAAAAAAAAJY+/rsqgAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'; const p=audioEl.play(); if(p&&p.catch) p.catch(()=>{}); }catch(e){} }

/* ---------- exams ---------- */
function examPool(lv){ const g=[]; lv.grammar.forEach(x=>x.quiz.forEach(q=>g.push(q))); return {v:lv.vocab, s:lv.sentences, g, l:lv.alphabet||[]}; }
function prioritized(arr, key, n){ const weak=Store.weak(key), last=new Set(Store.d.last[key]||[]);
  const w=shuffle(arr.filter(x=>weak[x.id])), fresh=shuffle(arr.filter(x=>!weak[x.id]&&!last.has(x.id))), old=shuffle(arr.filter(x=>!weak[x.id]&&last.has(x.id)));
  const out=[]; const wn=Math.ceil(n*0.5); out.push(...w.slice(0,wn)); for (const x of fresh){ if(out.length>=n) break; out.push(x); } for (const x of old){ if(out.length>=n) break; out.push(x); } for (const x of w.slice(wn)){ if(out.length>=n) break; out.push(x); }
  return out.slice(0,n); }
function distract(lv, pool, correct, getter, n=3){ const tl=lv.t; const nm=x=>norm(x.m||'',lv.n); const ns=x=>norm(x.say||x.letter||'',tl);
  const seenG=new Set([getter(correct)]), seenM=new Set([nm(correct)]), seenS=new Set([ns(correct)]); const out=[];
  for (const x of shuffle(pool)){ const g=getter(x), m=nm(x), sv=ns(x); if(seenG.has(g)||(m&&seenM.has(m))||(sv&&seenS.has(sv))) continue; seenG.add(g); seenM.add(m); seenS.add(sv); out.push(x); if(out.length>=n) break; }
  return out; }
export function buildExam(lv){
  const key=lv.tr+':'+lv.L, P=examPool(lv), tl=lv.t; const Q=[];
  const plan = lv.alphabet ? {mean:5,rev:3,listen:3,letter:2,sent:2,order:2,spell:1,gram:2} : {mean:5,rev:3,listen:3,sent:2,order:2,spell:2,gram:3};
  const vs = prioritized(P.v,key,plan.mean+plan.rev+plan.listen); let vi=0; const takeV=()=>vs[vi++];
  for(let i=0;i<plan.mean;i++){ const it=takeV(); if(!it) break; Q.push({type:'mcq',kind:'kMean',item:it, prompt:{word:it.t,say:it.say}, opts:shuffle([it,...distract(lv,P.v,it,x=>x.m)]).map(x=>({label:x.m,ok:x===it}))}); }
  for(let i=0;i<plan.rev;i++){ const it=takeV(); if(!it) break; Q.push({type:'mcq',kind:'kRev',item:it, prompt:{text:it.m,emo:it.e}, opts:shuffle([it,...distract(lv,P.v,it,x=>x.say)]).map(x=>({label:x.t,ok:x===it,tgt:1}))}); }
  for(let i=0;i<plan.listen;i++){ const it=takeV(); if(!it) break; Q.push({type:'mcq',kind:'kListen',item:it, prompt:{listen:it.say}, opts:shuffle([it,...distract(lv,P.v,it,x=>x.say)]).map(x=>({label:x.t,ok:x===it,tgt:1}))}); }
  const sp = P.v.filter(x=>(tl==='zh'||tl==='ja') ? x.say.length<=4 : tl==='ko' ? x.say.length<=5 : (!/\s/.test(x.say) && x.say.length<=12)); prioritized(sp.length?sp:P.v,key,plan.spell).forEach(it=>Q.push({type:'spell',kind:'kSpell',item:it,prompt:{listen:it.say,emo:it.e}}));
  if (plan.letter && P.l.length){ prioritized(P.l,key,plan.letter).forEach(it=>Q.push({type:'mcq',kind:'kLetter',item:it,prompt:{listen:it.nameSay},opts:shuffle([it,...distract(lv,P.l,it,x=>x.letter)]).map(x=>({label:x.letter,ok:x===it,tgt:1}))})); }
  prioritized(P.s,key,plan.sent).forEach(it=>Q.push({type:'mcq',kind:'kSent',item:it,prompt:{word:it.t,say:it.say,small:1},opts:shuffle([it,...distract(lv,P.s,it,x=>x.m)]).map(x=>({label:x.m,ok:x===it}))}));
  const ord = P.s.filter(x=>{ const tk=tokens(x.src,tl); return tk.length>=3&&tk.length<=6 && new Set(tk.map(w=>w.toLowerCase())).size===tk.length; });
  prioritized(ord.length?ord:P.s,key,plan.order).forEach(it=>{ const tk=tokens(it.src,tl); Q.push({type:'order',kind:'kOrder',item:it,words:tk,pool:shuffle(tk.map((w,i)=>({w,i}))),chosen:[]}); });
  prioritized(P.g,key,plan.gram).forEach(it=>Q.push({type:'mcq',kind:'kGram',item:it,prompt:{gram:it.q},opts:shuffle(it.opts.map((o,i)=>({label:disp(o),ok:i===0,tgt:1})))}));
  while (Q.length<EXAM_N){ const it=P.v[Math.floor(Math.random()*P.v.length)]; Q.push({type:'mcq',kind:'kMean',item:it,prompt:{word:it.t,say:it.say},opts:shuffle([it,...distract(lv,P.v,it,x=>x.m)]).map(x=>({label:x.m,ok:x===it}))}); }
  const out = shuffle(Q.slice(0,EXAM_N)); Store.d.last[key]=out.map(q=>q.item.id); Store.save();
  return {qs:out, i:0, done:false};
}
export function markAnswer(lv, q, ok){ const key=lv.tr+':'+lv.L; const weak=Store.weak(key); q.correct=ok; const id=q.item.id;
  if (ok){ if (weak[id]){ weak[id]--; if(weak[id]<=0) delete weak[id]; } } else weak[id]=(weak[id]||0)+2; Store.save(); }
export function finishExam(lv, ex){ ex.done=true; const key=lv.tr+':'+lv.L; const right=ex.qs.filter(q=>q.correct).length; const pct=Math.round(right/ex.qs.length*100);
  Store.d.best[key]=Math.max(Store.d.best[key]||0,pct); if (pct>=PASS){ (Store.d.passed[lv.tr]||(Store.d.passed[lv.tr]={}))[lv.L]=true; } Store.save(); return pct; }
export function checkTyped(given, item, tl){ let a=norm(given,tl), b=norm(item.say,tl);
  if (tl==='ar'){ a=a.replace(/ة/g,'ه'); b=b.replace(/ة/g,'ه'); }
  if (tl==='es'||tl==='zh'||tl==='ja'||tl==='fr'||tl==='it'||tl==='tr'||tl==='de'||tl==='ko'){ const f=x=>x.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s/g,'').trim(); a=f(a); b=f(b); }
  if (tl==='zh'){ if (a===b) return true; const py=f2(pinyin(item.src||item.say)); return a===py; }
  if (tl==='ja'){ if (a===b) return true; return f2(a)!=='' && f2(a)===f2(romaji(item.src||item.say)); }
  if (tl==='ko'){ if (a===b) return true; return f2(a)!=='' && f2(a)===f2(koToLat(item.say)); }
  return a===b; }
const f2 = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-zü]/g,'').replace(/ü/g,'v');
