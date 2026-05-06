import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Member } from "@/types";
import { daysBetween, formatCurrency, formatDate } from "@/lib/utils";
import {
  Briefcase,
  Cake,
  Calendar,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  UserRound,
  Users,
} from "lucide-react";

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-sm text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export function MemberOverviewTab({ member }: { member: Member }) {
  const remainingDays = member.currentPlan
    ? Math.max(0, daysBetween(new Date(), member.currentPlan.expiryDate))
    : 0;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <Field icon={UserRound} label="Full name" value={member.fullName} />
          <Field icon={Mail} label="Email" value={member.email} />
          <Field icon={Phone} label="Phone" value={member.phone} />
          <Field icon={Cake} label="Date of birth" value={formatDate(member.dob)} />
          <Field icon={Users} label="Gender" value={member.gender} />
          <Field icon={Briefcase} label="Occupation" value={member.occupation} />
          <div className="sm:col-span-2">
            <Field icon={MapPin} label="Address" value={member.address} />
          </div>
          <div className="sm:col-span-2">
            <Field
              icon={ShieldAlert}
              label="Emergency contact"
              value={`${member.emergencyContact.name} (${member.emergencyContact.relation}) · ${member.emergencyContact.phone}`}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field icon={UserRound} label="Membership ID" value={member.membershipId} />
            <Field icon={Calendar} label="Joined on" value={formatDate(member.joinDate)} />
          </div>

          {member.currentPlan ? (
            <div className="rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-brand-700">
                    Current plan
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {member.currentPlan.planName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatCurrency(member.currentPlan.price)} · {member.currentPlan.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Remaining
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{remainingDays} days</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 border-t border-brand-100 pt-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Start date</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDate(member.currentPlan.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Expiry date</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDate(member.currentPlan.expiryDate)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
              <p className="text-sm text-slate-500">No active plan assigned.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
