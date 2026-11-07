import type { ReactNode } from 'react';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { email } from './content';
import { LocalTime } from './LocalTime';
import { ThemeToggle } from './ThemeToggle';
import styles from './site.module.css';

/** A paragraph of copy that Oskar has not written or approved yet. */
export function DraftText({ children, label = 'Placeholder copy' }: { children: ReactNode; label?: string }) {
  return <p className={styles.draft}><span className={styles.draftLabel}>{label}</span>{children}</p>;
}

export function Actions() {
  return (
    <div className={styles.actions}>
      <span className={styles.splitButton}><a className={styles.button} href={`mailto:${email}`}>Email me</a><span className={styles.noScriptHide}><CopyButton className={styles.copyEmail} value={email} label="Copy email" iconOnly /></span></span>
      <a className={`${styles.button} ${styles.secondaryButton}`} href="/cv">CV</a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <LocalTime />
      <div className={styles.footerRow}>
        <ul className={styles.footerLinks} aria-label="Elsewhere">
          <li><a href="https://linkedin.com/in/oskar-lang" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://discord.gg/r7tqQVs" target="_blank" rel="noopener noreferrer">Discord</a></li>
        </ul>
        <span className={styles.noScriptHide}><ThemeToggle /></span>
      </div>
    </footer>
  );
}
