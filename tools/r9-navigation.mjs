import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
import assert from 'node:assert/strict';
/* global window, document, sessionStorage, performance, requestAnimationFrame, getComputedStyle, console */
const dir = process.env.EVIDENCE_DIR ?? '.compare/r9';
const siteOrigin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch();
const runs = [];
try {
  for (let i = 0; i < 5; i++) {
    const page = await browser.newPage();
    await page.addInitScript(() => {
      document.addEventListener('click', event => {
        if (event.target.closest('a')?.pathname === '/hydra') sessionStorage.setItem('clicked', String(performance.timeOrigin + performance.now()));
      }, true);
    });
    const errors = [];
    const prefetches = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().includes('/hydra') && response.request().resourceType() === 'fetch') prefetches.push({url:response.url(),status:response.status()}); });
    assert.equal((await page.goto(siteOrigin)).status(), 200);
    await page.waitForTimeout(1200);
    const origin = await page.evaluate(() => { window.navigationSentinel = true; return performance.timeOrigin; });
    let documents = 0;
    page.on('request', request => { if (request.isNavigationRequest()) documents++; });
    await page.getByRole('link', { name: 'Hydra', exact: true }).click();
    await page.waitForURL('**/hydra');
    await page.locator('#project-title').waitFor();
    const result = await page.evaluate(async previousOrigin => {
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const clicked = Number(sessionStorage.getItem('clicked'));
      const paint = performance.getEntriesByName('first-contentful-paint')[0];
      return { clientNavigation: window.navigationSentinel === true, sameTimeOrigin: performance.timeOrigin === previousOrigin,
        clickToPaintMs: performance.timeOrigin === previousOrigin ? performance.timeOrigin + performance.now() - clicked : performance.timeOrigin + paint.startTime - clicked,
        pseudoAnimationDuration: getComputedStyle(document.documentElement, '::view-transition-group(root)').animationDuration,
        activePageAnimations: document.getAnimations().filter(animation => animation.effect?.pseudoElement?.startsWith('::view-transition')).length };
    }, origin);
    assert.equal(await page.locator('#project-title').innerText(), 'Hydra');
    const forwardDocuments = documents;
    await page.goBack();
    await page.waitForURL(`${siteOrigin}/`);
    await page.locator('#card-hydra').waitFor();
    assert.deepEqual(errors, []);
    runs.push({ ...result, forwardDocuments, roundTripDocuments: documents, prefetches, errors, backCorrect: true });
    await page.close();
  }
} finally { await browser.close(); }
await writeFile(`${dir}/navigation-${process.argv[2]}.json`, JSON.stringify(runs, null, 2));
console.log(runs);
