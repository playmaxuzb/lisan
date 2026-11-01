// Build all course banks as JSON for the React app (public/data/*.json).
// Legacy banks (RU/EN/AR from data_all.js) are exported unchanged; every other pair is built from the master curriculum.
const vm=require('vm'),fs=require('fs'),path=require('path');
const OUT=process.argv[2]||'web/public/data'; fs.mkdirSync(OUT,{recursive:true});
const ctx={console,M:{},GR:{},SUP:{},ALPHA:{}}; vm.createContext(ctx);
for (const f of fs.readdirSync('m').filter(f=>f.endsWith('.js')).sort()) vm.runInContext(fs.readFileSync('m/'+f,'utf8'),ctx);
vm.runInContext(fs.readFileSync('data_all.js','utf8').replace(/^const (RU|EN|AR) =/mg,'globalThis.$1 ='),ctx);
for (const f of ['x/alpha.js','x/alpha2.js','x/gram_uz.js','x/gram_es.js','x/gram_en.js','x/gram_en_new.js','x/gram_zh.js','x/sup_ru.js','x/sup_ar.js','x/sup_uz.js','x/sup_es.js'])
  vm.runInContext(fs.readFileSync(f,'utf8').replace(/^const (ALPHA|G1|T5|A3) =/mg,'globalThis.$1 ='),ctx);
