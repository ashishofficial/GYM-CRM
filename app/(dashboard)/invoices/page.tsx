"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { members } from "@/data/members";
import { plans } from "@/data/plans";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Mail, MessageSquare, Plus, Printer, Search } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { PaymentStatus } from "@/types";

interface InvoiceRow {
  invoiceId: string;
  member: (typeof members)[number];
  date: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  planName: string;
}

const statusTone: Record<PaymentStatus, "success" | "warning" | "danger"> = {
  Paid: "success",
  Pending: "warning",
  Failed: "danger",
};

export default function InvoicesPage() {
  const allInvoices: InvoiceRow[] = useMemo(
    () =>
      members
        .flatMap((m) =>
          m.payments.map((p) => ({
            invoiceId: p.invoiceId,
            member: m,
            date: p.date,
            amount: p.amount,
            method: p.method,
            status: p.status,
            planName: p.planName,
          })),
        )
        .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [],
  );

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [generateOpen, setGenerateOpen] = useState(false);
  const [previewRow, setPreviewRow] = useState<InvoiceRow | null>(null);

  const [genMemberId, setGenMemberId] = useState(members[0].id);
  const [genPlanId, setGenPlanId] = useState(plans[0].id);
  const [genDiscount, setGenDiscount] = useState(0);

  const genMember = members.find((m) => m.id === genMemberId)!;
  const genPlan = plans.find((p) => p.id === genPlanId)!;

  const filtered = allInvoices.filter((row) => {
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      row.invoiceId.toLowerCase().includes(q) ||
      row.member.fullName.toLowerCase().includes(q) ||
      row.planName.toLowerCase().includes(q);
    const matchStatus = status === "all" || row.status === status;
    return matchQ && matchStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="All issued invoices and payment records."
        actions={
          <Button onClick={() => setGenerateOpen(true)}>
            <Plus className="h-4 w-4" />
            Generate invoice
          </Button>
        }
      />

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card lg:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search invoice ID, member, or plan"
            iconLeft={<Search className="h-4 w-4" />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="lg:w-[180px]">
          <option value="all">All statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Member</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.invoiceId} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                      {row.invoiceId}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={row.member.fullName} src={row.member.avatarUrl} size="sm" />
                      <span className="font-medium text-slate-900">{row.member.fullName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{row.planName}</td>
                  <td className="px-5 py-3 text-slate-700">{formatDate(row.date)}</td>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {formatCurrency(row.amount)}
                  </td>
                  <td className="px-5 py-3 text-slate-700">{row.method}</td>
                  <td className="px-5 py-3">
                    <Badge tone={statusTone[row.status]} dot>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button size="sm" variant="outline" onClick={() => setPreviewRow(row)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-500">
                    No invoices match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Generate invoice modal */}
      <Modal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        title="Generate invoice"
        description="Create an invoice for a member."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setGenerateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success(`Invoice generated for ${genMember.fullName}`);
                setGenerateOpen(false);
              }}
            >
              Generate
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Member</label>
              <Select value={genMemberId} onChange={(e) => setGenMemberId(e.target.value)}>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} ({m.membershipId})
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Plan</label>
              <Select value={genPlanId} onChange={(e) => setGenPlanId(e.target.value)}>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatCurrency(p.price)}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Discount ($)</label>
              <Input
                type="number"
                min={0}
                value={genDiscount}
                onChange={(e) => setGenDiscount(Number(e.target.value))}
              />
            </div>
          </div>

          <InvoicePreview member={genMember} plan={genPlan} discount={genDiscount} />
        </div>
      </Modal>

      {/* Preview modal */}
      <Modal
        open={!!previewRow}
        onClose={() => setPreviewRow(null)}
        title={previewRow?.invoiceId}
        description="Invoice details"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => toast.success("Print dialog opened")}>
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              variant="outline"
              onClick={() => previewRow && toast.success(`Sent to ${previewRow.member.email}`)}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              onClick={() => previewRow && toast.success(`Sent via WhatsApp to ${previewRow.member.phone}`)}
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </Button>
          </>
        }
      >
        {previewRow && (
          <InvoicePreview
            member={previewRow.member}
            plan={plans.find((p) => p.name === previewRow.planName) ?? plans[0]}
            discount={Math.max(
              0,
              (plans.find((p) => p.name === previewRow.planName)?.price ?? previewRow.amount) -
                previewRow.amount,
            )}
            invoiceId={previewRow.invoiceId}
            date={previewRow.date}
          />
        )}
      </Modal>
    </div>
  );
}
