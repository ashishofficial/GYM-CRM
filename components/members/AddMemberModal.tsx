"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FieldError, Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { plans } from "@/data/plans";
import { initials } from "@/lib/utils";
import { Member } from "@/types";
import { Camera, Upload, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  occupation: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  planId: string;
  startDate: string;
  notes: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (member: Member) => void;
  existingCount: number;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

const defaults: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  avatarUrl: "",
  dob: "",
  gender: "Male",
  occupation: "",
  address: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
  planId: "none",
  startDate: todayISO(),
  notes: "",
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="border-b border-slate-100 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
    {children}
  </p>
);

export function AddMemberModal({ open, onClose, onCreate, existingCount }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: defaults });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) reset(defaults);
  }, [open, reset]);

  const fullName = watch("fullName");
  const avatarUrl = watch("avatarUrl");

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setValue("avatarUrl", reader.result as string, { shouldDirty: true });
    reader.onerror = () => toast.error("Failed to read image");
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => setValue("avatarUrl", "", { shouldDirty: true });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));

    const id = `m-${String(Date.now()).slice(-6)}`;
    const year = new Date().getFullYear();
    const membershipId = `GYM-${year}-${String(existingCount + 1).padStart(3, "0")}`;

    const plan = plans.find((p) => p.id === values.planId);
    const start = new Date(values.startDate);
    const expiry = plan ? new Date(start.getTime() + plan.durationDays * 86400000) : null;

    const member: Member = {
      id,
      membershipId,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      avatarUrl: values.avatarUrl,
      dob: values.dob || "",
      gender: values.gender,
      address: values.address.trim(),
      occupation: values.occupation.trim(),
      emergencyContact: {
        name: values.emergencyName.trim(),
        phone: values.emergencyPhone.trim(),
        relation: values.emergencyRelation.trim() || "—",
      },
      joinDate: values.startDate,
      isActive: true,
      currentPlan: plan
        ? {
            planId: plan.id,
            planName: plan.name,
            price: plan.price,
            duration: plan.duration,
            startDate: values.startDate,
            expiryDate: expiry!.toISOString().slice(0, 10),
          }
        : null,
      planHistory: plan
        ? [
            {
              id: `ph-${Date.now()}`,
              planId: plan.id,
              planName: plan.name,
              startDate: values.startDate,
              endDate: expiry!.toISOString().slice(0, 10),
              pricePaid: plan.price,
              discount: 0,
            },
          ]
        : [],
      payments: plan
        ? [
            {
              id: `p-${Date.now()}`,
              invoiceId: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
              date: values.startDate,
              amount: plan.price,
              method: "Card",
              status: "Paid",
              planName: plan.name,
            },
          ]
        : [],
      notes: values.notes.trim() ? [values.notes.trim()] : [],
      lastVisit: values.startDate,
      attendanceThisMonth: 0,
    };

    onCreate(member);
    toast.success(`${member.fullName} added`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add new member"
      description="Register a new gym member."
      size="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
            Add member
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Avatar uploader */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white ring-2 ring-white shadow-soft"
            aria-label="Upload avatar"
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <span>{initials(fullName || "NM")}</span>
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-4 w-4 text-white" />
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <input type="hidden" {...register("avatarUrl")} />
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5" />
              {avatarUrl ? "Change photo" : "Upload photo"}
            </Button>
            {avatarUrl && (
              <Button type="button" variant="ghost" size="sm" onClick={removeAvatar}>
                <X className="h-3.5 w-3.5" />
                Remove
              </Button>
            )}
            <span className="ml-auto text-[11px] text-slate-400">PNG / JPG · max 2 MB</span>
          </div>
        </div>

        {/* Personal info */}
        <SectionLabel>Personal info</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Full name</Label>
            <Input
              placeholder="Jane Doe"
              error={!!errors.fullName}
              {...register("fullName", { required: "Required" })}
            />
            <FieldError>{errors.fullName?.message}</FieldError>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="jane@example.com"
              error={!!errors.email}
              {...register("email", {
                required: "Required",
                pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email" },
              })}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
              placeholder="+1 555 000 0000"
              error={!!errors.phone}
              {...register("phone", { required: "Required", minLength: { value: 7, message: "Invalid" } })}
            />
            <FieldError>{errors.phone?.message}</FieldError>
          </div>
          <div>
            <Label>Date of birth</Label>
            <Input type="date" {...register("dob")} />
          </div>
          <div>
            <Label>Gender</Label>
            <Select {...register("gender")}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label>Occupation</Label>
            <Input placeholder="Software Engineer" {...register("occupation")} />
          </div>
          <div className="sm:col-span-2">
            <Label>Address</Label>
            <Input placeholder="123 Main St, City" {...register("address")} />
          </div>
        </div>

        {/* Emergency contact */}
        <SectionLabel>Emergency contact</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label>Name</Label>
            <Input placeholder="John Doe" {...register("emergencyName")} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input type="tel" placeholder="+1 555 000 0000" {...register("emergencyPhone")} />
          </div>
          <div>
            <Label>Relation</Label>
            <Input placeholder="Spouse" {...register("emergencyRelation")} />
          </div>
        </div>

        {/* Plan */}
        <SectionLabel>Membership</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Assign plan</Label>
            <Select {...register("planId")}>
              <option value="none">No plan (assign later)</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price} ({p.duration})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Start / Join date</Label>
            <Input
              type="date"
              error={!!errors.startDate}
              {...register("startDate", { required: "Required" })}
            />
            <FieldError>{errors.startDate?.message}</FieldError>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label>Notes (optional)</Label>
          <Textarea rows={2} placeholder="Goals, preferences, special needs..." {...register("notes")} />
        </div>
      </form>
    </Modal>
  );
}
