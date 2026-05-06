import { Card } from "@/components/ui/Card";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <>
      <RouteProgress />
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>

        {/* Quick actions / KPI grid placeholder */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-9 w-9 rounded-xl" />
              </div>
              <Skeleton className="mt-5 h-8 w-24" />
              <Skeleton className="mt-3 h-3 w-32" />
            </Card>
          ))}
        </div>

        {/* Two-column content area */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="space-y-4 p-6">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-3 w-64" />
              <Skeleton className="h-[260px] w-full" />
            </div>
          </Card>
          <Card>
            <div className="space-y-4 p-6">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-[180px] w-full rounded-full" />
            </div>
          </Card>
        </div>

        {/* Table placeholder */}
        <Card>
          <div className="space-y-4 p-6">
            <Skeleton className="h-5 w-40" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
                <Skeleton className="h-7 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
