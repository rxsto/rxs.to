import { ArrowRight } from 'lucide-react';
import styles from './site.module.css';

export function ProjectPeriod({ value }: { value: string }) {
  const [start, end] = value.split(' to ');
  return <span className={styles.period}><span className={styles.screenReaderOnly}>{value}</span><span aria-hidden="true">{start}</span><span className={styles.periodLine} aria-hidden="true"><ArrowRight /></span><span aria-hidden="true" className={end === 'now' ? styles.periodNow : undefined}>{end}</span></span>;
}
