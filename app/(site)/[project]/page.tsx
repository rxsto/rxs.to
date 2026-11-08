import { SiteFrame } from '../../../components/site/SiteFrame';
import { notFound } from 'next/navigation';
import { projects } from '../../../components/site/projects';
import { CaseStudy } from '../../../components/site/CaseStudy';
import { pageMetadata } from '../../../shared/site';
type Props = { params: Promise<{ project: string }> };
export function generateStaticParams() { return projects.map(item => ({ project: item.slug })); }
export async function generateMetadata({ params }: Props) {
  const { project } = await params;
  const item = projects.find(item => item.slug === project);
  if (!item) notFound();
  return pageMetadata({ path: `/${item.slug}`, title: item.name, description: item.description, image: item.shareImage, largeImage: item.body.figures.length > 0 });
}
export default async function Page({ params }: Props) {
  const { project } = await params;
  const item = projects.find(item => item.slug === project);
  if (!item) notFound();
  return <SiteFrame view="project"><CaseStudy item={item} /></SiteFrame>;
}
