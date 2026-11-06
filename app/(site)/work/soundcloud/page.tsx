import { CaseStudy } from '../../../../components/site/CaseStudy';
import { pageMetadata } from '../../../../shared/site';

export const metadata = pageMetadata({
  path: '/work/soundcloud',
  title: 'SoundCloud case study',
  description: 'What Oskar Lang owned and decided on the official SoundCloud Discord bot.',
});

export default function Page() {
  return <CaseStudy slug="soundcloud" />;
}
