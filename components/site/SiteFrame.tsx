import type { ReactNode } from 'react';
import { Identity } from './Identity';
import { Footer } from './parts';
import { asOf, since } from './content';
import styles from './site.module.css';

export function SiteFrame({ children, view = 'home' }: { children: ReactNode; view?: 'home' | 'project' | 'missing' }) {
  return <div className={styles.page}>
    <main className={styles.main}>
      {view !== 'project' && <Identity compact={view === 'missing'} />}
      {children}
      {view === 'home' && <>
        <section className={styles.section} aria-labelledby="now">
          <div className={styles.headingRow}><h2 id="now" className={styles.heading}>Now</h2><span className={styles.stamp}>{asOf}</span></div>
          <p>Leading Hydra’s rebuild, building <a className={styles.link} href="/digital-office-24">Digital Office 24’s customer platform</a>, and working with Top.gg and Finaure.</p>
          <p>Away from work, I help lead BUNDjugend Bayern’s yearly Zeltlager.</p>
        </section>
        <section className={styles.section} aria-labelledby="since">
          <h2 id="since" className={styles.heading}>Since 2018</h2>
          <ol className={styles.ledger}>{since.map(row => <li key={row.year} id={String(row.year)} className={styles.ledgerRow}><span className={styles.ledgerYear}>{row.year}</span><span>{row.title}{'archive' in row && <> <a className={styles.archiveLink} href={row.archive} target="_blank" rel="noopener noreferrer" aria-label={`${row.year} archived site`}>Archive ↗</a></>}</span></li>)}</ol>
        </section>
      </>}
    </main>
    <Footer />
  </div>;
}
