import type { Project } from './projects';
import styles from './site.module.css';
export function ProjectHero({ project }: { project: Project }) {
  return <div className={styles.brandHero} style={{ background: project.brand, viewTransitionName: `hero-${project.slug}` }} aria-hidden="true"><img className={styles.brandMark} data-appearance={project.mark.appearance} style={{ inlineSize: project.mark.size, blockSize: project.mark.size }} src={project.mark.src} width={project.mark.size} height={project.mark.size} alt="" /></div>;
}
