"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
      <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-[1] bg-slate-50/90 text-[11px] font-semibold uppercase tracking-wider text-slate-500 backdrop-blur">
            <tr>
              <th className="px-6 py-2.5">Member</th>
              <th className="px-6 py-2.5">Plan</th>
              <th className="px-6 py-2.5">Status</th>
              <th className="px-6 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                  No plans expiring in the next 2 weeks.
                </td>
              </tr>
            ) : (
              rows.map(({ member: m, days }) => {
                const tone =
                  days < 0 ? "danger" : days <= 3 ? "warning" : days <= 7 ? "info" : "neutral";
                const label =
                  days < 0
                    ? `${Math.abs(days)}d ago`
                    : days === 0
                      ? "Today"
                      : `${days}d left`;
                return (
                  <tr key={m.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <Link href={`/members/${m.id}`} className="flex items-center gap-3">
                        <Avatar name={m.fullName} src={m.avatarUrl} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {m.fullName}
                          </p>
                          <p className="truncate text-[11px] text-slate-500">
                            {formatDate(m.currentPlan!.expiryDate)}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">
                      {m.currentPlan!.planName}
                    </td>
                    <td className="px-6 py-3">
                      <Badge tone={tone} dot>
                        {label}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.success(`Renewal reminder sent to ${m.fullName}`)}
                      >
                        <RefreshCcw className="h-3.5 w-3.5" />
                        Renew
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
