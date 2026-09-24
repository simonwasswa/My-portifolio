import { useCallback, useEffect, useState } from 'react';
import type { FetchState, GitHubRepo } from '../types';

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes — keeps us well under the 60 req/hr anonymous limit

interface CacheEntry {
  savedAt: number;
  repos: GitHubRepo[];
}

/**
 * Relevance score used to pick the "most impressive" repos:
 * stars and forks count most, recent activity and a description/demo add a bonus.
 */
function scoreRepo(repo: GitHubRepo): number {
  const daysSincePush = (Date.now() - new Date(repo.pushed_at).getTime()) / 86_400_000;
  const recency = Math.max(0, 365 - daysSincePush) / 365; // 1 → pushed today, 0 → a year+ ago
  return (
    repo.stargazers_count * 3 +
    repo.forks_count * 2 +
    recency * 5 +
    (repo.description ? 2 : 0) +
    (repo.homepage ? 2 : 0) +
    (repo.topics?.length ? 1 : 0)
  );
}

/**
 * Drop forks (other people's code) and the `username/username` profile README repo,
 * then rank the rest. Pass `limit` to cap the list; omit it to show every public repo.
 */
export function selectTopRepos(repos: GitHubRepo[], username: string, limit?: number): GitHubRepo[] {
  return repos
    .filter((r) => !r.fork && r.name.toLowerCase() !== username.toLowerCase())
    .sort((a, b) => scoreRepo(b) - scoreRepo(a))
    .slice(0, limit);
}

/**
 * Fetches a user's public repositories from the GitHub REST API (client-side),
 * caching the response in sessionStorage to avoid hitting the rate limit.
 */
export function useGitHubRepos(username: string, limit?: number) {
  const [state, setState] = useState<FetchState<GitHubRepo[]>>({ status: 'loading' });
  // Bumping this re-runs the effect — used by the "Try again" button.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const cacheKey = `gh-repos:${username}`;
    const controller = new AbortController();

    async function load() {
      setState({ status: 'loading' });

      // 1. Serve from cache if fresh.
      try {
        const raw = sessionStorage.getItem(cacheKey);
        if (raw) {
          const cached = JSON.parse(raw) as CacheEntry;
          if (Date.now() - cached.savedAt < CACHE_TTL_MS) {
            setState({ status: 'success', data: selectTopRepos(cached.repos, username, limit) });
            return;
          }
        }
      } catch {
        // Corrupt or unavailable cache — just fetch.
      }

      // 2. Fetch from the API.
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
          { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal },
        );

        if (!res.ok) {
          const message =
            res.status === 404
              ? `GitHub user "${username}" was not found.`
              : res.status === 403 || res.status === 429
                ? 'GitHub API rate limit reached. Please try again in a few minutes.'
                : `GitHub responded with ${res.status}.`;
          throw new Error(message);
        }

        const repos = (await res.json()) as GitHubRepo[];
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), repos } satisfies CacheEntry));
        } catch {
          // Storage full / blocked — not critical.
        }
        setState({ status: 'success', data: selectTopRepos(repos, username, limit) });
      } catch (err) {
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          error: err instanceof Error ? err.message : 'Could not load projects.',
        });
      }
    }

    void load();
    return () => controller.abort();
  }, [username, limit, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { state, retry };
}
