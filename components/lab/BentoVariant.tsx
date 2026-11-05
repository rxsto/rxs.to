import { ArrowUpRight, Award, FileText, Mail } from 'lucide-react';
import { Badge } from '@/components/arc/badge/badge';
import { CardToArticle } from '@/components/arc/card-to-article/card-to-article';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { InViewTitle } from '@/components/arc/in-view-title/in-view-title';
import { StatsBand } from '@/components/arc/blocks/stats-band/stats-band';
import { current, email, label, links, name, netflix, projects, since, skills, span, stats, summary } from './content';
import { BentoClock } from './BentoClock';
import styles from './bento.module.css';

const articles = projects.map(({ id, org, image, imageAlt, tag, meta, entry }) => ({
  id, image, imageAlt, tag, meta, title: org,
  body: (
    <div className={styles.article}>
      <p className={styles.articleRole}>{entry.title}, {span(entry)}</p>
      <p>{entry.summary}</p>
      {entry.highlights && <ul>{entry.highlights.map(item => <li key={item}>{item}</li>)}</ul>}
      {entry.url && <a className={styles.visit} href={entry.url} target="_blank" rel="noopener noreferrer">Visit {new URL(entry.url).host}<ArrowUpRight size={16} aria-hidden="true" /></a>}
    </div>
  ),
}));

export function BentoVariant() {
  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <section className={`${styles.cell} ${styles.intro}`} aria-labelledby="who">
          <img src="/avatar.png" alt="" width="256" height="256" className={styles.avatar} />
          <div className={styles.introText}>
            <InViewTitle as="h1" id="who" text={name} variant="blur" className={styles.name} />
            <p className={styles.label}>{label}</p>
          </div>
          <p className={styles.summary}>{summary}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={`mailto:${email}`}><Mail size={16} strokeWidth={1.75} aria-hidden="true" />Email me</a>
            <CopyButton value={email} label="Copy email" variant="plain" />
          </div>
        </section>

        <section className={`${styles.cell} ${styles.here}`} aria-label="Local time">
          <BentoClock />
          <a className={styles.cv} href="/cv"><FileText size={16} strokeWidth={1.75} aria-hidden="true" />Read the full CV</a>
        </section>

        <div className={`${styles.cell} ${styles.statsCell}`}>
          <StatsBand stats={stats} layout="plain" className={styles.band} />
        </div>

        <section className={styles.projects} aria-labelledby="projects">
          <h2 id="projects" className={styles.heading}>Projects</h2>
          <CardToArticle items={articles} aspectRatio={4 / 3} className={styles.cards} />
        </section>

        <section className={`${styles.cell} ${styles.award}`} aria-labelledby="netflix">
          <Award size={20} strokeWidth={1.75} aria-hidden="true" className={styles.awardIcon} />
          <h2 id="netflix" className={styles.cellTitle}>{netflix.award?.title} {netflix.award?.date}</h2>
          <p className={styles.muted}>{netflix.summary}</p>
        </section>

        <section className={`${styles.cell} ${styles.now}`} aria-labelledby="now">
          <h2 id="now" className={styles.cellTitle}>Working on now</h2>
          <ul>
            {current.map(entry => (
              <li key={entry.org}>
                <span><strong>{entry.org}</strong><span className={styles.muted}>{entry.title}</span></span>
                <Badge size="sm" tone={entry.relationship === 'venture' ? 'success' : 'neutral'} dot={entry.relationship === 'venture'}>{since(entry)}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.cell} ${styles.skills}`} aria-labelledby="skills">
          <h2 id="skills" className={styles.cellTitle}>Tools I reach for</h2>
          <div className={styles.chips}>{skills.slice(0, 2).flatMap(row => row.groups.flat()).map(skill => <Badge key={skill} size="md" outline pill>{skill}</Badge>)}</div>
        </section>

        <nav className={`${styles.cell} ${styles.links}`} aria-label="Elsewhere">
          {links.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
              <span>{link.name}</span><span className={styles.muted}>{link.handle}</span><ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
