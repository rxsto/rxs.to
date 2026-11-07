import Link from 'next/link';
import button from '@/components/arc/button/button.module.css';
import { ArrowLeft } from 'lucide-react';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { projects, type Project } from './projects';
import { EmailButton } from './parts';
import { ProjectHero } from './ProjectHero';
import styles from './site.module.css';

export function CaseStudy({ item }: { item: Project }) {
  const study = item.body;
  const next = projects[(projects.indexOf(item) + 1) % projects.length]!;
  return <article id="work" className={styles.article} aria-labelledby="project-title">
    <nav className={styles.articleNav} aria-label="Article actions">
      <Link className={`${button.button} ${button.secondary} ${button.md}`} href={`/#card-${item.slug}`} aria-label="Back to all work"><ArrowLeft size={18} aria-hidden="true" /></Link>
      <a className={styles.byline} href="/">Oskar Lang</a>
      <span className={styles.noScriptHide}><CopyButton value={`https://rxs.to/${item.slug}`} label="Copy link" iconOnly /></span>
    </nav>
    <header className={styles.caseHead}>
      <div className={styles.caseIdentity}><ProjectHero project={item} /><h1 id="project-title" className={styles.caseTitle}>{item.name}</h1></div>
      {study.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </header>
    {study.figures.map(figure => <figure key={figure.src} className={styles.figure}>
      <div className={styles.frame}><img src={figure.src} srcSet={figure.srcSet} sizes="(min-width: 40rem) 40rem, 100vw" alt={figure.alt} width={figure.width} height={figure.height} decoding="async" /></div>
      <figcaption>{figure.caption}</figcaption>
    </figure>)}
    <dl className={styles.facts}>
      {[{ term: 'Role', value: item.role }, { term: 'Period', value: item.period }, ...study.facts].map(fact => <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.value}</dd></div>)}
      {study.links.length > 0 && <div><dt>Links</dt><dd>{study.links.map(link => <a key={link.url} className={styles.link} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</dd></div>}
    </dl>
    <div className={styles.section}><div className={styles.actions}><EmailButton /></div></div>
    <nav className={styles.next} aria-label="Project navigation"><Link prefetch className={styles.link} href={`/${next.slug}`}>Next: {next.name} →</Link></nav>
  </article>;
}
