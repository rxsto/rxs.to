import type { ReactNode } from 'react';
import { Switcher } from '../../components/lab/Switcher';

export const metadata = { robots: 'noindex' };

export default function LabLayout({ children }: { children: ReactNode }) {
  return <>{children}<Switcher /><noscript><style>{"main :is(h1, h2) *, main dl > div { opacity: 1 !important; transform: none !important; filter: none !important; }"}</style></noscript></>;
}
