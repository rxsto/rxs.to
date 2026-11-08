import type { Project } from './projects';
import styles from './site.module.css';
export function ProjectHero({ project }: { project: Project }) {
  return <span className={styles.tile} data-project={project.slug} aria-hidden="true"><span>{project.letter}</span></span>;
}
