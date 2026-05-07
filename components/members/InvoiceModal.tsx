"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { downloadInvoice } from "@/lib/downloadInvoice";
import { Member, Plan } from "@/types";
import { plans } from "@/data/plans";
import { Download, Mail, MessageSquare, Printer } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  member: Member;
}

const CAPTURE_ID = "invoice-capture-member-detail";

export function InvoiceModal({ open, onClose, member }: Props) {
  const [downloading, setDownloading] = useState(false);

  const plan: Plan =
    plans.find((p) => p.id === member.currentPlan?.planId) ?? plans[0];
  const discount = member.currentPlan ? plan.price - member.currentPlan.price : 0;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadInvoice(CAPTURE_ID, `${member.fullName.replace(/\s+/g, "_")}-invoice.pdf`);
      toast.success("Invoice downloaded");
    } catch (err) {
      toast.error("Could not download invoice");
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invoice"
      description="Preview, download or send this invoice."
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleDownload} loading={downloading}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={handlePrint}>
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
      <InvoicePreview
        captureId={CAPTURE_ID}
        member={member}
        plan={plan}
        discount={Math.max(0, discount)}
      />
    </Modal>
  );
}
