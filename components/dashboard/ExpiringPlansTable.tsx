"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { members } from "@/data/members";
import { daysBetween, formatDate } from "@/lib/utils";
import { CalendarClock, RefreshCcw } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export function ExpiringPlansTable() {
  const now = new Date();

  const rows = members
    .filter((m) => m.currentPlan)
    .map((m) => ({
      member: m,
      days: daysBetween(now, m.currentPlan!.expiryDate),
    }))
    .filter((r) => r.days <= 14)
    .sort((a, b) => a.days - b.days)
    .slice(0, 6);

  return (
    <ChartCard
      title="Expiring plans"
      description="Members with plans expiring soon"
      icon={CalendarClock}
      actions={
        <Link
          href="/members"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          View all
        </Link>
      }
      bodyClassName="px-0 pb-0"
    >
      {rows.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-slate-500 sm:px-6">
          No plans expiring in the next 2 weeks.
        </div>
      ) : (
        <ul className="max-h-[420px] divide-y divide-slate-100 overflow-y-auto scrollbar-thin">
          {rows.map(({ member: m, days }) => {
            const tone =
              days < 0 ? "danger" : days <= 3 ? "warning" : days <= 7 ? "info" : "neutral";
            const label =
              days < 0
                ? `${Math.abs(days)}d ago`
                : days === 0
                  ? "Today"
                  : `${days}d left`;
            return (
              <li
                key={m.id}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-slate-50 sm:px-6"
              >
                <Link
                  href={`/members/${m.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <Avatar name={m.fullName} src={m.avatarUrl} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {m.fullName}
                    </p>
                    <p className="truncate text-[11px] text-slate-500">
                      {m.currentPlan!.planName} · {formatDate(m.currentPlan!.expiryDate)}
                    </p>
                  </div>
                </Link>

                <Badge tone={tone} dot className="shrink-0 whitespace-nowrap">
                  {label}
                </Badge>

                <button
                  type="button"
                  title={`Renew ${m.fullName}'s plan`}
                  onClick={() => toast.success(`Renewal reminder sent to ${m.fullName}`)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  aria-label="Renew"
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </ChartCard>
  );
}
