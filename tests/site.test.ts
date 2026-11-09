import { test } from 'node:test';
import assert from 'node:assert/strict';
import { site, websiteNode } from '../shared/site.ts';
import { cv } from '../shared/cv/content.ts';
import { projectFigures, figures } from '../components/site/figures.ts';
import { since } from '../components/site/content.ts';
import { projects } from '../components/site/projects.ts';
import { GET } from '../app/sitemap.xml/route.ts';
import { pageMetadata } from '../shared/site.ts';

test('the sitemap includes each project and matches the home canonical URL', async () => {
  const response = GET();
  assert.equal(response.headers.get('content-type'), 'application/xml');
  const locs = [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(locs, [`${site.origin}/`, ...projects.map(item => `${site.origin}/${item.slug}`), `${site.origin}/cv`]);
  assert.equal(websiteNode.url, site.origin);
});

test('figure cards use a large image and figureless cards use the avatar summary', () => {
  for (const project of projects) {
    const figure = project.body.figures[0];
    const metadata = pageMetadata({ path: `/${project.slug}`, title: project.name, description: project.description, image: project.shareImage, largeImage: Boolean(figure) });
    assert.ok(metadata.twitter && 'card' in metadata.twitter);
    assert.equal(metadata.twitter.card, figure ? 'summary_large_image' : 'summary');
    assert.deepEqual(metadata.twitter?.images, [project.shareImage ?? '/avatar.png']);
    assert.equal(metadata.openGraph?.title, `${project.name} | Oskar Lang`);
    assert.equal(metadata.twitter?.title, `${project.name} | Oskar Lang`);
  }
});

test('the project registry has distinct routes and complete project content', () => {
  assert.equal(new Set(projects.map(item => item.slug)).size, projects.length);
  for (const item of projects) {
    assert.ok(item.body.paragraphs.length > 0);
    assert.ok(item.role && item.period && item.caption);
  }
});

test('work rows describe the projects, with sentence metadata', () => {
  assert.deepEqual(projects.map(item => item.caption), [
    'A customer platform, from demo booking to billing.',
    'A Discord bot with leveling, welcome and reaction-role features.',
    'A movie-night bot for Discord, built for Netflix.',
    'SoundCloud’s official Discord bot.',
  ]);
  for (const item of projects) {
    assert.match(item.description, /^(?:I |Jochen Segner and I ).+\.$/);
    for (const figure of item.body.figures) {
      assert.ok(figure.width > 0 && figure.height > 0);
      assert.notEqual(figure.alt, figure.caption);
    }
  }
});

test('project figures follow changes in the CV source', () => {
  const changed = { experience: cv.experience.map(entry => ({ ...entry, summary: entry.summary.replace('6.1M', '7.3M').replace('667K', '800K').replace('150K+', '200K+').replace('250K+', '300K+').replace('16M+', '20M+'), highlights: 'highlights' in entry ? entry.highlights.map(line => line.replace('$1M', '$2M')) : [] })) };
  assert.deepEqual(projectFigures(changed), { hydraServers: '7.3M', soundcloudServers: '800K', netflixServers: '200K+', netflixSessions: '300K+', groovyServers: '20M+', groovyRevenue: '$2M+' });
  assert.ok(projects.find(item => item.slug === 'hydra')?.body.paragraphs.join(' ').includes(figures.hydraServers));
  assert.ok(projects.find(item => item.slug === 'soundcloud')?.body.paragraphs.join(' ').includes(figures.soundcloudServers));
  assert.ok(projects.find(item => item.slug === 'hey-netflix')?.body.paragraphs.join(' ').includes(figures.netflixServers));
  assert.ok(projects.find(item => item.slug === 'hey-netflix')?.body.paragraphs.join(' ').includes(figures.netflixSessions));
});

test('client work comes first and derives its contribution and stack from the CV', () => {
  const project = projects[0]!;
  const source = cv.experience.find(entry => entry.org === 'Digital Office 24')!;
  assert.equal(project.slug, 'digital-office-24');
  assert.equal(project.name, source.org);
  assert.equal(project.role, 'Software engineer (contract)');
  assert.equal(project.period, 'February 2026 to present');
  assert.doesNotMatch(project.body.paragraphs.join(' '), /Bun|Hono|Next\.js/);
  for (const fact of ['sole engineer', 'HubSpot CRM', 'demo booking', 'customer portal', 'billing', 'GDPR and consent']) assert.ok(project.body.paragraphs.join(' ').includes(fact));
  assert.deepEqual(project.body.facts, [{ term: 'Stack', value: 'Bun, Hono, Next.js' }]);
  assert.deepEqual(project.body.figures, []);
  assert.deepEqual(project.body.links, []);
});

test('milestones preserve their years and archive source', () => {
  assert.deepEqual(since.map(row => row.year), [2018, 2020, 2021, 2022, 2026]);
  assert.ok(since[0].archive.startsWith('https://web.archive.org/'));
});
