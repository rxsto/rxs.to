import { Fragment } from 'react';

const connections = {
  GitHub: 'https://github.com/rxsto',
  Discord: 'https://discord.gg/r7tqQVs',
  Twitter: 'https://x.com/rxsto_official',
  LinkedIn: 'https://linkedin.com/in/oskar-lang',
};

export function LandingConnections() {
  return (
    <div>
      <h2 className="ps-1 text-sm font-medium">Connect with me</h2>
      <div className="connections flex gap-2 p-1 text-xs">
        {Object.entries(connections).map(([name, url], index) => (
          <Fragment key={name}>
            {index > 0 && <p className="text-muted">/</p>}
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><p>{name}</p></a>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
