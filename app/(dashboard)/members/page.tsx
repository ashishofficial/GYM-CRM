"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { AddMemberModal } from "@/components/members/AddMemberModal";
import { MemberTable } from "@/components/members/MemberTable";
import { MembersStats } from "@/components/members/MembersStats";
import { members as seedMembers } from "@/data/members";
import { getPlanStatus } from "@/lib/utils";
import type { Member } from "@/types";
import { Download, Filter, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  expiring: "Expiring soon",
  expired: "Expired",
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(seedMembers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [plan, setPlan] = useState("all");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        m.fullName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.membershipId.toLowerCase().includes(q);

      const memberStatus = m.currentPlan ? getPlanStatus(m.currentPlan.expiryDate) : "expired";
      const matchStatus = status === "all" || memberStatus === status;
      const matchPlan = plan === "all" || m.currentPlan?.planName === plan;
      return matchQ && matchStatus && matchPlan;
    });
  }, [members, query, status, plan]);

  const handleCreate = (member: Member) => {
    setMembers((prev) => [member, ...prev]);
  };

  const activeFilters = [
    status !== "all" && { key: "status", label: STATUS_LABELS[status] ?? status, clear: () => setStatus("all") },
    plan !== "all" && { key: "plan", label: plan, clear: () => setPlan("all") },
    query.trim() !== "" && { key: "query", label: `"${query}"`, clear: () => setQuery("") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Members"
        description={`Manage your gym's ${members.length} members and their memberships.`}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Export started")}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" />
              Add member
            </Button>
          </>
        }
      />

      <MembersStats members={members} />

      <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, phone or membership ID"
              iconLeft={<Search className="h-4 w-4" />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full sm:w-[160px]"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring soon</option>
              <option value="expired">Expired</option>
            </Select>
            <Select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full sm:w-[160px]"
            >
              <option value="all">All plans</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Elite">Elite</option>
              <option value="Student">Student</option>
            </Select>
            <Button variant="outline" size="md">
              <Filter className="h-4 w-4" />
              More
            </Button>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Filters:
            </span>
            {activeFilters.map((f) => (
              <button
                key={f.key}
                onClick={f.clear}
                className="group inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200 transition-colors hover:bg-brand-100"
              >
                {f.label}
                <X className="h-3 w-3 text-brand-500 group-hover:text-brand-700" />
              </button>
            ))}
            <button
              onClick={() => {
                setStatus("all");
                setPlan("all");
                setQuery("");
              }}
              className="text-xs font-medium text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <MemberTable members={filtered} />

      <p className="text-xs text-slate-500">
        Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of{" "}
        {members.length} members
      </p>

      {addOpen && (
        <AddMemberModal
          open
          onClose={() => setAddOpen(false)}
          onCreate={handleCreate}
          existingCount={members.length}
        />
      )}
    </div>
  );
}
