"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { membershipGrowth } from "@/data/analytics";
import { useMounted } from "@/hooks/useMounted";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function MembershipGrowthChart() {
  const mounted = useMounted();
  if (!mounted) return <Skeleton className="h-[260px] w-full" />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={membershipGrowth} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b66ff" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#4b66ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px -4px rgb(15 23 42 / 0.08)",
            fontSize: 12,
          }}
          labelStyle={{ color: "#475569", fontWeight: 600 }}
        />
        <Area
          type="monotone"
          dataKey="total"
          name="Total members"
          stroke="#3346f5"
          strokeWidth={2.5}
          fill="url(#growthFill)"
        />
        <Area
          type="monotone"
          dataKey="new"
          name="New joins"
          stroke="#10b981"
          strokeWidth={2}
          fill="transparent"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
