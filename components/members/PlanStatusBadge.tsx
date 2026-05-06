import { Badge } from "@/components/ui/Badge";
import { getPlanStatus } from "@/lib/utils";

export function PlanStatusBadge({ expiryDate }: { expiryDate: string | null | undefined }) {
  if (!expiryDate) {
    return (
      <Badge tone="neutral" dot>
        No plan
      </Badge>
    );
  }
  const status = getPlanStatus(expiryDate);
  if (status === "active")
    return (
      <Badge tone="success" dot>
        Active
      </Badge>
    );
  if (status === "expiring")
    return (
      <Badge tone="warning" dot>
        Expiring soon
      </Badge>
    );
  return (
    <Badge tone="danger" dot>
      Expired
    </Badge>
  );
}
