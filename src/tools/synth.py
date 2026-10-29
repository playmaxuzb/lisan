import json, re, sys, os, io, wave, base64, subprocess, numpy as np, onnxruntime as ort
from ph import ph
VOICES={'ru':('vits-piper-ru_RU-irina-medium','ru_RU-irina-medium'),'ruB':('vits-piper-ru_RU-dmitri-medium','ru_RU-dmitri-medium'),
        'en':('vits-piper-en_US-lessac-medium','en_US-lessac-medium'),'enB':('vits-piper-en_US-ryan-medium','en_US-ryan-medium'),
        'ar':('vits-piper-ar_JO-kareem-medium','ar_JO-kareem-medium'),'arB':('vits-piper-ar_JO-kareem-medium','ar_JO-kareem-medium')}
ESPEAK={'ru':'ru','en':'en-us','ar':'ar'}
class Voice:
    def __init__(s,key):
        d,n=VOICES[key]; s.cfg=json.load(open(f'{d}/{n}.onnx.json')); s.m=s.cfg['phoneme_id_map']
        so=ort.SessionOptions(); so.intra_op_num_threads=1
        s.sess=ort.InferenceSession(f'{d}/{n}.onnx',so); s.sr=s.cfg['audio']['sample_rate']
        s.inputs=[i.name for i in s.sess.get_inputs()]
    def run(s,phon,length=1.05,noise=0.5,noisew=0.7):
        m={k:(v if isinstance(v,list) else [v]) for k,v in s.m.items()}; ids=list(m['^'])+list(m['_'])
        for ch in phon:
            if ch in m: ids+=m[ch]+m['_']
        ids+=m['$']
        feed={'input':np.array([ids],dtype=np.int64),'input_lengths':np.array([len(ids)],dtype=np.int64),'scales':np.array([noise,length,noisew],dtype=np.float32)}
        if 'sid' in s.inputs: feed['sid']=np.array([0],dtype=np.int64)
        a=s.sess.run(None,feed)[0].squeeze()
        a=a/max(0.01,np.abs(a).max())*0.92
        return (a*32767).astype(np.int16)
RUV='аеёиоуыэюя'
VSET=set('aeiouyɪʌəɐɨɛæɑɔʊɵ')
FULL={'а':'a','о':'o','у':'u','ы':'y','и':'i','э':'ɛ','е':'e','ё':'o','ю':'u','я':'a'}
RED={'а':'ʌ','о':'ʌ','у':'u','ы':'y','и':'ɪ','э':'ɪ','е':'ɪ','ё':'ʌ','ю':'u','я':'ɪ'}
def spans(x):
    out=[]; i=0
    while i<len(x):
        if x[i] in VSET:
            j=i
            while j<len(x) and (x[j] in VSET or x[j]=='ː'): j+=1
            out.append((i,j)); i=j
        else: i+=1
    return out
def ru_word(w):
    lw=w.lower(); letters=[]; si=-1
    for c in lw:
        if c=='+': si=len(letters); continue
        letters.append(c)
    plain=''.join(letters)
    ipa=ph(plain,'ru').strip().replace('"','').replace(' ','')
    vi=[i for i,c in enumerate(letters) if c in RUV]
    if si<0 or si not in vi: return ipa
    t=vi.index(si); ovs=[letters[i] for i in vi]
    K=set(); clean=''
    for ch in ipa:
        if ch=='ˈ': K.add(len(spans(clean)) if not (clean and clean[-1] in VSET) else len(spans(clean))); continue
        if ch=='ˌ': continue
        clean+=ch
    sp=spans(clean)
    if len(sp)!=len(ovs): return ipa
    if K=={t}: return ipa
    out=''; pos=0
    for k,(s,e) in enumerate(sp):
        out+=clean[pos:s]
        if k==t: out+='ˈ'+FULL[ovs[k]]
        elif k in K: out+=RED[ovs[k]]
        else: out+=clean[s:e]
        pos=e
    return out+clean[pos:]
def phon(text,lang):
    if lang=='ru':
        toks=re.findall(r"[\w+́]+(?:-[\w+́]+)*|[^\w\s]",text)
        out=''
        for tk in toks:
            if re.match(r"[\w+]",tk): out+=(' ' if out else '')+ru_word(tk.replace('́',''))
            else: out+={'—':',','«':'','»':'','–':','}.get(tk,tk)
        return out
    t=re.sub(r'\([^)]*\)',' ',text)
    t=t.replace('،',',').replace('؟','?').replace('؛',';').replace('—',',').replace('«','').replace('»','')
    if lang=='ar':
        t=arfix(t)
        t=waqf(t)
    return ph(t,ESPEAK[lang]).strip()
