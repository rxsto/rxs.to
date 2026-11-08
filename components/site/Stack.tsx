import type { CSSProperties } from 'react';
import styles from './site.module.css';

const icons: Record<string, string> = {
  TypeScript: 'typescript', Nuxt: 'nuxtdotjs', Kotlin: 'kotlin', Terraform: 'terraform',
  AWS: 'amazonaws', Bun: 'bun', Hono: 'hono', 'Next.js': 'nextdotjs',
  Vue: 'vuedotjs', Rust: 'rust', Kubernetes: 'kubernetes',
};

export function Stack({ value }: { value: string }) {
  return value.split(/(TypeScript|Nuxt|Kotlin|Terraform|AWS|Bun|Hono|Next\.js|Vue|Rust|Kubernetes)/).map((part, index) => {
    const icon = icons[part];
    if (!icon) return part;
    const style: CSSProperties & { '--stack-icon': string } = { '--stack-icon': `url(/stack/${icon}.svg)` };
    return <span className={styles.stackTechnology} key={index} title={part}><span className={styles.stackIcon} style={style} aria-hidden="true" />{part}</span>;
  });
}
