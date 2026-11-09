import { cv } from '../../shared/cv';

/** Extract figures from the CV's prose, which is the single maintained source. */
export function projectFigures(source: { experience: readonly { org: string; summary: string; highlights?: readonly string[] }[] } = cv) {
  const experience = (org: string) => {
    const entry = source.experience.find(entry => entry.org === org);
    if (!entry) throw new Error(`CV experience missing: ${org}`);
    return entry;
  };
  const figure = (text: string, pattern: RegExp) => {
    const value = text.match(pattern)?.[1];
    if (!value) throw new Error(`CV figure missing: ${pattern}`);
    return value;
  };
  const groovy = experience('Groovy');
  const netflix = experience('“Hey, Netflix” Discord bot');
  return {
    hydraServers: figure(experience('Hydra').summary, /([\d.]+M) servers/),
    soundcloudServers: figure(experience('SoundCloud').summary, /(\d+K) servers/),
    netflixServers: figure(netflix.summary, /(\d+K\+) servers/),
    netflixSessions: figure(netflix.summary, /(\d+K\+) sessions/),
    groovyServers: figure(groovy.summary, /(\d+M\+) servers/),
    groovyRevenue: figure(groovy.highlights?.join(' ') ?? '', /revenue passed (\$\d+M)/) + '+',
  };
}
export const figures = projectFigures();
