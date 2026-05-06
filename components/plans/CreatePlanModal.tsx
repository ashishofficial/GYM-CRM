"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Label, FieldError } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PlanDuration } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  price: number;
  duration: PlanDuration;
  features: string;
}

export function CreatePlanModal({ open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", price: 0, duration: "Monthly", features: "" },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success(`${values.name} plan created`);
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create plan"
      description="Define a new membership plan."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
            Create plan
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label>Plan name</Label>
          <Input
            placeholder="e.g. Pro"
            error={!!errors.name}
            {...register("name", { required: "Plan name is required" })}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Price (USD)</Label>
            <Input
              type="number"
              min={0}
              step="1"
              error={!!errors.price}
              {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 0, message: "Must be ≥ 0" } })}
            />
            <FieldError>{errors.price?.message}</FieldError>
          </div>
          <div>
            <Label>Duration</Label>
            <Select error={!!errors.duration} {...register("duration", { required: true })}>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </Select>
          </div>
        </div>

        <div>
          <Label>Features</Label>
          <Textarea
            rows={4}
            placeholder="One feature per line, e.g.\n- Access to all classes\n- Unlimited gym time"
            {...register("features")}
          />
          <p className="mt-1.5 text-xs text-slate-500">List the benefits of this plan, one per line.</p>
        </div>
      </form>
    </Modal>
  );
}
