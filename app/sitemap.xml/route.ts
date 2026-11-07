import { projects } from '../../components/site/projects';
import { site } from '../../shared/site';
export function GET() {
  const paths = ['', ...projects.map(item => `/${item.slug}`), '/cv'];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${site.origin}${path}</loc></url>`).join('')}</urlset>`, { headers: { 'content-type': 'application/xml' } });
}
