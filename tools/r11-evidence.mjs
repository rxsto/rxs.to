import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
import assert from 'node:assert/strict';
/* global document, getComputedStyle */
const directory = process.env.EVIDENCE_DIR ?? '.compare/r11';
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
for (const folder of ['', '/intro-options', '/button-options', '/crops']) await mkdir(directory + folder, { recursive: true });
const browser = await chromium.launch();
const measurements = [];
try {
  for (const width of [1280, 390]) for (const colorScheme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, deviceScaleFactor: 2 });
    await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 7, description: 'Clouds', conditionCode: 803 } }));
    for (const path of ['/soundcloud', '/digital-office-24', '/']) {
      await page.goto(origin + path);
      await page.locator('[data-condition="clouds"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) await image.evaluate(img => img.decode());
      await page.screenshot({ path: `${directory}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
      if (path !== '/') {
        await page.locator('dl').screenshot({ path: `${directory}/crops/${path.slice(1)}-facts-2x-${width}-${colorScheme}.png` });
        const icons = await page.locator('[class*="stackIcon"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).maskImage));
        assert.ok(icons.length > 0 && icons.every(icon => icon.includes('/stack/')));
        for (const icon of icons) assert.equal((await page.request.get(icon.match(/url\("?([^")]+)/)[1])).status(), 200);
      }
    }
    await page.locator('header').screenshot({ path: `${directory}/crops/intro-2x-${width}-${colorScheme}.png` });
    await page.locator('header').screenshot({ path: `${directory}/intro-options/icons-${width}-${colorScheme}.png` });
    const style = await page.addStyleTag({ content: 'header p svg { display: none !important; }' });
    await page.locator('header').screenshot({ path: `${directory}/intro-options/colour-only-${width}-${colorScheme}.png` });
    await style.evaluate(node => node.remove());
    measurements.push(await page.evaluate(() => {
      const identity = document.querySelector('header > div');
      const avatar = identity.querySelector('img').getBoundingClientRect();
      const text = identity.querySelector('div').getBoundingClientRect();
      return { width: document.documentElement.clientWidth, avatar: avatar.height, text: text.height, delta: Math.abs(avatar.y - text.y), buttonHeight: document.querySelector('header a').getBoundingClientRect().height };
    }));
    await page.evaluate(() => {
      const actions = document.querySelector('[class*="heroActions"]');
      const comparison = document.createElement('div');
      comparison.dataset.buttonComparison = '';
      comparison.style.cssText = 'display:flex;gap:24px;align-items:start;padding:16px 0;';
      for (const [label, larger] of [['Current · 40px', true], ['Smaller · 36px', false]]) {
        const column = document.createElement('div');
        const caption = document.createElement('p'); caption.textContent = label; caption.style.cssText = 'font-size:12px;margin:0 0 12px';
        const clone = actions.cloneNode(true); clone.style.cssText = 'margin:0;gap:8px';
        if (larger) for (const link of clone.querySelectorAll('a')) link.style.cssText = 'min-height:var(--control-height-md);padding-inline:var(--space-4)';
        column.append(caption, clone); comparison.append(column);
      }
      actions.replaceWith(comparison);
    });
    await page.locator('[data-button-comparison]').screenshot({ path: `${directory}/button-options/current-and-smaller-${width}-${colorScheme}.png` });
    await page.close();
  }
  await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2));
} finally { await browser.close(); }
