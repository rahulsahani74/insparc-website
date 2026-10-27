# Design System

## Current owner-directed theme — 2026-10-26

The supplied ThreeUI Meng To sketchbook theme supersedes the historical palette/font choices below. Use `src/app/sketchbook-theme.css`: paper `#ece7dc`, ink `#2b2721`, brown accent `#795337`, Instrument Serif headings and Newsreader body text. Body copy is 20px; supporting copy 16–18px. Full name: **Insparc Technologies**. Source/rendering provenance and the deliberate content adaptations are documented in `sketchbook-redesign.md`.

## 1. Personality
Classic, trustworthy, premium, intelligent. "Old-world elegance meets AI." Calm confidence, lots of space, thin lines, a few striking 3D and live-motion moments. Not noisy, not generic template.

## 2. Tokens
| Token | Value | Use |
|---|---|---|
| --bg | #0B1020 | Page background (deep navy) |
| --surface | #10162B | Sections, cards on bg |
| --surface-2 | #151C36 | Raised elements |
| --border | #2A3150 | Hairlines |
| --text | #F5F0E6 | Primary text (ivory) |
| --muted | #C9C4B6 | Secondary text (4.5:1+ on bg) |
| --gold | #C9A24B | Accent, CTAs, highlights |
| --gold-soft | #F3E3B6 | Gold highlights |
| --run | #5CC8FF | Workflow "running" |
| --ok | #4ADE80 | Workflow "success" |
| --err | #F87171 | Workflow "error" |
Primary button: gold background, navy text. Secondary: 1px gold outline. Text on gold is always navy.

Typography: Display **Playfair Display** (500/600), body **Inter**, code and logs **JetBrains Mono**. Scale: 68/46/34/24/19/16/14. Display line-height 1.05-1.1, body 1.6.
Spacing: 4px grid. Section padding 96-110px desktop, 64px mobile. Container max 1200px, 32px side padding (20px mobile).
Radius: cards 18px, buttons 999px, inputs 12px. Shadows: soft and low, gold glow only on hero orb and active workflow node.
Breakpoints: 640 / 768 / 1024 / 1280.

## 3. Layout and navigation
- Slim **announcement bar** (e.g. "Book a free automation audit") dismissible.
- **Sticky navbar** with blur on scroll: logo, Services, Projects, Demo, Pricing, About, Contact, gold "Book a Demo" button. Mobile: full-screen menu with large touch targets.
- **Footer**: 4 columns (Company, Services, Resources, Legal), contact block (phone, WhatsApp, email), small print, "Demo simulations are illustrative" note.
- Floating **WhatsApp button** bottom-right (accessible, does not cover content on mobile).

## 4. Motion language
| Pattern | Spec |
|---|---|
| Entrance | Fade + 16px rise, 500ms, ease-out, staggered 60ms, once per element |
| Card hover | perspective(900px) rotateX 5deg rotateY -5deg, lift 6px, gold border, 350ms |
| Buttons | 200ms color shift, 2px press |
| Page scroll | Lenis smooth, reduced when `prefers-reduced-motion` |
| Hero orb | Slow float (6s), mouse parallax within 8deg, scroll shifts camera slightly |
All motion is subtle and purposeful. Reduced-motion users get static equivalents.

## 5. 3D hero orb
Glass-and-gold sphere with two thin orbit rings and a few floating node dots (neural-network feel). Soft key light from top-left, warm rim light. Fallback: static high-quality CSS/SVG orb on mobile, low-power devices and reduced-motion. Canvas dpr [1, 1.5].

## 6. Workflow Theater (signature visual)
- Container: rounded panel with faint grid background, title bar with three dots and the scenario name, "Demo simulation" badge.
- Nodes: 160-200px cards, icon + label + small status dot; kinds have a thin colored top edge (trigger gold, ai cyan, tool ivory, output green).
- Edges: 1.5px curved lines. When active, a glowing packet (6px) travels along the edge in 600-900ms.
- States: idle (dim), running (cyan pulse ring + spinner), success (green check, brief pop), error (red, only in an "error handling" scenario).
- Execution log (right or below, mono 13px): timestamped lines type in as steps run, e.g. `12:04:01  WhatsApp Trigger  message received`, `AI Agent  generating reply (420 ms)`. Footer shows "Execution succeeded in 3.2s" with a green badge.
- Controls: Play/Pause, Replay, speed 1x/2x, scenario tabs. Autoplay in view, loop with 2s pause.
- Mobile: nodes stack vertically; log collapses under the flow.

## 7. Key sections and pages
- **Hero**: eyebrow, 2-line serif headline, subcopy, two CTAs, 3D orb, subtle "scroll" cue.
- **Workflow Theater strip** right under hero ("Watch an automation run").
- **Services bento grid** with tilt cards; each card links to its detail page.
- **Projects showcase**: image-first cards with browser-frame screenshots, category chips, tool chips, "Request this automation".
- **Project detail**: hero image, gallery + lightbox, problem/solution, replayable workflow, tools used, sticky contact card (WhatsApp, call, form).
- **Demo page**: left, phone-style chat simulator (generic chat UI, not a copy of WhatsApp branding) with scripted conversation and typing indicator; right, "Chat with our live bot" with number and click-to-chat; below, Workflow Theater for the same bot.
- **Process**: 4 numbered steps with hairline divider.
- **Pricing**: three packages, no invented prices ("Get a quote").
- **FAQ**: accordion, keyboard accessible.
- **CTA band**: gold background, navy text.
- **Legal pages**: clean long-form layout, table of contents, last-updated date.

## 8. Images
Project screenshots shown inside a minimal browser frame, rounded 12px, subtle border. Alt text describes the workflow. Remind owner to blur credentials, tokens, phone numbers, client data. No stock-photo clichés (handshakes, robots with glowing brains).

## 9. Accessibility
Text contrast 4.5:1 (3:1 for 24px+). Gold focus ring 2px with 2px offset. Touch targets at least 44px. Skip-to-content link. Logical heading order. Animations pausable. Forms with labels, errors announced.

## 10. Do and Don't
Do: whitespace, hairlines, serif headings, restrained gold, real content or clear placeholders.
Don't: neon gradients everywhere, emoji icons, left-border-accent cards, auto-playing sound, carousels that hide key info, fake logos or stats.

