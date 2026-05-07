"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { members } from "@/data/members";
import { cn, daysBetween, formatDate } from "@/lib/utils";
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Bell,
  Clock3,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface InsightItem {
  id: string;
  primary: string;
  secondary: string;
  avatarUrl?: string;
}

interface Insight {
  title: string;
  count: number;
  description: string;
  icon: LucideIcon;
  tone: "warning" | "danger" | "info";
  items: InsightItem[];
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; onClick: () => void };
}

const tones = {
  warning: {
    iconBg: "bg-amber-100/80 text-amber-700",
    accent: "text-amber-700",
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  danger: {
    iconBg: "bg-rose-100/80 text-rose-700",
    accent: "text-rose-700",
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
  },
  info: {
    iconBg: "bg-sky-100/80 text-sky-700",
    accent: "text-sky-700",
    badge: "bg-sky-50 text-sky-700 ring-sky-200",
  },
};

export function SmartInsights() {
  const now = new Date();

  const expiringSoon = members
    .filter((m) => {
      if (!m.currentPlan) return false;
      const days = daysBetween(now, m.currentPlan.expiryDate);
      return days >= 0 && days <= 3;
    })
    .map((m) => ({
      id: m.id,
      primary: m.fullName,
      secondary: `${m.currentPlan!.planName} · ${formatDate(m.currentPlan!.expiryDate)}`,
      avatarUrl: m.avatarUrl,
    }));

  const inactive = members
    .filter((m) => daysBetween(m.lastVisit, now) > 7)
    .slice(0, 4)
    .map((m) => ({
      id: m.id,
      primary: m.fullName,
      secondary: `Last visit ${formatDate(m.lastVisit)}`,
      avatarUrl: m.avatarUrl,
    }));

  const pendingPayments: InsightItem[] = members
    .flatMap((m) =>
      m.payments
        .filter((p) => p.status !== "Paid")
        .map((p) => ({
          id: p.id,
          primary: m.fullName,
          secondary: `${p.invoiceId} · ${p.status}`,
          avatarUrl: m.avatarUrl,
        })),
    )
    .slice(0, 4);

  if (pendingPayments.length === 0) {
    pendingPayments.push(
      {
        id: "pp-1",
        primary: "Sophia Reyes",
        secondary: "INV-1206 · Pending renewal",
        avatarUrl: "https://i.pravatar.cc/150?img=49",
      },
      {
        id: "pp-2",
        primary: "Noah Kim",
        secondary: "INV-1199 · Awaiting confirmation",
        avatarUrl: "https://i.pravatar.cc/150?img=33",
      },
    );
  }

  const insights: Insight[] = [
    {
      title: "Expiring in 3 days",
      count: expiringSoon.length,
      description: "Send a renewal reminder before the plan lapses.",
      icon: Clock3,
      tone: "warning",
      items: expiringSoon,
      primaryAction: { label: "View members", href: "/members" },
      secondaryAction: {
        label: "Send reminder",
        onClick: () => toast.success("Renewal reminders queued"),
      },
    },
    {
      title: "Inactive members",
      count: inactive.length,
      description: "No check-ins in the last 7 days.",
      icon: AlertTriangle,
      tone: "info",
      items: inactive,
      primaryAction: { label: "View members", href: "/members" },
      secondaryAction: {
        label: "Send check-in",
        onClick: () => toast.success("Re-engagement messages sent"),
      },
    },
    {
      title: "Pending payments",
      count: pendingPayments.length,
      description: "Outstanding invoices awaiting collection.",
      icon: AlertOctagon,
      tone: "danger",
      items: pendingPayments,
      primaryAction: { label: "View invoices", href: "/invoices" },
      secondaryAction: {
        label: "Send reminder",
        onClick: () => toast.success("Payment reminders sent"),
      },
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {insights.map((i) => {
        const Icon = i.icon;
        const t = tones[i.tone];
        return (
          <Card key={i.title} className="overflow-hidden">
            <div className="flex items-start justify-between gap-3 px-5 pt-4 sm:px-6 sm:pt-5">
              <div className="flex items-start gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", t.iconBg)}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{i.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{i.description}</p>
                </div>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
                  t.badge,
                )}
              >
                {i.count}
              </span>
            </div>

            <ul className="mt-3 flex-1 space-y-1 px-5 pb-3 sm:px-6">
              {i.items.length === 0 ? (
                <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center text-xs text-slate-500">
                  All clear — nothing to action
                </li>
              ) : (
                i.items.slice(0, 3).map((it) => (
                  <li
                    key={it.id}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50"
                  >
                    <Avatar name={it.primary} src={it.avatarUrl} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-900">{it.primary}</p>
                      <p className="truncate text-[11px] text-slate-500">{it.secondary}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div className="flex items-center gap-1 border-t border-slate-100 px-3 py-2 sm:px-3">
              {i.secondaryAction && (
                <button
                  onClick={i.secondaryAction.onClick}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  <Bell className="h-3.5 w-3.5" />
                  {i.secondaryAction.label}
                </button>
              )}
              <Link
                href={i.primaryAction.href}
                className={cn(
                  "ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-slate-50",
                  t.accent,
                )}
              >
                {i.primaryAction.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
