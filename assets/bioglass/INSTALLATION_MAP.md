# BioGlass Asset Installation Map

Source of the 20 originally generated images: the user's two ChatGPT-produced batches. Both master-PNG and WebP ZIP packages were saved to the user's Dropbox root; only optimized WebP versions are intentionally committed to GitHub to keep the public site light.

## Generated design illustrations
| Code | File in `public/assets/bioglass/` | How the website uses it |
|---|---|---|
| G01 | G01_hero-desktop.webp | Desktop hero artwork; replaces decorative WebGL scene |
| G02 | G02_hero-mobile.webp | Mobile hero via responsive picture source |
| G03 | G03_hero-loop-keyframe.webp | Static cinematic material interlude; not mislabeled as video |
| G04 | G04_research-enamel.webp | Research card for enamel |
| G05 | G05_research-histology.webp | Research card for histology |
| G06 | G06_research-biomaterials.webp | Editorial cover for research collection |
| G07 | G07_presentation-paper.webp | Presentation card 1 |
| G08 | G08_presentation-light.webp | Presentation card 2 and collection banner |
| G09 | G09_project-materials.webp | Project card 1 |
| G10 | G10_project-lab.webp | Project card 2 and collection banner |
| G11 | G11_gallery-specimen.webp | Gallery card 1 and collection banner |
| G12 | G12_gallery-detail.webp | Gallery card 2 |
| G13 | G13_about-concept.webp | Synthetic person concept **explicitly labeled**; not owner portrait |
| G14 | G14_monogram-dark.webp | Brand insignia on dark footer |
| G15 | G15_monogram-light.webp | Brand insignia in header |
| G16 | G16_footer-lightscape.webp | Footer atmospheric background |
| G17 | G17_opengraph-main.webp | Default social sharing preview |
| G18 | G18_opengraph-research.webp | Research sharing preview |
| G19 | G19_not-found.webp | 404 page illustration |
| G20 | G20_loading-mark.webp | Route loading state visual |

Every generated design image is conceptual illustration, not a photographed clinical result.

## Seven external scientific reference plates
Published under `public/assets/bioglass/science/S01.webp` through `S06.webp` and `S07.svg`. Their master source files are in `assets/bioglass/02_sourced_real/originals/`. File-by-file creators, licenses, source links, hash values and transformations appear in `public/assets/bioglass/science/CREDITS.json` and `assets/bioglass/02_sourced_real/LICENSES_AND_CREDITS.md`.

The scientific reference library is visibly separated from personal research templates; external figures are credited and cannot be misrepresented as original student experiments.

## Publishing and reversibility
- Work is isolated on the draft PR branch; `main` was not updated.
- The Cloudflare ZH3 preview is independently deployed via `preview/worker.mjs`; its image routes proxy immutable, public GitHub media blobs.
- Temporary Dropbox intake Worker code was replaced by a clean deploy. One-time GitHub intake workflow and marker were deleted.
- Dropbox originals are preserved: `/BioGlass_G01-G20_PNG_Master.zip` and `/BioGlass_G01-G20_WebP_WebReady.zip`.
- For rollback, revert commits on the draft branch or redeploy the previous Worker version. Dropbox upload copies can be removed only after separate user confirmation.
