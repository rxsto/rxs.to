import { chapters } from '../../../components/site/chapters';
import { work } from '../../../components/site/content';
import { Back, ContactClose, DraftText } from '../../../components/site/parts';
import styles from '../../../components/site/site.module.css';
import { pageMetadata } from '../../../shared/site';

export const metadata = pageMetadata({
  path: '/story',
  title: 'Since 2018',
  description: 'How Oskar Lang got here, year by year: Groovy, Hydra, the SoundCloud bot, Hey, Netflix and the 2026 rebuild.',
});

export default function Page() {
  return (
    <main className={styles.main}>
      <header className={`${styles.section} ${styles.enter}`}>
        <Back />
        <h1 className={styles.name}>Since 2018</h1>
        <p>I’ve been self-employed since 2018. These are the years that changed what I work on, in order.</p>
        <DraftText label="Draft">The chapters below are written from the CV. Oskar will replace them with his own account.</DraftText>
        <nav aria-label="Years">
          <ol className={styles.toc}>
            {chapters.map(chapter => <li key={chapter.year}><a className={styles.link} href={`#${chapter.year}`}>{chapter.year}</a></li>)}
          </ol>
        </nav>
      </header>

      <div className={styles.chapters}>
        {chapters.map(chapter => {
          const study = 'work' in chapter ? work.find(item => item.slug === chapter.work) : undefined;
          return (
            <section key={chapter.year} id={String(chapter.year)} className={styles.chapter} aria-labelledby={`chapter-${chapter.year}`}>
              <h2 id={`chapter-${chapter.year}`} className={styles.chapterHead}>
                <span className={styles.chapterYear}>{chapter.year}</span>
                <span>{chapter.title}</span>
              </h2>
              <div className={styles.chapterBody}>
                {chapter.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                {chapter.figures.length > 0 && <ul className={styles.figures}>{chapter.figures.map(figure => <li key={figure}>{figure}</li>)}</ul>}
                {study && <p><a className={styles.link} href={`/work/${study.slug}`}>Read the {study.name} case study</a></p>}
              </div>
            </section>
          );
        })}
      </div>

      <ContactClose />
    </main>
  );
}
