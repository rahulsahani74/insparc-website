import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";

/**
 * Floating WhatsApp action button — fixed bottom-right.
 * Server component (no interactivity needed). Opens WhatsApp in a new tab.
 * Positioned to avoid covering important content on mobile (bottom: 24px).
 */
export function WhatsAppFab() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-whatsapp-fab
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[var(--gold)]/50 bg-[var(--surface)] text-[var(--gold)] shadow-lg hover:bg-[var(--surface-2)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
