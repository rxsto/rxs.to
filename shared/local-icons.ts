import { kufsteinSolarTimes } from './solar';

export function dayPeriod(now: number) {
  const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const { sunrise, sunset } = kufsteinSolarTimes(date);
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Vienna', hour: '2-digit', hourCycle: 'h23' }).format(now));
  if (now < sunrise - 45 * 60_000 || now >= sunset + 45 * 60_000) return 'night';
  if (now < sunrise) return 'dawn';
  if (now >= sunset - 30 * 60_000) return 'sunset';
  if (hour < 11) return 'morning';
  if (hour < 14) return 'noon';
  return 'afternoon';
}

export function weatherCondition(code: number | undefined, description: string) {
  if (code !== undefined) {
    if (code < 300) return 'thunderstorm';
    if (code < 400) return 'drizzle';
    if (code < 600) return 'rain';
    if (code < 700) return 'snow';
    if (code < 800) return 'fog';
    if (code === 800) return 'clear';
    if (code === 801) return 'few-clouds';
    return 'clouds';
  }
  // Older shared KV entries have only OpenWeather's condition name.
  switch (description.toLowerCase()) {
    case 'clear': return 'clear';
    case 'clouds': return 'clouds';
    case 'drizzle': return 'drizzle';
    case 'rain': return 'rain';
    case 'thunderstorm': return 'thunderstorm';
    case 'snow': return 'snow';
    default: return 'fog';
  }
}
