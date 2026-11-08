import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
/* global document */
const root = process.env.EVIDENCE_DIR;
if (!root) throw new Error('Set EVIDENCE_DIR');
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
const names = { TypeScript: 'typescript', Nuxt: 'nuxtdotjs', Kotlin: 'kotlin', Terraform: 'terraform', AWS: 'amazonaws', Bun: 'bun', Hono: 'hono', 'Next.js': 'nextdotjs' };
const icons = {};
for (const [name, file] of Object.entries(names)) icons[name] = await readFile(`${root}/stack-assets/${file}.svg`, 'utf8');
for (const folder of ['', 'chevron-options', 'now-options', 'since-options', 'period-options', 'stack-options', 'button-options', 'crops', 'topbars']) await mkdir(`${root}/${folder}`, { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of [1280, 390]) for (const colorScheme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, deviceScaleFactor: 2 });
    await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 7, description: 'Clouds', conditionCode: 803 } }));
    const shot = async (folder, option, locator) => {
      const path = `${root}/${folder}/${option}-${width}-${colorScheme}.png`;
      if (folder === 'chevron-options') {
        await locator.scrollIntoViewIfNeeded();
        const box = await locator.boundingBox();
        await page.screenshot({ path, clip: { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 } });
      } else await locator.screenshot({ path });
    };
    for (const path of ['/', '/soundcloud', '/digital-office-24', '/hydra', '/hey-netflix', '/cv']) {
      await page.goto(origin + path);
      await page.locator('[data-condition="clouds"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const img of await page.locator('img').all()) await img.evaluate(node => node.decode());
      await page.screenshot({ path: `${root}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
      if (path === '/') {
        const work = page.locator('#work');
        const row = page.locator('#card-digital-office-24 a');
        await row.hover();
        await page.waitForTimeout(180);
        await shot('chevron-options', 'A-title', work);
        await shot('crops', 'work-hover-2x', row);
        const edge = await page.addStyleTag({ content: '[class*="row_"] { position:relative; padding-inline-end:1.75rem; } [class*="workChevron"] { position:absolute; inset-inline-end:.5rem; inset-block-start:50%; margin:0; transform:translateY(-50%); }' });
        await shot('chevron-options', 'B-edge', work);
        await edge.evaluate(node => node.remove());
        await page.mouse.move(0, 0);
        const since = page.locator('section[aria-labelledby="since"]');
        await shot('now-options', 'A-paragraph', page.locator('main'));
        await shot('since-options', 'A-rail', since);
        const railHtml = await since.innerHTML();
        await since.evaluate(section => {
          const slugs = ['', '/hydra', '/soundcloud', '/hey-netflix', '/hydra'];
          const letters = ['G', 'H', 'S', 'N', 'H'];
          section.querySelectorAll('li').forEach((row, i) => {
            row.style.columnGap = '3rem';
            const tile = document.createElement(slugs[i] ? 'a' : 'span');
            if (slugs[i]) { tile.href = slugs[i]; tile.setAttribute('aria-label', ['Groovy', 'Hydra', 'SoundCloud', 'Hey, Netflix', 'Hydra'][i]); }
            tile.textContent = letters[i];
            tile.style.cssText = 'position:absolute;inset-inline-start:3.15rem;inset-block-start:.15rem;display:grid;place-items:center;inline-size:1.5rem;block-size:1.5rem;border:1px solid var(--border);border-radius:.4rem;background:var(--surface);color:var(--foreground);font-size:.75rem;text-decoration:none';
            row.append(tile);
          });
        });
        await shot('since-options', 'B-tiles', since);
        await since.evaluate((node, html) => { node.innerHTML = html; }, railHtml);
        await since.locator('li').evaluateAll(rows => rows.forEach((row, i) => { row.style.paddingBlockEnd = ['2rem', '1rem', '1rem', '4rem', '0'][i]; }));
        await shot('since-options', 'C-proportional', since);
        await since.evaluate((node, html) => { node.innerHTML = html; }, railHtml);
        await page.evaluate(() => {
          const now = document.querySelector('section[aria-labelledby="now"]');
          const list = document.querySelector('section[aria-labelledby="since"] ol');
          const last = list.lastElementChild;
          last.lastElementChild.textContent = 'Leading Hydra’s rebuild, collaborating with Top.gg and Finaure, and keeping the official SoundCloud bot running.';
          now.remove();
        });
        await shot('now-options', 'B-integrated', page.locator('main'));
      } else if (path === '/cv') {
        await shot('topbars', 'cv-separator', page.locator('.cv-topbar'));
      } else {
        const slug = path.slice(1);
        const facts = page.locator('dl');
        const period = facts.locator('div').filter({ has: page.locator('dt', { hasText: /^Period$/ }) }).locator('dd');
        const dates = await period.innerText();
        await shot('period-options', `A-plain-${slug}`, facts);
        await period.evaluate((node, dates) => { node.textContent = dates.endsWith(' to now') ? `Since ${dates.replace(' to now', '')}` : dates.replace(' to ', ' – '); }, dates);
        await shot('period-options', `B-since-${slug}`, facts);
        await period.evaluate((node, dates) => {
          const start = Number(dates.match(/\d{4}/)[0]);
          const end = dates.endsWith('now') ? 2026 : Number(dates.match(/\d{4}$/)[0]);
          node.innerHTML = `<span>${dates}</span><span style="display:block;position:relative;inline-size:10rem;block-size:3px;background:var(--border);margin-block-start:8px"><span style="position:absolute;inset-inline-start:${(start - 2018) / 8 * 100}%;inline-size:${Math.max(2, (end - start) / 8 * 100)}%;block-size:100%;background:var(--foreground)"></span></span><span style="display:flex;justify-content:space-between;inline-size:10rem;font-size:11px;margin-block-start:4px"><span>2018</span><span>2026</span></span>`;
        }, dates);
        await shot('period-options', `C-axis-${slug}`, facts);
        await period.evaluate((node, dates) => { node.textContent = dates; }, dates);
        if (['/soundcloud', '/digital-office-24'].includes(path)) {
          const stack = page.getByRole('list', { name: 'Technologies' });
          const html = await stack.innerHTML();
          await shot('stack-options', `A-chips-${slug}`, facts);
          for (const option of ['B', 'C']) {
            await stack.evaluate((list, { icons, option }) => {
              list.querySelectorAll('li').forEach(item => {
                const name = item.textContent;
                item.style.cssText = option === 'B' ? 'display:flex;align-items:center;gap:.4rem;padding:.125rem 0;background:none' : 'display:grid;justify-items:center;gap:.35rem;padding:0;background:none';
                const icon = document.createElement('span');
                icon.innerHTML = icons[name];
                icon.setAttribute('aria-hidden', 'true');
                icon.style.cssText = option === 'B' ? 'display:grid;place-items:center;inline-size:1rem;block-size:1rem' : 'display:grid;place-items:center;inline-size:2rem;block-size:2rem;border:1px solid var(--border);border-radius:.45rem';
                const svg = icon.querySelector('svg');
                const size = name === 'Kotlin' ? '.7rem' : name === 'Nuxt' || name === 'AWS' ? '1rem' : '.85rem';
                svg.style.cssText = `inline-size:${size};block-size:.85rem;fill:currentColor`;
                item.prepend(icon);
              });
              list.style.gap = option === 'B' ? '.5rem 1rem' : '.5rem 1.1rem';
            }, { icons, option });
            await shot('stack-options', `${option}-${option === 'B' ? 'icon-name' : 'framed'}-${slug}`, facts);
            await stack.evaluate((node, html) => { node.innerHTML = html; node.removeAttribute('style'); }, html);
          }
        }
        if (path !== '/digital-office-24') {
          const actions = page.locator('[class*="projectActions"]');
          await shot('button-options', `A-aligned-${slug}`, page.locator('article'));
          await actions.evaluate(node => { node.style.display = 'grid'; node.style.justifyItems = 'start'; node.querySelector('nav').style.justifySelf = 'end'; node.querySelector('nav').style.inlineSize = '100%'; });
          await shot('button-options', `B-separated-${slug}`, page.locator('article'));
        }
        await shot('topbars', `${slug}-separator`, page.locator('[aria-label="Article actions"]'));
      }
    }
    await page.close();
  }
  await writeFile(`${root}/capture-complete.txt`, 'All pages and variants captured at 2x, one browser worker.\n');
} finally { await browser.close(); }
