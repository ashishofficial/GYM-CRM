"use client";

import { Button } from "@/components/ui/Button";
import { AdminTasks } from "@/components/dashboard/AdminTasks";
import { AttendanceStats } from "@/components/dashboard/AttendanceStats";
import { DateFilter, type DateRange } from "@/components/dashboard/DateFilter";
import { ExpiringPlansTable } from "@/components/dashboard/ExpiringPlansTable";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { MembershipGrowthCard } from "@/components/dashboard/MembershipGrowthCard";
import { MiniCalendar } from "@/components/dashboard/MiniCalendar";
import { PaymentsOverview } from "@/components/dashboard/PaymentsOverview";
import { PlanDistributionCard } from "@/components/dashboard/PlanDistributionCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { RecentMembers } from "@/components/dashboard/RecentMembers";
import { RevenueCard } from "@/components/dashboard/RevenueCard";
import { SmartInsights } from "@/components/dashboard/SmartInsights";
import { TopMetrics } from "@/components/dashboard/TopMetrics";
import { members } from "@/data/members";
import { formatCurrency, getPlanStatus } from "@/lib/utils";
import { Activity, AlertTriangle, DollarSign, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [range, setRange] = useState<DateRange>("month");

  const total = members.length;
  const active = members.filter(
    (m) => m.isActive && m.currentPlan && getPlanStatus(m.currentPlan.expiryDate) !== "expired",
  ).length;
  const revenue = members.reduce(
    (sum, m) =>
      sum + m.payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0),
    0,
  );
  const expiringSoon = members.filter(
    (m) => m.currentPlan && getPlanStatus(m.currentPlan.expiryDate) === "expiring",
  ).length;

  return (
    <div className="space-y-8">
      {/* Sticky page header */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-slate-200/70 bg-slate-50/80 px-4 py-4 backdrop-blur-md lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">
              Overview of your gym performance and member activity.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DateFilter value={range} onChange={setRange} />
            <Link href="/members">
              <Button>
                <UserPlus className="h-4 w-4" />
                Add member
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <QuickActions />

      {/* KPI cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Total members"
          value={total.toString()}
          change={{ value: "+8.2%", trend: "up", label: "vs last month" }}
          icon={Users}
          tone="brand"
        />
        <KpiCard
          title="Active members"
          value={active.toString()}
          change={{ value: "+3.1%", trend: "up", label: "vs last month" }}
          icon={Activity}
          tone="emerald"
        />
        <KpiCard
          title="Total revenue"
          value={formatCurrency(revenue)}
          change={{ value: "+12.4%", trend: "up", label: "this quarter" }}
          icon={DollarSign}
          tone="violet"
        />
        <KpiCard
          title="Expiring soon"
          value={expiringSoon.toString()}
          change={{ value: "-1", trend: "down", label: "vs last week" }}
          icon={AlertTriangle}
          tone="amber"
        />
      </div>

      {/* Charts: 70 / 30 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MembershipGrowthCard />
        </div>
        <PlanDistributionCard />
      </div>

      {/* Smart insights */}
      <SmartInsights />

      {/* Charts: 60 / 40 */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RevenueCard />
        </div>
        <div className="lg:col-span-2">
          <PaymentsOverview />
        </div>
      </div>

      {/* Operational row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ExpiringPlansTable />
        <AttendanceStats />
        <TopMetrics />
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div className="flex flex-col gap-6">
          <MiniCalendar />
          <AdminTasks />
          <RecentMembers />
        </div>
      </div>
    </div>
  );
}
