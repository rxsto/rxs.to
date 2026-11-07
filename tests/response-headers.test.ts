import { test } from 'node:test';
import assert from 'node:assert/strict';
import { responseHeaders } from '../server/response-headers.ts';

for (const contentType of ['text/html', 'application/json', 'application/xml', 'text/markdown']) {
  test(`security headers protect ${contentType} without changing its body`, async () => {
    const result = responseHeaders(new Response('body', { headers: { 'content-type': contentType, 'cache-control': 'public, max-age=300' } }));
    assert.equal(await result.text(), 'body');
    assert.equal(result.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(result.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
    assert.equal(result.headers.get('x-frame-options'), 'DENY');
    assert.equal(result.headers.get('content-security-policy'), "frame-ancestors 'none'");
    assert.equal(result.headers.get('cache-control'), contentType === 'text/html' ? 'no-store' : 'public, max-age=300');
  });
}
