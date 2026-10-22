import type { Metadata } from "next";
import Link from "next/link";
import {
  Workflow,
  ShieldCheck,
  Zap,
  Users,
  ArrowRight,
  Code2,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "About Us — Engineering AI Automation for Real Business",
  description:
    "Insparc Technology is an AI automation company engineering robust n8n pipelines, WhatsApp bots, and intelligent back-office systems for small and mid-size businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Mission & Architecture
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-6">
            We Build The Systems That Work{" "}
            <span className="text-[var(--gold)]">While You Sleep.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Insparc Technology was founded on a simple observation: modern businesses waste
            hundreds of valuable human hours every month copying data across tools, answering
            the same customer inquiries, and chasing cold leads. We solve this through open,
            scalable automation engineering.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card className="p-8 bg-[var(--surface)] border-[var(--border)]">
            <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl text-[var(--text)] mb-3">
              Pragmatic Engineering Over Hype
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              We do not build novelty AI bots that make promises they cannot keep. Every workflow
              we architect is deterministic, tested against edge cases, and tied directly to
              measurable operational hours saved.
            </p>
          </Card>

          <Card className="p-8 bg-[var(--surface)] border-[var(--border)]">
            <div className="w-12 h-12 rounded-xl bg-[var(--run)]/10 text-[var(--run)] border border-[var(--run)]/30 flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl text-[var(--text)] mb-3">
              Complete Workflow Ownership
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              We build on n8n—the industry standard for open workflow automation. You own your
              credentials, database connections, and JSON workflow logic. You are never held hostage
              by proprietary agency code.
            </p>
          </Card>

          <Card className="p-8 bg-[var(--surface)] border-[var(--border)]">
            <div className="w-12 h-12 rounded-xl bg-[var(--ok)]/10 text-[var(--ok)] border border-[var(--ok)]/30 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl text-[var(--text)] mb-3">
              Data Privacy & Sovereignty
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Your customer data belongs to you. We follow strict OWASP security standards, sign
              NDAs, and can deploy your entire automation cluster on your own private cloud or
              self-hosted server.
            </p>
          </Card>
        </div>

        {/* Why n8n + AI Section */}
        <section className="p-8 sm:p-12 rounded-card border border-[var(--border)] bg-[var(--surface-2)] mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <Badge variant="gold" className="mb-3 text-xs">
                The Technical Advantage
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
                Why We Chose n8n As Our Core Engine
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
                Most agencies rely on closed platforms like Zapier or Make that charge prohibitive
                fees as your volume scales. By standardizing on n8n, Insparc delivers:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--text)]">
                <li className="flex items-center gap-2.5">
                  <Workflow className="w-4 h-4 text-[var(--gold)] shrink-0" />
                  <span>Unlimited execution steps without per-task cost penalties</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--ok)] shrink-0" />
                  <span>On-premise / self-hosted deployment options for sensitive customer data</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-[var(--run)] shrink-0" />
                  <span>Full programmatic flexibility with custom JavaScript and Python nodes</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
              <span className="text-xs font-mono text-[var(--gold)] uppercase block mb-2">
                Our Guarantee
              </span>
              <p className="font-display text-2xl text-[var(--text)] mb-3">
                Zero Black Boxes.
              </p>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-6">
                Every client receives comprehensive architectural diagrams, node documentation,
                and a walkthrough session during handover.
              </p>
              <Button size="sm" variant="secondary" asChild>
                <Link href="/projects">Explore Our Projects Showcase</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Leadership & Team Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3 text-xs">
              Leadership
            </Badge>
            <h2 className="font-display text-3xl text-[var(--text)] mb-2">
              Who We Are
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Experienced engineers and product builders dedicated to automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="p-7 bg-[var(--surface)] border-[var(--border)] text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[var(--surface-2)] border-2 border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg text-[var(--text)]">[FOUNDER_NAME]</h3>
              <p className="text-xs font-mono text-[var(--gold)] mb-3">Founder & Chief Architect</p>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Full-stack developer and AI automation engineer specializing in complex n8n
                pipelines, WhatsApp Business integration, and LLM reasoning workflows.
              </p>
            </Card>

            <Card className="p-7 bg-[var(--surface)] border-[var(--border)] text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[var(--surface-2)] border-2 border-[var(--border)] flex items-center justify-center text-[var(--muted)] mb-4">
                <Code2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg text-[var(--text)]">[ENGINEERING_TEAM]</h3>
              <p className="text-xs font-mono text-[var(--gold)] mb-3">Workflow & QA Engineers</p>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Specialists in distributed webhooks, cloud deployments, vector database retrieval,
                and rigorous end-to-end sandbox testing.
              </p>
            </Card>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-card bg-[radial-gradient(ellipse_at_top,#151C36_0%,#0B1020_100%)] border border-[var(--gold)]/30 text-center">
          <h3 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
            Ready To Streamline Your Operations?
          </h3>
          <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl mx-auto mb-8">
            Schedule a conversation with our founder to discover how automation can unlock
            hundreds of hours for your core business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="/contact" className="gap-2">
                <span>Book Free Architecture Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

