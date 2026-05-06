import { ChartCard } from "@/components/dashboard/ChartCard";
import { MembershipGrowthChart } from "@/components/dashboard/charts/MembershipGrowthChart";
import { TrendingUp } from "lucide-react";

export function MembershipGrowthCard() {
  return (
    <ChartCard
      title="Membership growth"
      description="Total members and new joins over time"
      icon={TrendingUp}
      actions={
        <div className="hidden items-center gap-3 text-xs sm:flex">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2 w-2 rounded-full bg-brand-600" /> Total
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> New joins
          </span>
        </div>
      }
    >
      <MembershipGrowthChart />
    </ChartCard>
  );
}
