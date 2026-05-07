"use client";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { AssignPlanToMemberModal } from "@/components/plans/AssignPlanToMemberModal";
import { CreatePlanModal } from "@/components/plans/CreatePlanModal";
import { PlanCard } from "@/components/plans/PlanCard";
import { PlansStats } from "@/components/plans/PlansStats";
import { members } from "@/data/members";
import { plans } from "@/data/plans";
import { getPlanStatus } from "@/lib/utils";
import { Plan } from "@/types";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

export default function PlansPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [assignTo, setAssignTo] = useState<Plan | null>(null);

  // Subscribers per plan — computed once
  const subscribersByPlanId = useMemo(() => {
    const map: Record<string, typeof members> = {};
    plans.forEach((p) => {
      map[p.id] = members.filter(
        (m) =>
          m.currentPlan?.planId === p.id &&
          getPlanStatus(m.currentPlan.expiryDate) !== "expired",
      );
    });
    return map;
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plans"
        description="Membership plans available to your members."
        actions={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Create plan
          </Button>
        }
      />

      <PlansStats />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            subscribers={subscribersByPlanId[p.id] ?? []}
            onAssign={(plan) => setAssignTo(plan)}
          />
        ))}
      </div>

      {createOpen && (
        <CreatePlanModal open onClose={() => setCreateOpen(false)} />
      )}
      {assignTo && (
        <AssignPlanToMemberModal open onClose={() => setAssignTo(null)} plan={assignTo} />
      )}
    </div>
  );
}
