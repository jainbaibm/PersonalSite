import { site } from '../content/site';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative public asset path with the deploy base path. */
export function asset(path: string) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Absolute URL for canonical links, sitemap and social cards. */
export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.url}${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export { slugify } from './slugify';
