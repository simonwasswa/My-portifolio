import { skillGroups } from '../data/profile';
import type { Skill } from '../types';
import { Section } from './Section';

/** One skill tile. Featured skills get an accent border and badge. */
function SkillCard({ skill }: { skill: Skill }) {
  const { name, icon: Icon, note, featured } = skill;
  return (
    <li
      className={`group flex items-center gap-3 rounded-xl border bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 ${
        featured
          ? 'border-brand-300 ring-1 ring-brand-200 dark:border-brand-700 dark:ring-brand-900'
          : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
      }`}
    >
      <Icon
        className="h-8 w-8 shrink-0 text-slate-500 transition-colors group-hover:text-brand-600 dark:text-slate-400 dark:group-hover:text-brand-400"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-900 dark:text-white">{name}</p>
        {note && (
          <p className={`text-xs ${featured ? 'font-semibold text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}`}>
            {note}
          </p>
        )}
      </div>
    </li>
  );
}

/** Grouped grid of technologies with icons. */
export function Skills() {
  return (
    <Section id="skills" eyebrow="02. Skills" title="Tech I work with" tinted>
      <div className="space-y-10">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{group.title}</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {group.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
