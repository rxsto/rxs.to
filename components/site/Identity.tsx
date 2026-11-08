import { hero, email } from './content';
import { Actions } from './parts';
import styles from './site.module.css';

export function Identity({ compact = false }: { compact?: boolean }) {
  if (compact) return <header className={styles.identity}><Portrait lazy /><a className={styles.name} href="/">{hero.name}</a></header>;
  return <header className={styles.hero}>
    <div className={styles.identity}><Portrait large /><div><h1 className={styles.name}>{hero.name}</h1><p className={styles.identityLine}>{hero.identity}</p></div></div>
    <p><em className={styles.serif}>I build web products</em>{hero.build.slice('I build web products'.length)}</p>
    <p>{hero.engagement}</p>
    <p data-intro-links>Find me on <a className={styles.link} href="https://github.com/rxsto" target="_blank" rel="noopener noreferrer">GitHub</a>, <a className={styles.link} href="https://x.com/rxsto_official" target="_blank" rel="noopener noreferrer">Twitter</a> and <a className={styles.link} href="https://linkedin.com/in/oskar-lang" target="_blank" rel="noopener noreferrer">LinkedIn</a>, or get in touch by <a className={styles.link} href={`mailto:${email}`}>email</a>. Here’s my <a className={styles.link} href="/cv">CV</a>.</p>
    <Actions />
  </header>;
}

export function Portrait({ lazy = false, large = false }: { lazy?: boolean; large?: boolean }) { return <span className={`${styles.portrait} ${large ? styles.portraitLarge : ''}`}><img src="/avatar.png" loading={lazy ? 'lazy' : 'eager'} width={large ? 64 : 40} height={large ? 64 : 40} alt="" /></span>; }
