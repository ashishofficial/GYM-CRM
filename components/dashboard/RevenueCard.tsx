import { ChartCard } from "@/components/dashboard/ChartCard";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { BarChart3 } from "lucide-react";

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
