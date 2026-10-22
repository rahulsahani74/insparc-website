import Link from "next/link";
import {
  MessageCircle,
  Bot,
  TrendingUp,
  Phone,
  FileText,
  Workflow,
  ArrowRight,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Bot,
  TrendingUp,
  Phone,
  FileText,
  Workflow,
};

export function ServicesGrid() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[var(--surface)] relative border-t border-[var(--border)]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3 py-1 text-xs">
            What We Build
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-5">
            Tailored Automation Engines.
          </h2>
          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Eliminate repetitive tasks, capture every inbound lead, and scale your
            business with specialized AI architectures.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Workflow;

            return (
              <Card
                key={service.slug}
                tilt={true}
                className="flex flex-col justify-between p-7 sm:p-8 group hover:border-[var(--gold)]/80 transition-all duration-300"
              >
                <div>
                  {/* Icon & Category Indicator */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] mb-6 group-hover:scale-110 group-hover:bg-[var(--gold)]/10 transition-all duration-300">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl sm:text-2xl text-[var(--text)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--gold)]/90 mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                    {service.description.replace(/^\[.*?\]\s*—\s*/, "")}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-8" role="list">
                    {service.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-[var(--muted)]"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--ok)] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--muted)]/60">
                    {service.useCases[0]}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold)] hover:text-[var(--gold-soft)] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

