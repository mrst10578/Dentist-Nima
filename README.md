
# BioGlass Studio

Asset-first dental student research and presentation portfolio, built inside the existing Next.js starter-web foundation.

## Status
**Phase 1: structural preview.** Public pages and routes are ready, but the entries are explicitly demo layouts. No real papers, patient photographs, presentation PDFs or generated final assets are bundled.

## Architecture
- Next.js 16 App Router, React 19, strict TypeScript and Tailwind CSS 4.
- Server-rendered RTL/Farsi layout and responsive BioGlass design tokens.
- Routes: /, /research, /projects, /presentations, /gallery, /about and detail pages under each collection.
- Asset-first placeholders powered by src/lib/portfolio.ts and src/components/asset-frame.tsx.
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
Follow docs/ASSET-PRODUCTION.md. Create an optimized real image, place it in public/assets/ and explicitly enable its path in activeAssets. Until enabled, the slot stays an accessible designed placeholder instead of generating a missing-image request.

## Privacy and publication
Do not publish identifying clinical photos, patient records, fabricated achievements, or unlicensed figures. Site currently uses robots noindex while content and owner identity remain incomplete. Set a real NEXT_PUBLIC_SITE_URL and revisit robots/sitemap at launch.

## Toolkit
This project originally came from mrst10578/starter-web and retains its verification scripts and lightweight foundation. Optional feature packs should be added only for actual requirements.


## Edition 04: cinematic academic design (2026-10-10)

The site has been reworked as a premium, editorial **student research archive**:
- Dark specimen-style opening chapter with responsive giant Persian typography and a restrained decorative WebGL hero.
- Asymmetric gallery of sample publication layouts and individual typographic archive rows.
- Four clear destinations: research, presentations, university projects, and scientific visual archive.
- Distinct colour/texture treatment for reserved publication-cover slots; a closing personal research statement.
- New visual layer: `src/app/edition-v4.css`, responsive and reduced-motion-aware.
- Standalone ZH3 preview mirror updated at https://bioglass-nima-preview.zh13.workers.dev/ and verified in a real browser (HTTP 200, 3D canvas, four archives).

No fabricated works, no diagnosis tools, no data dashboard. Published-content areas remain explicitly marked as design samples. This is a preview, not the final academic website. Preview is independently maintained in `preview/worker.mjs` and is not the Next.js production build.

Implementation CI: https://github.com/mrst10578/Dentist-Nima/actions/runs/38009046382 (install, lint, TypeScript, unit, production build, Playwright: success).