TW='\u0640'
SUN='تثدذرزسشصضطظلن'
def arfix(t):
    t=re.sub('([\u064B-\u0650])\u0651','\u0651\\1',t)           # shadda before vowel
    for a,b in [('هَذ','هَاذ'),('ذَلِك','ذَالِك'),('لَكِنّ','لَاكِنّ'),('لَكِنْ','لَاكِنْ'),('هَكَذَا','هَاكَذَا'),('هَؤُلَاء','هَاؤُلَاء')]:
        t=re.sub('(?<![\u0621-\u064A])((?:[وفبلك][\u064E\u0650])?)'+a, lambda m: m.group(1)+b, t)
    # geminated glides: وّ / يّ -> وْ ـو
    t=re.sub(r'(?<=[^\s])([وي])\u0651', lambda m: m.group(1)+'\u0652'+TW+m.group(1), t)
    # consonantal glide inside a word (carries its own vowel)
    t=re.sub('(?<=[\u0621-\u064A\u064B-\u0652])(?<!'+TW+')([وي])(?=[\u064B-\u0650])', TW+'\\1', t)
    # hamzat al-wasl inside a word
    t=re.sub('(?<=[\u064F\u0650])ا(?![\u064B-\u0652])', '', t)
    t=re.sub('(?<=\u064E)ا(?=[\u0621-\u064A]\u0652|ل(?:\u0652|['+SUN+']\u0651))', '', t)
    t=re.sub('(?<=[\u064E\u064F\u0650])ل(?=['+SUN+']\u0651)', '', t)   # assimilated article lam after prefix
    return t
HAR='\u064B\u064C\u064D\u064E\u064F\u0650\u0652'
def waqf(t):
    # pausal form for a word that ends a phrase
    def fix(w):
        w=re.sub('\u064B(?=[اى]$)','\u064E',w)
        w=re.sub('['+HAR+']+$','',w)
        if w.endswith('ة'): w=w[:-1]+'ه'
        if w and w[-1] not in 'اىآ': w+='\u0652'
        return w
    return re.sub(r'([\u0621-\u0652\u0670]+)(?=\s*(?:[,.!?;:]|$))', lambda m: fix(m.group(1)), t)
def mp3(pcm,sr):
    buf=io.BytesIO(); w=wave.open(buf,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    pad=np.zeros(int(sr*0.08),dtype=np.int16); w.writeframes(np.concatenate([pad,pcm,pad]).tobytes()); w.close()
    r=subprocess.run(['ffmpeg','-loglevel','error','-f','wav','-i','pipe:0','-ac','1','-ar','22050','-b:a','32k','-f','mp3','pipe:1'],input=buf.getvalue(),capture_output=True)
    return r.stdout
V={}
CACHE={}
def gen(item, lang):
    vk=lang+('B' if item['alt'] else '')
    if vk not in V: V[vk]=Voice(vk)
    p=phon(item['src'],lang); ck=(vk,p)
    if ck in CACHE: return CACHE[ck]
    pcm=V[vk].run(p, noise=(0.5 if not item['alt'] else 0.55) if lang!='ar' else 0.4, length=1.05 if lang!='ar' else 1.12, noisew=0.7 if lang!='ar' else 0.6)
    b=base64.b64encode(mp3(pcm,V[vk].sr)).decode(); CACHE[ck]=b; return b
def work(key):
    items=json.load(open('items2.json'))[key]; lang=key[:2]; fn=f'packs2/{key}.json'
    old=json.load(open(fn)) if os.path.exists(fn) else {}
    pack={}; err=0; new=0
    for it in items:
        if it['k'] in old: pack[it['k']]=old[it['k']]; continue
        new+=1
        try: pack[it['k']]=gen(it,lang)
        except Exception as e: err+=1; print('ERR',key,it['src'],e,flush=True)
    json.dump(pack,open(fn+'.tmp','w'),ensure_ascii=False,separators=(',',':')); os.rename(fn+'.tmp',fn)
    return f"{key} {len(pack)} new={new} {os.path.getsize(fn)//1024}KB err={err}"
if __name__=='__main__':
    import multiprocessing as mp
    os.makedirs('packs2',exist_ok=True)
    items=json.load(open('items2.json'))
    keys=sorted(items, key=lambda k:-len(items[k]))
    with mp.Pool(2) as pool:
        for r in pool.imap_unordered(work, keys): print(r, flush=True)
