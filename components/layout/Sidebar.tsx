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
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">PulseGym</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">CRM Suite</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    active ? "text-brand-600" : "text-slate-400",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Settings className="h-4 w-4 text-slate-400" />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 text-slate-400" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
