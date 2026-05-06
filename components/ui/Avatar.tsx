"use client";

import { cn, initials } from "@/lib/utils";
import { useState } from "react";

interface Props {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

export function Avatar({ src, name, size = "md", className }: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-semibold text-white ring-2 ring-white",
        sizes[size],
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span>{initials(name)}</span>
      )}
    </div>
  );
}
