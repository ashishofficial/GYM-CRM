import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: string;
  change?: { value: string; trend: "up" | "down"; label?: string };
  icon: LucideIcon;
  tone?: "brand" | "emerald" | "amber" | "rose" | "violet";
}

interface ToneStyle {
  icon: string;
  bg: string;
  blob: string;
  glow: string;
}

const toneStyles: Record<NonNullable<Props["tone"]>, ToneStyle> = {
  brand: {
    icon: "bg-brand-100 text-brand-700",
    bg: "bg-gradient-to-br from-white via-brand-50/40 to-brand-100/50",
    blob: "bg-brand-200/40",
    glow: "hover:shadow-[0_8px_24px_-12px_rgba(75,102,255,0.35)]",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-700",
    bg: "bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/50",
    blob: "bg-emerald-200/40",
    glow: "hover:shadow-[0_8px_24px_-12px_rgba(16,185,129,0.35)]",
  },
  amber: {
    icon: "bg-amber-100 text-amber-700",
    bg: "bg-gradient-to-br from-white via-amber-50/40 to-amber-100/50",
    blob: "bg-amber-200/40",
    glow: "hover:shadow-[0_8px_24px_-12px_rgba(245,158,11,0.35)]",
  },
  rose: {
    icon: "bg-rose-100 text-rose-700",
    bg: "bg-gradient-to-br from-white via-rose-50/40 to-rose-100/50",
    blob: "bg-rose-200/40",
    glow: "hover:shadow-[0_8px_24px_-12px_rgba(244,63,94,0.35)]",
  },
  violet: {
    icon: "bg-violet-100 text-violet-700",
    bg: "bg-gradient-to-br from-white via-violet-50/40 to-violet-100/50",
    blob: "bg-violet-200/40",
    glow: "hover:shadow-[0_8px_24px_-12px_rgba(139,92,246,0.35)]",
  },
};

export function KpiCard({ title, value, change, icon: Icon, tone = "brand" }: Props) {
  const style = toneStyles[tone];

  return (
    <Card
      hover
      gradient
      className={cn(
        "relative overflow-hidden p-4 sm:p-6",
        "border border-slate-200/60",
        style.bg,
        style.glow,
      )}
    >
      {/* Decorative tone blob */}
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl",
          style.blob,
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 sm:text-xs">
          {title}
        </p>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl ring-1 ring-white/60 sm:h-9 sm:w-9",
            style.icon,
          )}
        >
          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        </div>
      </div>
      <p className="relative mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-3xl">
        {value}
      </p>
      {change && (
        <div className="relative mt-2 flex flex-wrap items-center gap-1.5 text-xs sm:mt-3 sm:gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
              change.trend === "up"
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-red-50 text-red-700 ring-1 ring-red-200",
            )}
          >
            {change.trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change.value}
          </span>
          {change.label && (
            <span className="text-[11px] text-slate-500 sm:text-xs">{change.label}</span>
          )}
        </div>
      )}
    </Card>
  );
}
