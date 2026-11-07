import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const directory = '/home/dev/worktrees/rxs.to/evidence-climb/r2';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const [path, name] of [['/', 'home'], ['/writing/less-is-more', 'article']]) {
    await page.goto(`https://jakub.kr${path}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${directory}/reference-${name}.png`, fullPage: true });
    await writeFile(`${directory}/reference-${name}.txt`, await page.locator('body').innerText());
  }
  await page.goto('http://127.0.0.1:5187/');
  await writeFile(`${directory}/home-copy.txt`, await page.locator('main').innerText());
} finally { await browser.close(); }
