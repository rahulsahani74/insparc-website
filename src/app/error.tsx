"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="story-shell py-28 text-center"><p className="eyebrow justify-center">A small interruption</p><h1 className="story-heading mt-6">Let’s try that again.</h1><p className="mx-auto mt-5 max-w-md text-[var(--muted)]">This page couldn’t load properly. You can retry or return to the homepage.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={reset} className="story-button"><RotateCcw className="h-4 w-4" /> Try again</button><Link href="/" className="story-button story-button-secondary">Back to home</Link></div></div>;
}
