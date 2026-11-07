import { afterEach, mock, test } from 'node:test';
import assert from 'node:assert/strict';
import { getWeather, WeatherError } from '../server/weather.ts';
import { weatherDescription } from '../shared/weather-description.ts';

afterEach(() => mock.restoreAll());

function cache(value: unknown = null) {
  const writes: { key: string; value: string; ttl: number }[] = [];
  return {
    writes,
    async get() { return value; },
    async put(key: string, value: string, options: { expirationTtl: number }) {
      writes.push({ key, value, ttl: options.expirationTtl });
    },
  };
}

const state = { location: 'Kufstein', description: 'Clear', temperature: 18 };
const upstream = { name: 'Kufstein', weather: [{ main: 'Clear' }], main: { temp: 17.6 } };

test('returns the existing KV weather shape without fetching upstream', async () => {
  const fetcher = mock.method(globalThis, 'fetch', () => { throw new Error('unexpected fetch'); });
  assert.deepEqual(await getWeather({ KV: cache(state) }), state);
  assert.equal(fetcher.mock.callCount(), 0);
});

test('fetches metric weather for Kufstein, rounds it, and caches for one hour', async () => {
  const kv = cache({ location: '', temperature: '18' });
  const fetcher = mock.method(globalThis, 'fetch', async (url: Parameters<typeof fetch>[0]) => {
    const requested = new URL(String(url));
    assert.equal(requested.searchParams.get('units'), 'metric');
    assert.equal(requested.searchParams.get('lat'), '47.5824');
    assert.equal(requested.searchParams.get('lon'), '12.1627');
    return Response.json(upstream);
  });
  assert.deepEqual(await getWeather({ KV: kv, OPEN_WEATHER_API_KEY: 'test-key' }), state);
  assert.equal(fetcher.mock.callCount(), 1);
  const cached = JSON.parse(kv.writes[0]!.value);
  mock.restoreAll();
  mock.method(globalThis, 'fetch', () => { throw new Error('offline'); });
  assert.deepEqual(await getWeather({ KV: cache(cached) }), state);
});

test('cache read and write failures do not hide valid upstream weather', async () => {
  mock.method(globalThis, 'fetch', async () => Response.json(upstream));
  assert.deepEqual(await getWeather({ KV: {
    async get() { throw new Error('cache unavailable'); },
    async put() { throw new Error('cache unavailable'); },
  } }), state);
});

test('upstream solar fields do not change the shared weather contract', async () => {
  mock.method(globalThis, 'fetch', async () => Response.json({ ...upstream, sys: { sunrise: 1, sunset: 2 } }));
  assert.deepEqual(await getWeather({ KV: cache() }), state);
});

test('upstream HTTP and network failures map to Weather upstream unavailable', async () => {
  for (const result of ['http', 'network']) {
    mock.method(globalThis, 'fetch', async () => {
      if (result === 'network') throw new Error('connection failed');
      return new Response('Unavailable', { status: 503 });
    });
    await assert.rejects(getWeather({ KV: cache() }), { name: 'Error', message: 'Weather upstream unavailable' });
    mock.restoreAll();
  }
});

test('invalid upstream payloads map to Invalid weather response without poisoning KV', async () => {
  for (const value of [null, {}, { ...upstream, name: '' }, { ...upstream, weather: [] }, { ...upstream, main: { temp: '18' } }]) {
    const kv = cache();
    mock.method(globalThis, 'fetch', async () => Response.json(value));
    await assert.rejects(getWeather({ KV: kv }), error => error instanceof WeatherError && error.message === 'Invalid weather response');
    assert.deepEqual(kv.writes, []);
    mock.restoreAll();
  }
});

test('upstream requests abort after the two-second timeout without retry', async () => {
  const fetcher = mock.method(globalThis, 'fetch', (_url: Parameters<typeof fetch>[0], init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => reject(init.signal?.reason), { once: true });
  }));
  const keepAlive = setTimeout(() => {}, 3000);
  try {
    await assert.rejects(getWeather({ KV: cache() }), { message: 'Weather upstream unavailable' });
    assert.equal(fetcher.mock.callCount(), 1);
    assert.equal(fetcher.mock.calls[0].arguments[1]?.signal?.aborted, true);
  } finally {
    clearTimeout(keepAlive);
  }
});

test('footer preserves all eight condition labels and lowercases unknown ones', () => {
  const labels = { Clear: 'clear', Clouds: 'cloudy', Drizzle: 'drizzling', Fog: 'foggy', Mist: 'misty', Rain: 'raining', Snow: 'snowing', Thunderstorm: 'stormy', Haze: 'haze' };
  for (const [condition, label] of Object.entries(labels)) assert.equal(weatherDescription(condition), label);
});

test('OpenWeather condition codes survive upstream parsing and caching', async () => {
  const kv = cache();
  mock.method(globalThis, 'fetch', async () => Response.json({ ...upstream, weather: [{ main: 'Clouds', id: 801 }] }));
  const result = await getWeather({ KV: kv });
  assert.equal(result.conditionCode, 801);
  assert.equal(JSON.parse(kv.writes[0]!.value).conditionCode, 801);
  assert.deepEqual(await getWeather({ KV: cache(result) }), result);
});
