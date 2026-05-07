import { Card } from "@/components/ui/Card";
import { members } from "@/data/members";
import { cn, formatCurrency, getPlanStatus } from "@/lib/utils";
import type { Offer } from "@/types";
import { CheckCircle2, Sparkles, Tag, Users, type LucideIcon } from "lucide-react";

interface Props {
  offers: Offer[];
}

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  cardBg: string;
  blob: string;
}

function buildStats(offers: Offer[]): Stat[] {
  const active = offers.filter((o) => o.active).length;

  // "Highest discount" — display the biggest single offer value
  const top = [...offers].sort((a, b) => {
    const av = a.type === "percentage" ? a.value : a.value;
    const bv = b.type === "percentage" ? b.value : b.value;
    return bv - av;
  })[0];
  const topLabel = top
    ? top.type === "percentage"
      ? `${top.value}%`
      : formatCurrency(top.value)
    : "—";

  const eligible = members.filter(
    (m) => m.currentPlan && getPlanStatus(m.currentPlan.expiryDate) !== "expired",
  ).length;

  return [
    {
      label: "Total offers",
      value: offers.length.toString(),
      icon: Tag,
      iconBg: "bg-brand-100 text-brand-700",
      cardBg: "bg-gradient-to-br from-white via-brand-50/40 to-brand-100/40",
      blob: "bg-brand-200/40",
    },
    {
      label: "Active",
      value: active.toString(),
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-700",
      cardBg: "bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/40",
      blob: "bg-emerald-200/40",
    },
    {
      label: "Highest discount",
      value: topLabel,
      icon: Sparkles,
      iconBg: "bg-violet-100 text-violet-700",
      cardBg: "bg-gradient-to-br from-white via-violet-50/40 to-violet-100/40",
      blob: "bg-violet-200/40",
    },
    {
      label: "Eligible members",
      value: eligible.toString(),
      icon: Users,
      iconBg: "bg-amber-100 text-amber-700",
      cardBg: "bg-gradient-to-br from-white via-amber-50/40 to-amber-100/40",
      blob: "bg-amber-200/40",
    },
  ];
}

export function OffersStats({ offers }: Props) {
  const stats = buildStats(offers);

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
