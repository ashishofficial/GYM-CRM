import { Avatar } from "@/components/ui/Avatar";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { liveCheckIns } from "@/data/analytics";
import { members } from "@/data/members";
import { Radio } from "lucide-react";
import Link from "next/link";

export function LiveCheckIns() {
  const pct = Math.round((liveCheckIns.current / liveCheckIns.capacity) * 100);
  const recent = liveCheckIns.recentMemberIds
    .map((id, i) => {
      const m = members.find((mem) => mem.id === id);
      return m ? { ...m, minutesAgo: liveCheckIns.minutesAgo[i] ?? 0 } : null;
    })
    .filter((m): m is NonNullable<typeof m> => m !== null)
    .slice(0, 4);

  // Capacity tone: green <60%, amber 60-85%, red >85%
  const tone = pct < 60 ? "emerald" : pct < 85 ? "amber" : "rose";
  const toneClasses = {
    emerald: { bar: "from-emerald-500 to-emerald-600", text: "text-emerald-700" },
    amber: { bar: "from-amber-500 to-amber-600", text: "text-amber-700" },
    rose: { bar: "from-rose-500 to-rose-600", text: "text-rose-700" },
  }[tone];

  return (
    <ChartCard
      gradient
      className="relative overflow-hidden border border-slate-200/60 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/40"
      title="Live check-ins"
      description="Members currently in the gym"
      icon={Radio}
      actions={
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          LIVE
        </span>
      }
      bodyClassName="space-y-5"
    >
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight text-slate-900">
            {liveCheckIns.current}
          </span>
          <span className="text-sm text-slate-500">of {liveCheckIns.capacity} capacity</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${toneClasses.bar} transition-[width] duration-500`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className={`text-xs font-semibold ${toneClasses.text}`}>{pct}% full</span>
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Recent check-ins
        </p>
        <ul className="space-y-1.5">
          {recent.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-slate-50"
            >
              <Avatar name={m.fullName} src={m.avatarUrl} size="sm" />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/members/${m.id}`}
                  className="block truncate text-xs font-medium text-slate-900 hover:text-brand-600"
                >
                  {m.fullName}
                </Link>
                <p className="text-[10px] text-slate-500">{m.currentPlan?.planName ?? "—"}</p>
              </div>
              <span className="text-[10px] font-medium text-slate-400">
                {m.minutesAgo === 0 ? "now" : `${m.minutesAgo}m ago`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}
