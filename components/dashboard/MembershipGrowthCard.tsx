"use client";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const MembershipGrowthChart = dynamic(
  () =>
    import("./charts/MembershipGrowthChart").then((m) => m.MembershipGrowthChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[260px] w-full" />,
  },
);

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
