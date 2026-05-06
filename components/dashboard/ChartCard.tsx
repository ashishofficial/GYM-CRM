import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function ChartCard({
  title,
  description,
  icon: Icon,
  actions,
  children,
  className,
  bodyClassName,
}: Props) {
  return (
    <Card className={cn("h-full", className)}>
      <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-4">
        <div className="flex items-start gap-2.5">
          {Icon && (
            <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Icon className="h-4 w-4" />
            </span>
          )}
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-slate-900">{title}</h3>
            {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className={cn("flex-1 px-6 pb-6", bodyClassName)}>{children}</div>
    </Card>
  );
}
