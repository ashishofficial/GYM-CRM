"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Plan, Member } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { Check, Sparkles, UserPlus } from "lucide-react";

interface Props {
  plan: Plan;
  subscribers: Member[];
  onAssign?: (plan: Plan) => void;
  onEdit?: (plan: Plan) => void;
}

interface ToneStyle {
  card: string;
  blob: string;
  badgeBg: string;
  iconCheck: string;
  primaryButton: string;
  ghostButton: string;
}

const toneStyles: Record<string, ToneStyle> = {
  // Basic — neutral / slate
  Basic: {
    card: "bg-gradient-to-br from-white via-slate-50 to-slate-100/60 border border-slate-200/70",
    blob: "bg-slate-200/40",
    badgeBg: "bg-slate-100 text-slate-700",
    iconCheck: "text-slate-500",
    primaryButton: "",
    ghostButton: "",
  },
  // Student — emerald
  Student: {
    card: "bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/50 border border-emerald-100/70",
    blob: "bg-emerald-200/50",
    badgeBg: "bg-emerald-100 text-emerald-700",
    iconCheck: "text-emerald-600",
    primaryButton: "bg-emerald-600 hover:bg-emerald-700 text-white",
    ghostButton: "text-emerald-700 hover:bg-emerald-50",
  },
  // Elite — premium amber/gold
  Elite: {
    card: "bg-gradient-to-br from-white via-amber-50/50 to-amber-100/50 border border-amber-100/70",
    blob: "bg-amber-200/50",
    badgeBg: "bg-amber-100 text-amber-700",
    iconCheck: "text-amber-600",
    primaryButton: "bg-amber-600 hover:bg-amber-700 text-white",
    ghostButton: "text-amber-700 hover:bg-amber-50",
  },
  // Pro — uses the popular gradient hero (handled separately)
  Pro: {
    card: "",
    blob: "",
    badgeBg: "",
    iconCheck: "",
    primaryButton: "",
    ghostButton: "",
  },
};

const durationSuffix = (d: Plan["duration"]) =>
  d === "Monthly" ? "mo" : d === "Quarterly" ? "qtr" : "yr";

export function PlanCard({ plan, subscribers, onAssign, onEdit }: Props) {
  const isPopular = plan.popular;

  if (isPopular) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-2xl p-6 text-white shadow-[0_12px_32px_-12px_rgba(75,102,255,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_-12px_rgba(75,102,255,0.6)]">
        {/* Gradient surface */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-brand-700 to-indigo-800" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex flex-1 flex-col">
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur ring-1 ring-white/20">
            <Sparkles className="h-3 w-3" />
            Most popular
          </span>

          <p className="text-sm font-medium text-white/80">{plan.duration}</p>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{plan.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-mono text-4xl font-bold tracking-tight tabular-nums">
              {formatCurrency(plan.price)}
            </span>
            <span className="text-sm text-white/70">/ {durationSuffix(plan.duration)}</span>
          </div>

          <ul className="my-5 flex-1 space-y-2.5 border-t border-white/15 pt-5 text-sm">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-white/90">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mb-4 flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/15">
            {subscribers.length > 0 ? (
              <>
                <div className="flex -space-x-2">
                  {subscribers.slice(0, 4).map((m) => (
                    <Avatar
                      key={m.id}
                      name={m.fullName}
                      src={m.avatarUrl}
                      size="xs"
                      className="ring-2 ring-brand-700"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-white/80">
                  {subscribers.length} subscribed
                </span>
              </>
            ) : (
              <span className="text-[11px] text-white/70">No active subscribers</span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 bg-white text-brand-700 shadow-soft hover:bg-white/90"
              onClick={() => onAssign?.(plan)}
            >
              <UserPlus className="h-4 w-4" />
              Assign to member
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/15"
              onClick={() => onEdit?.(plan)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Non-popular tone-themed cards
  const style = toneStyles[plan.name] ?? toneStyles.Basic;

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-md",
        style.card,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl",
          style.blob,
        )}
      />

      <div className="relative flex flex-1 flex-col">
        <p className="text-sm font-medium text-slate-500">{plan.duration}</p>
        <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
          {plan.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold tracking-tight tabular-nums text-slate-900">
            {formatCurrency(plan.price)}
          </span>
          <span className="text-sm text-slate-500">/ {durationSuffix(plan.duration)}</span>
        </div>

        <ul className="my-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5 text-sm">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className={cn("mt-0.5 h-4 w-4 shrink-0", style.iconCheck)} />
              <span className="text-slate-700">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-100 bg-white/60 px-3 py-2">
          {subscribers.length > 0 ? (
            <>
              <div className="flex -space-x-2">
                {subscribers.slice(0, 4).map((m) => (
                  <Avatar key={m.id} name={m.fullName} src={m.avatarUrl} size="xs" />
                ))}
              </div>
              <span className="text-[11px] font-medium text-slate-600">
                {subscribers.length} subscribed
              </span>
            </>
          ) : (
            <span className="text-[11px] text-slate-500">No active subscribers</span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onAssign?.(plan)}
          >
            <UserPlus className="h-4 w-4" />
            Assign
          </Button>
          <Button variant="ghost" onClick={() => onEdit?.(plan)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
