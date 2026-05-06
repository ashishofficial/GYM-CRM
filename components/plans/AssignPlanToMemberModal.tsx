"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { members } from "@/data/members";
import { Plan } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  plan: Plan | null;
}

export function AssignPlanToMemberModal({ open, onClose, plan }: Props) {
  const [memberId, setMemberId] = useState(members[0]?.id ?? "");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));

  if (!plan) return null;

  const member = members.find((m) => m.id === memberId);

  const handleAssign = () => {
    toast.success(`${plan.name} assigned to ${member?.fullName ?? "member"}`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Assign ${plan.name} plan`}
      description={`${formatCurrency(plan.price)} · ${plan.duration}`}
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
          <Label>Member</Label>
          <Select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.fullName} ({m.membershipId})
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Start date</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}
