import { AdminTasks } from "@/components/dashboard/AdminTasks";
import { AttendanceStats } from "@/components/dashboard/AttendanceStats";
import { CohortRetention } from "@/components/dashboard/CohortRetention";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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
import { StaggerSection } from "@/components/dashboard/StaggerSection";
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

  const now = new Date();
  const newThisMonth = members.filter((m) => {
    const diff = (now.getTime() - new Date(m.joinDate).getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  }).length;

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <DashboardHeader />

      <StaggerSection delay={50}>
        <QuickActions />
      </StaggerSection>

      <StaggerSection delay={120}>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
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
      </StaggerSection>

      <StaggerSection delay={190}>
        <GoalProgress />
      </StaggerSection>

      <StaggerSection delay={260}>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <MembershipGrowthCard />
          </div>
          <PlanDistributionCard />
        </div>
      </StaggerSection>

      <StaggerSection delay={330}>
        <SmartInsights />
      </StaggerSection>

      <StaggerSection delay={400}>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <PeakHoursHeatmap />
          </div>
          <LiveCheckIns />
        </div>
      </StaggerSection>

      <StaggerSection delay={470}>
        <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
          <div className="lg:col-span-3">
            <RevenueCard />
          </div>
          <div className="lg:col-span-2">
            <PaymentsOverview />
          </div>
        </div>
      </StaggerSection>

      <StaggerSection delay={540}>
        <CohortRetention />
      </StaggerSection>

      <StaggerSection delay={610}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <ExpiringPlansTable />
          <AttendanceStats />
          <div className="md:col-span-2 lg:col-span-1">
            <TopMetrics />
          </div>
        </div>
      </StaggerSection>

      <StaggerSection delay={680}>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <MiniCalendar />
            <AdminTasks />
            <RecentMembers />
          </div>
        </div>
      </StaggerSection>
    </div>
  );
}
