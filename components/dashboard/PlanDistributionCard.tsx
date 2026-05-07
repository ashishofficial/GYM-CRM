"use client";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { PieChart } from "lucide-react";
import dynamic from "next/dynamic";

const PlanDistributionChart = dynamic(
  () =>
    import("./charts/PlanDistributionChart").then((m) => m.PlanDistributionChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Skeleton className="h-[180px] w-[180px] shrink-0 rounded-full" />
        <div className="w-full space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    ),
  },
);

export function PlanDistributionCard() {
  return (
    <ChartCard
      title="Plan distribution"
      description="Active subscriptions by plan"
      icon={PieChart}
    >
      <PlanDistributionChart />
    </ChartCard>
  );
}
