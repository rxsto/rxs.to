import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
import assert from 'node:assert/strict';
/* global document, window, getComputedStyle */
const directory = process.env.EVIDENCE_DIR ?? '.compare/r10';
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
for (const folder of ['', '/intro-options', '/theme-transition', '/references']) await mkdir(directory + folder, { recursive: true });
const browser = await chromium.launch();
const colours = [];
try {
  for (const width of [1280, 390]) for (const colorScheme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme });
    await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 7, description: 'Clouds', conditionCode: 803 } }));
    for (const path of ['/hydra', '/cv', '/']) {
      await page.goto(origin + path);
      await page.locator('[data-condition="clouds"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) await image.evaluate(img => img.decode());
      await page.screenshot({ path: `${directory}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
    }
    for (const variant of ['B', 'A', 'C']) {
      await page.evaluate(variant => {
        const hero = document.querySelector('header');
        const em = hero.querySelector('em');
        em.style.fontFamily = variant === 'A' ? 'inherit' : '';
        em.style.fontStyle = variant === 'A' ? 'normal' : '';
        for (const link of hero.querySelectorAll('[data-intro-links] a')) {
          link.querySelector('svg')?.remove();
          const label = link.textContent;
          const glyph = variant === 'A' || (variant === 'C' && ['email', 'CV'].includes(label));
          if (!glyph) continue;
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true');
          svg.innerHTML = `<path d="${label === 'email' ? 'M3 6h18v12H3z M3 6l9 7 9-7' : label === 'CV' ? 'M6 3h9l3 3v15H6z M9 11h6 M9 15h6' : 'M7 17 17 7 M7 7h10v10'}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
          svg.style.cssText = 'display:inline-block;inline-size:.85em;block-size:.85em;margin-inline-end:.25em;vertical-align:-.08em';
          link.prepend(svg);
        }
      }, variant);
      await page.locator('header').screenshot({ path: `${directory}/intro-options/${variant}-${width}-${colorScheme}.png` });
    }
    colours.push(await page.evaluate(() => {
      const tokens = getComputedStyle(document.documentElement);
      const context = document.createElement('canvas').getContext('2d');
      const sample = css => {
        context.fillStyle = css; context.fillRect(0, 0, 1, 1);
        const rgb = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
        const y = rgb.map(x => x / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4).reduce((a, x, i) => a + x * [.2126, .7152, .0722][i], 0);
        return { rgb, y };
      };
      const background = sample(tokens.getPropertyValue('--background'));
      const foreground = sample(getComputedStyle(document.querySelector('h1')).color);
      const button = sample(getComputedStyle(document.querySelector('a[href^="mailto"]:not([class*="link"])')).backgroundColor);
      const contrast = (a, b) => (Math.max(a.y, b.y) + .05) / (Math.min(a.y, b.y) + .05);
      const dark = background.y < .5;
      const before = sample(dark ? 'oklch(96% 0 0)' : 'oklch(15% 0 0)');
      return { theme: dark ? 'dark' : 'light', background, foreground, button, contrast: contrast(background, foreground), before: { ...before, contrast: contrast(background, before) } };
    }));
    assert.ok(colours.at(-1).contrast >= 4.5);
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
  await page.goto(origin);
  await page.getByRole('button', { name: 'Switch to dark theme' }).waitFor();
  await page.evaluate(() => {
    const animate = document.documentElement.animate.bind(document.documentElement);
    document.documentElement.animate = (...args) => {
      const animation = animate(...args);
      if (args[1]?.pseudoElement) { window.themeAnimation = animation; animation.pause(); }
      return animation;
    };
  });
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.waitForFunction(() => !!window.themeAnimation);
  for (const time of [0, 120, 240, 360, 479]) {
    await page.evaluate(time => { window.themeAnimation.currentTime = time; }, time);
    await page.screenshot({ path: `${directory}/theme-transition/${String(time).padStart(3, '0')}ms.png` });
  }
  await page.evaluate(() => window.themeAnimation.finish());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { window.transitionCalls = 0; const start = document.startViewTransition.bind(document); document.startViewTransition = (...args) => { window.transitionCalls++; return start(...args); }; });
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  assert.equal(await page.evaluate(() => window.transitionCalls), 0);
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  await writeFile(`${directory}/colours.json`, JSON.stringify(colours, null, 2));
  for (const [label, url] of [['jakub', 'https://jakub.kr'], ['paco', 'https://paco.me']]) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/references/${label}.png`, fullPage: true });
  }
  await page.close();
} finally { await browser.close(); }
