import { Avatar } from "@/components/ui/Avatar";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { PlanStatusBadge } from "@/components/members/PlanStatusBadge";
import { members } from "@/data/members";
import { formatDate } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export function RecentMembers() {
  const recent = [...members]
    .sort((a, b) => +new Date(b.joinDate) - +new Date(a.joinDate))
    .slice(0, 5);

  return (
    <ChartCard
      title="Recently added"
      description="New members this period"
      icon={UserPlus}
      actions={
        <Link href="/members" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
          View all
        </Link>
      }
      bodyClassName="px-0 pb-0"
    >
      <ul className="divide-y divide-slate-100">
        {recent.map((m) => (
          <li
            key={m.id}
            className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-slate-50"
          >
            <Avatar name={m.fullName} src={m.avatarUrl} size="sm" />
            <div className="min-w-0 flex-1">
              <Link
                href={`/members/${m.id}`}
                className="block truncate text-sm font-medium text-slate-900 hover:text-brand-600"
              >
                {m.fullName}
              </Link>
              <p className="truncate text-[11px] text-slate-500">
                {m.currentPlan?.planName ?? "No plan"} · {formatDate(m.joinDate)}
              </p>
            </div>
            <PlanStatusBadge expiryDate={m.currentPlan?.expiryDate} />
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
