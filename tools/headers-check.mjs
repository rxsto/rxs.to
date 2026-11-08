import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
/* global fetch */
const origin = process.env.SITE_ORIGIN ?? 'http://127.0.0.1:5187';
const directory = process.env.EVIDENCE_DIR ?? '.compare/headers';
await mkdir(directory, { recursive: true });
const records = [];
const unavailableWeather = [];
for (const [path, method, status] of [
  ['/', 'GET', 200], ['/digital-office-24', 'GET', 200], ['/hydra', 'GET', 200], ['/soundcloud', 'GET', 200], ['/cv', 'GET', 200],
  ['/api/weather', 'GET', 200], ['/api/weather', 'HEAD', 200],
  ...['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'].map(method => ['/api/weather', method, 405]),
  ['/cv.json', 'GET', 200], ['/cv.md', 'GET', 200], ['/sitemap.xml', 'GET', 200], ['/nope', 'GET', 404], ['/avatar.png', 'GET', 200],
]) {
  const response = await fetch(`${origin}${path}`, { method });
  const missingKey = path === '/api/weather' && status === 200 && response.status === 502;
  if (missingKey) unavailableWeather.push(`${method} ${path}: expected 200, received 502 (OpenWeather key unavailable)`);
  else assert.equal(response.status, status, `${method} ${path}`);
  for (const [header, value] of Object.entries({ 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin', 'x-frame-options': 'DENY', 'content-security-policy': "frame-ancestors 'none'" })) assert.equal(response.headers.get(header), value, `${path} ${header}`);
  if (path === '/api/weather') {
    if (status === 200 && !missingKey) assert.equal(response.headers.get('cache-control'), 'public, max-age=300');
    else if (status !== 200) assert.equal(response.headers.get('allow'), 'GET, HEAD');
    if (method === 'HEAD') assert.equal(await response.text(), '');
  }
  if (response.headers.get('content-type')?.includes('text/html')) assert.equal(response.headers.get('cache-control'), 'no-store');
  records.push({ path, method, status: response.status, headers: Object.fromEntries(response.headers) });
}
await writeFile(`${directory}/headers.json`, JSON.stringify(records, null, 2));

assert.deepEqual(unavailableWeather, [], 'Weather success assertions require OPEN_WEATHER_API_KEY; all other headers were checked');
