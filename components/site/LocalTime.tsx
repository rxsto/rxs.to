'use client';

import { useSyncExternalStore } from 'react';

const clock = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Vienna' });

/** Ticks on the minute. */
function subscribe(onChange: () => void) {
  let timer = 0;
  const schedule = () => { timer = window.setTimeout(() => { onChange(); schedule(); }, 60_000 - (Date.now() % 60_000)); };
  schedule();
  return () => window.clearTimeout(timer);
}

/** Benji's footer line: the time in Kufstein. The server and a page without scripts get the plain place and zone. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => clock.format(Date.now()), () => null);
  return <p>{time ? `${time} in Kufstein, Austria` : 'Kufstein, Austria (CET)'}</p>;
}
