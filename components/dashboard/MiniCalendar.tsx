"use client";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { members } from "@/data/members";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MiniCalendar() {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const expiriesByDay = useMemo(() => {
    const map = new Map<string, string[]>();
    members.forEach((m) => {
      if (!m.currentPlan) return;
      const exp = new Date(m.currentPlan.expiryDate);
      if (exp.getFullYear() === view.year && exp.getMonth() === view.month) {
        const key = String(exp.getDate());
        const list = map.get(key) ?? [];
        list.push(m.fullName);
        map.set(key, list);
      }
    });
    return map;
  }, [view]);

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prev = () =>
    setView(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 },
    );
  const next = () =>
    setView(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 },
    );

  const isToday = (day: number) =>
    today.getFullYear() === view.year &&
    today.getMonth() === view.month &&
    today.getDate() === day;

  return (
    <ChartCard
      title="Calendar"
      description="Plan expiries this month"
      icon={CalendarDays}
      actions={
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[100px] text-center text-xs font-semibold text-slate-700">
            {MONTH_LABELS[view.month]} {view.year}
          </span>
          <button
            onClick={next}
            className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100"
            aria-label="Next month"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      }
    >
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {DAY_LABELS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <span key={idx} />;
          const expiries = expiriesByDay.get(String(day));
          const today = isToday(day);
          return (
            <div
              key={idx}
              title={expiries?.join(", ")}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg text-xs transition-colors",
                today
                  ? "bg-brand-600 font-semibold text-white shadow-soft"
                  : expiries
                    ? "bg-amber-50 font-medium text-amber-700 ring-1 ring-amber-200 hover:bg-amber-100"
                    : "text-slate-700 hover:bg-slate-100",
              )}
            >
              {day}
              {expiries && !today && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-amber-500" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="flex items-center gap-1.5 text-slate-500">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Plan expiring
        </span>
        <span className="flex items-center gap-1.5 text-slate-500">
          <span className="h-2 w-2 rounded-full bg-brand-600" />
          Today
        </span>
      </div>
    </ChartCard>
  );
}
