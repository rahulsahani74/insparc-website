# Project Memory (AI: read at start, update at end of every task)

## Snapshot
- Company: Insparc Technology (AI automation startup)
- Goal: premium startup website, classic + 3D look, live workflow animations, owner's n8n projects showcase
- Current phase: Frontend Complete (Phase 5, 6, 7 & 8 Built — 41/41 routes live and populated)
- Mode: FRONTEND ONLY, runs locally. Backend later.

## Decisions (do not change without asking)
- Next.js App Router + TypeScript strict + Tailwind + shadcn/ui + motion + Lenis + R3F
- Palette: navy / ivory / champagne gold. Fonts: Playfair Display, Inter, JetBrains Mono
- No fake clients, stats or testimonials. Placeholders in `[BRACKETS]`
- Contact info lives only in `src/config/site.ts`
- Workflow Theater is data-driven from `src/data/scenarios.ts`
- Vercel Hobby is non-commercial; choose Cloudflare/Netlify free or Vercel Pro for production

## Owner inputs still needed
- [ ] Legal company name, address, phone, WhatsApp number, email
- [ ] Real n8n project details and screenshots (blur secrets)
- [ ] Logo (or use text wordmark for now)
- [ ] Domain name decision

## Conventions
- Branch per phase, conventional commits
- Run `npm run lint && npm run build` before saying a task is done

## Known issues
(none)

## Next steps
1. Founder review of all live pages on http://localhost:3000
2. When ready, proceed to Phase 9: Backend integration (Supabase, Resend, Turnstile, signed n8n webhooks)

## Session log (append newest at top)
<!-- Format: YYYY-MM-DD | task | what changed | decisions | follow-ups -->
- 2026-10-22 | All Empty Pages Built & Populated | Created interactive PhoneChat simulator and `/demo` page. Created Zod-validated `ContactForm.tsx` and full `/contact` ("Book a Free Automation Audit") page. Built `/pricing` with 3 tiered packages, comparison matrix and pricing FAQ. Built `/about` with company mission, principles, leadership. Built `/thank-you` confirmation page. Built interactive slider `/roi-calculator`. Built `/faq` page with accordion. Built `/industries` index + 4 detail playbooks (`/industries/[slug]`). Built `/resources` downloadable templates. Built `/careers` with remote culture and open roles. Built `/blog` with 3 technical architecture teardowns. Built all 7 legal pages (`/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, `/refund-policy`, `/disclaimer`, `/security`, `/accessibility`). Production build generated 41/41 static and dynamic pages with 0 errors/warnings. | All routes populated, zero empty pages.
- 2026-10-21 | Phase 4 Complete | Built Services Bento Grid (`ServicesGrid.tsx`) with interactive 3D tilt cards, Services directory page (`/services`), and 6 dynamic Service Detail pages (`/services/[slug]`) with feature checklists and use cases. Built Projects Showcase Grid (`ProjectsGrid.tsx`) with minimal browser frames, Projects directory page (`/projects`), and dynamic Project Detail pages (`/projects/[slug]`) with problem/solution breakdown, tools stack, and embedded replayable Workflow Theater. Verified static generation, `npm run lint` and `npm run build` both pass with zero errors.
- 2026-10-21 | Phase 2 & 3 Complete | Implemented 3D Hero Orb (`HeroOrb.tsx`, `Scene.tsx`, and `OrbFallback.tsx`) with R3F lazy loading, offscreen auto-pause, mouse parallax, and mobile/reduced-motion fallback. Built `Hero.tsx` with Playfair Display headline, CTAs, value pillars, and scroll cue. Built the signature `WorkflowTheater.tsx` with `useWorkflowPlayer` state machine.
- 2026-10-21 | Phase 0 & 1 Complete | Initialised Next.js 15 App Router, TypeScript strict, Tailwind CSS tokens & globals.css, font loading via next/font (Playfair, Inter, JetBrains Mono), shadcn UI primitives, Layout shell, SEO & sitemap/robots.
