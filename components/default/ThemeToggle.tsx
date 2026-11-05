'use client';

import { useSyncExternalStore } from 'react';
import { ThemeSwitch, type Theme } from '@/components/arc/theme-switch/theme-switch';

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};

function apply(next: Theme) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.classList.remove('light', 'dark');
  root.classList.add(next);
  try { localStorage.setItem('nuxt-color-mode', next); } catch (error) { void error; }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, (): Theme => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light', (): Theme => 'light');
  return (
    <ThemeSwitch
      theme={theme}
      iconOnly
      onThemeChange={next => {
        if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next);
        document.startViewTransition(() => apply(next));
      }}
    />
  );
}
