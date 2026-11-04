import { ExternalLink } from 'lucide-react';
import type { Project } from '../../shared/types/project';

export function DefaultProject({ title, description, url, state, image }: Project) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="project-card corner-squircle">
      {image && (
        <div className="project-matte corner-squircle">
          <img src={`/${image}`} alt={`${title} project screenshot`} width="2104" height="1212" loading="lazy" className="h-auto w-full" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-1.5">
          <p className="font-medium leading-5">{title}</p>
          <span className={`project-badge ${state === 'active' ? 'project-badge-active' : ''}`}>
            {state === 'active' && <span aria-hidden="true" className="live-dot" />}
            {state === 'active' ? 'Building now' : state}
          </span>
          <ExternalLink aria-hidden="true" className="project-external size-3 text-muted" />
        </div>
        <p className="project-description text-sm leading-5 text-toned">{description}</p>
      </div>
    </a>
  );
}
