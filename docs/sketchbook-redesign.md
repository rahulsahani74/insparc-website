# Insparc Technologies — sketchbook redesign

## Direction and scope

The owner's supplied ThreeUI sketchbook reference supersedes the previous navy/gold homepage. The current site uses warm paper, brown ink, locally hosted Instrument Serif headings and Newsreader body text. Body copy is 20px, supporting copy is generally 16–18px, and controls have visible labels and keyboard focus.

The full public brand name is **Insparc Technologies**, including metadata, navigation, footer, legal copy and share imagery. The Workflow Theater from the owner's screenshot remains interactive, with a light paper palette, larger nodes/labels and a keyboard-focusable horizontal canvas.

## Exact source integration

The supplied registered source bundle was downloaded from `https://threeui.com/source-code/meng-to-sketchbook-landing-page.json`. Its canonical HTML revision is:

`e0330548b1ac905cf1b81698163ffa29f8a3a8c39b8d39f9b71ba5b9255b6dd1`

All supplied source hashes and all 17 required binary asset sizes/hashes were checked. The live ThreeUI HTML delivery rewrites image URLs; reversing only those delivery rewrites recovered the exact registered canonical bytes, verified against the supplied SHA-256. The original canonical is retained as `public/landing-pages/meng-to-sketchbook.html`; the complete source bundle, verification manifest and MIT/font/asset licenses are retained in `vendor/threeui/`.

The published npm 1.2.0 package contains an older version of this particular component without the requested typography props. It was used to obtain and verify its binary assets, then removed along with its two unused legacy Three.js runtimes. The application instead transpiles the exact registered component, frame, typography controller and recipes into `src/vendor/threeui/`. TypeScript aliases preserve the requested `@designcodeio/threeui` and stylesheet imports. There are no new runtime npm dependencies.

The configured component is rendered with the requested Instrument Serif / Newsreader, 400/400 weights, `#2b2721`, heading size 30, body size 20 and heading tracking 0.010. `WorkflowSketchbook.tsx` uses the source's supported `applyScene` hook to load a separate Insparc content derivative. Its authored page-strip geometry, curl lighting, pointer interactions, index logic, magnifier and zoom engine are reused, not reconstructed from a screenshot or embedded from the documentation site.

The derivative hides the unrelated personal-portfolio chrome, replaces the nine Singapore plates/captions with workflow studies, crops the source scene for the destination page, increases control sizes, and moves the resting magnifier to fit that crop. A readability stylesheet is applied after the source typography controls so captions remain 18px and hints/zoom readouts 16px. Original HTML and original assets stay unchanged.

The shared stylesheet references an additional Fragment Mono font not included in its required-asset manifest. Its upstream Google Fonts TrueType file is included locally under the supplied font license; only that runtime stylesheet URL/format is adapted. The archived stylesheet remains byte-exact.

Local same-origin embedding is allowed only for `/landing-pages/*` with `X-Frame-Options: SAMEORIGIN` and CSP `frame-ancestors 'self'`. Those documents carry `noindex`; the default anti-framing policy remains on application routes.

## Project imagery

All four named project entries have a relevant standalone workflow illustration: WhatsApp AI Chatbot, Automated Email Sender, Lead Capture + AI Follow-up, and RAG Knowledge Bot. The unfilled `[YOUR_PROJECT_TITLE]` slot was removed rather than inventing a project. Each detail page uses the same relevant artwork and descriptive alternative text.

These are **illustrative architecture studies**, not fabricated client screenshots or proof of deployments. The sketchbook contains nine related workflow plates based on the existing services/products. Editable SVG sources are kept alongside PNG book exports. Rasterizing the book plates avoids repeating complex vector filters across the source's animated strip surfaces.

To regenerate/verify: `node scripts/prepare-sketchbook.mjs`. It uses the retained bundle/canonical/assets when the original download artifacts or npm package are absent. It needs the project's existing `typescript` and Next.js-provided `sharp` tooling. Google Fonts/ThreeUI assets are not fetched by the production page.

## Prices, audit and navigation

- Visible product prices, currency amounts, provider cost estimates and price-based sorting are removed.
- `/pricing` permanently redirects to `/audit`; the sitemap replaces the retired pricing route with audit.
- `/roi-calculator` now estimates time only, using explicit user assumptions and no currency fields.
- Existing server-side payment prototypes/catalog values remain backend-phase work; they are not displayed as current public offers.
- `/audit` provides a dedicated, accessible business-process questionnaire and a deterministic starting-point brief. It does not call an LLM, inspect live systems, save a lead or claim a booking. The visitor explicitly chooses whether to share the brief through WhatsApp.
- Public template controls offer an inquiry flow; outdated purchase-lookup links were removed from the main visitor navigation.

## Verification

Final local validation on 2026-10-26: lint and isolated production build passed (72 generated static pages); all 12 current Chromium checks passed. All nine book plate URLs loaded, all four named project images loaded, the actual page caption changed after a turn, and magnifier dragging/zoom/Workflow Theater/audit sharing worked. Homepage checks covered 360/390/768/1024/1440px; 17 important pages were checked at mobile and desktop widths with no document overflow, one primary heading and no visible currency prices. All 53 sitemap URLs returned HTTP 200. Desktop, mobile, source scene, Workflow Theater, project and audit screenshots were visually reviewed. No browser JavaScript errors were captured during these flows.

Use `npm run lint`, then an isolated production build with `INSPARC_BUILD_DIR=.next-usability`, and run `node scripts/verify-frontend.mjs http://127.0.0.1:3100` against the corresponding local server.

The current browser suite is `scripts/sketchbook-checks.mjs`; the old story-specific suite is retained as `verify-story-legacy.mjs` for historical context. Checks include source scene initialization, all nine artwork URLs, actual page-turn change, zoom, magnifier toggle/drag, Workflow Theater playback, all four project images, audit brief/share/focus, pricing redirect, five responsive widths, 17 key pages at mobile/desktop sizes, no visible currency prices, current brand text, sitemap routes, reduced motion and server content without JavaScript.

Cross-browser/device review, deployed Lighthouse/Core Web Vitals, real company/contact/legal verification and the backend launch gates still apply. A dependency audit during package cleanup reported two remaining findings (one moderate and one high); no force-upgrade or unrelated dependency migration was performed in this design task.
