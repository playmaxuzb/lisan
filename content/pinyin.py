# Adds bank.py = {text_without_spaces: "pīn yīn"} to the Chinese bank
import json,sys,re
from pypinyin import pinyin, Style
fn=sys.argv[1]; B=json.load(open(fn))
CJK=re.compile(r'[一-鿿]')
OVR={'长':'cháng','大夫':'dàifu','头发':'tóufa','空':'kòng','只':'zhī','得':'de','地':'de','一会儿':'yíhuìr','哪儿':'nǎr','这儿':'zhèr','那儿':'nàr','一点儿':'yìdiǎnr','好玩':'hǎowán','便宜':'piányi','东西':'dōngxi','衣服':'yīfu','朋友':'péngyou','喜欢':'xǐhuan','谢谢':'xièxie','妈妈':'māma','爸爸':'bàba','哥哥':'gēge','姐姐':'jiějie','弟弟':'dìdi','妹妹':'mèimei','爷爷':'yéye','奶奶':'nǎinai','明白':'míngbai','认识':'rènshi','知道':'zhīdào','什么':'shénme','怎么':'zěnme','这么':'zhème','多么':'duōme','时候':'shíhou','先生':'xiānsheng','名字':'míngzi','舒服':'shūfu','漂亮':'piàoliang','清楚':'qīngchu','事情':'shìqing','麻烦':'máfan','休息':'xiūxi','意思':'yìsi','学生':'xuésheng','窗户':'chuānghu','桌子':'zhuōzi','椅子':'yǐzi','孩子':'háizi','房子':'fángzi','觉得':'juéde'}
def py_token(t, prev=None):
    if not CJK.search(t): return t
    if t=='得': return 'děi' if prev in ('我','我们','你','你们','他','她','他们','咱们','大家') else ('dé' if prev in ('考试','获','取') else 'de')
    if t=='只' and prev and prev not in ('一','两','三','四','五','几','这','那','每'): return 'zhǐ'
    if t=='空' and prev not in ('有','没','没有'): return 'kōng'
    if t in OVR: return OVR[t]
    return ''.join(x[0] for x in pinyin(t, style=Style.TONE, heteronym=False, neutral_tone_with_five=False))
def py_text(s):
    toks=s.split()
    out=[]
    prev=None
    for t in toks:
        p=py_token(t,prev); prev=t
        if not CJK.search(t):
            if out: out[-1]=out[-1]+t.replace('，',',').replace('。','.').replace('？','?').replace('！','!').replace('、',',').replace('：',':').replace('；',';')
            else: out.append(t)
        else: out.append(p)
    return ' '.join(out).replace(' “','“').replace('“ ','“')
PY={}
def add(s):
    s=s.strip()
    if not s or not CJK.search(s): return
    PY[s.replace(' ','')]=py_text(s)
    for t in s.split():
        if CJK.search(t): PY[t]=py_token(t)
for lv,D in B['levels'].items():
    for th in D['vocab']:
        for l in th['w'].split('\n'): add(l.split('|')[1])
    for l in D['sentences'].split('\n'): add(l.split('|')[0])
    for r in D['readings']:
        add(r['title']); [add(l.split('|')[0]) for l in r['sents'].split('\n')]
    for d in D['dialogues']:
        [add(l.split('|')[1]) for l in d['lines'].split('\n')]
    for g in D['grammar']:
        [add(l.split('|')[0]) for l in g['ex'].split('\n')]
        for b in g['body'].values():
            for m in re.findall(r'\[\[(.+?)\]\]',b): add(m)
        for q in g['quiz']:
            for o in q[1:]: add(o)
for a in B['alphabet']: add(a['ex']); add(a['nameSay'])
for l in B['common'].split('\n'): add(l.split('|')[0])
B['py']=PY
json.dump(B,open(fn,'w'),ensure_ascii=False,separators=(',',':'))
print('pinyin entries',len(PY)); 
for k in list(PY)[:3]+['我是学生。','“书”用中文怎么说？','长','银行']: print(k,'->',PY.get(k))
