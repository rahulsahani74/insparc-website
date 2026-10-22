# Architecture

## 1. Stack
| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript strict |
| Styling | Tailwind CSS + shadcn/ui, design tokens in CSS variables |
| Motion | `motion` (Framer Motion), Lenis smooth scroll |
| 3D | three, @react-three/fiber, @react-three/drei (lazy loaded, hero only) |
| Icons | lucide-react |
| Content | Typed data files in `src/data`, MDX for blog |
| Validation | Zod (client now, server later) |
| Backend (Phase 2) | Next.js Route Handlers, Supabase (Postgres + RLS), Resend, Cloudflare Turnstile |
| Automation hook | n8n webhook (signed requests) |
| Hosting | Local now. Later Cloudflare Pages / Netlify, or Vercel Pro (Hobby is non-commercial) |

## 2. Folder structure
```
insparc-website/
  docs/                      # these documents
  public/
    projects/<slug>/         # owner's project screenshots
    og/                      # social images
  src/
    app/                     # routes (see prd.md page list)
      (marketing)/...        # public pages
      (legal)/...            # privacy, terms, cookie, refund, disclaimer
      api/                   # Phase 2 only
      layout.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx
    components/
      ui/                    # shadcn primitives
      layout/                # Navbar, Footer, AnnouncementBar, CookieBanner
      sections/              # Hero, Services, Process, ProjectsGrid, CTA, FAQ...
      3d/                    # HeroOrb.tsx, Scene.tsx (client only)
      workflow/              # WorkflowTheater, NodeCard, Edge, Packet, LogPanel
      demo/                  # PhoneChat (WhatsApp-style simulator)
      forms/                 # ContactForm (client validation)
    config/site.ts           # contact info, nav links, SEO defaults
    data/                    # services.ts, projects.ts, industries.ts, faq.ts, scenarios.ts
    lib/                     # utils.ts, validators.ts, seo.ts, security.ts
    hooks/                   # useWorkflowPlayer.ts, useReducedMotion.ts, useInView.ts
    styles/
  middleware.ts              # security headers, CSP nonce (Phase 2)
  next.config.ts
```

## 3. Rendering rules
- Server Components by default. `"use client"` only for interactive pieces (3D, workflow theater, chat simulator, forms, cookie banner).
- 3D canvas loaded with `next/dynamic` (`ssr:false`), only in hero, paused when offscreen, lighter fallback on mobile and reduced-motion.
- Images via `next/image`; fonts via `next/font` (self-hosted, no external font requests).

## 4. Workflow Theater (signature feature)
A data-driven animation that looks like a recorded n8n run: nodes light up in order, data packets travel along edges, an execution log types out, and statuses flip running -> success.

```ts
type NodeKind = 'trigger' | 'ai' | 'tool' | 'logic' | 'output';
type WFNode = { id: string; label: string; kind: NodeKind; icon: string; x: number; y: number };
type WFStep = { nodeId: string; durationMs: number; log: string; payload?: string };
type Scenario = {
  id: string; title: string; subtitle: string;
  nodes: WFNode[]; edges: [from: string, to: string][]; steps: WFStep[];
};
```
- `useWorkflowPlayer(scenario)` is a small state machine: `idle | playing | paused | done`, current step index, per-node status (`idle | running | success | error`), elapsed ms, log lines. Controls: play, pause, replay, speed, scenario tabs.
- Renderer: SVG for edges and packets (animated along path), HTML cards for nodes. No external network, no iframes.
- Scenarios (all labeled "Demo simulation"): (1) WhatsApp AI Chatbot, (2) Lead Capture + AI Follow-up, (3) Automated Email Sender, (4) RAG Knowledge Agent, (5) Multi-agent research flow.
- Auto-plays when in view, loops with a short pause, respects `prefers-reduced-motion` (shows static final state with log).

## 5. Projects showcase
`src/data/projects.ts` exports typed `Project[]`. Grid card: cover image, category chip, title, 1-line summary, tool chips, buttons "View details" and "Request this automation". Detail page: image gallery with lightbox, problem/solution, workflow steps (reuses Workflow Theater with that project's scenario), tools, contact CTA with WhatsApp/phone/form.

## 6. Backend (Phase 2 only, after frontend is approved)
Endpoints (all POST, JSON, Zod-validated, rate-limited, Turnstile-verified):
- `/api/contact` -> insert lead (Supabase, service role, server only) -> email via Resend -> signed webhook to n8n
- `/api/chat` -> server-side LLM call with strict system prompt, token and request caps
- `/api/ideas` -> automation idea generator (same protections)
- `/api/newsletter`, `/api/download`

Signed n8n webhook: server sends header `x-insparc-signature = HMAC_SHA256(body, N8N_WEBHOOK_SECRET)` and a timestamp; the n8n workflow rejects missing, wrong or old signatures.

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 254),
  phone text check (char_length(phone) <= 20),
  interest text check (char_length(interest) <= 200),
  message text check (char_length(message) <= 2000),
  source text not null default 'website',
  status text not null default 'new'
);
alter table public.leads enable row level security;
-- No public policies. Inserts happen only from the server using the service role key.
```

## 7. Environment variables (Phase 2, never committed)
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`, `LLM_API_KEY`. Provide `.env.example` with empty values; `.env*` in `.gitignore`. Only `NEXT_PUBLIC_*` may reach the browser, and it must never hold a secret.

## 8. Security architecture
Baseline headers (next.config.ts):
```ts
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];
```
CSP is added in middleware with a per-request nonce: default-src 'self'; allow only what is needed (Turnstile, analytics if used); no `unsafe-eval`. Full list of rules is in rules.md section 4.

## 9. Performance budget
JS on first load for non-3D pages under 150 KB gzipped; 3D chunk loads only on hero after idle; images AVIF/WebP; no layout shift (CLS under 0.1).

## 10. Deployment (later)
Production build must pass `npm run lint`, `npm run build`, `npm audit --omit=dev`. HTTPS only, domain via DNS at host, www redirects to apex (or reverse), automatic SSL.

