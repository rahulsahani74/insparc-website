import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? `textarea-${props.name ?? "field"}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--text)]">
            {label}
            {props.required && (
              <span className="text-[var(--gold)] ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          aria-describedby={
            [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full px-4 py-3 rounded-input resize-y",
            "bg-[var(--surface-2)] border border-[var(--border)]",
            "text-[var(--text)] text-sm placeholder:text-[var(--muted)]/60",
            "transition-colors duration-150",
            "focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "min-h-[120px]",
            error && "border-[var(--err)] focus:border-[var(--err)] focus:ring-[var(--err)]/50",
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-xs text-[var(--muted)]">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className="text-xs text-[var(--err)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
