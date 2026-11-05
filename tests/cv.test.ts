import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Validator } from '@cfworker/json-schema';
import { cv } from '../shared/cv/content.ts';
import { CvDocument } from '../shared/cv/CvDocument.tsx';
import { toJsonResume, toMarkdown } from '../shared/cv/formats.ts';
import { engagementSummary, isOngoing, periodEnds, type Cv, type Period } from '../shared/cv/model.ts';
import { cvResponse, cvVariants } from '../shared/cv/web.ts';
import { printSource, readPdfStamp } from '../tools/cv/print.ts';

test('public/cv.pdf matches the CV source', async () => {
  const { source, pages } = await readPdfStamp(readFileSync('public/cv.pdf'));
  assert.equal(pages, 1);
  assert.ok(source === printSource(cv), 'public/cv.pdf is stale: run pnpm cv:pdf, then commit public/cv.pdf');
});

test('CV text uses only characters the PDF extractors read back', () => {
  const allowed = /^[\x20-\x7e·–“”üÜäÄöÖß]*$/;
  const walk = (value: unknown): string[] =>
    typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(walk) : [];
  for (const text of walk(cv)) {
    assert.ok(!text.includes("'"), `apostrophe in ${JSON.stringify(text)}`);
    assert.match(text, allowed);
  }
});

test('periods run forward and ongoing entries come first', () => {
  const periods: Period[] = [...cv.experience, ...cv.education, ...cv.volunteering].map(entry => entry.period);
  for (const period of periods) {
    const [start, end] = periodEnds(period);
    if (end && end !== 'present') assert.ok(start <= end, `${start} – ${end} runs backwards`);
  }
  for (const entries of [cv.experience, cv.volunteering]) {
    const firstEnded = entries.findIndex(entry => !isOngoing(entry.period));
    if (firstEnded >= 0) assert.ok(entries.slice(firstEnded).every(entry => !isOngoing(entry.period)), 'an ongoing entry follows an ended one');
  }
});

const resume = () => toJsonResume(cv, 'https://rxs.to/cv.json');

test('/cv.json is valid JSON Resume v1.0.0', () => {
  const schema = JSON.parse(readFileSync('tools/cv/json-resume-1.0.0.schema.json', 'utf8'));
  const result = new Validator(schema, '4', false).validate(JSON.parse(JSON.stringify(resume())));
  assert.deepEqual(result.errors, []);
});

test('JSON Resume keeps contract, degree, date and award facts', () => {
  const { work, education, awards } = resume();
  const soundcloud = work.find(w => w.name === 'SoundCloud');
  assert.deepEqual(soundcloud && { position: soundcloud.position, startDate: soundcloud.startDate, ended: 'endDate' in soundcloud },
    { position: 'Engineer and project lead (contract)', startDate: '2021', ended: false });
  assert.equal(work.find(w => w.name === 'Digital Office 24')?.startDate, '2026-02');
  assert.deepEqual(education[0], { institution: 'University of Passau', area: 'Computer Science', studyType: 'No degree', startDate: '2020', endDate: '2021' });
  assert.deepEqual(awards, [{ title: 'Webby Honoree', date: '2023', awarder: 'The Webby Awards', summary: '“Hey, Netflix” Discord bot' }]);
  for (const item of work) assert.deepEqual(Object.keys(item).filter(k => !['name', 'position', 'url', 'startDate', 'endDate', 'summary', 'highlights'].includes(k)), []);
});

test('the page markup and the Markdown carry every CV sentence', () => {
  const html = renderToStaticMarkup(createElement(CvDocument, { cv }));
  const markdown = toMarkdown(cv);
  const source: Cv = cv;
  const sentences = [
    source.summary,
    ...source.experience.flatMap(e => [engagementSummary(e), ...(e.highlights ?? [])]),
    ...source.education.flatMap(s => (s.summary ? [s.summary] : [])),
    ...source.volunteering.map(v => v.summary),
  ];
  const escape = (text: string) => text.replace(/&/g, '&amp;');
  for (const sentence of sentences) {
    assert.ok(html.includes(escape(sentence)), `page is missing ${JSON.stringify(sentence)}`);
    assert.ok(markdown.includes(sentence), `Markdown is missing ${JSON.stringify(sentence)}`);
  }
  assert.ok(html.includes('2023 Webby Honoree.') && markdown.includes('2023 Webby Honoree.'));
});

test('CV routes serve their format with canonical, cache and CORS headers', async () => {
  for (const variant of cvVariants) {
    if (!('format' in variant)) continue;
    assert.ok(existsSync(`app${variant.path}/route.ts`), `app${variant.path}/route.ts serves ${variant.path}`);
    const response = cvResponse(variant.format);
    assert.equal(response.headers.get('content-type'), `${variant.mediaType}; charset=utf-8`);
    assert.equal(response.headers.get('link'), '<https://rxs.to/cv>; rel="canonical"');
    assert.equal(response.headers.get('cache-control'), 'public, max-age=3600');
    assert.equal(response.headers.get('access-control-allow-origin'), '*');
    assert.ok((await response.text()).length > 0);
  }
  assert.equal(JSON.parse(await cvResponse('json').text()).meta.canonical, 'https://rxs.to/cv.json');
});
