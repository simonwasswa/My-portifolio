import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { FiAlertCircle, FiCheckCircle, FiLoader, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { profile } from '../data/profile';

interface MessageForm {
  name: string;
  email: string;
  message: string;
}

type SendStatus =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'sent' }
  | { state: 'whatsapp' }
  | { state: 'error'; message: string };

/** Shape of Formspree's JSON error response. */
interface FormspreeErrorResponse {
  errors?: { message: string }[];
}

const EMPTY_FORM: MessageForm = { name: '', email: '', message: '' };

const { formspreeId, whatsappNumber, email: myEmail } = profile.contactInfo;
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${formspreeId}`;
// Until a real ID is filled in, the form explains that instead of failing silently.
const FORMSPREE_READY = Boolean(formspreeId) && formspreeId !== 'YOUR_FORM_ID';

/** Readable version of the message for WhatsApp. */
function buildWhatsAppMessage(f: MessageForm): string {
  const details = [`Name: ${f.name.trim()}`, f.email.trim() && `Email: ${f.email.trim()}`].filter(Boolean);
  return [`Hi ${profile.name},`, '', f.message.trim(), '', ...details].join('\n');
}

/**
 * Contact form. "Send message" delivers straight to my inbox via Formspree
 * (https://formspree.io); the visitor's email becomes the reply-to address,
 * so I can answer by simply replying. WhatsApp is offered as an alternative.
 */
export function ContactForm() {
  const [form, setForm] = useState<MessageForm>(EMPTY_FORM);
  const [status, setStatus] = useState<SendStatus>({ state: 'idle' });
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // Clear an old success/error message once the visitor starts typing again.
    if (status.state !== 'idle' && status.state !== 'sending') setStatus({ state: 'idle' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!FORMSPREE_READY) {
      setStatus({
        state: 'error',
        message: `The form isn't connected yet. Please email me at ${myEmail} or use WhatsApp.`,
      });
      return;
    }

    setStatus({ state: 'sending' });
    try {
      // FormData picks up every named field, including Formspree's special
      // `_subject` and the `_gotcha` spam trap below.
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setForm(EMPTY_FORM);
        setStatus({ state: 'sent' });
        return;
      }

      const data = (await res.json().catch(() => ({}))) as FormspreeErrorResponse;
      const message = data.errors?.map((err) => err.message).join(', ') || 'Something went wrong. Please try again.';
      setStatus({ state: 'error', message });
    } catch {
      setStatus({ state: 'error', message: 'Could not send. Please check your internet connection and try again.' });
    }
  };

  const sendWhatsApp = () => {
    // Run the browser's built-in validation first (required fields, email format).
    if (!formRef.current?.reportValidity()) return;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(form))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus({ state: 'whatsapp' });
  };

  const sending = status.state === 'sending';

  const inputClass =
    'mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500';
  const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-300';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-labelledby={`${id}-title`}
      aria-busy={sending}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
    >
      <h3 id={`${id}-title`} className="text-xl font-semibold text-slate-900 dark:text-white">
        Send me a message
      </h3>

      {/* Formspree options: email subject line, and a hidden spam trap bots tend to fill in */}
      <input type="hidden" name="_subject" value={`New message from ${form.name.trim() || 'your portfolio'}`} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <fieldset disabled={sending} className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Your name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" value={form.name} onChange={update} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Your email <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          {/* Formspree uses a field named "email" as the reply-to address */}
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={labelClass}>
            Message <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={update}
            className={inputClass}
          />
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70 dark:focus-visible:ring-offset-slate-900"
        >
          {sending ? (
            <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <FiSend className="h-4 w-4" aria-hidden="true" />
          )}
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <button
          type="button"
          onClick={sendWhatsApp}
          disabled={sending}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-[#25D366] hover:text-[#1a9e4b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-[#25D366]"
        >
          <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
          Send on WhatsApp
          <span className="sr-only">(opens in a new tab)</span>
        </button>
      </div>

      {/* Result message, announced to screen readers */}
      <div role="status" aria-live="polite" className="mt-4 min-h-5 text-sm">
        {status.state === 'sent' && (
          <p className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Thanks! Your message has been sent. I'll get back to you by email soon.
          </p>
        )}
        {status.state === 'whatsapp' && (
          <p className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400">
            <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            WhatsApp should open with your message ready. Just press send.
          </p>
        )}
        {status.state === 'error' && (
          <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-950/40 dark:text-red-300">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
