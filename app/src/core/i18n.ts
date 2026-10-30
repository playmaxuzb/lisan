// @ts-nocheck
import { T_BASE } from './strings_base';
import { T_NEW } from './strings_new';
import { APP } from './strings_app';
export const T = Object.assign({}, T_BASE, T_NEW);
export function u(l){ return Object.assign({}, T[l]||T.en, APP[l]||APP.en); }
export { APP };
