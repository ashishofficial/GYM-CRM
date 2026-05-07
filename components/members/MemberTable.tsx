"use client";

import { Avatar } from "@/components/ui/Avatar";
import { PlanStatusBadge } from "@/components/members/PlanStatusBadge";
import { Member } from "@/types";
import { formatDate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  members: Member[];
}

export function MemberTable({ members }: Props) {
  const router = useRouter();

  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
        <p className="text-sm font-medium text-slate-900">No members found</p>
        <p className="mt-1 text-xs text-slate-500">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile card list — hidden on md+ */}
      <ul className="space-y-3 md:hidden">
        {members.map((m) => (
          <li
            key={m.id}
            onClick={() => router.push(`/members/${m.id}`)}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition-colors hover:bg-slate-50"
          >
            <Avatar name={m.fullName} src={m.avatarUrl} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-slate-900">{m.fullName}</p>
                <PlanStatusBadge expiryDate={m.currentPlan?.expiryDate} />
              </div>
              <p className="mt-0.5 truncate text-xs text-slate-500">{m.email}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
                <span className="font-mono">{m.membershipId}</span>
                <span>·</span>
                <span className="font-medium text-slate-700">
                  {m.currentPlan?.planName ?? "No plan"}
                </span>
                {m.currentPlan && (
                  <>
                    <span>·</span>
                    <span>exp {formatDate(m.currentPlan.expiryDate)}</span>
                  </>
                )}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
          </li>
        ))}
      </ul>

      {/* Desktop table — hidden on mobile */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft md:block">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/60">
              <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Member</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Membership ID</th>
                <th className="px-5 py-3">Active plan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Expiry</th>
                <th className="px-5 py-3">Joined</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => router.push(`/members/${m.id}`)}
                  className="cursor-pointer transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.fullName} src={m.avatarUrl} />
                      <div>
                        <p className="font-medium text-slate-900">{m.fullName}</p>
                        <p className="text-xs text-slate-500">{m.occupation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-slate-900">{m.email}</p>
                    <p className="text-xs text-slate-500">{m.phone}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                      {m.membershipId}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {m.currentPlan?.planName ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <PlanStatusBadge expiryDate={m.currentPlan?.expiryDate} />
                  </td>
                  <td className="px-5 py-3 text-slate-700">
                    {m.currentPlan ? formatDate(m.currentPlan.expiryDate) : "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-700">{formatDate(m.joinDate)}</td>
                  <td className="px-5 py-3 text-right text-slate-400">
                    <ChevronRight className="h-4 w-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
