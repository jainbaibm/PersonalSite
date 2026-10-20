# Deployment

The build output in `dist/` is plain static files: one `index.html` per route, `404.html`, `sitemap.xml`, `robots.txt`, and hashed assets. Any static host works. Two recommended options are below.

**Before the first deploy:** set `url` in `src/content/site.ts` to your real domain and run `npm run build` locally to confirm it passes.

## 1. Put the project on GitHub

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-user>/<repo>.git
git push -u origin main
```

## 2a. Cloudflare Pages (recommended)

Free, fast global CDN, automatic HTTPS, preview deployments for every branch, and custom domains.

1. Sign in at <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the repository.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `22`
4. **Save and Deploy.** The site is live at `https://<project>.pages.dev`.
5. **Custom domain:** project → **Custom domains** → **Set up a custom domain**, then follow the DNS prompts.
6. Make sure `site.url` matches the final domain, commit, and push — every push to `main` redeploys.

Cloudflare Pages serves `404.html` automatically for unknown paths, and `/about/` maps to `about/index.html`.

## 2b. GitHub Pages

### User site or custom domain (served from the domain root)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        # For a project site at https://<user>.github.io/<repo>/ uncomment:
        # env:
        #   BASE_PATH: /<repo>/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow builds and publishes.
4. Custom domain: **Settings → Pages → Custom domain**, and add the DNS records GitHub shows. Enable **Enforce HTTPS**.

### Project site (`https://<user>.github.io/<repo>/`)

Uncomment the `BASE_PATH` lines in the workflow. Set `site.url` to `https://<user>.github.io` (without the repo path — the base path is appended automatically).

## After deploying

- Open a few pages and check the browser console is clean.
- Validate social cards with the LinkedIn Post Inspector (<https://www.linkedin.com/post-inspector/>).
- Submit `https://<your-domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Run Lighthouse (Chrome DevTools → Lighthouse) on the home page and an article.

## Optional: contact form service

To receive messages without opening the visitor's email app, create a form at a service such as Formspree, copy its endpoint URL (e.g. `https://formspree.io/f/abcdwxyz`) into `site.contactForm.endpoint`, and redeploy. The endpoint is public by design — never put secret API keys in the site.

## Local production check

```bash
npm run build
npm run preview   # http://localhost:4173
```
