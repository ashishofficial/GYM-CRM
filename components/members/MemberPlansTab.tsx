import { Card } from "@/components/ui/Card";
import { Member } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export function MemberPlansTab({ member }: { member: Member }) {
  if (member.planHistory.length === 0) {
    return (
      <Card className="p-10 text-center text-sm text-slate-500">
        No plan history available.
      </Card>
    );
  }
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Start date</th>
              <th className="px-5 py-3">End date</th>
              <th className="px-5 py-3">Price paid</th>
              <th className="px-5 py-3">Discount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...member.planHistory].reverse().map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-900">{p.planName}</td>
                <td className="px-5 py-3 text-slate-700">{formatDate(p.startDate)}</td>
                <td className="px-5 py-3 text-slate-700">{formatDate(p.endDate)}</td>
                <td className="px-5 py-3 font-medium text-slate-900">{formatCurrency(p.pricePaid)}</td>
                <td className="px-5 py-3 text-slate-700">
                  {p.discount > 0 ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                      −{formatCurrency(p.discount)}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
