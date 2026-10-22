import type { Metadata } from "next";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Cookie Policy",
  description: "Information regarding cookie utilization and local storage on Insparc Technology.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <div className="space-y-8 text-[var(--muted)] text-sm leading-relaxed">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Cookie Policy
        </h1>
        <p className="text-xs font-mono text-[var(--gold)]">Last Updated: [DATE]</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">1. What Are Cookies?</h2>
        <p>
          Cookies and local browser storage are small text files stored on your device that help
          websites operate effectively and remember your preferences.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">2. How We Use Cookies</h2>
        <p>
          Insparc Technology prioritizes user privacy. We strictly minimize cookie usage:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Essential Cookies:</strong> Used for site navigation, security verification, and remembering banner dismissal.</li>
          <li><strong>Zero Cross-Site Tracking:</strong> We do not deploy third-party advertising cookies or cross-site tracking pixels without prior explicit consent.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">3. Managing Preferences</h2>
        <p>
          You can modify your browser settings to refuse cookies or alert you when cookies are being sent.
          Note that disabling essential storage may impact some interface animations or saved preferences.
        </p>
      </section>
    </div>
  );
}

