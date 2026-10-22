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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5d] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
