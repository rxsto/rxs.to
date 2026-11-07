import { figures } from './figures';
import { cv } from '../../shared/cv';

/** Site facts are derived from the CV, the source of truth. */
export const email = cv.email;
const [asOfYear, asOfMonth] = cv.meta.asOf.split('-').map(Number);
/** "November 2026", the month the CV's current figures were last checked. */
export const asOf = new Date(Date.UTC(asOfYear!, asOfMonth! - 1)).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const hero = { name: cv.name };

/** Current client work first; earlier ventures appear only here. */
export const since = [
  { year: 2022, title: 'Helping lead a youth summer camp' },
  { year: 2018, title: `Co-founded Groovy at 16; ${figures.groovyServers} servers and ${figures.groovyRevenue} revenue before YouTube forced it offline in 2021`, archive: 'https://web.archive.org/web/20210807122905/https://groovy.bot/' },
] as const;
