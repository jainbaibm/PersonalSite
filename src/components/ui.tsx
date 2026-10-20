import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router';
import { TechBackdrop } from './TechBackdrop';

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function Section({
  id,
  tone = 'light',
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: 'light' | 'muted' | 'dark';
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const tones = {
    light: 'bg-page',
    muted: 'bg-canvas border-y border-line',
    dark: 'text-slate-300 dark-section',
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx('py-20 sm:py-24 lg:py-28', tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cx('text-xs font-semibold uppercase tracking-[0.16em]', dark ? 'text-blue-300' : 'text-blue-700')}>
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark,
  action,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  dark?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
        <h2
          id={id}
          className={cx('mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl', dark ? 'text-white' : 'text-ink')}
        >
          {title}
        </h2>
        {intro && <p className={cx('mt-4 text-lg leading-relaxed', dark ? 'text-slate-300' : 'text-slate-600')}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
  secondary: 'bg-surface text-ink ring-1 ring-inset ring-line-strong hover:ring-slate-400 hover:bg-slate-50',
  ghost: 'text-blue-700 hover:text-blue-800 hover:bg-blue-50',
  light: 'bg-white text-ink hover:bg-slate-100',
};

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[0.95rem] font-semibold transition-colors duration-150 min-h-11';

export function ButtonLink({
  to,
  variant = 'primary',
  className,
  children,
  ...rest
}: { to: string; variant?: Variant; className?: string; children: ReactNode } & Omit<ComponentProps<typeof Link>, 'to'>) {
  return (
    <Link to={to} className={cx(buttonBase, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  variant = 'primary',
  className,
  children,
  ...rest
}: { href: string; variant?: Variant; className?: string; children: ReactNode } & ComponentProps<'a'>) {
  return (
    <a href={href} className={cx(buttonBase, variants[variant], className)} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: { variant?: Variant; className?: string; children: ReactNode } & ComponentProps<'button'>) {
  return (
    <button className={cx(buttonBase, variants[variant], 'disabled:cursor-not-allowed disabled:opacity-60', className)} {...rest}>
      {children}
    </button>
  );
}

export function Tag({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'blue' | 'violet' | 'amber' | 'dark' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700 ring-slate-200',
    blue: 'bg-blue-50 text-blue-800 ring-blue-200',
    violet: 'bg-violet-50 text-violet-800 ring-violet-200',
    amber: 'bg-amber-50 text-amber-900 ring-amber-200',
    dark: 'bg-white/5 text-slate-200 ring-white/15',
  };
  return (
    <span className={cx('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset', tones[tone])}>
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line surface-header">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <TechBackdrop variant="header" className="hidden md:block" />
      <Container className="relative py-16 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink text-balance sm:text-5xl">{title}</h1>
        {intro && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{intro}</div>}
        {children}
      </Container>
    </header>
  );
}

export function Notice({ tone = 'amber', title, children }: { tone?: 'amber' | 'violet' | 'blue'; title: string; children: ReactNode }) {
  const tones = {
    amber: 'border-amber-400 bg-amber-50 text-amber-950',
    violet: 'border-violet-300 bg-violet-50 text-violet-950',
    blue: 'border-blue-300 bg-blue-50 text-blue-950',
  };
  return (
    <div role="note" className={cx('rounded-lg border-l-4 px-4 py-3 text-sm leading-relaxed', tones[tone])}>
      <p className="font-semibold">{title}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
