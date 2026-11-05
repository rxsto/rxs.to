'use client';

import { useEffect, useState } from 'react';
import type { Weather } from '../../shared/types/weather';
import { isWeather } from '../../shared/is-weather';
import { weatherDescription } from '../../shared/weather-description';

const clock = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Vienna' });

export function useHere() {
  const [now, setNow] = useState<number | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 15_000);
    const controller = new AbortController();
    fetch('/api/weather', { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then((value: unknown) => { if (isWeather(value)) setWeather(value); })
      .catch(() => {});
    return () => { clearInterval(timer); controller.abort(); };
  }, []);
  return {
    time: now === null ? null : clock.format(now),
    weather: weather && `${weather.temperature}° ${weatherDescription(weather.description).toLowerCase()}`,
  };
}

export function Here({ className }: { className?: string }) {
  const { time, weather } = useHere();
  return (
    <span className={className}>
      Kufstein, Austria{time && <> · <time>{time}</time></>}{weather && <> · {weather}</>}
    </span>
  );
}
