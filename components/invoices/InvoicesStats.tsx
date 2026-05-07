import { Card } from "@/components/ui/Card";
import { cn, formatCurrency } from "@/lib/utils";
import type { Payment } from "@/types";
import { CheckCircle2, Clock, FileText, Wallet, type LucideIcon } from "lucide-react";

interface Props {
  payments: Payment[];
}

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  cardBg: string;
  blob: string;
  hint?: string;
}

function buildStats(payments: Payment[]): Stat[] {
  const total = payments.length;
  const paid = payments.filter((p) => p.status === "Paid");
  const pending = payments.filter((p) => p.status !== "Paid");
  const paidTotal = paid.reduce((s, p) => s + p.amount, 0);
  const pendingTotal = pending.reduce((s, p) => s + p.amount, 0);
  const avgTicket = total > 0 ? Math.round(paidTotal / Math.max(1, paid.length)) : 0;

  return [
    {
      label: "Total invoices",
      value: total.toString(),
      icon: FileText,
      iconBg: "bg-brand-100 text-brand-700",
      cardBg: "bg-gradient-to-br from-white via-brand-50/40 to-brand-100/40",
      blob: "bg-brand-200/40",
      hint: `${paid.length} paid · ${pending.length} pending`,
    },
    {
      label: "Paid",
      value: formatCurrency(paidTotal),
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-700",
      cardBg: "bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/40",
      blob: "bg-emerald-200/40",
      hint: `${paid.length} invoices`,
    },
    {
      label: "Pending",
      value: formatCurrency(pendingTotal),
      icon: Clock,
      iconBg: "bg-amber-100 text-amber-700",
      cardBg: "bg-gradient-to-br from-white via-amber-50/40 to-amber-100/40",
      blob: "bg-amber-200/40",
      hint: pending.length === 0 ? "All caught up" : `${pending.length} awaiting`,
    },
    {
      label: "Avg. ticket",
      value: formatCurrency(avgTicket),
      icon: Wallet,
      iconBg: "bg-violet-100 text-violet-700",
      cardBg: "bg-gradient-to-br from-white via-violet-50/40 to-violet-100/40",
      blob: "bg-violet-200/40",
      hint: "per paid invoice",
    },
  ];
}

export function InvoicesStats({ payments }: Props) {
  const stats = buildStats(payments);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card
            key={s.label}
            hover
            gradient
            className={cn("relative border border-slate-200/60 p-4 sm:p-5", s.cardBg)}
          >
            <div
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl",
                s.blob,
              )}
            />
            <div className="relative flex items-start gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/60",
                  s.iconBg,
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </p>
                <p className="mt-0.5 truncate font-mono text-xl font-bold tabular-nums text-slate-900 sm:text-2xl">
                  {s.value}
                </p>
                {s.hint && (
                  <p className="mt-0.5 truncate text-[10px] font-medium text-slate-500">
                    {s.hint}
                  </p>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
