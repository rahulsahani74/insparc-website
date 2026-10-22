import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Accessible text input with label, error, and hint support.
 * Always provide a label (visible or via aria-label).
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? `input-${props.name ?? "field"}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--text)]"
          >
            {label}
            {props.required && (
              <span className="text-[var(--gold)] ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-describedby={
            [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full px-4 py-2.5 rounded-input",
            "bg-[var(--surface-2)] border border-[var(--border)]",
            "text-[var(--text)] text-sm placeholder:text-[var(--muted)]/60",
            "transition-colors duration-150",
            "focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // Error state
            error && "border-[var(--err)] focus:border-[var(--err)] focus:ring-[var(--err)]/50",
            // Minimum touch target height
            "min-h-[44px]",
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

Input.displayName = "Input";
export { Input };
