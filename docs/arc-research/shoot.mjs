import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// rs01 is shared: only one browser run machine-wide, at lower priority.
if (!process.env.SHOOT_LOCKED) {
  const run = spawnSync(
    'flock',
    ['/home/dev/.browser-test.lock', 'nice', '-n', '10', process.execPath, fileURLToPath(import.meta.url), ...process.argv.slice(2)],
    { stdio: 'inherit', env: { ...process.env, SHOOT_LOCKED: '1' } },
  );
  process.exit(run.status ?? 1);
}

const require = createRequire('/home/dev/worktrees/rxs.to/spike-arc/package.json');
const { chromium } = require('playwright');

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node shoot.mjs <url> <outDir>');
  process.exit(2);
}
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const report = { url };

async function capture(name, viewport, colorScheme) {
  const context = await browser.newContext({ viewport, colorScheme, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const bytes = { script: 0, stylesheet: 0, font: 0, image: 0, other: 0 };
  page.on('response', async response => {
    const type = response.request().resourceType();
    const length = Number(response.headers()['content-length'] || 0);
    bytes[type in bytes ? type : 'other'] += length;
  });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error.message).slice(0, 200)));
  let status = null;
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    status = response?.status() ?? null;
  } catch (error) {
    errors.push(`goto: ${String(error.message).slice(0, 200)}`);
  }
  await page.waitForTimeout(2500);
  await page.screenshot({ path: join(out, `${name}-fold.png`) });
  const info = await page.evaluate(() => {
    const font = el => (el ? getComputedStyle(el).fontFamily.split(',')[0].trim() : null);
    return {
      title: document.title,
      finalUrl: location.href,
      height: document.documentElement.scrollHeight,
      headingFont: font(document.querySelector('h1, h2')),
      bodyFont: font(document.body),
      background: getComputedStyle(document.body).backgroundColor,
      runningAnimations: document.getAnimations().length,
    };
  });
  const frames = [];
  for (const fraction of [0.25, 0.5, 0.75]) {
    await page.evaluate(f => window.scrollTo({ top: document.documentElement.scrollHeight * f, behavior: 'instant' }), fraction);
    await page.waitForTimeout(1200);
    const file = `${name}-scroll${Math.round(fraction * 100)}.png`;
    await page.screenshot({ path: join(out, file) });
    frames.push(file);
  }
  report[name] = { status, ...info, bytes, errors, frames };
  await context.close();
}

await capture('desktop-light', { width: 1440, height: 900 }, 'light');
await capture('desktop-dark', { width: 1440, height: 900 }, 'dark');
await capture('mobile', { width: 390, height: 844 }, 'light');
await browser.close();
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ url, out, status: report['desktop-light'].status, title: report['desktop-light'].title }));
