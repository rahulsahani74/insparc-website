"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Workflow,
  Bot,
  MessageCircle,
  Smartphone,
  TrendingUp,
  Database,
  Mail,
  FileText,
  Layers,
  Cpu,
  Sparkles,
  Lightbulb,
  Search,
  Target,
  Share2,
  Layout,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, LucideIcon> = {
  Workflow,
  Bot,
  MessageCircle,
  Smartphone,
  TrendingUp,
  Database,
  Mail,
  FileText,
  Layers,
  Cpu,
  Sparkles,
  Lightbulb,
  Search,
  Target,
  Share2,
  Layout,
  BarChart3,
};

export function ServicesGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "ai-automation" | "digital-marketing">("ai-automation");

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <section id="automation" className="py-20 sm:py-28 bg-[var(--surface)] relative border-t border-[var(--border)]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <Badge variant="gold" className="mb-4 px-3 py-1 text-xs gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>What we do</span>
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-5 font-semibold">
            Make work clearer.{" "}
            <span className="text-[var(--gold)] italic font-serif">Help business grow.</span>
          </h2>

          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Practical support for customer enquiries, business operations and digital marketing. Explore what we do and the deliverables you can expect.
          </p>

          {/* Category Filter Tabs */}
          <div role="group" aria-label="Filter services" className="flex flex-wrap justify-center items-center gap-2 p-1.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
            <button
              onClick={() => setActiveTab("ai-automation")}
              aria-pressed={activeTab === "ai-automation"}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                activeTab === "ai-automation"
                  ? "bg-[var(--gold)] text-slate-950 font-semibold shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Business Operations</span>
              <span className="px-1.5 rounded-full text-xs border border-current">12</span>
            </button>

            <button
              onClick={() => setActiveTab("digital-marketing")}
              aria-pressed={activeTab === "digital-marketing"}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                activeTab === "digital-marketing"
                  ? "bg-[var(--gold)] text-slate-950 font-semibold shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Digital Marketing</span>
              <span className="px-1.5 py-0.2 rounded-full text-xs bg-[var(--border)] text-[var(--text)] font-mono">5</span>
            </button>

            <button
              onClick={() => setActiveTab("all")}
              aria-pressed={activeTab === "all"}
              className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-[var(--gold)] text-slate-950 font-semibold shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              All Services
            </button>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.icon] ?? Workflow;
            const isAI = service.category === "ai-automation";

            return (
              <Card
                key={service.slug}
                tilt={false}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[var(--surface-2)]/70 border-[var(--border)] hover:border-[var(--gold)]/70 transition-all duration-300 group hover:shadow-xl hover:shadow-[var(--gold)]/5"
              >
                <div>
                  {/* Top Bar: Icon & Category Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] group-hover:scale-105 group-hover:bg-[var(--gold)]/10 transition-all">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span
                      className={`text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isAI
                          ? "bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/30"
                          : "bg-[var(--surface-2)] text-[var(--run)] border-blue-800/40"
                      }`}
                    >
                      {isAI ? "Business Operations" : "Growth Marketing"}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-semibold text-[var(--text)] tracking-tight mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[var(--gold)] font-medium mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-5">
                    {service.summary}
                  </p>

                  {/* Problem Solved Badge */}
                  <div className="p-3 rounded-lg bg-[var(--surface)]/90 border border-[var(--border)]/60 mb-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--gold)] mb-1">
                      Problem It Solves:
                    </div>
                    <p className="text-xs text-[var(--text)] leading-snug">
                      {service.businessProblem}
                    </p>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                      Key Deliverables:
                    </div>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--muted)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)] shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* AI Integration differentiator if marketing */}
                  {service.aiIntegrationBenefit && (
                    <div className="p-2.5 rounded-lg bg-[var(--surface-2)] border border-emerald-800/30 mb-6">
                      <div className="text-xs font-mono text-[var(--ok)] flex items-center gap-1 mb-0.5">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Advantage:</span>
                      </div>
                      <p className="text-xs text-[var(--ok)] leading-tight">
                        {service.aiIntegrationBenefit}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[var(--border)]/70 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-[var(--text)] hover:text-[var(--gold)] inline-flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Explore the service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button size="sm" variant="secondary" asChild className="text-xs h-8 px-3 border-[var(--border)]">
                    <Link href={`/contact?service=${encodeURIComponent(service.slug)}`}>
                      Consult
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Global CTA Box */}
        <div className="mt-16 p-8 rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--surface-2)] to-[var(--surface)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl font-semibold text-[var(--text)] mb-2">
              Need a plan for your business?
            </h3>
            <p className="text-sm text-[var(--muted)]">
              Tell us where customers need help and which tasks slow your team down.
              We will agree a practical scope and clear deliverables with you.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button size="md" variant="primary" asChild>
              <Link href="/audit">Start a Business Audit</Link>
            </Button>
            <Button size="md" variant="secondary" asChild>
              <Link href="/products">Explore Business Solutions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
