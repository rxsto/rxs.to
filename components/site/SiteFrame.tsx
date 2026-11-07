import type { ReactNode } from 'react';
import { Identity } from './Identity';
import { Footer, ContactClose, Rows, DraftText } from './parts';
import { now, ownership, since } from './content';
import { Badge } from '../arc/badge/badge';
import styles from './site.module.css';
export function SiteFrame({ children, view = 'home', currentProject }: { children: ReactNode; view?: 'home' | 'project' | 'missing'; currentProject?: string }) {
  return <div className={styles.page}>
    <main className={styles.main}>
      <Identity />
      {(view !== 'home') && children}
      {view !== 'missing' && <><section className={styles.section} aria-label="What I own">
        <Rows rows={ownership} currentHref={currentProject ? `/${currentProject}#work` : undefined} />
      </section>

      <section className={styles.section} aria-labelledby="now">
        <div className={styles.headingRow}>
          <h2 id="now" className={styles.heading}>Now</h2>
          <span className={styles.stamp}>{now.updated}</span>
        </div>
        <p>{now.lead}</p>
        <Rows rows={now.rows} />
        <p>{now.human}</p>
        <DraftText label="Placeholder">One thing I organise there. Oskar’s camp vignette to come.</DraftText>
      </section>

      {view === 'home' && children}
      <section className={styles.section} aria-labelledby="since">
        <h2 id="since" className={styles.heading}>Since 2018</h2>
        <ol className={styles.ledger}>
          {since.map(row => <li key={row.year} id={String(row.year)}>
            <div className={styles.ledgerRow}>
              <span className={styles.ledgerYear}>{row.year}</span>
              <div>
                <span>{row.title} {'isNew' in row && <Badge size="sm">New</Badge>}</span>
                {row.year === 2018 && <figure className={styles.archiveFigure}><div className={styles.frame}><img src="/work/groovy-2018-11-14-640.webp" alt="Groovy website captured on 14 November 2018" width={640} height={360} loading="lazy" /></div><figcaption>14 November 2018 · <a className={styles.link} href={row.archive} target="_blank" rel="noopener noreferrer">Internet Archive</a></figcaption></figure>}
                {'detail' in row && <p className={styles.rowDetail}>{row.detail} {row.year !== 2018 && <a className={styles.link} href={row.archive} target="_blank" rel="noopener noreferrer">Archived site</a>}</p>}
              </div>
            </div>
          </li>)}
        </ol>
      </section>
      <ContactClose /></>}
    </main>
    <Footer />
  </div>;
}
