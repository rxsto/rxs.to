import { cv } from '../../shared/cv';

/** Site facts are derived from the CV, the source of truth. */
export const email = cv.email;
const [asOfYear, asOfMonth] = cv.meta.asOf.split('-').map(Number);
/** "November 2026", the month the CV's current figures were last checked. */
export const asOf = new Date(Date.UTC(asOfYear!, asOfMonth! - 1)).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const hero = {
  name: cv.name,
  identity: `Software engineer in ${cv.location.city}, ${cv.location.country}`,
  build: 'I build web products and Discord bots. I co-own Hydra, lead the official SoundCloud bot project, and have been self-employed since 2018.',
  engagement: 'I work on contract. I build whole products by myself, lead engineering teams, or add features to existing apps.',
};

/** Dated milestones for the semantic Since 2018 rail. */
export const since = [
  { year: 2018, title: 'Co-founded Groovy at 16', detail: 'With Nik Ammerlaan. I wrote the original bot in Python and then Java, and led frontend and monetization.', archive: 'https://web.archive.org/web/20181114170958/https://groovy.bot/' },
  { year: 2020, title: 'Became co-owner of Hydra' },
  { year: 2021, title: 'Groovy shut down; started work on SoundCloud’s bot', detail: 'Groovy had reached 16M+ servers and $1M+ revenue by 2021.', archive: 'https://web.archive.org/web/20210807122905/https://groovy.bot/' },
  { year: 2022, title: 'Built Hey, Netflix for Netflix' },
  { year: 2026, title: 'Began Hydra’s rebuild; started work with Digital Office 24, Top.gg and Finaure', isNew: true },
] as const;
