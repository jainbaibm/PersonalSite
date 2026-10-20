/**
 * Blog articles are Markdown files in this folder with a simple front-matter block:
 *
 * ---
 * title: …
 * summary: …
 * date: YYYY-MM-DD
 * category: one of `categories` below
 * tags: comma, separated
 * draft: true | false
 * ---
 *
 * The file name (without .md) becomes the URL slug: /blog/<slug>/
 * Markdown is compiled at build time by plugins/articles.ts.
 */
import type { TocItem } from '../../utils/markdown';

export const categories = [
  'Solution Architecture',
  'Cloud Architecture',
  'Java and Microservices',
  'System Design',
  'Kubernetes and DevOps',
  'Enterprise Integration',
  'AI and GenAI Architecture',
  'Architecture Leadership',
] as const;

export type Category = (typeof categories)[number];

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  updated?: string;
  category: Category;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
}

export interface Article extends ArticleMeta {
  html: string;
  toc: TocItem[];
}

const modules = import.meta.glob<Article>('./*.md', { import: 'default', eager: true });

const all: Article[] = Object.values(modules).sort((a, b) => b.date.localeCompare(a.date));

export const articles: ArticleMeta[] = all;

export function getArticle(slug: string): Article | undefined {
  return all.find((a) => a.slug === slug);
}

export function relatedArticles(article: ArticleMeta, limit = 3) {
  return articles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score: (a.category === article.category ? 3 : 0) + a.tags.filter((t) => article.tags.includes(t)).length,
    }))
    .sort((x, y) => y.score - x.score || y.a.date.localeCompare(x.a.date))
    .slice(0, limit)
    .map((x) => x.a);
}

export function formatDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d} ${months[(m ?? 1) - 1]} ${y}`;
}
