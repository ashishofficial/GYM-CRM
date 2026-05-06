"use client";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { AssignPlanToMemberModal } from "@/components/plans/AssignPlanToMemberModal";
import { CreatePlanModal } from "@/components/plans/CreatePlanModal";
import { PlanCard } from "@/components/plans/PlanCard";
import { plans } from "@/data/plans";
import { Plan } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function PlansPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [assignTo, setAssignTo] = useState<Plan | null>(null);

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

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} onAssign={(plan) => setAssignTo(plan)} />
        ))}
      </div>

      <CreatePlanModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <AssignPlanToMemberModal
        open={!!assignTo}
        onClose={() => setAssignTo(null)}
        plan={assignTo}
      />
    </div>
  );
}
