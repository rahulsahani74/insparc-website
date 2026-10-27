# Tasks

## Owner-directed sketchbook redesign — 2026-10-26

- [x] Exact ThreeUI source retrieved/read; canonical/source hashes and 17 binary assets verified and archived with licenses
- [x] Registered source component and requested props integrated through local module aliases; older unused npm package/runtimes removed
- [x] Paper/ink site-wide theme, local Instrument Serif/Newsreader fonts and larger readable copy
- [x] Full Insparc Technologies branding throughout public content, metadata, navigation and social image
- [x] Original page-curl/zoom/magnifier interactions with nine relevant workflow plates
- [x] Screenshot's Workflow Theater rethemed with larger nodes, readable status text and keyboard-scrollable canvas
- [x] Relevant illustrations for all four named projects; empty placeholder project slot removed
- [x] Public currency prices/price sorting removed; old pricing route redirects to dedicated audit page
- [x] Accessible audit brief questionnaire and time-only calculator; backend remains deferred
- [x] Updated sitemap, source provenance/design docs and current browser suite
- [x] Final lint/build pass; all 12 sketchbook browser checks pass, including 17 key pages and 53 sitemap URLs


## Homepage usability follow-up — 5 issues, 2026-10-26

- [x] Compact hero/integration/story transition; first chapter no longer starts with viewport-height centering
- [x] Gold primary header conversion CTA matching the hero/final consultation path
- [x] 20px gaps for scenario, industry and playback controls
- [x] Template-library CTA grouped below its left-aligned introductory copy
- [x] Shared accessible text-link style for all five homepage Explore actions
- [x] Numbered root causes/fixes in `usability-followup-5.md`
- [x] Lint, isolated production build and all 19 browser regression checks; desktop/mobile screenshots reviewed


## Homepage usability audit — 18 issues, 2026-10-26

- [x] Shared primary/secondary actions and selection controls; visible centered services CTA
- [x] Minimum 12px homepage labels, consistent type scale and sentence-case copy
- [x] Shared control/card/pill radius tokens and readable workflow node sizing
- [x] Labeled 44px chapter navigation; 48px playback toolbar above the scrollable canvas
- [x] Balanced 2/4-column industry options and accessible selected/control states
- [x] Numbered root causes and minimal fixes in `usability-audit-fixes.md`
- [x] Lint, isolated production build and extended Chromium regression checks
- [x] Measured desktop homepage: 8 font sizes, 5 radius values, minimum text 12px; all 18 browser checks passed


## Frontend storytelling refresh — 2026-10-26

- [x] Editorial homepage narrative, desktop scroll chapters and mobile inline illustrations
- [x] Progressive heading/card reveals, reading progress and reduced-motion behavior
- [x] Mobile navigation focus containment, Escape, active links and background scroll lock
- [x] Concise capabilities, industry examples, template library, architecture previews, delivery process and final CTA
- [x] Real blog detail routes; removed contact-link detour and unverified review stars
- [x] Honest frontend contact brief / template inquiry flows while backend is deferred
- [x] Sitemap coverage, canonical/title fixes, JSON-LD, social preview, favicon and private/placeholder noindex
- [x] Lint / TypeScript / production build and initial local Chromium responsive/interaction checks
- [x] SEO launch guide, backend implementation plan, frontend review guide and repeatable browser QA script
- [ ] Owner verifies real contact details, business claims/prices, legal drafts and project content
- [ ] Actual device + Safari/Firefox checks, full screen-reader audit and deployed Lighthouse / Core Web Vitals
- [ ] Production domain/HTTPS deployment, unfinished API launch gates and Search Console ownership/submission

Historical phase ticks below describe earlier work; the current refresh and review notes supersede claims of launch readiness. In particular, there is no analytics tracker/cookie-consent banner in the current implementation, and unfinished APIs are not a production backend.

Legend: [ ] todo, [x] done. Work top to bottom. After each phase: lint, build, test on desktop and mobile, commit, update memory.md, wait for review.

## Phase 0 - Setup
- [x] Create project, install dependencies listed in architecture.md
- [x] Create folder structure, `.env.example`, `.gitignore` (includes `.env*`)
- [x] Add `src/config/site.ts` with placeholders for contact info
- [x] Configure ESLint, Prettier, TypeScript strict, absolute imports
- Done when: `npm run dev` shows a blank styled page and `npm run build` passes.

