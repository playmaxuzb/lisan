import json,re,sys
sys.path.insert(0,'/home/claude/tts')
from ph import ph
M=json.load(open('/home/claude/tools/master.json'))
lv_only=sys.argv[1:] or list(M)
V='аеёиоуыэюя'; IV='aeiouɪʌəɐɨyɛʊæɑɔɵ'
def L(s): return [x.strip() for x in (s or '').split('\n') if x.strip()]
texts=[]
for lv in lv_only:
    D=M[lv]
    for t in D.get('vocab',[]):
        for l in L(t['w']): texts.append(l.split('|')[1])
    for l in L(D.get('sentences')): texts.append(l.split('|')[0])
    for r in D.get('readings',[]):
        texts.append(r['t'].split('|')[0]); texts+= [l.split('|')[0] for l in L(r['s'])]
    for d in D.get('dialogues',[]): texts+=[l.split('|')[1] for l in L(d['l'])]
words=set()
for t in texts:
    for w in re.findall(r"[А-Яа-яЁё+]+",t): words.add(w)
nost=[];badplus=[];mism=[]
cache={}
for w in sorted(words):
    lw=w.lower(); plain=lw.replace('+','')
    nv=sum(c in V for c in plain)
    if lw.count('+')>1 or re.search(r"\+[^аеёиоуыэюя]",lw) or lw.endswith('+'): badplus.append(w); continue
    if nv>1 and '+' not in lw and 'ё' not in lw: nostr=nost.append(w); continue
    if '+' not in lw: continue
    letters=[];si=-1
    for c in lw:
        if c=='+': si=len(letters); continue
        letters.append(c)
    vi=[i for i,c in enumerate(letters) if c in V]
    my=vi.index(si)
    try: p=ph(plain,'ru').strip()
    except Exception: continue
    n=0; es=-1; prev=False
    for ch in re.sub(r'[ʲː"\-]','',p):
        if ch=='ˈ': es=n; continue
        if ch in IV:
            if not prev: n+=1
            prev=True
        else: prev=False
    if es!=my: mism.append(f"{w} [{p}]")
print('NO STRESS:',' '.join(sorted(set(nost))))
print('BAD PLUS:',' '.join(badplus))
ok=set(open('/home/claude/tools/ru_ok.txt').read().split())
mism=[m for m in mism if m.split(' ')[0] not in ok]
print('MISMATCH',len(mism)); print('\n'.join(mism))
