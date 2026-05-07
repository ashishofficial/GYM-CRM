import { AdminTasks } from "@/components/dashboard/AdminTasks";
import { AttendanceStats } from "@/components/dashboard/AttendanceStats";
import { CohortRetention } from "@/components/dashboard/CohortRetention";
import { ExpiringPlansTable } from "@/components/dashboard/ExpiringPlansTable";
import { GoalProgress } from "@/components/dashboard/GoalProgress";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LiveCheckIns } from "@/components/dashboard/LiveCheckIns";
import { MembershipGrowthCard } from "@/components/dashboard/MembershipGrowthCard";
import { MiniCalendar } from "@/components/dashboard/MiniCalendar";
import { MRRCard } from "@/components/dashboard/MRRCard";
import { PaymentsOverview } from "@/components/dashboard/PaymentsOverview";
import { PeakHoursHeatmap } from "@/components/dashboard/PeakHoursHeatmap";
import { PlanDistributionCard } from "@/components/dashboard/PlanDistributionCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { RecentMembers } from "@/components/dashboard/RecentMembers";
import { RevenueCard } from "@/components/dashboard/RevenueCard";
import { SmartInsights } from "@/components/dashboard/SmartInsights";
import { TopMetrics } from "@/components/dashboard/TopMetrics";
import { members } from "@/data/members";
import { getPlanStatus } from "@/lib/utils";
import { Activity, UserPlus, Users } from "lucide-react";

export default function DashboardPage() {
  const total = members.length;
  const active = members.filter(
    (m) => m.isActive && m.currentPlan && getPlanStatus(m.currentPlan.expiryDate) !== "expired",
  ).length;
  const expiringSoon = members.filter(
    (m) => m.currentPlan && getPlanStatus(m.currentPlan.expiryDate) === "expiring",
  ).length;

  // Compute "new this month" — members joined in last 30 days
  const now = new Date();
  const newThisMonth = members.filter((m) => {
    const diff = (now.getTime() - new Date(m.joinDate).getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  }).length;

  return (
    <div className="space-y-8">
      {/* Sticky page header */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-slate-200/70 bg-slate-50/80 px-4 py-4 backdrop-blur-md lg:-mx-8 lg:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of your gym performance and member activity.
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <QuickActions />

      {/* KPI row — 4 KPIs (one is the rich MRR card) */}
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
        <MRRCard />
        <KpiCard
          title="New this month"
          value={newThisMonth.toString()}
          change={{
            value: `${expiringSoon} expiring`,
            trend: expiringSoon > 0 ? "down" : "up",
            label: "next 7d",
          }}
          icon={UserPlus}
          tone="violet"
        />
      </div>

      {/* Goals strip */}
      <GoalProgress />

      {/* Charts row 1: Membership growth + Plan distribution */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MembershipGrowthCard />
        </div>
        <PlanDistributionCard />
      </div>

      {/* Smart insights */}
      <SmartInsights />

      {/* Engagement row: Peak hours + Live check-ins */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PeakHoursHeatmap />
        </div>
        <LiveCheckIns />
      </div>

      {/* Charts row 2: Revenue + Payments overview */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RevenueCard />
        </div>
        <div className="lg:col-span-2">
          <PaymentsOverview />
        </div>
      </div>

      {/* Cohort retention — full width */}
      <CohortRetention />

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
