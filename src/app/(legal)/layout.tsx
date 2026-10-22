import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        {/* Lawyer Review Required Notice */}
        <div className="mb-8 p-4 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-[var(--text)]">
              Draft Legal Document — Professional Review Required
            </p>
            <p className="text-[11px] text-[var(--muted)] mt-0.5">
              This document is drafted for startup launch preview. Have a qualified attorney review
              and update `[COMPANY LEGAL NAME]`, `[ADDRESS]`, and governing jurisdiction prior to commercial deployment.
            </p>
          </div>
        </div>

        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <article className="prose prose-invert max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}

