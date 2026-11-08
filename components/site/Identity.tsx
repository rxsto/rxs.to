import { AppWindow, MessagesSquare, AudioLines } from 'lucide-react';
import { hero } from './content';
import { Actions } from './parts';
import styles from './site.module.css';

export function Identity({ compact = false }: { compact?: boolean }) {
  if (compact) return <header className={styles.identity}><Portrait lazy /><a className={styles.name} href="/">{hero.name}</a></header>;
  return <header className={styles.hero}>
    <div className={styles.identity}><Portrait large /><div><h1 className={styles.name}>{hero.name}</h1><p className={styles.identityLine}>{hero.identity}</p></div></div>
    <p>I build <span className={styles.emphasis}><AppWindow aria-hidden="true" />web products</span> and <span className={styles.emphasis}><MessagesSquare aria-hidden="true" />Discord bots</span>. I co-own <span className={styles.emphasis}>Hydra</span>, lead <span className={styles.emphasis}><AudioLines aria-hidden="true" />the official SoundCloud bot</span>, and have been self-employed <span className={styles.emphasis}>since 2018</span>.</p>
    <p>{hero.engagement}</p>
    <Actions />
  </header>;
}

export function Portrait({ lazy = false, large = false }: { lazy?: boolean; large?: boolean }) { return <span className={`${styles.portrait} ${large ? styles.portraitLarge : ''}`}><img src="/avatar.png" loading={lazy ? 'lazy' : 'eager'} width={large ? 56 : 40} height={large ? 56 : 40} alt="" /></span>; }
