'use client';

import { useEffect } from 'react';

export function ReturnFocus() {
  useEffect(() => {
    const focus = () => {
      if (!location.hash.startsWith('#card-')) return;
      document.getElementById(location.hash.slice(1))?.querySelector('a')?.focus({ preventScroll: true });
    };
    focus();
    window.addEventListener('hashchange', focus);
    window.addEventListener('pageshow', focus);
    return () => { window.removeEventListener('hashchange', focus); window.removeEventListener('pageshow', focus); };
  }, []);
  return null;
}
