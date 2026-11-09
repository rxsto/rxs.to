import { asOf } from './content';
import { figures } from './figures';
import { cv } from '../../shared/cv';

const digitalOffice = cv.experience.find(entry => entry.org === 'Digital Office 24');
if (!digitalOffice) throw new Error('Digital Office 24 is missing from the CV');

export type Image = { src: string; srcSet?: string; alt: string; width: number; height: number; caption: string };
export type Project = {
  slug: 'digital-office-24' | 'hydra' | 'hey-netflix' | 'soundcloud';
  name: string;
  description: string;
  period: string;
  role: string;
  caption: string;
  shareImage?: string;
  letter: 'D' | 'H' | 'N' | 'S';
  body: { paragraphs: string[]; facts: { term: string; value: string }[]; links: { label: string; url: string }[]; figures: Image[] };
};
export const hydraImage: Image = {
  src: '/work/hydra-1280.webp', width: 1280, height: 550, caption: 'Leveling on hydra.bot.',
  srcSet: '/work/hydra-640.webp 640w, /work/hydra-1280.webp 1280w',
  alt: 'The hydra.bot leveling page, headed “You just leveled up!”',
};
export const projects: Project[] = [
  {
    slug: 'digital-office-24', name: digitalOffice.org,
    period: `${'start' in digitalOffice.period ? new Date(`${digitalOffice.period.start}-01T00:00:00Z`).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : ''} to present`,
    role: `${digitalOffice.title} (contract)`,
    caption: 'A customer platform, from demo booking to billing.',
    description: 'I built and run Digital Office 24’s customer platform by myself, from demo booking to billing.',
    letter: 'D',
    body: {
      paragraphs: ['I built Digital Office 24’s customer platform by myself and run it in production. It handles demo booking, the customer portal, billing and the HubSpot CRM integration. I also did its GDPR and consent work.'],
      facts: [{ term: 'Stack', value: digitalOffice.summary.match(/\(([^)]+)\)/)?.[1] ?? '' }],
      links: [], figures: [],
    },
  },
  {
    shareImage: '/work/hydra-share.jpg',
    slug: 'hydra', name: 'Hydra', period: '2020 to present', role: 'Co-owner and engineer',
    caption: 'A leveling, welcome and reaction-role bot for Discord.',
    description: `I co-own Hydra, a leveling, welcome and reaction-role bot on ${figures.hydraServers} Discord servers.`,
    letter: 'H',
    body: {
      paragraphs: [
        `Hydra is a leveling, welcome and reaction-role bot on ${figures.hydraServers} Discord servers as of ${asOf}. Jochen Segner founded it.`,
        `I built most of the hydra.bot web app in Vue and Nuxt, including premium subscriptions. I’m the second-largest contributor to the Kotlin backend. For the 2026 rebuild in Rust on Kubernetes, I lead the frontend, infrastructure and monorepo.`,
      ],
      facts: [{ term: 'Stack', value: 'Vue, Nuxt, Kotlin; 2026 rebuild in Rust on Kubernetes' }],
      links: [{ label: 'hydra.bot', url: 'https://hydra.bot' }], figures: [hydraImage],
    },
  },
  {
    slug: 'hey-netflix', name: 'Hey, Netflix', period: '2022 to 2023', role: 'Software engineer (contract)',
    caption: 'A movie-night bot for Discord, built for Netflix.',
    description: 'Jochen Segner and I built Hey, Netflix, a movie-night Discord bot for Netflix. It was a 2023 Webby Honoree.',
    letter: 'N',
    body: {
      paragraphs: [`Hey, Netflix is a movie-night Discord bot that Jochen Segner and I built for Netflix. The work was credited to HydraBot. In its first month it reached ${figures.netflixServers} servers and ${figures.netflixSessions} sessions, and it was billed as the fastest-growing branded app on Discord. It was a 2023 Webby Honoree.`],
      facts: [], links: [{ label: '2023 Webby Honoree', url: 'https://winners.webbyawards.com/2023/advertising-media-pr/individual/game-or-application/251137/hey-netflix-discord-bot' }], figures: [],
    },
  },
  {
    shareImage: '/work/soundcloud-share.jpg',
    slug: 'soundcloud', name: 'SoundCloud', period: '2021 to present', role: 'Engineer and project lead (contract)',
    caption: 'SoundCloud’s official Discord bot.',
    description: `I lead the project behind SoundCloud’s official Discord bot, which runs on ${figures.soundcloudServers} servers.`,
    letter: 'S',
    body: {
      paragraphs: [
        `SoundCloud’s official Discord bot runs on ${figures.soundcloudServers} servers as of ${asOf}. Jochen Segner and I build and run it.`,
        `I manage the project with SoundCloud, including the 2022 launch and the move to OAuth 2.1. I lead the TypeScript and Nuxt web frontend and also work on the Kotlin backend. I set up and run the production infrastructure in SoundCloud’s AWS organization with Terraform.`,
      ],
      facts: [{ term: 'Stack', value: 'TypeScript and Nuxt frontend; Kotlin backend; Terraform on AWS' }],
      links: [{ label: 'soundcloud.bot', url: 'https://soundcloud.bot' }],
      figures: [{ src: '/work/soundcloud-1280.webp', srcSet: '/work/soundcloud-640.webp 640w, /work/soundcloud-1280.webp 1280w', width: 1280, height: 737, caption: 'The SoundCloud bot homepage and its Add for free invitation.', alt: 'SoundCloud bot homepage with Discord and SoundCloud marks, the full headline and Add for free button' }],
    },
  },
];
