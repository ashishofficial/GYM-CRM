"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";

interface Props {
  onMenu: () => void;
}

export function Topbar({ onMenu }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur lg:px-6">
      <button
        onClick={onMenu}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 max-w-md">
        <Input
          placeholder="Search members, plans, invoices..."
          iconLeft={<Search className="h-4 w-4" />}
          className="bg-slate-50 border-slate-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">Alex Morgan</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <Avatar name="Alex Morgan" src="https://i.pravatar.cc/150?img=8" size="md" />
        </div>
      </div>
    </header>
  );
}
