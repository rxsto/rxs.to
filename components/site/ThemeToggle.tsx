'use client';

import { Moon, Sun } from 'lucide-react';
import styles from './site.module.css';

export function ThemeToggle() {
  return <button type="button" className={`${styles.roundButton} ${styles.themeToggle}`} aria-label="Switch to alternate color mode" onClick={() => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    root.classList.remove('light', 'dark');
    root.classList.add(next);
    try { localStorage.setItem('nuxt-color-mode', next); } catch (error) { void error; }
  }}><Sun className={styles.sunIcon} aria-hidden="true" /><Moon className={styles.moonIcon} aria-hidden="true" /></button>;
}
