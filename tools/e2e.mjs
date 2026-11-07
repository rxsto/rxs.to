import { chromium } from 'playwright';
import process from 'node:process';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
/* global document, innerWidth, navigator, getComputedStyle, addEventListener, sessionStorage */
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
const directory = process.env.EVIDENCE_DIR ?? '.compare/e2e';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const width of [1280, 390]) for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme, timezoneId: 'Europe/Vienna', deviceScaleFactor: 2, permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/api/weather', route => route.fulfill({ status: 502, body: '{}' }));
    await page.clock.install({ time: new Date('2026-11-07T12:00:00Z') });
    for (const path of ['/', '/hydra', '/hey-netflix', '/soundcloud', '/cv', '/nope']) {
      const response = await page.goto(`${origin}${path}`);
      assert.equal(response.status(), path === '/nope' ? 404 : 200);
      assert.ok(!(await response.text()).includes('Weather unavailable'), `${path}: loading HTML must not claim failure`);
      await page.locator('[data-period="noon"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) await image.evaluate(element => element.decode());
      assert.ok((await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily)).includes('Inter'));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path} overflow`);
      assert.equal(await page.locator('h1').count(), 1);
      const levels = await page.locator('h1,h2,h3,h4').evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
      for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1, `${path} skipped heading level`);
      await page.screenshot({ path: `${directory}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
      assert.equal(await page.getByRole('list', { name: 'Live in Kufstein' }).locator('li').count(), 3);
      assert.equal(await page.locator('[data-condition="unavailable"]').innerText(), 'Weather unavailable');
      assert.deepEqual(await page.locator('footer [aria-label="Elsewhere"] a').allTextContents(), ['GitHub', 'Twitter', 'LinkedIn', 'Discord']);
      for (const link of await page.locator('footer a, [class*="facts"] a, [class*="articleProse"] a').all()) assert.ok((await link.boundingBox()).height >= 24);
      if (path === '/') {
        await page.locator('[class*="rows"]').screenshot({ path: `${directory}/tiles-2x-${width}-${colorScheme}.png` });
        assert.equal((await page.title()).match(/Oskar Lang/g)?.length, 1);
        for (const link of await page.locator('a').filter({ hasText: /Archive ↗|^LinkedIn$|^Discord$/ }).all()) {
          assert.ok((await link.boundingBox()).height >= 24);
        }
        if (width === 1280) {
          const tops = await page.locator('[aria-label="Live in Kufstein"] li').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top));
          assert.ok(Math.max(...tops) - Math.min(...tops) < 1, 'Desktop local details share one row');
        }
        const contrast = await page.evaluate(() => {
          const context = document.createElement('canvas').getContext('2d');
          const tokens = getComputedStyle(document.documentElement);
          const luminance = name => {
            context.fillStyle = tokens.getPropertyValue(name).trim();
            context.fillRect(0, 0, 1, 1);
            const rgb = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map(channel => { const value = channel / 255; return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; });
            return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
          };
          return ['--foreground', '--text-secondary', '--text-muted', '--focus-outline'].flatMap(ink => (ink === '--focus-outline' ? ['--background', '--surface', '--surface-muted', '--accent', '--accent-strong', '--pastel-mint', '--pastel-rose', '--pastel-peach'] : ['--background', '--surface', '--surface-muted']).map(surface => {
            const a = luminance(ink), b = luminance(surface);
            return { ink, surface, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) };
          }));
        });
        for (const pair of contrast) assert.ok(pair.ratio >= (pair.ink === '--focus-outline' ? 3 : 4.5), `${colorScheme} ${pair.ink} on ${pair.surface}: ${pair.ratio}`);
        results.push({ colorScheme, contrast });
        const marks = await page.locator('[data-project]').evaluateAll(tiles => tiles.map(tile => {
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = 512;
          const context = canvas.getContext('2d');
          const luminance = rgb => rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
          context.fillStyle = getComputedStyle(tile).backgroundColor;
          context.fillRect(0, 0, 1, 1);
          const surface = luminance([...context.getImageData(0, 0, 1, 1).data].slice(0, 3));
          context.clearRect(0, 0, 512, 512);
          context.drawImage(tile.querySelector('img'), 0, 0, 512, 512);
          const pixels = context.getImageData(0, 0, 512, 512).data;
          let opaque = 0, visible = 0, maximum = 0;
          for (let i = 0; i < pixels.length; i += 4) if (pixels[i + 3] >= 250) {
            opaque++;
            const ink = luminance([...pixels.slice(i, i + 3)]);
            const ratio = (Math.max(ink, surface) + .05) / (Math.min(ink, surface) + .05);
            maximum = Math.max(maximum, ratio);
            if (ratio >= 3) visible++;
          }
          return { project: tile.dataset.project, fractionAt3: visible / opaque, maximum };
        }));
        for (const mark of marks) assert.ok(mark.fractionAt3 >= .25, `${mark.project}: mark contrast ${JSON.stringify(mark)}`);
        results.push({ colorScheme, marks });
        const tabOrder = [];
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab');
          tabOrder.push(await page.evaluate(() => ({ label: document.activeElement.getAttribute('aria-label') ?? document.activeElement.textContent, focus: document.activeElement.matches(':focus-visible') })));
        }
        assert.deepEqual(tabOrder.map(item => item.label), ['GitHub', 'Twitter', 'Email me', 'Copy email', 'CV']);
        assert.ok(tabOrder.every(item => item.focus));
        if (colorScheme === 'light') await page.screenshot({ path: `${directory}/focus-${width}-light.png`, fullPage: true });
        for (const slug of ['hydra', 'hey-netflix', 'soundcloud']) assert.equal(await page.locator(`#card-${slug} a`).getAttribute('href'), `/${slug}`);
        await page.locator('h1').click();
        await page.locator('[class*="actions"]').screenshot({ path: `${directory}/buttons-2x-${width}-${colorScheme}.png` });
        await page.getByRole('button', { name: 'Copy email', exact: true }).click();
        await page.getByRole('status').filter({ hasText: 'Copy email: Copied' }).waitFor();
        const email = await page.getByRole('link', { name: 'Email me', exact: true }).getAttribute('href');
        assert.equal(await page.evaluate(() => navigator.clipboard.readText()), email.slice(7));
        await page.getByRole('link', { name: 'Hydra', exact: true }).click();
        await page.waitForURL('**/hydra');
        await page.getByRole('button', { name: 'Copy link', exact: true }).click();
        await page.getByRole('status').filter({ hasText: 'Copy link: Copied' }).waitFor();
        assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'https://rxs.to/hydra');
        await page.getByRole('link', { name: 'Back to all work' }).click();
        await page.waitForURL('**/#card-hydra');
        await page.waitForFunction(() => document.activeElement === document.querySelector('#card-hydra a'));
      }
      if (path === '/cv') {
        assert.deepEqual(await page.locator('.cv-page > :is(.cv-toolbar, .cv-sections, .cv)').evaluateAll(nodes => nodes.map(node => node.className)), ['cv-toolbar', 'cv-sections', 'cv']);
        assert.equal(await page.locator('.cv-topbar img').count(), 0);
        assert.equal(await page.getByText('Oskar Lang', { exact: true }).count(), 1);
        for (const link of await page.locator('.cv-sections a, .cv .contact a').all()) assert.ok((await link.boundingBox()).height >= 24);
      }
      if (path === '/nope') {
        const gap = await page.locator('h1').evaluate(element => element.nextElementSibling.getBoundingClientRect().top - element.getBoundingClientRect().bottom);
        assert.ok(Math.abs(gap - 16) < 1, `404 paragraph gap: ${gap}`);
      }
      if (['/hydra', '/hey-netflix', '/soundcloud'].includes(path)) {
        const buttons = await page.locator('[aria-label="Article actions"] :is(a[aria-label], button)').evaluateAll(nodes => nodes.map(node => {
          const box = node.getBoundingClientRect(), style = getComputedStyle(node);
          return { width: box.width, height: box.height, radius: style.borderRadius, background: style.backgroundColor };
        }));
        assert.equal(buttons.length, 2);
        assert.deepEqual(buttons[0], buttons[1]);
        assert.equal(buttons[0].width, 44);
        assert.equal(buttons[0].height, 44);
        assert.equal(buttons[0].radius, '50%');
        if (path === '/hydra') await page.locator('[aria-label="Article actions"]').screenshot({ path: `${directory}/article-actions-2x-${width}-${colorScheme}.png` });
        assert.equal(await page.locator('#project-title').count(), 1);
        assert.equal(await page.locator('#now').count(), 0);
        assert.ok((await page.title()).includes(await page.locator('#project-title').innerText()));
      }
      results.push({ path, width, colorScheme, status: response.status(), overflow: false });
    }
    for (const [time, code, description, period] of [['2026-11-07T12:00:00Z', 800, 'Clear', 'noon'], ['2026-11-07T20:00:00Z', 500, 'Rain', 'night']]) {
      await page.unroute('**/api/weather');
      await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 12, description, conditionCode: code } }));
      await page.clock.setFixedTime(new Date(time));
      await page.goto(origin);
      await page.locator(`[data-period="${period}"]`).waitFor();
      await page.locator('[data-condition]:not([data-condition="unavailable"]):not([data-condition="pending"])').waitFor();
      await page.locator('footer').screenshot({ path: `${directory}/weather-${period}-${width}-${colorScheme}.png` });
      assert.equal(await page.locator('[data-period] svg').count(), 1);
    }
    await page.goto(origin);
    await page.getByRole('button', { name: `Switch to ${colorScheme === 'light' ? 'dark' : 'light'} theme` }).click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), colorScheme === 'light' ? 'dark' : 'light');
    for (const failure of ['malformed', 'network']) {
      await page.unroute('**/api/weather');
      await page.route('**/api/weather', route => failure === 'network' ? route.abort() : route.fulfill({ json: { temperature: 'invalid' } }));
      await page.goto(origin);
      await page.locator('[data-period="night"]').waitFor();
      await page.locator('[data-condition="unavailable"]').waitFor();
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(() => addEventListener('pagereveal', event => sessionStorage.setItem('transition', String(Boolean(event.viewTransition)))));
  await page.goto(origin);
  await page.getByRole('link', { name: 'Hydra', exact: true }).click();
  await page.waitForURL('**/hydra');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('transition')), 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(origin);
  await page.getByRole('link', { name: 'Hydra', exact: true }).click();
  await page.waitForURL('**/hydra');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('transition')), 'false');
  await page.goto(`${origin}/cv`);
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.cv-toolbar').isVisible(), false);
  assert.equal(await page.getByRole('link', { name: 'Back home' }).isVisible(), false);
  await page.pdf({ path: `${directory}/cv-print.pdf`, format: 'A4' });
  await page.emulateMedia({ media: 'screen' });
  for (const path of ['/nope', '/story', '/work/hydra']) {
    assert.equal((await page.goto(`${origin}${path}`)).status(), 404);
    assert.equal(await page.getByRole('heading', { name: 'Page not found' }).count(), 1);
    assert.equal(await page.getByRole('link', { name: 'Back home' }).getAttribute('href'), '/');
  }
  await context.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const direct = await noJs.newPage();
  for (const path of ['/', '/hydra', '/hey-netflix', '/soundcloud', '/cv']) {
    assert.equal((await direct.goto(`${origin}${path}`)).status(), 200);
    assert.equal(await direct.locator('h1').count(), 1);
    assert.equal(await direct.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  }
  await direct.goto(origin);
  await direct.evaluate(() => document.fonts.ready);
  const serverHeight = await direct.getByRole('list', { name: 'Live in Kufstein' }).evaluate(element => element.getBoundingClientRect().height);
  const live = await browser.newContext({ viewport: { width: 390, height: 900 } });
  const livePage = await live.newPage();
  await livePage.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: -12, description: 'Thunderstorm', conditionCode: 200 } }));
  await livePage.goto(origin);
  await livePage.locator('[data-condition="thunderstorm"]').waitFor();
  const liveHeight = await livePage.getByRole('list', { name: 'Live in Kufstein' }).evaluate(element => element.getBoundingClientRect().height);
  assert.ok(Math.abs(serverHeight - liveHeight) < 1, `Footer hydration changed height: ${serverHeight} to ${liveHeight}`);
  await live.close();
  results.push({ hydration: { serverHeight, liveHeight } });
  await noJs.close();
  results.push({ weather: 'success, HTTP failure, malformed and network failure', viewTransitions: 'normal crossfade; disabled for reduced motion', clipboard: 'email and project URL verified', noJavaScript: 'all pages readable', removedRoutes: 404 });
  await writeFile(`${directory}/checks.json`, JSON.stringify(results, null, 2));
} finally { await browser.close(); }
