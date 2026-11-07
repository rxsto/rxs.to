import { test } from 'node:test';
import assert from 'node:assert/strict';
import { site, websiteNode } from '../shared/site.ts';
import { projects } from '../components/site/projects.ts';
import { GET } from '../app/sitemap.xml/route.ts';

// vinext renders the root canonical and og:url as the bare origin, so every other mention of the home page matches it.
test('the sitemap includes each project and names the home page as the bare origin', async () => {
  const response = GET();
  assert.equal(response.headers.get('content-type'), 'application/xml');
  const locs = [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(locs, [site.origin, ...projects.map(item => `${site.origin}/${item.slug}`), `${site.origin}/cv`]);
  assert.equal(websiteNode.url, site.origin);
});

test('the project registry has distinct routes and complete project content', () => {
  assert.equal(new Set(projects.map(item => item.slug)).size, projects.length);
  for (const item of projects) {
    assert.ok(item.body.owned.length > 0);
    assert.ok(item.role && item.period && item.caption);
  }
});
