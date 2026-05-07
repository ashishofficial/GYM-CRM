"use client";

import { useMounted } from "@/hooks/useMounted";
import { activities } from "@/data/activities";
import { formatDate } from "@/lib/utils";
import {
  BellOff,
  Check,
  CreditCard,
  FileText,
  RefreshCcw,
  StickyNote,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const iconMap: Record<string, { icon: LucideIcon; tone: string }> = {
  join: { icon: UserPlus, tone: "bg-emerald-50 text-emerald-600" },
  renewal: { icon: RefreshCcw, tone: "bg-sky-50 text-sky-600" },
  payment: { icon: CreditCard, tone: "bg-brand-50 text-brand-600" },
  "plan-change": { icon: FileText, tone: "bg-amber-50 text-amber-600" },
  note: { icon: StickyNote, tone: "bg-slate-100 text-slate-600" },
};

function timeAgo(ts: string) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  if (days < 30) return `${days}d ago`;
  return formatDate(ts);
}

export function NotificationsDropdown({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const unreadCount = activities.filter((a) => !readIds.has(a.id)).length;

  const markAllRead = () => {
    setReadIds(new Set(activities.map((a) => a.id)));
  };

  const markRead = (id: string) => {
    setReadIds((prev) => new Set([...prev, id]));
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-30 mt-2 w-[min(92vw,360px)] origin-top-right overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] animate-scale-in"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Notifications</p>
          <p className="text-[11px] text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} unread`
              : "You're all caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-brand-600 hover:bg-brand-50 hover:text-brand-700"
          >
            <Check className="h-3.5 w-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <ol className="max-h-[60vh] divide-y divide-slate-100 overflow-y-auto scrollbar-thin">
        {activities.length === 0 ? (
          <li className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <BellOff className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-700">
              No notifications
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Member activity will show up here.
            </p>
          </li>
        ) : (
          activities.map((a) => {
            const { icon: Icon, tone } = iconMap[a.type] ?? iconMap.note;
            const isRead = readIds.has(a.id);
            return (
              <li
                key={a.id}
                onClick={() => markRead(a.id)}
                className={`group flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 ${
                  isRead ? "opacity-70" : ""
                }`}
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-slate-900">
                    <span className="font-semibold">{a.memberName}</span>{" "}
                    <span className="text-slate-600">{a.description}</span>
                  </p>
                  <p
                    className="mt-0.5 text-[11px] text-slate-400"
                    suppressHydrationWarning
                  >
                    {mounted ? timeAgo(a.timestamp) : formatDate(a.timestamp)}
                  </p>
                </div>
                {!isRead && (
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500 ring-2 ring-brand-100" />
                )}
              </li>
            );
          })
        )}
      </ol>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="block text-center text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          View all activity
        </Link>
      </div>
    </div>
  );
}
