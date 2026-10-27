# Homepage usability audit — 18 issues

Scope: the supplied audit for `/`. Existing content structure, links, brand colors and progressive motion are retained. Changes are in shared styles/components so the same controls remain consistent on demo/project pages. No dependency or backend integration was added.

## 1. Many button styles

Cause: independent styles for hero CTAs, the header CTA, scenario buttons, industry buttons and playback actions.

Fix: use `.story-button` / `.story-button-secondary` for actions and `.choice-control` / `.is-active` for selections. Circular menu/close/chat actions retain their icon-button role. Header and services CTAs now use the same secondary action style; playback and scenario controls reuse these classes. Active selections use `aria-pressed`; ordinary links stay anchors. Counts of styles from different audit tools can vary because they may count states separately.

## 2. Workflow studio label at 9px

Cause: `.scene-topline` declared `font-size: 9px`, with an 8px mobile override.

Fix: use `font-size: var(--type-caption)` (`0.75rem`, 12px at the default root size) at every breakpoint. Let the header wrap rather than shrinking the text.

## 3. Industry example caption at 9px

Cause: `.scene-caption` used the same tiny size everywhere.

Fix: `.scene-caption { font-size: var(--type-caption); line-height: 1.6; }`. Remove its 8px mobile override and uppercase transform.

## 4. Project diagram path at 8px

Cause: `.project-path` hardcoded 8px and tight, unwrapped positioning.

Fix: use the shared 12px caption size, sentence-case labels, flexible wrapping, and inset positioning. Keep this duplicate illustrative diagram text `aria-hidden`, since the linked card already has its readable title/description.

## 5. Small, hidden playback controls

Cause: 36px buttons were nested inside the horizontally scrolling diagram, below the nodes.

Fix: move one `role="group" aria-label="Simulation playback controls"` toolbar above the canvas. Play/Pause uses the primary action; Replay and Speed use secondary actions. Each button is at least 48px high, with 14px labels, visible text, native button semantics and existing accessible names. The toolbar is outside the scrolling region. Node/canvas dimensions also accommodate the enlarged labels.

## 6. Inconsistent type scale

Cause: custom 8/9/10/11/13px text mixed with Tailwind sizes and fluid headings.

Fix: map metadata/captions to 12px, actions to 14px, and retain the existing 16/18/24/30px content levels and two fluid heading levels. Remove the 27px wordmark exception and tiny inline utility classes from homepage components and shared workflow UI. Readable sizes are measured in the browser rather than inferred only from class names.

## 7. Inconsistent corner radii

Cause: custom 7/8/10/12/14/16/18/24/32px values plus circles and different Tailwind defaults.

Fix: use `--radius-control: 12px`, `--radius-card: 24px`, and `--radius-pill: 999px`; map Tailwind `card`, `input`, and `pill` to those tokens. Normalize custom scene/project corners and workflow icon corners. Keep the small focus-outline radius and standard circular utilities where appropriate. No universal `*` radius override is used.

## 8. Hero eyebrow at 10px

Cause: `.eyebrow` specified 10px for all story section labels.

Fix: use the shared 12px caption size, reduce tracking to `.06em`, and preserve the actual sentence-case copy.

## 9. Long all-caps customer-inquiry label

Cause: uppercase source text plus `.scene-caption { text-transform: uppercase; }`.

Fix: source copy is `New customer inquiry`; remove the uppercase transform. Apply the same treatment to `Your automation engine`.

## 10. Scene result description at 11px

Cause: an inline `text-[11px]` class bypassed the shared scale.

Fix: replace with `text-xs` (12px), retaining its relaxed line height and muted text color.

## 11. Scene footer at 10px

Cause: `.scene-bottomline` overrode the already small header/footer declaration.

Fix: both header/footer use the 12px caption token and wrapping with a readable line height.

## 12. Uppercase story section heading

Cause: `.eyebrow` forced uppercase even though source copy was sentence case.

Fix: remove `text-transform: uppercase`. `01 / A better way to work` now displays as written. Section numbering and gold hierarchy remain.

## 13. Execution status at 11px

Cause: the log footer inherited `text-[11px]`; its simulation label was 10px.

Fix: both use `text-xs`. Make the footer wrap with gaps, and expose the concise changing status with `role="status"`. Individual log lines also use at least 12px; the live region does not announce the entire log repeatedly.

## 14. Long uppercase footer headings

Cause: `uppercase tracking-widest` on every footer section title.

Fix: use `text-sm font-semibold text-[var(--text)]` and remove uppercase/wide tracking. The existing `Store & Solutions` label remains unchanged in source and now displays normally.

## 15. Chapter navigation looks decorative

Cause: chapter anchors had no visible text and rendered as thin progress tracks.

Fix: replace the tracks with visible `01 The friction`, `02 The connection`, and `03 The possibility` links in a three-column navigation directly beneath the scene. Each link has at least a 44px target. Keep `href` anchors and `aria-current="step"`; do not add tab roles without tab keyboard behavior.

## 16. Chapter links use an isolated visual language

Cause: `.chapter-track` was a separate control design unrelated to other selections.

Fix: chapter links reuse `.choice-control` and the same active/hover/focus treatment as industry/scenario selections. Remove the obsolete thin-track CSS.

## 17. Unbalanced industry filter wrap

Cause: `flex flex-wrap` distributed unequal-length labels across rows unpredictably.

Fix: `.industry-options` uses `repeat(2, minmax(0, 1fr))` columns on mobile and four columns from 768px. Buttons fill their cells and wrap text. With eight industries this produces balanced rows. Keep the group label and `aria-pressed`, and add `aria-controls="industry-example"`.

## 18. Understated all-services link

Cause: a plain text link was right-aligned beneath a much larger card grid.

Fix: center a `.story-button.story-button-secondary` anchor immediately below the grid, followed by the supporting paragraph. The destination stays `/services`, with no unnecessary JavaScript.

## Validation

Verified 2026-10-26: lint and the isolated production build passed. Chromium measured **8 text sizes** (12, 14, 16, 18, 24, 30px plus two fluid headings at this viewport) and **5 radius values** (including square/circular utility elements) at 1440px. No text was below 12px in the measured homepage text. All 18 browser regression checks passed, including the new playback tests, balanced industry columns, five homepage widths, 13 representative inner pages, no-JavaScript/reduced-motion fallbacks and all 53 sitemap URLs. No browser JavaScript errors were captured. Desktop/mobile screenshots were visually reviewed.

Run `npm run lint`, the production build, and `scripts/verify-frontend.mjs`. The browser checks assert minimum 12px text, no more than 10 distinct computed text sizes and 6 distinct radii on the rendered desktop homepage (excluding SVG internals and the offscreen skip link), labeled chapter targets, large playback controls before the diagram, functional controls, balanced industry columns and responsive regressions. These measurements are not a claim that the original third-party audit scanner was rerun.

If a development server is already using `.next`, isolate QA in PowerShell:

```powershell
$env:INSPARC_BUILD_DIR = '.next-usability'
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

In another terminal: `node scripts/verify-frontend.mjs http://127.0.0.1:3100`. The optional build directory is ignored by Git and ESLint. Clear the environment override with `Remove-Item Env:INSPARC_BUILD_DIR` before returning to the normal `.next` workflow in that terminal.
