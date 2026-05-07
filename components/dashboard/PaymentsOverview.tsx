"use client";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { members } from "@/data/members";
import { formatCurrency } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import dynamic from "next/dynamic";

const PaymentMethodChart = dynamic(
  () =>
    import("./charts/PaymentMethodChart").then((m) => m.PaymentMethodChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Skeleton className="h-[160px] w-[160px] shrink-0 rounded-full" />
        <div className="w-full space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </div>
      </div>
    ),
  },
);

export function PaymentsOverview() {
  const today = new Date().toISOString().slice(0, 10);
  const todayRevenue =
    members
      .flatMap((m) => m.payments)
      .filter((p) => p.status === "Paid" && p.date === today)
      .reduce((s, p) => s + p.amount, 0) || 248;

  const stats = [
    { label: "Today", value: formatCurrency(todayRevenue), accent: "text-emerald-700" },
    { label: "Pending", value: formatCurrency(312), accent: "text-amber-700", sub: "3 invoices" },
    { label: "Avg ticket", value: formatCurrency(82), accent: "text-slate-900" },
  ];

  return (
    <ChartCard
      title="Payments overview"
      description="Today's revenue and method breakdown"
      icon={CreditCard}
      bodyClassName="space-y-5"
    >
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-100 bg-slate-50/40 px-3 py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {s.label}
            </p>
            <p className={`mt-1 text-base font-semibold ${s.accent}`}>{s.value}</p>
            {s.sub && <p className="text-[10px] text-slate-400">{s.sub}</p>}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          By payment method
        </p>
        <PaymentMethodChart />
      </div>
    </ChartCard>
  );
}
