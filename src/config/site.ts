/**
 * Single source of truth for all contact information, navigation links, and site metadata.
 * Never hardcode contact details anywhere else — always import from here.
 * Replace [PLACEHOLDER] values with real data before launch.
 */

export const siteConfig = {
  name: "Insparc Technology",
  tagline: "AI Automation That Works While You Sleep",
  description:
    "Insparc Technology builds AI-powered automation systems — WhatsApp chatbots, voice agents, lead automation, and n8n workflows — for small and mid-size businesses across India.",
  url: "[YOUR_DOMAIN_URL]", // e.g. https://insparc.in

  // ── Contact details ────────────────────────────────────────────────────────
  phone: "[YOUR_PHONE_NUMBER]",         // e.g. +91 98765 43210
  whatsappNumber: "[YOUR_WHATSAPP_NUMBER]", // digits only, e.g. 919876543210
  email: "[YOUR_EMAIL_ADDRESS]",        // e.g. hello@insparc.in
  address: "[YOUR_OFFICE_ADDRESS]",     // e.g. Pune, Maharashtra, India

  // ── Social links ───────────────────────────────────────────────────────────
  socials: {
    linkedin: "[YOUR_LINKEDIN_URL]",
    twitter: "[YOUR_TWITTER_URL]",
    instagram: "[YOUR_INSTAGRAM_URL]",
    youtube: "[YOUR_YOUTUBE_URL]",
  },

  // ── Navigation ─────────────────────────────────────────────────────────────
  nav: [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Demo", href: "/demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // ── Announcement bar ───────────────────────────────────────────────────────
  announcement: {
    text: "Book a free automation audit — limited slots available.",
    href: "/contact",
    cta: "Book Now",
  },

  // ── SEO defaults ──────────────────────────────────────────────────────────
  ogImage: "/og/default.png",
  locale: "en_IN",
  twitterHandle: "[YOUR_TWITTER_HANDLE]",
} as const;

// Convenience: WhatsApp click-to-chat URL with prefilled message
export function getWhatsAppUrl(message?: string): string {
  const encoded = encodeURIComponent(
    message ?? "Hi! I found Insparc Technology online and would like to learn more about your automation services."
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
