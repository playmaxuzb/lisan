import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as E from './core/engine';
(window as any).__lisan = E;
createRoot(document.getElementById('root')!).render(<App />);
