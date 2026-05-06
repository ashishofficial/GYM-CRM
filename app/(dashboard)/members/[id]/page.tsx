"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ApplyOfferModal } from "@/components/members/ApplyOfferModal";
import { AssignPlanModal } from "@/components/members/AssignPlanModal";
import { InvoiceModal } from "@/components/members/InvoiceModal";
import { MemberActivityTab } from "@/components/members/MemberActivityTab";
import { MemberOverviewTab } from "@/components/members/MemberOverviewTab";
import { MemberPaymentsTab } from "@/components/members/MemberPaymentsTab";
import { MemberPlansTab } from "@/components/members/MemberPlansTab";
import { PlanStatusBadge } from "@/components/members/PlanStatusBadge";
import { getMember } from "@/data/members";
import { ArrowLeft, FileText, Mail, Percent, Phone, Tag, UserMinus, UserCheck } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MemberDetailPage() {
  const params = useParams<{ id: string }>();
  const member = getMember(params.id);

  const [assignOpen, setAssignOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [isActive, setIsActive] = useState(member?.isActive ?? true);

  if (!member) return notFound();

  const toggleActive = () => {
    setIsActive((v) => !v);
    toast.success(isActive ? "Member marked inactive" : "Member reactivated");
  };

  return (
    <div className="space-y-6">
      <Link
        href="/members"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to members
      </Link>

      <Card className="p-5">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <Avatar name={member.fullName} src={member.avatarUrl} size="xl" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {member.fullName}
                </h1>
                {isActive ? (
                  <Badge tone="success" dot>
                    Active
                  </Badge>
                ) : (
                  <Badge tone="neutral" dot>
                    Inactive
                  </Badge>
                )}
                <PlanStatusBadge expiryDate={member.currentPlan?.expiryDate} />
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="font-mono text-xs">{member.membershipId}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {member.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {member.phone}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setAssignOpen(true)}>
              <Tag className="h-4 w-4" />
              Assign plan
            </Button>
            <Button variant="outline" onClick={() => setOfferOpen(true)}>
              <Percent className="h-4 w-4" />
              Apply offer
            </Button>
            <Button onClick={() => setInvoiceOpen(true)}>
              <FileText className="h-4 w-4" />
              Generate invoice
            </Button>
            <Button variant={isActive ? "outline" : "secondary"} onClick={toggleActive}>
              {isActive ? (
                <>
                  <UserMinus className="h-4 w-4" />
                  Mark inactive
                </>
              ) : (
                <>
                  <UserCheck className="h-4 w-4" />
                  Reactivate
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MemberOverviewTab member={member} />
        </TabsContent>
        <TabsContent value="plans">
          <MemberPlansTab member={member} />
        </TabsContent>
        <TabsContent value="payments">
          <MemberPaymentsTab member={member} />
        </TabsContent>
        <TabsContent value="activity">
          <MemberActivityTab member={member} />
        </TabsContent>
      </Tabs>

      <AssignPlanModal open={assignOpen} onClose={() => setAssignOpen(false)} member={member} />
      <ApplyOfferModal open={offerOpen} onClose={() => setOfferOpen(false)} member={member} />
      <InvoiceModal open={invoiceOpen} onClose={() => setInvoiceOpen(false)} member={member} />
    </div>
  );
}
