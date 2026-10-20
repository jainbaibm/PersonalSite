import { Check, Download, Link2, Mail, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../content/profile';
import { site } from '../content/site';
import { absoluteUrl, asset } from '../utils/paths';
import { LinkedInIcon, XIcon } from './BrandIcons';
import { Button, ButtonAnchor, ButtonLink, Container, Eyebrow, cx } from './ui';

export interface TocEntry {
  id: string;
  text: string;
  depth?: 2 | 3;
}

/** Sticky table of contents with the current section highlighted. */
export function TableOfContents({ items, title = 'On this page' }: { items: TocEntry[]; title?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => !!h);
    if (!headings.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;
  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{title}</p>
      <ol className="mt-3 grid gap-0.5 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={cx(
                '-ml-px block border-l-2 py-1.5 leading-snug transition-colors',
                item.depth === 3 ? 'pl-7' : 'pl-4',
                active === item.id
                  ? 'border-blue-600 font-medium text-blue-700'
                  : 'border-transparent text-slate-600 hover:border-slate-400 hover:text-ink',
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ShareLinks({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(path);
  const enc = encodeURIComponent;
  const linkCls =
    'inline-flex size-10 items-center justify-center rounded-lg text-slate-600 ring-1 ring-line hover:bg-slate-50 hover:text-ink';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-slate-700">Share</span>
      <a className={linkCls} href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer">
        <LinkedInIcon className="size-4" />
        <span className="sr-only">Share on LinkedIn (opens in a new tab)</span>
      </a>
      <a className={linkCls} href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer">
        <XIcon className="size-4" />
        <span className="sr-only">Share on X (opens in a new tab)</span>
      </a>
      <a className={linkCls} href={`mailto:?subject=${enc(title)}&body=${enc(url)}`}>
        <Mail className="size-4" aria-hidden="true" />
        <span className="sr-only">Share by email</span>
      </a>
      <button
        type="button"
        className={linkCls}
        onClick={() => {
          void navigator.clipboard?.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {copied ? <Check className="size-4 text-green-700" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
        <span className="sr-only">Copy link</span>
      </button>
      <span role="status" className="text-sm text-green-700">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}

export function ProfilePhoto({ className, priority }: { className?: string; priority?: boolean }) {
  const { photo } = profile;
  return (
    <picture>
      <source srcSet={asset(photo.src)} type="image/webp" />
      <img
        src={asset(photo.fallback)}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/** Download button when an approved PDF is configured, otherwise print-to-PDF of the resume page. */
export function ResumeActions({ variant = 'primary', onResumePage }: { variant?: 'primary' | 'secondary'; onResumePage?: boolean }) {
  if (site.resume.pdfPath) {
    return (
      <ButtonAnchor href={asset(site.resume.pdfPath)} download={site.resume.fileName} variant={variant}>
        <Download className="size-4" aria-hidden="true" /> Download resume (PDF)
      </ButtonAnchor>
    );
  }
  if (onResumePage) {
    return (
      <Button type="button" variant={variant} onClick={() => window.print()}>
        <Printer className="size-4" aria-hidden="true" /> Print / save as PDF
      </Button>
    );
  }
  return (
    <ButtonLink to="/resume/" variant={variant}>
      <Download className="size-4" aria-hidden="true" /> View resume
    </ButtonLink>
  );
}

export function ContactCta() {
  return (
    <section aria-labelledby="contact-cta" className="dark-section relative overflow-hidden bg-navy-950 py-16 sm:py-20">
      <div aria-hidden="true" className="cta-glow pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow dark>Let’s connect</Eyebrow>
            <h2 id="contact-cta" className="mt-3 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
              Planning a platform, a modernization or an architecture review?
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              I’m happy to talk with engineering leaders, recruiters and teams about senior architecture roles, advisory work and technical mentoring.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink to="/contact/" variant="primary">
              <Mail className="size-4" aria-hidden="true" /> Get in touch
            </ButtonLink>
            <ButtonAnchor href={site.linkedin} variant="light" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className="size-4" /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </ButtonAnchor>
          </div>
        </div>
      </Container>
    </section>
  );
}
