import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DefaultFooter } from '../components/default/DefaultFooter';
import { site } from '../shared/site';
import './globals.css';
import '@/components/arc/foundation.css';

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
        <script dangerouslySetInnerHTML={{ __html: `try{var p=localStorage.getItem('nuxt-color-mode');if(p==='dark'||p==='light')document.documentElement.classList.add(p)}catch{}` }} />
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
