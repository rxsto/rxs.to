import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarDays, commitLevel, commitThresholds } from '../components/site/commit-calendar.ts';

test('quartiles ignore zero days and keep an outlier from flattening the scale', () => {
  const thresholds = commitThresholds([0, 1, 2, 3, 4, 5, 6, 7, 565]);
  assert.deepEqual(thresholds, [2, 4, 6]);
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7, 565].map(count => commitLevel(count, thresholds)), [0, 1, 1, 2, 2, 3, 3, 4, 4]);
  assert.deepEqual(commitThresholds([]), [0, 0, 0]);
  assert.deepEqual(commitThresholds([2, 2, 2]), [2, 2, 2]);
});

test('weeks start on Sunday with invisible space before January 1', () => {
  const days = calendarDays(2026, '2026-11-09');
  assert.deepEqual(days[0], { date: '2026-01-01', column: 1, row: 5 });
  assert.deepEqual(days[3], { date: '2026-01-04', column: 2, row: 1 });
  assert.equal(days.at(-1)?.date, '2026-11-09');
  assert.equal(days.length, 313);
});

test('historical years include leap days and the whole final week', () => {
  const leap = calendarDays(2020, '2026-11-09');
  assert.equal(leap.length, 366);
  assert.equal(leap[59].date, '2020-02-29');
  assert.deepEqual(leap.at(-1), { date: '2020-12-31', column: 53, row: 5 });
  assert.deepEqual(calendarDays(2023, '2026-11-09')[0], { date: '2023-01-01', column: 1, row: 1 });
  for (let year = 2018; year <= 2026; year++) assert.ok(calendarDays(year, '2026-11-09').every(day => day.column <= 53));
});
