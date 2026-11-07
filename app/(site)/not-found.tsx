import { SiteFrame } from '../../components/site/SiteFrame';
import type { Metadata } from 'next';
import { site } from '../../shared/site';
import styles from '../../components/site/site.module.css';
export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
  description: 'This page does not exist.',
  openGraph: { title: 'Page not found', description: 'This page does not exist.', type: 'website', siteName: site.name, images: [site.image] },
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return <SiteFrame view="missing"><section id="work" tabIndex={-1} className={styles.section}><h2 className={styles.heading}>Page not found</h2><p>This page does not exist. <a className={styles.link} href="/">Back home</a>.</p></section></SiteFrame>;
}
