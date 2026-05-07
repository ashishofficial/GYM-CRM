"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, FilePlus, Percent, Tag, UserPlus, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface Action {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  iconBg: string;
  cardBg: string;
  blob: string;
  hoverShadow: string;
}

const actions: Action[] = [
  {
    label: "Add member",
    description: "Register a new gym member",
    href: "/members",
    icon: UserPlus,
    iconBg: "bg-brand-100 text-brand-700 group-hover:bg-brand-200",
    cardBg: "bg-gradient-to-br from-white via-brand-50/30 to-brand-100/40",
    blob: "bg-brand-200/40",
    hoverShadow: "hover:shadow-[0_12px_32px_-12px_rgba(75,102,255,0.4)]",
  },
  {
    label: "Assign plan",
    description: "Subscribe a member to a plan",
    href: "/plans",
    icon: Tag,
    iconBg: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200",
    cardBg: "bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/40",
    blob: "bg-emerald-200/40",
    hoverShadow: "hover:shadow-[0_12px_32px_-12px_rgba(16,185,129,0.4)]",
  },
  {
    label: "Create invoice",
    description: "Generate a new invoice",
    href: "/invoices",
    icon: FilePlus,
    iconBg: "bg-amber-100 text-amber-700 group-hover:bg-amber-200",
    cardBg: "bg-gradient-to-br from-white via-amber-50/30 to-amber-100/40",
    blob: "bg-amber-200/40",
    hoverShadow: "hover:shadow-[0_12px_32px_-12px_rgba(245,158,11,0.4)]",
  },
  {
    label: "Apply offer",
    description: "Discount a member's plan",
    href: "/offers",
    icon: Percent,
    iconBg: "bg-violet-100 text-violet-700 group-hover:bg-violet-200",
    cardBg: "bg-gradient-to-br from-white via-violet-50/30 to-violet-100/40",
    blob: "bg-violet-200/40",
    hoverShadow: "hover:shadow-[0_12px_32px_-12px_rgba(139,92,246,0.4)]",
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((a) => {
        const Icon = a.icon;
        return (
          <Link
            key={a.label}
            href={a.href}
            className={cn(
              "group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200/60 p-4 shadow-soft transition-all hover:-translate-y-0.5 sm:gap-4 sm:p-5",
              a.cardBg,
              a.hoverShadow,
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl",
                a.blob,
              )}
            />
            <div
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-white/70 transition-colors",
                a.iconBg,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="relative min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">{a.label}</p>
              <p className="truncate text-xs text-slate-500">{a.description}</p>
            </div>
            <ArrowUpRight className="relative h-4 w-4 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700" />
          </Link>
        );
      })}
    </div>
  );
}
