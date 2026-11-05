import { cv, CvDocument, cvJsonLd, cvMetadata, cvSections, cvVariants } from '../../shared/cv';
import './cv.css';

export const metadata = cvMetadata;

export default function Page() {
  return (
    <div className="cv-page">
      <div className="cv-toolbar">
        <a href="/" className="cv-back">← rxs.to</a>
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
      <CvDocument cv={cv} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: cvJsonLd }} />
    </div>
  );
}
