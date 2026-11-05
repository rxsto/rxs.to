import { LandingIntro } from '../components/landing/LandingIntro';
import { LandingProjects } from '../components/landing/LandingProjects';
import { LandingConnections } from '../components/landing/LandingConnections';
import { jsonLd, pageMetadata, site, websiteNode } from '../shared/site';

const title = 'Oskar Lang — Software Engineer';
const description = 'Self-employed software engineer in Kufstein, Austria, building full-stack software with Nuxt, Spring Boot and Kubernetes.';
const url = `${site.origin}/`;

export const metadata = pageMetadata({ path: '/', title, description });

const schema = jsonLd([
  websiteNode,
  {
    '@id': `${url}#webpage`, '@type': 'WebPage', description, name: title, url,
    isPartOf: { '@id': websiteNode['@id'] },
    potentialAction: [{ '@type': 'ReadAction', target: [url] }],
  },
]);

export default function Page() {
  return (
    <main className="flex flex-col gap-16">
      <LandingIntro />
      <LandingProjects />
      <LandingConnections />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </main>
  );
}
