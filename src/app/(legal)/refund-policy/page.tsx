import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Refund and Cancellation Policy",
  description: "Terms governing project milestones, scope cancellations, and milestone refunds.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <div className="space-y-8 text-[var(--muted)] text-sm leading-relaxed">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs font-mono text-[var(--gold)]">Last Updated: [DATE]</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">1. Milestone-Based Engagements</h2>
        <p>
          Custom automation projects at Insparc Technology (<strong>[COMPANY LEGAL NAME]</strong>) are structured
          around predefined milestones (e.g., Discovery & Architecture Design, Sandbox Prototype Build, Production Deployment & Handover).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">2. Cancellation Prior to Milestone Approval</h2>
        <p>
          If a client elects to terminate a project before work commences on a subsequent milestone, any unallocated
          deposit for future unstarted milestones will be refunded pro-rata.
        </p>
        <p>
          Fees associated with completed and delivered milestones where workflow code or architectural designs have been
          handed over are non-refundable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">3. Sandbox Testing Guarantee</h2>
        <p>
          Prior to final delivery, every workflow is validated against agreed test cases in a sandbox staging environment.
          If a critical bug persists that fails the agreed functional specification, we commit to resolving it at no additional cost.
        </p>
        <p>
          For billing inquiries, contact <code>{siteConfig.email}</code>.
        </p>
      </section>
    </div>
  );
}

