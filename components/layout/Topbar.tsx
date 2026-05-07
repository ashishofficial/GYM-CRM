"use client";

import { Avatar } from "@/components/ui/Avatar";
import { NotificationsDropdown } from "@/components/layout/NotificationsDropdown";
import { getSession, type Session } from "@/lib/auth";
import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  onMenu: () => void;
}

function timeOfDayGreeting(hour: number) {
  if (hour < 5) return "Working late";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

const PAGE_TITLES: Record<string, string> = {
  "/members": "Members",
  "/plans": "Plans",
  "/offers": "Offers",
  "/invoices": "Invoices",
};

function getRouteTitle(pathname: string): string {
  if (pathname.startsWith("/members/")) return "Member details";
  return PAGE_TITLES[pathname] ?? "";
}

export function Topbar({ onMenu }: Props) {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [greeting, setGreeting] = useState("Welcome back");
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setGreeting(timeOfDayGreeting(new Date().getHours()));
  }, []);

  // Close the notifications dropdown when navigating to a different route.
  useEffect(() => {
    setNotifOpen(false);
  }, [pathname]);

  const displayName = session?.name ?? "Admin";
  const role = session?.role ?? "Admin";
  const avatarUrl = session?.email
    ? `https://i.pravatar.cc/150?u=${encodeURIComponent(session.email)}`
    : "https://i.pravatar.cc/150?img=8";

  const isDashboard = pathname === "/dashboard";
  const routeTitle = getRouteTitle(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur lg:px-6">
      <button
        onClick={onMenu}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        {isDashboard ? (
          <h1
            className="truncate text-base font-extrabold tracking-tight text-slate-900 sm:text-lg"
            suppressHydrationWarning
          >
            {greeting},{" "}
            <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {displayName}
            </span>{" "}
            <span aria-hidden className="inline-block origin-[70%_70%] animate-wave">
              👋
            </span>
          </h1>
        ) : routeTitle ? (
          <h1 className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            {routeTitle}
          </h1>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 aria-expanded:bg-slate-100"
            aria-label="Notifications"
            aria-expanded={notifOpen}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <NotificationsDropdown open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{displayName}</p>
            <p className="text-xs text-slate-500">{role}</p>
          </div>
          <Avatar name={displayName} src={avatarUrl} size="md" />
        </div>
      </div>
    </header>
  );
}
