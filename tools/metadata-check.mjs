import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';

const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
const directory = process.env.EVIDENCE_DIR ?? '.compare/metadata';
const agents = [
  ['Chrome', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36'],
  ['LinkedIn', 'LinkedInBot/1.0'],
  ['Slack', 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)'],
  ['Twitter', 'Twitterbot/1.0'],
  ['iMessage', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'],
];
const records = [];
for (const path of ['/', '/hydra', '/hey-netflix', '/soundcloud', '/nope']) {
  for (const [name, agent] of agents) {
    const html = execFileSync('curl', ['--silent', '--show-error', '-A', agent, `${origin}${path}`], { encoding: 'utf8' });
    const head = html.split('</head>')[0];
    assert.ok(html.includes('</head>'), `${path} ${name} missing head`);
    for (const pattern of [/<title[\s>]/g, /<meta\s+[^>]*property="og:title"/g, /<meta\s+[^>]*name="description"/g, /<meta\s+[^>]*name="twitter:title"/g]) {
      assert.equal([...head.matchAll(pattern)].length, 1, `${path} ${name} ${pattern} in head`);
      assert.equal([...html.matchAll(pattern)].length, 1, `${path} ${name} ${pattern} in document`);
    }
    if (path === '/nope') {
      assert.ok(head.includes('<title>Page not found | rxsto - Oskar Lang</title>'));
      const robots = [...html.matchAll(/<meta\s+name="robots"\s+content="([^"]+)"/g)].map(match => match[1]);
      assert.ok(robots.length > 0);
      assert.ok(robots.every(value => value.split(/,\s*/).includes('noindex')), `404 robots disagree: ${robots}`);
    }
    records.push(`${path} ${name}: one title, description, og:title and twitter:title, all in head${path === '/nope' ? '; robots consistently noindex' : ''}`);
  }
}
await mkdir(directory, { recursive: true });
await writeFile(`${directory}/metadata.txt`, `${records.join('\n')}\n`);
process.stdout.write(`${records.join('\n')}\n`);
