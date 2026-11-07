import { Mail, CodeXml, FileText, AtSign } from 'lucide-react';
import { Avatar } from '@/components/arc/avatar/avatar';
import { hero, email } from './content';
import { Actions } from './parts';
import styles from './site.module.css';

export function Identity({ compact = false }: { compact?: boolean }) {
  if (compact) return <header className={styles.identity}><Avatar name={hero.name} src="/avatar.png" size="sm" /><a className={styles.name} href="/">{hero.name}</a></header>;
  return <header className={styles.hero}>
    <div className={styles.identity}><h1 className={styles.name}>{hero.name}</h1><span className={styles.identityLine}>Software engineer</span></div>
    <p>I build web products and Discord bots.</p>
    <p>Based in Kufstein, Austria. Co-owner of Hydra and project lead on the official SoundCloud bot. Find me on <a className={styles.inlineLink} href="https://github.com/rxsto" target="_blank" rel="noopener noreferrer"><CodeXml aria-hidden="true" />GitHub</a> or <a className={styles.inlineLink} href="https://x.com/rxsto_official" target="_blank" rel="noopener noreferrer"><AtSign aria-hidden="true" />Twitter</a>, read my <a className={styles.inlineLink} href="/cv"><FileText aria-hidden="true" />CV</a>, or send an <a className={styles.inlineLink} href={`mailto:${email}`}><Mail aria-hidden="true" />email</a>.</p>
    <Actions />
  </header>;
}
