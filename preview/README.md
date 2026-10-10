# BioGlass Studio Cloudflare ZH3 preview

Live: https://bioglass-nima-preview.zh13.workers.dev/

This is a **standalone static mirror**, not a compiled Next.js production build.
It mirrors the BioGlass site's RTL layout, archive and detail-page routes, and
carries the interactive hero sculpture with native Three.js loaded dynamically
from a public CDN. CSS is adapted from `src/app/globals.css`.

Deployed on ZH3 Cloudflare account 165b50f0f7f8844ee71a744b3a286504.
Worker: `bioglass-nima-preview`. Workers.dev routing enabled.

To redeploy, upload `preview/worker.mjs` to the Worker as an ES module
with `main_module=worker.mjs`, using a current compatibility date.

All content and illustration placeholders are demo material. The hero is
an artistic model, not validated clinical anatomy. Noindex is intentional.

Fallbacks: when WebGL is missing, reduced-motion or Save-Data is active,
or the CDN is inaccessible, the CSS static visual remains.

For production, compile the original Next.js app using a supported Cloudflare
Workers adapter or static export and upload its full static assets.


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
