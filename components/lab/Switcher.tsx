'use client';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../default/ThemeToggle';
import styles from './switcher.module.css';

const variants = [
  { href: '/', label: 'B' },
  { href: '/lab/profile', label: 'Profile' },
  { href: '/lab/bento', label: 'Bento' },
  { href: '/lab/story', label: 'Story' },
];

export function Switcher() {
  const path = usePathname();
  return (
    <nav className={styles.tray} aria-label="Design variants">
      {variants.map(variant => (
        <a key={variant.href} href={variant.href} className={styles.link} aria-current={path === variant.href ? 'page' : undefined}>{variant.label}</a>
      ))}
      <span className={styles.rule} aria-hidden="true" />
      <ThemeToggle variant={path === '/lab/bento' ? 'eclipse' : path === '/lab/story' ? 'split' : 'rise'} />
    </nav>
  );
}
