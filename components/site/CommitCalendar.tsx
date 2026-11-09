'use client';

import { useMemo, useState } from 'react';
import { calendarDays, commitLevel, commitThresholds } from './commit-calendar';
import button from '../arc/button/button.module.css';
import styles from './site.module.css';

const number = new Intl.NumberFormat('en');
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export function CommitCalendar({ days, last, repos, years }: {
  days: Record<string, number>; last: string; repos: number; years: number[];
}) {
  const [year, setYear] = useState(Number(last.slice(0, 4)));
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useState<number | null>(null);
  const thresholds = useMemo(() => commitThresholds(Object.values(days)), [days]);
  const calendar = useMemo(() => calendarDays(year, last), [year, last]);
  const total = calendar.reduce((sum, day) => sum + (days[day.date] ?? 0), 0);
  const describe = (dayIndex: number) => {
    const day = calendar[dayIndex];
    const count = days[day.date] ?? 0;
    return `${dateFormat.format(new Date(`${day.date}T00:00:00Z`))} · ${number.format(count)} ${count === 1 ? 'commit' : 'commits'}`;
  };

  return <section className={styles.section} aria-labelledby="commits">
    <div className={styles.headingRow}>
      <h2 id="commits" className={styles.heading}>Commits</h2>
      <div className={styles.commitYears} role="group" aria-label="Commit year">
        {years.map(value => <button key={value} type="button" className={`${button.button} ${button.ghost} ${button.sm} ${styles.commitYear}`} aria-pressed={year === value} onClick={() => {
          setYear(value); setIndex(0); setDetail(null);
        }}>{value}</button>)}
      </div>
    </div>
    <span id="commit-help" className={styles.screenReaderOnly}>Use up and down for adjacent days, left and right for weeks, Home and End for the first and last day.</span>
    <div className={styles.commitGrid} role="slider" tabIndex={0} aria-label={`Daily commits in ${year}`} aria-describedby="commit-help" aria-valuemin={1} aria-valuemax={calendar.length} aria-valuenow={index + 1} aria-valuetext={describe(index)} onFocus={() => setDetail(index)} onBlur={() => setDetail(null)} onPointerLeave={event => {
      if (event.pointerType !== 'touch') setDetail(null);
    }} onPointerMove={event => {
      if (!(event.target instanceof HTMLElement)) return;
      const value = event.target.dataset.dayIndex;
      if (value !== undefined) setDetail(Number(value));
      else setDetail(null);
    }} onPointerDown={event => {
      if (!(event.target instanceof HTMLElement)) return;
      const value = event.target.dataset.dayIndex;
      if (value !== undefined) {
        event.preventDefault(); event.currentTarget.focus();
        setIndex(Number(value)); setDetail(Number(value));
      }
    }} onKeyDown={event => {
      let next = index;
      switch (event.key) {
        case 'ArrowLeft': next -= 7; break;
        case 'ArrowRight': next += 7; break;
        case 'ArrowUp': next -= 1; break;
        case 'ArrowDown': next += 1; break;
        case 'Home': next = 0; break;
        case 'End': next = calendar.length - 1; break;
        default: return;
      }
      event.preventDefault();
      next = Math.max(0, Math.min(calendar.length - 1, next));
      setIndex(next); setDetail(next);
    }}>
      {calendar.map((day, dayIndex) => <span key={day.date} aria-hidden="true" className={styles.commitDay} data-day-index={dayIndex} data-level={commitLevel(days[day.date] ?? 0, thresholds)} data-active={index === dayIndex} style={{ gridColumn: day.column, gridRow: day.row }} />)}
    </div>
    <p className={styles.commitDetail} data-commit-detail="">{detail === null ? `${number.format(total)} commits in ${year}` : describe(detail)}</p>
    <p className={styles.commitNote}>Commits on default branches across {repos} repositories. Some client work isn’t included.</p>
  </section>;
}
