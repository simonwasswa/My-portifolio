import { FiMoon, FiSun } from 'react-icons/fi';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  /** Use light colours when the button sits on a dark background (e.g. the hero banner). */
  onDark?: boolean;
}

/** Icon button that switches between light and dark mode. */
export function ThemeToggle({ isDark, onToggle, onDark = false }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
        onDark
          ? 'text-slate-200 hover:bg-white/10 hover:text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
      }`}
    >
      {isDark ? <FiSun className="h-5 w-5" aria-hidden="true" /> : <FiMoon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
