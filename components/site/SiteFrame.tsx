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
        <div className={styles.previous}>{since.map(row => <p key={row.year}>{row.title.slice(0, row.title.lastIndexOf(' '))}{' '}<span className={styles.archiveEnding}>{row.title.slice(row.title.lastIndexOf(' ') + 1)}. <a className={styles.archiveLink} href={row.archive} target="_blank" rel="noopener noreferrer" aria-label="Groovy archived site">Archive ↗</a></span></p>)}</div>
      </>}
    </main>
    <Footer />
  </div>;
}
