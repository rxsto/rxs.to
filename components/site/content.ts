import { cv } from '../../shared/cv';

/** Site facts are derived from the CV, the source of truth. */
export const email = cv.email;
const [asOfYear, asOfMonth] = cv.meta.asOf.split('-').map(Number);
/** "November 2026", the month the CV's current figures were last checked. */
export const asOf = new Date(Date.UTC(asOfYear!, asOfMonth! - 1)).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const hero = { name: cv.name };

/** The Since 2018 index. Plain dated rows. */
export const since = [
  { year: 2018, title: 'Co-founded Groovy at 16', detail: 'With Nik Ammerlaan. I wrote the original bot in Python and then Java, and led frontend and monetization.', archive: 'https://web.archive.org/web/20181114170958/https://groovy.bot/' },
  { year: 2020, title: 'Became co-owner of Hydra' },
  { year: 2021, title: 'Started SoundCloud’s bot; Groovy went offline', detail: 'Groovy had reached 16M+ servers and $1M+ revenue by 2021.', archive: 'https://web.archive.org/web/20210807122905/https://groovy.bot/' },
  { year: 2022, title: 'Built Hey, Netflix for Netflix' },
  { year: 2026, title: 'Hydra’s rebuild and new collaborations', isNew: true },
] as const;
