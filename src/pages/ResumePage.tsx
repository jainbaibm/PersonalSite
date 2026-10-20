import { Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { LinkedInIcon } from '../components/BrandIcons';
import { ResumeActions } from '../components/content-blocks';
import { Seo } from '../components/Seo';
import { ButtonLink, Container, Tag } from '../components/ui';
import { certifications } from '../content/certifications';
import { profile } from '../content/profile';
import { site } from '../content/site';
import { personJsonLd } from '../utils/head';

function ResumeSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t border-line py-10 md:grid-cols-[13rem_1fr] md:gap-10">
      <h2 id={id} className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function ResumePage() {
  return (
    <>
      <Seo
        title="Resume"
        description="Resume of Jain Bai B, Senior Solution Architect: summary, core competencies, technical skills, professional experience at Quest Global, Equifax, Nissan Digital and Cognizant, certifications and education."
        path="/resume/"
        type="profile"
        jsonLd={personJsonLd}
      />

      <div className="border-b border-line surface-header print-plain">
        <Container className="flex flex-col gap-6 py-12 sm:py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Resume</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{site.name}</h1>
            <p className="mt-2 text-lg text-slate-600">
              {site.role} · {site.tagline}
            </p>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-ink">
                <Mail className="size-4" aria-hidden="true" /> {site.email}
              </a>
              <a href={site.linkedin} className="inline-flex items-center gap-1.5 hover:text-ink" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="size-4" /> {site.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-3">
            <ResumeActions onResumePage />
            <ButtonLink to="/contact/" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </Container>
      </div>

      <Container className="pb-16">
        <ResumeSection id="r-summary" title="Summary">
          <p className="max-w-3xl text-[1.0625rem] leading-relaxed text-slate-700">
            Solution Architect with 17 years of experience architecting enterprise-scale cloud, integration and data platforms across healthcare,
            automotive, insurance and data governance. Deep expertise in dual-cloud (AWS, GCP) architecture, microservices and event-driven design,
            enterprise API and integration strategy, and IAM/security architecture. Trusted advisor to client CTO and VP Engineering stakeholders on
            modernization roadmaps and architecture governance.
          </p>
          <ul className="mt-5 grid max-w-3xl gap-2">
            {profile.keyAchievements.map((a) => (
              <li key={a} className="flex gap-3 leading-relaxed text-slate-700">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-600" />
                {a}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="r-competencies" title="Core competencies">
          <ul className="flex flex-wrap gap-2">
            {profile.competencies.map((c) => (
              <li key={c}>
                <Tag tone="blue">{c}</Tag>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="r-skills" title="Technical skills">
          <dl className="grid gap-4">
            {profile.skills.map((s) => (
              <div key={s.group} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-semibold text-ink">{s.group}</dt>
                <dd className="text-slate-700">
                  {s.items.map((i) => (
                    <p key={i}>{i}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection id="r-experience" title="Experience">
          <ol className="grid gap-10">
            {profile.experience.map((r) => (
              <li key={r.company + r.start}>
                <article>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold text-ink">
                      {r.title} · {r.company}
                    </h3>
                    <p className="text-sm font-medium text-muted tabular-nums">
                      {r.start} – {r.end}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {[r.client && `Client: ${r.client}`, r.domain && `Domain: ${r.domain}`].filter(Boolean).join(' · ')}
                  </p>
                  <p className="mt-3 leading-relaxed text-slate-700">{r.summary}</p>
                  <ul className="mt-3 grid gap-1.5">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-3 leading-relaxed text-slate-700">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-slate-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {r.achievements && (
                    <p className="mt-3 text-sm text-slate-700">
                      <span className="font-semibold text-ink">Recognition: </span>
                      {r.achievements.join('; ')}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-muted">
                    <span className="font-medium text-slate-600">Technologies: </span>
                    {r.technologies.join(', ')}
                  </p>
                </article>
              </li>
            ))}
          </ol>
          <h3 className="mt-10 font-semibold text-ink">Earlier roles</h3>
          <ul className="mt-3 grid gap-2">
            {profile.earlierRoles.map((r) => (
              <li key={r.company} className="text-slate-700">
                <span className="font-medium text-ink">
                  {r.title} · {r.company}
                </span>{' '}
                <span className="text-sm text-muted">({r.period})</span> — {r.note}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="r-certs" title="Certifications">
          <ul className="grid gap-2">
            {certifications.map((c) => (
              <li key={c.id} className="text-slate-700">
                <span className="font-medium text-ink">{c.name}</span> — {c.issuer}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="r-domains" title="Domain experience">
          <ul className="flex flex-wrap gap-2">
            {profile.domains.map((d) => (
              <li key={d.name}>
                <Tag>
                  {d.name} · {d.years}
                </Tag>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="r-education" title="Education">
          <ul className="grid gap-2">
            {profile.education.map((e) => (
              <li key={e.degree} className="text-slate-700">
                <span className="font-medium text-ink">{e.degree}</span> — {e.school}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="r-awards" title="Awards">
          <ul className="grid gap-2">
            {profile.awards.map((a) => (
              <li key={a.title} className="text-slate-700">
                <span className="font-medium text-ink">{a.title}</span>
                {a.org && ` — ${a.org}`}
              </li>
            ))}
          </ul>
        </ResumeSection>
      </Container>
    </>
  );
}
