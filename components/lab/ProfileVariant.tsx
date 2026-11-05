import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { Accordion } from '@/components/arc/accordion/accordion';
import { Badge } from '@/components/arc/badge/badge';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { TextReveal } from '@/components/arc/text-reveal/text-reveal';
import { StatsBand } from '@/components/arc/blocks/stats-band/stats-band';
import { current, education, email, experience, label, languages, links, name, since, skills, span, stats, summary, volunteering } from './content';
import { Here } from './Here';
import styles from './profile.module.css';

export function ProfileVariant() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <img src="/avatar.png" alt="" width="256" height="256" className={styles.avatar} />
        <TextReveal as="h1" text={name} className={styles.name} />
        <p className={styles.label}>{label}</p>
        <p className={styles.here}><Here /></p>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={`mailto:${email}`}><Mail size={16} strokeWidth={1.75} aria-hidden="true" />Email me</a>
          <CopyButton value={email} label="Copy email" />
          <a className={styles.secondary} href="/cv"><FileText size={16} strokeWidth={1.75} aria-hidden="true" />Read my CV</a>
        </div>
      </header>

      <StatsBand stats={stats} layout="divided" className={styles.stats} />

      <section className={styles.section} aria-labelledby="now">
        <h2 id="now" className={styles.heading}>Working on now</h2>
        <ul className={styles.now}>
          {current.map(entry => (
            <li key={entry.org} className={styles.nowRow}>
              <span className={styles.nowOrg}>{entry.url ? <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.org}<ArrowUpRight size={14} aria-hidden="true" /></a> : entry.org}</span>
              <span className={styles.nowTitle}>{entry.title}</span>
              <Badge size="sm" tone={entry.relationship === 'venture' ? 'success' : 'neutral'} dot={entry.relationship === 'venture'}>{entry.relationship === 'venture' ? 'Own venture' : since(entry)}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="experience">
        <h2 id="experience" className={styles.heading}>Experience</h2>
        <Accordion
          defaultOpen={-1}
          items={experience.map(entry => ({
            title: `${entry.org}, ${span(entry)}`,
            content: (
              <div className={styles.entry}>
                <p className={styles.entryRole}>{entry.title}</p>
                <p>{entry.summary}</p>
                {entry.highlights && <ul>{entry.highlights.map(item => <li key={item}>{item}</li>)}</ul>}
                {entry.award && <Badge size="sm" color="amber">{`${entry.award.title}, ${entry.award.date}`}</Badge>}
                {entry.url && <a className={styles.inline} href={entry.url} target="_blank" rel="noopener noreferrer">{new URL(entry.url).host}<ArrowUpRight size={14} aria-hidden="true" /></a>}
              </div>
            ),
          }))}
        />
      </section>

      <section className={styles.section} aria-labelledby="skills">
        <h2 id="skills" className={styles.heading}>Skills</h2>
        <dl className={styles.skills}>
          {skills.map(row => (
            <div key={row.name} className={styles.skillRow}>
              <dt>{row.name}</dt>
              <dd>{row.groups.flat().map(skill => <Badge key={skill} size="sm" outline>{skill}</Badge>)}</dd>
            </div>
          ))}
          <div className={styles.skillRow}>
            <dt>Languages</dt>
            <dd>{languages.map(item => <Badge key={item.language} size="sm" outline>{`${item.language}, ${item.fluency}`}</Badge>)}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="beyond">
        <h2 id="beyond" className={styles.heading}>Beyond work</h2>
        <ul className={styles.plain}>
          {volunteering.map(item => <li key={item.org}><strong>{item.org}</strong>, {item.title.toLowerCase()}. {item.summary}</li>)}
          {education.map(item => <li key={item.institution}><strong>{item.institution}</strong>{'summary' in item && item.summary ? `. ${item.summary}` : ''}</li>)}
        </ul>
      </section>

      <footer className={styles.footer}>
        <nav aria-label="Elsewhere" className={styles.links}>
          {links.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>)}
        </nav>
      </footer>
    </main>
  );
}
