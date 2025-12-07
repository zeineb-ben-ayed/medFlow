"use client";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface Props {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  variant?: "default" | "primary" | "accent";
}

export default function QuickAction({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "default",
}: Props) {
  const variants = {
    default: "bg-card hover:bg-muted/50",
    primary: "bg-primary/10 hover:bg-primary/20 border-primary/20",
    accent: "bg-accent/20 hover:bg-accent/30 border-accent/30",
  };

  const iconVariants = {
    default: "bg-muted text-foreground",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto p-4 flex flex-col items-start gap-3 rounded-2xl border transition-all",
        variants[variant]
      )}
      onClick={onClick}
    >
      <div className={cn("p-2.5 rounded-xl", iconVariants[variant])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-left">
        <p className="font-semibold text-sm">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </Button>
  );
}
