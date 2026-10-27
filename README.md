# Insparc Technologies

Current design: an editorial paper/sketchbook experience based on the owner's exact ThreeUI source, with locally hosted fonts, an interactive workflow book, and the existing Workflow Theater rethemed to match. See [the redesign and source provenance notes](docs/sketchbook-redesign.md).

The dedicated automation audit is at `/audit`. Prices are removed from the public interface; `/pricing` redirects to `/audit`.

AI automation agency website and workflow-template catalog built with Next.js App Router, React, TypeScript, Tailwind CSS, Motion, and Lenis.

## Local development

Run commands from this directory (the inner `Insparc` folder):

```powershell
npm ci
npm run dev
```

Open the local URL printed by Next.js. Use the existing installed dependencies when available; `npm ci` is for a fresh checkout.

## Validation

```powershell
npm run lint
npm run build
npm run start
```

With the production server running, use `node scripts/verify-frontend.mjs http://127.0.0.1:3000` for local Chromium browser checks. Outputs are saved to ignored `artifacts/frontend/`.

## Content and configuration

- Contact details, navigation, canonical origin: `src/config/site.ts`
- Services, products, industries, projects, articles: `src/data/`
- Scroll narrative and homepage presentation: `src/components/story/`
- Project screenshots: `public/projects/<slug>/`
- Sitemap and robots: `src/app/sitemap.ts`, `src/app/robots.ts`

## Status and next steps

This phase prioritizes the frontend. Consultation briefs are prepared in the browser and sent by the visitor through WhatsApp/email. Template dialogs handle inquiries; online sales are not enabled by the current frontend. Existing API/payment prototypes must be completed or disabled before public exposure.

- [Frontend experience and review checklist](docs/frontend-review.md)
- [Google indexing and launch instructions](docs/seo-launch-guide.md)
- [Backend stack and implementation plan](docs/backend-plan.md)
- [Product requirements](docs/prd.md)

No new npm packages are required by the storytelling redesign. No hosting account, Search Console property, live payment account, or external messaging service was changed.
