import type { Project } from './projects';
import styles from './site.module.css';
export function ProjectHero({ project }: { project: Project }) {
  return <span className={styles.tile} data-project={project.slug} aria-hidden="true"><img className={styles.brandMark} src={project.mark.src} width={28} height={28} alt="" /></span>;
}
