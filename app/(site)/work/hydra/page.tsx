import { CaseStudy } from '../../../../components/site/CaseStudy';
import { pageMetadata } from '../../../../shared/site';

export const metadata = pageMetadata({
  path: '/work/hydra',
  title: 'Hydra case study',
  description: 'What Oskar Lang owned and decided on Hydra, the Discord bot he co-owns.',
});

export default function Page() {
  return <CaseStudy slug="hydra" />;
}
