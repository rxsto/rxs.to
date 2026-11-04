import type { ReactNode } from 'react';
import { DefaultFooter } from '../components/default/DefaultFooter';
import './globals.css';

const title = 'Oskar Lang — Software Engineer';
const siteName = 'rxsto - Oskar Lang';
const url = 'https://rxs.to/';
const description = 'Self-employed software engineer in Kufstein, Austria, building full-stack software with Nuxt, Spring Boot and Kubernetes.';
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@id': `${url}#website`, '@type': 'WebSite', inLanguage: 'en', name: siteName, url },
    {
      '@id': `${url}#webpage`, '@type': 'WebPage', description, name: title, url,
      isPartOf: { '@id': `${url}#website` },
      potentialAction: [{ '@type': 'ReadAction', target: [url] }],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{`${title} | ${siteName}`}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" sizes="180x180" />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/avatar.png" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary" />
        <script dangerouslySetInnerHTML={{ __html: `try{var p=localStorage.getItem('nuxt-color-mode');if(p==='dark'||p==='light')document.documentElement.classList.add(p)}catch{}` }} />
      </head>
      <body>
        <div className="portfolio-container">
          <div className="flex flex-col gap-16">
            {children}
            <DefaultFooter />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
