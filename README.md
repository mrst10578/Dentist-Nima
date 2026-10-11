
# BioGlass Studio

Asset-first dental student research and presentation portfolio, built inside the existing Next.js starter-web foundation.

## Status
**Asset-integrated draft preview.** All 20 generated G01-G20 WebP assets are installed, together with seven credited, third-party scientific reference figures (S01-S07). Actual papers, publication claims, patient photographs and presentation PDFs are not supplied and must not be fabricated.

## Architecture
- Next.js 16 App Router, React 19, strict TypeScript and Tailwind CSS 4.
- Server-rendered RTL/Farsi layout and responsive BioGlass design tokens.
- Routes: /, /research, /projects, /presentations, /gallery, /about and detail pages under each collection.
- Typed asset references in `src/lib/portfolio.ts`, rendered via `src/components/asset-frame.tsx`; mobile/desktop hero art, publication covers, About concept (not a real portrait), two OG images, loader and error art.
- External Commons scientific reference library under `public/assets/bioglass/science`, with source attribution and reuse-license links.
- Portfolio content registry is a small typed local data structure. No backend or CMS yet.
- No new dependencies have been introduced.

## Develop
1. npm ci
2. npm run dev
3. npm run verify
4. npm run test:e2e

## Creating new content
Add vetted records to entries in src/lib/portfolio.ts, using an existing collection, unique slug, and approved asset key. Remove the sample layouts when replacing them with real work.

## Asset rollout
Final WebP artworks were transferred from the user's Dropbox via a temporary Cloudflare handoff and are committed to `public/assets/bioglass/`. The original uncompressed PNG zip remains in Dropbox for archival use. See `assets/bioglass/INSTALLATION_MAP.md` for the exact usage and provenance of all G01-G20 and S01-S07 assets. The temporary transfer route and workflow have been removed. New asset production still follows `docs/ASSET-PRODUCTION.md`.

## Privacy and publication
Do not publish identifying clinical photos, patient records, fabricated achievements, or unlicensed figures. Site currently uses robots noindex while content and owner identity remain incomplete. Set a real NEXT_PUBLIC_SITE_URL and revisit robots/sitemap at launch.

## Toolkit
This project originally came from mrst10578/starter-web and retains its verification scripts and lightweight foundation. Optional feature packs should be added only for actual requirements.


## Current deployed draft (2026-10-11)
- Live preview: https://bioglass-nima-preview.zh13.workers.dev/
- GitHub work: draft PR #1 on `feature/bioglass-asset-first-skeleton`, not merged into main.
- All 20 generated images G01-G20 are in the repository (WebP); seven source images S01-S07 are present in a separate licensed-reference gallery, with credits and transformations explained.
- Distinguishes conceptual imagery from real research and uses a labeled synthetic portrait concept rather than implying someone's likeness.
- Next.js static site and Cloudflare ZH3 standalone Worker are separate but have equivalent artwork and source-gallery content.
- Live media + page smoke checks: https://github.com/mrst10578/Dentist-Nima/actions/runs/38100783139 (success).
- Use `npm run verify` and `npm run test:e2e` for release checks; avoid publishing real personal achievements until owner-approved.
