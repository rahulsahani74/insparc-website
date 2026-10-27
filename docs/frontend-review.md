# Frontend review guide

Current design: the ThreeUI paper/sketchbook redesign supersedes the earlier navy/gold scroll-chapter homepage described in the historical verification below. Review `/`, `/audit`, `/projects` and `/demo`, and read `sketchbook-redesign.md` for exact-source provenance, readability, price removal and the current browser suite. `npm run lint` and the isolated production build remain the validation commands; `verify-frontend.mjs` now runs the sketchbook suite.

## Run locally

From this directory: `npm run dev`, then open the printed local URL. For production verification, use `npm run build`, `npm run start`, and `node scripts/verify-frontend.mjs http://127.0.0.1:3000`.

The Chromium check uses a locally installed Chrome/Edge browser, with no added npm dependencies. On other systems, set `BROWSER_PATH` to a compatible executable. It writes screenshots and a report under ignored `artifacts/frontend/`. Browser profiles are created in the OS temp directory; the script stops only the browser it starts.

## Experience implemented

The homepage now tells one story: less busywork → an example manual handoff → a connected workflow → time for human work → services → an interactive simulation → industry applications → templates → architecture previews → delivery process → questions → consultation.

Desktop story chapters control a sticky illustration. Mobile chapters include their own illustration and follow normal page scrolling. Global offscreen headings and explicit content groups reveal on entry. The page progress line is decorative. There is no forced scroll snap or horizontal scroll capture. Reduced-motion preferences remove entrance animations and retain readable content. Content is visible in the server HTML and without JavaScript.

Navigation has active links, an accessible mobile toggle, Escape handling, focus containment/restoration, and inert background content while open. The announcement bar no longer overlaps a fixed header. A native dialog handles template inquiries. The contact form validates and prepares a brief for WhatsApp/email without reporting a fake backend confirmation. Three blog cards now lead to real article pages.

## Manual review before launch

- Read the homepage at 360px, tablet, and desktop widths. Check readable copy, pacing, and the sticky scene on short laptop screens.
- Use Tab, Shift+Tab, Enter, and Escape through navigation, FAQs, form fields, and template dialogs. Review with a screen reader.
- Try OS reduced motion and browser zoom at 200%. Check touch interaction on an actual mobile device.
- Review all inner-page content, prices, legal drafts, contact details, social links, and placeholder projects against real business information.
- Test on Safari/iOS, Firefox, Chrome, and Edge. Chromium automation alone does not certify all browsers.
- Run Lighthouse and PageSpeed Insights on the deployed production origin. Build success and local screenshots do not establish a 90+ Lighthouse score or real-world Core Web Vitals.
- Follow `seo-launch-guide.md` for production indexing, and `backend-plan.md` before accepting online payments.

## Verified locally — 2026-10-26

- `npm run lint`: passed.
- `npm run build`: passed with 72 generated static pages and no build warnings in the final run.
- `node scripts/verify-frontend.mjs http://127.0.0.1:3100`: passed, with no captured browser JavaScript errors.
- Homepage: one h1, correct canonical, parseable JSON-LD, three scroll-driven stages and sticky desktop layout.
- Layout: no document overflow at 360/390/768/1024/1440px on the homepage; 13 representative inner pages checked at 390/1280px with one main h1 each.
- Interactions: industry selection, FAQ, mobile menu/Escape/focus/background lock, service filters, form errors/prepared brief, and inquiry dialog.
- Accessibility fallbacks: reduced-motion content visibility and server-rendered story readability with JavaScript disabled.
- SEO: all 53 sitemap URLs returned HTTP 200; private/placeholder noindex and social image/favicon checks passed.
- Desktop home, story, mobile home, and mobile navigation screenshots were captured and visually reviewed.

These are local Chromium checks, not a complete accessibility audit, a Lighthouse score, or a confirmation that Google has indexed the site.

## Further improvements after real content is available

Add a real founder portrait and story, genuine workflow screenshots, an edited walkthrough video with a transcript, and measured case studies. Those will build more trust than unverified counters or review stars. If adding a booking calendar, analytics, or a live assistant, implement the relevant backend/privacy controls first and keep the frontend loading light.

## Digital marketing update - 2026-10-26

Review `/digital-marketing` for restaurant service scope, monthly quantities, approval responsibilities and separately scoped production. Public copy now describes services rather than implementation technology. The homepage hero, working process, nine chapter artworks and footer animation were updated to match. Lint/build and 14 Chromium checks passed; all 54 indexed pages returned 200 and passed the public implementation-name scan. Backend remains deferred.
