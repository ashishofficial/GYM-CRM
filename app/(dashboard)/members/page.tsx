"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { AddMemberModal } from "@/components/members/AddMemberModal";
import { MemberTable } from "@/components/members/MemberTable";
import { members as seedMembers } from "@/data/members";
import { getPlanStatus } from "@/lib/utils";
import type { Member } from "@/types";
import { Download, Filter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

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

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card lg:flex-row lg:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email, phone or membership ID"
            iconLeft={<Search className="h-4 w-4" />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[160px]">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring soon</option>
            <option value="expired">Expired</option>
          </Select>
          <Select value={plan} onChange={(e) => setPlan(e.target.value)} className="w-[160px]">
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

      <MemberTable members={filtered} />

      <p className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-700">{filtered.length}</span> of{" "}
        {members.length} members
      </p>

      <AddMemberModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={handleCreate}
        existingCount={members.length}
      />
    </div>
  );
}
