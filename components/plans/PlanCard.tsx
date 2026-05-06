"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plan } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  plan: Plan;
  onAssign?: (plan: Plan) => void;
  onEdit?: (plan: Plan) => void;
}

export function PlanCard({ plan, onAssign, onEdit }: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg",
        plan.popular ? "border-brand-300 ring-1 ring-brand-200" : "border-slate-200",
      )}
    >
      {plan.popular && (
        <span className="absolute -top-2.5 left-6">
          <Badge tone="brand">Most popular</Badge>
        </span>
      )}

      <div>
        <p className="text-sm font-medium text-slate-500">{plan.duration}</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">{plan.name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight text-slate-900">
            {formatCurrency(plan.price)}
          </span>
          <span className="text-sm text-slate-500">
            / {plan.duration === "Monthly" ? "mo" : plan.duration === "Quarterly" ? "qtr" : "yr"}
          </span>
        </div>
      </div>

      <ul className="my-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <span className="text-slate-700">{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <Button
          variant={plan.popular ? "primary" : "outline"}
          className="flex-1"
          onClick={() => onAssign?.(plan)}
        >
          Assign to member
        </Button>
        <Button variant="ghost" onClick={() => onEdit?.(plan)}>
          Edit
        </Button>
      </div>
    </div>
  );
}
