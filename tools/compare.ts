import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const baseline = process.env.BASELINE_URL ?? 'http://127.0.0.1:4300';
const target = process.env.TARGET_URL ?? 'http://127.0.0.1:4301';
const directory = '.compare';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const [name, url] of [['baseline', baseline], ['vinext', target]]) {
    for (const width of [1440, 390]) {
      for (const colorScheme of ['light', 'dark'] satisfies ('light' | 'dark')[]) {
        const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1300 : 1400 }, colorScheme });
        const page = await context.newPage();
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 18, description: 'Clear' } }));
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.getByText('Kufstein, 18° clear', { exact: true }).waitFor();
        await page.evaluate(async () => { await document.fonts.ready; await Promise.all(Array.from(document.images).map(img => img.decode())); });
        await page.screenshot({ path: `${directory}/${name}-${width === 1440 ? 'desktop' : 'phone'}-${colorScheme}.png`, fullPage: true });
        const data = await page.evaluate(() => ({
          title: document.title,
          text: document.querySelector('main')?.textContent?.replace(/\s+/g, ' ').trim(),
          meta: Array.from(document.head.querySelectorAll('meta, link[rel="canonical"]')).map(e => e.outerHTML),
          schema: document.querySelector('script[type="application/ld+json"]')?.textContent,
          links: Array.from(document.querySelectorAll('a')).map(e => ({ href: e.href, target: e.target, rel: e.rel })),
          boxes: Array.from(document.querySelectorAll('main, h1, h2, footer, a[target="_blank"]')).map(e => ({ text: e.textContent?.replace(/\s+/g, ' ').trim(), box: e.getBoundingClientRect().toJSON() })),
          overflow: document.documentElement.scrollWidth > innerWidth,
        }));
        assert.equal(data.overflow, false, `${name} ${width} overflows`);
        assert.deepEqual(errors, [], `${name} browser errors`);
        results.push({ name, width, colorScheme, ...data, errors });
        if (width === 1440 && colorScheme === 'light') {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          const card = page.getByRole('link', { name: /SoundCloud Bot/ });
          assert.equal(await card.evaluate(e => e.matches(':focus-visible')), true);
          await page.waitForTimeout(180);
          await page.screenshot({ path: `${directory}/${name}-desktop-focus.png`, fullPage: true });
          const motion = await card.evaluate(e => ({ transform: getComputedStyle(e).transform, border: getComputedStyle(e, '::before').opacity }));
          await page.emulateMedia({ reducedMotion: 'reduce' });
          await page.screenshot({ path: `${directory}/${name}-desktop-reduced-focus.png`, fullPage: true });
          const reduced = await card.evaluate(e => ({ transform: getComputedStyle(e).transform, border: getComputedStyle(e, '::before').opacity }));
          assert.equal(reduced.transform, 'none');
          assert.equal(reduced.border, '1');
          results.push({ name, motion, reduced });
        }
        await context.close();
      }
    }
  }
  const baselineResults = results.filter(result => result.name === 'baseline' && 'width' in result);
  const targetResults = results.filter(result => result.name === 'vinext' && 'width' in result);
  for (let index = 0; index < baselineResults.length; index++) {
    const source = baselineResults[index];
    const port = targetResults[index];
    if (!('meta' in source) || !('meta' in port)) throw new Error('Missing page results');
    assert.equal(port.title, source.title);
    assert.deepEqual([...port.meta].sort(), [...source.meta].sort());
    assert.deepEqual(JSON.parse(port.schema ?? '{}'), JSON.parse(source.schema ?? '{}'));
    assert.deepEqual(port.links, source.links);
    assert.equal(port.boxes.length, source.boxes.length);
    for (let box = 0; box < source.boxes.length; box++) {
      for (const axis of ['x', 'y', 'width', 'height']) {
        assert.ok(Math.abs(port.boxes[box].box[axis] - source.boxes[box].box[axis]) < 1, `Layout differs at ${index}, ${box}, ${axis}`);
      }
    }
  }
  await writeFile(`${directory}/browser-results.json`, JSON.stringify(results, null, 2));
  console.log('Saved six baseline/vinext screenshot pairs; no page errors or horizontal overflow; focus and reduced motion passed. Weather fixed to Kufstein, 18° clear for visual comparison.');
} finally {
  await browser.close();
}
