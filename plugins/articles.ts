/**
 * Vite plugin: compiles blog Markdown (src/content/articles/*.md) into JS modules at
 * build time. Each module default-exports { meta…, html, toc }.
 */
import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import type { Plugin } from 'vite';
import { renderMarkdown } from '../src/utils/markdown';

const CATEGORIES = [
  'Solution Architecture',
  'Cloud Architecture',
  'Java and Microservices',
  'System Design',
  'Kubernetes and DevOps',
  'Enterprise Integration',
  'AI and GenAI Architecture',
  'Architecture Leadership',
];

function parseFrontMatter(raw: string, file: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) throw new Error(`${file}: missing front-matter block`);
  const data: Record<string, string> = {};
  for (const line of (match[1] ?? '').split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: match[2] ?? '' };
}

export function articlesPlugin(): Plugin {
  let base = '/';
  return {
    name: 'portfolio-articles',
    enforce: 'pre',
    configResolved(config) {
      base = config.base;
    },
    async load(id) {
      const file = id.split('?')[0] ?? '';
      if (!file.endsWith('.md') || !/[\\/]content[\\/]articles[\\/]/.test(file)) return null;
      this.addWatchFile(file);
      const raw = await readFile(file, 'utf8');
      const { data, body } = parseFrontMatter(raw, file);
      for (const key of ['title', 'summary', 'date', 'category']) {
        if (!data[key]) throw new Error(`${file}: front matter is missing "${key}"`);
      }
      if (!CATEGORIES.includes(data.category!)) throw new Error(`${file}: unknown category "${data.category}"`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date!)) throw new Error(`${file}: date must be YYYY-MM-DD`);
      // Code and diagrams count too: readers skim them, so ~200 words a minute overall.
      const words = body.split(/\s+/).filter(Boolean).length;
      const { html, toc } = renderMarkdown(body, base);
      const article = {
        slug: basename(file, '.md'),
        title: data.title,
        summary: data.summary,
        date: data.date,
        updated: data.updated || undefined,
        category: data.category,
        tags: (data.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
        draft: data.draft === 'true',
        readingMinutes: Math.max(1, Math.round(words / 200)),
        html,
        toc,
      };
      return `export default ${JSON.stringify(article)};`;
    },
  };
}
