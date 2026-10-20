# Jain Bai B — Personal Portfolio

Static, prerendered portfolio website for a Senior Solution Architect: home, about, architecture expertise, case studies, architecture lab, blog, certifications, resume and contact.

Built with **React 19 + TypeScript + Vite + Tailwind CSS 4 + React Router 7**, with **Mermaid** diagrams and **Markdown** articles. Every page is prerendered to static HTML at build time (good for SEO and first paint) and then hydrated in the browser. No server, database or secrets are required.

## Quick start

Requires Node.js 20+ (tested with Node 22).

```bash
npm install
npm run dev        # http://localhost:5173 — hot reload
npm run build      # type-check, build, prerender every route, write sitemap, check links
npm run preview    # serve the production build at http://localhost:4173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server (client-rendered, fast refresh). |
| `npm run typecheck` | `tsc --noEmit` over `src/`, `plugins/` and the Vite config. |
| `npm run build` | Type-check → client build → SSR build → prerender all routes into `dist/` → write `sitemap.xml` and `robots.txt` → verify every internal link and anchor. |
| `npm run preview` | Serve `dist/` locally. |
| `npm run assets` | Regenerate the profile photo (WebP/JPEG), favicons and the social-sharing image from `assets-src/profile-source.jpg`. |

## Before going live — owner checklist

1. **Set the production URL** in `src/content/site.ts` (`url`). Canonical URLs, the sitemap and social cards depend on it. The build prints a warning while it is still `https://example.com`.
2. **Review every case study** in `src/content/case-studies/` and change `reviewStatus` from `'draft'` to `'approved'` once you are comfortable with the wording and confidentiality.
3. **Add a resume PDF approved for publishing** (without your phone number) to `public/documents/` and set `site.resume.pdfPath`. Until then the Resume page offers "Print / save as PDF".
4. Optionally add your **GitHub URL**, **certification verification links, dates and badges**, and a **form endpoint** for the contact form.

The full list is in [docs/content-maintenance.md](docs/content-maintenance.md#owner-inputs-and-placeholders).

## Project structure

```
src/
  components/      Reusable UI (header, cards, diagram viewer, TOC, contact form…)
  layouts/         Site layout (skip link, header, footer, scroll/focus management)
  pages/           One component per route
  content/         All site content — edit here, not in components
    site.ts          Site-wide config: URL, links, email, resume, contact form
    profile.ts       Bio, principles, experience, skills, education, awards
    expertise.ts     Architecture expertise areas
    certifications.ts
    case-studies/    One file per case study
    lab/             Architecture Lab entries (reference architectures, ADRs…)
    articles/        Blog posts as Markdown
  utils/           Head/SEO helpers, Markdown compiler, Mermaid loader, paths
  styles/          Tailwind entry + typography, code and print styles
  entry-client.tsx Browser entry (hydration)
  entry-server.tsx Prerender entry + route list
plugins/articles.ts  Vite plugin compiling Markdown articles at build time
scripts/            prerender, link check, asset generation
public/             Static files: images, favicon, documents
assets-src/         Source images for `npm run assets`
docs/               Architecture, content maintenance and deployment guides
```

## Documentation

- [docs/architecture.md](docs/architecture.md) — how the site is built and why.
- [docs/content-maintenance.md](docs/content-maintenance.md) — updating profile, articles, case studies, certifications and links.
- [docs/deployment.md](docs/deployment.md) — Cloudflare Pages and GitHub Pages step by step.
