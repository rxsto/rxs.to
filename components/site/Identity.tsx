import { CodeXml, AtSign } from 'lucide-react';
import { Avatar } from '@/components/arc/avatar/avatar';
import { hero } from './content';
import { Actions } from './parts';
import styles from './site.module.css';

export function Identity({ compact = false }: { compact?: boolean }) {
  if (compact) return <header className={styles.identity}><Avatar name={hero.name} src="/avatar.png" size="sm" /><a className={styles.name} href="/">{hero.name}</a></header>;
  return <header className={styles.hero}>
    <div className={styles.identity}><span className={styles.portrait}><img src="/avatar.png" width={32} height={32} alt="" /></span><h1 className={styles.name}>{hero.name}</h1><span className={styles.identityLine}>Software engineer</span></div>
    <p>Self-employed, I build web products for clients and Discord bots.</p>
    <p>Based in Kufstein, Austria. Find me on <a className={styles.inlineLink} href="https://github.com/rxsto" target="_blank" rel="noopener noreferrer"><CodeXml aria-hidden="true" />GitHub</a> or <a className={styles.inlineLink} href="https://x.com/rxsto_official" target="_blank" rel="noopener noreferrer"><AtSign aria-hidden="true" />Twitter</a>.</p>
    <Actions />
  </header>;
}
