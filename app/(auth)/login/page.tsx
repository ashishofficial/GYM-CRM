"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FieldError, Label } from "@/components/ui/Label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { email: "", password: "", remember: true } });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success(`Welcome back, ${values.email.split("@")[0]}!`);
    router.push("/dashboard");
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

      <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        OR
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid gap-2">
        <Button variant="outline" size="lg" className="w-full">
          Continue with Google
        </Button>
      </div>

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
