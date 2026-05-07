import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  /** When true, removes default white bg + slate border so the consumer
   *  can apply a gradient or custom surface. */
  gradient?: boolean;
}

export function Card({ className, hover, gradient, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border shadow-soft transition-all duration-200",
        gradient ? "border-transparent" : "border-slate-200/70 bg-white",
        hover && "hover:-translate-y-0.5 hover:shadow-md",
        !gradient && hover && "hover:border-slate-200",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-6 pt-5 pb-4",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm font-semibold tracking-tight text-slate-900", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-slate-500", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 px-6 pb-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-2 border-t border-slate-100 px-6 py-3", className)}
      {...props}
    />
  );
}
