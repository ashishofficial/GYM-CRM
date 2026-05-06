"use client";

import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, error, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2",
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-slate-200 focus:border-brand-400 focus:ring-brand-100",
          className,
        )}
        {...rest}
      />
    );
  },
);

Textarea.displayName = "Textarea";
