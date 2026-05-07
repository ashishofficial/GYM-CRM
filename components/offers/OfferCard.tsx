"use client";

import { Button } from "@/components/ui/Button";
import { cn, formatCurrency } from "@/lib/utils";
import type { Offer } from "@/types";
import { Power, PowerOff, Sparkles } from "lucide-react";

interface Props {
  offer: Offer;
  index: number;
  onApply?: (offer: Offer) => void;
  onToggle?: (offer: Offer) => void;
}

const gradients = [
  {
    surface: "from-brand-600 via-brand-700 to-indigo-800",
    glow: "hover:shadow-[0_18px_44px_-12px_rgba(75,102,255,0.55)]",
  },
  {
    surface: "from-emerald-600 via-teal-700 to-cyan-800",
    glow: "hover:shadow-[0_18px_44px_-12px_rgba(16,185,129,0.55)]",
  },
  {
    surface: "from-violet-600 via-purple-700 to-fuchsia-800",
    glow: "hover:shadow-[0_18px_44px_-12px_rgba(139,92,246,0.55)]",
  },
  {
    surface: "from-amber-600 via-orange-700 to-rose-700",
    glow: "hover:shadow-[0_18px_44px_-12px_rgba(245,158,11,0.55)]",
  },
];

export function OfferCard({ offer, index, onApply, onToggle }: Props) {
  const grad = gradients[index % gradients.length];
  const valueLabel =
    offer.type === "percentage"
      ? `${offer.value}%`
      : formatCurrency(offer.value);

  if (!offer.active) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-50/60 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-md">
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-200/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <PowerOff className="h-3 w-3" />
          Inactive
        </span>
        <p className="font-mono text-4xl font-bold tabular-nums text-slate-400">
          {valueLabel}
        </p>
        <h3 className="mt-2 text-base font-semibold text-slate-700">{offer.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{offer.description}</p>

        <div className="mt-5 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onToggle?.(offer)}>
            <Power className="h-3.5 w-3.5" />
            Activate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl p-6 text-white shadow-[0_10px_28px_-12px_rgba(15,23,42,0.45)] transition-all hover:-translate-y-1",
        grad.glow,
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", grad.surface)} />
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur ring-1 ring-white/20">
          <Sparkles className="h-3 w-3" />
          {offer.type === "percentage" ? "Percentage off" : "Flat amount off"}
        </span>

        <p className="font-mono text-5xl font-extrabold tabular-nums leading-none">
          {valueLabel}
        </p>
        <h3 className="mt-3 text-lg font-bold tracking-tight">{offer.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/80">
          {offer.description}
        </p>

        <div className="mt-5 flex flex-1 items-end gap-2">
          <Button
            size="sm"
            className="flex-1 bg-white text-slate-900 shadow-soft hover:bg-white/90"
            onClick={() => onApply?.(offer)}
          >
            Apply to member
          </Button>
        </div>
      </div>
    </div>
  );
}
