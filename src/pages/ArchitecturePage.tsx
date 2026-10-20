import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { expertiseIcons } from '../components/cards';
import { ContactCta, TableOfContents } from '../components/content-blocks';
import { Seo } from '../components/Seo';
import { Container, PageHeader, Tag } from '../components/ui';
import { depthLabel, expertise, type Depth } from '../content/expertise';

const depthTone: Record<Depth, 'blue' | 'violet' | 'amber'> = { production: 'blue', applied: 'violet', exploring: 'amber' };

export function ArchitecturePage() {
  return (
    <>
      <Seo
        title="Architecture Expertise"
        description="Solution and enterprise architecture, AWS and Google Cloud, microservices, API integration, event-driven design with Kafka, security and observability, Kubernetes and GenAI architecture — with the trade-offs I weigh in each."
        path="/architecture/"
      />
      <PageHeader
        eyebrow="Architecture expertise"
        title="Where I add the most value"
        intro={
          <>
            <p>
              Eight areas I work across, with the technologies I’ve used and the trade-offs I think about. Each is labelled honestly so you can tell
              delivered experience from active learning.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm" aria-label="Legend">
              {(Object.keys(depthLabel) as Depth[]).map((d) => (
                <li key={d}>
                  <Tag tone={depthTone[d]}>{depthLabel[d]}</Tag>
                </li>
              ))}
            </ul>
          </>
        }
      />

      <Container className="grid gap-12 py-14 lg:grid-cols-[15rem_1fr] lg:py-20">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={expertise.map((e) => ({ id: e.id, text: e.title }))} title="Areas" />
          </div>
        </aside>

        <div className="grid gap-8">
          {expertise.map((area) => {
            const Icon = expertiseIcons[area.icon];
            return (
              <section key={area.id} id={area.id} aria-labelledby={`${area.id}-title`} className="scroll-mt-24 rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h2 id={`${area.id}-title`} className="text-2xl font-semibold tracking-tight text-ink">
                    {area.title}
                  </h2>
                  <Tag tone={depthTone[area.depth]}>{depthLabel[area.depth]}</Tag>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{area.description}</p>

                <div className="mt-7 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Technologies</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {area.technologies.map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                    {area.exploring && (
                      <>
                        <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-muted">Currently exploring</h3>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {area.exploring.map((t) => (
                            <li key={t}>
                              <Tag tone="amber">{t}</Tag>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Concerns &amp; trade-offs</h3>
                    <ul className="mt-3 space-y-2.5">
                      {area.concerns.map((c) => (
                        <li key={c} className="flex gap-3 text-[0.95rem] leading-relaxed text-slate-600">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-violet-600" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 border-t border-line pt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Related</h3>
                  <ul className="mt-3 grid gap-2">
                    {area.related.map((r) => (
                      <li key={r.to}>
                        <Link to={r.to} className="inline-flex items-center gap-1.5 font-medium text-blue-700 hover:text-blue-800">
                          {r.label} <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </Container>

      <ContactCta />
    </>
  );
}
