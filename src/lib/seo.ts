import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageSeoProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
}

/**
 * Generates consistent Next.js Metadata for each page.
 * Import and call in each page's generateMetadata or export metadata.
 */
export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  path = "",
}: PageSeoProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageDescription = description ?? siteConfig.description;
  const pageImage = image ?? siteConfig.ogImage;
  const pageUrl = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.url === "[YOUR_DOMAIN_URL]" ? "http://localhost:3000" : siteConfig.url),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [{ url: pageImage, width: 1200, height: 630, alt: pageTitle }],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: pageUrl,
    },
  };
}
