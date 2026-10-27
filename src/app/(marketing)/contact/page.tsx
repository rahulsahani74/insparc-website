import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Book a Free Automation Audit & Contact Us",
  description:
    "Discuss customer enquiries, everyday business operations or digital marketing with Insparc Technologies.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams?: Promise<{
    service?: string;
    project?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialService = resolvedParams.service;
  const initialProject = resolvedParams.project;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Let us understand your business
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Book Your Free <span className="text-[var(--gold)]">Automation Audit.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Tell us about the repetitive tasks, manual data transfers, or missed customer inquiries
            slowing down your team. Let’s find a practical place to start.
          </p>
        </div>

        {/* 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct channels and audit details */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="p-7 bg-[var(--surface)] border-[var(--border)]">
              <h2 className="font-display text-xl text-[var(--text)] mb-6">
                Direct Communication
              </h2>

              <ul className="space-y-5" role="list">
                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase">
                      Instant WhatsApp
                    </p>
                    <a
                      href={getWhatsAppUrl("Hi! I would like to schedule a free automation audit.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[var(--text)] hover:text-[var(--gold)] transition-colors"
                    >
                      Chat with Founder on WhatsApp &rarr;
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase">
                      Phone Call
                    </p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-sm font-semibold text-[var(--text)] hover:text-[var(--gold)] transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase">
                      Email Inquiries
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-[var(--text)] hover:text-[var(--gold)] transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase">
                      Operating Location
                    </p>
                    <p className="text-sm text-[var(--text)]">{siteConfig.address}</p>
                  </div>
                </li>
              </ul>
            </Card>

            {/* What to expect card */}
            <Card className="p-7 bg-[var(--surface-2)] border-[var(--gold)]/30">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--gold)] uppercase mb-4">
                <Calendar className="w-4 h-4" />
                <span>What we discuss with you:</span>
              </div>

              <div className="space-y-3.5 text-xs text-[var(--muted)]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--ok)] shrink-0 mt-0.5" />
                  <span>
                    <strong>Your Priorities:</strong> We identify high-friction tasks
                    draining your team&apos;s hours each week.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--ok)] shrink-0 mt-0.5" />
                  <span>
                    <strong>Your Working Process:</strong> We review the current steps, responsibilities and where your customers or team need a clearer handoff.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--ok)] shrink-0 mt-0.5" />
                  <span>
                    <strong>A Practical Next Step:</strong> We discuss a suitable first scope, the people involved and what you should receive.
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Contact & Audit Request Form */}
          <div className="lg:col-span-7">
            <Card className="p-7 sm:p-9 bg-[var(--surface)] border-[var(--border)] shadow-2xl">
              <div className="mb-6">
                <h2 className="font-display text-2xl text-[var(--text)] mb-2">
                  Tell Us What You Need
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted)]">
                  Fill in the details below. We treat all business operational data under strict
                  confidentiality.
                </p>
              </div>

              <ContactForm
                initialService={initialService}
                initialProject={initialProject}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
