"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("insparc:scroll-lock", { detail: true }));
    const outside = Array.from(document.querySelectorAll<HTMLElement>("main, footer, [data-announcement], [data-whatsapp-fab]"));
    const previousInert = outside.map((element) => element.inert);
    outside.forEach((element) => { element.inert = true; });
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const close = () => { setMenuOpen(false); toggle.current?.focus(); };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab") return;
      const items = Array.from(header.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []).filter((node) => node.getClientRects().length > 0);
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 1280) setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      outside.forEach((element, index) => { element.inert = previousInert[index] ?? false; });
      window.dispatchEvent(new CustomEvent("insparc:scroll-lock", { detail: false }));
      document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header ref={header} className="sticky top-0 z-[60] border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="story-shell flex h-[76px] items-center justify-between gap-6">
        <Link href="/" onClick={() => setMenuOpen(false)} aria-label={`${siteConfig.name} home`} className="flex items-center gap-3">
          <span className="brand-symbol" aria-hidden="true"><span /><span /><span /></span>
          <span className="brand-name">Insparc<small>Technologies</small></span>
        </Link>
        <ul className="hidden items-center gap-6 xl:flex">
          {siteConfig.nav.map((item) => <li key={item.href}><Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={cn("inline-flex min-h-11 items-center text-xs transition-colors hover:text-[var(--gold)]", isActive(item.href) ? "text-[var(--gold)]" : "text-[var(--muted)]")}>{item.label}</Link></li>)}
        </ul>
        <Link href="/audit" className="story-button nav-contact">Start an audit <ArrowUpRight className="h-4 w-4" /></Link>
        <button ref={toggle} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] xl:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>
      {menuOpen && <div id="mobile-navigation" ref={panel} data-lenis-prevent className="absolute left-0 top-full h-[calc(100dvh-76px)] w-full overflow-y-auto border-b border-[var(--border)] bg-[var(--bg)] px-6 pb-24 pt-6 xl:hidden">
        <p className="eyebrow mb-5">Explore Insparc</p>
        <ul>{siteConfig.nav.map((item, index) => <li key={item.href}><Link href={item.href} onClick={() => setMenuOpen(false)} aria-current={isActive(item.href) ? "page" : undefined} className="flex min-h-16 items-center justify-between border-b border-[var(--border)] py-4 font-display text-2xl"><span className="flex items-center gap-5"><span className="font-mono text-xs text-[var(--gold)]">0{index + 1}</span>{item.label}</span><ArrowUpRight className="h-5 w-5 text-[var(--muted)]" /></Link></li>)}</ul>
        <Link href="/contact" className="story-button mt-8 w-full" onClick={() => setMenuOpen(false)}>Tell us what you’re building <ArrowUpRight className="h-4 w-4" /></Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)} className="mt-4 flex min-h-11 items-center justify-center text-sm text-[var(--muted)]">Talk to the studio</Link>
      </div>}
    </header>
  );
}
