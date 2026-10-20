import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { LabCard } from '../components/cards';
import { ContactCta } from '../components/content-blocks';
import { DiagramViewer } from '../components/DiagramViewer';
import { Seo } from '../components/Seo';
import { TechBackdrop } from '../components/TechBackdrop';
import { Container, Notice, Tag } from '../components/ui';
import { getLabEntry, labEntries } from '../content/lab';
import { slugify } from '../utils/paths';
import { NotFoundPage } from './NotFoundPage';

export function LabEntryPage() {
  const { slug = '' } = useParams();
  const entry = getLabEntry(slug);
  if (!entry) return <NotFoundPage />;

  const related = labEntries
    .filter((e) => e.slug !== entry.slug)
    .map((e) => ({ e, score: e.tags.filter((t) => entry.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.e);

  return (
    <>
      <Seo title={entry.title} description={entry.summary} path={`/architecture-lab/${entry.slug}/`} type="article" />

      <header className="relative overflow-hidden border-b border-line surface-header">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <TechBackdrop variant="header" className="hidden md:block" />
        <Container className="relative py-12 sm:py-16">
          <Link to="/architecture-lab/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden="true" /> Architecture Lab
          </Link>
          <div className="mt-5 flex flex-wrap gap-2">
            <Tag tone={entry.type === 'ADR' ? 'violet' : entry.type === 'Checklist' ? 'amber' : 'blue'}>{entry.type}</Tag>
            {entry.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">{entry.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{entry.summary}</p>
        </Container>
      </header>

      <Container className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          <Notice tone="violet" title="Conceptual example">
            A generic design for learning and discussion — not a description of any organization’s production system.
          </Notice>

          {entry.diagram && <DiagramViewer diagram={entry.diagram} />}

          {entry.sections.map((s) => {
            const id = slugify(s.heading);
            return (
              <section key={s.heading} aria-labelledby={id}>
                <h2 id={id} className="text-2xl font-semibold tracking-tight text-ink">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-slate-600">
                  {s.body?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.list && (
                    <ul className="space-y-2.5">
                      {s.list.map((i) => (
                        <li key={i} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-600" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.checklist && (
                    <ul className="divide-y divide-line rounded-xl border border-line">
                      {s.checklist.map((i, n) => {
                        const cid = `${id}-${n}`;
                        return (
                          <li key={i} className="flex items-start gap-3 px-4 py-3">
                            <input id={cid} type="checkbox" className="mt-1 size-4 shrink-0 accent-blue-600" />
                            <label htmlFor={cid} className="cursor-pointer">
                              {i}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </section>
            );
          })}
          {entry.sections.some((s) => s.checklist) && (
            <p className="text-sm text-muted">Checkboxes are a working aid for your own review; nothing is saved or sent.</p>
          )}
        </div>
      </Container>

      <section aria-labelledby="related-lab" className="border-t border-line bg-canvas py-14">
        <Container>
          <h2 id="related-lab" className="text-2xl font-semibold tracking-tight text-ink">
            More from the lab
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((e) => (
              <LabCard key={e.slug} entry={e} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
