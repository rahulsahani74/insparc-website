"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function MarketplacePreviewSection() {
  // Show top 4 featured products on the homepage
  const featured = products.slice(0, 4);

  return (
    <section id="marketplace" className="py-20 sm:py-28 bg-[var(--surface-2)]/40 border-t border-[var(--border)] relative">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>Digital Products Store</span>
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-5 font-semibold">
            Ready-Made Automation Templates.{" "}
            <span className="text-[var(--gold)] italic font-serif">Instant Download.</span>
          </h2>

          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Need immediate automation without custom agency timelines? Purchase our production-tested n8n
            workflows, complete with genuine JSON exports, API integration guides, and configuration manuals.
          </p>
        </div>

        {/* 2x2 or 4-col Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to View All */}
        <div className="text-center">
          <Button size="lg" variant="secondary" asChild className="border-[var(--border)] bg-[var(--surface)]">
            <Link href="/products" className="inline-flex items-center gap-2 font-medium">
              <span>View All Ready-to-Use Workflows in Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
