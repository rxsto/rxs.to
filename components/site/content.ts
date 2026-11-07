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

/** Discord's App Directory showed 6.2M servers for Hydra on 6 November 2026. Fixed to that month, not to the CV's date. */
export const hydraServers = '6.2M servers as of November 2026';

export const hero = {
  name: cv.name,
  identity: 'Software engineer in Kufstein, Austria',
  build: 'I build web products and Discord bots. I co-own Hydra, lead the official SoundCloud bot, and have been self-employed since 2018.',
  engagement: [
    'Solo product builds. Digital Office 24’s customer platform.',
    'Engineering leadership. Tech lead at Finaure and Hydra’s 2026 rebuild.',
    'Features for existing apps. Top.gg frontend features and a macOS status app.',
  ],
};

export type Row = { title: string; detail: string; href?: string; mark: string; imagePending?: string };

/** Ownership lines: what kind of ownership, of what, and the figure with its period. */
export const ownership: Row[] = [
  { mark: 'G', title: 'Co-founded Groovy', detail: '16M+ servers and $1M+ revenue by 2021', href: '/#2018' },
  { mark: 'H', title: 'Co-own Hydra', detail: hydraServers, href: '/hydra#work' },
  { mark: 'S', title: 'Project lead on the SoundCloud bot', detail: `667K servers as of ${asOf}`, href: '/soundcloud#work' },
  { mark: 'N', title: 'Built Hey, Netflix for Netflix', detail: '150K+ servers in its first month in 2022, Webby Honoree 2023', href: '/hey-netflix#work' },
];

export const now = {
  updated: `Updated ${asOf}`,
  lead: 'I’m leading frontend, infrastructure and the monorepo for Hydra’s 2026 rebuild, in Rust on Kubernetes, and co-developing its backend.',
  rows: [
    { mark: 'D', title: 'Digital Office 24', imagePending: 'one Digital Office 24 screen and the decision behind it', detail: 'Sole engineer of the customer platform, since February 2026' },
    { mark: 'T', title: 'Top.gg', imagePending: 'the Top.gg macOS status app', detail: 'Frontend features and a macOS app, since June 2026', href: 'https://top.gg' },
    { mark: 'F', title: 'Finaure', detail: 'Tech lead at a wealth-management startup, since September 2026' },
  ] satisfies Row[],
  human: 'Away from the keyboard I live in Kufstein and help run the Zeltlager, the largest yearly camp of BUNDjugend Bayern, as part of its camp leadership team.',
};

/** The Since 2018 index. Plain dated rows. */
export const since = [
  { year: 2018, title: 'Co-founded Groovy, a music bot I first wrote at 16', detail: 'With Nik Ammerlaan. I wrote the original bot in Python and then Java, and led frontend and monetization.', archive: 'https://web.archive.org/web/20181114170958/https://groovy.bot/' },
  { year: 2020, title: 'Became co-owner of Hydra' },
  { year: 2021, title: 'Started the official SoundCloud bot, and YouTube forced Groovy offline', detail: 'Groovy had reached 16M+ servers and $1M+ revenue by 2021.', archive: 'https://web.archive.org/web/20210807122905/https://groovy.bot/' },
  { year: 2022, title: 'Built Hey, Netflix for Netflix' },
  { year: 2026, title: 'Hydra’s rebuild and three new contracts', isNew: true },
] as const;

export const contact = {
  title: 'Have something to build?',
  body: 'Email is the best way to reach me. It helps to know the goal and the timeline.',
};

export const links = [
  { label: 'GitHub', href: 'https://github.com/rxsto' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/oskar-lang' },
  { label: 'Discord', href: 'https://discord.gg/r7tqQVs' },
  { label: 'Twitter', href: 'https://x.com/rxsto_official' },
];
