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
    period: `${'start' in digitalOffice.period ? new Date(`${digitalOffice.period.start}-01T00:00:00Z`).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : ''} to now`,
    role: `${digitalOffice.title} (contract)`,
    caption: 'A customer platform, from booking to billing.',
    description: 'I built Digital Office 24’s production customer platform alone, from HubSpot CRM integration to billing.',
    letter: 'D',
    body: {
      paragraphs: ['I built and run Digital Office 24’s production customer platform alone, from HubSpot CRM integration to billing.', 'The platform brings demo booking and the customer area together. I also handled its GDPR and consent work.'],
      facts: [{ term: 'Stack', value: digitalOffice.summary.match(/\(([^)]+)\)/)?.[1] ?? '' }],
      links: [], figures: [],
    },
  },
  {
    shareImage: '/work/hydra-share.jpg',
    slug: 'hydra', name: 'Hydra', period: '2020 to now', role: 'Co-owner and engineer',
    caption: 'A home for Discord communities.',
    description: `I co-own Hydra, a leveling and community bot serving ${figures.hydraServers} Discord servers.`,
    letter: 'H',
    body: {
      paragraphs: [
        `I built most of the hydra.bot web app in Vue and Nuxt, including premium subscriptions, and co-develop the Kotlin backend as its second-largest contributor. For the 2026 rebuild in Rust on Kubernetes, I lead the frontend, infrastructure and monorepo.`,
        `Founded by Jochen Segner, Hydra is a leveling, welcome and reaction-role bot serving ${figures.hydraServers} Discord servers as of ${asOf}.`,
      ],
      facts: [{ term: 'Stack', value: 'Vue, Nuxt, Kotlin; 2026 rebuild in Rust on Kubernetes' }],
      links: [{ label: 'hydra.bot', url: 'https://hydra.bot' }], figures: [hydraImage],
    },
  },
  {
    slug: 'hey-netflix', name: 'Hey, Netflix', period: '2022 to 2023', role: 'Software engineer (contract)',
    caption: 'Movie nights, made for Discord.',
    description: 'I built Hey, Netflix with Jochen Segner for Netflix, a Webby Honoree in 2023.',
    letter: 'N',
    body: {
      paragraphs: [`I built Hey, Netflix, a movie-night Discord bot, with Jochen Segner for Netflix, credited to HydraBot. It reached ${figures.netflixServers} servers and ${figures.netflixSessions} sessions in its first month. It was billed as the fastest-growing branded app on Discord and was a Webby Honoree in 2023.`],
      facts: [], links: [{ label: 'Webby Honoree 2023', url: 'https://winners.webbyawards.com/2023/advertising-media-pr/individual/game-or-application/251137/hey-netflix-discord-bot' }], figures: [],
    },
  },
  {
    shareImage: '/work/soundcloud-share.jpg',
    slug: 'soundcloud', name: 'SoundCloud', period: '2021 to now', role: 'Engineer and project lead (contract)',
    caption: 'Official SoundCloud bot.',
    description: `I lead the official SoundCloud bot project, on ${figures.soundcloudServers} servers.`,
    letter: 'S',
    body: {
      paragraphs: [
        `I manage the project with SoundCloud, including the 2022 launch and the move to OAuth 2.1. I lead the TypeScript and Nuxt web frontend and co-develop the Kotlin backend. I set up and run production in the SoundCloud AWS organization with Terraform.`,
        `Built and run with Jochen Segner, the official SoundCloud Discord bot serves ${figures.soundcloudServers} servers as of ${asOf}.`,
      ],
      facts: [{ term: 'Stack', value: 'TypeScript and Nuxt frontend; Kotlin backend; Terraform on AWS' }],
      links: [{ label: 'soundcloud.bot', url: 'https://soundcloud.bot' }],
      figures: [{ src: '/work/soundcloud-1280.webp', srcSet: '/work/soundcloud-640.webp 640w, /work/soundcloud-1280.webp 1280w', width: 1280, height: 737, caption: 'The SoundCloud bot homepage and its Add for free invitation.', alt: 'SoundCloud bot homepage with Discord and SoundCloud marks, the full headline and Add for free button' }],
    },
  },
];
