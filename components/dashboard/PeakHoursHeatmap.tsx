import { ChartCard } from "@/components/dashboard/ChartCard";
import { peakHoursData } from "@/data/analytics";
import { Flame } from "lucide-react";

function intensityClass(value: number) {
  if (value >= 90) return "bg-brand-700";
  if (value >= 75) return "bg-brand-600";
  if (value >= 60) return "bg-brand-500";
  if (value >= 45) return "bg-brand-400";
  if (value >= 30) return "bg-brand-300";
  if (value >= 15) return "bg-brand-200";
  return "bg-slate-100";
}

function intensityTextClass(value: number) {
  return value >= 60 ? "text-white" : "text-slate-700";
}

export function PeakHoursHeatmap() {
  let peakValue = 0;
  let peakDay = "";
  let peakHour = "";
  peakHoursData.rows.forEach((row) => {
    row.values.forEach((v, i) => {
      if (v > peakValue) {
        peakValue = v;
        peakDay = row.day;
        peakHour = peakHoursData.hours[i];
      }
    });
  });

  return (
    <ChartCard
      title="Peak hours"
      description="When your gym is busiest"
      icon={Flame}
      actions={
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
          Peak {peakDay} {peakHour}
        </span>
      }
      bodyClassName="px-3 sm:px-6"
    >
      {/* Horizontal scroll on small screens; scrollbar styled */}
      <div className="-mx-3 overflow-x-auto px-3 scrollbar-thin sm:mx-0 sm:px-0">
        <div className="min-w-[520px] space-y-1.5">
          {/* Hour labels */}
          <div className="flex gap-1 pl-9">
            {peakHoursData.hours.map((h, i) => (
              <div
                key={h}
                className={`flex-1 text-center text-[9px] font-semibold uppercase ${
                  i % 2 === 0 ? "text-slate-500" : "text-transparent"
                }`}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {peakHoursData.rows.map((row) => (
            <div key={row.day} className="flex items-center gap-1">
              <div className="w-8 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {row.day}
              </div>
              <div className="flex flex-1 gap-1">
                {row.values.map((v, i) => (
                  <div
                    key={i}
                    title={`${row.day} ${peakHoursData.hours[i]} · ${v} check-ins`}
                    className={`relative aspect-square flex-1 cursor-pointer rounded-md ring-1 ring-inset ring-transparent transition-[box-shadow,filter] duration-150 hover:brightness-110 hover:ring-slate-900/40 ${intensityClass(
                      v,
                    )}`}
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 hidden items-center justify-center text-[9px] font-bold xl:flex ${intensityTextClass(
                        v,
                      )}`}
                    >
                      {v >= 50 ? v : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-slate-500">
        <span className="hidden sm:inline">Less</span>
        {[
          "bg-slate-100",
          "bg-brand-200",
          "bg-brand-300",
          "bg-brand-400",
          "bg-brand-500",
          "bg-brand-600",
          "bg-brand-700",
        ].map((c) => (
          <span key={c} className={`h-2.5 w-3 rounded-sm ${c}`} />
        ))}
        <span className="hidden sm:inline">More</span>
      </div>
    </ChartCard>
  );
}
