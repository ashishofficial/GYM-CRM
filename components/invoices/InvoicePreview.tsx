import { Member, Plan } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Dumbbell } from "lucide-react";

interface Props {
  member: Member;
  plan: Plan;
  discount: number;
  invoiceId?: string;
  date?: string;
}

export function InvoicePreview({
  member,
  plan,
  discount,
  invoiceId = "INV-1234",
  date,
}: Props) {
  const total = Math.max(0, plan.price - discount);
  const invoiceDate = date ?? new Date().toISOString().slice(0, 10);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">PulseGym</p>
            <p className="text-xs text-slate-500">123 Fitness Ave, Brooklyn, NY</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-slate-400">Invoice</p>
          <p className="font-mono text-sm font-semibold text-slate-900">{invoiceId}</p>
          <p className="mt-0.5 text-xs text-slate-500">{formatDate(invoiceDate)}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Billed to</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{member.fullName}</p>
          <p className="text-xs text-slate-500">{member.email}</p>
          <p className="text-xs text-slate-500">{member.phone}</p>
          <p className="mt-1 text-xs text-slate-500">{member.address}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Membership
          </p>
          <p className="mt-1 font-mono text-sm text-slate-900">{member.membershipId}</p>
          <p className="text-xs text-slate-500">Joined {formatDate(member.joinDate)}</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/60 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Description</th>
              <th className="px-4 py-2.5">Duration</th>
              <th className="px-4 py-2.5 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{plan.name} membership</p>
                <p className="text-xs text-slate-500">{plan.features[0]}</p>
              </td>
              <td className="px-4 py-3 text-slate-700">{plan.duration}</td>
              <td className="px-4 py-3 text-right font-medium text-slate-900">
                {formatCurrency(plan.price)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 ml-auto max-w-xs space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium text-slate-900">{formatCurrency(plan.price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Discount</span>
          <span className="font-medium text-emerald-700">−{formatCurrency(discount)}</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-2 text-base">
          <span className="font-semibold text-slate-900">Amount due</span>
          <span className="font-semibold text-slate-900">{formatCurrency(total)}</span>
        </div>
      </div>

      <p className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
        Thank you for choosing PulseGym. Questions? hello@pulsegym.app
      </p>
    </div>
  );
}
