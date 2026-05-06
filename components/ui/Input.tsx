"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, iconLeft, iconRight, error, ...rest }, ref) => {
    return (
      <div className="relative">
        {iconLeft && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "block h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-50",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-brand-400 focus:ring-brand-100",
            iconLeft && "pl-10",
            iconRight && "pr-10",
            className,
          )}
          {...rest}
        />
        {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{iconRight}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
