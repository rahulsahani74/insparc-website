"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Sticky navigation bar with blur-on-scroll effect.
 * Mobile: full-screen overlay menu with large touch targets.
 * Wordmark logo: Playfair Display text with a gold dot accent.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detect scroll to add blur/border
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav
          className="max-w-container mx-auto px-5 lg:px-8 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Wordmark logo */}
          <Link
            href="/"
            className="flex items-center gap-1 group"
            aria-label="Insparc Technology — home"
          >
            <span className="font-display text-2xl font-semibold text-[var(--text)] tracking-tight">
              Insparc
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mb-0.5 group-hover:scale-125 transition-transform duration-200"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {siteConfig.nav.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-pill text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "text-[var(--gold)]"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button asChild size="md" variant="primary">
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {menuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
          className="fixed inset-0 z-30 bg-[var(--bg)] pt-20 px-5 flex flex-col lg:hidden"
        >
          <ul className="flex flex-col gap-1 mt-4" role="list">
            {siteConfig.nav.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-4 rounded-lg text-xl font-medium transition-colors min-h-[56px]",
                      isActive
                        ? "text-[var(--gold)] bg-[var(--surface)]"
                        : "text-[var(--text)] hover:bg-[var(--surface)]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pb-8">
            <Button fullWidth size="lg" variant="primary" asChild>
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
