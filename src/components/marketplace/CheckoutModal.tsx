"use client";

import Link from "next/link";
import { ArrowUpRight, FileJson, MessageCircle } from "lucide-react";
import type { DigitalProduct } from "@/data/products";
import { Modal } from "@/components/ui/Modal";
import { getWhatsAppUrl } from "@/config/site";

interface CheckoutModalProps { product: DigitalProduct; isOpen: boolean; onClose: () => void }

/** Frontend phase: give visitors a useful inquiry flow while online sales are not open. */
export function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  return <Modal isOpen={isOpen} onClose={onClose} title="Let’s find the right workflow">
    <div className="mb-5 flex items-start gap-4"><FileJson className="h-7 w-7 shrink-0 text-[var(--gold)]" /><div><h3 className="font-display text-xl">{product.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">Tell us which tools you use and what you want to connect. We can discuss this package and the setup help your team needs.</p></div></div>
    <div className="flex flex-wrap gap-3"><a href={getWhatsAppUrl(`Hi Insparc! I’m interested in ${product.title}. Can we discuss availability and setup?`)} target="_blank" rel="noopener noreferrer" className="story-button"><MessageCircle className="h-4 w-4" /> Ask about this workflow</a><Link href={`/contact?project=${encodeURIComponent(product.title)}`} className="story-button story-button-secondary" onClick={onClose}>Prepare a brief <ArrowUpRight className="h-4 w-4" /></Link></div>
    <p className="mt-5 text-xs text-[var(--muted)]">No payment is collected here.</p>
  </Modal>;
}
