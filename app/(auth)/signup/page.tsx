"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FieldError, Label } from "@/components/ui/Label";
import { setSession } from "@/lib/auth";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function SignupPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSession({
      email: values.email,
      name: values.fullName,
      role: "Admin",
      loggedInAt: new Date().toISOString(),
    });
    toast.success(`Account created for ${values.fullName}`);
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Start managing your gym in minutes.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Jane Doe"
            iconLeft={<User className="h-4 w-4" />}
            error={!!errors.fullName}
            {...register("fullName", { required: "Full name is required" })}
          />
          <FieldError>{errors.fullName?.message}</FieldError>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@gym.com"
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
              {...register("phone", {
                required: "Phone is required",
                minLength: { value: 7, message: "Enter a valid phone" },
              })}
            />
            <FieldError>{errors.phone?.message}</FieldError>
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
            placeholder="Re-enter password"
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

        <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            {...register("acceptTerms", { required: "Please accept the terms" })}
          />
          <span>
            I agree to the{" "}
            <Link href="#" className="text-brand-600 hover:text-brand-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-brand-600 hover:text-brand-700">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError>{errors.acceptTerms?.message}</FieldError>

        <Button type="submit" className="w-full" loading={isSubmitting} size="lg">
          Create account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