const {M,GR,SUP,ALPHA,RU,EN,AR}=ctx;
const LV=['A1','A2','B1','B2','C1','C2'], BASE=['ar','ru','en','uz','es','zh'], NEW=['de','fr','it','tr','ja','ko'];
const ACTIVE_NEW=JSON.parse(fs.existsSync('langs.json')?fs.readFileSync('langs.json','utf8'):'[]');
const LANGS=BASE.concat(NEW.filter(l=>ACTIVE_NEW.includes(l)));
// extra data for the new languages (each file adds to these globals)
Object.assign(ctx,{STARX:{},GB:{},GN:{},AB:{},AN:{},CW:{}});
const xfiles=(dir,re)=>fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>re.test(f)).sort().map(f=>dir+'/'+f):[];
for (const f of [].concat(xfiles('x/star',/\.js$/),xfiles('x/g',/\.js$/),xfiles('x/a',/\.js$/),xfiles('x/c',/\.js$/))) vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const {STARX,GB,GN,AB,AN,CW}=ctx;
const L=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const arp=s=>String(s).replace(/[ً-ْٰـ]/g,'');
const rup=s=>String(s).replace(/\+/g,'');
const uzn=s=>String(s).replace(/([oOgG])['‘’`ʼ]/g,'$1ʻ').replace(/([A-Za-zʻ])['’`](?=[A-Za-z])/g,'$1ʼ');
const CJK='⺀-鿿　-〿＀-￯“”‘’—…·《》';
const zhc=s=>String(s).replace(new RegExp(`([${CJK}]) +(?=[${CJK}])`,'g'),'$1').replace(new RegExp(`([${CJK}]) +(?=[${CJK}])`,'g'),'$1');
// how a text in language l is shown as a MEANING (native side)
const asMeaning=(l,s)=> l==='ru'?rup(s): l==='ar'?arp(s): (l==='zh'||l==='ja')?zhc(s): l==='uz'?uzn(s): s;
const asTarget=(l,s)=> l==='uz'?uzn(s): s;
// ---------- master lines in all 6 languages ----------
function trFile(dir,lv){ return L(fs.readFileSync(dir+lv+'.txt','utf8')).map(l=>l.split('|')); }
const LINES={}; // LINES[lv] = [{kind, ar,ru,en,uz,es,zh, star, who, e, title:{...}}]
LV.forEach(lv=>{ const X=M[lv], T=trFile('tr/',lv), Z=trFile('tr/zh/',lv); let k=0; const out=[];
  const nx=(kind)=>{ const t=T[k], z=Z[k]; k++; if(t[0]!==kind||z[0]!==kind) throw new Error(lv+' align '+kind+' '+t.join('|')+' / '+z.join('|')); return [t,z]; };
  const star=(t)=>t[t.length-1]==='*';
  X.vocab.forEach(th=>{ const [t,z]=nx('TH'); const [tar,tru]=th.t.split('::'); const theme={ar:arp(tar),ru:rup(tru),en:t[1],zh:zhc(z[1]),uz:uzn(z[2]),es:z[3]};
    L(th.w).forEach(l=>{ const [e,ru,en,ar]=l.split('|'); const [t2,z2]=nx('V'); out.push({kind:'V',theme,e,ru,en,ar,uz:t2[2],es:t2[3],zh:z2[1]}); }); });
  L(X.sentences).forEach(l=>{ const [ru,en,ar]=l.split('|'); const [t,z]=nx('S'); out.push({kind:'S',ru,en,ar,uz:t[2],es:t[3],zh:z[1],star:star(t)?'S':null}); });
  X.readings.forEach(rd=>{ const [tru,ten,tar]=rd.t.split('|'); const [t,z]=nx('RT'); const R={kind:'R',title:{ru:tru,en:ten,ar:tar,uz:t[2],es:t[3],zh:z[1]},star:star(t)?'RT':null,sents:[]};
    L(rd.s).forEach((l,i)=>{ const [ru,en,ar]=l.split('|'); const [t2,z2]=nx('RL'); R.sents.push({ru,en,ar,uz:t2[2],es:t2[3],zh:z2[1],star:star(t2)?(i===0?'RL1':'RL2'):null}); }); out.push(R); });
  X.dialogues.forEach(dg=>{ const [tar,tru]=dg.t.split('::'); const [t,z]=nx('DT'); const D={kind:'D',title:{ar:arp(tar),ru:rup(tru),en:t[1],zh:zhc(z[1]),uz:uzn(z[2]),es:z[3]},lines:[]};
    L(dg.l).forEach(l=>{ const [w,ru,en,ar]=l.split('|'); const [t2,z2]=nx('DL'); D.lines.push({who:w,ru,en,ar,uz:t2[3],es:t2[4],zh:z2[2]}); }); out.push(D); });
  if (k!==T.length||k!==Z.length) throw new Error(lv+' leftover');
  // new languages: tr/<l>/<LV>.txt aligned line by line with the same skeleton
  for (const l of LANGS.filter(x=>NEW.includes(x))){ const N=trFile('tr/'+l+'/',lv); let j=0;
    const nx2=(kind)=>{ const f=N[j++]; if(!f||f[0]!==kind) throw new Error(l+' '+lv+' line '+j+' expected '+kind+' got '+(f&&f.join('|'))); return f; };
    let lastTheme=null;
    out.forEach(it=>{
      if (it.kind==='V'){ if (it.theme!==lastTheme){ it.theme[l]=nx2('TH')[1]; lastTheme=it.theme; } it[l]=nx2('V')[1]; }
      else if (it.kind==='S') it[l]=nx2('S')[1];
      else if (it.kind==='R'){ it.title[l]=nx2('RT')[1]; it.sents.forEach(x=>{ x[l]=nx2('RL')[1]; }); }
      else if (it.kind==='D'){ it.title[l]=nx2('DT')[1]; it.lines.forEach(x=>{ const f=nx2('DL'); if(f[1]!==x.who) throw new Error(l+' '+lv+' speaker '+j); x[l]=f[2]; }); }
    });
    if (j!==N.length) throw new Error(l+' '+lv+' leftover '+(N.length-j)); }
  LINES[lv]=out; });
// ---------- sentences that name the target language ----------
const STAR={
 ar:{S:{ru:'كَيْفَ نَقُولُ «كِتَابٌ» بِالرُّوسِيَّةِ؟',en:'كَيْفَ نَقُولُ «كِتَابٌ» بِالإِنْجِلِيزِيَّةِ؟',ar:'كَيْفَ نَقُولُ «كِتَابٌ» بِالعَرَبِيَّةِ؟',uz:'كَيْفَ نَقُولُ «كِتَابٌ» بِالأُوزْبَكِيَّةِ؟',es:'كَيْفَ نَقُولُ «كِتَابٌ» بِالإِسْبَانِيَّةِ؟',zh:'كَيْفَ نَقُولُ «كِتَابٌ» بِالصِّينِيَّةِ؟'},
     RT:{ru:'كَيْفَ أَتَعَلَّمُ الرُّوسِيَّةَ',en:'كَيْفَ أَتَعَلَّمُ الإِنْجِلِيزِيَّةَ',ar:'كَيْفَ أَتَعَلَّمُ العَرَبِيَّةَ',uz:'كَيْفَ أَتَعَلَّمُ الأُوزْبَكِيَّةَ',es:'كَيْفَ أَتَعَلَّمُ الإِسْبَانِيَّةَ',zh:'كَيْفَ أَتَعَلَّمُ الصِّينِيَّةَ'},
     RL1:{ru:'أَتَعَلَّمُ اللُّغَةَ الرُّوسِيَّةَ مُنْذُ سَنَةٍ.',en:'أَتَعَلَّمُ اللُّغَةَ الإِنْجِلِيزِيَّةَ مُنْذُ سَنَةٍ.',ar:'أَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ مُنْذُ سَنَةٍ.',uz:'أَتَعَلَّمُ اللُّغَةَ الأُوزْبَكِيَّةَ مُنْذُ سَنَةٍ.',es:'أَتَعَلَّمُ اللُّغَةَ الإِسْبَانِيَّةَ مُنْذُ سَنَةٍ.',zh:'أَتَعَلَّمُ اللُّغَةَ الصِّينِيَّةَ مُنْذُ سَنَةٍ.'},
     RL2:{ru:'سَاعَدَنِي أَصْدِقَائِي الرُّوسُ كَثِيرًا.',en:'سَاعَدَنِي أَصْدِقَائِي الإِنْجِلِيزُ كَثِيرًا.',ar:'سَاعَدَنِي أَصْدِقَائِي العَرَبُ كَثِيرًا.',uz:'سَاعَدَنِي أَصْدِقَائِي الأُوزْبَكُ كَثِيرًا.',es:'سَاعَدَنِي أَصْدِقَائِي الإِسْبَانُ كَثِيرًا.',zh:'سَاعَدَنِي أَصْدِقَائِي الصِّينِيُّونَ كَثِيرًا.'}},
 ru:{S:{ru:'Как по-р+усски «кн+ига»?',en:'Как по-англ+ийски «кн+ига»?',ar:'Как по-ар+абски «кн+ига»?',uz:'Как по-узб+екски «кн+ига»?',es:'Как по-исп+ански «кн+ига»?',zh:'Как по-кит+айски «кн+ига»?'},
     RT:{ru:'Как я уч+у р+усский',en:'Как я уч+у англ+ийский',ar:'Как я уч+у ар+абский',uz:'Как я уч+у узб+екский',es:'Как я уч+у исп+анский',zh:'Как я уч+у кит+айский'},
     RL1:{ru:'Я уч+у р+усский яз+ык уж+е год.',en:'Я уч+у англ+ийский яз+ык уж+е год.',ar:'Я уч+у ар+абский яз+ык уж+е год.',uz:'Я уч+у узб+екский яз+ык уж+е год.',es:'Я уч+у исп+анский яз+ык уж+е год.',zh:'Я уч+у кит+айский яз+ык уж+е год.'},
     RL2:{ru:'Мне +очень помогл+и мо+и р+усские друзь+я.',en:'Мне +очень помогл+и мо+и англ+ийские друзь+я.',ar:'Мне +очень помогл+и мо+и ар+абские друзь+я.',uz:'Мне +очень помогл+и мо+и узб+екские друзь+я.',es:'Мне +очень помогл+и мо+и исп+анские друзь+я.',zh:'Мне +очень помогл+и мо+и кит+айские друзь+я.'}},
 en:{S:{ru:'How do you say "book" in Russian?',en:'How do you say "book" in English?',ar:'How do you say "book" in Arabic?',uz:'How do you say "book" in Uzbek?',es:'How do you say "book" in Spanish?',zh:'How do you say "book" in Chinese?'},
     RT:{ru:'How I Learn Russian',en:'How I Learn English',ar:'How I Learn Arabic',uz:'How I Learn Uzbek',es:'How I Learn Spanish',zh:'How I Learn Chinese'},
     RL1:{ru:'I have been learning Russian for a year already.',en:'I have been learning English for a year already.',ar:'I have been learning Arabic for a year already.',uz:'I have been learning Uzbek for a year already.',es:'I have been learning Spanish for a year already.',zh:'I have been learning Chinese for a year already.'},
     RL2:{ru:'My Russian friends helped me a lot.',en:'My English-speaking friends helped me a lot.',ar:'My Arab friends helped me a lot.',uz:'My Uzbek friends helped me a lot.',es:'My Spanish friends helped me a lot.',zh:'My Chinese friends helped me a lot.'}},
 uz:{S:{ru:'Ruscha «kitob» qanday boʻladi?',en:'Inglizcha «kitob» qanday boʻladi?',ar:'Arabcha «kitob» qanday boʻladi?',uz:'Oʻzbekcha «kitob» qanday boʻladi?',es:'Ispancha «kitob» qanday boʻladi?',zh:'Xitoycha «kitob» qanday boʻladi?'},
     RT:{ru:'Men rus tilini qanday oʻrganyapman',en:'Men ingliz tilini qanday oʻrganyapman',ar:'Men arab tilini qanday oʻrganyapman',uz:'Men oʻzbek tilini qanday oʻrganyapman',es:'Men ispan tilini qanday oʻrganyapman',zh:'Men xitoy tilini qanday oʻrganyapman'},
     RL1:{ru:'Men rus tilini bir yildan beri oʻrganyapman.',en:'Men ingliz tilini bir yildan beri oʻrganyapman.',ar:'Men arab tilini bir yildan beri oʻrganyapman.',uz:'Men oʻzbek tilini bir yildan beri oʻrganyapman.',es:'Men ispan tilini bir yildan beri oʻrganyapman.',zh:'Men xitoy tilini bir yildan beri oʻrganyapman.'},
     RL2:{ru:'Rus doʻstlarim menga juda koʻp yordam berishdi.',en:'Ingliz doʻstlarim menga juda koʻp yordam berishdi.',ar:'Arab doʻstlarim menga juda koʻp yordam berishdi.',uz:'Oʻzbek doʻstlarim menga juda koʻp yordam berishdi.',es:'Ispan doʻstlarim menga juda koʻp yordam berishdi.',zh:'Xitoy doʻstlarim menga juda koʻp yordam berishdi.'}},
 es:{S:{ru:'¿Cómo se dice «libro» en ruso?',en:'¿Cómo se dice «libro» en inglés?',ar:'¿Cómo se dice «libro» en árabe?',uz:'¿Cómo se dice «libro» en uzbeko?',es:'¿Cómo se dice «libro» en español?',zh:'¿Cómo se dice «libro» en chino?'},
     RT:{ru:'Cómo aprendo ruso',en:'Cómo aprendo inglés',ar:'Cómo aprendo árabe',uz:'Cómo aprendo uzbeko',es:'Cómo aprendo español',zh:'Cómo aprendo chino'},
     RL1:{ru:'Llevo un año aprendiendo ruso.',en:'Llevo un año aprendiendo inglés.',ar:'Llevo un año aprendiendo árabe.',uz:'Llevo un año aprendiendo uzbeko.',es:'Llevo un año aprendiendo español.',zh:'Llevo un año aprendiendo chino.'},
     RL2:{ru:'Mis amigos rusos me ayudaron mucho.',en:'Mis amigos ingleses me ayudaron mucho.',ar:'Mis amigos árabes me ayudaron mucho.',uz:'Mis amigos uzbekos me ayudaron mucho.',es:'Mis amigos españoles me ayudaron mucho.',zh:'Mis amigos chinos me ayudaron mucho.'}},
 zh:{S:{ru:'“ 书 ” 用 俄语 怎么 说 ？',en:'“ 书 ” 用 英语 怎么 说 ？',ar:'“ 书 ” 用 阿拉伯语 怎么 说 ？',uz:'“ 书 ” 用 乌兹别克语 怎么 说 ？',es:'“ 书 ” 用 西班牙语 怎么 说 ？',zh:'“ 书 ” 用 中文 怎么 说 ？'},
     RT:{ru:'我 是 怎么 学 俄语 的',en:'我 是 怎么 学 英语 的',ar:'我 是 怎么 学 阿拉伯语 的',uz:'我 是 怎么 学 乌兹别克语 的',es:'我 是 怎么 学 西班牙语 的',zh:'我 是 怎么 学 中文 的'},
     RL1:{ru:'我 学 俄语 已经 一 年 了 。',en:'我 学 英语 已经 一 年 了 。',ar:'我 学 阿拉伯语 已经 一 年 了 。',uz:'我 学 乌兹别克语 已经 一 年 了 。',es:'我 学 西班牙语 已经 一 年 了 。',zh:'我 学 中文 已经 一 年 了 。'},
     RL2:{ru:'我 的 俄罗斯 朋友 帮 了 我 很 多 。',en:'我 的 英国 朋友 帮 了 我 很 多 。',ar:'我 的 阿拉伯 朋友 帮 了 我 很 多 。',uz:'我 的 乌兹别克 朋友 帮 了 我 很 多 。',es:'我 的 西班牙 朋友 帮 了 我 很 多 。',zh:'我 的 中国 朋友 帮 了 我 很 多 。'}}};
// text of an item in language l for a course whose target is t (star lines follow the target)
const starOf=(l,k,t)=>{ const v=(STARX[l]&&STARX[l][k]&&STARX[l][k][t])||(STAR[l]&&STAR[l][k]&&STAR[l][k][t]); if(v==null) throw new Error('STAR missing '+l+' '+k+' '+t); return v; };
const txt=(item,l,t)=> item.star ? starOf(l,item.star,t) : item[l];
// ---------- grammar sets per target ----------
function mergeGrammar(t){
  // returns {A1:[{title:{..},body:{..},ex:[{src, m:{l:..}}], quiz:[[q{..},opts..]]}]}
  const R={}; const add=(lv,i,obj)=>{ (R[lv]=R[lv]||[]); R[lv][i]=R[lv][i]||{title:{},body:{},ex:[],quiz:[]}; const g=R[lv][i];
    Object.assign(g.title,obj.title||{}); Object.assign(g.body,obj.body||{}); return g; };
  const exLines=(s)=>L(s).map(l=>l.split('|'));
  if (t==='ru'||t==='ar'){ const base=GR[t+'_en'], sup=SUP[t];
    LV.forEach(lv=>(base[lv]||[]).forEach((g,i)=>{ const G=add(lv,i,{title:g.title,body:g.body}); const s=sup[lv][i];
      Object.assign(G.title,s.t); Object.assign(G.body,s.b);
      G.ex=exLines(g.ex).map((f,j)=>{ const x=s.ex[j].split('|'); return {src:f[0], m:{en:f[1],uz:x[0],es:x[1],zh:x[2]}}; });
      G.quiz=g.quiz.map((q,j)=>[Object.assign({},q[0],s.q[j])].concat(q.slice(1))); })); }
  if (t==='uz'||t==='es'){ const base=GR[t], sup=SUP[t]; const o=t==='uz'?['es','zh']:['uz','zh'];
    LV.forEach(lv=>(base[lv]||[]).forEach((g,i)=>{ const G=add(lv,i,{title:g.title,body:g.body}); const s=sup[lv][i];
      Object.assign(G.title,s.t); Object.assign(G.body,s.b);
      G.ex=exLines(g.ex).map((f,j)=>{ const x=s.ex[j].split('|'); const m={ar:f[1],ru:f[2],en:f[3]}; m[o[0]]=x[0]; m[o[1]]=x[1]; return {src:f[0],m}; });
      G.quiz=g.quiz.map((q,j)=>[Object.assign({},q[0],s.q[j])].concat(q.slice(1))); })); }
  if (t==='en'){ const base=GR.en_x; LV.forEach(lv=>(base[lv]||[]).forEach((g,i)=>{ const G=add(lv,i,{title:g.title,body:g.body});
      G.ex=exLines(g.ex).map(f=>({src:f[0],m:{uz:f[1],es:f[2],zh:f[3]}})); G.quiz=g.quiz; })); }
  if (t==='zh'){ const base=GR.zh; LV.forEach(lv=>(base[lv]||[]).forEach((g,i)=>{ const G=add(lv,i,{title:g.title,body:g.body});
      G.ex=exLines(g.ex).map(f=>({src:f[0],m:{ar:f[1],ru:f[2],en:f[3],uz:f[4],es:f[5]}})); G.quiz=g.quiz; })); }
  // new targets: structure from GB[t] (examples in the target + quiz options)
  if (GB[t]) LV.forEach(lv=>(GB[t][lv]||[]).forEach((g,i)=>{ const G=add(lv,i,{}); G.ex=g.ex.map(src=>({src,m:{}})); G.quiz=g.q.map(o=>[{}].concat(o)); }));
  // explanations in more native languages: GN['t.n'] aligned by level and index
  for (const n of LANGS){ const X=GN[t+'.'+n]; if (!X) continue;
    LV.forEach(lv=>(X[lv]||[]).forEach((x,i)=>{ const G=R[lv]&&R[lv][i]; if(!G) throw new Error('GN '+t+'.'+n+' '+lv+' '+i+' has no base');
      G.title[n]=x.t; G.body[n]=x.b;
      if (x.ex.length!==G.ex.length) throw new Error('GN '+t+'.'+n+' '+lv+' '+i+' ex '+x.ex.length+'/'+G.ex.length);
      if (x.q.length!==G.quiz.length) throw new Error('GN '+t+'.'+n+' '+lv+' '+i+' q '+x.q.length+'/'+G.quiz.length);
      x.ex.forEach((m,j)=>{ G.ex[j].m[n]=m; }); x.q.forEach((q,j)=>{ G.quiz[j][0][n]=q; }); })); }
  return R;
}
// ---------- alphabets per target ----------
function alphabet(t){
  const lines=s=>L(s).map(l=>l.split('|'));
  if (t==='ru'){ const en=lines(ALPHA.ru_en), x=lines(ALPHA.ru_x); return L(RU.alphabet).map((l,i)=>{ const f=l.split('|'), e=en[i], y=x[i];
      return {letter:f[0],name:f[1],nameSay:f[1],sound:{ar:f[2],en:e[1],uz:y[1],es:y[2],zh:y[3]},ex:f[3],e:f[4],m:{ar:f[5],en:e[2],uz:y[4],es:y[5],zh:y[6]}}; }); }
  if (t==='ar'){ const en=lines(ALPHA.ar_en), x=lines(ALPHA.ar_x); return L(AR.alphabet).map((l,i)=>{ const f=l.split('|'), e=en[i], y=x[i];
      return {letter:f[0],name:{ru:f[1],en:e[1],uz:y[1],es:y[1],zh:y[1]},nameSay:f[7],sound:{ru:f[2],en:e[2],uz:y[2],es:y[3],zh:y[4]},forms:f[3],ex:f[4],e:f[5],m:{ru:f[6],en:e[3],uz:y[5],es:y[6],zh:y[7]}}; }); }
  if (t==='en'){ const x=lines(ALPHA.en_x); return L(EN.alphabet).map((l,i)=>{ const f=l.split('|'), y=x[i]; const nm=f[1].split('::'), sd=f[2].split('::');
      return {letter:f[0],name:{ar:nm[0],ru:nm[1],uz:y[1],es:y[1],zh:y[1]},nameSay:f[0].split(' ')[0]+'.',sound:{ar:sd[0],ru:sd[1],uz:y[2],es:y[3],zh:y[4]},ex:f[3],e:f[4],m:{ar:f[5],ru:f[6],uz:y[5],es:y[6],zh:y[7]}}; }); }
  if (t==='uz'||t==='es'){ const x=lines(ALPHA[t+'_x']); const o=t==='uz'?['es','zh']:['uz','zh'];
    return ALPHA[t].map((a,i)=>{ const y=x[i]; const s=Object.assign({},a.sound), m=Object.assign({},a.m); s[o[0]]=y[1]; s[o[1]]=y[2]; m[o[0]]=y[3]; m[o[1]]=y[4];
      return {letter:a.letter,name:a.name,nameSay:a.name,sound:s,ex:uzn(a.ex),e:a.e,m}; }); }
  if (t==='zh'){ return lines(ALPHA.zh).map(f=>({letter:f[0],name:f[0],nameSay:f[1],sound:{ar:f[2],ru:f[3],en:f[4],uz:f[5],es:f[6]},ex:f[7],e:f[8],m:{ar:f[9],ru:f[10],en:f[11],uz:f[12],es:f[13]}})); }
  // new targets: AB[t] = 'letter|name|nameSay|example|emoji|forms'
  if (AB[t]) return lines(AB[t]).map(f=>({letter:f[0],name:{},nameSay:f[2],sound:{},ex:f[3],e:f[4],forms:f[5]||undefined,m:{},_name:f[1]}));
}
function alphabetAll(t){ const A=alphabet(t); if(!A) return A;
  // AN['t.n'] = 'name|sound|meaning' per letter, aligned
  for (const n of LANGS){ const X=AN[t+'.'+n]; if(!X) continue; const rows=L(X).map(l=>l.split('|')); if(rows.length!==A.length) throw new Error('AN '+t+'.'+n+' rows '+rows.length+'/'+A.length);
    rows.forEach((f,i)=>{ const a=A[i]; if (typeof a.name!=='object') a.name=Object.fromEntries(LANGS.map(x=>[x,a.name]));
      a.name[n]=f[0]||a._name||a.name.en||a.letter; a.sound[n]=f[1]; a.m[n]=f[2]; }); }
  A.forEach(a=>{ if (typeof a.name==='object'){ for (const n of LANGS) if (a.name[n]==null) a.name[n]=a._name||a.name.en||a.letter; } delete a._name; });
  return A; }
const ALL=BASE.concat(NEW);
function common(t,nat){
  const extra={}; for (const n of nat){ if (CW[t+'.'+n]) L(CW[t+'.'+n]).forEach(l=>{ const f=l.split('|'); (extra[f[0]]=extra[f[0]]||{})[n]=f[1]; }); }
  if (CW[t]) return L(CW[t]).map(l=>{ const f=l.split('|'); const m={}; ALL.forEach((x,i)=>{ m[x]=f[i+1]||''; }); return [f[0]].concat(nat.map(n=>asMeaning(n,m[n]||(extra[f[0]]||{})[n]||''))).join('|'); }).join('\n');
  return common0(t,nat).split('\n').map(l=>{ if(!l) return l; const f=l.split('|'); const w=f[0]; nat.forEach((n,i)=>{ if(!f[i+1] && extra[w] && extra[w][n]) f[i+1]=asMeaning(n,extra[w][n]); }); return f.join('|'); }).join('\n');
}
function common0(t,nat){
  if (t==='uz'||t==='es'){ const base=L(fs.readFileSync(`x/common_${t}.txt`,'utf8')).map(l=>l.split('|')); const xx={}; L(fs.readFileSync(`x/common_${t}_x.txt`,'utf8')).forEach(l=>{ const f=l.split('|'); xx[f[0]]=f; });
    const o=t==='uz'?['es','zh']:['uz','zh'];
    return base.map(f=>{ const y=xx[f[0]]||[]; const m={ar:f[1],ru:f[2],en:f[3]}; m[o[0]]=y[1]||''; m[o[1]]=y[2]||''; return [t==='uz'?uzn(f[0]):f[0]].concat(nat.map(n=>asMeaning(n,m[n]||''))).join('|'); }).join('\n'); }
  if (t==='zh'){ return L(fs.readFileSync('x/common_zh.txt','utf8')).map(l=>{ const f=l.split('|'); const m={ar:f[1],ru:f[2],en:f[3],uz:f[4],es:f[5]}; return [f[0]].concat(nat.map(n=>m[n])).join('|'); }).join('\n'); }
  return '';
}
// ---------- build a master bank for target t ----------
function buildMaster(t){
  const nat=LANGS.filter(l=>l!==t); const bank={lang:t,nat,alphabet:alphabetAll(t),common:common(t,nat),levels:{}};
  const G=mergeGrammar(t);
  const seen=new Set();
  LV.forEach(lv=>{ const D={vocab:[],sentences:'',grammar:[],readings:[],dialogues:[]}; let cur=null; const S=[];
    LINES[lv].forEach(it=>{
      if (it.kind==='V'){ if (!cur||cur.ref!==it.theme){ cur={ref:it.theme,t:Object.fromEntries(nat.map(n=>[n,it.theme[n]])),rows:[]}; D.vocab.push(cur); }
        const src=asTarget(t,txt(it,t,t)); const key=src.toLowerCase()+'|'+String(it.en).toLowerCase().replace(/\s*\(.*?\)/g,'').trim(); if (seen.has(key)) return; seen.add(key);
        cur.rows.push([it.e,src].concat(nat.map(n=>asMeaning(n,txt(it,n,t)))).join('|')); }
      else if (it.kind==='S') S.push([asTarget(t,txt(it,t,t))].concat(nat.map(n=>asMeaning(n,txt(it,n,t)))).join('|'));
      else if (it.kind==='R') D.readings.push({title:asTarget(t,it.star?starOf(t,'RT',t):it.title[t]), tr:Object.fromEntries(nat.map(n=>[n,asMeaning(n,it.star?starOf(n,'RT',t):it.title[n])])),
          sents:it.sents.map(s=>[asTarget(t,txt(s,t,t))].concat(nat.map(n=>asMeaning(n,txt(s,n,t)))).join('|')).join('\n'), gloss:''});
      else if (it.kind==='D') D.dialogues.push({title:Object.fromEntries(nat.map(n=>[n,it.title[n]])), lines:it.lines.map(s=>[s.who,asTarget(t,s[t])].concat(nat.map(n=>asMeaning(n,s[n]))).join('|')).join('\n')});
    });
    D.vocab=D.vocab.map(v=>({t:v.t,w:v.rows.join('\n')})).filter(v=>v.w);
    D.sentences=S.join('\n');
    D.grammar=(G[lv]||[]).map(g=>({title:Object.fromEntries(nat.filter(n=>g.title[n]).map(n=>[n,asMeaning(n,g.title[n])])),
      body:Object.fromEntries(nat.filter(n=>g.body[n]).map(n=>[n, (n==='zh'||n==='ja')?zhc(g.body[n]):n==='uz'?String(g.body[n]).replace(/(\[\[.*?\]\])|([^\[]+)/g,(m,a,b)=>a?a:uzn(b)):g.body[n]])),
      ex:g.ex.map(e=>[asTarget(t,e.src)].concat(nat.map(n=>e.m[n]!=null?asMeaning(n,e.m[n]):'')).join('|')).join('\n'),
      quiz:g.quiz.map(q=>[Object.fromEntries(Object.entries(q[0]).map(([n,v])=>[n,asMeaning(n,v)]))].concat(q.slice(1).map(o=>asTarget(t,o))))}));
    if (t==='uz') D.grammar.forEach(g=>{ for (const n in g.body) g.body[n]=String(g.body[n]).replace(/\[\[(.+?)\]\]/g,(m,x)=>'[['+uzn(x)+']]'); });
    bank.levels[lv]=D; });
  return bank;
}
const legacy=(B,nat)=>Object.assign(JSON.parse(JSON.stringify(B)),{nat});
const LEG={ 'ar-ru':'RU', 'ar-en':'EN', 'ru-en':'EN', 'ru-ar':'AR' };
const banks={ 'RU':legacy(RU,['ar']), 'EN':legacy(EN,['ar','ru']), 'AR':legacy(AR,['ru']) };
const PYX=fs.existsSync('x/py_zh.json')?JSON.parse(fs.readFileSync('x/py_zh.json','utf8')):null;
const RJX=fs.existsSync('x/rj_ja.json')?JSON.parse(fs.readFileSync('x/rj_ja.json','utf8')):null;
const masters={}; for (const t of LANGS) masters[t]=buildMaster(t);
if (process.argv[3]==='--dump'){ for (const t of LANGS) fs.writeFileSync(path.join(OUT,'M_'+t+'.json'),JSON.stringify(masters[t])); console.log('dumped'); process.exit(0); }
// one bank per (target, native) pair: keeps every course file small
function pairBank(t,n){ const B=masters[t]; const i=B.nat.indexOf(n); const pick=line=>{ if(!line) return line; return line.split('\n').map(l=>{ const f=l.split('|'); return f.slice(0,f.length-B.nat.length).concat([f[f.length-B.nat.length+i]]).join('|'); }).join('\n'); };
  const one=o=>o&&typeof o==='object'&&!Array.isArray(o)?(o[n]!=null?{[n]:o[n]}:{}):o;
  const out={lang:t,nat:[n],alphabet:B.alphabet&&B.alphabet.map(a=>Object.assign({},a,{name:typeof a.name==='object'?one(a.name):a.name,sound:one(a.sound),m:one(a.m)})),common:pick(B.common),levels:{}};
  for (const lv of LV){ const D=B.levels[lv];
    out.levels[lv]={vocab:D.vocab.map(v=>({t:one(v.t),w:pick(v.w)})), sentences:pick(D.sentences),
      grammar:D.grammar.filter(g=>g.body[n]).map(g=>({title:one(g.title),body:one(g.body),ex:pick(g.ex),quiz:g.quiz.map(q=>[one(q[0])].concat(q.slice(1)))})),
      readings:D.readings.map(r=>({title:r.title,tr:one(r.tr),sents:pick(r.sents),gloss:''})),
      dialogues:D.dialogues.map(d=>({title:one(d.title),lines:pick(d.lines)}))}; }
  if (t==='zh'&&PYX) out.py=PYX; if (t==='ja'&&RJX) out.rj=RJX;
  return out; }
const COURSES={};
for (const n of LANGS) for (const t of LANGS){ if (n===t) continue; const id=n+'-'+t;
  if (LEG[id]){ COURSES[id]={n,t,bank:LEG[id]}; continue; }
  const b='P_'+t+'_'+n; banks[b]=pairBank(t,n); COURSES[id]={n,t,bank:b}; }
for (const f of fs.readdirSync(OUT)) if (/^(P_|M_).*\.json$/.test(f)) fs.unlinkSync(path.join(OUT,f));
for (const k in banks){ fs.writeFileSync(path.join(OUT,k+'.json'),JSON.stringify(banks[k])); }
fs.writeFileSync(path.join(OUT,'courses.json'),JSON.stringify(COURSES));
// summary
const sum=B=>LV.map(lv=>{ const D=B.levels[lv]; return lv+':'+D.vocab.reduce((a,t)=>a+L(t.w).length,0)+'w/'+L(D.sentences).length+'s/'+D.grammar.length+'g'; }).join(' ');
let bad=0; for (const k in banks){ const B=banks[k]; const line=k+' '+(JSON.stringify(B).length/1024|0)+'KB '+sum(B); if (process.argv.includes('-v')) console.log(line);
  if (k.startsWith('P_')) LV.forEach(lv=>{ const D=B.levels[lv]; const w=D.vocab.reduce((a,t)=>a+L(t.w).length,0); if (D.grammar.length<2||w<150||L(D.sentences).length<90){ bad++; console.log('THIN',k,lv,w,D.grammar.length); } }); }
console.log('banks',Object.keys(banks).length,'courses',Object.keys(COURSES).length,'thin',bad);
