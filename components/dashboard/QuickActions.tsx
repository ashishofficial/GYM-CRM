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
}

const actions: Action[] = [
  {
    label: "Add member",
    description: "Register a new gym member",
    href: "/members",
    icon: UserPlus,
    iconBg: "bg-brand-50 text-brand-600 group-hover:bg-brand-100",
  },
  {
    label: "Assign plan",
    description: "Subscribe a member to a plan",
    href: "/plans",
    icon: Tag,
    iconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  },
  {
    label: "Create invoice",
    description: "Generate a new invoice",
    href: "/invoices",
    icon: FilePlus,
    iconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
  },
  {
    label: "Apply offer",
    description: "Discount a member's plan",
    href: "/offers",
    icon: Percent,
    iconBg: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
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
            className="group flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md"
          >
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                a.iconBg,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">{a.label}</p>
              <p className="truncate text-xs text-slate-500">{a.description}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-500" />
          </Link>
        );
      })}
    </div>
  );
}
