import { Card } from "@/components/ui/Card";
import { monthlyGoals } from "@/data/analytics";
import { cn } from "@/lib/utils";
import { Target } from "lucide-react";

interface GoalRowProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  accent: string;
}

function GoalRow({ label, current, target, unit, accent }: GoalRowProps) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  const formatVal = (v: number) =>
    unit === "$" ? `$${v.toLocaleString()}` : v.toLocaleString();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-900">{formatVal(current)}</span>
          <span className="text-slate-400"> / {formatVal(target)}</span>
        </p>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn("h-full rounded-full transition-[width] duration-500", accent)}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="w-10 text-right text-xs font-semibold text-slate-700">{pct}%</span>
      </div>
    </div>
  );
}

export function GoalProgress() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Target className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-slate-900">
              Monthly goals
            </h3>
            <p className="text-xs text-slate-500">
              Track progress against this month&apos;s targets
            </p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
          May 2026
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <GoalRow
          label={monthlyGoals.revenue.label}
          current={monthlyGoals.revenue.current}
          target={monthlyGoals.revenue.target}
          unit="$"
          accent="bg-gradient-to-r from-brand-500 to-brand-600"
        />
        <GoalRow
          label={monthlyGoals.newMembers.label}
          current={monthlyGoals.newMembers.current}
          target={monthlyGoals.newMembers.target}
          accent="bg-gradient-to-r from-emerald-500 to-emerald-600"
        />
        <GoalRow
          label={monthlyGoals.renewals.label}
          current={monthlyGoals.renewals.current}
          target={monthlyGoals.renewals.target}
          accent="bg-gradient-to-r from-amber-500 to-amber-600"
        />
      </div>
    </Card>
  );
}
