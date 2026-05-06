"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { Member, Plan } from "@/types";
import { plans } from "@/data/plans";
import { Mail, MessageSquare, Printer } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  member: Member;
}

export function InvoiceModal({ open, onClose, member }: Props) {
  const plan: Plan =
    plans.find((p) => p.id === member.currentPlan?.planId) ?? plans[0];
  const discount = member.currentPlan
    ? plan.price - member.currentPlan.price
    : 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invoice"
      description="Preview, send or print this invoice."
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={() => toast.success("Print dialog opened")}>
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success(`Invoice sent to ${member.email}`)}
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button onClick={() => toast.success(`Invoice sent via WhatsApp to ${member.phone}`)}>
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </Button>
        </>
      }
    >
      <InvoicePreview member={member} plan={plan} discount={Math.max(0, discount)} />
    </Modal>
  );
}
