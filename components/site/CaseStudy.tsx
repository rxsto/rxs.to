import { ArrowLeft } from 'lucide-react';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { projects, type Project } from './projects';
import { DraftText } from './parts';
import { ProjectHero } from './ProjectHero';
import styles from './site.module.css';

export function CaseStudy({ item }: { item: Project }) {
  const study = item.body;
  const next = projects[(projects.indexOf(item) + 1) % projects.length]!;
  return <article id="work" className={styles.main} aria-labelledby="project-title">
    <nav className={styles.articleNav} aria-label="Article actions">
      <a className={styles.roundButton} href={`/#card-${item.slug}`} aria-label="Back to all work"><ArrowLeft aria-hidden="true" /></a>
      <span className={styles.noScriptHide}><CopyButton className={styles.roundButton} value={`https://rxs.to/${item.slug}`} label="Copy link" iconOnly /></span>
    </nav>
    <header className={styles.caseHead}>
      <ProjectHero project={item} />
      <h1 id="project-title" className={styles.caseTitle}>{item.name}</h1>
      <p className={styles.stamp}>{item.role} · {item.period}</p>
      <p>{study.owned[0]}.</p>
    </header>
    <section className={styles.section} aria-labelledby="owned">
      <h2 id="owned" className={styles.heading}>My work</h2>
      {study.owned.slice(1).map(line => <p key={line}>{line}.</p>)}
      <p>{study.facts.find(fact => fact.term === 'Scale')?.value}.</p>
      {study.facts.filter(fact => fact.term === 'Recognition').map(fact => <p key={fact.term}>{fact.value}.</p>)}
      <DraftText label="Story to come">Oskar’s account of the decisions behind this work.</DraftText>
    </section>
    {study.system && <section className={styles.section} aria-labelledby="system"><h2 id="system" className={styles.heading}>System</h2><ul className={styles.systemSketch}>{study.system.layers.map(([layer, stack]) => <li key={layer}><span>{layer}</span><span>{stack}</span></li>)}</ul></section>}
    {study.figures.map((figure, index) => figure.image && <figure key={index} className={styles.figure}>
      <div className={styles.frame}><img src={figure.image.src} srcSet={figure.image.srcSet} sizes="(min-width: 40rem) 40rem, 100vw" alt={figure.image.alt} width={1280} height={720} decoding="async" /></div>
      <figcaption>{figure.image.alt}{!figure.approved && ' · Earlier capture; awaiting Oskar’s approval.'}</figcaption>
    </figure>)}
    <p className={styles.draft}><span className={styles.draftLabel}>Images to come</span>{item.slug === 'hey-netflix' ? 'Approved project images and the Webby listing.' : 'An approved capture of the latest work.'}</p>
    <nav className={styles.next} aria-label="Project navigation"><a className={styles.link} href="/#work">All work</a><a className={styles.link} href={`/${next.slug}`}>Next: {next.name} →</a></nav>
  </article>;
}
