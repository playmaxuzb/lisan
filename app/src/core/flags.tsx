import React from 'react';
const star = (cx: number, cy: number, r: number, rot = 0) => {
  const p: string[] = [];
  for (let i = 0; i < 10; i++) { const a = (Math.PI / 5) * i - Math.PI / 2 + rot; const rr = i % 2 ? r * 0.4 : r; p.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`); }
  return p.join(' ');
};
const SVG: Record<string, JSX.Element> = {
  jo: <svg viewBox="0 0 28 14"><rect width="28" height="14" fill="#fff"/><rect width="28" height="4.67" fill="#111"/><rect y="9.33" width="28" height="4.67" fill="#007a3d"/><path d="M0 0L14 7L0 14Z" fill="#ce1126"/><polygon fill="#fff" points={star(4.6, 7, 1.15)}/></svg>,
  ru: <svg viewBox="0 0 27 18"><rect width="27" height="6" fill="#fff"/><rect y="6" width="27" height="6" fill="#0039a6"/><rect y="12" width="27" height="6" fill="#d52b1e"/></svg>,
  us: <svg viewBox="0 0 38 20"><rect width="38" height="20" fill="#fff"/><g fill="#b22234">{[0,2,4,6,8,10,12].map(i => <rect key={i} y={i*20/13} width="38" height={20/13}/>)}</g><rect width="15.2" height="10.77" fill="#3c3b6e"/><g fill="#fff">{[1.3,3.9,6.5,9.1,11.7,13.9].flatMap((x,i)=>[1.2,3.4,5.5,7.6,9.6].map((y,j)=>(i+j)%2===0?<circle key={i+'-'+j} cx={x} cy={y} r=".5"/>:null))}</g></svg>,
  uz: <svg viewBox="0 0 30 15"><rect width="30" height="15" fill="#1eb53a"/><rect width="30" height="10" fill="#ce1126"/><rect width="30" height="9.8" fill="#fff"/><rect width="30" height="5.2" fill="#ce1126"/><rect width="30" height="5" fill="#0099b5"/><circle cx="4.2" cy="2.5" r="1.75" fill="#fff"/><circle cx="4.85" cy="2.5" r="1.6" fill="#0099b5"/><g fill="#fff">{[[7.2,1.1],[8.6,1.1],[10,1.1],[7.2,2.5],[8.6,2.5],[10,2.5],[11.4,2.5],[5.8,3.9],[7.2,3.9],[8.6,3.9],[10,3.9],[11.4,3.9]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r=".42"/>)}</g></svg>,
  es: <svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/></svg>,
  cn: <svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910"/><polygon fill="#ffde00" points={star(5,5,3)}/>{[[10,2,0.3],[12,4,0.7],[12,7,0],[10,9,0.4]].map(([x,y,r],i)=><polygon key={i} fill="#ffde00" points={star(x,y,1,r)}/>)}</svg>,
  de: <svg viewBox="0 0 30 18"><rect width="30" height="6" fill="#000"/><rect y="6" width="30" height="6" fill="#dd0000"/><rect y="12" width="30" height="6" fill="#ffce00"/></svg>,
  fr: <svg viewBox="0 0 30 20"><rect width="10" height="20" fill="#0055a4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ef4135"/></svg>,
  it: <svg viewBox="0 0 30 20"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/></svg>,
  tr: <svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#e30a17"/><circle cx="10.5" cy="10" r="5" fill="#fff"/><circle cx="11.75" cy="10" r="4" fill="#e30a17"/><polygon fill="#fff" points={star(16.8,10,2.2,-Math.PI/10)}/></svg>,
  jp: <svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/></svg>,
  kr: <svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><g transform="translate(15 10)"><circle r="5" fill="#cd2e3a"/><path d="M-5 0a5 5 0 0 0 10 0a2.5 2.5 0 0 0-5 0a2.5 2.5 0 0 1-5 0" fill="#0047a0" transform="rotate(33.7)"/></g><g stroke="#000" strokeWidth="1"><path d="M5.2 3.2l2.2-1.5M6 4.4l2.2-1.5M6.8 5.6l2.2-1.5"/><path d="M24.8 16.8l-2.2 1.5M24 15.6l-2.2 1.5M23.2 14.4l-2.2 1.5"/><path d="M5.2 16.8l2.2 1.5M6 15.6l2.2 1.5M6.8 14.4l2.2 1.5"/><path d="M24.8 3.2l-2.2-1.5M24 4.4l-2.2-1.5M23.2 5.6l-2.2-1.5"/></g></svg>,
};export const FLAG_OF: Record<string,string> = { ar:'jo', ru:'ru', en:'us', uz:'uz', es:'es', zh:'cn', de:'de', fr:'fr', it:'it', tr:'tr', ja:'jp', ko:'kr' };
export function Flag({ lang, size = 'md', className = '' }: { lang: string; size?: 'sm'|'md'|'lg'|'xl'; className?: string }) {
  const s = { sm: 'w-6 h-4 rounded-[3px]', md: 'w-10 h-[27px] rounded-[5px]', lg: 'w-16 h-11 rounded-md', xl: 'w-20 h-[54px] rounded-lg' }[size];
  return <span aria-hidden="true" className={`inline-flex shrink-0 overflow-hidden ring-1 ring-black/10 shadow-sm [&>svg]:w-full [&>svg]:h-full ${s} ${className}`}>{SVG[FLAG_OF[lang]]}</span>;
}
