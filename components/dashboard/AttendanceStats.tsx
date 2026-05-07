"use client";

import { Avatar } from "@/components/ui/Avatar";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { attendanceLast7Days } from "@/data/analytics";
import { members } from "@/data/members";
import { Activity } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const AttendanceMiniChart = dynamic(
  () =>
    import("./charts/AttendanceMiniChart").then((m) => m.AttendanceMiniChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[120px] w-full" />,
  },
);

export function AttendanceStats() {
  const todayCount = attendanceLast7Days[attendanceLast7Days.length - 1].count;
  const weekTotal = attendanceLast7Days.reduce((s, d) => s + d.count, 0);
  const previousWeekAvg = 45;
  const dailyAvg = Math.round(weekTotal / 7);
  const trendPct = Math.round(((dailyAvg - previousWeekAvg) / previousWeekAvg) * 100);

  const topActive = [...members]
    .sort((a, b) => b.attendanceThisMonth - a.attendanceThisMonth)
    .slice(0, 3);

  return (
    <ChartCard
      gradient
      className="relative overflow-hidden border border-slate-200/60 bg-gradient-to-br from-white via-sky-50/40 to-sky-100/40"
      title="Attendance"
      description="Last 7 days of check-ins"
      icon={Activity}
      bodyClassName="space-y-5"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Today
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{todayCount}</p>
          <p className="text-[10px] text-slate-400">check-ins</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            7-day total
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{weekTotal}</p>
          <p
            className={`text-[10px] font-semibold ${
              trendPct >= 0 ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {trendPct >= 0 ? "+" : ""}
            {trendPct}% vs prev. week
          </p>
        </div>
      </div>

      <AttendanceMiniChart />

      <div className="border-t border-slate-100 pt-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Most active members
        </p>
        <ul className="space-y-1.5">
          {topActive.map((m, i) => (
            <li
              key={m.id}
              className="flex items-center gap-3 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-slate-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                {i + 1}
              </span>
              <Avatar name={m.fullName} src={m.avatarUrl} size="sm" />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/members/${m.id}`}
                  className="block truncate text-xs font-medium text-slate-900 hover:text-brand-600"
                >
                  {m.fullName}
                </Link>
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {m.attendanceThisMonth}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}
