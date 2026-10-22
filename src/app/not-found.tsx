import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <p className="text-8xl font-display font-semibold text-[var(--gold)] mb-4" aria-hidden="true">
        404
      </p>
      <h1 className="text-display-md font-display text-[var(--text)] mb-4">
        Page not found
      </h1>
      <p className="text-[var(--muted)] text-body-md max-w-sm mb-8">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-8 py-3.5 rounded-pill bg-[var(--gold)] text-[#0B1020] font-semibold hover:bg-[var(--gold-soft)] transition-colors duration-200 min-h-[52px]"
      >
        Back to Home
      </Link>
    </section>
  );
}
