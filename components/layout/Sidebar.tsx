"use client";

import { clearSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Tag,
  Receipt,
  Settings,
  Dumbbell,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Members", href: "/members", icon: Users },
  { label: "Plans", href: "/plans", icon: ClipboardList },
  { label: "Offers", href: "/offers", icon: Tag },
  { label: "Invoices", href: "/invoices", icon: Receipt },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    clearSession();
    onClose();
    toast.success("Signed out");
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800/70 bg-slate-950 text-slate-300 transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Soft brand glow at the top */}
        <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />

        {/* Header */}
        <div className="relative flex h-16 items-center justify-between border-b border-slate-800/70 px-5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_4px_12px_-4px_rgba(75,102,255,0.6)]">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">PulseGym</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                CRM Suite
              </p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800/60 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 space-y-0.5 p-3">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-gradient-to-r from-brand-500/20 to-brand-500/5 text-white"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white",
                )}
              >
                {/* Active indicator stripe */}
                {active && (
                  <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-gradient-to-b from-brand-400 to-violet-500" />
                )}
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    active
                      ? "text-brand-300"
                      : "text-slate-500 group-hover:text-slate-300",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="relative border-t border-slate-800/70 p-3">
          <Link
            href="#"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
          >
            <Settings className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut className="h-4 w-4 text-slate-500 group-hover:text-rose-300" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
