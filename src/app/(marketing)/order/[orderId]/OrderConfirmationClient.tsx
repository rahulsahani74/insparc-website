"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  FileCode2,
  MessageCircle,
  Lock,
} from "lucide-react";
import type { DigitalProduct } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getWhatsAppUrl } from "@/config/site";

interface OrderConfirmationClientProps {
  orderId: string;
  product: DigitalProduct;
}

export function OrderConfirmationClient({
  orderId,
  product,
}: OrderConfirmationClientProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        {/* Success Header */}
        <div className="p-8 rounded-3xl bg-[var(--surface-2)] border border-emerald-500/40 shadow-2xl text-center mb-10 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] border border-emerald-800 flex items-center justify-center text-[var(--ok)] mx-auto mb-5 shadow-lg shadow-emerald-950/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <Badge variant="gold" className="text-xs mb-3 font-mono">
            Payment Verified &amp; Authorized
          </Badge>

          <h1 className="font-display text-3xl sm:text-4xl text-[var(--text)] tracking-tight mb-2 font-semibold">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto mb-4">
            Your purchase has been verified and your files are ready for instant download below.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-[var(--gold)]">
            <span>Order ID:</span>
            <strong className="text-[var(--text)]">{orderId}</strong>
          </div>
        </div>

        {/* Deliverables Download Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] mb-10 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">
                {product.title}
              </h2>
              <span className="text-xs text-[var(--muted)]">
                Secure digital package • Cryptographically authorized
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ok)]">
              <Lock className="w-3.5 h-3.5" />
              <span>Token Active (24h)</span>
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-3 mb-8">
            {product.downloadFiles.map((file, idx) => {
              const downloadUrl = `/api/download?token=${encodeURIComponent(
                token
              )}&file=${encodeURIComponent(file.fileName)}`;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[var(--gold)]/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] shrink-0 mt-0.5">
                      <FileCode2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text)]">
                        {file.fileName}
                      </div>
                      <div className="text-xs text-[var(--muted)] flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-xs text-[var(--gold)]">
                          {file.format}
                        </span>
                        <span>•</span>
                        <span>{file.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={downloadUrl}
                    download={file.fileName}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--gold)] text-slate-950 text-xs font-semibold hover:brightness-110 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Next Steps: How to Import Into n8n */}
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--gold)] mb-3">
              Quick Start Checklist:
            </h3>
            <ol className="space-y-2 text-xs text-[var(--muted)] list-decimal list-inside leading-relaxed">
              <li>Open your n8n workspace canvas and click <strong>&quot;Import from File&quot;</strong>.</li>
              <li>Upload the downloaded <code className="text-[var(--gold)]">.json</code> file.</li>
              <li>Configure your credentials under n8n Credentials Manager using our setup guide.</li>
              <li>Test the execution with the included sample payload before toggling to Active.</li>
            </ol>
          </div>
        </div>

        {/* Support & Retrieval Help */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div>
            <div className="text-sm font-semibold text-[var(--text)] mb-1">
              Need assistance with setup or custom integrations?
            </div>
            <div>Our automation architects can guide your deployment over WhatsApp or Google Meet.</div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button size="sm" variant="secondary" asChild className="border-[var(--border)]">
              <a
                href={getWhatsAppUrl(`Hi, I just bought ${product.title} (Order: ${orderId}) and need a quick question answered.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-[var(--ok)]" />
                <span>WhatsApp Help</span>
              </a>
            </Button>
            <Button size="sm" variant="secondary" asChild className="border-[var(--border)]">
              <Link href="/orders">
                Order Lookup
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
