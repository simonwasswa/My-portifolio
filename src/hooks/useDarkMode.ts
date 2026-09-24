import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
type Theme = 'light' | 'dark';

/** Initial theme: saved preference first, then the OS setting. */
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage can throw in private mode / when blocked — fall through.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Manages Tailwind's class-based dark mode.
 * Toggles the `dark` class on <html> and persists the choice to localStorage.
 */
export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore — the theme still works for this visit.
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return { isDark: theme === 'dark', toggle };
}
