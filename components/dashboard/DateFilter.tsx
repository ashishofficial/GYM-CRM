"use client";

import { cn } from "@/lib/utils";

export type DateRange = "today" | "week" | "month" | "quarter";

const options: { label: string; value: DateRange }[] = [
  { label: "Today", value: "today" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Quarter", value: "quarter" },
];

export function DateFilter({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (v: DateRange) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-soft">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium transition-colors",
            value === o.value
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
