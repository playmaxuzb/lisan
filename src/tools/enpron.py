import json,re,sys,subprocess
sys.path.insert(0,'/home/claude/tts')
from ph import ph
# collect english words from final EN bank
js=open('/home/claude/lisan/data_all.js').read()
en=json.loads(re.search(r'const EN = (\{.*?\});\n',js,re.S).group(1))
text=json.dumps(en,ensure_ascii=False)
# only latin-letter words
words=set(w.lower().strip("'") for w in re.findall(r"[A-Za-z]+(?:'[A-Za-z]+)?",text))
words={w for w in words if w}
U2=['tʃ','dʒ','eɪ','aɪ','ɔɪ','aʊ','oʊ','iː','uː','ɑː','ɔː','ɜː','ɑɹ']
VOW={'iː','ɪ','eɪ','ɛ','æ','ʌ','ə','ɐ','ɑː','ɑ','ɔː','ɔ','oʊ','ʊ','uː','aɪ','aʊ','ɔɪ','ɜː','ɚ','ɝ','ᵻ','i','u','a','e','o','ɒ','ɜ'}
def units(ipa):
    ipa=ipa.replace('ː','ː').replace('ˌ','').replace('-','')
    out=[];i=0;st=False
    while i<len(ipa):
        c=ipa[i]
        if c=='ˈ': st=True; i+=1; continue
        if c in ' ̃': i+=1; continue
        two=ipa[i:i+2]
        if two in U2 and two!='ɑɹ': u=two; i+=2
        else: u=c; i+=1
        out.append((u,st and u in VOW))
        if u in VOW: st=False
    return out
ARC={'p':'پ','b':'ب','t':'ت','d':'د','k':'ك','ɡ':'گ','g':'گ','f':'ف','v':'ڤ','θ':'ث','ð':'ذ','s':'س','z':'ز','ʃ':'ش','ʒ':'ج','tʃ':'تش','dʒ':'ج','h':'ه','m':'م','n':'ن','ŋ':'نگ','l':'ل','ɹ':'ر','r':'ر','j':'ي','w':'و','ɾ':'ت','ʔ':'ء','x':'خ','ɬ':'ل'}
ARV={'iː':'ِي','i':'ِي','ɪ':'ِ','ᵻ':'ِ','eɪ':'َيْ','e':'ِ','ɛ':'ِ','æ':'َا','a':'َا','ʌ':'َ','ə':'َ','ɐ':'َ','ɑː':'َا','ɑ':'َا','ɒ':'و','ɔː':'ُو','ɔ':'ُو','oʊ':'ُو','o':'ُو','ʊ':'ُ','u':'ُو','uː':'ُو','aɪ':'َاي','aʊ':'َاو','ɔɪ':'ُوي','ɜː':'ِير','ɜ':'ِير','ɚ':'َر','ɝ':'ِير'}
ARI={'iː':'إِي','i':'إِي','ɪ':'إِ','ᵻ':'إِ','eɪ':'إِيْ','e':'إِ','ɛ':'إِ','æ':'آ','a':'آ','ʌ':'أَ','ə':'أَ','ɐ':'أَ','ɑː':'آ','ɑ':'آ','ɒ':'أو','ɔː':'أو','ɔ':'أو','oʊ':'أو','o':'أو','ʊ':'أُ','u':'أو','uː':'أو','aɪ':'آي','aʊ':'آو','ɔɪ':'أوي','ɜː':'إِير','ɜ':'إِير','ɚ':'أَر','ɝ':'إِير'}
def to_ar(ipa):
    U=units(ipa); out=''
    for k,(u,s) in enumerate(U):
        if u in VOW:
            if not out or not re.search('[\u0621-\u064A\u0671-\u06D3]$',out):
                out+= ARI[u] if not out else 'ئ'+ARV[u][0:] if ARV[u][0] in 'َُِ' else ARV[u]
            else: out+=ARV[u]
            if u in ('ɚ',) and k+1<len(U) and U[k+1][0]=='ɹ': pass
        else:
            if u=='ɹ' and out.endswith('ر'): continue
            if u=='ɹ' and k>0 and U[k-1][0] in ('ɚ','ɝ','ɜː'): continue
            out+=ARC.get(u,'')
    return out
CYC={'p':'п','b':'б','t':'т','d':'д','k':'к','ɡ':'г','g':'г','f':'ф','v':'в','θ':'с','ð':'з','s':'с','z':'з','ʃ':'ш','ʒ':'ж','tʃ':'ч','dʒ':'дж','h':'х','m':'м','n':'н','ŋ':'нг','l':'л','ɹ':'р','r':'р','j':'й','w':'у','ɾ':'т','ʔ':'','x':'х','ɬ':'л'}
CYV={'iː':'и','i':'и','ɪ':'и','ᵻ':'и','eɪ':'эй','e':'э','ɛ':'э','æ':'э','a':'а','ʌ':'а','ə':'э','ɐ':'э','ɑː':'а','ɑ':'а','ɒ':'о','ɔː':'о','ɔ':'о','oʊ':'оу','o':'о','ʊ':'у','u':'у','uː':'у','aɪ':'ай','aʊ':'ау','ɔɪ':'ой','ɜː':'ёр','ɜ':'ёр','ɚ':'эр','ɝ':'ёр'}
JV={'uː':'ю','u':'ю','ʊ':'ю','ɑː':'я','ɑ':'я','æ':'я','ʌ':'я','ɛ':'е','e':'е','ɔː':'ё','ɔ':'ё','ɜː':'ё','ə':'е','iː':'и','ɪ':'и'}
def to_ru(ipa):
    U=units(ipa); out=''; nv=sum(1 for u,_ in U if u in VOW); skip=False
    for k,(u,s) in enumerate(U):
        if skip: skip=False; continue
        if u=='j' and k+1<len(U) and U[k+1][0] in JV:
            v=JV[U[k+1][0]]
            if out and out[-1] not in 'аэиоуеёюяй́':
                v = ('ь'+v) if v in 'юяеё' else v
            out+=v
            if U[k+1][1] and nv>1: out+='́'
            skip=True; continue
        if u in VOW:
            v=CYV[u]
            if nv>1 and s:
                v=v[0]+'́'+v[1:]
            out+=v
        else:
            if u=='ɹ' and k>0 and U[k-1][0] in ('ɚ','ɝ'): continue
            if u=='w' and k+1<len(U) and U[k+1][0] in ('ʊ','uː','u'): out+='в'; continue
            out+=CYC.get(u,'')
    return out
res={}
for w in sorted(words):
    try: ipa=ph(w,'en-us').strip()
    except Exception: continue
    ipa=ipa.split(' ')
    res[w]=[ ' '.join(to_ar(x) for x in ipa if x), ' '.join(to_ru(x) for x in ipa if x) ]
json.dump(res,open('/home/claude/lisan/enpr.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(res))
for w in ['water','cat','thought','the','beautiful','question','university','orange','yesterday','pleasure','computer','hour','girl','bird','house','go','my','day','music','yellow','children','about','apple','eat','egg','idea','i','umbrella','ice','early','out']:
    if w in res: print(w,res[w])
