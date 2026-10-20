/**
 * Static generation: renders every route to dist/<route>/index.html, writes 404.html,
 * sitemap.xml and robots.txt. Runs after `vite build` and `vite build --ssr`.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

const { render, routes, siteUrl, defaultTheme } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const template = (await readFile(join(dist, 'index.html'), 'utf8'))
  .replace('data-theme="executive"', `data-theme="${defaultTheme}"`)
  .replace('content="#0B1120"', `content="${defaultTheme === 'executive' ? '#0B1120' : '#FFFFFF'}"`);

if (siteUrl.includes('example.com')) {
  console.warn('\n⚠  site.url is still https://example.com — set it in src/content/site.ts before deploying.\n');
}

function page(url) {
  const { html, head } = render(url, base);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
}

for (const route of routes) {
  const file = join(dist, route, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(route));
}
await writeFile(join(dist, '404.html'), page('/404/'));
console.log(`prerendered ${routes.length} routes + 404.html`);

const origin = `${siteUrl}${base.replace(/\/$/, '')}`;
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${origin}${r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log('wrote sitemap.xml and robots.txt');

await rm(join(root, 'dist-ssr'), { recursive: true, force: true });
