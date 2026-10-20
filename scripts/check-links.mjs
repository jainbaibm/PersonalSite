/**
 * Verifies that every internal link and asset referenced by the generated HTML
 * resolves to a file in dist/, and that each in-page #anchor exists.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

const files = htmlFiles(dist);
const ids = new Map(files.map((f) => [f, new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const problems = [];
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const [, attr, raw] of html.matchAll(/\s(href|src|srcSet|srcset)="([^"]+)"/g)) {
    const url = raw.replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    checked++;
    const [pathAndQuery, hash] = url.split('#');
    const path = (pathAndQuery ?? '').split('?')[0] ?? '';
    if (!path) {
      if (hash && !ids.get(file)?.has(hash)) problems.push(`${relative(dist, file)}: missing anchor #${hash}`);
      continue;
    }
    if (!path.startsWith(base)) {
      problems.push(`${relative(dist, file)}: ${attr} "${url}" is not under base ${base}`);
      continue;
    }
    const local = join(dist, path.slice(base.length));
    const target = path.endsWith('/') ? join(local, 'index.html') : local;
    if (!existsSync(target)) problems.push(`${relative(dist, file)}: broken ${attr} "${url}"`);
    else if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) problems.push(`${relative(dist, file)}: missing anchor "${url}"`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} broken link(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ link check passed (${checked} internal references across ${files.length} pages)`);
