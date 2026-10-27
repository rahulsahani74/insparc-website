import {
  Clock,
  Zap,
  Network,
  Users2,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const VALUE_PILLARS = [
  {
    icon: Clock,
    title: "Eliminate Repetitive Manual Work",
    description:
      "Stop wasting employee hours on copy-pasting spreadsheet rows, drafting repetitive emails, and re-typing invoices. Let autonomous pipelines handle operations 24/7.",
  },
  {
    icon: Zap,
    title: "Sub-Second Business Responses",
    description:
      "Inbound inquiries on WhatsApp, webforms, or social ads receive contextual AI answers and booking links in under 5 seconds, capturing leads before competitors react.",
  },
  {
    icon: Network,
    title: "Fully Connected Software Ecosystem",
    description:
      "Your CRM, Google Sheets, messaging apps, and accounting software communicate via synchronized n8n webhooks. Data is always current with zero human data entry.",
  },
  {
    icon: Users2,
    title: "Zero Lead Leakage",
    description:
      "Every prospect is captured, categorized by budget and intent, and enrolled into automated multi-touch follow-ups across WhatsApp and Email until qualified.",
  },
  {
    icon: TrendingUp,
    title: "Scale Operations Without Headcount",
    description:
      "Handle 10x more inbound volume, client onboardings, or support tickets without proportionally bloating your administrative payroll or office footprint.",
  },
  {
    icon: ShieldCheck,
    title: "100% Data & Workflow Ownership",
    description:
      "We build on open-source n8n and self-hosted environments. You retain complete ownership of all workflow JSON files, database keys, and customer data.",
  },
];

export function TrustValueSection() {
  return (
    <section className="py-20 sm:py-24 bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>Operational Transformation</span>
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-5 font-semibold">
            Why High-Growth Companies{" "}
            <span className="text-[var(--gold)] italic font-serif">Partner With Insparc</span>
          </h2>

          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
            We don&apos;t build fragile gimmicks or generic AI toys. We engineer resilient, mission-critical
            automation infrastructure that gives your business an unfair operational advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[var(--surface-2)]/60 border border-[var(--border)] hover:border-[var(--gold)]/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] mb-5 group-hover:scale-105 group-hover:bg-[var(--gold)]/10 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
