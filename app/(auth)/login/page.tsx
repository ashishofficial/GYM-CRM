"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FieldError, Label } from "@/components/ui/Label";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signInAction } from "./actions";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const SESSION_KEY = "gym-crm-session";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPwd, setShowPwd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (values: FormValues) => {
    const result = await signInAction(values.email, values.password);

    if (!result.ok) {
      toast.error(result.error ?? "Sign-in failed");
      return;
    }

    // Mirror session info into localStorage so the Topbar can show the user
    // (cookie was already set server-side by the action).
    if (result.session) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(result.session));
      } catch {
        // ignore
      }
    }

    toast.success(`Welcome back, ${result.session?.name ?? ""}`);
    const from = searchParams.get("from") || "/dashboard";
    router.push(from);
    router.refresh();
  };

  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/85 p-7 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-9">
      {/* Header */}
      <div className="mb-7">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          All systems operational
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[2rem]">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Sign in to your admin workspace to continue.
        </p>
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
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
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

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            {...register("remember")}
          />
          Keep me signed in
        </label>

        <Button
          type="submit"
          loading={isSubmitting}
          size="lg"
          className="group w-full bg-gradient-to-r from-brand-600 via-brand-600 to-indigo-600 shadow-[0_8px_24px_-8px_rgba(75,102,255,0.6)] hover:from-brand-700 hover:via-brand-700 hover:to-indigo-700 hover:shadow-[0_10px_28px_-8px_rgba(75,102,255,0.7)]"
        >
          Sign in
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </form>
    </div>
  );
}
