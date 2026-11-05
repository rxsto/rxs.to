import { Children, Fragment, type ReactNode } from 'react';
import {
  contactItems, cvSections, dateLabel, engagementLabel, engagementSummary, languagesText, periodEnds, qualificationLabel, skillRowText,
  type Cv, type CvSectionId, type Period,
} from './model';

/**
 * Static markup drops the whitespace between elements, so adjacent blocks would read as one word
 * ("LangKufstein") to text extractors. Every block sibling gets a newline between it and the next.
 */
function Lines({ children }: { children: ReactNode }) {
  return Children.toArray(children).flatMap((child, i) => (i === 0 ? [child] : ['\n', child]));
}

function Dates({ period }: { period: Period }) {
  return (
    <span className="date">
      {periodEnds(period).map((end, i) => (
        <Fragment key={i}>
          {i > 0 && ' – '}
          {end === 'present' ? end : <time dateTime={end}>{dateLabel(end)}</time>}
        </Fragment>
      ))}
    </span>
  );
}

function Entry({ org, label, period, summary, highlights }: {
  org: string; label: string; period: Period; summary?: string; highlights?: readonly string[];
}) {
  return (
    <article>
      <Lines>
        <><h3><span className="org">{org}</span>, <span className="role">{label}</span></h3> <Dates period={period} /></>
        {summary && <p>{summary}</p>}
        {highlights && <ul><Lines>{highlights.map(h => <li key={h}>{h}</li>)}</Lines></ul>}
      </Lines>
    </article>
  );
}

const sectionBody: Record<CvSectionId, (cv: Cv) => ReactNode> = {
  profile: cv => <p>{cv.summary}</p>,
  experience: cv => cv.experience.map(e => (
    <Entry key={e.org} org={e.org} label={engagementLabel(e)} period={e.period} summary={engagementSummary(e)} highlights={e.highlights} />
  )),
  education: cv => cv.education.map(s => (
    <Entry key={s.institution} org={s.institution} label={qualificationLabel(s.qualification)} period={s.period} summary={s.summary} />
  )),
  volunteering: cv => cv.volunteering.map(v => (
    <Entry key={v.org} org={v.org} label={v.title} period={v.period} summary={v.summary} />
  )),
  skills: cv => [
    ...cv.skills.map(row => <p key={row.name}><b>{row.name}:</b> {skillRowText(row)}</p>),
    <p key="languages"><b>Languages:</b> {languagesText(cv.languages)}</p>,
  ],
};

/** The CV as semantic markup without styling. tools/cv/print.css styles it for the PDF, app/cv/cv.css for the page. */
export function CvDocument({ cv }: { cv: Cv }) {
  return (
    <div className="cv">
      <Lines>
        <header>
          <Lines>
            <h1>{cv.name}</h1>
            <p className="contact">
              {contactItems(cv).map((item, i) => (
                <Fragment key={item.text}>
                  {i > 0 && <> <span className="sep">·</span> </>}
                  {item.href ? <a href={item.href}>{item.text}</a> : item.text}
                </Fragment>
              ))}
            </p>
          </Lines>
        </header>
        <main>
          <Lines>
            {cvSections.map(({ id, title }) => (
              <section key={id} aria-labelledby={id} className={id}>
                <Lines>
                  <h2 id={id}>{title}</h2>
                  {sectionBody[id](cv)}
                </Lines>
              </section>
            ))}
          </Lines>
        </main>
      </Lines>
    </div>
  );
}
