import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";

// ── Fonts — loaded via next/font (self-hosted, no external network request) ──
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// ── Root metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(
    siteConfig.url === "[YOUR_DOMAIN_URL]" ? "http://localhost:3000" : siteConfig.url
  ),
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
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
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
        {/* Skip navigation — accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <LenisProvider>
          <AnnouncementBar />
          <Navbar />

          <main id="main-content" className="flex-1 pt-[72px]" tabIndex={-1}>
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
