type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type Year = `${'19' | '20'}${Digit}${Digit}`;
export type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
type Day = `${'0' | '1' | '2'}${Digit}` | '30' | '31';
/** A year ("2020") or a year and month ("2026-02"). The precision is what the CV shows. */
export type CvDate = Year | `${Year}-${Month}`;

export type Span = { start: CvDate; end: CvDate | 'present' };
export type Period = Span | { on: CvDate };

export interface Award { title: string; date: CvDate; awarder: string }

export interface Engagement {
  org: string;
  /** Never write "(contract)" here: it is derived from `relationship`. */
  title: string;
  relationship: 'venture' | 'contract';
  period: Span;
  url?: string;
  summary: string;
  highlights?: readonly string[];
  /** Rendered after the summary as "{date} {title}." and emitted as a JSON Resume award. */
  award?: Award;
}

export interface Volunteering { org: string; title: string; period: Span; summary: string }

export type Qualification = { kind: 'unfinished'; area: string } | { kind: 'awarded'; title: string };

export interface Study { institution: string; qualification: Qualification; period: Period; summary?: string }

export interface SkillRow { name: string; groups: readonly (readonly string[])[] }
export interface Language { language: string; fluency: string }
export interface Profile { network: string; username: string; url: string }

export interface Cv {
  name: string;
  label: string;
  location: { city: string; country: string; countryCode: string };
  email: string;
  website: string;
  profiles: readonly Profile[];
  summary: string;
  experience: readonly Engagement[];
  education: readonly Study[];
  volunteering: readonly Volunteering[];
  skills: readonly SkillRow[];
  languages: readonly Language[];
  meta: {
    /** The day the claims were last checked. Also the PDF's dates, which keeps the PDF reproducible. */
    asOf: `${Year}-${Month}-${Day}`;
    documentTitle: string;
    description: string;
    keywords: readonly string[];
  };
}

export const cvSections = [
  { id: 'profile', title: 'Profile' },
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'volunteering', title: 'Volunteering' },
  { id: 'skills', title: 'Skills' },
] as const;
export type CvSectionId = (typeof cvSections)[number]['id'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function dateLabel(date: CvDate): string {
  const [year, month] = date.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function periodEnds(period: Period): (CvDate | 'present')[] {
  return 'on' in period ? [period.on] : [period.start, period.end];
}

export function periodLabel(period: Period): string {
  return periodEnds(period).map(end => (end === 'present' ? end : dateLabel(end))).join(' – ');
}

export function isOngoing(period: Period): boolean {
  return 'end' in period && period.end === 'present';
}

export function engagementLabel(engagement: Engagement): string {
  return engagement.relationship === 'contract' ? `${engagement.title} (contract)` : engagement.title;
}

export function qualificationLabel(qualification: Qualification): string {
  return qualification.kind === 'unfinished' ? `${qualification.area} (no degree)` : qualification.title;
}

export function engagementSummary(engagement: Engagement): string {
  const { summary, award } = engagement;
  return award ? `${summary} ${award.date} ${award.title}.` : summary;
}

export function skillRowText(row: SkillRow): string {
  return row.groups.map(group => group.join(', ')).join('; ');
}

export function languagesText(languages: readonly Language[]): string {
  return languages.map(l => `${l.language} (${l.fluency})`).join(', ');
}

export function contactItems(cv: Cv): { text: string; href?: string }[] {
  const bare = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return [
    { text: `${cv.location.city}, ${cv.location.country}` },
    { text: cv.email, href: `mailto:${cv.email}` },
    { text: bare(cv.website), href: cv.website },
    ...cv.profiles.map(p => ({ text: bare(p.url), href: p.url })),
  ];
}
