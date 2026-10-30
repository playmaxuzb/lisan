import re
AP="ʻ‘'`ʼ’"
def norm(t):
    t=t.replace('o‘','oʻ').replace('g‘','gʻ').replace("o'","oʻ").replace("g'","gʻ").replace('O‘','Oʻ').replace('G‘','Gʻ').replace("O'","Oʻ").replace("G'","Gʻ")
    t=re.sub("(?<=[a-zA-Z])['’‘`](?=[a-zA-Z])","ʼ",t)
    return t
V='aeiouɔoʊ'
def word_ipa(w):
    w=w.lower(); out=[]; i=0
    while i<len(w):
        c=w[i]; n=w[i+1] if i+1<len(w) else ''
        if c=='o' and n=='ʻ': out.append('o'); i+=2; continue
        if c=='g' and n=='ʻ': out.append('ʁ'); i+=2; continue
        if c=='s' and n=='h': out.append('ʃ'); i+=2; continue
        if c=='c' and n=='h': out.append('tʃ'); i+=2; continue
        if c=='n' and n=='g' and (i+2>=len(w) or w[i+2] not in 'aeiouʻ'): out.append('ŋ'); i+=2; continue
        m={'a':'a','b':'b','d':'d','e':'e','f':'f','g':'ɡ','h':'h','i':'i','j':'dʒ','k':'k','l':'l','m':'m','n':'n','o':'ɔ','p':'p','q':'q','r':'r','s':'s','t':'t','u':'u','v':'v','x':'χ','y':'j','z':'z','ʼ':'ʔ','c':'s','w':'w'}
        out.append(m.get(c,'')); i+=1
    # stress last vowel
    idx=[k for k,u in enumerate(out) if u and u[0] in 'aeiouɔ']
    if idx: out[idx[-1]]='ˈ'+out[idx[-1]]
    return ''.join(out)
def to_ipa(t):
    t=norm(t)
    return re.sub(r"[A-Za-zʻʼ]+", lambda m: word_ipa(m.group(0)), t)
def to_tr(t):
    t=norm(t).lower()
    for a,b in [('oʻ','o'),('gʻ','ğ'),('sh','ş'),('ch','ç'),('j','c'),('x','h'),('q','k'),('ʼ',"'")]: t=t.replace(a,b)
    return t
def to_kk(t):
    t=norm(t).lower()
    for a,b in [('oʻ','ө'),('gʻ','ғ'),('sh','ш'),('ch','ч'),('ng','ң'),('ya','я'),('yo','ё'),('yu','ю')]: t=t.replace(a,b)
    m={'a':'а','b':'б','d':'д','e':'е','f':'ф','g':'г','h':'һ','i':'і','j':'дж','k':'к','l':'л','m':'м','n':'н','o':'о','p':'п','q':'қ','r':'р','s':'с','t':'т','u':'у','v':'в','x':'х','y':'й','z':'з','ʼ':''}
    return ''.join(m.get(c,c) for c in t)
