import type { ReactNode } from 'react';
import { Identity } from './Identity';
import { Footer } from './parts';
import { since } from './content';
import styles from './site.module.css';

export function SiteFrame({ children, view = 'home' }: { children: ReactNode; view?: 'home' | 'project' | 'missing' }) {
  return <div className={styles.page}>
    <main className={styles.main}>
      {view !== 'project' && <Identity compact={view === 'missing'} />}
      {children}
      {view === 'home' && <>
        <section className={styles.section} aria-labelledby="since">
          <h2 id="since" className={styles.heading}>Along the way</h2>
          <ol className={styles.ledger}>{since.map(row => <li key={row.year} id={String(row.year)} className={styles.ledgerRow}><span className={styles.ledgerYear}>{row.year}</span><span>{'href' in row ? <a className={styles.link} href={row.href}>{row.title}</a> : row.title}{'archive' in row && <> <a className={styles.archiveLink} href={row.archive} target="_blank" rel="noopener noreferrer" aria-label={`${row.year} archived site`}>Archive ↗</a></>}</span></li>)}</ol>
        </section>
      </>}
    </main>
    <Footer />
  </div>;
}
