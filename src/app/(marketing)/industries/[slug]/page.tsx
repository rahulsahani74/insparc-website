import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  GitCommit,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { industries } from "@/data/industries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getWhatsAppUrl } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const industryIconMap: Record<string, LucideIcon> = {
  "clinics-healthcare": Stethoscope,
  "healthcare-administration": Stethoscope,
  "real-estate": Building2,
  "coaching-education": GraduationCap,
  "coaches-consultants": GraduationCap,
  "ecommerce-retail": ShoppingBag,
  "agencies-service-businesses": Building2,
  "saas-companies": Building2,
  "small-medium-businesses": Building2,
};

export async function generateStaticParams() {
  return industries.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};

  return buildSeo({
    title: `${industry.name} Automation Playbook`,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const Icon = industryIconMap[industry.slug] ?? Building2;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all industries</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <Badge variant="gold" className="text-xs">
              Industry Blueprint
            </Badge>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-4">
            {industry.name}
          </h1>
          <p className="text-xl font-mono text-[var(--gold)] mb-6">{industry.tagline}</p>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            {industry.summary}
          </p>
        </div>

        {/* Pain Points vs Solutions Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Common Friction Points */}
          <Card className="p-8 bg-[var(--surface)] border-[var(--err)]/30">
            <div className="flex items-center gap-2.5 text-[var(--err)] mb-6">
              <AlertCircle className="w-5 h-5" />
              <h2 className="font-display text-xl text-[var(--text)]">
                Common Operational Bottlenecks
              </h2>
            </div>
            <ul className="space-y-4" role="list">
              {industry.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--muted)]">
                  <span className="text-[var(--err)] font-bold mt-0.5">✕</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Insparc Engineered Solutions */}
          <Card className="p-8 bg-[var(--surface)] border-[var(--ok)]/40 shadow-lg">
            <div className="flex items-center gap-2.5 text-[var(--ok)] mb-6">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="font-display text-xl text-[var(--text)]">
                Insparc Automated Solutions
              </h2>
            </div>
            <ul className="space-y-4" role="list">
              {industry.solutions.map((sol) => (
                <li key={sol} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text)]">
                  <span className="text-[var(--ok)] font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{sol}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sample Execution Sequence */}
        <section className="p-8 sm:p-10 rounded-card border border-[var(--border)] bg-[var(--surface-2)] mb-20">
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-2">
            A Possible Customer Journey
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] mb-8">
            A possible customer journey, tailored to your team and agreed responsibilities.
          </p>

          <div className="space-y-4">
            {industry.sampleFlow.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 font-mono text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-[var(--gold)] shrink-0" />
                  <p className="text-xs sm:text-sm font-medium text-[var(--text)]">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Callout */}
        <div className="p-8 sm:p-12 rounded-card bg-[radial-gradient(ellipse_at_top,#151C36_0%,#0B1020_100%)] border border-[var(--gold)]/30 text-center">
          <h3 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
            Plan This Service For Your {industry.name}.
          </h3>
          <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl mx-auto mb-8">
            We will customize the triggers, database schemas, and message copy to match your exact business rules.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href={`/contact?industry=${encodeURIComponent(industry.name)}`} className="gap-2">
                <span>Request Custom Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a
                href={getWhatsAppUrl(`Hi! I'm interested in the ${industry.name} automation blueprint.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

