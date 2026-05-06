"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { offers } from "@/data/plans";
import { Member } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  member: Member;
}

export function ApplyOfferModal({ open, onClose, member }: Props) {
  const [mode, setMode] = useState<"existing" | "custom">("existing");
  const [offerId, setOfferId] = useState(offers[0].id);
  const [customType, setCustomType] = useState<"percentage" | "flat">("percentage");
  const [customValue, setCustomValue] = useState(10);

  const selectedOffer = offers.find((o) => o.id === offerId)!;
  const planPrice = member.currentPlan?.price ?? 0;

  const discountAmount = useMemo(() => {
    if (mode === "existing") {
      return selectedOffer.type === "percentage"
        ? (planPrice * selectedOffer.value) / 100
        : selectedOffer.value;
    }
    return customType === "percentage" ? (planPrice * customValue) / 100 : customValue;
  }, [mode, selectedOffer, customType, customValue, planPrice]);

  const finalAmount = Math.max(0, planPrice - discountAmount);

  const handleApply = () => {
    toast.success(
      `Offer applied — ${formatCurrency(discountAmount)} off for ${member.fullName}`,
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Apply offer"
      description={`Apply a discount to ${member.fullName}`}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={!member.currentPlan}>
            Apply offer
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {(["existing", "custom"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m ? "bg-white text-slate-900 shadow-soft" : "text-slate-600"
              }`}
            >
              {m === "existing" ? "Existing offer" : "Custom"}
            </button>
          ))}
        </div>

        {mode === "existing" ? (
          <div>
            <Label>Offer</Label>
            <Select value={offerId} onChange={(e) => setOfferId(e.target.value)}>
              {offers
                .filter((o) => o.active)
                .map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} — {o.type === "percentage" ? `${o.value}%` : formatCurrency(o.value)}
                  </option>
                ))}
            </Select>
            <p className="mt-1.5 text-xs text-slate-500">{selectedOffer.description}</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Discount type</Label>
              <Select value={customType} onChange={(e) => setCustomType(e.target.value as "percentage" | "flat")}>
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat amount ($)</option>
              </Select>
            </div>
            <div>
              <Label>Value</Label>
              <Input
                type="number"
                min={0}
                value={customValue}
                onChange={(e) => setCustomValue(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Preview</p>
          <dl className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Plan price</dt>
              <dd className="font-medium text-slate-900">{formatCurrency(planPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Discount</dt>
              <dd className="font-medium text-emerald-700">−{formatCurrency(discountAmount)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <dt className="font-medium text-slate-900">Final amount</dt>
              <dd className="text-lg font-semibold text-slate-900">
                {formatCurrency(finalAmount)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Modal>
  );
}
