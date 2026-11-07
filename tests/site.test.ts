import { test } from 'node:test';
import assert from 'node:assert/strict';
import { site, websiteNode } from '../shared/site.ts';
import { cv } from '../shared/cv/content.ts';
import { projectFigures, figures } from '../components/site/figures.ts';
import { since } from '../components/site/content.ts';
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
    assert.ok(item.body.paragraphs.length > 0);
    assert.ok(item.role && item.period && item.caption);
  }
});

test('work rows explain products with short credentials, with sentence metadata', () => {
  assert.deepEqual(projects.map(item => item.caption), [
    'Leveling and community bot · Co-owner, 6.1M servers',
    'Movie-night bot built for Netflix · Webby Honoree',
    'Official SoundCloud Discord bot · Project lead',
  ]);
  for (const item of projects) {
    assert.match(item.description, /^I .+\.$/);
    for (const figure of item.body.figures) {
      assert.ok(figure.width > 0 && figure.height > 0);
      assert.notEqual(figure.alt, figure.caption);
    }
  }
});

test('project figures follow changes in the CV source', () => {
  const changed = { experience: cv.experience.map(entry => ({ ...entry, summary: entry.summary.replace('6.1M', '7.3M').replace('667K', '800K').replace('150K+', '200K+').replace('250K+', '300K+').replace('16M+', '20M+'), highlights: 'highlights' in entry ? entry.highlights.map(line => line.replace('$1M', '$2M')) : [] })) };
  assert.deepEqual(projectFigures(changed), { hydraServers: '7.3M', soundcloudServers: '800K', netflixServers: '200K+', netflixSessions: '300K+', groovyServers: '20M+', groovyRevenue: '$2M+' });
  assert.ok(projects[0]?.caption.includes(figures.hydraServers));
  assert.ok(projects[2]?.body.paragraphs.join(' ').includes(figures.soundcloudServers));
  assert.ok(projects[1]?.body.paragraphs.join(' ').includes(figures.netflixServers));
  assert.ok(projects[1]?.body.paragraphs.join(' ').includes(figures.netflixSessions));
  assert.ok(since[2].title.includes(figures.groovyServers));
  assert.ok(since[2].title.includes(figures.groovyRevenue));
});
test('timeline is newest first, links client work to experience and has no duplicate project rows', () => {
  assert.deepEqual(since.map(row => row.year), [2026, 2022, 2018]);
  assert.equal(since[0].href, '/cv#experience');
  assert.match(since[1].title, /youth summer camp/);
  assert.equal(since.filter(row => /Groovy/.test(row.title)).length, 1);
  for (const row of since.slice(1)) assert.doesNotMatch(row.title, /Hydra|SoundCloud|Netflix/);
});
