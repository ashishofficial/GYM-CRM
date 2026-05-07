"use client";

import { cn, initials } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  xs: { class: "h-6 w-6 text-[10px]", px: 24 },
  sm: { class: "h-8 w-8 text-xs", px: 32 },
  md: { class: "h-10 w-10 text-sm", px: 40 },
  lg: { class: "h-14 w-14 text-base", px: 56 },
  xl: { class: "h-20 w-20 text-xl", px: 80 },
};

export function Avatar({ src, name, size = "md", className }: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;
  const dim = sizes[size];

  // Data URLs (uploaded images) bypass Next.js image optimization since the
  // image is already inline; next/image's optimizer can't process data: URIs.
  const isDataUrl = typeof src === "string" && src.startsWith("data:");

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-semibold text-white ring-2 ring-white",
        dim.class,
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src!}
          alt={name}
          width={dim.px}
          height={dim.px}
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
          unoptimized={isDataUrl}
          sizes={`${dim.px}px`}
        />
      ) : (
        <span>{initials(name)}</span>
      )}
    </div>
  );
}
