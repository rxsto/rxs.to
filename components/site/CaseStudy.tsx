import { ArrowLeft } from 'lucide-react';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { projects, type Project } from './projects';
import { email } from './content';
import { ProjectHero } from './ProjectHero';
import styles from './site.module.css';

export function CaseStudy({ item }: { item: Project }) {
  const study = item.body;
  const next = projects[(projects.indexOf(item) + 1) % projects.length]!;
  return <article id="work" className={styles.article} aria-labelledby="project-title">
    <nav className={styles.articleNav} aria-label="Article actions">
      <a className={styles.roundButton} href={`/#card-${item.slug}`} aria-label="Back to all work"><ArrowLeft aria-hidden="true" /></a>
      <a className={styles.byline} href="/">Oskar Lang</a>
      <span className={styles.noScriptHide}><CopyButton className={styles.roundButton} value={`https://rxs.to/${item.slug}`} label="Copy link" iconOnly /></span>
    </nav>
    <header className={styles.caseHead}>
      <div className={styles.caseIdentity}><ProjectHero project={item} /><h1 id="project-title" className={styles.caseTitle}>{item.name}</h1></div>
      <p>{study.owned[0]}. {item.slug === 'hey-netflix' ? 'It reached ' : 'It serves '}{study.facts.find(fact => fact.term === 'Scale')?.value}.{item.slug === 'hey-netflix' && ' It was a Webby Honoree in 2023.'}</p>
      {item.url && <a className={styles.link} href={item.url} target="_blank" rel="noopener noreferrer">{item.url.replace('https://', '')} ↗</a>}
    </header>
    {study.figures.map((figure, index) => figure.image && <figure key={index} className={styles.figure}>
      <div className={styles.frame}><img src={figure.image.src} srcSet={figure.image.srcSet} sizes="(min-width: 40rem) 40rem, 100vw" alt={figure.image.alt} width={figure.image.width} height={figure.image.height} decoding="async" /></div>
      <figcaption>{figure.image.caption}</figcaption>
    </figure>)}
    <p className={styles.articleProse}>{study.owned.slice(1).map(line => `${line}.`).join(' ')}</p>
    <p className={styles.draft}>{item.slug === 'soundcloud' ? 'I’ll share more detail and updated screenshots soon.' : 'I’ll share more detail and screenshots soon.'}</p>
    <p className={styles.articleProse}><a className={styles.link} href={`mailto:${email}`}>Email me</a> about your project.</p>
    <nav className={styles.next} aria-label="Project navigation"><a className={styles.link} href="/#work">All work</a><a className={styles.link} href={`/${next.slug}`}>Next: {next.name} →</a></nav>
  </article>;
}
