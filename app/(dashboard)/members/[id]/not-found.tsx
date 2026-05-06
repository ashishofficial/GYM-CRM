import { Card } from "@/components/ui/Card";
import { UserX } from "lucide-react";
import Link from "next/link";

export default function MemberNotFound() {
  return (
    <Card className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
        <UserX className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-slate-900">Member not found</h2>
      <p className="mt-1 text-sm text-slate-500">
        This member doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/members"
        className="mt-5 inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-soft transition-colors hover:bg-slate-50"
      >
        Back to members
      </Link>
    </Card>
  );
}
