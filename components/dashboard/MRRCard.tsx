import { Card } from "@/components/ui/Card";
import { Sparkline } from "@/components/ui/Sparkline";
import { churnRate, mrrSparkline } from "@/data/analytics";
import { members } from "@/data/members";
import { formatCurrency, getPlanStatus } from "@/lib/utils";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export function MRRCard() {
  const mrr = members
    .filter(
      (m) => m.currentPlan && getPlanStatus(m.currentPlan.expiryDate) !== "expired",
    )
    .reduce((sum, m) => {
      const p = m.currentPlan!;
      const monthly =
        p.duration === "Monthly" ? p.price : p.duration === "Quarterly" ? p.price / 3 : p.price / 12;
      return sum + monthly;
    }, 0);

  const churnDelta = churnRate.previous - churnRate.current;
  const churnImproving = churnDelta > 0;

  return (
    <Card hover className="overflow-hidden p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">MRR</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <DollarSign className="h-4.5 w-4.5" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {formatCurrency(mrr)}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
          <TrendingUp className="h-3 w-3" />
          +14.2%
        </span>
        <Sparkline data={mrrSparkline} stroke="#7c3aed" width={96} height={32} />
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-slate-100 pt-2 text-[11px]">
        <span className="font-semibold text-slate-700">Churn {churnRate.current}%</span>
        <span
          className={`inline-flex items-center gap-0.5 ${
            churnImproving ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {churnImproving ? (
            <TrendingDown className="h-3 w-3" />
          ) : (
            <TrendingUp className="h-3 w-3" />
          )}
          {Math.abs(churnDelta).toFixed(1)}pp vs last month
        </span>
      </div>
    </Card>
  );
}
