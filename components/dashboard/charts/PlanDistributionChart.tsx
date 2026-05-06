"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { members } from "@/data/members";
import { useMounted } from "@/hooks/useMounted";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS: Record<string, string> = {
  Basic: "#9bb6ff",
  Pro: "#3346f5",
  Elite: "#161a4f",
  Student: "#10b981",
};

export function PlanDistributionChart() {
  const mounted = useMounted();
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    members.forEach((m) => {
      const name = m.currentPlan?.planName ?? "No plan";
      counts[name] = (counts[name] ?? 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Skeleton className="h-[180px] w-[180px] shrink-0 rounded-full" />
        <div className="w-full space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-[180px] w-[180px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] ?? "#94a3b8"} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold text-slate-900">{total}</p>
          <p className="text-xs text-slate-500">members</p>
        </div>
      </div>
      <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
        {data.map((d) => (
          <li key={d.name} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: COLORS[d.name] ?? "#94a3b8" }}
              />
              <span className="text-slate-700">{d.name}</span>
            </span>
            <span className="font-medium text-slate-900">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
