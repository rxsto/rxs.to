import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { Badge } from '@/components/arc/badge/badge';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { InViewTitle } from '@/components/arc/in-view-title/in-view-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/arc/tabs/tabs';
import { education, email, experience, languages, links, skills, span, summary, volunteering } from './content';
import { CareerStory } from './story/CareerStory';
import { Here } from './Here';
import styles from './story.module.css';

export function StoryVariant() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.who}>
          <img src="/avatar.png" alt="" width="256" height="256" className={styles.avatar} />
          <span><strong>Oskar Lang</strong><Here className={styles.here} /></span>
        </div>
        <InViewTitle as="h1" variant="word" text="I build software for millions of Discord servers, and have since I was 16." className={styles.title} />
        <p className={styles.lede}>{summary}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={`mailto:${email}`}><Mail size={16} strokeWidth={1.75} aria-hidden="true" />Email me</a>
          <a className={styles.secondary} href="/cv"><FileText size={16} strokeWidth={1.75} aria-hidden="true" />Read my CV</a>
        </div>
      </header>

      <CareerStory />

      <section className={styles.detail} aria-labelledby="detail">
        <InViewTitle as="h2" id="detail" text="The details" className={styles.heading} />
        <Tabs defaultValue="experience">
          <TabsList aria-label="Details">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="beyond">Education and more</TabsTrigger>
          </TabsList>
          <TabsContent value="experience">
            <ol className={styles.roles}>
              {experience.map(entry => (
                <li key={entry.org}>
                  <span className={styles.when}>{span(entry)}</span>
                  <span className={styles.what}>
                    <strong>{entry.url ? <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.org}<ArrowUpRight size={14} aria-hidden="true" /></a> : entry.org}</strong>
                    <span>{entry.title}</span>
                    <span className={styles.muted}>{entry.summary}</span>
                  </span>
                </li>
              ))}
            </ol>
          </TabsContent>
          <TabsContent value="skills">
            <dl className={styles.skills}>
              {skills.map(row => <div key={row.name}><dt>{row.name}</dt><dd>{row.groups.flat().map(skill => <Badge key={skill} size="sm" outline>{skill}</Badge>)}</dd></div>)}
              <div><dt>Languages</dt><dd>{languages.map(item => <Badge key={item.language} size="sm" outline>{`${item.language}, ${item.fluency}`}</Badge>)}</dd></div>
            </dl>
          </TabsContent>
          <TabsContent value="beyond">
            <ul className={styles.beyond}>
              {volunteering.map(item => <li key={item.org}><strong>{item.org}</strong><span className={styles.muted}>{item.title}. {item.summary}</span></li>)}
              {education.map(item => <li key={item.institution}><strong>{item.institution}</strong><span className={styles.muted}>{'summary' in item && item.summary ? item.summary : 'Abitur, 2020'}</span></li>)}
            </ul>
          </TabsContent>
        </Tabs>
      </section>

      <section className={styles.contact} aria-labelledby="contact">
        <InViewTitle as="h2" id="contact" text="Have something to build?" className={styles.contactTitle} />
        <div className={styles.actions}>
          <a className={styles.primary} href={`mailto:${email}`}><Mail size={16} strokeWidth={1.75} aria-hidden="true" />{email}</a>
          <CopyButton value={email} label="Copy" />
        </div>
        <nav aria-label="Elsewhere" className={styles.links}>
          {links.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>)}
        </nav>
      </section>
    </main>
  );
}
