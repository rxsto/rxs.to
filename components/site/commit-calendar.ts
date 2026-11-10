export function commitThresholds(counts: number[]) {
  const sorted = counts.filter(count => count > 0).sort((a, b) => a - b);
  return [0.25, 0.5, 0.75].map(part => sorted[Math.floor(part * (sorted.length - 1))] ?? 0);
}

export function commitLevel(count: number, thresholds: number[]) {
  return count === 0 ? 0 : 1 + thresholds.filter(threshold => count > threshold).length;
}

export function calendarDays(year: number, last: string) {
  const start = Date.UTC(year, 0, 1);
  const end = Math.min(Date.UTC(year, 11, 31), Date.parse(`${last}T00:00:00Z`));
  const padding = new Date(start).getUTCDay();
  const days = Array.from({ length: Math.max(0, (end - start) / 86400000 + 1) }, (_, index) => ({
    date: new Date(start + index * 86400000).toISOString().slice(0, 10),
    column: Math.floor((index + padding) / 7) + 1,
    row: (index + padding) % 7 + 1,
  }));
  return days;
}
