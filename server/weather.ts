import type { Weather } from '../shared/types/weather';
import { isRecord, isWeather } from '../shared/is-weather';

interface WeatherCache {
  get(key: string, type: 'json'): Promise<unknown>;
  put(key: string, value: string, options: { expirationTtl: number }): Promise<void>;
}

interface WeatherEnvironment {
  KV: WeatherCache;
  OPEN_WEATHER_API_KEY?: string;
}

export class WeatherError extends Error {
  constructor(message: 'Weather upstream unavailable' | 'Invalid weather response') {
    super(message);
  }
}

export async function getWeather(env: WeatherEnvironment): Promise<Weather> {
  const cache = await env.KV.get('weather', 'json').catch(() => null);
  if (isWeather(cache)) return cache;

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.search = new URLSearchParams({ units: 'metric', lat: '47.5824', lon: '12.1627', appid: env.OPEN_WEATHER_API_KEY ?? '' }).toString();

  const upstream = await fetch(url, { signal: AbortSignal.timeout(2000) })
    .catch(() => { throw new WeatherError('Weather upstream unavailable'); });
  if (!upstream.ok) throw new WeatherError('Weather upstream unavailable');
  const response: unknown = await upstream.json()
    .catch(() => { throw new WeatherError('Invalid weather response'); });

  if (!isRecord(response) || typeof response.name !== 'string' || !response.name.trim()
    || !isRecord(response.main) || typeof response.main.temp !== 'number' || !Number.isFinite(response.main.temp)
    || !Array.isArray(response.weather) || !isRecord(response.weather[0]) || typeof response.weather[0].main !== 'string') {
    throw new WeatherError('Invalid weather response');
  }

  const state: Weather = {
    location: response.name,
    description: response.weather[0].main,
    temperature: Math.round(response.main.temp),
  };
  const code = response.weather[0].id;
  if (typeof code === 'number' && Number.isInteger(code) && code >= 200 && code <= 804) state.conditionCode = code;
  await env.KV.put('weather', JSON.stringify(state), { expirationTtl: 3600 }).catch(() => {});
  return state;
}
