import { Card } from "@/components/ui/Card";
import { members } from "@/data/members";
import { plans } from "@/data/plans";
import { cn, formatCurrency, getPlanStatus } from "@/lib/utils";
import {
  ClipboardList,
  Crown,
  DollarSign,
  Users,
  type LucideIcon,
} from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  cardBg: string;
  blob: string;
}

function buildStats(): Stat[] {
  const activeSubscribers = members.filter(
    (m) => m.currentPlan && getPlanStatus(m.currentPlan.expiryDate) !== "expired",
  );

  const mrr = activeSubscribers.reduce((sum, m) => {
    const p = m.currentPlan!;
    const monthly =
      p.duration === "Monthly"
        ? p.price
        : p.duration === "Quarterly"
          ? p.price / 3
          : p.price / 12;
    return sum + monthly;
  }, 0);

  const counts: Record<string, number> = {};
  activeSubscribers.forEach((m) => {
    const name = m.currentPlan!.planName;
    counts[name] = (counts[name] ?? 0) + 1;
  });
  const topPlanEntry = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  return [
    {
      label: "Total plans",
      value: plans.length.toString(),
      icon: ClipboardList,
      iconBg: "bg-brand-100 text-brand-700",
      cardBg: "bg-gradient-to-br from-white via-brand-50/40 to-brand-100/40",
      blob: "bg-brand-200/40",
    },
    {
      label: "Active subscribers",
      value: activeSubscribers.length.toString(),
      icon: Users,
      iconBg: "bg-emerald-100 text-emerald-700",
      cardBg: "bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/40",
      blob: "bg-emerald-200/40",
    },
    {
      label: "Monthly recurring",
      value: formatCurrency(mrr),
      icon: DollarSign,
      iconBg: "bg-violet-100 text-violet-700",
      cardBg: "bg-gradient-to-br from-white via-violet-50/40 to-violet-100/40",
      blob: "bg-violet-200/40",
    },
    {
      label: "Most popular",
      value: topPlanEntry ? `${topPlanEntry[0]} (${topPlanEntry[1]})` : "—",
      icon: Crown,
      iconBg: "bg-amber-100 text-amber-700",
      cardBg: "bg-gradient-to-br from-white via-amber-50/40 to-amber-100/40",
      blob: "bg-amber-200/40",
    },
  ];
}

export function PlansStats() {
  const stats = buildStats();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card
            key={s.label}
            hover
            gradient
            className={cn("relative border border-slate-200/60 p-4 sm:p-5", s.cardBg)}
          >
            <div
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl",
                s.blob,
              )}
            />
            <div className="relative flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/60",
                  s.iconBg,
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </p>
                <p className="mt-0.5 truncate font-mono text-xl font-bold tabular-nums text-slate-900 sm:text-2xl">
                  {s.value}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
