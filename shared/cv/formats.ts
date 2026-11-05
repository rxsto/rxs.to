import {
  contactItems, cvSections, engagementLabel, engagementSummary, languagesText, periodLabel, qualificationLabel, skillRowText,
  type Cv, type CvDate, type CvSectionId, type Period,
} from './model';

/** JSON Resume dates keep the CV's precision. Ongoing entries omit endDate; a single date is an endDate. */
function jsonResumeDates(period: Period): { startDate?: CvDate; endDate?: CvDate } {
  if ('on' in period) return { endDate: period.on };
  return period.end === 'present' ? { startDate: period.start } : { startDate: period.start, endDate: period.end };
}

/** JSON Resume v1.0.0. Contract work keeps "(contract)" in position; the schema has no engagement-type field. */
export function toJsonResume(cv: Cv, canonical: string) {
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: cv.name,
      label: cv.label,
      email: cv.email,
      url: cv.website,
      summary: cv.summary,
      location: { city: cv.location.city, countryCode: cv.location.countryCode },
      profiles: cv.profiles.map(p => ({ network: p.network, username: p.username, url: p.url })),
    },
    work: cv.experience.map(e => ({
      name: e.org,
      position: engagementLabel(e),
      ...(e.url && { url: e.url }),
      ...jsonResumeDates(e.period),
      summary: engagementSummary(e),
      highlights: [...(e.highlights ?? [])],
    })),
    volunteer: cv.volunteering.map(v => ({ organization: v.org, position: v.title, ...jsonResumeDates(v.period), summary: v.summary })),
    education: cv.education.map(s => ({
      institution: s.institution,
      ...(s.qualification.kind === 'unfinished'
        ? { area: s.qualification.area, studyType: 'No degree' }
        : { studyType: s.qualification.title }),
      ...jsonResumeDates(s.period),
    })),
    awards: cv.experience.flatMap(e => (e.award ? [{ title: e.award.title, date: e.award.date, awarder: e.award.awarder, summary: e.org }] : [])),
    skills: cv.skills.map(row => ({ name: row.name, keywords: row.groups.flat() })),
    languages: cv.languages.map(l => ({ language: l.language, fluency: l.fluency })),
    meta: { canonical, version: 'v1.0.0', lastModified: cv.meta.asOf },
  };
}

export function toMarkdown(cv: Cv): string {
  const entry = (org: string, label: string, period: Period, summary?: string, highlights: readonly string[] = []) =>
    [`### ${org}, ${label} · ${periodLabel(period)}`, summary, highlights.map(h => `- ${h}`).join('\n')].filter(Boolean).join('\n\n');
  const body: Record<CvSectionId, string> = {
    profile: cv.summary,
    experience: cv.experience.map(e => entry(e.org, engagementLabel(e), e.period, engagementSummary(e), e.highlights)).join('\n\n'),
    education: cv.education.map(s => entry(s.institution, qualificationLabel(s.qualification), s.period, s.summary)).join('\n\n'),
    volunteering: cv.volunteering.map(v => entry(v.org, v.title, v.period, v.summary)).join('\n\n'),
    skills: [...cv.skills.map(row => `- **${row.name}:** ${skillRowText(row)}`), `- **Languages:** ${languagesText(cv.languages)}`].join('\n'),
  };
  const contact = contactItems(cv).map(item => (item.href ? `[${item.text}](${item.href})` : item.text)).join(' · ');
  return [`# ${cv.name}`, contact, ...cvSections.map(s => `## ${s.title}\n\n${body[s.id]}`)].join('\n\n') + '\n';
}
