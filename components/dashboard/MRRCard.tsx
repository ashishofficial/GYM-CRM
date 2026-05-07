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
        p.duration === "Monthly"
          ? p.price
          : p.duration === "Quarterly"
            ? p.price / 3
            : p.price / 12;
      return sum + monthly;
    }, 0);

  const churnDelta = churnRate.previous - churnRate.current;
  const churnImproving = churnDelta > 0;

  return (
    <Card
      hover
      gradient
      className="relative overflow-hidden p-4 text-white shadow-[0_8px_24px_-12px_rgba(124,58,237,0.45)] hover:shadow-[0_14px_36px_-12px_rgba(124,58,237,0.6)] sm:p-6"
    >
      {/* Gradient surface + decorative blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-brand-700 to-indigo-700" />
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
            MRR
          </p>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 backdrop-blur ring-1 ring-white/20 sm:h-9 sm:w-9">
            <DollarSign className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </div>
        </div>

        <p className="mt-3 text-2xl font-extrabold tracking-tight sm:mt-4 sm:text-3xl">
          {formatCurrency(mrr)}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:mt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold backdrop-blur ring-1 ring-white/15">
            <TrendingUp className="h-3 w-3" />
            +14.2%
          </span>
          <Sparkline data={mrrSparkline} stroke="#ffffff" fill="#ffffff" width={96} height={32} />
        </div>

        <div className="mt-2 flex items-center gap-1.5 border-t border-white/15 pt-2 text-[11px]">
          <span className="font-semibold text-white">Churn {churnRate.current}%</span>
          <span
            className={`inline-flex items-center gap-0.5 ${
              churnImproving ? "text-emerald-200" : "text-rose-200"
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
      </div>
    </Card>
  );
}
