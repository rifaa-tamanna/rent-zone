import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

const toneClasses: Record<StatusTone, string> = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-500",
  danger:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
  info: "border-[rgba(166,83,46,0.30)] bg-[rgba(166,83,46,0.10)] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]",
  neutral: "border-border bg-muted text-muted-foreground",
};

interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  className?: string;
  children?: ReactNode;
}

/** Small pill status indicator built on the shadcn Badge. */
export function StatusBadge({
  label,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-semibold", toneClasses[tone], className)}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-current" />
      {label}
    </Badge>
  );
}
