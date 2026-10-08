
# BioGlass Studio: Asset-first production map

## Current phase
This branch intentionally contains no generated final art, photographs, anatomical models, real publications or patient images.
Every visual slot has an explicit key in src/lib/portfolio.ts and an accessible placeholder in src/components/asset-frame.tsx.

## Replacement protocol
1. Approve an individual asset prompt and its rights/clinical accuracy.
2. Generate/export the appropriate optimized WebP, ideally with 2x resolution where useful.
3. Place the finished file in public/assets/ using the exact manifest filename below.
4. Add the matching path, e.g. "/assets/hero-molar.webp", to activeAssets in src/lib/portfolio.ts.
5. Verify layout on desktop/mobile, image sharpness, load performance, alt text and copyright/consent requirements.
6. Only then remove the related placeholder. Do not point to nonexistent images.

## Slots and intended future prompts

| Key | Filename | Aspect | Suggested master size | Purpose |
| --- | --- | --- | --- | --- |
| hero-molar | hero-molar.webp | 4:5 | 1200x1500 | Hero: premium scientifically accurate 3D molar, translucent blue enamel, elegant cyan lighting, soft laboratory backdrop |
| research-enamel | research-enamel.webp | 4:3 | 1200x900 | Dental enamel macro texture / cross-section, scientific not stock |
| research-microscopy | research-microscopy.webp | 4:3 | 1200x900 | Non-identifiable histology microscopy styled editorial cover |
| project-anatomy | project-anatomy.webp | 4:3 | 1200x900 | Tooth anatomy layered render with dentin/enamel/pulp accuracy |
| project-biomaterial | project-biomaterial.webp | 4:3 | 1200x900 | Dental biomaterial sample and laboratory instrument detail |
| presentation-pulp | presentation-pulp.webp | 4:3 | 1200x900 | Endodontic pulp chamber/canal scientific presentation visual |
| presentation-crown | presentation-crown.webp | 4:3 | 1200x900 | Crown anatomy educational graphic with precise surfaces |
| gallery-laboratory | gallery-laboratory.webp | 4:3 | 1200x900 | Editorial laboratory photo, no identifiable patients |
| gallery-model | gallery-model.webp | 4:3 | 1200x900 | Premium dental teaching models on a pale blue background |
| portrait | portrait.webp | 4:5 | 1000x1250 | Real, owner-approved portrait only; do not fabricate identity |

## Art direction
- Style: BioGlass Studio; milky glass, porcelain white, ice-blue, cyan and slate blue.
- Mood: calm scientific curiosity, premium academic editorial, not generic clip-art.
- Material: controlled glass refraction, translucent enamel, macro photography, subtle reflections, shallow depth of field only when scientifically appropriate.
- Use real dental references for anatomical accuracy. Image generation must not invent procedures or imply real clinical outcomes.
- Do not bake article titles, interface labels, logos, watermarks or other text into assets. UI text belongs in semantic HTML.
- Keep important subject away from image edges; cards use cover cropping, hero uses 4:5.
- Limit image weight and motion; prefer static WebP with layered CSS atmosphere.
- For clinical examples, remove all patient-identifying information and obtain permissions prior to publication.

## Data workflow
Current records in src/lib/portfolio.ts are explicitly marked demonstration layouts. They are NOT real publications, projects, presentations or clinical records.
Once real items arrive, replace them with verified title, author, date, abstract, bibliography, file path, rights statement, and relevant asset key.
No auth, CMS, upload service, database or cloud object storage has been added in this skeleton phase.

## Next asset production batches
1. Hero anatomical centerpiece.
2. Research/project cover set.
3. Presentation/gallery cover set.
4. Owner-provided portrait and optional ambient supporting assets.


## Three.js sculpture integration (Phase 2)
The hero slot is no longer waiting for a flat image on compatible browsers. A locally
generated Three.js molar sculpture now renders with four stylized cusps, three roots,
pale porcelain/enamel material, rim lights, translucent highlights and restrained
orbital particles. **It is an artistic sculpture, not an anatomically validated medical model.**
Do not use it to teach diagnosis or procedures.

Sources:
- src/components/three/tooth-geometry.ts: isolated procedural geometry
- src/components/three/scene.ts: lighting, materials, interaction, animation and resource disposal
- src/components/three/hero-canvas.tsx: client-only activation, WebGL capability checks and fallback

No licensed anatomical imagery or clinical material is bundled. The previous
hero-molar.webp manifest key stays available as the static fallback and future
reviewed poster. When replacing the sculpture with a vetted GLB, preserve the
same WebGL gate, visibility pause, pixel ratio budget and reduced-motion fallback.

Performance/reliability contract:
- Load the 3D module only once the hero approaches the viewport.
- Cap device pixel ratio, pause RAF rendering offscreen and release GPU resources.
- Don't intercept touch scrolling; mouse drag and mouse parallax are decorative.
- In reduced-motion, Save-Data, failed WebGL or runtime error, show the existing
  accessible static placeholder instead of a blank frame.
- Keep the rest of the content HTML/CSS, not 3D.
