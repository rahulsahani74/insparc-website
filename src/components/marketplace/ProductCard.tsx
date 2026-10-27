"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { DigitalProduct } from "@/data/products";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckoutModal } from "@/components/marketplace/CheckoutModal";

interface ProductCardProps {
  product: DigitalProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--surface-2)] border-[var(--border)] hover:border-[var(--gold)]/70 transition-all duration-300 group hover:shadow-xl hover:shadow-[var(--gold)]/5">
        <div>
          {/* Top Metadata */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 uppercase tracking-wider">
              {product.category}
            </span>

          </div>

          {/* Title & Tagline */}
          <Link href={`/products/${product.slug}`} className="block group/title">
            <h3 className="text-lg font-semibold text-[var(--text)] tracking-tight mb-2 group-hover/title:text-[var(--gold)] transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-[var(--muted)] leading-relaxed mb-4 line-clamp-2">
            {product.summary}
          </p>

          {/* Tools required badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.toolsRequired.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]"
              >
                {tool.split(" ")[0]}
              </span>
            ))}
          </div>

          {/* Technical Specs pills */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]/60 text-xs text-[var(--muted)] mb-5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Setup: ~{product.setupTimeMinutes} mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[var(--ok)]" />
              <span>{product.setupDifficulty}</span>
            </div>
          </div>

          {/* Key Deliverables preview */}
          <div className="space-y-1.5 mb-6 text-xs text-[var(--muted)]">
            {product.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)] shrink-0 mt-0.5" />
                <span className="line-clamp-1 leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[var(--muted)]">Template package</div>
            <p className="text-sm text-[var(--muted)]">Discuss your requirements</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setCheckoutOpen(true)}
              className="text-xs font-semibold px-3 h-8 shadow-sm"
            >
              Enquire
            </Button>
            <Button size="sm" variant="secondary" asChild className="text-xs h-8 px-2.5 border-[var(--border)]">
              <Link href={`/products/${product.slug}`} aria-label={`View details of ${product.title}`}>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      <CheckoutModal
        product={product}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
