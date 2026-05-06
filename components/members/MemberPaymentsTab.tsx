import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Member, PaymentStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusTone: Record<PaymentStatus, "success" | "warning" | "danger"> = {
  Paid: "success",
  Pending: "warning",
  Failed: "danger",
};

export function MemberPaymentsTab({ member }: { member: Member }) {
  if (member.payments.length === 0) {
    return (
      <Card className="p-10 text-center text-sm text-slate-500">No payments yet.</Card>
    );
  }
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Invoice ID</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {member.payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                    {p.invoiceId}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-700">{formatDate(p.date)}</td>
                <td className="px-5 py-3 text-slate-900">{p.planName}</td>
                <td className="px-5 py-3 font-medium text-slate-900">{formatCurrency(p.amount)}</td>
                <td className="px-5 py-3 text-slate-700">{p.method}</td>
                <td className="px-5 py-3">
                  <Badge tone={statusTone[p.status]} dot>
                    {p.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
