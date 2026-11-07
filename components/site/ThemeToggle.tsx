'use client';

import { Moon, Sun } from 'lucide-react';
import button from '@/components/arc/button/button.module.css';
import styles from './site.module.css';

export function ThemeToggle() {
  return <button type="button" className={`${button.button} ${button.ghost} ${button.md} ${styles.themeToggle}`} onClick={() => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    root.classList.remove('light', 'dark');
    root.classList.add(next);
    try { localStorage.setItem('nuxt-color-mode', next); } catch (error) { void error; }
  }}><span className={styles.toDark}><Moon aria-hidden="true" /><span className="sr-only">Switch to dark theme</span></span><span className={styles.toLight}><Sun aria-hidden="true" /><span className="sr-only">Switch to light theme</span></span></button>;
}
