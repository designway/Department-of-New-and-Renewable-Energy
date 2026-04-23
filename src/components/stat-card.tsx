import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  trend,
  className,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  trend?: { value: string; positive?: boolean };
  className?: string;
}) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
            <div className="text-2xl md:text-3xl font-semibold tabular-nums mt-1">{value}</div>
            {trend && (
              <div className={cn("text-xs mt-1", trend.positive ? "text-emerald" : "text-destructive")}>
                {trend.value}
              </div>
            )}
          </div>
          {icon && (
            <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
