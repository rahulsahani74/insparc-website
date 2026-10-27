import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generateMetadata as buildSeo } from "@/lib/seo";
import { articles } from "@/data/articles";

export const metadata: Metadata = buildSeo({
  title: "Business Notes & Practical Guides",
  description:
    "Practical notes on customer journeys, business planning and thoughtful service delivery.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Technical Insights
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Automation <span className="text-[var(--gold)]">Business Notes.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Practical planning notes and customer journey ideas from the
            teams improving customer journeys and everyday business processes.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {articles.map((post) => (
            <Card
              key={post.slug}
              className="p-7 bg-[var(--surface)] border-[var(--border)] flex flex-col justify-between group hover:border-[var(--gold)]/70 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge variant="gold" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs font-mono text-[var(--muted)]">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="font-display text-xl text-[var(--text)] mb-3 group-hover:text-[var(--gold)] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--muted)] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--gold)] hover:text-[var(--gold-soft)]"
                >
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Newsletter / Custom Topic Request */}
        <div className="p-8 sm:p-12 rounded-card bg-[var(--surface-2)] border border-[var(--border)] text-center max-w-2xl mx-auto">
          <Sparkles className="w-8 h-8 text-[var(--gold)] mx-auto mb-3" />
          <h3 className="font-display text-2xl text-[var(--text)] mb-2">
            Want A Specific Workflow Analyzed?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted)] mb-6 leading-relaxed">
            Tell us which customer journey or business challenge you would like us to explore.
          </p>
          <Button size="md" variant="primary" asChild>
            <Link href="/contact" className="gap-2">
              <span>Suggest A Workflow Topic</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
