import type { ReactNode } from 'react';
import { Footer } from '../../components/site/parts';

/** The CV keeps its own narrower column; it shares the site footer. */
export default function CvLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio-container">
      <div className="flex flex-col gap-16">
        {children}
        <Footer />
      </div>
    </div>
  );
}
