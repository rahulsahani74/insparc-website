import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { generateMetadata } from "@/lib/seo";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";

export const metadata: Metadata = generateMetadata({
  title: "Automation Services",
  description:
    "End-to-end AI automation services: WhatsApp chatbots, automated email sequences, custom n8n pipelines, and voice agents for high-growth businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="pt-8 pb-20">
      {/* Page Header */}
      <section className="py-16 sm:py-20 text-center max-w-container mx-auto px-5 lg:px-8 animate-fade-up">
        <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
          Capabilities & Solutions
        </Badge>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-6">
          AI Automations Built For{" "}
          <span className="text-[var(--gold)]">Zero Operational Friction.</span>
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          From customer inquiries on WhatsApp to back-office invoice processing,
          we architect custom systems that do the heavy lifting automatically.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/contact">Book a Free Automation Audit</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a
              href={getWhatsAppUrl("Hi! I would like to discuss automation services for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat On WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* Services Bento Grid */}
      <ServicesGrid />

      {/* Process / How It Works Strip */}
      <section className="py-20 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-container mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
              How We Deliver Your Automation
            </h2>
            <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl mx-auto">
              A transparent, 4-step engineering process with zero fluff and complete ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Audit",
                desc: "We analyze your current manual tasks, tools, and bottlenecks to spot high-ROI automation opportunities.",
              },
              {
                step: "02",
                title: "Architecture Design",
                desc: "We map the exact n8n node flow, webhook triggers, AI models, and fallback logic before touching code.",
              },
              {
                step: "03",
                title: "Build & Test",
                desc: "We develop the workflow in sandbox mode with edge-case handling, error alerts, and rate-limit safeguards.",
              },
              {
                step: "04",
                title: "Deploy & Handover",
                desc: "We deploy on your cloud or self-hosted server and provide clear documentation so you own your system.",
              },
            ].map((p) => (
              <div
                key={p.step}
                className="p-6 rounded-card border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-[var(--gold)] mb-3 block">
                    {p.step}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" variant="primary" asChild>
              <Link href="/contact" className="gap-2">
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

