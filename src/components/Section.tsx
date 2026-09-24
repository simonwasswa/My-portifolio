import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface SectionProps {
  id: string;
  /** Small label above the heading, e.g. "02 — Skills". */
  eyebrow: string;
  title: string;
  children: ReactNode;
  /** Adds a subtle tinted background to alternate sections. */
  tinted?: boolean;
}

/**
 * Shared wrapper for every content section: consistent spacing, heading,
 * a scroll offset for the fixed navbar, and a fade-up reveal on scroll.
 */
export function Section({ id, eyebrow, title, children, tinted = false }: SectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-16 py-20 sm:py-24 ${tinted ? 'bg-slate-50 dark:bg-slate-900/50' : ''}`}
    >
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 transition-all duration-700 ease-out motion-reduce:transition-none sm:px-6 lg:px-8 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">{eyebrow}</p>
        <h2 id={headingId} className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
