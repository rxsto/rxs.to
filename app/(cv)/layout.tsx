import type { ReactNode } from 'react';
import { Identity } from '../../components/site/Identity';
import { Footer } from '../../components/site/parts';
import styles from '../../components/site/site.module.css';
export default function CvLayout({ children }: { children: ReactNode }) {
  return <div className={styles.page}><Identity compact />{children}<Footer /></div>;
}
