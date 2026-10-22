import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Accessibility Statement",
  description: "Our commitment to digital accessibility, keyboard navigability, and WCAG 2.1 standards.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <div className="space-y-8 text-[var(--muted)] text-sm leading-relaxed">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Accessibility Statement
        </h1>
        <p className="text-xs font-mono text-[var(--gold)]">
          Target Standard: WCAG 2.1 Level AA Compliance
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">1. Our Commitment</h2>
        <p>
          Insparc Technology is committed to ensuring digital accessibility for people with disabilities.
          We continually optimize the user experience for everyone and apply the relevant accessibility standards.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">2. Measures Taken</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Keyboard Navigation:</strong> All interactive buttons, navigation items, and forms are fully operable via keyboard with visible focus rings.</li>
          <li><strong>Skip to Main Content:</strong> An accessible skip link is provided at the very top of each page for screen-reader and keyboard users.</li>
          <li><strong>Prefers Reduced Motion:</strong> 3D canvas animations and automatic scrolling are automatically disabled when reduced motion preferences are detected.</li>
          <li><strong>Contrast & Sizing:</strong> Body typography maintains at least 4.5:1 contrast against dark background layers, and touch targets exceed 44×44 pixels.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">3. Feedback & Assistance</h2>
        <p>
          We welcome your feedback on the accessibility of the Insparc website. If you encounter any
          accessibility barriers, please let us know at <code>{siteConfig.email}</code>.
        </p>
      </section>
    </div>
  );
}

