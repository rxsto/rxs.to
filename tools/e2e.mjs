import { chromium } from 'playwright';
import process from 'node:process';
import { URL } from 'node:url';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
/* global document, window, innerWidth, navigator, getComputedStyle */
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
const directory = process.env.EVIDENCE_DIR ?? '.compare/e2e';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const width of [1280, 390, 320]) for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme, timezoneId: 'Europe/Vienna', deviceScaleFactor: 2, permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/api/weather', route => route.fulfill({ status: 502, body: '{}' }));
    await page.clock.install({ time: new Date('2026-11-07T12:00:00Z') });
    for (const path of ['/', '/digital-office-24', '/hydra', '/hey-netflix', '/soundcloud', '/cv', '/nope']) {
      const response = await page.goto(`${origin}${path}`);
      assert.equal(response.status(), path === '/nope' ? 404 : 200);
      assert.ok(!(await response.text()).includes('Weather unavailable'), `${path}: loading HTML must not claim failure`);
      await page.locator('[data-period="noon"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) await image.evaluate(element => element.decode());
      assert.ok((await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily)).includes('Inter'));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path} overflow`);
      const themeBox = await page.getByRole('button', { name: /Switch to .* theme/ }).boundingBox();
      assert.equal(themeBox.width, 44);
      assert.equal(themeBox.height, 44);
      const eagerPortrait = await page.locator('img[src="/avatar.png"][loading="eager"]').count();
      assert.equal([...(await response.text()).split('</head>')[0].matchAll(/<link[^>]*rel="preload"[^>]*href="\/avatar.png"/g)].length, eagerPortrait, `${path} portrait preload`);
      assert.equal(await page.locator('h1').count(), 1);
      const levels = await page.locator('h1,h2,h3,h4').evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
      for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1, `${path} skipped heading level`);
      await page.screenshot({ path: `${directory}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
      assert.equal(await page.getByRole('list', { name: 'Live in Kufstein' }).locator('li').count(), 2);
      assert.equal(await page.locator('[data-condition="unavailable"]').innerText(), 'Weather unavailable');
      assert.deepEqual(await page.locator('footer [aria-label="Elsewhere"] a').allTextContents(), ['GitHub', 'Twitter', 'LinkedIn', 'Discord', 'CV']);
      for (const link of await page.locator('footer a, [class*="facts"] a, [class*="articleProse"] a').all()) assert.ok((await link.boundingBox()).height >= 24);
      if (path === '/') {
        assert.equal(await page.getByText(/BUNDjugend/).count(), 0);
        assert.equal(await page.locator('header p svg').count(), 4);
        assert.equal(await page.getByRole('heading', { name: 'Previously' }).count(), 0);
        for (const name of ['GitHub', 'Twitter', 'LinkedIn']) assert.equal(await page.locator('header').getByRole('link', { name, exact: true }).locator('svg path').count(), 0);
        assert.equal(await page.locator('[class*="rows"] > li').count(), 4);
        assert.equal(await page.locator('[class*="rows"] > li').first().getAttribute('id'), 'card-digital-office-24');
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
            context.fillStyle = name === '--focus-outline' ? `color-mix(in oklab, ${tokens.getPropertyValue('--accent-strong')} 72%, ${tokens.getPropertyValue('--background')})` : tokens.getPropertyValue(name).trim();
            context.fillRect(0, 0, 1, 1);
            const rgb = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map(channel => { const value = channel / 255; return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; });
            return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
          };
          return ['--foreground', '--text-secondary', '--focus-outline'].flatMap(ink => ['--background', '--surface', '--surface-muted'].map(surface => {
            const a = luminance(ink), b = luminance(surface);
            return { ink, surface, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) };
          }));
        });
        for (const pair of contrast) assert.ok(pair.ratio >= (pair.ink === '--focus-outline' ? 3 : 4.5), `${colorScheme} ${pair.ink} on ${pair.surface}: ${pair.ratio}`);
        results.push({ colorScheme, contrast });
        assert.deepEqual(await page.locator('[data-project]').allTextContents(), ['D', 'H', 'N', 'S']);
        assert.equal(await page.getByRole('button', { name: 'Copy email' }).count(), 0);
        const actions = await page.locator('[class*="heroActions"] a').evaluateAll(nodes => nodes.map(node => {
          const s = getComputedStyle(node); return [node.getBoundingClientRect().height, s.borderRadius, s.paddingInline, s.fontSize];
        }));
        assert.deepEqual(actions[0], actions[1]);
        assert.ok(actions[0][0] >= 24);
        assert.equal(await page.locator('header em, header [data-intro-links]').count(), 0);
        const row = page.locator('[class*="rows"] a').first();
        const resting = await row.evaluate(node => [getComputedStyle(node).backgroundColor, getComputedStyle(node).transitionDuration]);
        await row.hover();
        assert.deepEqual(await row.evaluate(node => [getComputedStyle(node).backgroundColor, getComputedStyle(node).transitionDuration]), resting);
        assert.equal(await row.locator('svg').count(), 0);
        await page.mouse.move(0, 0);
        const tabOrder = [];
        for (let i = 0; i < 2; i++) {
          await page.keyboard.press('Tab');
          tabOrder.push(await page.evaluate(() => ({ label: document.activeElement.getAttribute('aria-label') ?? document.activeElement.textContent, focus: document.activeElement.matches(':focus-visible') })));
        }
        assert.deepEqual(tabOrder.map(item => item.label), ['Email me', 'CV']);
        assert.equal(await page.getByRole('link', { name: 'Digital Office 24’s customer platform' }).getAttribute('href'), '/digital-office-24');
        assert.ok(tabOrder.every(item => item.focus));
        if (colorScheme === 'light') await page.screenshot({ path: `${directory}/focus-${width}-light.png`, fullPage: true });
        for (const slug of ['digital-office-24', 'hydra', 'hey-netflix', 'soundcloud']) assert.equal(await page.locator(`#card-${slug} a`).getAttribute('href'), `/${slug}`);
        await page.locator('h1').click();
        await page.locator('[class*="actions"]').screenshot({ path: `${directory}/buttons-2x-${width}-${colorScheme}.png` });
        await page.evaluate(() => { window.navigationSentinel = true; });
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
        const resume = await (await page.request.get(`${origin}/cv.json`)).json();
        const text = (await page.locator('.cv').innerText()).replace(/\s+/g, ' ');
        for (const entry of [...resume.work, ...resume.volunteer, ...resume.education]) {
          for (const field of ['name', 'organization', 'institution', 'position', 'summary']) {
            if (entry[field]) assert.ok(text.includes(entry[field].replace(/\s+/g, ' ')), `CV web rendering preserves ${field}: ${entry[field]}`);
          }
          for (const point of entry.highlights ?? []) assert.ok(text.includes(point.replace(/\s+/g, ' ')), `CV web rendering preserves ${point}`);
        }
        for (const row of resume.skills) for (const skill of row.keywords) assert.ok(text.includes(skill), `CV web rendering preserves ${skill}`);
        for (const entry of await page.locator('.cv article').all()) {
          const heading = await entry.locator('h3').boundingBox();
          const date = await entry.locator('.date').boundingBox();
          if (width < 640) {
            assert.ok(date.y >= heading.y + heading.height, 'CV date follows the complete heading');
            assert.ok(Math.abs(date.x - heading.x) < 1, 'CV date aligns with its heading');
          } else assert.ok(date.y < heading.y + 10, 'Desktop CV date stays beside its heading');
        }
        assert.deepEqual(await page.locator('.cv-page > :is(.cv-topbar, .cv)').evaluateAll(nodes => nodes.map(node => node.classList.contains('cv-topbar') ? 'cv-topbar' : 'cv')), ['cv-topbar', 'cv']);
        assert.equal(await page.locator('.cv-topbar img').count(), 0);
        const topbar = await page.locator('.cv-topbar').evaluate(node => {
          const back = node.querySelector('a').getBoundingClientRect();
          const downloads = node.querySelector('[download]').getBoundingClientRect();
          return Math.abs((back.top + back.bottom) / 2 - (downloads.top + downloads.bottom) / 2);
        });
        assert.ok(topbar < 1, 'CV downloads share the back-button row');
        assert.equal(await page.locator('.cv-topbar a').count(), 2);
        assert.equal(await page.locator('.cv-topbar a[download]').getAttribute('href'), '/cv.pdf');
        for (const [type, href] of [['application/json', '/cv.json'], ['text/markdown', '/cv.md']]) {
          assert.equal(new URL(await page.locator(`head link[rel="alternate"][type="${type}"]`).getAttribute('href'), origin).pathname, href);
          assert.equal(await page.locator(`.cv-formats a[href="${href}"]`).count(), 1);
        }
        await page.getByRole('link', { name: 'Download PDF' }).focus();
        await page.getByRole('tooltip').waitFor();
        assert.equal(await page.getByRole('tooltip').innerText(), 'Download PDF');
        await page.keyboard.press('Escape');
        assert.equal(await page.getByText('Oskar Lang', { exact: true }).count(), 1);
        for (const link of await page.locator('.cv .contact a').all()) assert.ok((await link.boundingBox()).height >= 24);
      }
      if (path === '/nope') {
        const footer = await page.locator('footer').boundingBox();
        assert.ok(Math.abs(footer.y + footer.height - 852) < 1, '404 footer ends at viewport bottom padding');
        const gap = await page.locator('h1').evaluate(element => element.nextElementSibling.getBoundingClientRect().top - element.getBoundingClientRect().bottom);
        assert.ok(Math.abs(gap - 16) < 1, `404 paragraph gap: ${gap}`);
      }
      if (['/digital-office-24', '/hydra', '/hey-netflix', '/soundcloud'].includes(path)) {
        assert.equal(await page.locator('figcaption').count(), 0);
        assert.equal(await page.locator('dt').filter({ hasText: /^Links$/ }).count(), 0);
        const technologies = page.getByRole('list', { name: 'Technologies' });
        if (await technologies.count()) {
          const technology = technologies.locator('[tabindex="0"]').first();
          await technology.focus();
          await page.getByRole('tooltip').waitFor();
          assert.equal(await page.getByRole('tooltip').innerText(), await technology.getAttribute('aria-label'));
          await page.keyboard.press('Escape');
        }
        const visit = page.locator('article > a[target="_blank"]');
        assert.equal(await visit.count(), path === '/digital-office-24' ? 0 : 1);
        if (await visit.count()) assert.equal((await visit.boundingBox()).height, 36);
        const next = await page.locator('[aria-label="Project navigation"] a').boundingBox();
        const article = await page.locator('article').boundingBox();
        assert.ok(Math.abs(next.x + next.width - article.x - article.width) < 1, 'Next navigation aligns with the right edge');
        assert.equal(await page.getByRole('link', { name: 'Email me', exact: true }).count(), 0);
        assert.equal(await page.locator('article a[href="/cv"]').count(), 0);
        assert.equal(await page.getByRole('link', { name: 'All work', exact: true }).count(), 0);
        if (['/hydra', '/soundcloud'].includes(path)) {
          const figure = await page.locator('figure').boundingBox();
          const facts = await page.locator('dl').boundingBox();
          assert.ok(figure.y + figure.height <= facts.y, 'Figure precedes facts');
        }
        const buttons = await page.locator('[aria-label="Article actions"] :is(a[aria-label], button)').evaluateAll(nodes => nodes.map(node => {
          const box = node.getBoundingClientRect(), style = getComputedStyle(node);
          return { width: box.width, height: box.height, radius: style.borderRadius, background: style.backgroundColor };
        }));
        assert.equal(buttons.length, 2);
        assert.ok(buttons.every(button => button.width === 44 && button.height === 44));
        assert.equal(buttons[0].radius, buttons[1].radius);
        assert.equal(buttons[0].background, buttons[1].background);
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
      const grouped = await page.locator('[class*="weatherGroup"] > span').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top));
      assert.ok(Math.abs(grouped[0] - grouped[1]) < 1, 'Weather and solar event wrap together');
    }
    await page.goto(origin);
    await page.getByRole('button', { name: `Switch to ${colorScheme === 'light' ? 'dark' : 'light'} theme` }).click();
    await page.waitForFunction(expected => document.documentElement.dataset.theme === expected, colorScheme === 'light' ? 'dark' : 'light');
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

  await page.goto(origin);
  await page.locator('[data-period]:not([data-period="pending"])').waitFor();
  await page.evaluate(() => { window.navigationSentinel = true; });
  await page.getByRole('link', { name: 'Hydra', exact: true }).click();
  await page.waitForURL('**/hydra');
  assert.equal(await page.evaluate(() => window.navigationSentinel), true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(origin);
  await page.locator('[data-period]:not([data-period="pending"])').waitFor();
  await page.evaluate(() => { window.navigationSentinel = true; });
  await page.getByRole('link', { name: 'Hydra', exact: true }).click();
  await page.waitForURL('**/hydra');
  assert.equal(await page.evaluate(() => window.navigationSentinel), true);
  await page.goto(`${origin}/cv`);
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.cv-topbar').isVisible(), false);
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
  for (const path of ['/', '/digital-office-24', '/hydra', '/hey-netflix', '/soundcloud', '/cv']) {
    assert.equal((await direct.goto(`${origin}${path}`)).status(), 200);
    assert.equal(await direct.locator('h1').count(), 1);
    assert.equal(await direct.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  }
  await direct.goto(origin);
  assert.equal(await direct.getByRole('button', { name: /Switch to/ }).count(), 0);
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
  results.push({ weather: 'success, HTTP failure, malformed and network failure', viewTransitions: 'client navigation without page animation in both motion settings', clipboard: 'project URL verified; email copy removed', noJavaScript: 'all pages readable', removedRoutes: 404 });
  await writeFile(`${directory}/checks.json`, JSON.stringify(results, null, 2));
} finally { await browser.close(); }
