import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone, ArrowRight, Zap, Database, ShieldCheck } from "lucide-react";
import { PhoneChat } from "@/components/demo/PhoneChat";
import { WorkflowTheater } from "@/components/workflow/WorkflowTheater";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Interactive AI Automation Demo",
  description:
    "Test our live WhatsApp AI chatbot simulator and inspect real-time n8n workflow execution. Experience automated lead qualification and appointment booking.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Interactive Test Hub
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Experience Automation{" "}
            <span className="text-[var(--gold)]">In Action.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Test the frontend conversational experience on the phone simulator, and inspect the
            backend data pipelines running in our live Workflow Theater below.
          </p>
        </div>

        {/* Top 2-Column: Phone Chat Simulator + Mechanics Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left: Phone Chat Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneChat />
          </div>

          {/* Right: Technical Explanation & Direct Testing CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <Badge variant="outline" className="mb-3 text-xs">
                Under The Hood
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
                What Happens Every Time A Customer Texts?
              </h2>
              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed mb-6">
                Unlike primitive rule-based chatbots that frustrate buyers with rigid menus,
                Insparc agents use intelligent reasoning to understand intent, query your
                knowledge base, and take concrete actions.
              </p>
            </div>

            {/* Technical Flow Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text)]">
                    1. Instant Webhook Reception (&lt;200ms)
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Message is ingested via Meta WhatsApp Business API directly into our
                    isolated n8n webhook listener.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--run)]/10 text-[var(--run)] flex items-center justify-center shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text)]">
                    2. Knowledge Retrieval & Intent Classification
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    The AI checks your product catalog or FAQs, verifies availability, and
                    prepares a polite, context-aware answer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--ok)]/10 text-[var(--ok)] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text)]">
                    3. CRM Sync & Human Notification
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Contact details and appointment time are securely stored in your CRM or Google
                    Sheets, while your team gets an instant alert.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Options */}
            <Card className="p-6 bg-[var(--surface-2)] border-[var(--gold)]/40">
              <h3 className="text-base font-semibold text-[var(--text)] mb-2">
                Want this deployed for your company?
              </h3>
              <p className="text-xs text-[var(--muted)] mb-5">
                We can customize the prompts, integrations, and guardrails to match your exact brand voice.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button size="md" variant="primary" asChild>
                  <a
                    href={getWhatsAppUrl("Hi! I tested your demo simulator and want to build a WhatsApp bot for my company.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat On WhatsApp
                  </a>
                </Button>

                <Button size="md" variant="secondary" asChild>
                  <Link href="/contact" className="gap-1.5">
                    <span>Schedule Free Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                <Button size="md" variant="ghost" asChild>
                  <a href={`tel:${siteConfig.phone}`} className="gap-1.5 text-xs">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{siteConfig.phone}</span>
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Section: Live Workflow Theater */}
        <section className="pt-16 border-t border-[var(--border)]">
          <div className="text-center mb-10">
            <Badge variant="gold" className="mb-3 text-xs">
              Backend Execution
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-3">
              Watch The Corresponding n8n Execution
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-xl mx-auto">
              This interactive theater simulates the exact sequence executed on every WhatsApp trigger.
            </p>
          </div>

          <WorkflowTheater initialScenarioId="whatsapp-ai-chatbot" />
        </section>
      </div>
    </div>
  );
}

