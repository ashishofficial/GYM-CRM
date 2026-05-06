import { ChartCard } from "@/components/dashboard/ChartCard";
import { PlanDistributionChart } from "@/components/dashboard/charts/PlanDistributionChart";
import { PieChart } from "lucide-react";

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
