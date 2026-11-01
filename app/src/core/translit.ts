// @ts-nocheck
/* Transliteration helpers: Russian → Arabic script, Arabic (vowelized) → Cyrillic */
const RU_VOW = 'аеёиоуыэюя';
const RU_EXC = {
 'что':'شتو','чтобы':'شتوبي','конечно':'كانيشنا','скучно':'سكوشنا','сегодня':'سيڤودنيا',
 'здравствуйте':'زدراستڤويتي','солнце':'سونتسي','сердце':'سيرتسي','его':'يِڤو','него':'نيڤو',
 'всего':'ڤسيڤو','ничего':'نيتشيڤو','чего':'تشيڤو','много':'منوگا','бог':'بوخ','лёгкий':'ليوخكي',
 'счёт':'شّوت','счастье':'شّاستيا','мне':'منيه','что-нибудь':'شتو-نيبود'
};
const RU_CONS = {б:'ب',в:'ڤ',г:'گ',д:'د',ж:'ج',з:'ز',й:'ي',к:'ك',л:'ل',м:'م',н:'ن',п:'پ',р:'ر',с:'س',т:'ت',ф:'ف',х:'خ',ц:'تس',ч:'تش',ш:'ش',щ:'شّ',ъ:'',ь:''};
const RU_DEVOICE = {б:'п',в:'ф',г:'к',д:'т',ж:'ш',з:'с'};
function ruWordToAr(w){
  let plain = w.replace(/\+/g,'').toLowerCase();
  if (RU_EXC[plain]) return RU_EXC[plain];
  let s = w.toLowerCase();
  s = s.replace(/ться$/,'ца').replace(/тся$/,'ца');
  // letters with stress index
  const letters = []; let stressAt = -1;
  for (let i=0;i<s.length;i++){ const c=s[i]; if(c==='+'){ stressAt = letters.length; continue;} letters.push(c); }
  const vowelIdx = letters.map((c,i)=>RU_VOW.includes(c)?i:-1).filter(i=>i>=0);
  if (stressAt<0){ const yo = letters.indexOf('ё'); if (yo>=0) stressAt=yo; else if (vowelIdx.length===1) stressAt=vowelIdx[0]; }
  const knownStress = stressAt>=0;
  // final devoicing
  let last = letters.length-1; while(last>=0 && (letters[last]==='ь'||letters[last]==='ъ'||letters[last]==='-')) last--;
  const word = letters.join('');
  const gToV = /(ого|его)$/.test(word) && word.length>3 && !/(много|строго|дорого|убого)$/.test(word);
  let out = '';
  for (let i=0;i<letters.length;i++){
    let c = letters[i]; const prev = i>0?letters[i-1]:'';
    if (c==='-'){ out+='-'; continue; }
    const initial = i===0 || prev==='-' || RU_VOW.includes(prev) || prev==='ъ' || prev==='ь';
    const stressed = i===stressAt;
    if (RU_VOW.includes(c)){
      const hard = 'жшцчщ'.includes(prev);
      switch(c){
        case 'а': out += (i===0||prev==='-')?'ا':'ا'; break;
        case 'о': if (stressed||!knownStress) out += (i===0||prev==='-')?'أو':'و'; else out += 'ا'; break;
        case 'у': out += (i===0||prev==='-')?'أو':'و'; break;
        case 'ы': out += 'ي'; break;
        case 'и': out += (i===0||prev==='-')?'إي':'ي'; break;
        case 'э': out += (i===0||prev==='-')?'إي':'ي'; break;
        case 'е': out += initial?'يِ':'ي'; break;
        case 'ё': out += (initial)?'يو':(hard?'و':'يو'); break;
        case 'ю': out += 'يو'; break;
        case 'я': if (initial || stressed || i===letters.length-1 || !knownStress) out += 'يا'; else out += 'ي'; break;
      }
    } else {
      if (c==='г' && gToV && i===letters.length-2) { out+='ڤ'; continue; }
      if (i===last && RU_DEVOICE[c]) c = RU_DEVOICE[c];
      out += RU_CONS[c] !== undefined ? RU_CONS[c] : c;
    }
  }
  return out.replace(/يي/g,'ي').replace(/اا/g,'ا').replace(/وو/g,'و');
}
function ruToAr(src){
  return src.split(/([^а-яё+\-]+)/i).map(tok=>{
    if (!/[а-яё]/i.test(tok)) return tok.replace(/,/g,'،').replace(/\?/g,'؟').replace(/;/g,'؛').replace(/[«»"]/g,'');
    return ruWordToAr(tok);
  }).join('');
}

/* Arabic → Cyrillic (scholarly-practical: ҳ ح, х خ, һ ه, қ ق, ғ غ, ʿ ع, ʾ ء, dot below = emphatic) */
const AR_C = {'ب':'б','ت':'т','ث':'с̱','ج':'дж','ح':'ҳ','خ':'х','د':'д','ذ':'з̱','ر':'р','ز':'з','س':'с','ش':'ш','ص':'с̣','ض':'д̣','ط':'т̣','ظ':'з̣','ع':'ʿ','غ':'ғ','ف':'ф','ق':'қ','ك':'к','ل':'л','م':'м','ن':'н','ه':'һ','و':'в','ي':'й','ء':'ʾ','أ':'ʾ','إ':'ʾ','ؤ':'ʾ','ئ':'ʾ','ة':'т'};
const AR_SUN = 'تثدذرزسشصضطظلن';
const AR_V = {'َ':'а','ِ':'и','ُ':'у','ً':'ан','ٍ':'ин','ٌ':'ун'};
const AR_EXC = {'الله':'Алла̄һ','اللَّهِ':'Алла̄һи','لِلَّهِ':'лилла̄һи','اللَّهُ':'Алла̄һу','اللَّهَ':'Алла̄һа','هَذَا':'ха̄за̄','هَذِهِ':'ха̄зиһи','ذَلِكَ':'за̄лика','لَكِنْ':'ла̄кин','لَكِنَّ':'ла̄кинна'};
function arUnits(w){
  const u=[]; for (const ch of w){ if (/[ً-ْٰ]/.test(ch)){ if(u.length) u[u.length-1].m+=ch; } else if (ch!=='ـ') u.push({c:ch,m:''}); }
  return u;
}
function arWordToRu(w, wi){
  if (AR_EXC[w]) return AR_EXC[w];
  const u = arUnits(w); let out=''; let i=0; let skipShadda=false;
  // prefixes (و ف ب ل ك with a vowel) followed by ال
  const pre = (k)=> u[k] && 'وفبلك'.includes(u[k].c) && /[َِ]/.test(u[k].m) && !/ْ/.test(u[k].m);
  const isAl = (k)=> u[k] && u[k].c==='ا' && !/[َُِ]/.test(u[k].m) && u[k+1] && u[k+1].c==='ل' && u[k+2];
  let start=0;
  if (pre(0) && isAl(1)){ out += AR_C[u[0].c] + (u[0].m.includes('َ')?'а':'и'); start=1; }
  if (isAl(start)){
    const nx = u[start+2];
    if (AR_SUN.includes(nx.c) && (nx.m.includes('ّ') || !u[start+1].m.includes('ْ'))){
      out += (start? '' : 'а') + AR_C[nx.c] + '-'; skipShadda = true;
    } else out += (start? 'ль-' : 'аль-');
    i = start+2;
  } else if (start===0 && u[0] && u[0].c==='ل' && /\u0650/.test(u[0].m) && u[1] && u[1].c==='ل' && u[2] && !/[\u064E\u0650\u064F]/.test(u[1].m)){
    if (AR_SUN.includes(u[2].c) && u[2].m.includes('\u0651')) { out += 'ли' + AR_C[u[2].c] + '-'; skipShadda=true; } else out += 'лиль-'; i=2;
  } else i = start;
  for (; i<u.length; i++){
    const {c,m} = u[i]; const next=u[i+1];
    let cons='';
    if (c==='ا' && i===u.length-1 && u[i-1] && u[i-1].c==='و') continue;
    if (c==='ا'){
      if (/[َُِ]/.test(m)) { out += (i===0 ? '' : 'ʾ') + AR_V[m.match(/[َُِ]/)[0]]; continue; }
      if (i===0 && !m){ if (wi>0) continue; out+='и'; continue; }
      if (/а$/.test(out)) { out += '̄'; continue; }
      if (/ан$/.test(out)) continue;
      out += 'а̄'; continue;
    }
    if (c==='آ'){ out += (i===0||/-$/.test(out)?'':'ʾ') + 'а\u0304'; continue; }
    if (c==='ى'){ if (m.includes('ً')) { out+='ан'; continue; } if (/а$/.test(out)) out+='̄'; else out+='а̄'; continue; }
    if ((c==='و'||c==='ي') && !m && i>0){
      if (c==='و' && /у$/.test(out)) { out = out.slice(0,-1)+'ӯ'; continue; }
      if (c==='ي' && /и$/.test(out)) { out = out.slice(0,-1)+'ӣ'; continue; }
      if (c==='و' && i===u.length-1 && u[i-1] && u[i-1].c!=='ا') { out+='ӯ'; continue; }
    }
    if (c==='ة'){
      if (/[\u064B-\u0650]/.test(m)) { const v=m.match(/[\u064B-\u0650]/); out += 'т' + (v?AR_V[v[0]]:''); }
      continue;
    }
    if ((c==='أ'||c==='إ') && i===0) cons=''; else cons = AR_C[c] !== undefined ? AR_C[c] : '';
    if (c==='ء' && i===0) cons='';
    if (m.includes('ّ') && !skipShadda) cons = cons+cons;
    if (skipShadda) skipShadda=false;
    out += cons;
    if (c==='إ' && !/ِ/.test(m)) out += 'и';
    const vm = m.match(/[ً-ِ]/);
    if (vm) { if (vm[0]==='\u064B' && next && (next.c==='ا'||next.c==='ى')) { out+='ан'; i++; } else out += AR_V[vm[0]]; }
    if (m.includes('ٰ')) out += 'а̄';
  }
  return out;
}
function arToRu(src){
  let wi=0;
  return src.split(/([\s،؟!.,?:؛«»\-—]+)/).map(tok=>{
    if (!/[ء-ي]/.test(tok)) return tok.replace(/،/g,',').replace(/؟/g,'?').replace(/؛/g,';');
    return arWordToRu(tok, wi++);
  }).join('');
}
if (typeof module!=='undefined') module.exports={ruToAr,arToRu};

/* ---- extra transliterations for the new courses ---- */
const RU_LAT = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'};
const ACUTE = {a:'á',e:'é',i:'í',o:'ó',u:'ú',y:'ý'};
function ruToLat(src){
  return String(src).split(/([А-Яа-яЁё+]+)/).map((w,k)=>{ if(k%2===0) return w;
    const low=w.toLowerCase(); let out=''; let st=false;
    for (let i=0;i<low.length;i++){ const c=low[i]; if(c==='+'){ st=true; continue; }
      const prev=low.slice(0,i).replace(/\+/g,'').slice(-1); let t=RU_LAT[c]!==undefined?RU_LAT[c]:c;
      if (c==='е' && (i===0 || 'аеёиоуыэюяъь'.includes(prev))) t='ye';
      if (st && t){ const m=t.match(/[aeiouy](?!.*[aeiouy])/); if (m) t=t.slice(0,m.index)+ACUTE[m[0]]+t.slice(m.index+1); st=false; }
      if (c==='ё') t=t.replace('o','ó');
      out+=t; }
    return /^[А-ЯЁ]/.test(w) ? out.charAt(0).toUpperCase()+out.slice(1) : out; }).join('');
}
function arToLat(src){
  let s=arToRu(src);
  const R=[['Алла̄һ','Allāh'],['а̄','ā'],['ӣ','ī'],['ӯ','ū'],['с̱','th'],['з̱','dh'],['с̣','ṣ'],['д̣','ḍ'],['т̣','ṭ'],['з̣','ẓ'],['дж','j'],['ль-','l-'],['ҳ','ḥ'],['х','kh'],['ғ','gh'],['қ','q'],['һ','h'],
    ['а','a'],['и','i'],['у','u'],['б','b'],['т','t'],['д','d'],['р','r'],['з','z'],['с','s'],['ш','sh'],['ф','f'],['к','k'],['л','l'],['м','m'],['н','n'],['в','w'],['й','y'],['А','A']];
  for (const [a,b] of R) s=s.split(a).join(b);
  return s.replace(/̄/g,'');
}
function uzTokens(w){ // split an Uzbek Latin word into letters (digraphs aware)
  const out=[]; const s=w.toLowerCase().replace(/[‘’`']/g,'ʻ');
  for (let i=0;i<s.length;i++){ const two=s.slice(i,i+2);
    if (two==='oʻ'||two==='gʻ'){ out.push(two); i++; continue; }
    if (two==='sh'||two==='ch'){ out.push(two); i++; continue; }
    if (two==='ng' && (i+2>=s.length || !'aeiouo'.includes(s[i+2]))){ out.push('ng'); i++; continue; }
    out.push(s[i]); }
  return out;
}
const UZ_AR = {b:'ب',d:'د',f:'ف',g:'گ',h:'ه',j:'ج',k:'ك',l:'ل',m:'م',n:'ن',p:'پ',q:'ق',r:'ر',s:'س',t:'ت',v:'ڤ',x:'خ',y:'ي',z:'ز','gʻ':'غ',sh:'ش',ch:'تش',ng:'نگ','ʼ':'ع','ʻ':'ع'};
const UZ_CY = {a:'а',b:'б',d:'д',e:'е',f:'ф',g:'г',h:'ҳ',i:'и',j:'ж',k:'к',l:'л',m:'м',n:'н',o:'о',p:'п',q:'қ',r:'р',s:'с',t:'т',u:'у',v:'в',x:'х',y:'й',z:'з','oʻ':'ў','gʻ':'ғ',sh:'ш',ch:'ч',ng:'нг','ʼ':'ъ','ʻ':'ъ'};
const UZ_VOW='aeiouoʻ';
function uzWord(w, map){
  const L=uzTokens(w); let out='';
  for (let i=0;i<L.length;i++){ const c=L[i], prev=L[i-1], init=(i===0);
    const isV = c==='a'||c==='e'||c==='i'||c==='o'||c==='u'||c==='oʻ';
    if (map==='ar'){
      if (isV){ const m={a:'ا',e:'ي',i:'ي',o:'و',u:'و','oʻ':'و'}[c]; out += init ? ({a:'أ',e:'إي',i:'إي',o:'أو',u:'أو','oʻ':'أو'}[c]) : m; }
      else out += UZ_AR[c]!==undefined?UZ_AR[c]:c;
    } else {
      if (c==='y' && L[i+1] && 'aeou'.includes(L[i+1]) && L[i+1]!=='oʻ'){ out += {a:'я',e:'е',o:'ё',u:'ю'}[L[i+1]]; i++; continue; }
      if (c==='e' && (init || (prev && 'aeiou'.includes(prev)))) { out+='э'; continue; }
      out += UZ_CY[c]!==undefined?UZ_CY[c]:c;
    }
  }
  if (map==='ar') out=out.replace(/يي/g,'ي').replace(/وو/g,'و').replace(/اا/g,'ا').replace(/([بتثجحخدذرزسشصضطظعغفقكلمنهپگڤ])\1/g,'$1ّ');
  return /^[A-ZOʻ]/.test(w) && map!=='ar' ? out.charAt(0).toUpperCase()+out.slice(1) : out;
}
function uzToAr(src){ return String(src).split(/([A-Za-zʻʼ‘’'`]+)/).map((t,k)=>k%2?uzWord(t,'ar'):t.replace(/,/g,'،').replace(/\?/g,'؟').replace(/[«»"]/g,'')).join(''); }
function uzToCyr(src){ return String(src).split(/([A-Za-zʻʼ‘’'`]+)/).map((t,k)=>k%2?uzWord(t,'cy'):t).join(''); }
function esWord(w, map){
  const s=w.toLowerCase().normalize('NFD').replace(/[́̈]/g,'').normalize('NFC'); let out='';
  const V='aeiou'; let silentU=false;
  for (let i=0;i<s.length;i++){ const c=s[i], n=s[i+1]||'', p=silentU?'k':(s[i-1]||''); silentU=false; const init=i===0;
    if (map==='ar'){
      if (c==='c'&&n==='h'){ out+='تش'; i++; continue; }
      if (c==='l'&&n==='l'){ out+='ي'; i++; continue; }
      if (c==='r'&&n==='r'){ out+='رّ'; i++; continue; }
      if (c==='q'&&n==='u'){ out+='ك'; i++; continue; }
      if (c==='g'&&n==='u'&&(s[i+2]==='e'||s[i+2]==='i')){ out+='گ'; i++; continue; }
      if (c==='c') { out += (n==='e'||n==='i')?'ث':'ك'; continue; }
      if (c==='g') { out += (n==='e'||n==='i')?'خ':'گ'; continue; }
      if (V.includes(c)) { out += init ? ({a:'أ',e:'إي',i:'إي',o:'أو',u:'أو'}[c]) : ({a:'ا',e:'ي',i:'ي',o:'و',u:'و'}[c]); continue; }
      if (c==='y' && !n) { out+='ي'; continue; }
      out += ({b:'ب',v:'ب',d:'د',f:'ف',h:'',j:'خ',k:'ك',l:'ل',m:'م',n:'ن','ñ':'ني',p:'پ',r:'ر',s:'س',t:'ت',w:'و',x:'كس',y:'ي',z:'ث'})[c] ?? c;
    } else {
      if (c==='c'&&n==='h'){ out+='ч'; i++; continue; }
      if (c==='l'&&n==='l'){ const v=s[i+2]; if(v&&V.includes(v)){ out+=({a:'я',e:'е',i:'и',o:'ё',u:'ю'})[v]; i+=2; } else { out+='й'; i++; } continue; }
      if (c==='r'&&n==='r'){ out+='рр'; i++; continue; }
      if (c==='q'&&n==='u'){ out+='к'; i++; silentU=true; continue; }
      if (c==='g'&&n==='u'&&(s[i+2]==='e'||s[i+2]==='i')){ out+='г'; i++; silentU=true; continue; }
      if (c==='ñ'){ const v=n; if(v&&V.includes(v)){ out+='нь'+({a:'я',e:'е',i:'и',o:'о',u:'ю'})[v]; i++; } else out+='нь'; continue; }
      if (c==='y' && n && V.includes(n)){ out+=({a:'я',e:'е',i:'и',o:'йо',u:'ю'})[n]; i++; continue; }
      if (c==='i' && n && V.includes(n) && p && !V.includes(p)){ out+='ь'+({a:'я',e:'е',o:'о',u:'ю'})[n]; i++; continue; }
      if (c==='c') { out += (n==='e'||n==='i')?'с':'к'; continue; }
      if (c==='g') { out += (n==='e'||n==='i')?'х':'г'; continue; }
      if (c==='e') { out += (init||V.includes(p))?'э':'е'; continue; }
      if (c==='l') { out += (n && V.includes(n))?'л':'ль'; continue; }
      out += ({a:'а',i:'и',o:'о',u:'у',b:'б',v:'б',d:'д',f:'ф',h:'',j:'х',k:'к',m:'м',n:'н',p:'п',r:'р',s:'с',t:'т',w:'у',x:'кс',y:'и',z:'с'})[c] ?? c;
    }
  }
  if (map==='ar') return out.replace(/يي/g,'ي').replace(/وو/g,'و').replace(/([بتثجحخدذرزسشصضطظعغفقكلمنهپگڤ])\1/g,'$1ّ');
  return /^[A-ZÀ-ÝÑ]/.test(w) ? out.charAt(0).toUpperCase()+out.slice(1) : out;
}
function esToAr(src){ return String(src).split(/([A-Za-zÀ-ÿñÑ]+)/).map((t,k)=>k%2?esWord(t,'ar'):t.replace(/,/g,'،').replace(/[¿?]/g,m=>m==='?'?'؟':'').replace(/¡/g,'').replace(/[«»"]/g,'')).join(''); }
function esToCyr(src){ return String(src).split(/([A-Za-zÀ-ÿñÑ]+)/).map((t,k)=>k%2?esWord(t,'cy'):t.replace(/[¿¡]/g,'')).join(''); }
export {ruToAr,arToRu,ruToLat,arToLat,uzToAr,uzToCyr,esToAr,esToCyr};

/* Korean (Hangul) → Revised Romanization, with the common sound changes at syllable joins */
const KO_I = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const KO_V = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
const KO_F = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'];
export function koToLat(src){
  return String(src).split(/([가-힣]+)/).map((w,k)=>{ if (k%2===0) return w;
    const syl=[...w].map(ch=>{ const c=ch.charCodeAt(0)-0xAC00; return {i:Math.floor(c/588), v:Math.floor((c%588)/28), f:c%28}; });
    let out='';
    syl.forEach((s,j)=>{ let ini=KO_I[s.i]; const prev=syl[j-1];
      if (j===0 && s.i===5) ini='r';
      if (prev){ const pf=prev.f;
        if (s.i===11 && pf){ // final consonant moves to the next empty initial
          const DBL={3:['k','s'],5:['n','j'],6:['n',''],9:['l','g'],10:['l','m'],11:['l','b'],12:['l','s'],13:['l','t'],14:['l','p'],15:['l',''],18:['p','s']};
          const carry={1:'g',2:'kk',4:'n',7:'d',8:'r',16:'m',17:'b',19:'s',20:'ss',22:'j',23:'ch',24:'k',25:'t',26:'p',27:'h'}[pf];
          if (DBL[pf]){ out=out.slice(0,out.length-KO_F[pf].length)+DBL[pf][0]; ini=DBL[pf][1]; }
          else if (carry!=null && pf!==21){ out=out.slice(0,out.length-KO_F[pf].length); ini=carry==='h'?'':carry; } }
        else if ((s.i===2||s.i===6) && pf && pf!==8 && pf!==21 && pf!==4 && pf!==16){ // nasalisation before n / m
          const nas={k:'ng',t:'n',p:'m'}[KO_F[pf]]; if (nas){ out=out.slice(0,out.length-KO_F[pf].length)+nas; } }
        else if (s.i===2 && pf===8){ out=out.slice(0,-1)+'l'; ini='l'; }
        else if (s.i===5 && pf===4){ out=out.slice(0,-1)+'l'; ini='l'; }
        else if (s.i===5 && pf && pf!==8){ ini='n'; }
        else if (s.i===5 && pf===8){ ini='l'; } }
      out+=ini+KO_V[s.v]+KO_F[s.f]; });
    return out; }).join('');
}
