/**
 * Generates optimized images: profile photo (WebP + JPEG), favicons and the default
 * social-sharing image. Run with `npm run assets` after replacing assets-src/profile-source.jpg.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const out = (p) => new URL(`public/${p}`, root);
const src = fileURLToPath(new URL('assets-src/profile-source.jpg', root));
const fsPath = (u) => fileURLToPath(u);

await mkdir(out('images'), { recursive: true });
await mkdir(out('favicon'), { recursive: true });

// Profile photo: keep native size (source is ~354×472), strip metadata.
const meta = await sharp(src).metadata();
console.log(`profile source: ${meta.width}×${meta.height}`);
await sharp(src).rotate().webp({ quality: 82 }).toFile(fsPath(out('images/profile.webp')));
await sharp(src).rotate().jpeg({ quality: 84, mozjpeg: true }).toFile(fsPath(out('images/profile.jpg')));


// Favicon (monogram)
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0B1120"/>
  <rect x="10" y="50" width="44" height="3" rx="1.5" fill="#3B82F6"/>
  <text x="32" y="41.5" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="27" font-weight="700" fill="#FFFFFF" letter-spacing="-1">JB</text>
</svg>`;
await writeFile(fsPath(out('favicon/favicon.svg')), favicon);
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile(fsPath(out('favicon/favicon-32.png')));
await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile(fsPath(out('favicon/apple-touch-icon.png')));
await sharp(Buffer.from(favicon)).resize(192, 192).png().toFile(fsPath(out('favicon/icon-192.png')));
await sharp(Buffer.from(favicon)).resize(512, 512).png().toFile(fsPath(out('favicon/icon-512.png')));
await writeFile(
  fsPath(out('favicon/site.webmanifest')),
  JSON.stringify(
    {
      name: 'Jain Bai B — Senior Solution Architect',
      short_name: 'Jain Bai B',
      icons: [
        { src: '/favicon/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/favicon/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#0B1120',
      background_color: '#FFFFFF',
      display: 'browser',
    },
    null,
    2,
  ),
);

// Social sharing image 1200×630
const photo = await sharp(src).resize(300, 400, { fit: 'cover', position: 'top' }).png().toBuffer();
const photoB64 = photo.toString('base64');
// Social card in the default "Executive Technology" style: navy, white, blue.
const og = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="85%" cy="0%" r="65%"><stop offset="0" stop-color="#2563EB" stop-opacity="0.4"/><stop offset="1" stop-color="#2563EB" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0%" cy="100%" r="50%"><stop offset="0" stop-color="#7C3AED" stop-opacity="0.18"/><stop offset="1" stop-color="#7C3AED" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#FFFFFF" stroke-opacity="0.05"/></pattern>
    <clipPath id="clip"><rect x="830" y="115" width="300" height="400" rx="16"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="#0B1120"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <g fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.22">
    <path d="M640 120a40 40 0 0 1 78-12 30 30 0 1 1 6 60h-80a26 26 0 0 1-4-48Z"/>
    <rect x="690" y="420" width="62" height="62" rx="8"/><rect x="706" y="436" width="30" height="30" rx="3"/>
    <path d="M682 436h-10M682 466h-10M760 436h10M760 466h10M706 412v-10M736 412v-10M706 490v10M736 490v10"/>
    <circle cx="610" cy="300" r="7"/><circle cx="660" cy="262" r="7"/><circle cx="660" cy="338" r="7"/><circle cx="716" cy="300" r="7"/>
    <path d="M616 296l38-30M616 304l38 30M666 262l44 34M666 338l44-34M660 269v62"/>
    <path d="M680 170 L660 255 M716 307 L721 412" stroke-dasharray="6 8"/>
  </g>
  <g font-family="Inter, Segoe UI, Arial, sans-serif">
    <text x="80" y="150" fill="#93C5FD" font-size="21" font-weight="600" letter-spacing="3">SENIOR SOLUTION ARCHITECT</text>
    <text x="80" y="235" fill="#FFFFFF" font-size="60" font-weight="700" letter-spacing="-1.5">Designing Secure,</text>
    <text x="80" y="308" fill="#FFFFFF" font-size="60" font-weight="700" letter-spacing="-1.5">Scalable Enterprise</text>
    <text x="80" y="381" fill="#93C5FD" font-size="60" font-weight="700" letter-spacing="-1.5">Systems.</text>
    <rect x="80" y="430" width="56" height="3" fill="#3B82F6"/>
    <text x="80" y="478" fill="#FFFFFF" font-size="26" font-weight="600">Jain Bai B</text>
    <text x="80" y="516" fill="#A3B1C6" font-size="21">Cloud &amp; Enterprise Architecture · AWS · Google Cloud · GenAI</text>
  </g>
  <rect x="826" y="111" width="308" height="408" rx="19" fill="#131D33" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="2"/>
  <image x="830" y="115" width="300" height="400" clip-path="url(#clip)" xlink:href="data:image/png;base64,${photoB64}" href="data:image/png;base64,${photoB64}"/>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(fsPath(out('images/og-default.png')));

console.log('assets generated');
