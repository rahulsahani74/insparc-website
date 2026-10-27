"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Accessible modal dialog. Traps focus, closes on Escape, prevents body scroll.
 * Uses the native <dialog> element for best browser support and accessibility.
 */
export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // showModal provides native focus trap and Escape key handling
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("insparc:scroll-lock", { detail: true }));
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("insparc:scroll-lock", { detail: false }));
    }

    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("insparc:scroll-lock", { detail: false }));
    };
  }, [isOpen]);

  // Handle native dialog cancel event (Escape key)
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  // Close when clicking the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className={cn(
        // Reset browser dialog styles
        "p-0 m-auto border-0 rounded-card shadow-card max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl",
        "bg-[var(--surface)] text-[var(--text)]",
        // Backdrop
        "backdrop:bg-black/70 backdrop:backdrop-blur-sm",
        "open:animate-fade-up",
        className
      )}
      aria-labelledby="modal-title"
    >
      <div className="flex flex-col overflow-hidden max-h-[90dvh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h2
            id="modal-title"
            className="font-display text-xl font-semibold text-[var(--text)]"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={cn(
              "rounded-full p-1.5 text-[var(--muted)]",
              "hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-[var(--gold)]",
              "min-w-[44px] min-h-[44px] flex items-center justify-center"
            )}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto" data-lenis-prevent>{children}</div>
      </div>
    </dialog>
  );
}
