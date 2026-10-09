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
