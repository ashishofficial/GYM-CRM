"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FieldError, Label } from "@/components/ui/Label";
import { setSession } from "@/lib/auth";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const DEMO_EMAIL = "admin@pulsegym.app";
const DEMO_PASSWORD = "admin123";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPwd, setShowPwd] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { email: "", password: "", remember: true } });

  const onSubmit = async (values: FormValues) => {
    // Mock: accept demo credentials or any valid form
    await new Promise((r) => setTimeout(r, 500));

    const acceptCredentials =
      values.email === DEMO_EMAIL && values.password === DEMO_PASSWORD;
    const acceptAnyValid = values.password.length >= 6;

    if (!acceptCredentials && !acceptAnyValid) {
      toast.error("Invalid email or password");
      return;
    }

    const namePart = values.email.split("@")[0];
    setSession({
      email: values.email,
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      role: "Admin",
      loggedInAt: new Date().toISOString(),
    });

    toast.success(`Welcome back, ${namePart}!`);

    const from = searchParams.get("from") || "/dashboard";
    router.push(from);
    router.refresh();
  };

  const fillDemo = () => {
    setValue("email", DEMO_EMAIL, { shouldValidate: true });
    setValue("password", DEMO_PASSWORD, { shouldValidate: true });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Enter your credentials to access the CRM.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email address</Label>
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
          <div className="mb-1.5 flex items-center justify-between">
            <Label htmlFor="password" className="mb-0">
              Password
            </Label>
            <Link href="#" className="text-xs font-medium text-brand-600 hover:text-brand-700">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type={showPwd ? "text" : "password"}
            placeholder="••••••••"
            iconLeft={<Lock className="h-4 w-4" />}
            iconRight={
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="text-slate-400 hover:text-slate-700"
                aria-label="Toggle password visibility"
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          <FieldError>{errors.password?.message}</FieldError>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              {...register("remember")}
            />
            Remember me
          </label>
        </div>

        <Button type="submit" className="w-full" loading={isSubmitting} size="lg">
          Sign in
        </Button>
      </form>

      <button
        type="button"
        onClick={fillDemo}
        className="mt-4 flex w-full items-center justify-between gap-2 rounded-lg border border-dashed border-brand-200 bg-brand-50/40 px-4 py-3 text-left text-xs transition-colors hover:bg-brand-50"
      >
        <span className="flex items-center gap-2 text-brand-700">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-semibold">Use demo credentials</span>
        </span>
        <span className="font-mono text-[11px] text-slate-500">
          {DEMO_EMAIL} · {DEMO_PASSWORD}
        </span>
      </button>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-brand-600 hover:text-brand-700">
          Sign up
        </Link>
        {" · "}
        <Link href="/admin-register" className="font-medium text-brand-600 hover:text-brand-700">
          Register as Admin
        </Link>
      </p>
    </div>
  );
}
