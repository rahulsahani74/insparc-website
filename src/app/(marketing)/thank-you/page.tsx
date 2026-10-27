import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getWhatsAppUrl } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Thank You — Request Received",
  description: "We have received your automation request and will review your workflow within 24 hours.",
  noIndex: true,
  path: "/thank-you",
});

export default function ThankYouPage() {
  return (
    <div className="py-20 sm:py-32">
      <div className="max-w-2xl mx-auto px-5 text-center animate-fade-up">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[var(--ok)]/15 border border-[var(--ok)]/40 text-[var(--ok)] flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-[var(--text)] tracking-tight mb-4">
          Audit Request Received.
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed mb-10">
          Thank you for reaching out to Insparc Technologies. Our automation team has received your
          workflow notes and will begin reviewing your requirements.
        </p>

        {/* What Happens Next Card */}
        <Card className="p-7 bg-[var(--surface)] border-[var(--border)] text-left mb-10">
          <h2 className="font-display text-lg text-[var(--text)] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--gold)]" />
            <span>What to expect next:</span>
          </h2>
          <ol className="space-y-3.5 text-xs sm:text-sm text-[var(--muted)]">
            <li className="flex items-start gap-3">
              <span className="font-mono text-[var(--gold)] font-bold">01.</span>
              <span>
                <strong>System Assessment (Under 24h):</strong> An architect analyzes the
                your goals, agreed scope and the responsibilities involved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-[var(--gold)] font-bold">02.</span>
              <span>
                <strong>Direct Outreach:</strong> We will reach out via WhatsApp or email with
                suggested times for our free 30-min discovery session.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-[var(--gold)] font-bold">03.</span>
              <span>
                <strong>No Obligations:</strong> You get a clear breakdown of hours you can save
                without any commitment or software licensing markup.
              </span>
            </li>
          </ol>
        </Card>

        {/* Direct WhatsApp Fast-Track */}
        <div className="p-6 rounded-card border border-[var(--gold)]/30 bg-[var(--surface-2)] mb-10">
          <p className="text-sm font-semibold text-[var(--text)] mb-2">
            Have an urgent workflow or question?
          </p>
          <p className="text-xs text-[var(--muted)] mb-5">
            You can skip the queue and chat directly with our founder on WhatsApp.
          </p>
          <Button size="md" variant="primary" asChild>
            <a
              href={getWhatsAppUrl("Hi! I just submitted the audit form on your website and wanted to say hello.")}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect On WhatsApp</span>
            </a>
          </Button>
        </div>

        {/* Return Button */}
        <div>
          <Button size="md" variant="ghost" asChild>
            <Link href="/" className="gap-2">
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
