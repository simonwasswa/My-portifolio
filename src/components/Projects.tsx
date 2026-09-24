import { FiAlertCircle, FiGithub, FiRefreshCw } from 'react-icons/fi';
import { profile } from '../data/profile';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

// Every public repo is shown. Set a number here (e.g. 6) to show only the top-ranked ones.
const PROJECT_LIMIT: number | undefined = undefined;
// How many placeholder cards to show while loading.
const SKELETON_COUNT = 3;

/** Placeholder card shown while repositories load. */
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" aria-hidden="true">
      <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-4 space-y-2">
        <div className="h-3 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="mt-6 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

/** Project cards sourced live from the GitHub REST API. */
export function Projects() {
  const { state, retry } = useGitHubRepos(profile.githubUsername, PROJECT_LIMIT);
  const githubUrl = `https://github.com/${profile.githubUsername}`;

  return (
    <Section id="projects" eyebrow="04. Projects" title="Things I've built" tinted>
      {/* Live region so screen readers hear when loading finishes or fails */}
      <div aria-live="polite" aria-busy={state.status === 'loading'}>
        {state.status === 'loading' && (
          <>
            <span className="sr-only">Loading projects from GitHub…</span>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        )}

        {state.status === 'error' && (
          <div role="alert" className="flex flex-col items-center rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/60 dark:bg-red-950/30">
            <FiAlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
            <p className="mt-3 font-semibold text-slate-900 dark:text-white">Couldn't load projects</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{state.error}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
                Try again
              </button>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-200"
              >
                <FiGithub className="h-4 w-4" aria-hidden="true" />
                View on GitHub
              </a>
            </div>
          </div>
        )}

        {state.status === 'success' &&
          (state.data.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600 dark:border-slate-700 dark:text-slate-400">
              No public projects to show yet. Check back soon!
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.data.map((repo) => (
                <li key={repo.id}>
                  <ProjectCard repo={repo} />
                </li>
              ))}
            </ul>
          ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-brand-600 transition-colors hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
        >
          <FiGithub className="h-5 w-5" aria-hidden="true" />
          See all repositories on GitHub
        </a>
      </div>
    </Section>
  );
}
