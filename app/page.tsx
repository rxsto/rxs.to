import { LandingIntro } from '../components/landing/LandingIntro';
import { LandingProjects } from '../components/landing/LandingProjects';
import { LandingConnections } from '../components/landing/LandingConnections';

export default function Page() {
  return (
    <main className="flex flex-col gap-16">
      <LandingIntro />
      <LandingProjects />
      <LandingConnections />
    </main>
  );
}
