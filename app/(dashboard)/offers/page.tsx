"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { OfferCard } from "@/components/offers/OfferCard";
import { OffersStats } from "@/components/offers/OffersStats";
import { members } from "@/data/members";
import { offers } from "@/data/plans";
import { formatCurrency } from "@/lib/utils";
import type { Offer } from "@/types";
import { Plus, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function OffersPage() {
  const [memberId, setMemberId] = useState(members[0].id);
  const [type, setType] = useState<"percentage" | "flat">("percentage");
  const [value, setValue] = useState(15);
  const [name, setName] = useState("Spring Bonus");

  const member = members.find((m) => m.id === memberId)!;
  const planPrice = member.currentPlan?.price ?? 0;

  const discount = useMemo(
    () => (type === "percentage" ? (planPrice * value) / 100 : value),
    [type, value, planPrice],
  );
  const finalAmount = Math.max(0, planPrice - discount);

  const handleApply = () => {
    if (!member.currentPlan) {
      toast.error("Member has no active plan");
      return;
    }
    toast.success(`${name} applied to ${member.fullName}`);
  };

  // Pre-fill the apply form from a card click
  const handleApplyFromCard = (offer: Offer) => {
    setName(offer.name);
    setType(offer.type);
    setValue(offer.value);
    // Smooth scroll to the form
    if (typeof document !== "undefined") {
      document
        .getElementById("apply-offer")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggle = (offer: Offer) => {
    toast.success(
      `${offer.name} ${offer.active ? "deactivated" : "activated"}`,
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Offers"
        description="Create discounts and apply them to members."
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New offer
          </Button>
        }
      />

      <OffersStats />

      {/* Offer cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
        {offers.map((o, i) => (
          <OfferCard
            key={o.id}
            offer={o}
            index={i}
            onApply={handleApplyFromCard}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Apply offer form */}
      <Card id="apply-offer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Tag className="h-4 w-4" />
            </span>
            <div>
              <CardTitle>Apply offer to a member</CardTitle>
              <p className="text-xs text-slate-500">
                Customize the discount and target member
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Offer name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Spring Special"
              />
            </div>
            <div>
              <Label>Select member</Label>
              <Select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} — {m.currentPlan?.planName ?? "No plan"}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Offer type</Label>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as "percentage" | "flat")}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat amount ($)</option>
              </Select>
            </div>
            <div>
              <Label>Value</Label>
              <Input
                type="number"
                min={0}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-white via-brand-50/30 to-violet-50/30 p-4">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
            <p className="relative text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Preview
            </p>
            <div className="relative mt-3 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <Avatar name={member.fullName} src={member.avatarUrl} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {member.fullName}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {member.currentPlan?.planName ?? "—"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Plan price
                </p>
                <p className="font-mono text-lg font-bold tabular-nums text-slate-900">
                  {formatCurrency(planPrice)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  After discount
                </p>
                <p className="font-mono text-lg font-bold tabular-nums text-slate-900">
                  {formatCurrency(finalAmount)}
                </p>
                <p className="font-mono text-xs font-semibold text-emerald-700">
                  −{formatCurrency(discount)} off
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleApply}>
              <Tag className="h-4 w-4" />
              Apply offer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
