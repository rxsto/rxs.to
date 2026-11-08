import type { CSSProperties } from 'react';
import { Tooltip } from '../arc/tooltip/tooltip';
import styles from './site.module.css';

const icons: Record<string, string> = {
  TypeScript: 'typescript', Nuxt: 'nuxtdotjs', Kotlin: 'kotlin', Terraform: 'terraform',
  AWS: 'amazonaws', Bun: 'bun', Hono: 'hono', 'Next.js': 'nextdotjs',
  Vue: 'vuedotjs', Rust: 'rust', Kubernetes: 'kubernetes',
};

export function Stack({ value }: { value: string }) {
  return <ul className={styles.stackList} aria-label="Technologies">{Object.entries(icons).filter(([name]) => value.includes(name)).map(([part, icon]) => {
    const style: CSSProperties & { '--stack-icon': string } = { '--stack-icon': `url(/stack/${icon}.svg)` };
    return <li key={part}><Tooltip content={part}><span tabIndex={0} className={styles.stackTechnology} aria-label={part}><span className={styles.stackIcon} style={style} aria-hidden="true" /></span></Tooltip></li>;
  })}</ul>;
}
