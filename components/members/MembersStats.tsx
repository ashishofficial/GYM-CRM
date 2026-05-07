import { Card } from "@/components/ui/Card";
import type { Member } from "@/types";
import { cn, getPlanStatus } from "@/lib/utils";
import { Activity, AlertTriangle, Users, XCircle, type LucideIcon } from "lucide-react";

interface Props {
  members: Member[];
}

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  cardBg: string;
  blob: string;
}

function buildStats(members: Member[]): Stat[] {
  let active = 0;
  let expiring = 0;
  let expired = 0;
  members.forEach((m) => {
    if (!m.currentPlan) {
      expired += 1;
      return;
    }
    const status = getPlanStatus(m.currentPlan.expiryDate);
    if (status === "active") active += 1;
    else if (status === "expiring") expiring += 1;
    else expired += 1;
  });

  return [
    {
      label: "Total members",
      value: members.length,
      icon: Users,
      iconBg: "bg-brand-100 text-brand-700",
      cardBg: "bg-gradient-to-br from-white via-brand-50/40 to-brand-100/40",
      blob: "bg-brand-200/40",
    },
    {
      label: "Active",
      value: active,
      icon: Activity,
      iconBg: "bg-emerald-100 text-emerald-700",
      cardBg: "bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/40",
      blob: "bg-emerald-200/40",
    },
    {
      label: "Expiring soon",
      value: expiring,
      icon: AlertTriangle,
      iconBg: "bg-amber-100 text-amber-700",
      cardBg: "bg-gradient-to-br from-white via-amber-50/40 to-amber-100/40",
      blob: "bg-amber-200/40",
    },
    {
      label: "Expired",
      value: expired,
      icon: XCircle,
      iconBg: "bg-rose-100 text-rose-700",
      cardBg: "bg-gradient-to-br from-white via-rose-50/40 to-rose-100/40",
      blob: "bg-rose-200/40",
    },
  ];
}

export function MembersStats({ members }: Props) {
  const stats = buildStats(members);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card
            key={s.label}
            hover
            gradient
            className={cn(
              "relative border border-slate-200/60 p-4 sm:p-5",
              s.cardBg,
            )}
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
                <p className="mt-0.5 font-mono text-2xl font-bold tabular-nums text-slate-900">
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
