import type { Weather } from './types/weather';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isWeather(value: unknown): value is Weather {
  return isRecord(value)
    && typeof value.location === 'string' && value.location.trim().length > 0
    && typeof value.description === 'string'
    && (value.conditionCode === undefined || (typeof value.conditionCode === 'number' && Number.isInteger(value.conditionCode) && value.conditionCode >= 200 && value.conditionCode <= 804))
    && typeof value.temperature === 'number' && Number.isFinite(value.temperature);
}
