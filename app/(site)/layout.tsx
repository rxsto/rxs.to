import type { ReactNode } from 'react';
import { DefaultFooter } from '../../components/default/DefaultFooter';
import { Switcher } from '../../components/lab/Switcher';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio-container">
      <div className="flex flex-col gap-16">
        {children}
        <DefaultFooter />
        <Switcher />
      </div>
    </div>
  );
}
