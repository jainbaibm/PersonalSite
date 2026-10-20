import { useState } from 'react';
import { LabCard } from '../components/cards';
import { ContactCta } from '../components/content-blocks';
import { Seo } from '../components/Seo';
import { Container, Notice, PageHeader, cx } from '../components/ui';
import { labEntries, type LabType } from '../content/lab';

const types: ('All' | LabType)[] = ['All', 'Reference architecture', 'Pattern', 'ADR', 'Checklist'];

export function LabPage() {
  const [filter, setFilter] = useState<(typeof types)[number]>('All');
  const shown = filter === 'All' ? labEntries : labEntries.filter((e) => e.type === filter);

  return (
    <>
      <Seo
        title="Architecture Lab"
        description="Reference architectures, system design examples, architecture decision records, resilience and security patterns, and an architecture review checklist — with Mermaid diagrams."
        path="/architecture-lab/"
      />
      <PageHeader
        eyebrow="Architecture Lab"
        title="Reference architectures, patterns and decision records"
        intro="A working notebook of designs I use to reason about systems: event-driven microservices, Kubernetes platforms, secure integration, observability, RAG and more."
      >
        <div className="mt-8 max-w-3xl">
          <Notice tone="violet" title="Everything here is conceptual">
            These are generic reference designs for learning and discussion. They do not describe any employer’s or client’s systems.
          </Notice>
        </div>
      </PageHeader>

      <Container className="py-14 lg:py-20">
        <div role="group" aria-label="Filter by type" className="mb-8 flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              className={cx(
                'min-h-10 rounded-full px-4 text-sm font-medium ring-1 ring-inset transition-colors',
                filter === t ? 'bg-ink text-white ring-ink' : 'bg-surface text-slate-700 ring-line-strong hover:bg-slate-50',
              )}
            >
              {t === 'All' ? 'All' : t === 'ADR' ? 'Decision records' : `${t}s`}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          Showing {shown.length} {shown.length === 1 ? 'entry' : 'entries'}
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <LabCard key={e.slug} entry={e} />
          ))}
        </div>
      </Container>

      <ContactCta />
    </>
  );
}
