'use client';

import { useHere } from './Here';
import styles from './bento.module.css';

export function BentoClock() {
  const { time, weather } = useHere();
  return (
    <div className={styles.clock}>
      <span className={styles.clockTime}><time>{time ?? '--:--'}</time></span>
      <span className={styles.muted}>{weather ? `Kufstein, ${weather}` : 'Kufstein, Austria'}</span>
    </div>
  );
}
