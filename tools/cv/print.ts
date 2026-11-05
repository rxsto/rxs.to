import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PDFDocument, PDFName, PDFString, type PDFDict } from 'pdf-lib';
import { CvDocument } from '../../shared/cv/CvDocument';
import type { Cv } from '../../shared/cv/model';

const read = (path: string) => readFileSync(new URL(path, import.meta.url));

const pdfOptions = { format: 'A4', preferCSSPageSize: true, tagged: true, outline: false, printBackground: false } as const;
/** Full Chrome for Testing. The default headless shell wraps the Profile paragraph differently from the reviewed PDF. */
const browserChannel = 'chromium';

const fonts = [
  { file: 'SourceSerif4-Regular.ttf', weight: 400, style: 'normal' },
  { file: 'SourceSerif4-Semibold.ttf', weight: 600, style: 'normal' },
  { file: 'SourceSerif4-Italic.ttf', weight: 400, style: 'italic' },
];

/** The standalone print document: CvDocument's markup, print.css and the fonts as data URIs. */
export function printHtml(cv: Cv): string {
  const fontFaces = fonts.map(({ file, weight, style }) =>
    `@font-face { font-family: "CV Serif"; src: url(data:font/ttf;base64,${read(`fonts/${file}`).toString('base64')}) format("truetype"); font-weight: ${weight}; font-style: ${style}; }`);
  const css = [...fontFaces, read('print.css').toString('utf8')].join('\n');
  const body = renderToStaticMarkup(createElement(CvDocument, { cv }));
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>${cv.meta.documentTitle}</title>\n<meta name="author" content="${cv.name}">\n<style>\n${css}</style>\n</head>\n<body>\n${body}\n</body>\n</html>\n`;
}

function pdfInfo(cv: Cv) {
  return {
    title: cv.meta.documentTitle,
    author: cv.name,
    subject: cv.meta.description,
    keywords: cv.meta.keywords.join(', '),
    creator: cv.name,
    date: `${cv.meta.asOf}T00:00:00Z`,
  };
}

/** Hash of everything the PDF is made from, stamped into it as /CVSource. Not the browser build: an upgrade does not make a PDF stale. */
export function printSource(cv: Cv): string {
  return createHash('sha256').update(JSON.stringify([printHtml(cv), pdfOptions, browserChannel, pdfInfo(cv)])).digest('hex');
}

const infoDict = (doc: PDFDocument) => doc.context.lookup(doc.context.trailerInfo.Info) as PDFDict;

export async function renderPdf(cv: Cv): Promise<Uint8Array> {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ channel: browserChannel });
  try {
    const page = await browser.newPage();
    await page.setContent(printHtml(cv), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const raw = await page.pdf(pdfOptions);
    const doc = await PDFDocument.load(raw, { updateMetadata: false });
    const info = pdfInfo(cv);
    doc.setTitle(info.title);
    doc.setAuthor(info.author);
    doc.setSubject(info.subject);
    doc.setKeywords([info.keywords]);
    doc.setCreator(info.creator);
    doc.setCreationDate(new Date(info.date));
    doc.setModificationDate(new Date(info.date));
    infoDict(doc).set(PDFName.of('CVSource'), PDFString.of(printSource(cv)));
    return await doc.save({ useObjectStreams: false });
  } finally {
    await browser.close();
  }
}

export async function readPdfStamp(pdf: Uint8Array): Promise<{ source: string | undefined; pages: number }> {
  const doc = await PDFDocument.load(pdf, { updateMetadata: false });
  const source = infoDict(doc).get(PDFName.of('CVSource'));
  return { source: source instanceof PDFString ? source.decodeText() : undefined, pages: doc.getPageCount() };
}
