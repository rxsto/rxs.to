'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import type { Weather } from '../../shared/types/weather';
import { isWeather } from '../../shared/is-weather';
import { weatherDescription } from '../../shared/weather-description';

import { contactTime, nextSolarEvent, viennaClock } from '../../shared/local-details';
import styles from './site.module.css';

/** Ticks on the minute. */
function subscribe(onChange: () => void) {
  let timer = 0;
  const schedule = () => { timer = window.setTimeout(() => { onChange(); schedule(); }, 60_000 - (Date.now() % 60_000)); };
  schedule();
  return () => window.clearTimeout(timer);
}

/** Benji's footer line: the time in Kufstein. The server and a page without scripts get the plain place and zone. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => Math.floor(Date.now() / 60_000), () => null);
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/weather', { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then((value: unknown) => { if (isWeather(value)) setWeather(value); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  const solar = time !== null ? nextSolarEvent(time * 60_000) : null;
  const details: { id: string; text: string }[] = [
    { id: 'time', text: time !== null ? `${viennaClock.format(time * 60_000)} in Kufstein, Austria` : 'Kufstein, Austria (CET)' },
    ...(weather ? [{ id: 'weather', text: `${weather.temperature}°C, ${weatherDescription(weather.description)}` }] : []),
    ...(solar ? [{ id: 'solar', text: solar }] : []),
  ];
  return <ul aria-label="Live in Kufstein" style={{ display: 'flex', flexWrap: 'wrap', gap: '0 .75em', listStyle: 'none', margin: 0, padding: 0 }}>{details.map(detail => <li key={detail.id}>{detail.text}</li>)}</ul>;
}

export function ContactTime() {
  const minute = useSyncExternalStore(subscribe, () => Math.floor(Date.now() / 60_000), () => null);
  const sentence = minute === null ? 'Local time in Kufstein.' : contactTime(minute * 60_000, Intl.DateTimeFormat().resolvedOptions().timeZone);
  return <p data-contact-time className={styles.contactTime} style={{ visibility: sentence === null ? 'hidden' : 'visible' }}>{sentence ?? 'Local time in Kufstein.'}</p>;
}
