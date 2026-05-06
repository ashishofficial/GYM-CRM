"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          An unexpected error occurred. You can try again or head back to the dashboard.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-slate-400">Ref: {error.digest}</p>
        )}
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
