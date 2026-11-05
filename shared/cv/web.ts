import { cv } from './content';
import { toJsonResume, toMarkdown } from './formats';

const origin = 'https://rxs.to';

/** The CV's downloads. Drives the page's download links, its alternate links and the JSON-LD encodings. */
export const cvVariants = [
  { path: '/cv.pdf', mediaType: 'application/pdf', label: 'PDF' },
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
      link: `<${origin}/cv>; rel="canonical"`,
      'cache-control': 'public, max-age=3600',
      'access-control-allow-origin': '*',
    },
  });
}
