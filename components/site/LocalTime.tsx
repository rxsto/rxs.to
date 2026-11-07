'use client';

import { Moon, Sunrise, Sunset, Sun, SunMedium, SunDim, CloudSun, CloudMoon, Cloud, CloudDrizzle, CloudRain, CloudLightning, Snowflake, CloudFog } from 'lucide-react';
import { dayPeriod, weatherCondition } from '../../shared/local-icons';
import { useEffect, useState, useSyncExternalStore } from 'react';
import type { Weather } from '../../shared/types/weather';
import { isWeather } from '../../shared/is-weather';
import { weatherDescription } from '../../shared/weather-description';

import { nextSolarEvent, viennaClock } from '../../shared/local-details';
import styles from './site.module.css';

/** Ticks on the minute. */
function subscribe(onChange: () => void) {
  let timer = 0;
  const schedule = () => { timer = window.setTimeout(() => { onChange(); schedule(); }, 60_000 - (Date.now() % 60_000)); };
  schedule();
  return () => window.clearTimeout(timer);
}

/** Stable slots reserve the live details before hydration and while weather loads. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => Math.floor(Date.now() / 60_000), () => null);
  const [failed, setFailed] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/weather', { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then((value: unknown) => { if (isWeather(value)) setWeather(value); else setFailed(true); })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  const solar = time !== null ? nextSolarEvent(time * 60_000) : null;
  const period = time === null ? null : dayPeriod(time * 60_000);
  const TimeIcon = period === null ? SunDim : { night: Moon, dawn: Sunrise, morning: SunDim, noon: Sun, afternoon: SunMedium, sunset: Sunset }[period];
  const night = period === 'night' || period === 'dawn';
  const condition = weather ? weatherCondition(weather.conditionCode, weather.description) : null;
  const WeatherIcon = condition === null ? Cloud : { clear: night ? Moon : Sun, 'few-clouds': night ? CloudMoon : CloudSun, clouds: Cloud, drizzle: CloudDrizzle, rain: CloudRain, thunderstorm: CloudLightning, snow: Snowflake, fog: CloudFog }[condition];
  const SolarIcon = solar?.startsWith('sunrise') ? Sunrise : Sunset;
  return <ul aria-label="Live in Kufstein" className={styles.localDetails}>
    <li data-period={period ?? 'pending'}><TimeIcon aria-hidden="true" /><span><span style={{ visibility: time === null ? 'hidden' : 'visible' }}>{time === null ? '00:00' : viennaClock.format(time * 60_000)}</span> in Kufstein, Austria</span></li>
    <li className={styles.weatherGroup}><span className={styles.weatherSlot} data-condition={condition ?? (failed ? 'unavailable' : 'pending')}>{weather ? <><WeatherIcon aria-hidden="true" /><span>{weather.temperature}°C, {weatherDescription(weather.description)}</span></> : failed ? <span>Weather unavailable</span> : null}</span>
    <span style={{ visibility: solar ? 'visible' : 'hidden' }}><SolarIcon aria-hidden="true" /><span>{solar ?? 'sunrise 00:00'}</span></span></li>
  </ul>;
}
