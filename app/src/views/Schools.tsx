// @ts-nocheck
import React, { useState } from 'react';
import { sendPartner } from '@/core/report';
import { Auth } from '@/core/auth';
import { useApp, I } from '@/ui/kit';
import { TopBar } from '@/views/Home';
import { Back } from '@/views/Pro';

export default function Schools(){
  const { u, toast } = useApp(); const x = u.x; const [f, setF] = useState({ org: '', city: '', contact: (Auth.user && Auth.user.email) || '', students: '', msg: '' }); const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false); const [code, setCode] = useState('');
  const send = async (e) => { e.preventDefault(); if (!f.org.trim() || !f.contact.trim()) return; setBusy(true); await sendPartner(f); setBusy(false); setSent(true); toast(x.reqThanks); };
  const F = (k, label, type = 'text') => <label className="block"><span className="text-sm font-semibold text-ink">{label}</span><input className="field mt-1" type={type} dir="auto" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} data-f={k}/></label>;
  return <div><TopBar/>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 pb-16">
      <Back label={u.home}/>
      <div className="mt-4 flex items-center gap-3"><span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-500 text-white"><I.school className="w-6 h-6"/></span><div><h1 className="text-2xl sm:text-3xl font-extrabold text-ink">{x.schools}</h1><p className="text-ink-2">{x.schoolsD}</p></div></div>
      <div className="mt-5 card p-5 sm:p-6 bg-gradient-to-br from-white to-brand-50"><p className="text-ink leading-relaxed max-w-3xl">{x.schoolsSoon}</p></div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2 items-start">
        <div className="card p-5 sm:p-6"><h2 className="font-extrabold text-ink text-lg mb-1">{x.studentT}</h2>
          <div className="mt-3 rounded-2xl border-[1.5px] border-dashed border-line p-5 text-center text-ink-3" data-classes>{x.noClasses}</div>
          <div className="mt-4 flex gap-2"><input className="field" placeholder={x.joinCode} value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} dir="ltr" maxLength={10}/><button className="btn" onClick={() => toast(x.codeSoon)} disabled={!code.trim()}>{x.join}</button></div>
          <p className="mt-2 text-xs text-ink-3">{x.codeSoon}</p>
        </div>
        <form className="card p-5 sm:p-6 flex flex-col gap-3" onSubmit={send} data-partner-form><h2 className="font-extrabold text-ink text-lg">{x.teacherT} · {x.partner}</h2>
          {sent ? <div className="rounded-2xl bg-[#E8F7EF] border-[1.5px] border-[#9ED9BC] text-[#0E6B42] p-4">{x.reqThanks}</div> : <>
            {F('org', x.org)}{F('city', x.city)}{F('contact', x.contact)}{F('students', x.students, 'number')}
            <label className="block"><span className="text-sm font-semibold text-ink">{x.msg}</span><textarea className="field mt-1 !h-24 py-2.5" dir="auto" value={f.msg} maxLength={400} onChange={(e) => setF({ ...f, msg: e.target.value })}/></label>
            <button className="btn self-start" disabled={busy || !f.org.trim() || !f.contact.trim()}>{x.sendReq}</button></>}
        </form>
      </div>
    </main></div>;
}
