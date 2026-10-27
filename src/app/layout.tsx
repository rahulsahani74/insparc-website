import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { PageExperience } from "@/components/story/PageExperience";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import "@designcodeio/threeui/style.css";
import "./globals.css";
import "./sketchbook-theme.css";

// ── Root metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url || "http://localhost:3000"),
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [siteConfig.ogImage] },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
};

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="font-sans antialiased"
    >
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [
          { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url, description: siteConfig.description },
          { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: siteConfig.url, publisher: { "@id": `${siteConfig.url}/#organization` }, inLanguage: "en-IN" },
        ] }} />
        <PageExperience />
        {/* Skip navigation — accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <LenisProvider>
          <AnnouncementBar />
          <Navbar />

          <main id="main-content" className="flex-1 min-w-0" tabIndex={-1}>
            {children}
          </main>

          <Footer />
        </LenisProvider>

        {/* WhatsApp FAB is outside Lenis to avoid transform conflicts */}
        <WhatsAppFab />
      </body>
    </html>
  );
}
