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
    <Card hover className="p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      {change && (
        <div className="mt-3 flex items-center gap-2 text-xs">
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
          {change.label && <span className="text-slate-500">{change.label}</span>}
        </div>
      )}
    </Card>
  );
}
