import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/data/articles";
import { generateMetadata as buildSeo } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const article = articles.find((item) => item.slug === slug);
  return article ? buildSeo({ title: article.title, description: article.excerpt, path: `/blog/${slug}` }) : {};
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params; const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return <article className="story-shell py-16 sm:py-24">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, datePublished: article.published, author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }, mainEntityOfPage: `${siteConfig.url}/blog/${slug}` }} />
    <div className="mx-auto max-w-3xl"><Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)]"><ArrowLeft className="h-4 w-4" /> All articles</Link><p className="eyebrow mt-9">{article.category} / {article.readTime}</p><h1 className="story-heading mt-5">{article.title}</h1><p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">{article.excerpt}</p><p className="mt-6 border-b border-[var(--border)] pb-8 text-xs text-[var(--muted)]">Insparc Technologies · {article.date}</p>
      {article.sections.map((section) => <section key={section.title} className="mt-10" data-reveal><h2 className="font-display text-2xl sm:text-3xl">{section.title}</h2><p className="mt-4 text-base leading-[1.9] text-[var(--muted)]">{section.text}</p></section>)}
      {article.sources.length > 0 && <aside className="mt-10 border-t border-[var(--border)] pt-6"><p className="eyebrow mb-3">Further reading</p>{article.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--gold)]">{source.label}<ArrowUpRight className="h-4 w-4" /></a>)}</aside>}
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7"><h2 className="font-display text-2xl">What would this look like in your business?</h2><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--gold)]">Talk through your workflow <ArrowUpRight className="h-4 w-4" /></Link></div>
    </div>
  </article>;
}
