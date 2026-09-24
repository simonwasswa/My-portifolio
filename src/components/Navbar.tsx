import { useEffect, useState } from 'react';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { navItems, profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

// Stable reference so useActiveSection doesn't re-subscribe every render.
const sectionIds = navItems.map((n) => n.id);

/** Fixed top navigation with active-section highlighting and a mobile menu. */
export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  // Add a border/shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // At the very top the bar is transparent over the dark hero banner, so it needs light text.
  const overBanner = !scrolled && !open;

  const linkClass = (id: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
      overBanner
        ? active === id
          ? 'text-cyan-300'
          : 'text-slate-200 hover:text-white'
        : active === id
          ? 'text-brand-600 dark:text-brand-400'
          : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className={`flex items-center gap-2 font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            overBanner ? 'text-white' : 'text-slate-900 dark:text-white'
          }`}
          aria-label={`${profile.name}, back to top`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-sm text-white">{initials}</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={linkClass(item.id)}
              aria-current={active === item.id ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
          <span className={`mx-2 h-6 w-px ${overBanner ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`} aria-hidden="true" />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} onDark={overBanner} />
          <a
            href={profile.resumeUrl}
            download
            className="ml-2 hidden items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 lg:inline-flex"
          >
            <FiDownload className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} onDark={overBanner} />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              overBanner
                ? 'text-slate-200 hover:bg-white/10 hover:text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {open ? <FiX className="h-6 w-6" aria-hidden="true" /> : <FiMenu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open} className="border-t border-slate-200 px-4 pb-4 pt-2 dark:border-slate-800 md:hidden">
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block ${linkClass(item.id)}`}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.resumeUrl}
          download
          onClick={() => setOpen(false)}
          className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <FiDownload className="h-4 w-4" aria-hidden="true" />
          Download CV
        </a>
      </div>
    </header>
  );
}
