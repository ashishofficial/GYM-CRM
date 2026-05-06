import { RouteProgress } from "@/components/ui/RouteProgress";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AuthLoading() {
  return (
    <>
      <RouteProgress />
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-12 w-full" />
      </div>
    </>
  );
}
