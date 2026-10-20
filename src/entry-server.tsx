import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { HeadContext } from './components/Seo';
import { articles } from './content/articles';
import { caseStudies } from './content/case-studies';
import { labEntries } from './content/lab';
import { site } from './content/site';
import { renderHeadHtml, type HeadMeta } from './utils/head';

/** Every public route, used by the prerender step and the sitemap. */
export const routes: string[] = [
  '/',
  '/about/',
  '/architecture/',
  '/case-studies/',
  ...caseStudies.map((c) => `/case-studies/${c.slug}/`),
  '/architecture-lab/',
  ...labEntries.map((e) => `/architecture-lab/${e.slug}/`),
  '/blog/',
  ...articles.map((a) => `/blog/${a.slug}/`),
  '/certifications/',
  '/resume/',
  '/contact/',
];

export const siteUrl = site.url;
export const defaultTheme = site.defaultTheme;

export function render(url: string, basename = '/') {
  const collector: { meta?: HeadMeta } = {};
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url} basename={basename}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  if (!collector.meta) throw new Error(`No <Seo> metadata rendered for ${url}`);
  return { html, head: renderHeadHtml(collector.meta), noindex: Boolean(collector.meta.noindex) };
}
