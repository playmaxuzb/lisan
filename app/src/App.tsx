// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Store, loadCourses, loadRef, Speech, setToast, setNoAudioMsg, primeAudio, COURSES } from '@/core/engine';
import { initAuth } from '@/core/auth';
import { detectLang } from '@/core/strings_app';
import { Ctx, S, Toasts, useStore } from '@/ui/kit';
import Onboarding from '@/views/Onboarding';
import Home from '@/views/Home';
import Track from '@/views/Track';
import LevelView from '@/views/Level';
import Profile from '@/views/Profile';
import { WordSheet, AudioSheet } from '@/views/Sheets';

function parseHash(){ const h = decodeURIComponent(location.hash.replace(/^#\/?/, '')); const p = h.split('/').filter(Boolean); return p; }

export default function App(){
  const store = useStore();
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState(parseHash());
  const [toasts, setToasts] = useState([]);
  const [word, setWord] = useState(null);
  const [audioOpen, setAudioOpen] = useState(false);
  const tid = useRef(0);

  useEffect(() => { Store.load(); Promise.all([loadCourses(), loadRef(), initAuth()]).then(() => setReady(true)); Speech.init();
    const f = () => { setRoute(parseHash()); Speech.stop(); window.scrollTo({ top: 0 }); }; addEventListener('hashchange', f);
    const prime = () => { primeAudio(); removeEventListener('pointerdown', prime); }; addEventListener('pointerdown', prime);
    return () => removeEventListener('hashchange', f); }, []);

  const profile = Store.profile();
  const lang = (profile && profile.native) || Store.meta.pendingNative || detectLang();
  const u = useMemo(() => S(lang), [lang]);
  const toast = (msg) => { const id = ++tid.current; setToasts((l) => [...l, { id, msg }]); setTimeout(() => setToasts((l) => l.filter((x) => x.id !== id)), 2600); };
  useEffect(() => { setToast(toast); setNoAudioMsg(u.noAudio); document.documentElement.lang = lang; document.documentElement.dir = u.dir; }, [lang]);

  const go = (h) => { location.hash = '#/' + h; };
  const ctx = { lang, u, go, toast, openWord: (raw, tr, gloss, ctxM) => setWord({ raw, tr, gloss, ctxM }), openAudio: () => setAudioOpen(true) };

  if (!ready) return <div className="min-h-screen grid place-items-center"><div className="w-10 h-10 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin"/></div>;

  let view;
  const needsOnboarding = !profile || !profile.username || !profile.native;
  if (needsOnboarding) view = <Onboarding/>;
  else if (route[0] === 'profile') view = <Profile/>;
  else if (route[0] === 'learn' && route[1] && COURSES[route[1]] && COURSES[route[1]].n === profile.native){
    view = route[2] ? <LevelView key={route[1] + route[2]} tr={route[1]} L={route[2].toUpperCase()} tab={route[3]}/> : <Track key={route[1]} tr={route[1]}/>;
  } else view = <Home/>;

  return <Ctx.Provider value={ctx}>
    <div dir={u.dir} className="min-h-screen">{view}</div>
    <WordSheet data={word} onClose={() => setWord(null)}/>
    <AudioSheet open={audioOpen} onClose={() => setAudioOpen(false)} tl={route[0] === 'learn' && COURSES[route[1]] ? COURSES[route[1]].t : null}/>
    <Toasts list={toasts}/>
  </Ctx.Provider>;
}