## Phase 1 - Design system and layout
- [x] Tokens in `globals.css` and Tailwind theme (design.md section 2)
- [x] Fonts via `next/font` (Playfair Display, Inter, JetBrains Mono)
- [x] Button, Card, Badge, Input, Accordion, Modal primitives
- [x] AnnouncementBar, Navbar (sticky, mobile menu), Footer, WhatsApp floating button
- [x] Lenis smooth scroll provider (disabled for reduced-motion)
- Done when: layout shell looks right at 360px, 768px, 1280px.

## Phase 2 - Home hero and 3D
- [x] Hero copy and CTAs
- [x] HeroOrb (R3F) lazy loaded, paused offscreen, mobile and reduced-motion fallback
- [x] Scroll-reveal utility and entrance animations
- Done when: smooth 60fps on a mid-range laptop and graceful fallback on mobile.

## Phase 3 - Workflow Theater
- [x] `scenarios.ts` with 5 scenarios
- [x] `useWorkflowPlayer` state machine
- [x] NodeCard, Edge, Packet, LogPanel, controls, scenario tabs
- [x] Autoplay in view, loop, reduced-motion static mode, mobile vertical layout
- Done when: it plays like a recorded n8n execution with logs and success status.

## Phase 4 - Services and Projects showcase
- [x] `services.ts` + services grid + 6 detail pages
- [x] `projects.ts` typed data, seeded placeholders for owner's real n8n projects
- [x] ProjectsGrid, project detail page (gallery, lightbox, workflow replay, tools, contact CTA)
- [x] Image folder convention `public/projects/<slug>/` and README note about blurring secrets
- Done when: owner can add a project by editing one data entry and dropping images in a folder.

## Phase 5 - Demo page
- [x] PhoneChat simulator with scripted conversation and typing indicator
- [x] Click-to-chat (wa.me with prefilled text) and call buttons from site config
- [x] Workflow Theater embedded for the bot scenario

## Phase 6 - Remaining pages
- [x] About, Pricing, Industries (+ detail), FAQ, Resources, Careers, Contact (UI + client validation), Thank-you
- [x] ROI calculator (client-side)
- [x] Blog with MDX / styled articles (3 curated posts)

## Phase 7 - Legal and trust
- [x] Privacy Policy, Terms and Conditions, Cookie Policy, Refund Policy, Disclaimer, Security page, Accessibility statement
- [x] Cookie consent banner (essential only until consent)
- [x] Visible "lawyer review required" note on each legal draft

## Phase 8 - Polish and QA
- [x] Metadata, OpenGraph, sitemap, robots, structured data (Organization)
- [x] Custom 404 and error pages
- [ ] Lighthouse 90+ all categories, CLS under 0.1
- [ ] Keyboard and screen-reader pass, contrast pass
- [ ] Cross-browser check (Chrome, Edge, Safari, Firefox) and mobile devices

## Phase 9 - Backend (only after frontend approval)
- [ ] Supabase project, leads table with RLS (architecture.md section 6)
- [ ] `/api/contact` with Zod, rate limit, Turnstile, honeypot
- [ ] Resend email, signed n8n webhook, thank-you flow
- [ ] Update `.env.example`, document setup in memory.md

## Phase 10 - AI features
- [ ] `/api/chat` and "Ask Insparc AI" widget with caps and prompt-injection defenses
- [ ] `/api/ideas` Automation Idea Generator
- [ ] Lead-magnet downloads gated by email

## Phase 11 - Security hardening and launch
- [ ] CSP with nonce, all security headers verified
- [ ] `npm audit` clean (no high/critical), Dependabot on, secret scanning on
- [ ] Scan with securityheaders.com and Mozilla Observatory; fix findings
- [ ] Pen-test checklist from rules.md section 4 verified and logged
- [ ] Deploy to commercial-friendly host, connect domain, SSL, redirects, analytics with consent
- [ ] Backups and uptime monitoring

## Digital marketing and service-first copy - 2026-10-26

- [x] Dedicated Digital Marketing navbar entry, page, metadata and sitemap route
- [x] Proposal services, monthly scope, 90-day plan, approvals and reporting; prices omitted
- [x] Implementation names removed from indexed public copy and metadata; legacy URLs redirect
- [x] Business-related hero and clear working process
- [x] Larger text and simplified diagrams across all nine book chapters
- [x] Theme-matched footer ink animation with reduced-motion support
- [x] Lint, production build, 14 Chromium checks and 54-page sitemap/content verification
