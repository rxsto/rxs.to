import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../shared/types/project';
import { cv } from '../../shared/cv';
import { Badge } from '@/components/arc/badge/badge';
import { Card } from '@/components/arc/card/card';

type Entry = { org: string; title: string; period: { start: string; end: string }; summary: string; highlights?: readonly string[] };

const orgFor: Record<string, string> = { 'SoundCloud Bot': 'SoundCloud', Hydra: 'Hydra', Groovy: 'Groovy' };

function Details({ title }: { title: string }) {
  const entry = (cv.experience as readonly Entry[]).find(e => e.org === orgFor[title]);
  if (!entry) return null;
  return (
    <div className="project-details">
      <p className="project-details-role">{entry.title} · {entry.period.start} – {entry.period.end === 'present' ? 'today' : entry.period.end}</p>
      <p>{entry.summary}</p>
      {entry.highlights && <ul>{entry.highlights.map(h => <li key={h}>{h}</li>)}</ul>}
    </div>
  );
}

export function DefaultProject({ title, description, url, state, image }: Project) {
  return (
    <Card
      title={title}
      description={description}
      media={image ? <img src={`/${image}`} alt={`${title} project screenshot`} width="2104" height="1212" loading="lazy" className="h-auto w-full" /> : undefined}
      details={<Details title={title} />}
      action={<a href={url} target="_blank" rel="noopener noreferrer" className="project-visit">{new URL(url).host}<ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} /></a>}
    >
      <div className="project-badge-row">
        <Badge size="sm" tone={state === 'active' ? 'success' : 'neutral'} dot={state === 'active'}>{state === 'active' ? 'Building now' : 'Discontinued'}</Badge>
      </div>
    </Card>
  );
}
