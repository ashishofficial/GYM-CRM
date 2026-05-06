"use client";

import { useEffect, useState } from "react";

/**
 * Thin top-of-viewport progress bar.
 * Renders inside a `loading.tsx` and animates from 0% → 90% while the
 * route is compiling/streaming. Unmounts (and snaps to 100%) automatically
 * when the page is ready, because React unmounts loading.tsx.
 */
export function RouteProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(15);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        const remainder = 90 - p;
        return p + Math.max(1, remainder * 0.08);
      });
    }, 180);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 shadow-[0_0_8px_rgba(75,102,255,0.6)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
