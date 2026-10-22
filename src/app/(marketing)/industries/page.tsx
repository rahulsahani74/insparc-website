import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Stethoscope, GraduationCap, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { industries } from "@/data/industries";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Industry Automation Solutions — Real Estate, Healthcare, Education",
  description:
    "Explore tailored AI automation workflows for clinics, real estate firms, coaching institutes, and e-commerce companies.",
  path: "/industries",
});

const industryIconMap: Record<string, LucideIcon> = {
  "clinics-healthcare": Stethoscope,
  "real-estate": Building2,
  "coaching-education": GraduationCap,
  "ecommerce-retail": ShoppingBag,
};

export default function IndustriesPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Sector-Specific Playbooks
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Automation Tailored To <span className="text-[var(--gold)]">Your Industry.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Every sector faces distinct operational friction. Explore our battle-tested
            n8n and AI blueprints designed for your exact business model.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {industries.map((ind) => {
            const Icon = industryIconMap[ind.slug] ?? Building2;

            return (
              <Card
                key={ind.slug}
                className="p-8 bg-[var(--surface)] border-[var(--border)] flex flex-col justify-between group hover:border-[var(--gold)]/70 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h2 className="font-display text-2xl text-[var(--text)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {ind.name}
                  </h2>
                  <p className="text-xs font-mono text-[var(--gold)] mb-4">{ind.tagline}</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                    {ind.summary}
                  </p>

                  <div className="space-y-2 mb-8">
                    <p className="text-xs font-mono text-[var(--muted)]/60 uppercase">
                      Core Automations Delivered:
                    </p>
                    <ul className="space-y-1.5 text-xs text-[var(--text)]" role="list">
                      {ind.solutions.slice(0, 2).map((sol) => (
                        <li key={sol} className="flex items-start gap-2">
                          <span className="text-[var(--ok)] font-bold">✓</span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold)] hover:text-[var(--gold-soft)]"
                  >
                    <span>View Industry Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button size="sm" variant="secondary" asChild>
                    <Link href={`/contact?industry=${encodeURIComponent(ind.name)}`}>
                      Get Audit
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

