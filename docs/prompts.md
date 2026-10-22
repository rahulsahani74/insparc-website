# Prompts

## A. FIRST PROMPT (paste in Plan mode)
```
ROLE: You are the Principal Full-Stack Engineer, Senior UI/UX Designer and Application
Security Engineer at a venture-backed AI startup. I am the founder of Insparc Technology,
an AI automation company. You will build our company website with me, step by step.

BEFORE ANYTHING ELSE read these files in /docs in this order:
memory.md, tasks.md, rules.md, prd.md, architecture.md, design.md.
They are the source of truth. If they conflict with my chat message, ask me.

CONTEXT: The Next.js project is already created and dependencies are installed.
We are building the FRONTEND ONLY, running locally (npm run dev). No backend yet.

HARD REQUIREMENTS:
- Classic + 3D look, startup-grade polish, smooth animations
- Signature "Workflow Theater": an animated n8n-style workflow that plays like a live video
  (nodes light up, data packets move, execution log types out)
- Projects showcase for my real n8n projects (WhatsApp bot, email sender, etc.) with images,
  details and contact buttons (WhatsApp, call, form)
- WhatsApp bot demo page, all legal and trust pages, startup-style marketing pages
- Security-first code exactly as written in rules.md. No fake clients, stats or testimonials

YOUR FIRST OUTPUT (do NOT write app code yet):
1. A 10-line summary of what you understood
2. Questions you truly need answered (max 5)
3. The folder structure you will create
4. Your plan for Phase 0 and Phase 1 with the exact files you will touch
5. Risks you see (performance, security, scope)
Then wait for my "approved".
```

## B. Start of every session
```
Read docs/memory.md and docs/tasks.md. Tell me in 5 lines where we are and what the next
task is. Do not code until I say go.
```

## C. Phase prompt template
```
Approved. Work on [PHASE N - name] from docs/tasks.md only. Follow docs/rules.md and
docs/design.md. When done: run npm run lint and npm run build, fix errors, tick tasks.md,
append to memory.md, then show me: what changed, how to view it, what to review.
```

## D. End of every session
```
Update docs/memory.md (snapshot, decisions, known issues, next steps, session log) and
docs/tasks.md. Summarize the diff in 8 lines. Suggest the commit message.
```

## E. Add my real n8n project
```
Add this project to src/data/projects.ts using the Project type. Details:
Title: ...  Category: ...  What it does: ...  Problem: ...  Tools: ...
Workflow steps in order: ...  Images are in public/projects/<slug>/ (file names: ...)
Also create a matching Workflow Theater scenario. Do not invent results or numbers.
```

## F. Security review (before every release)
```
Act as an application security auditor. Review the whole repo against docs/rules.md
section 4 and OWASP Top 10. List every finding with severity, file, and fix. Check:
headers/CSP, input validation, secrets exposure, rate limiting, Turnstile, RLS, webhook
signing, dependency audit, AI endpoint abuse and prompt injection. Fix high and critical
issues after I approve. Log the result in memory.md.
```

## G. Backend kickoff (only after frontend approval)
```
Start Phase 9. Implement /api/contact exactly as in docs/architecture.md section 6 and
rules.md section 4: Zod on the server, rate limit, Turnstile, honeypot, Supabase insert with
service role (server only), Resend email, signed n8n webhook. Create .env.example and explain
each variable. Show the plan first.
```

## H. Bug-fix prompt
```
Bug: [what you see]. Expected: [what should happen]. Steps: [how to reproduce].
Find the root cause first, explain it in 3 lines, then fix with the smallest change.
Run lint and build. Add a note to memory.md if it affects future work.
```
