import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { ContactCta, TableOfContents } from '../components/content-blocks';
import { DiagramViewer } from '../components/DiagramViewer';
import { Seo } from '../components/Seo';
import { TechBackdrop } from '../components/TechBackdrop';
import { Container, Eyebrow, Notice, Tag } from '../components/ui';
import { caseStudies, clientLabel, getCaseStudy } from '../content/case-studies';
import { site } from '../content/site';
import { absoluteUrl } from '../utils/paths';
import { NotFoundPage } from './NotFoundPage';

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-line pt-10">
      <h2 id={`${id}-h`} className="text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

function Bullets({ items, tone = 'blue' }: { items: string[]; tone?: 'blue' | 'violet' }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className={`mt-2.5 size-1.5 shrink-0 rounded-full ${tone === 'blue' ? 'bg-blue-600' : 'bg-violet-600'}`} />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

const sections = [
  ['context', 'Business context'],
  ['problem', 'Problem statement'],
  ['requirements', 'Requirements'],
  ['constraints', 'Constraints and assumptions'],
  ['approach', 'Architecture approach'],
  ['diagram', 'Architecture diagram'],
  ['technology', 'Technology choices'],
  ['alternatives', 'Alternatives and trade-offs'],
  ['security', 'Security and reliability'],
  ['scalability', 'Scalability and performance'],
  ['deployment', 'Deployment and observability'],
  ['outcomes', 'Outcomes and lessons'],
] as const;

export function CaseStudyPage() {
  const { slug = '' } = useParams();
  const study = getCaseStudy(slug);
  if (!study) return <NotFoundPage />;

  const path = `/case-studies/${study.slug}/`;
  const index = caseStudies.indexOf(study);
  const prev = caseStudies[index - 1];
  const next = caseStudies[index + 1];
  const conceptual = study.kind === 'conceptual';

  return (
    <>
      <Seo
        title={study.title}
        description={study.summary}
        path={path}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: study.title,
          description: study.summary,
          author: { '@type': 'Person', name: site.name, url: site.url },
          mainEntityOfPage: absoluteUrl(path),
          keywords: study.tags.join(', '),
        }}
      />

      <header className="relative overflow-hidden border-b border-line surface-header">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <TechBackdrop variant="header" className="hidden md:block" />
        <Container className="relative py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/case-studies/" className="hover:text-ink">
                  Case studies
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-700">
                {conceptual ? 'Conceptual design' : study.domain}
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">{study.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{study.summary}</p>
          <dl className="mt-8 grid max-w-4xl gap-x-10 gap-y-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted">Organization</dt>
              <dd className="mt-0.5 font-medium text-ink">{clientLabel(study)}</dd>
            </div>
            <div>
              <dt className="text-muted">My role</dt>
              <dd className="mt-0.5 font-medium text-ink">{study.role}</dd>
            </div>
            {study.period && (
              <div>
                <dt className="text-muted">Period</dt>
                <dd className="mt-0.5 font-medium text-ink">{study.period}</dd>
              </div>
            )}
          </dl>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Topics">
            {study.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </Container>
      </header>

      <Container className="grid gap-12 py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:py-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={sections.map(([id, text]) => ({ id, text }))} />
          </div>
        </aside>

        <article className="min-w-0 max-w-3xl space-y-10">
          {conceptual ? (
            <Notice tone="violet" title="Conceptual design">
              This is an illustrative architecture showing how I would approach the problem. It was not deployed as described and reports no real
              outcomes.
            </Notice>
          ) : (
            <Notice tone="amber" title={study.reviewStatus === 'draft' ? 'Generalized write-up — draft pending owner review' : 'Generalized write-up'}>
              Based on a real program, described without confidential details. The diagram is a simplified representation, not the deployed design.
              Narrative sections describe the architectural reasoning; verified facts are listed below.
            </Notice>
          )}

          {study.verifiedFacts.length > 0 && (
            <div className="rounded-xl border border-line bg-surface-2 p-6">
              <Eyebrow>Verified highlights</Eyebrow>
              <ul className="mt-4 space-y-2.5">
                {study.verifiedFacts.map((f) => (
                  <li key={f} className="flex gap-3 leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-blue-700" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Block id="context" title="Business context">
            {study.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Block>
          <Block id="problem" title="Problem statement">
            <Bullets items={study.problem} />
          </Block>
          <Block id="requirements" title="Requirements">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-ink">Functional</h3>
                <Bullets items={study.functionalRequirements} />
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-ink">Non-functional</h3>
                <Bullets items={study.nonFunctionalRequirements} tone="violet" />
              </div>
            </div>
          </Block>
          <Block id="constraints" title="Constraints and assumptions">
            <Bullets items={study.constraints} />
          </Block>
          <Block id="approach" title="Architecture approach">
            {study.approach.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Block>
          <Block id="diagram" title="Architecture diagram">
            <DiagramViewer diagram={study.diagram} label={conceptual ? 'Conceptual' : 'Generalized representation'} />
          </Block>
          <Block id="technology" title="Technology choices">
            <dl className="divide-y divide-line rounded-xl border border-line">
              {study.technologyChoices.map((t) => (
                <div key={t.tech} className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="font-semibold text-ink">{t.tech}</dt>
                  <dd className="text-[0.975rem]">{t.rationale}</dd>
                </div>
              ))}
            </dl>
          </Block>
          <Block id="alternatives" title="Alternatives and trade-offs">
            <ul className="grid gap-3">
              {study.alternatives.map((a) => (
                <li key={a.option} className="rounded-xl border border-line p-5">
                  <p className="font-semibold text-ink">{a.option}</p>
                  <p className="mt-1 text-[0.975rem]">{a.tradeoff}</p>
                </li>
              ))}
            </ul>
          </Block>
          <Block id="security" title="Security and reliability">
            <Bullets items={study.security} />
          </Block>
          <Block id="scalability" title="Scalability and performance">
            <Bullets items={study.scalability} />
          </Block>
          <Block id="deployment" title="Deployment and observability">
            <Bullets items={study.deployment} />
          </Block>
          <Block id="outcomes" title="Outcomes and lessons">
            <h3 className="font-semibold text-ink">Outcomes</h3>
            <Bullets items={study.outcomes} />
            <h3 className="pt-3 font-semibold text-ink">Lessons learned</h3>
            <Bullets items={study.lessons} tone="violet" />
          </Block>

          <nav aria-label="More case studies" className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            {prev ? (
              <Link to={`/case-studies/${prev.slug}/`} className="rounded-xl border border-line p-5 hover:border-line-strong hover:bg-slate-50">
                <span className="inline-flex items-center gap-1 text-sm text-muted">
                  <ArrowLeft className="size-4" aria-hidden="true" /> Previous
                </span>
                <span className="mt-1 block font-semibold text-ink">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/case-studies/${next.slug}/`} className="rounded-xl border border-line p-5 text-right hover:border-line-strong hover:bg-slate-50">
                <span className="inline-flex items-center gap-1 text-sm text-muted">
                  Next <ArrowRight className="size-4" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-semibold text-ink">{next.title}</span>
              </Link>
            )}
          </nav>
        </article>
      </Container>

      <ContactCta />
    </>
  );
}
