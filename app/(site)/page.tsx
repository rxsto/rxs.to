import { SiteFrame } from '../../components/site/SiteFrame';
import { Card } from '@/components/arc/card/card';
import { projects } from '../../components/site/projects';
import { ProjectHero } from '../../components/site/ProjectHero';
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
  return <SiteFrame><section id="work" tabIndex={-1} className={styles.section} aria-labelledby="work-title">
    <h2 id="work-title" className={styles.heading}>Selected work</h2>
    <ul className={styles.cards}>{projects.map(item => <li key={item.slug} id={`card-${item.slug}`}><a className={styles.cardLink} href={`/${item.slug}#work`} aria-labelledby={`card-title-${item.slug}`} aria-describedby={`card-description-${item.slug}`}><Card title={item.name} titleId={`card-title-${item.slug}`} description={item.caption} descriptionId={`card-description-${item.slug}`} media={<ProjectHero project={item} />}><p className={styles.cardMeta}>{item.role}, {item.period}</p></Card></a></li>)}</ul>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
  </section></SiteFrame>;
}
