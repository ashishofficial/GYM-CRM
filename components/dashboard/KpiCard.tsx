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

const toneClasses: Record<NonNullable<Props["tone"]>, string> = {
  brand: "bg-brand-50 text-brand-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  violet: "bg-violet-50 text-violet-600",
};

export function KpiCard({ title, value, change, icon: Icon, tone = "brand" }: Props) {
  return (
    <Card hover className="p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
          {title}
        </p>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl sm:h-9 sm:w-9", toneClasses[tone])}>
          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:mt-4 sm:text-3xl">
        {value}
      </p>
      {change && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs sm:mt-3 sm:gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
              change.trend === "up"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700",
            )}
          >
            {change.trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change.value}
          </span>
          {change.label && <span className="text-[11px] text-slate-500 sm:text-xs">{change.label}</span>}
        </div>
      )}
    </Card>
  );
}
