import { asOf } from './content';

/** `approved` drops the "not yet approved" note: set it only for Oskar's own product. */
type Figure = { image?: Image; approved?: boolean; missing?: string };
type Body = {
  /** What Oskar owned, from the CV. The first-person account replaces the draft paragraph once he writes it. */
  owned: string[];
  facts: { term: string; value: string; placeholder?: boolean }[];
  system?: { layers: [string, string][]; note: string };
  quote?: { text: string; attribution: string };
  figures: Figure[];
};

/** Intrinsic dimensions reserve the real image ratio before decoding. */
export type Image = { src: string; srcSet?: string; alt: string; width: number; height: number; caption: string };

export type Project = {
  slug: 'hydra' | 'hey-netflix' | 'soundcloud';
  name: string;
  description: string;
  url?: string;
  period: string;
  role: string;
  /** One line for the homepage card: the decision and the dated number. */
  caption: string;
  mark: { src: string; size: number; appearance: 'original' | 'monochrome' };
  body: Body;
};

export const hydraImage: Image = {
  src: '/work/hydra-1280.webp', width: 1280, height: 720, caption: 'Leveling on hydra.bot.',
  srcSet: '/work/hydra-640.webp 640w, /work/hydra-1280.webp 1280w',
  alt: 'The hydra.bot leveling page, headed “You just leveled up!”',
};

const bodies: Record<Project['slug'], Body> = {
  hydra: {
    quote: { text: 'Client quote to come.', attribution: 'Name and role to come.' },
    owned: [
      'I co-own Hydra, a leveling, welcome and reaction-role bot founded by Jochen Segner',
      'I built most of the hydra.bot web app, including premium subscriptions (Vue, Nuxt)',
      'I co-develop the Kotlin backend as its second-largest contributor',
      'I lead frontend, infrastructure and the monorepo for the 2026 rebuild (Rust, Kubernetes)',
    ],
    facts: [
      { term: 'Role', value: 'Co-owner and engineer' },
      { term: 'Period', value: '2020 to now' },
      { term: 'Scale', value: '6.2M Discord servers as of November 2026' },
      { term: 'With', value: 'Jochen Segner, who founded Hydra' },
      { term: 'Stack', value: 'Vue, Nuxt, Kotlin; 2026 rebuild in Rust on Kubernetes' },
    ],
    figures: [
      { image: hydraImage, approved: true },
      { missing: 'the 2026 rebuild, once Oskar approves a screenshot' },
    ],
  },
  'hey-netflix': {
    owned: [
      'I built the bot with Jochen Segner for Netflix, credited at HydraBot',
      'It was billed as the fastest-growing branded app on Discord',
    ],
    facts: [
      { term: 'Role', value: 'Software engineer, built for Netflix' },
      { term: 'Period', value: '2022 to 2023' },
      { term: 'Scale', value: '150K+ servers and 250K+ sessions in its first month in 2022' },
      { term: 'Recognition', value: 'Webby Honoree 2023' },
      { term: 'Stack', value: 'Not specified in the CV', placeholder: true },
    ],
    figures: [
      { missing: 'an approved Hey, Netflix image' },
      { missing: 'the Webby Honoree listing' },
    ],
  },
  soundcloud: {
    system: {
      layers: [['Web interface', 'TypeScript, Nuxt'], ['Bot and backend', 'Kotlin'], ['Infrastructure', 'Terraform on AWS']],
      note: 'Who built, shared and operated each part. Oskar’s account to come.',
    },
    owned: [
      'I’m the engineer and project lead for the official SoundCloud bot, including its 2022 launch',
      'I lead the web frontend (TypeScript, Nuxt) and co-develop the Kotlin backend',
      'I set up and run production in the SoundCloud AWS organization with Terraform',
    ],
    facts: [
      { term: 'Role', value: 'Engineer and project lead' },
      { term: 'Period', value: '2021 to now' },
      { term: 'Scale', value: `667K Discord servers as of ${asOf}` },
      { term: 'With', value: 'Jochen Segner' },
    ],
    figures: [
      { image: { src: '/projects/soundcloud-bot.png', width: 2104, height: 1212, caption: 'The SoundCloud bot’s earlier web interface.', alt: 'SoundCloud bot homepage with Discord and SoundCloud marks, the full headline and Add for free button' } },
      { missing: 'the bot in a Discord server, once Oskar approves a screenshot' },
    ],
  },
};

export const projects: Project[] = [
  { slug: 'hydra', name: 'Hydra', period: '2020 to now', role: 'Co-owner and engineer', caption: 'Co-owner · 6.2M Discord servers (Nov 2026)', description: 'I co-own Hydra, serving 6.2M Discord servers as of November 2026.', url: 'https://hydra.bot', mark: { src: '/marks/hydra.png', size: 100, appearance: 'original' }, body: bodies.hydra },
  { slug: 'hey-netflix', name: 'Hey, Netflix', period: '2022 to 2023', role: 'Software engineer, built for Netflix', caption: 'Built for Netflix · Webby Honoree 2023', description: 'I built Hey, Netflix with Jochen Segner for Netflix, a Webby Honoree in 2023.', mark: { src: '/marks/netflix.svg', size: 80, appearance: 'monochrome' }, body: bodies['hey-netflix'] },
  { slug: 'soundcloud', name: 'SoundCloud', period: '2021 to now', role: 'Engineer and project lead', caption: 'Project lead · 667K servers (Nov 2026)', description: 'I lead the official SoundCloud bot project, on 667K servers as of November 2026.', url: 'https://soundcloud.bot', mark: { src: '/marks/soundcloud.svg', size: 88, appearance: 'monochrome' }, body: bodies.soundcloud },
];
