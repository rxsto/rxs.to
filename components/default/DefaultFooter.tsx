'use client';

import { useEffect, useState } from 'react';
import type { Weather } from '../../shared/types/weather';
import { isWeather } from '../../shared/is-weather';
import { weatherDescription } from '../../shared/weather-description';
import { ThemeToggle } from './ThemeToggle';

export function DefaultFooter() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/weather', { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then((value: unknown) => { if (isWeather(value)) setWeather(value); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <footer className="flex flex-col gap-2 text-xs text-muted">
      {weather && <p className="weather-line">{weather.location}, {weather.temperature}° {weatherDescription(weather.description)}</p>}
      <div className="flex items-center justify-between"><p>© Forever.</p><ThemeToggle /></div>
    </footer>
  );
}
