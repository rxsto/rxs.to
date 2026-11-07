import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactTime, nextSolarEvent, viennaClock } from '../shared/local-details.ts';
import { kufsteinSolarTimes } from '../shared/solar.ts';

// Kufstein local times from https://www.timeanddate.com/sun/austria/kufstein?month=3 (also months 6, 10, 12), 2026.
for (const [date, sunrise, sunset] of [
  ['2026-03-29', '06:56', '19:36'],
  ['2026-06-21', '05:13', '21:12'],
  ['2026-10-25', '06:44', '17:05'],
  ['2026-12-21', '07:56', '16:22'],
]) test(`Kufstein sunrise and sunset within two minutes on ${date}`, () => {
  const times = kufsteinSolarTimes(date);
  for (const [actual, expected] of [[times.sunrise, sunrise], [times.sunset, sunset]] as const) {
    const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
    assert.ok(Math.abs(minutes(viennaClock.format(actual)) - minutes(expected)) <= 2, `${viennaClock.format(actual)} vs ${expected}`);
  }
});

test('next solar event rolls to tomorrow after sunset, across both DST changes and midnight', () => {
  for (const date of ['2026-03-28', '2026-06-21', '2026-10-24', '2026-12-21']) {
    const times = kufsteinSolarTimes(date);
    assert.equal(nextSolarEvent(times.sunrise - 60_000), `sunrise ${viennaClock.format(times.sunrise)}`);
    assert.equal(nextSolarEvent(times.sunrise), `sunset ${viennaClock.format(times.sunset)}`);
    const tomorrow = new Date(Date.parse(`${date}T12:00:00Z`) + 86_400_000).toISOString().slice(0, 10);
    const expected = `sunrise ${viennaClock.format(kufsteinSolarTimes(tomorrow).sunrise)}`;
    assert.equal(nextSolarEvent(times.sunset), expected);
    assert.equal(nextSolarEvent(Date.parse(`${date}T22:30:00Z`)), expected);
  }
});

test('contact sentence compares displayed time, including different zones with equal clocks', () => {
  const now = Date.parse('2026-11-07T16:12:00Z');
  assert.equal(contactTime(now, 'America/Los_Angeles'), "It's 08:12 for you, 17:12 in Kufstein.");
  assert.equal(contactTime(now, 'Europe/Vienna'), null);
  assert.equal(contactTime(now, 'Europe/Berlin'), null);
  assert.equal(contactTime(Date.parse('2026-07-07T16:12:00Z'), 'UTC'), "It's 16:12 for you, 18:12 in Kufstein.");
});
