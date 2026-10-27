/**
 * Single source of truth for all contact information, navigation links, and site metadata.
 * Never hardcode contact details anywhere else — always import from here.
 * Replace [PLACEHOLDER] values with real data before launch.
 */

export const siteConfig = {
  name: "Insparc Technologies",
  tagline: "Automate the Work. Accelerate the Growth.",
  description:
    "Insparc Technologies helps businesses organise everyday work, improve customer follow-up and grow through thoughtful digital marketing.",
  url: "https://insparc.in",

  // ── Contact details ────────────────────────────────────────────────────────
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210",
  email: "hello@insparc.in",
  address: "Pune, Maharashtra, India",

  // ── Social links ───────────────────────────────────────────────────────────
  socials: {
    linkedin: "https://linkedin.com/company/insparc-technology",
    twitter: "https://twitter.com/insparc_tech",
    instagram: "https://instagram.com/insparc.in",
    youtube: "https://youtube.com/@insparc",
  },

  // ── Primary Navigation ─────────────────────────────────────────────────────
  nav: [
    { label: "Services", href: "/services" },
    { label: "Digital Marketing", href: "/digital-marketing" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Audit", href: "/audit" },
  ],

  // ── Announcement bar ───────────────────────────────────────────────────────
  announcement: {
    text: "Your next workflow starts with a good idea.",
    href: "/products",
    cta: "Explore business solutions",
  },

  // ── SEO defaults ──────────────────────────────────────────────────────────
  ogImage: "/opengraph-image",
  locale: "en_IN",
  twitterHandle: "@insparc_tech",
} as const;

// Convenience: WhatsApp click-to-chat URL with prefilled message
export function getWhatsAppUrl(message?: string): string {
  const encoded = encodeURIComponent(
    message ?? "Hi! I found Insparc Technologies online and would like to learn more about your automation services."
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
