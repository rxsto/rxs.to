import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
/* global document, getComputedStyle, matchMedia */
const directory = process.env.EVIDENCE_DIR ?? '.compare/r9';
const siteOrigin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
for (const folder of ['', '/project-row-options', '/footer-options']) await mkdir(directory + folder, { recursive: true });
const browser = await chromium.launch();
const focus = [];
try {
  for (const width of [1280, 390]) for (const colorScheme of ['light','dark']) {
    const page = await browser.newPage({ viewport: {width, height:900}, colorScheme, deviceScaleFactor: 1 });
    await page.clock.install({ time: new Date('2026-11-07T12:00:00Z') });
    await page.route('**/api/weather', route => route.fulfill({ json: { location: 'Kufstein', temperature: 7, description: 'Clouds', conditionCode: 803 } }));
    for (const path of ['/', '/hydra', '/digital-office-24', '/cv']) {
      await page.goto(`${siteOrigin}${path}`);
      await page.locator('[data-condition="clouds"]').waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) await image.evaluate(img => img.decode());
      await page.screenshot({path:`${directory}/${path.slice(1) || 'home'}-${width}-${colorScheme}.png`,fullPage:true});
    }
    if (width === 1280) {
      await page.goto(siteOrigin);
      await page.locator('[data-condition="clouds"]').waitFor();
      await page.locator('[class*="rows"]').screenshot({path:`${directory}/project-row-options/grayscale-${colorScheme}.png`});
      const color = await page.addStyleTag({content:'[data-project] img { filter: none !important; mix-blend-mode: normal !important; }'});
      await page.locator('[class*="rows"]').screenshot({path:`${directory}/project-row-options/real-colours-${colorScheme}.png`});
      await color.evaluate(node=>node.remove());
      const text = await page.addStyleTag({content:'[class*="rows"] [data-project] { display: none; } [class*="rows"] a { grid-template-columns: minmax(0, 1fr) auto; }'});
      await page.locator('[class*="rows"]').screenshot({path:`${directory}/project-row-options/text-only-${colorScheme}.png`});
      await text.evaluate(node=>node.remove());
      await page.locator('footer').screenshot({path:`${directory}/footer-options/quiet-icons-${colorScheme}.png`});
      await page.addStyleTag({content:'[class*="localDetails"] svg { display:none; } [class*="weatherGroup"] > span::before { content: "·"; margin-inline-end:.35em; }'});
      await page.locator('footer').screenshot({path:`${directory}/footer-options/text-only-${colorScheme}.png`});
      focus.push(await page.evaluate(() => {
        const canvas = document.createElement('canvas'), context = canvas.getContext('2d');
        canvas.width=canvas.height=1;
        const tokens = getComputedStyle(document.documentElement);
        const luminance = color => {
          context.clearRect(0,0,1,1);
          context.fillStyle=tokens.getPropertyValue('--background'); context.fillRect(0,0,1,1);
          context.fillStyle=color; context.fillRect(0,0,1,1);
          return [...context.getImageData(0,0,1,1).data].slice(0,3).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);
        };
        const background=luminance(tokens.getPropertyValue('--background'));
        const defaultRing=luminance(`color-mix(in oklab, ${tokens.getPropertyValue('--accent-strong')} 72%, transparent)`);
        return {theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',defaultRingContrast:(Math.max(background,defaultRing)+.05)/(Math.min(background,defaultRing)+.05)};
      }));
    }
    await page.close();
  }
} finally {await browser.close();}
await writeFile(`${directory}/focus-default.json`,JSON.stringify(focus,null,2));
