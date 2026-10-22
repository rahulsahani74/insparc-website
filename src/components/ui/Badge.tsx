import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "gold" | "run" | "ok" | "err" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)]",
  gold: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/30",
  run: "bg-[var(--run)]/15 text-[var(--run)] border-[var(--run)]/30",
  ok: "bg-[var(--ok)]/15 text-[var(--ok)] border-[var(--ok)]/30",
  err: "bg-[var(--err)]/15 text-[var(--err)] border-[var(--err)]/30",
  outline: "bg-transparent text-[var(--muted)] border-[var(--border)]",
};

/**
 * Small status label. Use variant to communicate semantic meaning.
 * Never use color alone to convey information (accessibility).
 */
export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        "leading-none whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
