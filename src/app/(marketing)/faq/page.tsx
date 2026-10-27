import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { faqItems } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Frequently Asked Questions — Insparc Automation",
  description:
    "Common questions about our business services, marketing plans, deliverables and working process.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Clear Answers
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Frequently Asked <span className="text-[var(--gold)]">Questions.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Everything you need to know about how Insparc automations work, how long they take
            to deploy, and how your data is protected.
          </p>
        </div>

        {/* FAQ Accordion Component */}
        <div className="max-w-3xl mx-auto mb-20 bg-[var(--surface)] p-6 sm:p-10 rounded-card border border-[var(--border)] shadow-xl">
          <Accordion items={faqItems} />
        </div>

        {/* Still Have Questions CTA */}
        <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-card bg-[var(--surface-2)] border border-[var(--border)] text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold)] flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-3">
            Still Have A Question About Your Workflow?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-lg mx-auto mb-6 leading-relaxed">
            Ask our lead architect directly. We can verify if your specific CRM, WhatsApp provider,
            or database supports the automations you have in mind.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="md" variant="primary" asChild>
              <Link href="/contact" className="gap-2">
                <span>Book Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="md" variant="secondary" asChild>
              <a
                href={getWhatsAppUrl("Hi! I have a question about automating our business workflow.")}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat On WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

