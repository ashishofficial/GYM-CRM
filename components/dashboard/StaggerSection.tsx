import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Wraps a dashboard section with a staggered fade-up entrance animation.
 * `delay` is in milliseconds; pass increasing values per section so they
 * appear in sequence on first paint.
 */
export function StaggerSection({ children, delay = 0, className }: Props) {
  return (
    <div
      className={`animate-fade-up ${className ?? ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
