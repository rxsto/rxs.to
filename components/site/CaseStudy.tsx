import { Badge } from '@/components/arc/badge/badge';
import { asOf, work, type Work } from './content';
import { Back, ContactClose, DraftText, MissingImage } from './parts';
import styles from './site.module.css';

type Figure = { image?: { src: string; alt: string }; missing?: string; caption?: string };
type Study = {
  /** What Oskar owned, from the CV. The first-person account replaces the draft paragraph once he writes it. */
  owned: string[];
  facts: [string, string][];
  figures: Figure[];
};

const studies: Record<Work['slug'], Study> = {
  hydra: {
    owned: [
      'Built most of the hydra.bot web app, including premium subscriptions (Vue, Nuxt)',
      'Co-develop the Kotlin backend as its second-largest contributor',
      'Lead frontend, infrastructure and the monorepo for the 2026 rebuild (Rust, Kubernetes)',
    ],
    facts: [
      ['Role', 'Co-owner and engineer'],
      ['Period', '2020 to now'],
      ['Scale', `6.1M Discord servers as of ${asOf}`],
      ['With', 'Jochen Segner, who founded Hydra'],
    ],
    figures: [
      { image: { src: '/work/hydra.jpg', alt: 'The hydra.bot landing page' } },
      { missing: 'the 2026 rebuild, once Oskar approves a screenshot' },
    ],
  },
  'hey-netflix': {
    owned: [
      'Built the bot with Jochen Segner for Netflix, credited at HydraBot',
      'Billed as the fastest-growing branded app on Discord',
    ],
    facts: [
      ['Role', 'Software engineer, built for Netflix'],
      ['Period', '2022 to 2023'],
      ['Scale', '150K+ servers and 250K+ sessions in its first month in 2022'],
      ['Recognition', 'Webby Honoree 2023'],
    ],
    figures: [
      { missing: 'an approved Hey, Netflix image' },
      { missing: 'the Webby Honoree listing' },
    ],
  },
  soundcloud: {
    owned: [
      'Manage the project with SoundCloud, including the 2022 launch and the move to OAuth 2.1',
      'Lead the web frontend (TypeScript, Nuxt) and co-develop the Kotlin backend',
      'Set up and run production in the SoundCloud AWS organization with Terraform',
    ],
    facts: [
      ['Role', 'Engineer and project lead'],
      ['Period', '2021 to now'],
      ['Scale', `667K Discord servers as of ${asOf}`],
      ['With', 'Jochen Segner'],
    ],
    figures: [
      { image: { src: '/work/soundcloud.jpg', alt: 'The soundcloud.bot landing page' } },
      { missing: 'the bot in a Discord server, once Oskar approves a screenshot' },
    ],
  },
};

/** A case study in Chase McCoy's grammar: name and date range, what I owned in the first person, then framed media with one decision each. */
export function CaseStudy({ slug }: { slug: Work['slug'] }) {
  const item = work.find(entry => entry.slug === slug)!;
  const study = studies[slug];
  const next = work[(work.indexOf(item) + 1) % work.length]!;
  return (
    <main className={styles.main}>
      <header className={`${styles.caseHead} ${styles.enter}`}>
        <Back />
        <h1 className={styles.caseTitle}>{item.name}<Badge outline size="sm">{item.period}</Badge></h1>
        <p className={styles.caseRole}>{item.role}</p>
      </header>

      <section className={styles.section} aria-labelledby="owned">
        <h2 id="owned" className={styles.heading}>What I owned</h2>
        <DraftText>Oskar’s first-person account of what he owned and decided goes here. Until then, the facts from his CV:</DraftText>
        <ul className={styles.list}>{study.owned.map(line => <li key={line}>{line}</li>)}</ul>
        <dl className={styles.facts}>
          {study.facts.map(([term, value]) => <div key={term} style={{ display: 'contents' }}><dt>{term}</dt><dd>{value}</dd></div>)}
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="decisions">
        <h2 id="decisions" className={styles.heading}>Decisions</h2>
        {study.figures.map((figure, index) => (
          <figure key={index} className={styles.figure}>
            <div className={styles.frame}>
              {figure.image
                ? <img src={figure.image.src} alt={figure.image.alt} width={1280} height={720} loading={index ? 'lazy' : undefined} decoding="async" />
                : <MissingImage>{figure.missing}</MissingImage>}
            </div>
            <figcaption>
              <span className={styles.draftLabel}>Placeholder caption</span>
              {figure.image ? 'An earlier capture, not yet approved. ' : ''}One decision this shows, in a sentence.
            </figcaption>
          </figure>
        ))}
      </section>

      <nav className={styles.next} aria-label="Next case study">
        <span className={styles.stamp}>Next</span>
        <a className={styles.link} href={`/work/${next.slug}`}>{next.name}</a>
      </nav>

      <ContactClose />
    </main>
  );
}
