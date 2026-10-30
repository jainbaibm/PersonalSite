import { ArrowLeft, Clock } from 'lucide-react';
import { useRef, type MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArticleCard } from '../components/cards';
import { ContactCta, ProfilePhoto, ShareLinks, TableOfContents } from '../components/content-blocks';
import { useMermaidBlocks } from '../components/DiagramViewer';
import { Seo } from '../components/Seo';
import { TechBackdrop } from '../components/TechBackdrop';
import { Container, Notice, Tag } from '../components/ui';
import { formatDate, getArticle, relatedArticles } from '../content/articles';
import { site } from '../content/site';
import { absoluteUrl } from '../utils/paths';
import { NotFoundPage } from './NotFoundPage';

export function ArticlePage() {
  const { slug = '' } = useParams();
  const article = getArticle(slug);
  const bodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useMermaidBlocks(bodyRef, slug);

  if (!article) return <NotFoundPage />;

  const path = `/blog/${article.slug}/`;
  const related = relatedArticles(article);

  // Route internal Markdown links through the client router.
  const onBodyClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-internal]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    navigate(a.pathname.slice(base.length) + a.hash);
  };

  return (
    <>
      <Seo
        title={article.title}
        description={article.summary}
        path={path}
        type="article"
        publishedTime={article.date}
        modifiedTime={article.updated}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.summary,
          datePublished: article.date,
          dateModified: article.updated ?? article.date,
          author: { '@type': 'Person', name: site.name, url: site.url },
          mainEntityOfPage: absoluteUrl(path),
          articleSection: article.category,
          keywords: article.tags.join(', '),
        }}
      />

      <header className="relative overflow-hidden border-b border-line surface-header">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <TechBackdrop variant="header" className="hidden md:block" />
        <Container className="relative py-12 sm:py-16">
          <Link to="/blog/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden="true" /> All articles
          </Link>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to={`/blog/?category=${encodeURIComponent(article.category)}`} className="rounded-md">
              <Tag tone="blue">{article.category}</Tag>
            </Link>
            {article.draft && <Tag tone="amber">Draft / demo</Tag>}
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">{article.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{article.summary}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
            <span className="flex items-center gap-2.5">
              <ProfilePhoto className="size-9 rounded-full object-cover object-top ring-1 ring-line" />
              <span className="font-medium text-ink">{site.name}</span>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" /> {article.readingMinutes} min read
            </span>
          </div>
        </Container>
      </header>

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:py-16">
        <article className="min-w-0">
          {article.draft && (
            <div className="mb-8 max-w-3xl">
              <Notice title="Draft / demo content">This article illustrates the blog format and has not been published as final.</Notice>
            </div>
          )}
          {article.toc.length > 2 && (
            <details className="mb-8 max-w-3xl rounded-xl border border-line p-4 lg:hidden">
              <summary className="cursor-pointer font-semibold text-ink">Table of contents</summary>
              <div className="mt-3">
                <TableOfContents items={article.toc} title="Sections" />
              </div>
            </details>
          )}
          <div
            ref={bodyRef}
            onClick={onBodyClick}
            className="article-body prose prose-slate max-w-3xl"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
          <div className="mt-12 max-w-3xl space-y-8 border-t border-line pt-8">
            <ShareLinks path={path} title={article.title} />
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="flex gap-4 rounded-xl border border-line bg-surface-2 p-5">
              <ProfilePhoto className="size-14 shrink-0 rounded-full object-cover object-top ring-1 ring-line" />
              <div>
                <p className="font-semibold text-ink">{site.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {site.role} with 18 years designing enterprise platforms on AWS and Google Cloud.{' '}
                  <Link to="/about/" className="font-semibold text-blue-700 hover:text-blue-800">
                    About me
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={article.toc} />
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-canvas py-14">
          <Container>
            <h2 id="related-title" className="text-2xl font-semibold tracking-tight text-ink">
              Related articles
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCta />
    </>
  );
}
