import { forwardRef, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders as full-width block */
  fullWidth?: boolean;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Primary: gold background, deep-navy text
  primary:
    "bg-[var(--gold)] text-[var(--surface)] font-medium hover:bg-[var(--gold-soft)] active:translate-y-0.5 shadow-sm",
  // Secondary: gold outline, no fill
  secondary:
    "border border-[var(--gold)] text-[var(--gold)] bg-transparent hover:bg-[var(--gold)]/10 active:translate-y-0.5",
  // Ghost: subtle, for navigation-style actions
  ghost:
    "text-[var(--muted)] bg-transparent hover:text-[var(--text)] hover:bg-[var(--surface-2)] active:translate-y-0.5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-[36px]",
  md: "px-6 py-2.5 text-base min-h-[44px]",
  lg: "px-8 py-3.5 text-lg min-h-[52px]",
};

/**
 * Primary interactive element. Variants: primary (gold), secondary (outline), ghost.
 * Supports asChild pattern without leaking asChild to DOM elements.
 * Accessible: min 44px touch target for md/lg, visible focus ring, disabled state.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      asChild = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const combinedClassName = cn(
      // Base styles
      "inline-flex items-center justify-center gap-2",
      "rounded-pill font-medium",
      "transition-all duration-200",
      "cursor-pointer select-none",
      "focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2",
      // Disabled state
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      // Variant and size
      variantClasses[variant],
      sizeClasses[size],
      // Optional full width
      fullWidth && "w-full",
      className
    );

    // If asChild is true, clone child element and merge classes, avoiding button wrapper
    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(combinedClassName, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        aria-busy={loading}
        className={combinedClassName}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
