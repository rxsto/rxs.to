import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { email } from './content';
import { LocalTime } from './LocalTime';
import { ThemeToggle } from './ThemeToggle';
import button from '@/components/arc/button/button.module.css';
import Link from 'next/link';
import styles from './site.module.css';

export function EmailButton() {
  return <span className={styles.emailActions}><a className={`${button.button} ${button.primary} ${button.md}`} href={`mailto:${email}`}>Email me</a><span className={styles.noScriptHide}><CopyButton value={email} label="Copy email" iconOnly /></span></span>;
}

export function Actions() {
  return (
    <div className={`${styles.actions} ${styles.heroActions}`}>
      <EmailButton />
      <Link className={`${button.button} ${button.secondary} ${button.md}`} href="/cv">CV</Link>
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
          <li><a href="https://x.com/rxsto_official" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://linkedin.com/in/oskar-lang" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://discord.gg/r7tqQVs" target="_blank" rel="noopener noreferrer">Discord</a></li>
          <li><Link href="/cv">CV</Link></li>
        </ul>
        <span className={styles.noScriptHide}><ThemeToggle /></span>
      </div>
    </footer>
  );
}
