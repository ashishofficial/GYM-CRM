"use client";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { BarChart3 } from "lucide-react";
import dynamic from "next/dynamic";

const RevenueChart = dynamic(
  () => import("./charts/RevenueChart").then((m) => m.RevenueChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[260px] w-full" />,
  },
);

export function RevenueCard() {
  return (
    <ChartCard
      title="Revenue overview"
      description="Last 12 months"
      icon={BarChart3}
      actions={<span className="text-xs font-medium text-slate-500">USD</span>}
    >
      <RevenueChart />
    </ChartCard>
  );
}
