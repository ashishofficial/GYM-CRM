import { ChartCard } from "@/components/dashboard/ChartCard";
import { cohortRetention } from "@/data/analytics";
import { LineChart } from "lucide-react";

function retentionColor(pct: number) {
  if (pct >= 90) return "from-emerald-500 to-emerald-600";
  if (pct >= 85) return "from-brand-500 to-brand-600";
  if (pct >= 80) return "from-amber-500 to-amber-600";
  return "from-rose-500 to-rose-600";
}

export function CohortRetention() {
  const avgRetention = Math.round(
    cohortRetention.reduce((s, c) => s + c.percentage, 0) / cohortRetention.length,
  );
  const totalJoined = cohortRetention.reduce((s, c) => s + c.joined, 0);
  const totalRetained = cohortRetention.reduce((s, c) => s + c.retained, 0);

  return (
    <ChartCard
      title="Cohort retention"
      description="Percentage of members from each join cohort still active"
      icon={LineChart}
      actions={
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500">
            Avg{" "}
            <span className="font-semibold text-slate-900">{avgRetention}%</span>
          </span>
          <span className="text-slate-500">
            <span className="font-semibold text-slate-900">{totalRetained}</span>
            <span className="text-slate-400"> / {totalJoined} retained</span>
          </span>
        </div>
      }
    >
      <div className="space-y-3">
        {cohortRetention.map((c) => (
          <div key={c.cohort} className="flex items-center gap-3">
            <div className="w-16 shrink-0">
              <p className="text-xs font-semibold text-slate-700">{c.cohort}</p>
              <p className="text-[10px] text-slate-400">{c.joined} joined</p>
            </div>
            <div className="relative h-7 flex-1 overflow-hidden rounded-lg bg-slate-100">
              <div
                className={`absolute inset-y-0 left-0 flex items-center rounded-lg bg-gradient-to-r ${retentionColor(
                  c.percentage,
                )} px-2.5 transition-[width] duration-500`}
                style={{ width: `${c.percentage}%` }}
              >
                <span className="text-[10px] font-bold text-white">
                  {c.retained}/{c.joined}
                </span>
              </div>
            </div>
            <span className="w-12 text-right text-sm font-semibold text-slate-900">
              {c.percentage}%
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
