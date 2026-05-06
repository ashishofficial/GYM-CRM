"use client";

import { cn } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, error, children, ...rest }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "block h-10 w-full appearance-none rounded-lg border bg-white px-3 pr-9 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-brand-400 focus:ring-brand-100",
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    );
  },
);

Select.displayName = "Select";
