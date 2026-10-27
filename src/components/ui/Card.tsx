import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable the 3D tilt hover effect */
  tilt?: boolean;
}

/**
 * Base card container with the project's surface color and border.
 * Pass tilt={true} for the perspective hover effect on service/project cards.
 */
export function Card({ className, tilt = false, ...props }: CardProps) {
  return (
    <div
      data-reveal
      className={cn(
        "rounded-card bg-[var(--surface)] border border-[var(--border)]",
        "shadow-card",
        // Tilt hover — CSS-only, GPU-accelerated
        tilt && [
          "transition-transform duration-[350ms] ease-out",
          "hover:[transform:perspective(900px)_rotateX(5deg)_rotateY(-5deg)_translateY(-6px)]",
          "hover:border-[var(--gold)] hover:shadow-gold-glow",
        ],
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-0", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 pt-0 flex items-center gap-3", className)}
      {...props}
    />
  );
}
