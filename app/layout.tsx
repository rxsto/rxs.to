import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DefaultFooter } from '../components/default/DefaultFooter';
import { site } from '../shared/site';
import '@fontsource-variable/geist';
import '@fontsource-variable/inter';
import '@/components/arc/foundation.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: site.name,
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '180x180' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  twitter: { card: 'summary' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var r=document.documentElement,m=matchMedia('(prefers-color-scheme: dark)'),p=null;try{p=localStorage.getItem('nuxt-color-mode')}catch{}if(p==='dark'||p==='light')r.classList.add(p);var a=function(){r.dataset.theme=p==='dark'||p==='light'?p:m.matches?'dark':'light'};a();m.addEventListener('change',a)})()` }} />
      </head>
      <body>
        <div className="portfolio-container">
          <div className="flex flex-col gap-16">
            {children}
            <DefaultFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
