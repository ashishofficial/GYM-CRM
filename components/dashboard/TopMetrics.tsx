import { Avatar } from "@/components/ui/Avatar";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { members } from "@/data/members";
import { formatCurrency } from "@/lib/utils";
import { Crown, Flame, Trophy } from "lucide-react";

export function TopMetrics() {
  const mostActive = [...members].sort(
    (a, b) => b.attendanceThisMonth - a.attendanceThisMonth,
  )[0];

  const memberSpend = members.map((m) => ({
    member: m,
    total: m.payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0),
  }));
  const highestPaying = [...memberSpend].sort((a, b) => b.total - a.total)[0];

  const planCounts: Record<string, number> = {};
  members.forEach((m) => {
    if (m.currentPlan) {
      planCounts[m.currentPlan.planName] = (planCounts[m.currentPlan.planName] ?? 0) + 1;
    }
  });
  const popularPlan = Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0];

  const items = [
    {
      title: "Most active member",
      icon: Flame,
      tone: "bg-orange-50 text-orange-600",
      heading: mostActive.fullName,
      sub: `${mostActive.attendanceThisMonth} check-ins this month`,
      avatar: <Avatar name={mostActive.fullName} src={mostActive.avatarUrl} size="md" />,
    },
    {
      title: "Highest paying",
      icon: Crown,
      tone: "bg-amber-50 text-amber-600",
      heading: highestPaying.member.fullName,
      sub: `${formatCurrency(highestPaying.total)} lifetime`,
      avatar: (
        <Avatar
          name={highestPaying.member.fullName}
          src={highestPaying.member.avatarUrl}
          size="md"
        />
      ),
    },
    {
      title: "Most popular plan",
      icon: Trophy,
      tone: "bg-brand-50 text-brand-600",
      heading: popularPlan?.[0] ?? "—",
      sub: `${popularPlan?.[1] ?? 0} active subscriptions`,
      avatar: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
          <Trophy className="h-4 w-4" />
        </div>
      ),
    },
  ];

  return (
    <ChartCard
      title="Top metrics"
      description="Standout members and plans"
      icon={Trophy}
      bodyClassName="pt-0"
    >
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/40 px-3 py-2.5 transition-colors hover:bg-slate-50"
            >
              {item.avatar}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  <Icon className="h-3 w-3" />
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                  {item.heading}
                </p>
                <p className="truncate text-[11px] text-slate-500">{item.sub}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </ChartCard>
  );
}
