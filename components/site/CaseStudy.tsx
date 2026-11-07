import { Badge } from '@/components/arc/badge/badge';
import { projects, type Project } from './projects';
import { Back, DraftText, MissingImage } from './parts';
import { ProjectHero } from './ProjectHero';
import styles from './site.module.css';

/** A case study in Chase McCoy's grammar: name and date range, what I owned in the first person, then framed media with one decision each. */
export function CaseStudy({ item }: { item: Project }) {
  const study = item.body;
  const index = projects.indexOf(item);
  const next = projects[(index + 1) % projects.length]!;
  const previous = projects[(index + projects.length - 1) % projects.length]!;
  return (
    <section id="work" tabIndex={-1} className={styles.main} aria-labelledby="project-title">
      <header className={styles.caseHead}>
        <Back href={`/#card-${item.slug}`}>All work</Back>
        <ProjectHero project={item} />
        <h2 id="project-title" className={styles.caseTitle}>{item.name}<Badge outline size="sm">{item.period}</Badge></h2>
        <p className={styles.caseRole}>{item.role}</p>
      </header>

      <section className={styles.section} aria-labelledby="owned">
        <h3 id="owned" className={styles.heading}>What I owned</h3>
        <DraftText>Oskar’s first-person account of what he owned and decided goes here. Until then, the facts from his CV:</DraftText>
        <ul className={styles.list}>{study.owned.map(line => <li key={line}>{line}</li>)}</ul>
        <dl className={styles.facts}>
          {study.facts.map(({ term, value, placeholder }) => <div key={term} style={{ display: 'contents' }}><dt>{term}</dt><dd>{placeholder && <span className={styles.draftLabel}>Placeholder fact</span>}{value}</dd></div>)}
        </dl>
      </section>

      {study.system && <section className={styles.section} aria-labelledby="system">
        <h3 id="system" className={styles.heading}>System</h3>
        <ol className={styles.systemSketch} aria-label={`${item.name} system layers`}>
          {study.system.layers.map(([layer, stack]) => <li key={layer}><span>{layer}</span><span>{stack}</span></li>)}
        </ol>
        <DraftText>{study.system.note}</DraftText>
      </section>}

      {study.quote && <figure className={styles.figure}>
        <blockquote className={styles.quote}><DraftText label="Placeholder quote">{study.quote.text}</DraftText></blockquote>
        <figcaption><span className={styles.draftLabel}>Placeholder attribution</span>{study.quote.attribution}</figcaption>
      </figure>}

      <section className={styles.section} aria-labelledby="decisions">
        <h3 id="decisions" className={styles.heading}>Decisions</h3>
        {study.figures.map((figure, index) => (
          <figure key={index} className={styles.figure}>
            <div className={styles.frame}>
              {figure.image
                ? <img src={figure.image.src} srcSet={figure.image.srcSet} sizes="(min-width: 40rem) 40rem, 100vw" alt={figure.image.alt} width={1280} height={720} loading={index ? 'lazy' : undefined} decoding="async" />
                : <MissingImage>{figure.missing}</MissingImage>}
            </div>
            <figcaption>
              <span className={styles.draftLabel}>Placeholder caption</span>
              {figure.image && !figure.approved ? 'An earlier capture, not yet approved. ' : ''}One decision this shows, in a sentence.
            </figcaption>
          </figure>
        ))}
      </section>

      <nav className={styles.next} aria-label="Project navigation">
        <a className={styles.link} href={`/${previous.slug}#work`} rel="prev"><span className={styles.stamp}>Previous</span><span>← {previous.name}</span></a>
        <a className={styles.link} href={`/${next.slug}#work`} rel="next"><span className={styles.stamp}>Next</span><span>{next.name} →</span></a>
      </nav>


    </section>
  );
}
