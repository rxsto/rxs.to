import type { ReactNode } from 'react';
import { Identity } from './Identity';
import { Footer } from './parts';
import { asOf, since } from './content';
import styles from './site.module.css';
import { ExternalArrow } from './ExternalArrow';
import { CommitCalendar } from './CommitCalendar';
import commits from './commits.json';

export function SiteFrame({ children, view = 'home' }: { children: ReactNode; view?: 'home' | 'project' | 'missing' }) {
  return <div className={styles.page}>
    <main className={styles.main}>
      {view !== 'project' && <Identity compact={view === 'missing'} />}
      {children}
      {view === 'home' && <>
        <section className={styles.section} aria-labelledby="now">
          <div className={styles.headingRow}><h2 id="now" className={styles.heading}>Now</h2><span className={styles.stamp}>{asOf}</span></div>
          <p>Co-leading Hydra’s rebuild, leading development of SoundCloud’s official Discord bot, and building for Top.gg and an early-stage wealth-management startup.</p>
        </section>
        <section className={styles.section} aria-labelledby="since">
          <h2 id="since" className={styles.heading}>Since 2018</h2>
          <ol className={styles.ledger}>{since.map(row => <li key={row.year} id={String(row.year)} className={styles.ledgerRow}><span className={styles.ledgerYear}>{row.year}</span><span>{row.title}{'archive' in row && <> <a className={styles.archiveLink} href={row.archive} target="_blank" rel="noopener noreferrer" aria-label={`${row.year} archived site`}>Archive<ExternalArrow /></a></>}</span></li>)}</ol>
        </section>
        <CommitCalendar days={commits.days} last={commits.last} repos={commits.repos} years={Object.keys(commits.years).map(Number).sort((a, b) => b - a)} />
      </>}
    </main>
    <Footer />
  </div>;
}
