import { CaseStudy } from '../../../../components/site/CaseStudy';
import { pageMetadata } from '../../../../shared/site';

export const metadata = pageMetadata({
  path: '/work/hey-netflix',
  title: 'Hey, Netflix case study',
  description: 'What Oskar Lang owned and decided on Hey, Netflix, the Discord bot built for Netflix.',
});

export default function Page() {
  return <CaseStudy slug="hey-netflix" />;
}
