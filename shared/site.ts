import type { Metadata } from 'next';

export const site = {
  origin: 'https://rxs.to',
  name: 'rxsto - Oskar Lang',
  image: '/avatar.png',
} as const;

export const websiteNode = {
  '@id': `${site.origin}/#website`, '@type': 'WebSite', inLanguage: 'en', name: site.name, url: site.origin,
} as const;

/** A schema.org graph for a <script type="application/ld+json">, safe to inline in HTML. */
export function jsonLd(graph: readonly object[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

/**
 * Everything page-specific in <head>. A page's openGraph replaces the layout's wholesale, so this
 * restates all of it. Paths resolve against the layout's metadataBase.
 */
export function pageMetadata({ path, title, description, types }: {
  path: `/${string}`;
  title: string;
  description: string;
  /** <link rel="alternate">: media type to path. */
  types?: Record<string, string>;
}): Metadata {
  return {
    title: { absolute: `${title} | ${site.name}` },
    description,
    alternates: { canonical: path, ...(types && { types }) },
    openGraph: { type: 'website', title, description, url: path, siteName: site.name, images: [site.image] },
  };
}
