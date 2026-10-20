import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ArticleCard } from '../components/cards';
import { ContactCta } from '../components/content-blocks';
import { Seo } from '../components/Seo';
import { Container, Notice, PageHeader, cx } from '../components/ui';
import { articles, categories, type Category } from '../content/articles';

export function BlogPage() {
  const [params, setParams] = useSearchParams();
  // Start with "All" so the prerendered HTML hydrates cleanly, then apply ?category= from the URL.
  const [category, setCategory] = useState<Category | 'All'>('All');

  useEffect(() => {
    const c = params.get('category');
    setCategory(c && (categories as readonly string[]).includes(c) ? (c as Category) : 'All');
  }, [params]);

  const choose = (c: Category | 'All') => {
    setCategory(c);
    setParams(c === 'All' ? {} : { category: c }, { replace: true, preventScrollReset: true });
  };

  const shown = category === 'All' ? articles : articles.filter((a) => a.category === category);
  const counts = new Map(categories.map((c) => [c, articles.filter((a) => a.category === c).length]));

  return (
    <>
      <Seo
        title="Blog"
        description="Technical writing on solution architecture, cloud architecture, Java and microservices, system design, Kubernetes, enterprise integration, GenAI architecture and architecture leadership."
        path="/blog/"
      />
      <PageHeader
        eyebrow="Blog"
        title="Notes on architecture, cloud and engineering leadership"
        intro="Practical writing on the decisions behind enterprise systems — with diagrams and code where they help."
      >
        <div className="mt-8 max-w-3xl">
          <Notice title="Early drafts">
            The current articles are draft / demo content that illustrate the format. They reflect general practice and do not report results from
            specific projects.
          </Notice>
        </div>
      </PageHeader>

      <Container className="py-14 lg:py-20">
        <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
          {(['All', ...categories] as const).map((c) => {
            const count = c === 'All' ? articles.length : (counts.get(c) ?? 0);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => choose(c)}
                className={cx(
                  'min-h-10 rounded-full px-4 text-sm font-medium ring-1 ring-inset transition-colors',
                  category === c ? 'bg-ink text-white ring-ink' : 'bg-surface text-slate-700 ring-line-strong hover:bg-slate-50',
                )}
              >
                {c} <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" role="status">
          Showing {shown.length} {shown.length === 1 ? 'article' : 'articles'}
        </p>
        {shown.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-line-strong p-10 text-center text-slate-600">
            No articles in this category yet. Check back soon, or{' '}
            <button type="button" className="font-semibold text-blue-700 underline" onClick={() => choose('All')}>
              view all articles
            </button>
            .
          </p>
        )}
      </Container>

      <ContactCta />
    </>
  );
}
