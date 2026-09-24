import { FiArrowDown, FiDownload, FiGithub } from 'react-icons/fi';
import { profile } from '../data/profile';

/**
 * Full-height intro over an animated banner image.
 * The banner is always dark, so text here uses light colours in both themes.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-slate-950 pt-16"
    >
      {/* ── Animated banner background ───────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Banner image: slow zoom and drift */}
        <img
          src={profile.bannerUrl}
          alt=""
          className="h-full w-full animate-ken-burns object-cover object-[center_55%] motion-reduce:animate-none"
        />
        {/* Darken the image, strongest on the left where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
        {/* Light beam sweeping across */}
        <div className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent motion-reduce:hidden" />
        {/* Faint grid for a "tech" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Fade the bottom edge into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-8">
        {/* Portrait — above the text on mobile, to the right on desktop */}
        <div className="order-first animate-fade-up lg:order-last">
          <div className="relative mx-auto w-28 animate-float motion-reduce:animate-none sm:w-36 lg:w-56">
            {/* Glow behind the photo */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 to-brand-500 opacity-50 blur-2xl"
            />
            <img
              src={profile.photoUrl}
              alt={`Portrait of ${profile.name}`}
              width={540}
              height={675}
              className="relative aspect-square w-full rounded-full border-4 border-white/90 object-cover object-[center_35%] shadow-xl transition duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div>
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-slate-100 backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to new opportunities
          </p>

          <h1 className="mt-6 animate-fade-up text-4xl font-extrabold tracking-tight text-white [animation-delay:100ms] sm:text-6xl lg:text-7xl">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-brand-300 bg-clip-text text-transparent">{profile.name}</span>
          </h1>

          <p className="mt-4 animate-fade-up text-xl font-semibold text-slate-100 [animation-delay:200ms] sm:text-2xl">
            {profile.title} · {profile.yearsOfExperience}+ years
          </p>

          <p className="mt-4 max-w-2xl animate-fade-up text-lg text-slate-300 [animation-delay:300ms]">{profile.tagline}</p>

          <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:400ms]">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              View my work
              <FiArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <FiDownload className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-slate-200 transition hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <FiGithub className="h-5 w-5" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
