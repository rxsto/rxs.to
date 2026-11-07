import { asOf } from './content';
import { figures } from './figures';

export type Image = { src: string; srcSet?: string; alt: string; width: number; height: number; caption: string };
export type Project = {
  slug: 'hydra' | 'hey-netflix' | 'soundcloud';
  name: string;
  description: string;
  period: string;
  role: string;
  caption: string;
  mark: { src: string };
  body: { paragraphs: string[]; facts: { term: string; value: string }[]; links: { label: string; url: string }[]; figures: Image[] };
};
export const hydraImage: Image = {
  src: '/work/hydra-1280.webp', width: 1280, height: 550, caption: 'Leveling on hydra.bot.',
  srcSet: '/work/hydra-640.webp 640w, /work/hydra-1280.webp 1280w',
  alt: 'The hydra.bot leveling page, headed “You just leveled up!”',
};
export const projects: Project[] = [
  {
    slug: 'hydra', name: 'Hydra', period: '2020 to now', role: 'Co-owner and engineer',
    caption: `Leveling and community bot · Co-owner, ${figures.hydraServers} servers`,
    description: `I co-own Hydra, a leveling and community bot serving ${figures.hydraServers} Discord servers.`,
    mark: { src: '/marks/hydra.png' },
    body: {
      paragraphs: [
        `I co-own Hydra, a leveling, welcome and reaction-role bot founded by Jochen Segner. It serves ${figures.hydraServers} Discord servers as of ${asOf}. I built most of the hydra.bot web app, including premium subscriptions, and co-develop the Kotlin backend as its second-largest contributor.`,
        'For the 2026 rebuild, I lead the frontend, infrastructure and monorepo.',
      ],
      facts: [{ term: 'Stack', value: 'Vue, Nuxt, Kotlin; 2026 rebuild in Rust on Kubernetes' }],
      links: [{ label: 'hydra.bot', url: 'https://hydra.bot' }], figures: [hydraImage],
    },
  },
  {
    slug: 'hey-netflix', name: 'Hey, Netflix', period: '2022 to 2023', role: 'Software engineer',
    caption: 'Movie-night bot built for Netflix · Webby Honoree',
    description: 'I built Hey, Netflix with Jochen Segner for Netflix, a Webby Honoree in 2023.',
    mark: { src: '/marks/netflix.svg' },
    body: {
      paragraphs: [`I built Hey, Netflix, a movie-night Discord bot, with Jochen Segner for Netflix under the HydraBot name. It reached ${figures.netflixServers} servers and ${figures.netflixSessions} sessions in its first month and was billed as the fastest-growing branded app on Discord. The project was a Webby Honoree in 2023.`],
      facts: [], links: [], figures: [],
    },
  },
  {
    slug: 'soundcloud', name: 'SoundCloud', period: '2021 to now', role: 'Engineer and project lead',
    caption: 'Official SoundCloud Discord bot · Project lead',
    description: `I lead the official SoundCloud bot project, on ${figures.soundcloudServers} servers.`,
    mark: { src: '/marks/soundcloud.svg' },
    body: {
      paragraphs: [
        `I’m the engineer and project lead for the official SoundCloud Discord bot, built and run with Jochen Segner. It serves ${figures.soundcloudServers} servers as of ${asOf}. I managed its 2022 launch and lead the web frontend while co-developing the Kotlin backend.`,
        'I set up and run production in the SoundCloud AWS organization with Terraform.',
      ],
      facts: [{ term: 'Stack', value: 'TypeScript and Nuxt frontend; Kotlin backend; Terraform on AWS' }],
      links: [{ label: 'soundcloud.bot', url: 'https://soundcloud.bot' }],
      figures: [{ src: '/work/soundcloud-1280.webp', srcSet: '/work/soundcloud-640.webp 640w, /work/soundcloud-1280.webp 1280w', width: 1280, height: 737, caption: 'The SoundCloud bot’s earlier web interface.', alt: 'SoundCloud bot homepage with Discord and SoundCloud marks, the full headline and Add for free button' }],
    },
  },
];
