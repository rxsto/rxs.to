import { cv, CvDocument, cvJsonLd, cvMetadata, cvSections, cvVariants } from '../../../shared/cv';
import './cv.css';
import { ArrowLeft } from 'lucide-react';
import { Portrait } from '../../../components/site/Identity';
import styles from '../../../components/site/site.module.css';

export const metadata = { ...cvMetadata, title: { absolute: 'CV | Oskar Lang' }, openGraph: { ...cvMetadata.openGraph, title: 'CV' }, twitter: { card: 'summary', title: 'CV', images: ['/avatar.png'] } };

export default function Page() {
  return (
    <div className="cv-page">
      <nav className={`${styles.articleNav} cv-topbar`} aria-label="Article actions"><a className={styles.roundButton} href="/" aria-label="Back home"><ArrowLeft aria-hidden="true" /></a><Portrait /></nav>
      <CvDocument cv={cv} />
      <div className="cv-toolbar">
        <ul className="cv-downloads" aria-label="Download the CV">
          {cvVariants.map(v => (
            <li key={v.path}>
              <a href={v.path} type={v.mediaType} download={'download' in v ? v.download : undefined}>{v.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <nav aria-label="CV sections" className="cv-sections">
        {cvSections.map(s => <a key={s.id} href={`#${s.id}`}>{s.title}</a>)}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: cvJsonLd }} />
    </div>
  );
}
