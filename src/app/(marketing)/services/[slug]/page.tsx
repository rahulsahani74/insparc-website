import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MessageCircle,
  Bot,
  TrendingUp,
  Phone,
  FileText,
  Workflow,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getWhatsAppUrl } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Bot,
  TrendingUp,
  Phone,
  FileText,
  Workflow,
};

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return buildSeo({
    title: `${service.title} Services`,
    description: service.description.replace(/^\[.*?\]\s*—\s*/, ""),
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] ?? Workflow;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Breadcrumb Back Link */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all services</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="gold" className="text-xs">
                Custom Architecture
              </Badge>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="text-xl font-mono text-[var(--gold)] mb-6">
              {service.tagline}
            </p>
            <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed max-w-2xl">
              {service.description.replace(/^\[.*?\]\s*—\s*/, "")}
            </p>
          </div>

          {/* Quick Action Card (Right Side) */}
          <div className="lg:col-span-4">
            <Card className="p-6 bg-[var(--surface-2)] border-[var(--gold)]/40 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text)]">
                    Ready to deploy?
                  </h3>
                  <p className="text-xs text-[var(--muted)]">Custom quote within 24 hours</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Button fullWidth size="md" variant="primary" asChild>
                  <Link href={`/contact?service=${service.slug}`}>
                    Request This Service
                  </Link>
                </Button>
                <Button fullWidth size="md" variant="secondary" asChild>
                  <a
                    href={getWhatsAppUrl(`Hi, I'm interested in ${service.title} for my company.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat On WhatsApp
                  </a>
                </Button>
              </div>

              <p className="text-[11px] text-[var(--muted)]/70 text-center font-mono">
                No long-term lock-in • 100% workflow code ownership
              </p>
            </Card>
          </div>
        </div>

        {/* Features & Capabilities Breakdown */}
        <section className="py-12 border-t border-[var(--border)]">
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-8">
            Engineered Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat) => (
              <div
                key={feat}
                className="p-6 rounded-card border border-[var(--border)] bg-[var(--surface)] flex items-start gap-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--ok)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
                    {feat}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Designed with error-handling, fallback triggers, and encrypted payload routing.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 border-t border-[var(--border)]">
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-8">
            Ideal For High-Touch Sectors
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {service.useCases.map((uc) => (
              <div
                key={uc}
                className="p-5 rounded-card border border-[var(--border)] bg-[var(--surface-2)] text-center flex flex-col items-center justify-center min-h-[100px]"
              >
                <span className="text-sm font-medium text-[var(--text)]">
                  {uc}
                </span>
                <span className="text-[11px] font-mono text-[var(--gold)] mt-1">
                  High-Impact ROI
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <div className="mt-16 p-8 sm:p-12 rounded-card bg-[radial-gradient(ellipse_at_top,#151C36_0%,#0B1020_100%)] border border-[var(--border)] text-center">
          <h3 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
            Build Your {service.title} System.
          </h3>
          <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl mx-auto mb-8">
            Let us map your exact workflows and deliver a working prototype in your staging environment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="/contact" className="gap-2">
                <span>Schedule Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
