import { site } from '../content/site';
import { absoluteUrl } from './paths';

export interface HeadMeta {
  /** Page title without the site-name suffix. */
  title: string;
  description: string;
  /** Route path, e.g. '/about/'. */
  path: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function fullTitle(meta: HeadMeta) {
  return meta.path === '/' ? meta.title : `${meta.title} | ${site.name}`;
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

interface Tag {
  attr: 'name' | 'property';
  key: string;
  content: string;
}

function metaTags(meta: HeadMeta): Tag[] {
  const url = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.image ?? site.ogImage);
  const tags: Tag[] = [
    { attr: 'name', key: 'description', content: meta.description },
    { attr: 'name', key: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow' },
    { attr: 'property', key: 'og:type', content: meta.type ?? 'website' },
    { attr: 'property', key: 'og:site_name', content: site.name },
    { attr: 'property', key: 'og:title', content: fullTitle(meta) },
    { attr: 'property', key: 'og:description', content: meta.description },
    { attr: 'property', key: 'og:url', content: url },
    { attr: 'property', key: 'og:image', content: image },
    { attr: 'property', key: 'og:image:alt', content: meta.imageAlt ?? `${site.name} — ${site.role}` },
    { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { attr: 'name', key: 'twitter:title', content: fullTitle(meta) },
    { attr: 'name', key: 'twitter:description', content: meta.description },
    { attr: 'name', key: 'twitter:image', content: image },
  ];
  if (meta.publishedTime) tags.push({ attr: 'property', key: 'article:published_time', content: meta.publishedTime });
  if (meta.modifiedTime) tags.push({ attr: 'property', key: 'article:modified_time', content: meta.modifiedTime });
  return tags;
}

/** Serialized <head> tags, used by the prerender step. */
export function renderHeadHtml(meta: HeadMeta) {
  const lines = [
    `<title>${esc(fullTitle(meta))}</title>`,
    `<link rel="canonical" href="${esc(absoluteUrl(meta.path))}" />`,
    ...metaTags(meta).map((t) => `<meta ${t.attr}="${t.key}" content="${esc(t.content)}" />`),
  ];
  const ld = meta.jsonLd ? (Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]) : [];
  for (const block of ld) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`);
  }
  return lines.join('\n    ');
}

/** Update document head on client-side navigation. */
export function applyHead(meta: HeadMeta) {
  document.title = fullTitle(meta);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = absoluteUrl(meta.path);
  for (const t of metaTags(meta)) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${t.attr}="${t.key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(t.attr, t.key);
      document.head.appendChild(el);
    }
    el.content = t.content;
  }
  for (const k of ['article:published_time', 'article:modified_time']) {
    if (!metaTags(meta).some((t) => t.key === k)) document.head.querySelector(`meta[property="${k}"]`)?.remove();
  }
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
  const ld = meta.jsonLd ? (Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]) : [];
  for (const block of ld) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(block);
    document.head.appendChild(s);
  }
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  sameAs: [site.linkedin, site.github].filter(Boolean),
  knowsAbout: [
    'Solution Architecture',
    'Enterprise Architecture',
    'Amazon Web Services',
    'Google Cloud',
    'Java',
    'Microservices',
    'Distributed Systems',
    'API Integration',
    'Generative AI',
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'AWS Certified Solutions Architect – Professional' },
    { '@type': 'EducationalOccupationalCredential', name: 'Google Cloud Certified – Professional Cloud Architect' },
  ],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${site.name} — ${site.role}`,
  url: site.url,
};
