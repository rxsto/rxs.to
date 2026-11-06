import { asOf } from './content';

/** /story chapters, one per year in the Since 2018 index. Facts from shared/cv/content.ts; every figure carries its period. */
export const chapters = [
  {
    year: 2018,
    title: 'Groovy',
    body: [
      'I co-founded Groovy, a Discord music bot, with Nik Ammerlaan in 2018. I wrote its original bot at 16, first in Python and then in Java.',
      'I led its frontend and monetization, and I have been self-employed ever since.',
    ],
    figures: ['16M+ servers by 2021', '$1M+ revenue by 2021'],
  },
  {
    year: 2020,
    title: 'Co-owner of Hydra',
    body: [
      'I joined Jochen Segner, who founded Hydra, as co-owner. Hydra is a leveling, welcome and reaction-role bot.',
      'I built most of the hydra.bot web app, including premium subscriptions, in Vue and Nuxt, and I co-develop the Kotlin backend as its second-largest contributor.',
    ],
    figures: [`6.1M servers as of ${asOf}`],
    work: 'hydra',
  },
  {
    year: 2021,
    title: 'The official SoundCloud bot, and the end of Groovy',
    body: [
      'With Jochen I started building the official SoundCloud Discord bot. I manage the project with SoundCloud, including the 2022 launch and the move to OAuth 2.1, lead the Nuxt web frontend, and run production in SoundCloud’s AWS organization with Terraform.',
      'The same year, YouTube forced Groovy offline.',
    ],
    figures: [`667K servers as of ${asOf}`],
    work: 'soundcloud',
  },
  {
    year: 2022,
    title: 'Hey, Netflix',
    body: [
      'Jochen and I built the Hey, Netflix Discord bot for Netflix, credited at HydraBot. It was billed as the fastest-growing branded app on Discord.',
    ],
    figures: ['150K+ servers and 250K+ sessions in its first month in 2022', 'Webby Honoree 2023'],
    work: 'hey-netflix',
  },
  {
    year: 2026,
    title: 'Hydra’s rebuild and three contracts',
    body: [
      'I’m leading frontend, infrastructure and the monorepo for Hydra’s 2026 rebuild, in Rust on Kubernetes, and co-developing its backend.',
      'Alongside it I took on three contracts: the customer platform for Digital Office 24, which I built alone, from February; frontend features and a macOS app at Top.gg from June; and tech lead at Finaure, a wealth-management startup, from September.',
    ],
    figures: [],
  },
] as const;
