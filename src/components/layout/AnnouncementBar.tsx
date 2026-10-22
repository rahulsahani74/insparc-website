"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Slim dismissible announcement bar at the very top of the page.
 * Dismissed state is stored in sessionStorage (resets each browser session).
 */
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("announcement-dismissed") === "1";
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("announcement-dismissed", "1");
  };

  return (
    <div
      role="banner"
      className="relative z-50 bg-[var(--gold)]/10 border-b border-[var(--gold)]/20 py-2 px-4"
    >
      <div className="max-w-container mx-auto flex items-center justify-center gap-3 text-sm">
        <p className="text-[var(--text)] text-center">
          {siteConfig.announcement.text}{" "}
          <a
            href={siteConfig.announcement.href}
            className="text-[var(--gold)] font-semibold underline underline-offset-2 hover:text-[var(--gold-soft)] transition-colors"
          >
            {siteConfig.announcement.cta} &rarr;
          </a>
        </p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/10 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
