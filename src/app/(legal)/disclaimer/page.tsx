import type { Metadata } from "next";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Disclaimer — AI Output & Simulation Notice",
  description: "Important disclosures regarding AI probabilistic model outputs and website workflow simulations.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="space-y-8 text-[var(--muted)] text-sm leading-relaxed">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Legal Disclaimer
        </h1>
        <p className="text-xs font-mono text-[var(--gold)]">Last Updated: [DATE]</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">1. Interactive Demonstrations & Simulations</h2>
        <p>
          The interactive visual tools on this website—including the <strong>Workflow Theater</strong> and
          <strong>Phone Chat Simulator</strong>—are educational simulations designed to illustrate data routing
          capabilities. They utilize synthetic mock payloads and do not reflect real-time production client data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">2. Probabilistic Nature of Large Language Models (LLMs)</h2>
        <p>
          Large language models (such as GPT-4o, Claude 3.5, and Llama 3) generate text probabilistically. While Insparc
          engineers strict system prompts, temperature controls, and validation guardrails, we do not warrant that AI-generated
          responses will be free from hallucinations in every conceivable edge case.
        </p>
        <p>
          Clients in regulated industries (healthcare, legal, banking) are strongly advised to retain human-in-the-loop
          review workflows for high-stakes decisions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-[var(--text)]">3. Business Results Not Guaranteed</h2>
        <p>
          Any case studies, ROI calculators, or workflow examples provided on this site are indicative benchmarks.
          Actual conversion rates and operational savings depend upon your industry, market conditions, and sales team execution.
        </p>
      </section>
    </div>
  );
}

