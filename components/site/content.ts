import { cv } from '../../shared/cv';

/**
 * Site copy. Facts come from shared/cv/content.ts, the source of truth. Every figure carries its own period:
 * Groovy's are past tense, current ones say "as of" the CV's date.
 * `draft: true` marks copy that Oskar has not written or approved yet; the page shows it with a visible marker.
 */

export const email = cv.email;
const [asOfYear, asOfMonth] = cv.meta.asOf.split('-').map(Number);
/** "November 2026", the month the CV's current figures were last checked. */
export const asOf = new Date(Date.UTC(asOfYear!, asOfMonth! - 1)).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const hero = { name: cv.name };

/** The Since 2018 index. Plain dated rows. */
export const since = [
  { year: 2018, title: 'Co-founded Groovy at 16; 16M+ servers by 2021', detail: 'With Nik Ammerlaan. I wrote the original bot in Python and then Java, and led frontend and monetization.', archive: 'https://web.archive.org/web/20181114170958/https://groovy.bot/' },
  { year: 2020, title: 'Became co-owner of Hydra' },
  { year: 2021, title: 'Started SoundCloud’s bot; Groovy went offline', detail: 'Groovy had reached 16M+ servers and $1M+ revenue by 2021.', archive: 'https://web.archive.org/web/20210807122905/https://groovy.bot/' },
  { year: 2022, title: 'Built Hey, Netflix for Netflix' },
  { year: 2026, title: 'Leading Hydra’s rebuild, building Digital Office 24’s customer platform, and working with Top.gg and Finaure', isNew: true },
] as const;
