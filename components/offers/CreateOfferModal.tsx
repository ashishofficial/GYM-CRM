"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FieldError, Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { Offer } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
  name: string;
  type: "percentage" | "flat";
  value: number;
  description: string;
  active: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (offer: Offer) => void;
}

const defaults: FormValues = {
  name: "",
  type: "percentage",
  value: 10,
  description: "",
  active: true,
};

export function CreateOfferModal({ open, onClose, onCreate }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: defaults });

  useEffect(() => {
    if (open) reset(defaults);
  }, [open, reset]);

  const type = watch("type");
  const value = watch("value");
  const name = watch("name");

  const previewLabel =
    type === "percentage" ? `${value || 0}%` : `$${value || 0}`;

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 300));
    const offer: Offer = {
      id: `offer-${Date.now()}`,
      name: values.name.trim(),
      type: values.type,
      value: Number(values.value),
      description:
        values.description.trim() ||
        (values.type === "percentage"
          ? `${values.value}% off any plan`
          : `$${values.value} off any plan`),
      active: values.active,
    };
    onCreate(offer);
    toast.success(`${offer.name} created`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create offer"
      description="Define a new discount that can be applied to members."
      size="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
            Create offer
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Live preview chip */}
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-brand-200 bg-gradient-to-br from-brand-50/60 to-violet-50/60 p-3">
          <span className="font-mono text-3xl font-extrabold tabular-nums text-brand-700">
            {previewLabel}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {name || "Offer preview"}
            </p>
            <p className="text-[11px] text-slate-500">
              {type === "percentage" ? "Percentage off" : "Flat amount off"}
            </p>
          </div>
        </div>

        <div>
          <Label>Offer name</Label>
          <Input
            placeholder="e.g. Spring Special"
            error={!!errors.name}
            {...register("name", { required: "Offer name is required" })}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Type</Label>
            <Select {...register("type")}>
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Flat amount ($)</option>
            </Select>
          </div>
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              min={0}
              error={!!errors.value}
              {...register("value", {
                required: "Value is required",
                valueAsNumber: true,
                min: { value: 0, message: "Must be ≥ 0" },
              })}
            />
            <FieldError>{errors.value?.message}</FieldError>
          </div>
        </div>

        <div>
          <Label>Description (optional)</Label>
          <Textarea
            rows={2}
            placeholder="Short description shown on the offer card"
            {...register("description")}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            {...register("active")}
          />
          Activate immediately
        </label>
      </form>
    </Modal>
  );
}
