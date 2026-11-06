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
  engagement: 'I take on contracts to build a product on my own, to lead a team’s engineering, or to add features to an app that already exists.',
};

/** `logo` names a bot avatar in public/bots (…-84.webp and …-126.webp, for the 42px inside the tile border); without one the tile shows the letter in `mark`. */
export type Row = { title: string; detail: string; href?: string; mark: string; logo?: 'hydra' | 'groovy' };

/** Ownership lines: what kind of ownership, of what, and the figure with its period. */
export const ownership: Row[] = [
  { mark: 'G', logo: 'groovy', title: 'Co-founded Groovy', detail: '16M+ servers and $1M+ revenue by 2021', href: '/story#2018' },
  { mark: 'H', logo: 'hydra', title: 'Co-own Hydra', detail: hydraServers, href: '/work/hydra' },
  { mark: 'S', title: 'Project lead on the SoundCloud bot', detail: `667K servers as of ${asOf}`, href: '/work/soundcloud' },
  { mark: 'N', title: 'Built Hey, Netflix for Netflix', detail: '150K+ servers in its first month in 2022, Webby Honoree 2023', href: '/work/hey-netflix' },
];

export const now = {
  updated: `Updated ${asOf}`,
  lead: 'I’m leading frontend, infrastructure and the monorepo for Hydra’s 2026 rebuild, in Rust on Kubernetes, and co-developing its backend.',
  rows: [
    { mark: 'D', title: 'Digital Office 24', detail: 'Sole engineer of the customer platform, since February 2026' },
    { mark: 'T', title: 'Top.gg', detail: 'Frontend features and a macOS app, since June 2026', href: 'https://top.gg' },
    { mark: 'F', title: 'Finaure', detail: 'Tech lead at a wealth-management startup, since September 2026' },
  ] satisfies Row[],
  human: 'Away from the keyboard I live in Kufstein and help run the Zeltlager, the largest yearly camp of BUNDjugend Bayern, as part of its camp leadership team.',
};

/** `srcSet` lists width variants of a 16:9 image; the img keeps its 1280 × 720 box so nothing shifts on load. */
export type Image = { src: string; srcSet?: string; alt: string };

export type Work = {
  slug: 'hydra' | 'hey-netflix' | 'soundcloud';
  name: string;
  period: string;
  role: string;
  /** One line for the homepage card: the decision and the dated number. */
  caption: string;
  image?: Image;
};

export const hydraImage: Image = {
  src: '/work/hydra-1280.webp',
  srcSet: '/work/hydra-640.webp 640w, /work/hydra-1280.webp 1280w',
  alt: 'The hydra.bot leveling page, headed “You just leveled up!”',
};

export const work: Work[] = [
  { slug: 'hydra', name: 'Hydra', period: '2020 to now', role: 'Co-owner and engineer', caption: `Leading frontend, infrastructure and the monorepo for the 2026 rebuild. ${hydraServers}.`, image: hydraImage },
  { slug: 'hey-netflix', name: 'Hey, Netflix', period: '2022 to 2023', role: 'Software engineer, built for Netflix', caption: '150K+ servers in its first month in 2022. Webby Honoree 2023.' },
  { slug: 'soundcloud', name: 'SoundCloud', period: '2021 to now', role: 'Engineer and project lead', caption: `Running production in SoundCloud’s own AWS organization with Terraform. 667K servers as of ${asOf}.`, image: { src: '/work/soundcloud.jpg', alt: 'The soundcloud.bot landing page' } },
];

/** The Since 2018 index. Each row links to its /story chapter. */
export const since = [
  { year: 2018, title: 'Co-founded Groovy, a music bot I first wrote at 16' },
  { year: 2020, title: 'Became co-owner of Hydra' },
  { year: 2021, title: 'Started the official SoundCloud bot, and YouTube forced Groovy offline' },
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
  { label: 'X', href: 'https://x.com/rxsto_official' },
];
