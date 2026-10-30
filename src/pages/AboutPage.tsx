import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ContactCta, ProfilePhoto, ResumeActions } from '../components/content-blocks';
import { Seo } from '../components/Seo';
import { ButtonLink, PageHeader, Section, SectionHeading } from '../components/ui';
import { profile } from '../content/profile';
import { site } from '../content/site';
import { personJsonLd } from '../utils/head';

export function AboutPage() {
  const milestones = [
    ...profile.experience.map((r) => ({ period: `${r.start} – ${r.end}`, role: r.title, org: r.company, note: r.summary })),
    ...profile.earlierRoles.map((r) => ({ period: r.period, role: r.title, org: r.company, note: r.note })),
  ];

  return (
    <>
      <Seo
        title="About"
        description="About Jain Bai B — Solution Architect with 18 years across healthcare, automotive, insurance and data governance. Architecture philosophy, leadership approach and career milestones."
        path="/about/"
        type="profile"
        jsonLd={personJsonLd}
      />
      <PageHeader eyebrow="About" title="I help organizations turn business goals into architecture teams can build on.">
        <div className="mt-8 flex flex-wrap gap-3">
          <ResumeActions />
          <ButtonLink to="/contact/" variant="secondary">
            Let’s Connect
          </ButtonLink>
        </div>
      </PageHeader>

      <Section labelledBy="overview-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="mx-auto w-full max-w-xs lg:mx-0">
            <ProfilePhoto className="aspect-[4/5] w-full rounded-2xl border border-line object-cover object-top shadow-lg shadow-slate-900/5" />
            <p className="mt-4 text-sm text-muted">{site.location}</p>
          </div>
          <div>
            <h2 id="overview-title" className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Professional overview
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-slate-600">
              {profile.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" labelledBy="philosophy-title">
        <SectionHeading
          id="philosophy-title"
          eyebrow="Architecture philosophy"
          title="Principles I make decisions by"
          intro="Technology choices change. These principles have held up across healthcare, automotive, insurance and data platforms."
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {profile.principles.map((p, i) => (
            <li key={p.title} className="rounded-xl border border-line bg-surface p-6">
              <span className="text-sm font-semibold text-blue-700 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="balance-title">
        <SectionHeading
          id="balance-title"
          eyebrow="Balancing quality attributes"
          title="How I weigh the trade-offs"
          intro="Every architecture balances competing qualities. This is how I approach each one."
        />
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left">
            <caption className="sr-only">Quality attributes and my approach to each</caption>
            <thead className="bg-surface-2 text-sm text-slate-600">
              <tr>
                <th scope="col" className="w-1/4 px-5 py-3 font-semibold">
                  Quality
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  My approach
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {profile.balance.map((b) => (
                <tr key={b.quality}>
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-ink">
                    {b.quality}
                  </th>
                  <td className="px-5 py-4 leading-relaxed text-slate-600">{b.approach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="muted" labelledBy="leadership-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="leadership-title" eyebrow="Technical leadership" title="Leading through clarity, not control" />
            <ul className="space-y-4">
              {profile.leadership.map((l) => (
                <li key={l} className="flex gap-3 leading-relaxed text-slate-600">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-600" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Current interests" title="Where I’m focusing next" />
            <ul className="space-y-4">
              {profile.interests.map((l) => (
                <li key={l} className="flex gap-3 leading-relaxed text-slate-600">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-violet-600" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="career-title">
        <SectionHeading
          id="career-title"
          eyebrow="Career"
          title="Milestones"
          action={
            <Link to="/resume/" className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-800">
              Full resume <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <ol className="relative border-l border-line pl-8">
          {milestones.map((m) => (
            <li key={m.period} className="relative pb-10 last:pb-0">
              <span aria-hidden="true" className="absolute top-1.5 -left-[2.3rem] size-3 rounded-full border-2 border-blue-600 bg-page" />
              <p className="text-sm font-medium text-muted">{m.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">
                {m.role} · {m.org}
              </h3>
              <p className="mt-1.5 max-w-3xl leading-relaxed text-slate-600">{m.note}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ContactCta />
    </>
  );
}
