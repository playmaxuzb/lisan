// @ts-nocheck
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ElasticStack } from '@/components/ui/elastic-stack';
import { PRESETS, fileToDataURL } from '@/core/avatars';
import { I } from '@/ui/kit';

/* Preset avatars in two elastic stacks (they spread on hover / tap), plus "upload your own photo". */
export function AvatarPicker({ u, avatar, photo, onAvatar, onPhoto }){
  const fileRef = useRef(null);
  const rows = [PRESETS.slice(0, 6), PRESETS.slice(6, 12)];
  const current = photo || (PRESETS.find((p) => p.id === avatar) || PRESETS[0]).src;
  const clickStack = (row) => (e) => { const el = e.target.closest('.isolate'); if (!el) return; const i = Array.from(el.parentElement.children).indexOf(el); const item = rows[row][i]; if (item) onAvatar(item.id); };
  const upload = async (e) => { const f = e.target.files && e.target.files[0]; if (!f) return; try { onPhoto(await fileToDataURL(f, 320, 320, 0.86)); } catch (err){} e.target.value = ''; };
  return <div className="mt-3 rounded-2xl border-[1.5px] border-line bg-paper p-4">
    <div className="flex items-center gap-4">
      <motion.img key={current} src={current} alt="" initial={{ scale: .7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-500/80 ring-offset-2 bg-white"/>
      <div className="flex-1 min-w-0">
        <button type="button" onClick={() => fileRef.current.click()} className="btn ghost sm"><I.camera className="w-4 h-4"/>{u.uploadPhoto}</button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={upload}/>
      </div>
    </div>
    <div className="mt-1 flex flex-col items-center" dir="ltr">
      {rows.map((r, ri) => <div key={ri} onClick={clickStack(ri)} className="relative">
        <ElasticStack items={r.map((p) => ({ id: p.id, image: p.src, name: p.id }))} itemSize={58} overlap={20} pushForce={12} className="py-3"/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-[32px]">
          {r.map((p) => <span key={p.id} className={`h-1.5 w-1.5 rounded-full ${!photo && avatar === p.id ? 'bg-brand-500' : 'bg-transparent'}`}/>)}
        </div>
      </div>)}
    </div>
  </div>;
}
