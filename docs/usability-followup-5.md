# Homepage usability follow-up — 5 issues

This follow-up keeps the supplied audit numbering. It supersedes the earlier outlined header conversion button and pill-style all-services link. Backend and page destinations are unchanged.

## 1. Large gap after the scroll prompt

**Root cause:** cumulative hero bottom padding, integration-strip spacing, story top padding and a vertically centered first chapter with `min-height: 68svh`. Those independent choices push the first story text far below the cue, especially on a tall desktop viewport.

**Minimal fix:** reduce the hero bottom padding to `pb-8 lg:pb-12`, use `py-6` on the integration strip, and change the story intro to `pt-10 lg:pt-12` with `mb-6`. Only the first chapter loses the viewport-height centering:

```css
.story-chapter:first-child { padding-top: 16px; }
@media (min-width: 1024px) {
  .story-chapter:first-child { min-height: auto; align-items: flex-start; }
}
```

Later chapters retain their scroll-story pacing. The cue remains a real `href="#the-story"` anchor. Browser checks measure the actual transition at five widths, including the distance to the integration copy and first story heading.

## 2. Header conversion button differs from primary CTAs

**Root cause:** the `/contact` header anchor used `story-button-secondary`, which deliberately removes the gold fill.

**Minimal fix:** remove only that modifier:

```tsx
<Link href="/contact" className="story-button nav-contact">Let’s talk …</Link>
```

The header, hero and final consultation buttons now share the gold primary style, dark text, hover treatment and visible keyboard focus. Secondary discovery actions retain their own hierarchy.

## 3. Cramped scenario/industry controls

**Root cause:** scenario selectors used Tailwind `gap-2` (8px), while the industry grid and playback actions used 12px gaps.

**Minimal fix:** use `gap-5` on the scenario group and `gap: 20px` for `.industry-options` and `.playback-actions`. Keep the existing wrapped layout, balanced two/four-column industry grid, minimum control height, accessible group names and `aria-pressed` state. The extra spacing does not replace the existing touch-target sizing.

## 4. Disconnected template-library link

**Root cause:** the marketplace intro used a wide, two-column `section-intro` layout; the library link lived in its right column, far from the heading.

**Minimal fix:** use one left-aligned `.marketplace-intro` group containing the eyebrow, heading, explanatory paragraph and `/products` anchor, in that order. Apply `max-w-3xl` to the group and `max-w-2xl` to the paragraph. The link sits directly below the explanation with `mt-4`; no positioning script or ARIA workaround is needed.

## 5. Inconsistent Explore actions

**Root cause:** the all-services action was promoted to a pill button in the previous audit pass, while other Explore actions remained text links.

**Minimal fix:** reuse `.explore-link` for all five homepage Explore anchors: services, savings calculator, industry, template library and project previews.

```css
.explore-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding-block: 8px;
  font-size: var(--type-small);
  line-height: 1.5;
  font-weight: 500;
  color: var(--gold);
  text-decoration: underline;
  text-decoration-color: rgb(201 162 75 / 40%);
  text-underline-offset: 5px;
}
.explore-link:hover, .explore-link:focus-visible {
  color: var(--gold-soft);
  text-decoration-color: currentColor;
}
```

The all-services link stays centered immediately below the grid for discoverability, but uses the same text-and-arrow style as the other exploration links. Conversion CTAs continue to use filled gold buttons. All links retain real destinations and the global focus outline.

## Verification

Verified locally on 2026-10-26: lint and isolated production build passed; all 19 Chromium regression checks passed, with no captured JavaScript errors. At 1440px, the next integration copy begins approximately 71px after the scroll cue and the first story heading approximately 335px after it. Both scenario and industry gaps measure 20px. Header/hero CTA colors match, the library CTA aligns with its heading, and all five homepage Explore links use the shared text-link style. The transition bounds also pass at 360/390/768/1024px. Desktop/mobile screenshots were visually reviewed.

`scripts/verify-frontend.mjs` now checks primary CTA color equality, at least 20px scenario/industry spacing, left-aligned marketplace heading/link geometry, consistent Explore classes, and bounded hero-to-content distances at 360, 390, 768, 1024 and 1440px. It also retains the existing interaction, keyboard, no-JS, reduced-motion, typography and SEO regressions. This is local Chromium validation, not a rerun of the original third-party audit scanner.
