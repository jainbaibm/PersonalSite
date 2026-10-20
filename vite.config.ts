import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { articlesPlugin } from './plugins/articles';

/** Make `vite preview` behave like static hosts: unknown paths get dist/404.html with status 404. */
function staticNotFound(): Plugin {
  return {
    name: 'static-404',
    configurePreviewServer(server) {
      const outDir = resolve(server.config.root, server.config.build.outDir);
      const base = server.config.base;
      server.middlewares.use(async (req, res, next) => {
        const path = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/');
        if (!path.startsWith(base)) return next();
        const rel = path.slice(base.length);
        const file = resolve(outDir, rel, rel === '' || rel.endsWith('/') ? 'index.html' : '');
        if (existsSync(file) || existsSync(`${file}.html`)) return next();
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(await readFile(resolve(outDir, '404.html'), 'utf8'));
      });
    },
  };
}

// Set BASE_PATH=/repo-name/ when hosting under a GitHub Pages project sub-path.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [articlesPlugin(), react(), tailwindcss(), staticNotFound()],
  // Keep module ids on the path the project was opened from. Without this, the dev server
  // fails in folders Windows redirects (e.g. packaged-app AppData), and nothing here relies on symlinks.
  resolve: { preserveSymlinks: true },
  build: {
    target: 'es2022',
    // Mermaid's lazily loaded diagram chunks are large by nature; they never load on pages without diagrams.
    chunkSizeWarningLimit: 800,
  },
});
