import { cv } from '../../shared/cv';
import type { Stat } from '@/components/arc/blocks/stats-band/stats-band';

type Entry = {
  org: string; title: string; relationship: 'venture' | 'contract';
  period: { start: string; end: string }; url?: string; summary: string;
  highlights?: readonly string[]; award?: { title: string; date: string; awarder: string };
};

export const experience = cv.experience as readonly Entry[];
export const current = experience.filter(entry => entry.period.end === 'present');
export const { name, label, email, summary, location, skills, languages, education, volunteering } = cv;

const month = (date: string) => {
  const [year, m] = date.split('-');
  return m ? new Date(Date.UTC(Number(year), Number(m) - 1)).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }) + ' ' + year : year;
};
export const span = (entry: Entry) => `${month(entry.period.start)} to ${entry.period.end === 'present' ? 'now' : month(entry.period.end)}`;
export const since = (entry: Entry) => `Since ${month(entry.period.start)}`;

export const stats: Stat[] = [
  { value: 16_000_000, notation: 'compact', suffix: '+', label: 'Servers ran Groovy', detail: 'Co-founded it at 16', context: '2018 to 2021, until YouTube forced it offline' },
  { value: 6_100_000, notation: 'compact', decimals: 1, label: 'Servers run Hydra', detail: 'Co-owner since 2020', context: 'Leading its 2026 rebuild in Rust on Kubernetes' },
  { value: 667_000, notation: 'compact', label: 'Servers run the SoundCloud bot', detail: 'Built with SoundCloud', context: 'Production runs in the SoundCloud AWS organization' },
  { value: 1, prefix: '$', suffix: 'M+', label: 'Revenue at Groovy', detail: 'Led frontend and monetization', context: 'Self-employed since 2018' },
];

export const links = [
  { name: 'GitHub', url: 'https://github.com/rxsto', handle: 'rxsto' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/oskar-lang', handle: 'oskar-lang' },
  { name: 'Discord', url: 'https://discord.gg/r7tqQVs', handle: 'Community' },
  { name: 'X', url: 'https://x.com/rxsto_official', handle: 'rxsto_official' },
];

export const projects = [
  { id: 'hydra', org: 'Hydra', image: '/lab/hydra.jpg', imageAlt: 'The hydra.bot landing page', tag: 'Co-owner', meta: '6.1M servers' },
  { id: 'soundcloud', org: 'SoundCloud', image: '/lab/soundcloud.jpg', imageAlt: 'The soundcloud.bot landing page', tag: 'Project lead', meta: '667K servers' },
  { id: 'groovy', org: 'Groovy', image: '/lab/groovy.jpg', imageAlt: 'The groovy.bot page after shutdown', tag: 'Co-founder', meta: '16M+ servers, 2018 to 2021' },
].map(project => ({ ...project, entry: experience.find(entry => entry.org === project.org)! }));

export const netflix = experience.find(entry => entry.award)!;

export const chapters = [
  { id: '2018', year: '2018', title: 'A music bot, written at 16', body: 'Co-founded Groovy with Nik Ammerlaan and wrote the original bot in Python, then Java. It grew to more than 16 million Discord servers.', metric: '16M+', metricLabel: 'servers' },
  { id: '2020', year: '2020', title: 'Co-owner of Hydra', body: 'Joined Jochen Segner on Hydra, the leveling and welcome bot. Built most of the hydra.bot web app, including premium subscriptions.', metric: '6.1M', metricLabel: 'servers' },
  { id: '2021', year: '2021', title: 'The official SoundCloud bot', body: 'Started building the official SoundCloud Discord bot with Jochen. Groovy, past $1M in revenue, was forced offline by YouTube the same year.', metric: '667K', metricLabel: 'servers' },
  { id: '2022', year: '2022', title: 'Hey, Netflix', body: 'Built the official Netflix Discord bot: 150K+ servers in its first month, and a Webby Honoree in 2023.', metric: '150K+', metricLabel: 'servers in a month' },
  { id: '2026', year: '2026', title: 'Five teams at once', body: 'Leading the Hydra rebuild in Rust on Kubernetes, and building for Top.gg, Digital Office 24 and Finaure.', metric: '5', metricLabel: 'current engagements' },
];
