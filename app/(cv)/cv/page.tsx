import { cv, cvJsonLd, cvMetadata, cvVariants, cvSections } from '../../../shared/cv';
import './cv.css';
import { ArrowLeft, Download } from 'lucide-react';
import { Tooltip } from '../../../components/arc/tooltip/tooltip';
import button from '../../../components/arc/button/button.module.css';
import styles from '../../../components/site/site.module.css';

export const metadata = { ...cvMetadata, title: { absolute: 'CV | Oskar Lang' }, openGraph: { ...cvMetadata.openGraph, title: 'CV' }, twitter: { card: 'summary', title: 'CV', images: ['/avatar.png'] } };

type Period = (typeof cv.education)[number]['period'] | (typeof cv.experience)[number]['period'] | (typeof cv.volunteering)[number]['period'];
function dateLabel(date: string) {
  if (!date.includes('-')) return date;
  return new Date(`${date}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function Entry({ org, role, period, summary, highlights }: { org: string; role: string; period: Period; summary?: string; highlights?: readonly string[] }) {
  const dates = 'on' in period ? [period.on] : [period.start, period.end];
  return <article><h3><span className="org">{org}</span><span className="role">{role}</span></h3><span className="date">{dates.map(dateLabel).join(' – ')}</span>{'\n'}
    {summary && <p>{summary}</p>}{'\n'}
    {highlights && <ul>{highlights.map(point => <li key={point}>{point}</li>)}</ul>}
  </article>;
}

// Web-only rendering: the shared CV and its PDF renderer remain unchanged.
function CvContent() {
  const sections = {
    profile: <p>{cv.summary}</p>,
    experience: cv.experience.map(e => <Entry key={e.org} org={e.org} role={`${e.title}${e.relationship === 'contract' ? ' (contract)' : ''}`} period={e.period} summary={`${e.summary}${'award' in e ? ` ${e.award.date} ${e.award.title}.` : ''}`} highlights={'highlights' in e ? e.highlights : undefined} />),
    education: cv.education.map(e => <Entry key={e.institution} org={e.institution} role={e.qualification.kind === 'unfinished' ? `${e.qualification.area} (no degree)` : e.qualification.title} period={e.period} summary={'summary' in e ? e.summary : undefined} />),
    volunteering: cv.volunteering.map(e => <Entry key={e.org} org={e.org} role={e.title} period={e.period} summary={e.summary} />),
    skills: <>{cv.skills.map(row => <div className="skill-row" key={row.name}><h3>{row.name}</h3><ul>{row.groups.flat().map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}<p className="languages"><b>Languages:</b> {cv.languages.map(l => `${l.language} (${l.fluency})`).join(', ')}</p></>,
  };
  const bare = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const contacts = [{ text: `${cv.location.city}, ${cv.location.country}`, href: '' }, { text: cv.email, href: `mailto:${cv.email}` }, { text: bare(cv.website), href: cv.website }, ...cv.profiles.map(p => ({ text: bare(p.url), href: p.url }))];
  return <div className="cv"><header><h1>{cv.name}</h1>{'\n'}<p className="contact">{contacts.map((item, i) => <span key={item.text}>{i > 0 && <span className="sep"> · </span>}{item.href ? <a href={item.href}>{item.text}</a> : item.text}</span>)}</p></header>{'\n'}
    <main>{cvSections.map(({ id, title }) => <section key={id} aria-labelledby={id} className={id}><h2 id={id}>{title}</h2>{'\n'}{sections[id]}</section>)}</main>
  </div>;
}

export default function Page() {
  return (
    <div className="cv-page">
      <nav className={`${styles.articleNav} cv-topbar`} aria-label="Article actions">
        <a className={`${button.button} ${button.ghost} ${button.md} ${styles.articleButton}`} href="/" aria-label="Back home"><ArrowLeft size={18} aria-hidden="true" /></a>
        <Tooltip content="Download PDF"><a className={`${button.button} ${button.ghost} ${button.md} ${styles.articleButton}`} href="/cv.pdf" type="application/pdf" download="Oskar-Lang-CV.pdf" aria-label="Download PDF"><Download size={18} aria-hidden="true" /></a></Tooltip>
      </nav>
      <CvContent />
      <p className="cv-formats">Also available as {cvVariants.filter(v => 'format' in v).map((v, index) => <span key={v.path}>{index > 0 && ' and '}<a href={v.path} type={v.mediaType}>{v.label}</a></span>)}.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: cvJsonLd }} />
    </div>
  );
}
