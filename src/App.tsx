import { useEffect } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { useDarkMode } from './hooks/useDarkMode';

/** Page shell: navbar, the ordered sections, and the footer. */
export default function App() {
  const { isDark, toggle } = useDarkMode();

  // Deep links like /#projects: the browser tries to jump before React renders
  // the sections, so re-apply the hash once they exist.
  useEffect(() => {
    const { hash } = window.location;
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, []);

  return (
    <>
      {/* Keyboard users can jump past the navigation */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
