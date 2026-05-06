import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 lg:block">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Dumbbell className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">PulseGym</p>
              <p className="text-xs uppercase tracking-widest text-white/70">CRM Suite</p>
            </div>
          </Link>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              Run your gym like a modern SaaS business.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/80">
              Track memberships, plans, invoices, and member activity from a single,
              beautifully designed workspace built for serious operators.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Memberships", "Plans & Offers", "Invoicing", "Activity"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/60">© {new Date().getFullYear()} PulseGym, Inc.</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
