'use client';

import { useSyncExternalStore } from 'react';
import { ThemeSwitch, type Theme, type ThemeSwitchVariant } from '@/components/arc/theme-switch/theme-switch';

const system = () => matchMedia('(prefers-color-scheme: dark)');

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  system().addEventListener('change', onChange);
  return () => { observer.disconnect(); system().removeEventListener('change', onChange); };
};

const current = (): Theme => {
  const stored = document.documentElement.dataset.theme;
  if (stored === 'dark' || stored === 'light') return stored;
  return system().matches ? 'dark' : 'light';
};

function apply(next: Theme) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.classList.remove('light', 'dark');
  root.classList.add(next);
  try { localStorage.setItem('nuxt-color-mode', next); } catch (error) { void error; }
}

function clipFrom(variant: ThemeSwitchVariant, trigger: HTMLElement): [string, string] {
  const { left, top, width, height } = trigger.getBoundingClientRect();
  const x = left + width / 2, y = top + height / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  if (variant === 'eclipse') return [`circle(${r}px at ${-r}px ${y}px)`, `circle(${r * 2.2}px at ${x}px ${y}px)`];
  if (variant === 'split') return ['inset(0 50% 0 50%)', 'inset(0 0 0 0)'];
  if (variant === 'rise') return ['inset(100% 0 0 0)', 'inset(0 0 0 0)'];
  return [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`];
}

export function ThemeToggle({ variant = 'reveal' }: { variant?: ThemeSwitchVariant }) {
  const theme = useSyncExternalStore(subscribe, current, (): Theme => 'light');
  return (
    <ThemeSwitch
      theme={theme}
      variant={variant}
      iconOnly
      onThemeChange={(next, chosen, trigger) => {
        if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next);
        const transition = document.startViewTransition(() => apply(next));
        transition.ready.then(() => {
          document.documentElement.animate(
            { clipPath: clipFrom(chosen, trigger) },
            { duration: chosen === 'eclipse' ? 700 : 480, easing: 'cubic-bezier(.22, 1, .36, 1)', pseudoElement: '::view-transition-new(root)' },
          );
        });
      }}
    />
  );
}
