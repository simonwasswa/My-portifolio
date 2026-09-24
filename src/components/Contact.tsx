import { FiBriefcase, FiDownload, FiMapPin } from 'react-icons/fi';
import { profile } from '../data/profile';
import { ContactForm } from './ContactForm';
import { Section } from './Section';

/** Contact details, a short availability note and a simple message form. */
export function Contact() {
  const { contactInfo } = profile;

  const facts = [
    { icon: FiMapPin, label: 'Location', value: contactInfo.location },
    { icon: FiBriefcase, label: 'Availability', value: contactInfo.availability },
  ];

  return (
    <Section id="contact" eyebrow="05. Contact" title="Get in touch">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-lg text-slate-600 dark:text-slate-300">
            I'm always happy to hear about new opportunities, projects or just to connect. Feel free to reach out.
          </p>

          <dl className="mt-8 space-y-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-medium text-slate-900 dark:text-white">{label}</dt>
                  <dd className="text-sm text-slate-600 dark:text-slate-400">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-3">
            {profile.contacts.map(({ label, value, href, icon: Icon }) => {
              const external = href.startsWith('http');
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-900/40 dark:text-brand-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-slate-500 dark:text-slate-400">{label}</span>
                      <span className="block truncate font-medium text-slate-900 dark:text-white">{value}</span>
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={profile.resumeUrl}
            download
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <FiDownload className="h-4 w-4" aria-hidden="true" />
            Download my CV
          </a>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
