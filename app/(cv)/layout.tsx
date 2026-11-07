import type { ReactNode } from 'react';

import { Footer } from '../../components/site/parts';
import styles from '../../components/site/site.module.css';
export default function CvLayout({ children }: { children: ReactNode }) {
  return <div className={styles.page}><a className={styles.link} href="/">← Home</a>{children}<Footer /></div>;
}
