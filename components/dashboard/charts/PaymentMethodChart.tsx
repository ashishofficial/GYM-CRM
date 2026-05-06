"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { members } from "@/data/members";
import { useMounted } from "@/hooks/useMounted";
import { formatCurrency } from "@/lib/utils";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS: Record<string, string> = {
  Card: "#3346f5",
  Cash: "#10b981",
  UPI: "#f59e0b",
  "Bank Transfer": "#8b5cf6",
};

export function PaymentMethodChart() {
  const mounted = useMounted();
  const data = useMemo(() => {
    const totals: Record<string, number> = {};
    members.forEach((m) =>
      m.payments
        .filter((p) => p.status === "Paid")
        .forEach((p) => {
          totals[p.method] = (totals[p.method] ?? 0) + p.amount;
        }),
    );
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, []);

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Skeleton className="h-[160px] w-[160px] shrink-0 rounded-full" />
        <div className="w-full space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-[160px] w-[160px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] ?? "#94a3b8"} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => formatCurrency(Number(v))}
              contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-base font-semibold text-slate-900">{formatCurrency(total)}</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">collected</p>
        </div>
      </div>
      <ul className="w-full space-y-2">
        {data.map((d) => {
          const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
          return (
            <li key={d.name}>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: COLORS[d.name] ?? "#94a3b8" }}
                  />
                  {d.name}
                </span>
                <span className="font-medium text-slate-900">
                  {formatCurrency(d.value)} · {pct}%
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: COLORS[d.name] ?? "#94a3b8",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
