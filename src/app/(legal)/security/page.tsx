import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Trust & Application Security Architecture",
  description: "How Insparc Technology implements OWASP security standards, webhook signatures, and data encryption.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <div className="space-y-8 text-[var(--muted)] text-sm leading-relaxed">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Security & Trust Architecture
        </h1>
        <p className="text-xs font-mono text-[var(--gold)]">
          Engineering Standard: OWASP Top 10 • Defense In Depth
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">1. Defense In Layers</h2>
        <p>
          At Insparc Technology, application security is not an afterthought; it is built into the foundation of
          every client system we architect. No computer system is impenetrable, so we implement overlapping defenses:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Cryptographic Webhook Signatures:</strong> All outbound and inbound n8n webhooks require HMAC-SHA256 timestamped signatures. Tampered or replayed payloads are rejected at the edge.</li>
          <li><strong>Strict Server-Side Validation:</strong> All input streams are parsed and sanitized with strict schemas (Zod). Client-side checks are treated strictly as UX enhancements.</li>
          <li><strong>Zero Client Secrets:</strong> API tokens, database connection URIs, and LLM secret keys never touch client browsers or public version control.</li>
          <li><strong>Row Level Security (RLS):</strong> Database tables enforce PostgreSQL RLS policies with parameterized queries, preventing unauthorized data exfiltration.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">2. AI Prompt Injection & Endpoint Safeguards</h2>
        <p>
          Conversational agents deployed for clients enforce input length restrictions, rate limiting per IP address,
          and strict system prompts that refuse attempts to leak internal tool instructions or execute unauthorized actions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">3. Responsible Disclosure</h2>
        <p>
          We welcome reports from independent security researchers. If you identify a potential security vulnerability
          within our web properties or open architectures, please email <code>{siteConfig.email}</code> with detailed
          reproduction steps. We commit to acknowledging receipt within 48 hours.
        </p>
      </section>
    </div>
  );
}

