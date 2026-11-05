import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { site, websiteNode } from '../shared/site.ts';

// vinext renders the root canonical and og:url as the bare origin, so every other mention of the home page matches it.
test('the sitemap and the WebSite node name the home page as the bare origin', () => {
  const locs = [...readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(locs, [site.origin, `${site.origin}/cv`]);
  assert.equal(websiteNode.url, site.origin);
});
