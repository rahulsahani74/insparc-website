import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Shield, Zap, Sparkles, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { getWhatsAppUrl } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Pricing & Packages — Custom Automation Solutions",
  description:
    "Explore Insparc Technology automation packages. Transparent scopes for WhatsApp bots, lead generation pipelines, and enterprise n8n workflow systems.",
  path: "/pricing",
});

const packages = [
  {
    name: "Starter Workflow",
    tagline: "Ideal for automating a single critical bottleneck",
    target: "Clinics, solo consultants, local service businesses",
    features: [
      "1 Core Automation Workflow (e.g. WhatsApp Auto-Reply or Lead Capture)",
      "Standard LLM integration (GPT-4o mini / Claude 3.5 Haiku)",
      "Google Sheets or single CRM sync",
      "Basic error alerts via Email / WhatsApp",
      "7 Days post-deployment support",
      "Full workflow JSON export (You own 100% of the code)",
    ],
    popular: false,
    cta: "Request Starter Quote",
  },
  {
    name: "Growth Automation",
    tagline: "End-to-end inbound capture, AI qualification & follow-up",
    target: "Real estate agencies, coaching institutes, e-commerce brands",
    features: [
      "Up to 3 Interconnected Workflows",
      "WhatsApp Business API + Web forms + CRM bi-directional sync",
      "AI Knowledge Agent grounded on your company FAQs/PDFs",
      "Automated multi-step nurture sequence (WhatsApp & Email)",
      "Calendar scheduling integration (Cal.com / Google Calendar)",
      "Advanced fallback & human agent handoff logic",
      "30 Days post-deployment maintenance & tuning",
    ],
    popular: true,
    cta: "Request Growth Quote",
  },
  {
    name: "Enterprise Architecture",
    tagline: "Full-stack AI automation infrastructure for high-volume operations",
    target: "Scaling startups, logistics, financial & legal firms",
    features: [
      "Unlimited custom workflow pipelines",
      "Dedicated self-hosted n8n instance on your private cloud",
      "Document AI (PDF invoice / KYC document extraction)",
      "Custom RAG vector database & private embeddings",
      "Strict data privacy, zero logging of sensitive customer PII",
      "SLA-backed priority support & monthly workflow optimization",
    ],
    popular: false,
    cta: "Schedule Architecture Consultation",
  },
];

const pricingFaqs = [
  {
    id: "p-1",
    question: "Why do you provide custom quotes instead of flat monthly SaaS fees?",
    answer:
      "Unlike rigid SaaS tools that charge high recurring per-seat fees for features you do not need, we engineer custom workflows built on open architecture (n8n). You own the systems outright, and you pay only for the exact integrations and logic your business requires.",
  },
  {
    id: "p-2",
    question: "Do I have to pay ongoing fees to Insparc?",
    answer:
      "No ongoing lock-in. Once built and handed over, you own the workflow. You only pay standard infrastructure pass-through costs (e.g. your WhatsApp API usage or OpenAI API tokens, which are usually a few dollars per month). We also offer optional monthly maintenance retainers if you want us to continuously monitor and build new workflows.",
  },
  {
    id: "p-3",
    question: "Where are the automations hosted?",
    answer:
      "We can deploy either on our managed cloud environment or directly on your own private cloud server (AWS, DigitalOcean, Hetzner, etc.) so your confidential customer data never leaves your infrastructure.",
  },
  {
    id: "p-4",
    question: "What is the typical turnaround time?",
    answer:
      "A Starter Workflow is typically deployed within 3–5 business days. Complex Growth or Enterprise systems with multi-app integrations take between 2 to 3 weeks including rigorous edge-case testing.",
  },
];

export default function PricingPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Fair & Transparent Scopes
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Investment Based On <span className="text-[var(--gold)]">Real ROI.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            No bloated subscription packages. We quote transparent fixed scopes based on the
            exact hours your team saves each month.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`p-8 sm:p-9 flex flex-col justify-between relative transition-all duration-300 ${
                pkg.popular
                  ? "border-[var(--gold)] shadow-gold-glow bg-[var(--surface-2)]"
                  : "border-[var(--border)] bg-[var(--surface)]"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="gold" className="px-3 py-1 text-xs gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular</span>
                  </Badge>
                </div>
              )}

              <div>
                <h2 className="font-display text-2xl text-[var(--text)] mb-2">{pkg.name}</h2>
                <p className="text-xs text-[var(--muted)] min-h-[36px] mb-6 leading-relaxed">
                  {pkg.tagline}
                </p>

                <div className="py-4 border-y border-[var(--border)] mb-6">
                  <p className="text-xs font-mono text-[var(--gold)] mb-1">Tailored Quote</p>
                  <p className="text-2xl font-display font-semibold text-[var(--text)]">
                    Fixed Project Scope
                  </p>
                  <p className="text-[11px] text-[var(--muted)]/70 mt-1">
                    Best for: {pkg.target}
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    Included Architecture:
                  </p>
                  <ul className="space-y-2.5" role="list">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-[var(--text)]">
                        <Check className="w-4 h-4 text-[var(--ok)] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <Button
                  fullWidth
                  size="md"
                  variant={pkg.popular ? "primary" : "secondary"}
                  asChild
                >
                  <Link href={`/contact?package=${encodeURIComponent(pkg.name)}`}>
                    {pkg.cta}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Guarantees Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 p-8 rounded-card border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
                100% Code & Workflow Ownership
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                You receive full n8n JSON exports and credentials. You are never locked into our agency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[var(--run)]/10 text-[var(--run)] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
                Zero Monthly Per-Seat Markup
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Add 5 or 50 team members to your CRM without paying extra software licenses to us.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[var(--ok)]/10 text-[var(--ok)] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
                Staging Testing Guarantee
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                We stress-test edge cases in sandbox mode before connecting to your live customer channels.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-[var(--text)] mb-3">
              Pricing & Implementation FAQ
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Common questions on contracts, hosting, and ongoing operations.
            </p>
          </div>

          <Accordion items={pricingFaqs} />
        </div>

        {/* Bottom Contact Callout */}
        <div className="p-8 sm:p-12 rounded-card bg-[radial-gradient(ellipse_at_top,#151C36_0%,#0B1020_100%)] border border-[var(--gold)]/30 text-center">
          <h3 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
            Need A Custom Estimate For Your Team?
          </h3>
          <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Share your current operational stack with us. We will calculate the hours you stand to save
            and propose an exact architectural plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="/contact" className="gap-2">
                <span>Book Free Architecture Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a
                href={getWhatsAppUrl("Hi! I'd like a custom pricing quote for an automation workflow.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

