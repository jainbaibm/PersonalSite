import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { useId, useRef, useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { Button, cx } from './ui';

const topics = ['Senior architecture role', 'Architecture advisory / consulting', 'Architecture review', 'Mentoring', 'Speaking or writing', 'Something else'];

type Fields = { name: string; email: string; organization: string; topic: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'mailto' } | { kind: 'error'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address, like name@company.com.';
  if (!f.topic) e.topic = 'Please choose a topic.';
  if (f.message.trim().length < 20) e.message = 'Please write a message of at least 20 characters.';
  return e;
}

/**
 * Contact form. With `site.contactForm.endpoint` configured it POSTs JSON to that
 * service; otherwise it opens the visitor's email app with the message pre-filled.
 */
export function ContactForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [fields, setFields] = useState<Fields>({ name: '', email: '', organization: '', topic: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const summaryRef = useRef<HTMLDivElement>(null);
  const hasEndpoint = Boolean(site.contactForm.endpoint);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: 'idle' });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    if (!hasEndpoint) {
      const subject = `[${fields.topic}] Message from ${fields.name}`;
      const body = `${fields.message}\n\n— ${fields.name}${fields.organization ? `, ${fields.organization}` : ''}\n${fields.email}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: 'mailto' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(site.contactForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: 'sent' });
      setFields({ name: '', email: '', organization: '', topic: '', message: '' });
    } catch {
      setStatus({ kind: 'error', message: `Your message could not be sent. Please try again, or email me directly at ${site.email}.` });
    }
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Fields, string][];
  const inputCls = (k: keyof Fields) =>
    cx(
      'mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-base text-ink shadow-sm placeholder:text-slate-400',
      errors[k] ? 'border-red-600 ring-1 ring-red-600' : 'border-line-strong',
    );

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-describedby={id('mode')}>
      <p id={id('mode')} className="text-sm text-slate-600">
        {hasEndpoint
          ? 'Fields marked * are required. Your message is sent securely through a form service.'
          : 'Fields marked * are required. Submitting opens your email app with the message ready to send — nothing is sent until you press send there.'}
      </p>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle className="size-4" aria-hidden="true" /> Please fix {errorList.length === 1 ? 'this error' : `these ${errorList.length} errors`}:
          </p>
          <ul className="mt-2 list-disc pl-6">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="text-sm font-medium text-slate-800">
            Name *
          </label>
          <input id={id('name')} name="name" autoComplete="name" required value={fields.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? id('name-err') : undefined} className={inputCls('name')} />
          {errors.name && <p id={id('name-err')} className="mt-1.5 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={id('email')} className="text-sm font-medium text-slate-800">
            Email *
          </label>
          <input id={id('email')} name="email" type="email" autoComplete="email" required value={fields.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? id('email-err') : undefined} className={inputCls('email')} />
          {errors.email && <p id={id('email-err')} className="mt-1.5 text-sm text-red-700">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('organization')} className="text-sm font-medium text-slate-800">
            Organization <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={id('organization')} name="organization" autoComplete="organization" value={fields.organization} onChange={set('organization')} className={inputCls('organization')} />
        </div>
        <div>
          <label htmlFor={id('topic')} className="text-sm font-medium text-slate-800">
            Topic *
          </label>
          <select id={id('topic')} name="topic" required value={fields.topic} onChange={set('topic')} aria-invalid={!!errors.topic} aria-describedby={errors.topic ? id('topic-err') : undefined} className={inputCls('topic')}>
            <option value="">Choose a topic…</option>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {errors.topic && <p id={id('topic-err')} className="mt-1.5 text-sm text-red-700">{errors.topic}</p>}
        </div>
      </div>
      <div>
        <label htmlFor={id('message')} className="text-sm font-medium text-slate-800">
          Message *
        </label>
        <textarea id={id('message')} name="message" rows={6} required value={fields.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? id('message-err') : undefined} className={inputCls('message')} />
        {errors.message && <p id={id('message-err')} className="mt-1.5 text-sm text-red-700">{errors.message}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status.kind === 'sending'}>
          <Send className="size-4" aria-hidden="true" />
          {status.kind === 'sending' ? 'Sending…' : hasEndpoint ? 'Send message' : 'Open in email app'}
        </Button>
      </div>

      <div role="status" aria-live="polite" className="text-sm">
        {status.kind === 'sent' && (
          <p className="flex items-start gap-2 rounded-lg bg-green-50 p-3 text-green-900">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> Thank you — your message has been sent. I’ll reply as soon as I can.
          </p>
        )}
        {status.kind === 'mailto' && (
          <p className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-blue-950">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              Your email app should now be open with the message ready to send. If nothing opened, email me directly at{' '}
              <a className="font-semibold underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </span>
          </p>
        )}
        {status.kind === 'error' && (
          <p className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-red-900">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
