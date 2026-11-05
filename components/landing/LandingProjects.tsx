import { DefaultProject } from '../default/DefaultProject';
import type { Project } from '../../shared/types/project';

const projects: Project[] = [
  {
    title: 'SoundCloud Bot',
    description: 'The official SoundCloud Discord music bot. I build and maintain it in close cooperation with SoundCloud.',
    url: 'https://soundcloud.bot',
    state: 'active',
    image: 'projects/soundcloud-bot.png',
  },
  {
    title: 'Hydra',
    description: 'A Discord bot on 6.1M servers for leveling, welcome messages and reaction roles. I co-own it, built most of its web app and lead its 2026 rebuild.',
    url: 'https://hydra.bot',
    state: 'active',
  },
  {
    title: 'Groovy',
    description: 'The Discord music bot I co-founded with Nik Ammerlaan, where I led frontend development and monetization as revenue passed $1M.',
    url: 'https://groovy.bot',
    state: 'discontinued',
  },
];

export function LandingProjects() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="ps-1 text-sm font-medium">My projects</h2>
      <div className="flex flex-col gap-2">
        {projects.map(project => <DefaultProject key={project.title} {...project} />)}
      </div>
    </div>
  );
}
