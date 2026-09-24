import { FiBriefcase } from 'react-icons/fi';
import { experiences } from '../data/profile';
import { Section } from './Section';

/** Vertical timeline of roles. */
export function Experience() {
  return (
    <Section id="experience" eyebrow="03. Experience" title="Where I've worked">
      <ol className="relative ml-4 space-y-10 border-l border-slate-200 pl-8 dark:border-slate-800">
        {experiences.map((job) => (
          <li key={`${job.company}-${job.role}`} className="relative">
            {/* Timeline marker */}
            <span
              aria-hidden="true"
              className="absolute -left-[3.16rem] top-0 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-brand-600 text-white dark:border-slate-950"
            >
              <FiBriefcase className="h-4 w-4" />
            </span>

            <article className="rounded-xl border border-slate-200 bg-white p-6 transition duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {job.role} <span className="text-brand-600 dark:text-brand-400">@ {job.company}</span>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{job.period}</p>
              </header>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{job.description}</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-slate-600 marker:text-brand-500 dark:text-slate-300">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {job.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
