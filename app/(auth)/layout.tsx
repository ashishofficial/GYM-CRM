import {
  BarChart3,
  CheckCircle2,
  Dumbbell,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Users,
    title: "Member CRM",
    description: "Profiles, plan history, payments, and notes — all in one place.",
  },
  {
    icon: BarChart3,
    title: "Smart analytics",
    description: "MRR, churn, peak hours, and cohort retention out of the box.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in invoicing",
    description: "Generate, send, and track payments via email or WhatsApp.",
  },
];

// Diagonal clip — top-right is full-width, bottom-right cuts inward.
const BRAND_CLIP = "polygon(0 0, 100% 0, 78% 100%, 0 100%)";
// Slim companion polygon for an edge highlight along the diagonal.
const BRAND_EDGE_CLIP =
  "polygon(99.5% 0, 100% 0, 78.5% 100%, 78% 100%)";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 lg:grid lg:grid-cols-[58%_42%]">
      {/* === Brand panel (diagonal) === */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* Clipped gradient + decorations */}
        <div className="absolute inset-0" style={{ clipPath: BRAND_CLIP }}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-indigo-950" />
          <div className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-brand-400/40 blur-3xl" />
          <div className="absolute -bottom-40 right-1/4 h-[520px] w-[520px] rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute left-1/3 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
        </div>

        {/* Diagonal edge highlight */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent"
          style={{ clipPath: BRAND_EDGE_CLIP }}
        />

        {/* Content (constrained to left ~75% so it stays inside the diagonal) */}
        <div className="relative flex h-full flex-col justify-between p-10 pr-[22%] text-white xl:p-14 xl:pr-[24%]">
          {/* Logo + version pill */}
          <div className="flex items-center justify-between gap-4">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight">PulseGym</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                  CRM Suite
                </p>
              </div>
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              v2.0 release
            </span>
          </div>

          {/* Hero */}
          <div className="space-y-8">
            <h2 className="text-[2.5rem] font-extrabold leading-[1.05] tracking-tight xl:text-[3.25rem]">
              Run your gym like a{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text text-transparent">
                modern SaaS
              </span>{" "}
              business.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/75">
              Track memberships, plans, invoices, and member activity from a single,
              beautifully designed workspace built for serious operators.
            </p>

            {/* Features */}
            <ul className="space-y-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 backdrop-blur">
                      <Icon className="h-4.5 w-4.5 text-white" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                      <p className="text-xs leading-relaxed text-white/65">
                        {f.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Stats + footer */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="text-2xl font-bold tracking-tight">500+</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Active gyms
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">50k+</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Members
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">99.9%</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Uptime
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <p className="text-white/50">© {new Date().getFullYear()} PulseGym, Inc.</p>
              <span className="inline-flex items-center gap-1 text-white/65">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                SOC 2 compliant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* === Form panel === */}
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
        {/* Soft background accents (visible everywhere; sized smaller on desktop) */}
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl lg:h-96 lg:w-96 lg:bg-brand-100/60" />
        <div className="absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl lg:h-96 lg:w-96 lg:bg-violet-100/60" />

        {/* Mobile-only logo */}
        <Link
          href="/dashboard"
          className="relative mb-8 flex items-center gap-2.5 lg:hidden"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold tracking-tight text-slate-900">PulseGym</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              CRM Suite
            </p>
          </div>
        </Link>

        <div className="relative w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
