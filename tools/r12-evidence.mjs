import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
import assert from 'node:assert/strict';
/* global document */
const directory = process.env.EVIDENCE_DIR ?? '.compare/r12';
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
for (const folder of ['', '/intro-options', '/period-options', '/crops']) await mkdir(directory + folder, { recursive: true });
const browser = await chromium.launch();
const measurements = [];
try {
  for (const width of [1280, 390]) for (const colorScheme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, deviceScaleFactor: 2 });
    await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 7, description: 'Clouds', conditionCode: 803 } }));
    for (const path of ['/', '/soundcloud', '/digital-office-24', '/cv']) {
      await page.goto(origin + path);
      await page.locator('[data-condition="clouds"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) await image.evaluate(img => img.decode());
      await page.screenshot({ path: `${directory}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
      if (path === '/') {
        await page.locator('header').screenshot({ path: `${directory}/intro-options/duotone-${width}-${colorScheme}.png` });
        const solid = await page.addStyleTag({ content: 'header p svg { fill: currentColor !important; stroke-width: 1.5 !important; }' });
        await page.locator('header').screenshot({ path: `${directory}/intro-options/filled-${width}-${colorScheme}.png` });
        await solid.evaluate(node => node.remove());
      }
      if (path === '/soundcloud' || path === '/digital-office-24') {
        const stack = page.getByRole('list', { name: 'Technologies' });
        const icons = await stack.locator('[aria-label]').evaluateAll(nodes => nodes.map(node => ({ name: node.getAttribute('aria-label'), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
        measurements.push({ path, width, colorScheme, icons });
        const trigger = stack.locator('[tabindex]').first();
        await trigger.hover();
        await page.getByRole('tooltip').waitFor();
        assert.equal(await page.getByRole('tooltip').innerText(), await trigger.getAttribute('aria-label'));
        await page.waitForTimeout(400);
        const box = await page.locator('dl').boundingBox();
        await page.screenshot({ path: `${directory}/crops/${path.slice(1)}-stack-tooltip-2x-${width}-${colorScheme}.png`, clip: { x: box.x, y: box.y - 12, width: box.width, height: box.height + 24 } });
        await page.mouse.move(0, 0);
        await page.keyboard.press('Escape');
        await page.getByRole('tooltip').waitFor({ state: 'hidden' });
        await page.waitForTimeout(250);
      }
      if (path === '/soundcloud') {
        await page.locator('dl').screenshot({ path: `${directory}/period-options/connected-dates-${width}-${colorScheme}.png` });
        await page.evaluate(() => {
          const period = document.querySelector('[class*="period_"]');
          period.dataset.option = 'bar';
          period.innerHTML = '<span>2021 to now</span><span style="display:block;inline-size:10rem;block-size:3px;background:var(--border);margin-block-start:8px"><span style="display:block;margin-inline-start:37.5%;inline-size:62.5%;block-size:100%;background:var(--foreground)"></span></span><span style="display:flex;justify-content:space-between;font-size:11px;margin-block-start:4px"><span>2018</span><span>2026</span></span>';
          period.style.display = 'block';
          period.style.inlineSize = '10rem';
        });
        await page.locator('dl').screenshot({ path: `${directory}/period-options/shared-axis-${width}-${colorScheme}.png` });
      }
    }
    await page.close();
  }
  await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2));
} finally { await browser.close(); }
