// @ts-nocheck
import { T_BASE } from './strings_base';
import { T_NEW } from './strings_new';
import { T_NEW2 } from './strings_new2';
import { APP } from './strings_app';
import { PRO_T } from './strings_pro';
import { X_T } from './strings_x';
export const T = Object.assign({}, T_BASE, T_NEW, T_NEW2);
export function u(l){ return Object.assign({}, T[l]||T.en, APP[l]||APP.en, { p: Object.assign({}, PRO_T.en, PRO_T[l]||{}), x: Object.assign({}, X_T.en, X_T[l]||{}), lang: l }); }
export { APP };
