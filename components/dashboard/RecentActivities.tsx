"use client";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { activities } from "@/data/activities";
import { useMounted } from "@/hooks/useMounted";
import { formatDate } from "@/lib/utils";
import {
  Activity,
  CreditCard,
  FileText,
  RefreshCcw,
  StickyNote,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, { icon: LucideIcon; tone: string }> = {
  join: { icon: UserPlus, tone: "bg-emerald-50 text-emerald-600" },
  renewal: { icon: RefreshCcw, tone: "bg-sky-50 text-sky-600" },
  payment: { icon: CreditCard, tone: "bg-brand-50 text-brand-600" },
  "plan-change": { icon: FileText, tone: "bg-amber-50 text-amber-600" },
  note: { icon: StickyNote, tone: "bg-slate-100 text-slate-600" },
};

function timeAgo(ts: string) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  if (days < 30) return `${days}d ago`;
  return formatDate(ts);
}

export function RecentActivities() {
  const mounted = useMounted();

  return (
    <ChartCard
      title="Recent activity"
      description="Latest member events across your gym"
      icon={Activity}
      actions={
        <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">
          View all
        </button>
      }
      bodyClassName="px-0 pb-0"
    >
      <ol className="divide-y divide-slate-100">
        {activities.map((a) => {
          const { icon: Icon, tone } = iconMap[a.type] ?? iconMap.note;
          return (
            <li
              key={a.id}
              className="flex items-start gap-3 px-6 py-3.5 transition-colors hover:bg-slate-50"
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-900">
                  <span className="font-semibold">{a.memberName}</span>{" "}
                  <span className="text-slate-600">{a.description}</span>
                </p>
                <p className="mt-0.5 text-xs text-slate-400" suppressHydrationWarning>
                  {mounted ? timeAgo(a.timestamp) : formatDate(a.timestamp)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </ChartCard>
  );
}
