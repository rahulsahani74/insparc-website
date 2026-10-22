import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Terms and Conditions",
  description: "Terms of service and commercial agreement governing Insparc Technology automation development.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <div className="space-y-8 text-[var(--muted)] text-sm leading-relaxed">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Terms & Conditions
        </h1>
        <p className="text-xs font-mono text-[var(--gold)]">Last Updated: [DATE]</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">1. Scope of Services</h2>
        <p>
          Insparc Technology (<strong>[COMPANY LEGAL NAME]</strong>) provides custom AI automation consulting,
          n8n workflow engineering, and third-party integration development.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">2. Intellectual Property & Workflow Ownership</h2>
        <p>
          Upon full settlement of agreed project fees, the client owns all bespoke workflow configurations,
          custom scripts, and n8n JSON pipeline definitions developed specifically for their deployment.
        </p>
        <p>
          Insparc Technology retains ownership of proprietary scaffolding templates and foundational software libraries.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">3. Third-Party Platform Terms</h2>
        <p>
          Automations often interface with third-party providers including Meta (WhatsApp Business API),
          OpenAI, Anthropic, Google, and cloud hosting vendors. Client agrees to comply with the acceptable use
          policies of these respective providers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">4. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of India,
          with exclusive jurisdiction residing in the courts of <code>[COURT_JURISDICTION, e.g. Pune, Maharashtra]</code>.
        </p>
        <p>
          Questions regarding these terms may be directed to <code>{siteConfig.email}</code>.
        </p>
      </section>
    </div>
  );
}

