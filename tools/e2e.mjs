import { chromium } from 'playwright';
import process from 'node:process';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

/* global document, innerWidth, scrollY, scrollTo, getComputedStyle, addEventListener, sessionStorage */

const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
const directory = process.env.EVIDENCE_DIR ?? '.compare/e2e';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const width of [1280, 390]) for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme, timezoneId: 'Europe/Vienna' });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/api/weather', route => route.fulfill({ status: 502, body: '{}' }));
    for (const path of ['/', '/hydra', '/hey-netflix', '/soundcloud', '/cv']) {
      assert.equal((await page.goto(`${origin}${path}`)).status(), 200);
      await page.waitForTimeout(600);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(element => element.decode());
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(300);
      assert.ok((await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily)).includes('Inter'));
      assert.equal(await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).length), 0, `${path} missing images`);
      await page.screenshot({ path: `${directory}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path} overflow`);
      assert.equal(await page.getByRole('link', { name: 'Twitter', exact: true }).count(), 1);
      assert.equal(await page.locator('h1').count(), 1);
      const levels = await page.locator('h1,h2,h3,h4').evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
      for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1, `${path} skipped heading level`);
      for (const link of await page.locator('a[href="/hydra"],a[href="/soundcloud"],a[href="/hey-netflix"]').all()) assert.fail(`project link missing #work: ${await link.getAttribute('href')}`);
      if (path === '/') {
        for (const slug of ['hydra', 'soundcloud']) await page.locator(`#card-${slug}`).screenshot({ path: `${directory}/mark-after-${slug}-${width}-${colorScheme}.png` });
        for (const link of await page.locator('[aria-describedby]').all()) {
          for (const attribute of ['aria-labelledby', 'aria-describedby']) {
            const target = page.locator(`[id="${await link.getAttribute(attribute)}"]`);
            assert.equal(await target.isVisible(), true);
          }
        }
      }

      assert.equal(await page.getByRole('list', { name: 'Live in Kufstein' }).locator('li').count(), 2);
      if (path !== '/cv') assert.equal(await page.locator('[data-contact-time]').isVisible(), false);
      if (['/hydra', '/hey-netflix', '/soundcloud'].includes(path)) {
        assert.equal(await page.locator('#project-title').count(), 1);
        const ownership = page.getByRole('region', { name: 'What I own', exact: true });
        assert.equal(await ownership.locator(`a[href="${path}#work"]`).count(), 0);
        if (width === 390 && colorScheme === 'light') await ownership.screenshot({ path: `${directory}/${path.slice(1)}-ownership-390-light.png` });
        assert.equal(await page.locator('main > header + #work').count(), 1);

        assert.ok((await page.title()).includes(await page.locator('#project-title').innerText().then(text => text.split(/202/)[0].trim())));
        await page.locator('#work').evaluate(element => element.scrollIntoView({ block: 'start' }));
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${directory}/${path.slice(1)}-detail-${width}-${colorScheme}.png`, fullPage: true, clip: { x: 0, y: await page.evaluate(() => scrollY), width, height: 900 } });
        await page.getByRole('navigation', { name: 'Project navigation' }).scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${directory}/${path.slice(1)}-navigation-${width}-${colorScheme}.png` });
        if (path === '/soundcloud') {
          await page.getByRole('heading', { name: 'System', exact: true }).scrollIntoViewIfNeeded();
          await page.waitForTimeout(300);
          await page.screenshot({ path: `${directory}/soundcloud-system-${width}-${colorScheme}.png` });
        }
      }
      results.push({ path, width, colorScheme, status: 200, overflow: false });
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'], timezoneId: 'America/Los_Angeles' });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  await page.addInitScript(() => {
    addEventListener('pagereveal', event => { sessionStorage.setItem('transition', String(Boolean(event.viewTransition))); });
  });
  await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 12, description: 'Clouds', sunrise: Math.floor(Date.now() / 1000) - 3600, sunset: Math.floor(Date.now() / 1000) + 3600 } }));
  await page.clock.install({ time: new Date('2026-11-07T12:00:00Z') });
  await page.goto(origin);
  await page.getByRole('list', { name: 'Live in Kufstein' }).getByText('12°C, cloudy').waitFor();
  await page.getByRole('list', { name: 'Live in Kufstein' }).getByText(/^sunset \d\d:\d\d$/).waitFor();
  await page.getByRole('list', { name: 'Live in Kufstein' }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${directory}/weather-success.png` });
  await page.locator('[data-contact-time]').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${directory}/contact-visitor-time.png` });
  const hydratedTimeHeight = await page.locator('[data-contact-time]').evaluate(element => element.getBoundingClientRect().height);
  await page.unroute('**/api/weather');
  await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 12, description: 'Clouds', sunrise: Math.floor(Date.now() / 1000) + 36000, sunset: Math.floor(Date.now() / 1000) - 3600 } }));
  await page.clock.setFixedTime(new Date('2026-11-07T20:00:00Z'));
  await page.goto(origin);
  await page.getByRole('list', { name: 'Live in Kufstein' }).getByText(/^sunrise \d\d:\d\d$/).waitFor();
  await page.getByRole('list', { name: 'Live in Kufstein' }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${directory}/weather-sunrise.png` });
  await page.unroute('**/api/weather');
  await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 12, description: 'Clouds', sunrise: 1, sunset: 2 } }));
  await page.goto(origin);
  await page.getByRole('list', { name: 'Live in Kufstein' }).getByText('12°C, cloudy').waitFor();
  assert.equal(await page.getByRole('list', { name: 'Live in Kufstein' }).locator('li').count(), 3);
  await page.getByRole('list', { name: 'Live in Kufstein' }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${directory}/weather-old-shape.png` });
  await page.goto(origin);
  const order = [];
  await page.waitForTimeout(800);
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Tab');
    order.push(await page.evaluate(() => ({ text: document.activeElement.getAttribute('aria-label') ?? document.activeElement.textContent, focus: document.activeElement.matches(':focus-visible') })));
    await page.screenshot({ path: `${directory}/contact-tab-${i + 1}.png` });
  }
  assert.deepEqual(order.map(item => item.text), ['Email me', 'Copy email', 'CV']);
  assert.ok(order.every(item => item.focus));
  await page.getByRole('button', { name: 'Copy email' }).first().click();
  await page.getByRole('status').filter({ hasText: 'Copy email: Copied' }).waitFor();
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${directory}/contact-copied.png` });
  await page.getByRole('link', { name: 'Hydra', exact: true }).scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  await page.screenshot({ path: `${directory}/transition-before.png` });
  await page.getByRole('link', { name: 'Hydra', exact: true }).click();
  await page.waitForURL('**/hydra#work');
  await page.waitForTimeout(350);
  assert.equal(await page.evaluate(() => sessionStorage.getItem('transition')), 'true');
  await page.screenshot({ path: `${directory}/transition-after.png` });
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.closest('#work') !== null), true);

  await page.goBack();
  await page.waitForTimeout(350);
  const after = await page.evaluate(() => scrollY);
  assert.ok(Math.abs(before - after) < 3, `Back restored ${after}, expected ${before}`);
  await page.screenshot({ path: `${directory}/transition-back.png` });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('link', { name: 'Hydra', exact: true }).click();
  await page.waitForURL('**/hydra#work');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('transition')), 'false');
  await page.screenshot({ path: `${directory}/reduced-motion.png` });
  await page.unroute('**/api/weather');
  await page.route('**/api/weather', route => route.fulfill({ json: { temperature: 'invalid' } }));
  await page.goto(origin);
  await page.waitForTimeout(300);
  assert.equal(await page.getByRole('list', { name: 'Live in Kufstein' }).locator('li').count(), 2);
  await page.getByRole('list', { name: 'Live in Kufstein' }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${directory}/weather-fallback.png` });
  await page.unroute('**/api/weather');
  await page.route('**/api/weather', route => route.abort());
  await page.reload();
  await page.waitForTimeout(300);
  assert.equal(await page.getByRole('list', { name: 'Live in Kufstein' }).locator('li').count(), 2);
  await page.goto(`${origin}/cv`);
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.cv-toolbar').isVisible(), false);
  await page.screenshot({ path: `${directory}/cv-print.png`, fullPage: true });
  await page.pdf({ path: `${directory}/cv-print.pdf`, format: 'A4' });
  await page.emulateMedia({ media: 'screen' });
  const missing = await page.goto(`${origin}/nope`);
  assert.equal(missing.status(), 404);
  assert.equal(await page.getByRole('heading', { name: 'Page not found' }).count(), 1);
  assert.equal(await page.getByRole('link', { name: 'Back home' }).getAttribute('href'), '/');
  assert.equal(await page.locator('#now').count(), 0);
  await page.screenshot({ path: `${directory}/not-found.png`, fullPage: true });
  for (const path of ['/story', '/work/hydra', '/work/hey-netflix', '/work/soundcloud']) assert.equal((await page.goto(`${origin}${path}`)).status(), 404);
  await context.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const direct = await noJs.newPage();
  await direct.goto(origin);
  const serverTime = direct.locator('[data-contact-time]');
  assert.equal(await serverTime.isVisible(), true);
  const beforeTimeHeight = await serverTime.evaluate(element => element.getBoundingClientRect().height);
  assert.ok(Math.abs(beforeTimeHeight - hydratedTimeHeight) <= 1, `contact height changed from ${beforeTimeHeight} to ${hydratedTimeHeight}`);
  for (const path of ['/hydra', '/hey-netflix', '/soundcloud']) {
    assert.equal((await direct.goto(`${origin}${path}`)).status(), 200);
    assert.equal(await direct.locator('#project-title').count(), 1);
  }
  await noJs.close();
  results.push({ keyboard: order, weather: 'success, HTTP failure, malformed data and network failure', viewTransitions: 'enabled normally, disabled with reduced motion', back: { before, after }, noJavaScript: 'server-rendered project content', removedRoutes: 404 });
  await writeFile(`${directory}/checks.json`, JSON.stringify(results, null, 2));
} finally { await browser.close(); }
