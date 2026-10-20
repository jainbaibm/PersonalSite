import { ArrowUpRight, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons';
import { ContactForm } from '../components/ContactForm';
import { Seo } from '../components/Seo';
import { Container, PageHeader } from '../components/ui';
import { site } from '../content/site';

export function ContactPage() {
  const channels = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <Mail className="size-5" aria-hidden="true" />, external: false },
    {
      label: 'LinkedIn',
      value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.linkedin,
      icon: <LinkedInIcon />,
      external: true,
    },
    ...(site.github
      ? [{ label: 'GitHub', value: site.github.replace(/^https?:\/\//, ''), href: site.github, icon: <GitHubIcon />, external: true }]
      : []),
  ];

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Jain Bai B about senior solution architecture roles, architecture advisory and reviews, or technical mentoring."
        path="/contact/"
      />
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk architecture"
        intro="I’m open to conversations about senior architecture roles, advisory and architecture reviews, and mentoring. Email or LinkedIn is the quickest way to reach me."
      />

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:py-20">
        <div>
          <h2 className="text-xl font-semibold text-ink">Direct channels</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-slate-50"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">{c.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="block truncate font-medium text-ink">{c.value}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-slate-600 group-hover:text-ink" aria-hidden="true" />
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl bg-surface-2 p-5 text-sm leading-relaxed text-slate-600">
            <p className="font-semibold text-ink">Good to include</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your organization and role</li>
              <li>The problem or opportunity in a few sentences</li>
              <li>Timeline and location or time zone</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-ink">Send a message</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
