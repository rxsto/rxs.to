import { ArrowUpRight } from 'lucide-react';
import { ReturnFocus } from '../../components/site/ReturnFocus';
import { SiteFrame } from '../../components/site/SiteFrame';
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
  return <SiteFrame><ReturnFocus /><section id="work" tabIndex={-1} className={styles.section} aria-labelledby="work-title">
    <h2 id="work-title" className={styles.heading}>Selected work</h2>
    <ul className={styles.rows}>{projects.map(item => <li key={item.slug} id={`card-${item.slug}`}><a className={styles.row} href={`/${item.slug}`} aria-labelledby={`card-title-${item.slug}`} aria-describedby={`card-description-${item.slug}`}><ProjectHero project={item} /><span className={styles.rowText}><span className={styles.rowTitle} id={`card-title-${item.slug}`}>{item.name}</span><span className={styles.rowDetail} id={`card-description-${item.slug}`}>{item.caption.split(' · ').map((part, index) => <span key={part} className={index ? styles.rowCredential : undefined}>{index > 0 && ' · '}{part}</span>)}</span></span><ArrowUpRight className={styles.rowArrow} aria-hidden="true" /></a></li>)}</ul>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
  </section></SiteFrame>;
}
