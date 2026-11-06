'use client';

import { useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';
import { RulerSlider } from '@/components/arc/ruler-slider/ruler-slider';
import { Badge } from '@/components/arc/badge/badge';
import { since } from './content';
import styles from './site.module.css';

const first = since[0].year;
const last = since[since.length - 1].year;
/** A year without an entry lands on the latest earlier one, so the ruler never implies an event that did not happen. */
const entryFor = (year: number) => [...since].reverse().find(entry => entry.year <= year) ?? since[0];
const formatYear = (year: number) => String(year);
const noop = () => () => {};

function announce(year: number) {
  const entry = entryFor(year);
  return entry.year === year ? `${year}: ${entry.title}` : `${year}: no entry. Latest before it, ${entry.year}: ${entry.title}`;
}

/**
 * The Since 2018 index. The five dated rows are plain links and are all you get without scripts or with reduced motion.
 * With both, a ruler sits above them: moving it steps back every row but the one under the needle, and each commit
 * (a key press, or the tape coming to rest) is announced once through a polite live region.
 */
export function SinceRuler() {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const reduced = useReducedMotion() ?? false;
  const live = hydrated && !reduced;
  const [year, setYear] = useState<number>(last);
  const [message, setMessage] = useState('');
  const active = live ? entryFor(year).year : undefined;

  return (
    <>
      <div className={styles.rulerSlot}>
        {live && (
          <RulerSlider
            className={styles.ruler}
            label="Move through the years"
            min={first}
            max={last}
            step={1}
            majorEvery={1}
            spacing={56}
            format={formatYear}
            value={year}
            onValueChange={setYear}
            onValueCommit={next => setMessage(announce(next))}
          />
        )}
      </div>
      <ol className={styles.ledger} data-active={active ?? undefined}>
        {since.map(entry => (
          <li key={entry.year}>
            <a className={styles.ledgerRow} href={`/story#${entry.year}`} data-active={entry.year === active || undefined}>
              <span className={styles.ledgerYear}>{entry.year}</span>
              <span className={styles.ledgerTitle}>
                {entry.title}
                {'isNew' in entry && <Badge tone="info" size="sm">New</Badge>}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className={styles.srOnly} aria-live="polite">{message}</p>
    </>
  );
}
