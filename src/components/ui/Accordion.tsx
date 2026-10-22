"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Accessible accordion for FAQ sections.
 * Keyboard navigable, uses aria-expanded and aria-controls.
 * Only one item open at a time.
 */
export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("divide-y divide-[var(--border)]", className)} role="list">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const triggerId = `accordion-trigger-${item.id}`;

        return (
          <div key={item.id} role="listitem">
            <button
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className={cn(
                "w-full flex items-center justify-between gap-4",
                "py-5 text-left",
                "text-[var(--text)] font-medium text-base",
                "hover:text-[var(--gold)] transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2 rounded-sm",
                "min-h-[44px]"
              )}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 shrink-0 text-[var(--muted)] transition-transform duration-300",
                  isOpen && "rotate-180 text-[var(--gold)]"
                )}
                aria-hidden="true"
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "pb-5" : "h-0"
              )}
            >
              <p className="text-[var(--muted)] text-sm leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
