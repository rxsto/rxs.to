import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
/* global window, PerformanceObserver, console */
const directory = process.env.EVIDENCE_DIR ?? '.compare/cls';
await mkdir(directory, { recursive: true });
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
const browser = await chromium.launch();
const results = [];
try {
 for (const width of [1280,390]) for (const path of ['/','/hydra']) {
  const context = await browser.newContext({viewport:{width,height:900}});
  const page = await context.newPage();
  await page.addInitScript(() => {
   window.shifts=[];
   new PerformanceObserver(list=>{for(const e of list.getEntries()) if(!e.hadRecentInput) window.shifts.push({value:e.value,time:e.startTime});}).observe({type:'layout-shift',buffered:true});
  });
  await page.goto(`${origin}${path}`);
  await page.waitForTimeout(2200);
  const shifts=await page.evaluate(()=>window.shifts);
  results.push({width,path,cls:shifts.reduce((sum,e)=>sum+e.value,0),shifts});
  await context.close();
 }
} finally {await browser.close();}
await writeFile(`${directory}/cls.json`,JSON.stringify(results,null,2));
console.log(results);
for (const result of results) assert.equal(result.cls, 0, `${result.path} at ${result.width}px shifted`);
