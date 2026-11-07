import { SocialMark } from './SocialMark';
import { hero } from './content';
import { Actions } from './parts';
import styles from './site.module.css';

export function Identity({ compact = false }: { compact?: boolean }) {
  if (compact) return <header className={styles.identity}><Portrait lazy /><a className={styles.name} href="/">{hero.name}</a></header>;
  return <header className={styles.hero}>
    <div className={styles.identity}><Portrait /><h1 className={styles.name}>{hero.name}</h1><span className={styles.identityLine}>Software engineer</span></div>
    <p>I build web products for clients like Digital Office 24, Top.gg and Finaure.</p>
    <p>Based in Kufstein, Austria. Find me on <a className={styles.inlineLink} href="https://github.com/rxsto" target="_blank" rel="noopener noreferrer"><SocialMark name="github" />GitHub</a>, <a className={styles.inlineLink} href="https://x.com/rxsto_official" target="_blank" rel="noopener noreferrer"><SocialMark name="twitter" />Twitter</a> and <a className={styles.inlineLink} href="https://linkedin.com/in/oskar-lang" target="_blank" rel="noopener noreferrer"><SocialMark name="linkedin" />LinkedIn</a>.</p>
    <Actions />
  </header>;
}

export function Portrait({ lazy = false }: { lazy?: boolean }) { return <span className={styles.portrait}><img src="/portrait.png" loading={lazy ? 'lazy' : 'eager'} width={40} height={40} alt="" /></span>; }
