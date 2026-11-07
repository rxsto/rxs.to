import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CopyButton } from '@/components/arc/copy-button/copy-button';
import { contact, email, links, type Row } from './content';
import { cv } from '../../shared/cv';
import { ContactTime, LocalTime } from './LocalTime';
import { ThemeToggle } from './ThemeToggle';
import styles from './site.module.css';

/** A paragraph of copy that Oskar has not written or approved yet. */
export function DraftText({ children, label = 'Placeholder copy' }: { children: ReactNode; label?: string }) {
  return <p className={styles.draft}><span className={styles.draftLabel}>{label}</span>{children}</p>;
}

/** Where an approved image will go. */
export function MissingImage({ children }: { children: ReactNode }) {
  return <div className={styles.missing} role="img" aria-label={`Placeholder: ${children}`}>Image to come: {children}</div>;
}

const isExternal = (href: string) => href.startsWith('http');

/** Jakub's two-line rows: a small tile, a title, and one muted line. */
export function Rows({ rows, currentHref }: { rows: Row[]; currentHref?: string }) {
  return (
    <ul className={styles.rows}>
      {rows.map(row => {
        const body = <>
          <span className={styles.tile} aria-hidden="true">
            {row.mark}
          </span>
          <span className={styles.rowText}>
            <span className={styles.rowTitle}>{row.title}{row.href && isExternal(row.href) && <ArrowUpRight className={styles.external} size={14} aria-hidden="true" />}</span>
            <span className={styles.rowDetail}>{row.detail}</span>
          </span>
        </>;
        return (
          <li key={row.title}>
            {row.href && row.href !== currentHref
              ? <a className={styles.row} href={row.href} {...(isExternal(row.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a>
              : <div className={styles.row}>{body}</div>}
            {row.imagePending && <p className={styles.pendingLine}><span className={styles.draftLabel}>Placeholder</span>{row.imagePending}</p>}
          </li>
        );
      })}
    </ul>
  );
}

export function Actions() {
  return (
    <div className={styles.actions}>
      <span className={styles.splitButton}><a className={styles.button} href={`mailto:${email}`}>Email me</a><span className={styles.noScriptHide}><CopyButton className={styles.copyEmail} value={email} label="Copy email" iconOnly /></span></span>
      <a className={`${styles.button} ${styles.secondaryButton}`} href="/cv">CV</a>
    </div>
  );
}

export function ContactClose() {
  return (
    <section className={styles.close} aria-labelledby="contact">
      <h2 id="contact" className={styles.heading}>{contact.title}</h2>
      <p>{contact.body}</p>
      <Actions />
      <ContactTime />
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <LocalTime />
      <p>Built with Arc on Cloudflare Workers. CV as <a className={styles.link} href="/cv.json">JSON Resume</a> or <a className={styles.link} href="/cv.md">Markdown</a>. I work in {cv.languages.map(item => item.language).join(" and ")}.</p>
      <div className={styles.footerRow}>
        <ul className={styles.footerLinks} aria-label="Elsewhere">
          {links.map(link => <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}
          <li><a href="/cv">CV</a></li>
        </ul>
        <span className={styles.noScriptHide}><ThemeToggle /></span>
      </div>
    </footer>
  );
}

export function Back({ href = '/', children }: { href?: string; children: ReactNode }) {
  return <a className={styles.back} href={href}>← {children}</a>;
}
