"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { revenueByMonth } from "@/data/analytics";
import { useMounted } from "@/hooks/useMounted";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RevenueChart() {
  const mounted = useMounted();
  const max = Math.max(...revenueByMonth.map((d) => d.revenue));
  if (!mounted) return <Skeleton className="h-[260px] w-full" />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={revenueByMonth} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          cursor={{ fill: "#f1f5f9" }}
          contentStyle={{
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px -4px rgb(15 23 42 / 0.08)",
            fontSize: 12,
          }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
        />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
          {revenueByMonth.map((d, i) => (
            <Cell key={i} fill={d.revenue === max ? "#3346f5" : "#c2d4ff"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
