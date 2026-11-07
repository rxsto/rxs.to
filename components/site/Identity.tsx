import { Avatar } from '@/components/arc/avatar/avatar';
import { hero } from './content';
import { Actions } from './parts';
import styles from './site.module.css';

export function Identity({ compact = false }: { compact?: boolean }) {
  return <header className={`${styles.hero} ${styles.enter}`}>
    <div className={styles.identity}>
      <Avatar name={hero.name} src="/avatar.png" size="lg" />
      <div>
        {compact ? <p className={styles.name}><a href="/">{hero.name}</a></p> : <h1 className={styles.name}>{hero.name}</h1>}
        {!compact && <p className={styles.identityLine}>{hero.identity}</p>}
      </div>
    </div>
    {!compact && <>
      <p>{hero.build}</p>
      <ul className={styles.engagement} aria-label="Ways to work together">{hero.engagement.map(line => <li key={line}>{line}</li>)}</ul>
      <Actions />
    </>}
  </header>;
}
