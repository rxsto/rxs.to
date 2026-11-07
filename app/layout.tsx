import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { site } from '../shared/site';
import interFont from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import '@/components/arc/foundation.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: site.name,
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '48x48' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  twitter: { card: 'summary' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href={interFont} as="font" type="font/woff2" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: `@font-face{font-family:"Inter Variable";font-style:normal;font-display:optional;font-weight:100 900;src:url(${interFont}) format("woff2")}` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var p=null;try{p=localStorage.getItem('nuxt-color-mode')}catch{}if(p==='dark'||p==='light'){var r=document.documentElement;r.dataset.theme=p;r.classList.add(p)}})()` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
