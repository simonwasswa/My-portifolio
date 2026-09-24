import { capabilities, profile } from '../data/profile';
import { Section } from './Section';

/** Summary paragraph plus the kinds of products built. */
export function About() {
  return (
    <Section id="about" eyebrow="01. About" title="A bit about me">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{profile.summary}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <dt className="text-sm text-slate-500 dark:text-slate-400">Experience</dt>
              <dd className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{profile.yearsOfExperience}+ yrs</dd>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <dt className="text-sm text-slate-500 dark:text-slate-400">Platforms</dt>
              <dd className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{capabilities.length}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">What I build</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700"
              >
                <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-900/40 dark:text-brand-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">{title}</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
