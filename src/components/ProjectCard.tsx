import { FiClock, FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import type { GitHubRepo } from '../types';

interface ProjectCardProps {
  repo: GitHubRepo;
}

/** "my-cool_app" → "My Cool App" */
function prettifyName(name: string): string {
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Human-friendly relative date, e.g. "3 days ago". */
function timeAgo(iso: string): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31_536_000],
    ['month', 2_592_000],
    ['week', 604_800],
    ['day', 86_400],
    ['hour', 3_600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(seconds) >= secs) return rtf.format(Math.round(seconds / secs), unit);
  }
  return 'just now';
}

/** Ensure the homepage field is an absolute URL (users sometimes omit the scheme). */
function normaliseUrl(url: string | null): string | null {
  if (!url?.trim()) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/** A card summarising one GitHub repository. */
export function ProjectCard({ repo }: ProjectCardProps) {
  const demoUrl = normaliseUrl(repo.homepage);
  // Primary language first, then topics (deduplicated, case-insensitive), capped for tidiness.
  const tags = [repo.language, ...(repo.topics ?? [])]
    .filter((t): t is string => Boolean(t))
    .filter((t, i, arr) => arr.findIndex((x) => x.toLowerCase() === t.toLowerCase()) === i)
    .slice(0, 5);
  const title = prettifyName(repo.name);

  return (
    <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
          {title}
        </h3>
        <div className="flex shrink-0 items-center gap-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} source code on GitHub (opens in a new tab)`}
            className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FiGithub className="h-5 w-5" aria-hidden="true" />
          </a>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo (opens in a new tab)`}
              className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <FiExternalLink className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {repo.description ?? 'No description provided.'}
      </p>

      {tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="inline-flex items-center gap-1" aria-label={`${repo.stargazers_count} stars`}>
          <FiStar className="h-3.5 w-3.5" aria-hidden="true" />
          {repo.stargazers_count.toLocaleString()}
        </span>
        <span className="inline-flex items-center gap-1">
          <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
          Updated <time dateTime={repo.pushed_at}>{timeAgo(repo.pushed_at)}</time>
        </span>
      </footer>
    </article>
  );
}
