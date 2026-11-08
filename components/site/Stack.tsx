import type { CSSProperties } from 'react';
import styles from './site.module.css';

const technologies = [
  { name: 'TypeScript', icon: 'typescript', scale: .78 },
  { name: 'Nuxt', icon: 'nuxtdotjs', scale: 1 },
  { name: 'Kotlin', icon: 'kotlin', scale: .78 },
  { name: 'Terraform', icon: 'terraform', scale: .9 },
  { name: 'AWS', icon: 'amazonaws', scale: 1.1 },
  { name: 'Bun', icon: 'bun', scale: .95 },
  { name: 'Hono', icon: 'hono', scale: .95 },
  { name: 'Next.js', icon: 'nextdotjs', scale: .85 },
  { name: 'Vue', icon: 'vuedotjs', scale: .9 },
  { name: 'Rust', icon: 'rust', scale: 1 },
  { name: 'Kubernetes', icon: 'kubernetes', scale: 1 },
];

type IconStyle = CSSProperties & { '--stack-icon': string; '--stack-scale': number };
const iconStyle = (icon: string, scale: number): IconStyle => ({ '--stack-icon': `url(/stack/${icon}.svg)`, '--stack-scale': scale });

export function Stack({ value }: { value: string }) {
  return <ul className={styles.stackList} aria-label="Technologies">{technologies.filter(({ name }) => value.includes(name)).map(({ name, icon, scale }) => <li key={name}><span className={styles.stackIcon} aria-hidden="true" style={iconStyle(icon, scale)} />{name}</li>)}</ul>;
}
