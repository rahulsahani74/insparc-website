import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Privacy Policy",
  description: "Privacy policy and personal data processing practices under Digital Personal Data Protection Act (DPDP) 2023.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 text-[var(--muted)] text-sm leading-relaxed">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[var(--gold)]">
          Last Updated: [DATE] • Compliant with India DPDP Act 2023
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">1. Introduction</h2>
        <p>
          This Privacy Policy governs the manner in which <strong>[COMPANY LEGAL NAME]</strong> (&quot;Insparc Technologies&quot;,
          &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, processes, and protects information gathered from users
          (&quot;you&quot;, &quot;your&quot;) of our website and automation services.
        </p>
        <p>
          Registered Address: <code>[ADDRESS]</code><br />
          Contact Email: <code>{siteConfig.email}</code>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">2. Data We Collect</h2>
        <p>We collect only the minimum information necessary to provide our automation audit and engineering services:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Direct Contact Data:</strong> Name, business email, phone number, and company name provided via our contact or demo forms.</li>
          <li><strong>Workflow Requirements:</strong> Descriptions of your business operational processes, team responsibilities, and task bottlenecks.</li>
          <li><strong>Technical Identifiers:</strong> IP addresses, browser types, and standard access logs collected automatically for security and rate limiting.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">3. Client Workflow Data Confidentiality</h2>
        <p>
          When you contract Insparc Technologies to deliver business services, we treat all client
          account access details, business records and customer communications as strictly confidential under non-disclosure.
        </p>
        <p>
          We do not sell, rent, or trade your data or your end-users&apos; data to third-party advertisers or model training companies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">4. Your Rights Under DPDP Act 2023</h2>
        <p>As a data principal, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access a summary of personal data being processed.</li>
          <li>Request correction or completion of inaccurate information.</li>
          <li>Request erasure of your personal contact records.</li>
          <li>Nominate an individual in accordance with legal provisions.</li>
        </ul>
        <p>
          To exercise any of these rights, email our Grievance Officer at <code>{siteConfig.email}</code> with the subject line &quot;Data Principal Request&quot;.
        </p>
      </section>
    </div>
  );
}

