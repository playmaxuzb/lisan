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
import { Pricing, CertPage, CertList, Verify } from '@/views/Pro';
import Review from '@/views/Review';
import Placement from '@/views/Placement';
import Videos from '@/views/Videos';
import Admin from '@/views/Admin';
import { initPro } from '@/core/pro';
import { initSrs } from '@/core/srs';
import { WordSheet, AudioSheet } from '@/views/Sheets';
import { ReportSheet } from '@/views/Report';
import Dict from '@/views/Dict';
import Games from '@/views/Games';
import Stats from '@/views/Stats';
import Schools from '@/views/Schools';
import { initActivity, startClock, onGoal, checkRemindNow } from '@/core/activity';
import { flushReports } from '@/core/report';
import { navTrack } from '@/core/nav';

function parseHash(){ const h = decodeURIComponent(location.hash.replace(/^#\/?/, '').replace(/\?.*$/, '')); const p = h.split('/').filter(Boolean); return p; }

export default function App(){
  const store = useStore();
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState(parseHash());
  const [toasts, setToasts] = useState([]);
  const [word, setWord] = useState(null);
  const [audioOpen, setAudioOpen] = useState(false);
  const [rep, setRep] = useState(null);
  const routeRef = useRef(route); routeRef.current = route;
  const tid = useRef(0);

  useEffect(() => { Store.load(); initSrs(); initActivity(); startClock(() => routeRef.current); Promise.all([loadCourses(), loadRef(), initAuth()]).then(() => { initPro(); setReady(true); flushReports(); setTimeout(checkRemindNow, 4000); }); Speech.init();
    navTrack(); const f = () => { navTrack(); const r = parseHash(); setRoute(r); Speech.stop(); if (r[0] !== 'book' && !(r.length === 0 && document.querySelector('[data-book-detail]') && getComputedStyle(document.querySelector('[data-book-detail]')).visibility === 'visible')) window.scrollTo({ top: 0 }); }; addEventListener('hashchange', f);
    const prime = () => { primeAudio(); removeEventListener('pointerdown', prime); }; addEventListener('pointerdown', prime);
    return () => removeEventListener('hashchange', f); }, []);

  const profile = Store.profile();
  const lang = (profile && profile.native) || Store.meta.pendingNative || detectLang();
  const u = useMemo(() => S(lang), [lang]);
  const toast = (msg) => { const id = ++tid.current; setToasts((l) => [...l, { id, msg }]); setTimeout(() => setToasts((l) => l.filter((x) => x.id !== id)), 2600); };
  useEffect(() => { setToast(toast); onGoal(() => toast(u.x.goalReached)); setNoAudioMsg(u.noAudio); document.documentElement.lang = lang; document.documentElement.dir = u.dir; }, [lang]);

  const go = (h) => { location.hash = '#/' + h; };
  const ctx = { lang, u, go, toast, openWord: (raw, tr, gloss, ctxM) => setWord({ raw, tr, gloss, ctxM }), openAudio: () => setAudioOpen(true), report: (d) => setRep(d) };

  if (!ready) return <div className="min-h-screen grid place-items-center"><div className="w-10 h-10 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin"/></div>;

  let view;
  const needsOnboarding = !profile || !profile.username || !profile.native;
  const own = (tr) => tr && COURSES[tr] && COURSES[tr].n === (profile && profile.native);
  if (route[0] === 'verify') view = <Verify id={route[1]}/>;
  else if (needsOnboarding) view = <Onboarding/>;
  else if (route[0] === 'profile') view = <Profile/>;
  else if (route[0] === 'pricing') view = <Pricing key={route[1] || ''}/>;
  else if (route[0] === 'certs') view = <CertList/>;
  else if (route[0] === 'cert' && route[1] === 'new' && own(route[2])) view = <CertPage tr={route[2]} L={(route[3] || '').toUpperCase()}/>;
  else if (route[0] === 'cert' && route[1]) view = <CertPage id={route[1]}/>;
  else if (route[0] === 'videos') view = <Videos/>;
  else if (route[0] === 'stats') view = <Stats/>;
  else if (route[0] === 'schools') view = <Schools/>;
  else if (route[0] === 'dict' && own(route[1])) view = <Dict key={route[1]} tr={route[1]}/>;
  else if (route[0] === 'games' && own(route[1])) view = <Games key={route[1] + (route[2] || '')} tr={route[1]} g={route[2]}/>;
  else if (route[0] === 'admin') view = <Admin tab={route[1]}/>;
  else if (route[0] === 'review' && own(route[1])) view = <Review key={route[1]} tr={route[1]}/>;
  else if (route[0] === 'placement' && own(route[1])) view = <Placement key={route[1]} tr={route[1]}/>;
  else if (route[0] === 'learn' && route[1] && COURSES[route[1]] && COURSES[route[1]].n === profile.native){
    view = route[2] ? <LevelView key={route[1] + route[2]} tr={route[1]} L={route[2].toUpperCase()} tab={route[3]}/> : <Track key={route[1]} tr={route[1]}/>;
  } else view = <Home book={route[0] === 'book' && own(route[1]) ? route[1] : null}/>;

  return <Ctx.Provider value={ctx}>
    <div dir={u.dir} className="min-h-screen">{view}</div>
    <WordSheet data={word} onClose={() => setWord(null)}/>
    <AudioSheet open={audioOpen} onClose={() => setAudioOpen(false)} tl={route[0] === 'learn' && COURSES[route[1]] ? COURSES[route[1]].t : null}/>
    <ReportSheet data={rep} onClose={() => setRep(null)}/>
    <Toasts list={toasts}/>
  </Ctx.Provider>;
}
