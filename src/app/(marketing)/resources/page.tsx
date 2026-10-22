import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileCode, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Automation Resources & n8n Templates",
  description:
    "Free guides, n8n workflow blueprints, and AI prompt templates for operations and marketing automation.",
  path: "/resources",
});

const resources = [
  {
    title: "WhatsApp Business API Setup Checklist",
    category: "Guide",
    icon: BookOpen,
    desc: "Everything you need to get your Meta WhatsApp Business API account approved, phone numbers verified, and display names registered without getting blocked.",
    status: "Downloadable PDF",
  },
  {
    title: "n8n Lead Ingestion & Deduplication Template",
    category: "Workflow JSON",
    icon: FileCode,
    desc: "A ready-to-import n8n workflow that catches webhook leads from multiple forms, verifies existing emails in Google Sheets/CRM, and prevents duplicate alerts.",
    status: "JSON Template",
  },
  {
    title: "Clinic & Appointment Reminder Script Pack",
    category: "Prompts",
    icon: Sparkles,
    desc: "15 high-converting WhatsApp reminder and rescheduling prompt templates designed to reduce patient and client no-shows by up to 40%.",
    status: "Prompt Pack",
  },
  {
    title: "Small Business Automation Audit Framework",
    category: "Workbook",
    icon: BookOpen,
    desc: "A structured 5-page worksheet to calculate where your team spends manual hours and identify which tasks have the highest ROI to automate first.",
    status: "PDF Framework",
  },
];

export default function ResourcesPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Free Knowledge & Templates
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Automation Playbooks & <span className="text-[var(--gold)]">Templates.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Free resources, blueprints, and n8n workflow frameworks engineered to help your team
            understand what is possible with modern automation.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {resources.map((res) => {
            const Icon = res.icon;

            return (
              <Card
                key={res.title}
                className="p-8 bg-[var(--surface)] border-[var(--border)] flex flex-col justify-between group hover:border-[var(--gold)]/60 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-mono">
                      {res.category}
                    </Badge>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl text-[var(--text)] mb-3 group-hover:text-[var(--gold)] transition-colors">
                    {res.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-8">
                    {res.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--gold)]">{res.status}</span>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/contact?resource=Request+Template" className="gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      <span>Request Access</span>
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Custom Workflow Need Callout */}
        <div className="p-8 sm:p-12 rounded-card bg-[var(--surface-2)] border border-[var(--border)] text-center max-w-3xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-3">
            Looking For A Custom Workflow Template?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted)] mb-6 max-w-lg mx-auto">
            Tell us which apps you want to connect (e.g. WhatsApp, Airtable, HubSpot, Google Sheets)
            and we can share sample architecture files.
          </p>
          <Button size="md" variant="primary" asChild>
            <Link href="/contact" className="gap-2">
              <span>Request Custom Template</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

