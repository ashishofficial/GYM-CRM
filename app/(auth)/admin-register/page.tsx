"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FieldError, Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Building2, Eye, EyeOff, KeyRound, Lock, Mail, Phone, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  gymName: string;
  branches: string;
  role: string;
  inviteCode: string;
  password: string;
  confirmPassword: string;
}

export default function AdminRegisterPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { role: "Owner" } });

  const password = watch("password");

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`Admin account created for ${values.gymName}`);
    router.push("/dashboard");
  };

  return (
    <div>
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin onboarding
        </span>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          Register your gym
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Set up your admin account and start managing your members.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Your name</Label>
            <Input
              id="fullName"
              placeholder="Jordan Lee"
              iconLeft={<User className="h-4 w-4" />}
              error={!!errors.fullName}
              {...register("fullName", { required: "Required" })}
            />
            <FieldError>{errors.fullName?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select id="role" error={!!errors.role} {...register("role", { required: "Required" })}>
              <option>Owner</option>
              <option>Manager</option>
              <option>Operations</option>
              <option>Front Desk</option>
            </Select>
            <FieldError>{errors.role?.message}</FieldError>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@gym.com"
              iconLeft={<Mail className="h-4 w-4" />}
              error={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Enter a valid email" },
              })}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 555 000 0000"
              iconLeft={<Phone className="h-4 w-4" />}
              error={!!errors.phone}
              {...register("phone", { required: "Phone is required" })}
            />
            <FieldError>{errors.phone?.message}</FieldError>
          </div>
        </div>

        <div>
          <Label htmlFor="gymName">Gym / Studio name</Label>
          <Input
            id="gymName"
            placeholder="PulseGym Downtown"
            iconLeft={<Building2 className="h-4 w-4" />}
            error={!!errors.gymName}
            {...register("gymName", { required: "Gym name is required" })}
          />
          <FieldError>{errors.gymName?.message}</FieldError>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="branches">Number of branches</Label>
            <Select id="branches" {...register("branches")}>
              <option value="1">1 location</option>
              <option value="2-5">2 – 5 locations</option>
              <option value="6+">6+ locations</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="inviteCode">Invite / Org code</Label>
            <Input
              id="inviteCode"
              placeholder="Optional"
              iconLeft={<KeyRound className="h-4 w-4" />}
              {...register("inviteCode")}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPwd ? "text" : "password"}
            placeholder="At least 8 characters"
            iconLeft={<Lock className="h-4 w-4" />}
            iconRight={
              <button type="button" onClick={() => setShowPwd((v) => !v)} aria-label="Toggle password">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
          />
          <FieldError>{errors.password?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            iconLeft={<Lock className="h-4 w-4" />}
            iconRight={
              <button type="button" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle password">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={!!errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (v) => v === password || "Passwords do not match",
            })}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </div>

        <Button type="submit" className="w-full" loading={isSubmitting} size="lg">
          Create admin account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an admin account?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
