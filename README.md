
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
