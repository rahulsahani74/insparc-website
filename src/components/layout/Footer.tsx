import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "WhatsApp Automation", href: "/services/whatsapp-automation" },
    { label: "AI Chatbots", href: "/services/ai-chatbots" },
    { label: "Lead Automation", href: "/services/lead-automation" },
    { label: "Voice Agents", href: "/services/voice-agents" },
    { label: "Document AI", href: "/services/document-ai" },
    { label: "n8n Workflows", href: "/services/n8n-workflows" },
  ],
  Resources: [
    { label: "Projects", href: "/projects" },
    { label: "Live Demo", href: "/demo" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "FAQ", href: "/faq" },
    { label: "Resources", href: "/resources" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Security", href: "/security" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-auto">
      <div className="max-w-container mx-auto px-5 lg:px-8 py-16">
        {/* Top: wordmark + contact + link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 mb-4"
              aria-label="Insparc Technology — home"
            >
              <span className="font-display text-2xl font-semibold text-[var(--text)]">
                Insparc
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mb-0.5"
                aria-hidden="true"
              />
            </Link>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs mb-6">
              AI automation systems for small and mid-size businesses across India. We build the
              workflows that work while you sleep.
            </p>

            {/* Contact block */}
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)] text-center">
            Demo simulations on this site are illustrative only and do not represent actual client
            data.
          </p>
        </div>
      </div>
    </footer>
  );
}
