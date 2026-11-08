import { ArrowUpRight } from 'lucide-react';
import styles from './site.module.css';

export function ExternalArrow() {
  return <ArrowUpRight className={styles.externalArrow} aria-hidden="true" />;
}
