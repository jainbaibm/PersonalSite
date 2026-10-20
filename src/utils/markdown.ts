/**
 * Build-time Markdown compiler for blog articles (used by plugins/articles.ts).
 * Runs in Node only — the browser receives pre-rendered HTML, so neither `marked`
 * nor `highlight.js` ship in the client bundle.
 */
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import markdownLang from 'highlight.js/lib/languages/markdown';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import { Marked, type Tokens } from 'marked';
import { slugify } from './slugify';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('java', java);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdownLang);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yaml', yaml);

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

type InlineParser = { parser: { parseInline(t: Tokens.Generic[]): string } };

/** Render article Markdown to HTML and collect h2/h3 headings for the table of contents. */
export function renderMarkdown(source: string, base = '/'): { html: string; toc: TocItem[] } {
  const prefix = base.replace(/\/$/, '');
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading(this: InlineParser, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        let id = slugify(token.text);
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (token.depth === 2 || token.depth === 3) toc.push({ id, text: inner.replace(/<[^>]+>/g, ''), depth: token.depth });
        return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
      },
      code(token: Tokens.Code) {
        const lang = (token.lang ?? '').trim().split(/\s+/)[0] ?? '';
        if (lang === 'mermaid') {
          return `<div class="mermaid-block not-prose" data-mermaid="${escapeHtml(token.text)}"><pre class="mermaid-fallback"><code>${escapeHtml(token.text)}</code></pre></div>\n`;
        }
        const highlighted =
          lang && hljs.getLanguage(lang) ? hljs.highlight(token.text, { language: lang }).value : escapeHtml(token.text);
        const label = lang ? `<span class="code-lang" aria-hidden="true">${escapeHtml(lang)}</span>` : '';
        return `<div class="code-block">${label}<pre tabindex="0"><code class="hljs language-${escapeHtml(lang || 'text')}">${highlighted}</code></pre></div>\n`;
      },
      link(this: InlineParser, token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens);
        const internal = token.href.startsWith('/');
        const href = internal ? `${prefix}${token.href}` : token.href;
        const extra = internal ? ' data-internal="true"' : ' rel="noopener noreferrer" target="_blank"';
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
        return `<a href="${escapeHtml(href)}"${title}${extra}>${text}</a>`;
      },
      table(token: Tokens.Table) {
        const head = token.header.map((c) => `<th scope="col">${escapeHtml(c.text)}</th>`).join('');
        const rows = token.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c.text)}</td>`).join('')}</tr>`).join('');
        return `<div class="table-wrap" tabindex="0" role="region" aria-label="Table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });

  const html = marked.parse(source, { async: false }) as string;
  return { html, toc };
}
