"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Layers,
  AlertTriangle,
  FileCode2,
  ArrowLeft,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import type { DigitalProduct } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckoutModal } from "@/components/marketplace/CheckoutModal";
import { getWhatsAppUrl } from "@/config/site";

interface ProductDetailClientProps {
  product: DigitalProduct;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all automation products</span>
          </Link>
        </div>

        {/* Product Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8 animate-fade-up">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="gold" className="text-xs uppercase tracking-wider font-mono">
                {product.category}
              </Badge>
              <span className="text-xs font-mono text-[var(--muted)]">
                Compatible with {product.n8nVersion}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-4 font-semibold">
              {product.title}
            </h1>

            <p className="text-lg font-mono text-[var(--gold)] mb-6">
              {product.tagline}
            </p>

            <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              {product.summary}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--muted)] mb-1">
                  Difficulty
                </div>
                <div className="text-sm font-semibold text-[var(--text)] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[var(--ok)]" />
                  {product.setupDifficulty}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--muted)] mb-1">
                  Setup Time
                </div>
                <div className="text-sm font-semibold text-[var(--text)] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--gold)]" />
                  ~{product.setupTimeMinutes} Minutes
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] col-span-2 sm:col-span-1">
                <div className="text-xs font-mono uppercase text-[var(--muted)] mb-1">
                  Package format
                </div>
                <div className="text-sm font-semibold text-[var(--gold)]">
                  Editable workflow + guide
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Purchase Card (Right Column) */}
          <div className="lg:col-span-4 sticky top-24">
            <Card className="p-6 bg-[var(--surface-2)] border-[var(--gold)]/50 shadow-2xl rounded-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-5">
                <div>
                  <div className="text-xs font-mono uppercase text-[var(--muted)]">
                    Direct Download License
                  </div>
                  <p className="mt-3 text-base">A starting point for your workflow</p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--ok)] border border-emerald-800/40">
                  Enquiries open
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <Button
                  fullWidth
                  size="lg"
                  variant="primary"
                  onClick={() => setCheckoutOpen(true)}
                  className="shadow-lg shadow-[var(--gold)]/10 font-semibold"
                >
                  Ask about this workflow
                </Button>

                <Button fullWidth size="md" variant="secondary" asChild className="border-[var(--border)]">
                  <a
                    href={getWhatsAppUrl(`Hi Insparc team, I have a pre-purchase question about ${product.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[var(--ok)]" />
                    Ask Pre-Sale Question
                  </a>
                </Button>
              </div>

              {/* Package Inclusions Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--gold)] mb-2">
                  What&apos;s Included In This Package:
                </div>
                {product.downloadFiles.map((file, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <FileCode2 className="w-3.5 h-3.5 text-[var(--ok)] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[var(--text)]">{file.fileName}</span>
                      <span className="text-xs text-[var(--muted)] block">{file.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)] text-center space-y-1">
                <div>✓ 100% Code Ownership • No Monthly Licensing</div>
                <div>✓ Private &amp; Secure 256-bit Download Link</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Section: The Business Problem It Solves */}
        <section className="py-12 border-t border-[var(--border)]">
          <div className="max-w-3xl">
            <Badge variant="gold" className="text-xs mb-3">
              The Operational Bottleneck
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-4 font-semibold">
              The Problem This Workflow Solves
            </h2>
            <p className="text-base text-[var(--muted)] leading-relaxed">
              {product.businessProblem}
            </p>
          </div>
        </section>

        {/* Section: Workflow Architecture & Node Sequence */}
        <section className="py-12 border-t border-[var(--border)]">
          <Badge variant="gold" className="text-xs mb-3">
            Execution Logic
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-4 font-semibold">
            Workflow Architecture &amp; Node Pipeline
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mb-8 leading-relaxed">
            {product.workflowDiagramDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[var(--gold)]">
                      NODE 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded uppercase bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]">
                      {step.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text)] mb-2">
                    {step.node}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Required Third-Party Accounts & API Costs */}
        <section className="py-12 border-t border-[var(--border)]">
          <Badge variant="gold" className="text-xs mb-3">
            Prerequisites &amp; Transparency
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-4 font-semibold">
            Tools and accounts to connect
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mb-6">
            This workflow connects to third-party services that you configure with your own accounts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {product.requiredApiKeys.map((req, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="text-sm font-semibold text-[var(--text)] mb-1">
                  {req.service}
                </div>
                <div className="text-xs text-[var(--muted)] mb-3">
                  {req.description}
                </div>
                
              </div>
            ))}
          </div>

          {/* Security Warning Alert */}
          <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-amber-800/40 text-xs text-[var(--gold)] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-[var(--gold)] mb-0.5">
                Credential Security Notice:
              </strong>
              Never share your API keys, private system tokens, or exported JSON files containing sensitive credentials with unauthorized third parties. All credentials must be stored inside your private n8n credential vault.
            </div>
          </div>
        </section>

        {/* Section: Step-by-Step Installation Guide */}
        <section className="py-12 border-t border-[var(--border)]">
          <Badge variant="gold" className="text-xs mb-3">
            Deployment Guide
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-6 font-semibold">
            How to Install &amp; Activate This Workflow
          </h2>

          <div className="space-y-4 max-w-3xl">
            {product.installationSteps.map((inst) => (
              <div
                key={inst.step}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xs font-mono font-bold text-[var(--gold)] shrink-0 mt-0.5">
                  0{inst.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[var(--text)] mb-1.5">
                    {inst.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {inst.instructions}
                  </p>
                  {inst.warning && (
                    <div className="mt-2.5 p-2 rounded bg-[var(--surface-2)] border border-rose-800/40 text-xs text-[var(--err)]">
                      {inst.warning}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Frequently Asked Questions */}
        <section className="py-12 border-t border-[var(--border)] max-w-3xl">
          <Badge variant="gold" className="text-xs mb-3">
            Common Inquiries
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-6 font-semibold">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {product.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-medium text-[var(--text)] hover:text-[var(--gold)] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-[var(--muted)] ${
                        isOpen ? "rotate-180 text-[var(--gold)]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[var(--muted)] leading-relaxed border-t border-[var(--border)]/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--surface-2)] via-[var(--surface)] to-[var(--surface-2)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[var(--text)] mb-2">
              Ready to Automate {product.title.split(" ")[0]}?
            </h3>
            <p className="text-sm text-[var(--muted)] max-w-xl">
              Get instant access to the verified workflow JSON, prompt templates, and step-by-step installation checklist.
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => setCheckoutOpen(true)}
            className="shrink-0 font-semibold"
          >
            Discuss this workflow
          </Button>
        </div>
      </div>

      <CheckoutModal
        product={product}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
