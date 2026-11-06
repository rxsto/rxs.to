import { Avatar } from '@/components/arc/avatar/avatar';
import { Card } from '@/components/arc/card/card';
import { hero, now, ownership, work } from '../../components/site/content';
import { Actions, ContactClose, MissingImage, Rows } from '../../components/site/parts';
import { SinceRuler } from '../../components/site/SinceRuler';
import styles from '../../components/site/site.module.css';
import { jsonLd, pageMetadata, site, websiteNode } from '../../shared/site';

const title = 'Oskar Lang, software engineer';
const description = 'Software engineer in Kufstein, Austria. I build web products and Discord bots, co-own Hydra and lead the official SoundCloud bot.';
const url = site.origin;

export const metadata = pageMetadata({ path: '/', title, description });

const schema = jsonLd([
  websiteNode,
  {
    '@id': `${url}/#webpage`, '@type': 'WebPage', description, name: title, url,
    isPartOf: { '@id': websiteNode['@id'] },
    potentialAction: [{ '@type': 'ReadAction', target: [url] }],
  },
]);

export default function Page() {
  return (
    <main className={styles.main}>
      <header className={`${styles.hero} ${styles.enter}`}>
        <div className={styles.identity}>
          <Avatar name={hero.name} src="/avatar.png" size="lg" />
          <div>
            <h1 className={styles.name}>{hero.name}</h1>
            <p className={styles.identityLine}>{hero.identity}</p>
          </div>
        </div>
        <p>{hero.build}</p>
        <p>{hero.engagement}</p>
        <Actions />
      </header>

      <section className={styles.section} aria-label="What I own">
        <Rows rows={ownership} />
      </section>

      <section className={styles.section} aria-labelledby="now">
        <div className={styles.headingRow}>
          <h2 id="now" className={styles.heading}>Now</h2>
          <span className={styles.stamp}>{now.updated}</span>
        </div>
        <p>{now.lead}</p>
        <Rows rows={now.rows} />
        <p>{now.human}</p>
      </section>

      <section className={styles.section} aria-labelledby="work">
        <h2 id="work" className={styles.heading}>Selected work</h2>
        <ul className={styles.cards}>
          {work.map(item => (
            <li key={item.slug}>
              <Card
                title={item.name}
                description={item.caption}
                media={item.image
                  ? <img className={styles.media} src={item.image.src} alt={item.image.alt} width={1280} height={720} loading="lazy" decoding="async" />
                  : <MissingImage>an approved {item.name} image</MissingImage>}
              >
                <p className={styles.cardMeta}>{item.role}, {item.period}</p>
                <a className={styles.cardLink} href={`/work/${item.slug}`}>Read the case study<span className={styles.srOnly}>: {item.name}</span></a>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="since">
        <h2 id="since" className={styles.heading}>Since 2018</h2>
        <SinceRuler />
      </section>

      <ContactClose />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </main>
  );
}
