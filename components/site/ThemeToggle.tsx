'use client';

import { useSyncExternalStore } from 'react';
import { ThemeSwitch, type Theme } from '@/components/arc/theme-switch/theme-switch';
import styles from './site.module.css';

const system = () => matchMedia('(prefers-color-scheme: dark)');
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  const media = system();
  media.addEventListener('change', onChange);
  return () => { observer.disconnect(); media.removeEventListener('change', onChange); };
};
const current = (): Theme => {
  const stored = document.documentElement.dataset.theme;
  return stored === 'dark' || stored === 'light' ? stored : system().matches ? 'dark' : 'light';
};
function apply(next: Theme) {
    const root = document.documentElement;
    root.dataset.theme = next;
    root.classList.remove('light', 'dark');
    root.classList.add(next);
    try { localStorage.setItem('nuxt-color-mode', next); } catch (error) { void error; }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, current, (): Theme => 'light');
  return <span className={styles.themeToggle}><ThemeSwitch theme={theme} variant="rise" iconOnly label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onThemeChange={next => {
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next);
    const transition = document.startViewTransition(() => apply(next));
    void transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'] },
        { duration: 480, easing: 'cubic-bezier(.22, 1, .36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }} /></span>;
}
