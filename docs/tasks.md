# Tasks

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
