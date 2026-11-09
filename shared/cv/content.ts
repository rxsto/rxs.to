import type { Cv } from './model';

/**
 * The CV, and the only file a content round edits. Then run `pnpm cv:pdf` and `pnpm test`.
 * Text rules checked by tests/cv.test.ts: no apostrophes, non-ASCII only from the PDF allowlist,
 * ongoing roles before ended ones.
 */
export const cv = {
  name: 'Oskar Lang',
  label: 'Software engineer and entrepreneur',
  location: { city: 'Kufstein', country: 'Austria', countryCode: 'AT' },
  email: 'hi@rxs.to',
  website: 'https://rxs.to',
  profiles: [
    { network: 'GitHub', username: 'rxsto', url: 'https://github.com/rxsto' },
    { network: 'LinkedIn', username: 'oskar-lang', url: 'https://linkedin.com/in/oskar-lang' },
  ],
  summary: 'Software engineer and entrepreneur, self-employed since 2018. Co-founded Groovy (16M+ Discord servers, $1M+ revenue) and wrote its first version at 16. Co-own Hydra (6.1M servers). With Jochen Segner, built the official SoundCloud Discord bot and Hey, Netflix for Netflix.',
  experience: [
    {
      org: 'Hydra', title: 'Co-owner and engineer', relationship: 'venture', period: { start: '2020', end: 'present' }, url: 'https://hydra.bot',
      summary: 'Leveling, welcome and reaction-role bot founded by Jochen Segner, on 6.1M Discord servers.',
      highlights: [
        'Built most of the hydra.bot web app, including premium subscriptions (Vue, Nuxt)',
        'Second-largest contributor to the Kotlin backend',
        'Lead frontend, infrastructure and the monorepo for the 2026 rebuild (Rust, Kubernetes)',
      ],
    },
    {
      org: 'SoundCloud', title: 'Engineer and project lead', relationship: 'contract', period: { start: '2021', end: 'present' }, url: 'https://soundcloud.bot',
      summary: 'Official SoundCloud Discord bot, on 667K servers, built and run with Jochen Segner.',
      highlights: [
        'Manage the project with SoundCloud, including the 2022 launch and the move to OAuth 2.1',
        'Lead the web frontend (TypeScript, Nuxt) and contribute to the Kotlin backend',
        'Set up and run production infrastructure in the SoundCloud AWS organization (Terraform)',
      ],
    },
    {
      org: 'Digital Office 24', title: 'Software engineer', relationship: 'contract', period: { start: '2026-02', end: 'present' },
      summary: 'Built and run the customer platform by myself: demo booking, customer portal, billing and HubSpot CRM integration (Bun, Hono, Next.js). Also did its GDPR and consent work.',
    },
    {
      org: 'Finaure', title: 'Tech lead', relationship: 'contract', period: { start: '2026-09', end: 'present' },
      summary: 'The self-funded digital wealth-management startup of Dr. Jürgen Lange, built AI-first. In its core team, built the independent review program and an implementation-agnostic test lab.',
    },
    {
      org: 'Top.gg', title: 'Software engineer', relationship: 'contract', period: { start: '2026-06', end: 'present' }, url: 'https://top.gg',
      summary: 'Built frontend features for reviews, ad campaign health, SEO and internationalization (Next.js), plus a signed macOS app for infrastructure status (Electron).',
    },
    {
      org: '“Hey, Netflix” Discord bot', title: 'Software engineer', relationship: 'contract', period: { start: '2022', end: '2023' },
      summary: 'Built with Jochen Segner for Netflix, credited to HydraBot. 150K+ servers and 250K+ sessions in its first month; billed as the fastest-growing branded app on Discord.',
      award: { title: 'Webby Honoree', date: '2023', awarder: 'The Webby Awards' },
    },
    {
      org: 'Groovy', title: 'Co-founder', relationship: 'venture', period: { start: '2018', end: '2021' }, url: 'https://groovy.bot',
      summary: 'Discord music bot with Nik Ammerlaan; 16M+ servers before YouTube forced it offline.',
      highlights: ['Wrote the original bot at 16 (Python, then Java)', 'Led frontend and monetization as revenue passed $1M'],
    },
  ],
  education: [
    {
      institution: 'University of Passau', qualification: { kind: 'unfinished', area: 'Computer Science' }, period: { start: '2020', end: '2021' },
      summary: 'Left after the first semester to focus on my ventures.',
    },
    { institution: 'Gabelsberger-Gymnasium Mainburg', qualification: { kind: 'awarded', title: 'Abitur' }, period: { on: '2020' } },
  ],
  volunteering: [
    {
      org: 'BUNDjugend Bayern', title: 'Camp leadership team (Leitungsteam)', period: { start: '2022', end: 'present' },
      summary: 'Member since 2018; co-organize the Zeltlager, its largest yearly camp for children and teens.',
    },
  ],
  skills: [
    { name: 'Programming', groups: [['TypeScript', 'Kotlin', 'Java', 'Python', 'Rust'], ['Vue', 'Nuxt', 'React', 'Next.js'], ['Spring Boot']] },
    { name: 'Infrastructure', groups: [['AWS', 'Terraform', 'Kubernetes', 'Docker', 'Google Cloud', 'Cloudflare', 'Postgres', 'Redis']] },
    { name: 'Business', groups: [['client and project management', 'monetization (Stripe, Chargebee)', 'GDPR']] },
    { name: 'AI', groups: [['multi-agent development workflows across machines', 'LLM integration']] },
  ],
  languages: [{ language: 'German', fluency: 'native' }, { language: 'English', fluency: 'fluent' }],
  meta: {
    asOf: '2026-11-05',
    documentTitle: 'Oskar Lang – CV',
    description: 'Curriculum vitae: self-employed software engineer and entrepreneur',
    keywords: ['software engineer', 'full stack', 'entrepreneur', 'TypeScript', 'Kotlin', 'AWS', 'Kubernetes', 'Discord'],
  },
} as const satisfies Cv;
