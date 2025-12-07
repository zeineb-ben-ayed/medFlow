"use client";

import { cn } from "@/src/lib/utils";

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "primary" | "accent" | "info" | "success" | "warning";
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: Props) {
  const variants = {
    default: "bg-card",
    primary: "bg-gradient-to-br from-primary/10 to-primary/5",
    accent: "bg-gradient-to-br from-accent/20 to-accent/10",
    info: "bg-gradient-to-br from-info/10 to-info/5",
    success: "bg-gradient-to-br from-success/10 to-success/5",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5",
  };

  const iconVariants = {
    default: "bg-muted text-foreground",
    primary: "bg-primary/20 text-primary",
    accent: "bg-accent/30 text-accent-foreground",
    info: "bg-info/20 text-info",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border p-5 transition-all hover:shadow-md",
        variants[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-success" : "text-destructive"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconVariants[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
