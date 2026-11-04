import type { Weather } from './types/weather';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isWeather(value: unknown): value is Weather {
  return isRecord(value)
    && typeof value.location === 'string' && value.location.trim().length > 0
    && typeof value.description === 'string'
    && typeof value.temperature === 'number' && Number.isFinite(value.temperature);
}
