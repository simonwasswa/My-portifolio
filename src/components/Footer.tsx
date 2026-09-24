import { FiArrowUp } from 'react-icons/fi';
import { profile } from '../data/profile';

/** Site footer with copyright, social icons and a back-to-top link. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {profile.contacts.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="rounded-md p-2 text-slate-500 transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-400 dark:hover:text-brand-400"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-400 dark:hover:text-brand-400"
          >
            <FiArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
