// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { disp } from '@/core/engine';
import { sendReport } from '@/core/report';
import { useApp, Sheet, I, Tgt, PlayPair } from '@/ui/kit';

export function ReportSheet({ data, onClose }){
  const { u, toast } = useApp(); const x = u.x; const [type, setType] = useState('audio'); const [note, setNote] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => { if (data){ setType(data.kind === 's' || data.kind === 'd' ? 'trans' : 'audio'); setNote(''); } }, [data]);
  const send = () => { sendReport({ tr: data.tr || '', L: data.L || '', kind: data.kind || '', id: data.id || '', src: data.src || '', m: data.m || '', tl: data.tl || '', type, note: note.trim() }); toast(x.rThanks); onClose(); };
  const types = [['audio', x.rAudio], ['trans', x.rTrans], ['spell', x.rSpell], ...(data && data.e ? [['pic', x.rPic]] : []), ['other', x.rOther]];
  return <Sheet open={!!data} onClose={onClose} dir={u.dir}>{data && <div className="flex flex-col gap-4" data-report-sheet>
    <div className="flex items-center justify-between"><h2 className="text-xl font-extrabold text-ink inline-flex items-center gap-2"><I.flag className="w-5 h-5 text-[#D9363E]"/>{x.reportT}</h2><button className="iconbtn" onClick={onClose} aria-label={u.close}><I.x/></button></div>
    <div className="rounded-2xl bg-paper border-[1.5px] border-line p-3.5 flex items-center gap-3">
      {data.e && <span className="text-3xl" aria-hidden="true">{data.e}</span>}
      <div className="flex-1 min-w-0"><Tgt tl={data.tl} className="block text-lg font-bold text-ink">{disp(data.src)}</Tgt>{data.m && <div className="text-sm text-ink-2" dir="auto">{data.m}</div>}</div>
      {data.tl && <PlayPair say={data.say || data.src} tl={data.tl} u={u}/>}
    </div>
    <div className="flex flex-wrap gap-2">{types.map(([k, l]) => <button key={k} type="button" onClick={() => setType(k)} className={`chip ${type === k ? 'on' : ''}`} data-rtype={k}>{l}</button>)}</div>
    <label className="block"><span className="text-sm font-semibold text-ink">{x.rNote}</span>
      <textarea className="field mt-1.5 !h-24 py-2.5" dir="auto" maxLength={600} value={note} placeholder={x.rNotePh} onChange={(e) => setNote(e.target.value)}/></label>
    <div className="flex gap-2"><button className="btn" disabled={busy} onClick={send} data-rsend>{x.rSend}</button><button className="btn ghost" onClick={onClose}>{u.close}</button></div>
  </div>}</Sheet>;
}
