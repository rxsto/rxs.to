import { kufsteinSolarTimes } from './solar';

export const viennaClock = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Vienna' });

export function nextSolarEvent(now: number): string {
  const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const today = kufsteinSolarTimes(date);
  if (now < today.sunrise) return `sunrise ${viennaClock.format(today.sunrise)}`;
  if (now < today.sunset) return `sunset ${viennaClock.format(today.sunset)}`;
  const tomorrow = new Date(Date.parse(`${date}T12:00:00Z`) + 86_400_000).toISOString().slice(0, 10);
  return `sunrise ${viennaClock.format(kufsteinSolarTimes(tomorrow).sunrise)}`;
}

export function contactTime(now: number, visitorZone: string): string | null {
  const yours = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: visitorZone }).format(now);
  const mine = viennaClock.format(now);
  return yours === mine ? null : `It's ${yours} for you, ${mine} in Kufstein.`;
}
