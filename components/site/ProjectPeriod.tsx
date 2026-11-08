import styles from './site.module.css';

export function ProjectPeriod({ value }: { value: string }) {
  return <span className={styles.period}>{value}</span>;
}
