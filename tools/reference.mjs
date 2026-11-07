import { chromium } from 'playwright';
import process from 'node:process';
import { mkdir, writeFile } from 'node:fs/promises';
const directory = process.env.EVIDENCE_DIR ?? '.compare/reference';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const [path, name] of [['/', 'home'], ['/writing/less-is-more', 'article']]) {
    await page.goto(`https://jakub.kr${path}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${directory}/reference-${name}.png`, fullPage: true });
    await writeFile(`${directory}/reference-${name}.txt`, await page.locator('body').innerText());
  }
  await page.goto(process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187/');
  await writeFile(`${directory}/home-copy.txt`, await page.locator('main').innerText());
} finally { await browser.close(); }
