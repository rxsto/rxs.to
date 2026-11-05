import { spawnSync } from 'node:child_process';
import { mkdirSync, renameSync, writeFileSync } from 'node:fs';
import { cv } from '../../shared/cv/content';
import { printHtml, printSource, renderPdf } from './print';

const work = '.cv-print';
const html = `${work}/cv.html`;
const candidate = `${work}/cv.pdf`;
const published = 'public/cv.pdf';
const checker = [
  'run', '-q', '--no-project',
  '--with', 'pypdf==6.21.4', '--with', 'pdfminer.six==20260107', '--with', 'pdfplumber==0.11.10',
  '--with', 'pymupdf==2.1', '--with', 'beautifulsoup4==4.15.0',
  'python', '-I', 'tools/cv/check.py', html, candidate,
];

mkdirSync(work, { recursive: true });
writeFileSync(html, printHtml(cv));
writeFileSync(candidate, await renderPdf(cv));

const check = spawnSync('uv', checker, { stdio: 'inherit' });
if (check.error || check.status !== 0) {
  console.error(`cv:pdf: check failed${check.error ? ` (${check.error.message})` : ''}; ${published} left unchanged, candidate kept at ${candidate}`);
  process.exit(1);
}
renameSync(candidate, published);
console.log(`cv:pdf: wrote ${published} (source ${printSource(cv).slice(0, 12)})`);
