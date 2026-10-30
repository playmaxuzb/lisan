// @ts-nocheck
export const PRESETS = Array.from({length:12},(_,i)=>({ id:'p'+i, src:'avatars/p'+i+'.svg' }));
export const COVERS = [
  'linear-gradient(120deg,#2A5EEB 0%,#6E98FF 55%,#C2D6FF 100%)',
  'linear-gradient(135deg,#0F1B3D 0%,#1F4AC4 60%,#3F76FF 100%)',
  'linear-gradient(120deg,#3F76FF 0%,#7FC4FF 100%)',
  'radial-gradient(circle at 20% 30%,#9DBBFF 0,transparent 45%),radial-gradient(circle at 80% 70%,#6E98FF 0,transparent 50%),#DCE8FF',
  'linear-gradient(120deg,#1C3E9C,#2A5EEB 40%,#38BDF8)',
  'repeating-linear-gradient(135deg,#EEF4FF 0 14px,#DCE8FF 14px 28px)'
];
export function avatarSrc(p){ if (!p) return PRESETS[0].src; if (p.photo) return p.photo; const a=PRESETS.find(x=>x.id===p.avatar); return a?a.src:PRESETS[0].src; }
export function fileToDataURL(file, maxW, maxH, q=0.85){ return new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=()=>{ const img=new Image(); img.onload=()=>{
  const s=Math.min(1, maxW/img.width, maxH/img.height); const c=document.createElement('canvas'); c.width=Math.round(img.width*s); c.height=Math.round(img.height*s);
  const g=c.getContext('2d'); g.drawImage(img,0,0,c.width,c.height); res(c.toDataURL('image/jpeg',q)); }; img.onerror=rej; img.src=fr.result; }; fr.onerror=rej; fr.readAsDataURL(file); }); }
