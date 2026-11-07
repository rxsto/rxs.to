import { availability } from './content';

export function Availability({ className }: { className?: string }) {
  if (!availability.enabled) return null;
  return <span className={className} data-availability><span aria-hidden="true" />{availability.text}</span>;
}
