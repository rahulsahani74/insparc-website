# PRD - Insparc Technology Website

## 1. Product
A premium, startup-grade marketing and demo website for **Insparc Technology**, an AI automation company
(AI chatbots, WhatsApp automation, voice agents, lead automation, document AI, RAG knowledge bots, n8n workflows).
The site must look classic and trustworthy, with tasteful 3D and live workflow animations that show automation working.

## 2. Goals
1. Turn visitors into leads: Book Demo, WhatsApp chat, or Contact form.
2. Prove capability: showcase real n8n projects (images + details) and a live "workflow execution" animation.
3. Look like a funded startup: polished UI, smooth motion, complete legal and trust pages.
4. Be secure, fast and accessible.

## 3. Non-goals (Phase 1)
No backend, no auth, no payments, no database. Frontend only with typed mock data. Backend comes later (see tasks.md).

## 4. Audience
Primary: small and mid-size business owners in India (clinics, real estate, coaching, e-commerce, agencies) who want to save time and never miss a lead.
Secondary: founders and operations managers, freelancers seeking automation partners.

## 5. Conversion actions
1. "Book a free demo" (form / Cal.com later)
2. "Chat on WhatsApp" (wa.me click-to-chat with prefilled text)
3. "Call us" (tel: link)
4. "Request this automation" button on every project card/page

## 6. Features
### P0 (Phase 1, must ship)
- Home page with 3D hero orb and clear value proposition
- **Workflow Theater**: animated n8n-style workflow that plays like a live video (see design.md and architecture.md)
- **Projects showcase**: owner's real n8n projects with images, description, tools used, and contact CTA
- **WhatsApp Bot demo page** with phone-style chat simulator and click-to-chat
- Services overview + one detail page per service
- Contact / Book Demo page (UI + client validation only)
- All legal and trust pages (section 7)
- Responsive, accessible, SEO metadata, sitemap, robots

### P1 (Phase 1 if time, else Phase 2)
- ROI calculator (hours saved x hourly cost, all computed client-side)
- Industries pages, Pricing/Packages page (no invented prices: "Get a quote")
- FAQ, Resources page, Blog (MDX), Careers, Cookie consent banner, custom 404

### P2 (backend phase)
- Contact/lead API with Supabase, email via Resend, signed webhook to n8n
- "Ask Insparc AI" chat widget (server-side LLM call)
- "Automation Idea Generator" (user describes business, AI suggests automations)
- Lead-magnet downloads (n8n templates) gated by email
- Simple admin lead view (auth + 2FA)

## 7. Page list
| Route | Purpose |
|---|---|
| / | Home |
| /services, /services/[slug] | Six service pages |
| /projects, /projects/[slug] | Showcase of real n8n projects |
| /demo | Live demo hub: Workflow Theater + WhatsApp bot demo |
| /industries, /industries/[slug] | Industry-specific automation ideas |
| /pricing | Packages (Starter / Growth / Custom, quote-based) |
| /roi-calculator | ROI tool |
| /about | Company, mission, founder placeholders |
| /blog, /blog/[slug] | Articles (MDX) |
| /careers | Open roles (placeholder) |
| /resources | Templates and guides |
| /faq | Frequently asked questions |
| /contact | Contact + Book Demo |
| /privacy-policy | Privacy Policy (India DPDP Act 2023 aware) |
| /terms-and-conditions | Terms and Conditions |
| /cookie-policy | Cookie Policy |
| /refund-policy | Refund and Cancellation Policy |
| /disclaimer | Disclaimer (AI output, results not guaranteed) |
| /security | Trust and security practices |
| /accessibility | Accessibility statement |
| /thank-you | After form submit |
| /404, /error | Custom error pages |

Legal pages: draft sensible content with `[COMPANY LEGAL NAME]`, `[ADDRESS]`, `[DATE]` placeholders and a visible note: "Have a qualified lawyer review before launch."

## 8. Projects showcase data model
Each project: `slug, title, category, summary, problem, solution, workflowSteps[], tools[], images[], videoUrl?, results? (ONLY real, verified), status`.
Seed with placeholders for: WhatsApp AI Chatbot, Automated Email Sender, Lead Capture + AI Follow-up, RAG Knowledge Bot, and `[YOUR_PROJECT_N]`.
Owner will place screenshots in `public/projects/<slug>/`. Screenshots must be blurred of keys, tokens, phone numbers and client data.

## 9. Contact details (single source of truth)
Stored in `src/config/site.ts`: `PHONE`, `WHATSAPP_NUMBER`, `EMAIL`, `ADDRESS`, `SOCIALS`. Never hardcode elsewhere.

## 10. Content rules
- NEVER invent client names, logos, testimonials, statistics, awards or certifications.
- Unknown facts are placeholders written like `[YOUR_TEXT_HERE]`, visibly marked.
- Third-party brand names (n8n, WhatsApp, Gmail, OpenAI) appear as plain text or official-style "integrates with" mentions, never implying partnership.

## 11. Success metrics
Lighthouse Performance, Accessibility, Best Practices, SEO all 90+. LCP under 2.5s on mid-range mobile. Zero console errors. Zero high/critical `npm audit` findings.

