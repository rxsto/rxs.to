import type { Project } from './projects';
import styles from './site.module.css';
export function ProjectHero({ project }: { project: Project }) {
  const mark = <img className={styles.brandMark} src={project.mark.src} width={28} height={28} alt="" />;
  return <span className={styles.tile} data-project={project.slug} aria-hidden="true">{project.slug === 'digital-office-24' ? <span className={styles.markPlate}>{mark}</span> : mark}</span>;
}
