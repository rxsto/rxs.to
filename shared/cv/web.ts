import type { Metadata } from 'next';
import { jsonLd, pageMetadata, site, websiteNode } from '../site';
import { cv } from './content';
import { toJsonResume, toMarkdown } from './formats';
import type { Cv } from './model';

const { origin } = site;
const pageUrl = `${origin}/cv`;

/** The CV's downloads. Drives the page's download links, its alternate links and the JSON-LD encodings. */
export const cvVariants = [
  { path: '/cv.pdf', mediaType: 'application/pdf', label: 'PDF', download: 'Oskar-Lang-CV.pdf' },
  { path: '/cv.json', mediaType: 'application/json', label: 'JSON Resume', format: 'json' },
  { path: '/cv.md', mediaType: 'text/markdown', label: 'Markdown', format: 'markdown' },
] as const;

type Variant = (typeof cvVariants)[number];
export type CvFormat = Extract<Variant, { format: string }>['format'];

const render: Record<CvFormat, (url: string) => string> = {
  json: url => `${JSON.stringify(toJsonResume(cv, url), null, 2)}\n`,
  markdown: () => toMarkdown(cv),
};

/** The whole body of a CV route handler. The page at /cv is canonical for every format. */
export function cvResponse(format: CvFormat): Response {
  const variant = cvVariants.find((v): v is Extract<Variant, { format: CvFormat }> => 'format' in v && v.format === format)!;
  return new Response(render[format](`${origin}${variant.path}`), {
    headers: {
      'content-type': `${variant.mediaType}; charset=utf-8`,
      link: `<${pageUrl}>; rel="canonical"`,
      'cache-control': 'public, max-age=3600',
      'access-control-allow-origin': '*',
    },
  });
}

const labels = cvVariants.map(v => v.label);

export const cvMetadata: Metadata = pageMetadata({
  path: '/cv',
  title: `${cv.name} — CV`,
  description: `CV of ${cv.name}, ${cv.label.toLowerCase()} in ${cv.location.city}, ${cv.location.country}. Also as ${labels.slice(0, -1).join(', ')} and ${labels.at(-1)}.`,
  types: Object.fromEntries(cvVariants.map(v => [v.mediaType, v.path])),
});

/** ProfilePage about the Person. Clients are never employers, so no worksFor, memberOf or employer. */
export function profilePageGraph(cv: Cv): object[] {
  const personId = `${origin}/#person`;
  return [
    websiteNode,
    {
      '@id': `${pageUrl}#profilepage`, '@type': 'ProfilePage', url: pageUrl, name: cv.meta.documentTitle, inLanguage: 'en',
      dateModified: cv.meta.asOf,
      isPartOf: { '@id': websiteNode['@id'] },
      mainEntity: { '@id': personId },
      encoding: cvVariants.map(v => ({ '@type': 'MediaObject', name: v.label, contentUrl: `${origin}${v.path}`, encodingFormat: v.mediaType })),
    },
    {
      '@id': personId, '@type': 'Person', name: cv.name, url: `${origin}/`, email: cv.email, jobTitle: cv.label, description: cv.summary,
      address: { '@type': 'PostalAddress', addressLocality: cv.location.city, addressCountry: cv.location.countryCode },
      sameAs: cv.profiles.map(p => p.url),
      knowsLanguage: cv.languages.map(l => ({ '@type': 'Language', name: l.language })),
      knowsAbout: cv.skills.flatMap(row => row.groups.flat()),
      alumniOf: cv.education.flatMap(s => (s.qualification.kind === 'awarded' ? [{ '@type': 'EducationalOrganization', name: s.institution }] : [])),
    },
  ];
}

export const cvJsonLd = jsonLd(profilePageGraph(cv));
