"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { plans } from "@/data/plans";
import { Member } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  member: Member;
}

export function AssignPlanModal({ open, onClose, member }: Props) {
  const [planId, setPlanId] = useState(plans[0].id);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));

  const selectedPlan = useMemo(() => plans.find((p) => p.id === planId)!, [planId]);

  const handleAssign = () => {
    toast.success(`${selectedPlan.name} plan assigned to ${member.fullName}`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign plan"
      description={`Choose a plan for ${member.fullName}`}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign}>Assign plan</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <Label>Plan</Label>
          <Select value={planId} onChange={(e) => setPlanId(e.target.value)}>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {formatCurrency(p.price)} ({p.duration})
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Start date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-inset ring-slate-100">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Plan summary
          </p>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Plan</span>
              <span className="font-medium text-slate-900">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Duration</span>
              <span className="font-medium text-slate-900">
                {selectedPlan.duration} ({selectedPlan.durationDays} days)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Price</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(selectedPlan.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
