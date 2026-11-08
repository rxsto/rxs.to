import styles from './site.module.css';

const technologies = ['TypeScript', 'Nuxt', 'Kotlin', 'Terraform', 'AWS', 'Bun', 'Hono', 'Next.js', 'Vue', 'Rust', 'Kubernetes'];

export function Stack({ value }: { value: string }) {
  return <ul className={styles.stackList} aria-label="Technologies">{technologies.filter(name => value.includes(name)).map(name => <li key={name}>{name}</li>)}</ul>;
}
