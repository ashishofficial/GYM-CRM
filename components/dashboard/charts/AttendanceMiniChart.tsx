"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { attendanceLast7Days } from "@/data/analytics";
import { useMounted } from "@/hooks/useMounted";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export function AttendanceMiniChart() {
  const mounted = useMounted();
  const max = Math.max(...attendanceLast7Days.map((d) => d.count));

  if (!mounted) return <Skeleton className="h-[120px] w-full" />;

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={attendanceLast7Days} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: "#f1f5f9" }}
          contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 11 }}
          formatter={(v) => [`${v} check-ins`, "Attendance"]}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {attendanceLast7Days.map((d, i) => (
            <Cell key={i} fill={d.count === max ? "#3346f5" : "#dde8ff"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
