import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cv } from '../shared/cv/content.ts';
import { isOngoing, periodEnds, type Period } from '../shared/cv/model.ts';
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
