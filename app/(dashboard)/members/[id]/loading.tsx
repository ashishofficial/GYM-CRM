import { Card } from "@/components/ui/Card";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { Skeleton } from "@/components/ui/Skeleton";

export default function MemberDetailLoading() {
  return (
    <>
      <RouteProgress />
      <div className="space-y-6">
        <Skeleton className="h-4 w-32" />

        {/* Profile header card */}
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-3 w-72" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-9 w-32" />
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>

        {/* Two-column overview */}
        <div className="grid gap-5 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <Card key={i}>
              <div className="space-y-3 p-6">
                <Skeleton className="h-5 w-40" />
                {[0, 1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-2.5 w-20" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
