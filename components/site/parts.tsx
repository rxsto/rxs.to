import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { email } from './content';
import { LocalTime } from './LocalTime';
import { ThemeToggle } from './ThemeToggle';
import { Availability } from './Availability';
import styles from './site.module.css';

export function EmailButton() {
  return <span className={styles.splitButton}><a className={styles.button} href={`mailto:${email}`}>Email me</a><span className={styles.noScriptHide}><CopyButton className={styles.copyEmail} value={email} label="Copy email" iconOnly /></span></span>;
}

export function Actions() {
  return (
    <div className={`${styles.actions} ${styles.heroActions}`}>
      <EmailButton />
      <a className={`${styles.button} ${styles.secondaryButton}`} href="/cv">CV</a>
      <Availability className={styles.availability} />
    </div>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <LocalTime />
      <div className={styles.footerRow}>
        <ul className={styles.footerLinks} aria-label="Elsewhere">
          <li><a href="https://github.com/rxsto" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://linkedin.com/in/oskar-lang" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
        <span className={styles.noScriptHide}><ThemeToggle /></span>
      </div>
    </footer>
  );
}
