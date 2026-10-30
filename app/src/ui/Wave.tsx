// @ts-nocheck
import React, { Suspense, lazy } from 'react';
const WaveGrid = lazy(() => import('@/components/ui/wave-grid-background').then((m) => ({ default: m.WaveGridBackground })));
/* Lazy wrapper so three.js loads in its own chunk; a soft gradient shows meanwhile. */
export default function Wave(props){
  return <Suspense fallback={<div className="h-full w-full bg-[radial-gradient(ellipse_at_center,#ffffff_0%,#DCE8FF_70%,#C2D6FF_100%)]"/>}><WaveGrid {...props}/></Suspense>;
}
