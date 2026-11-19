import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  /** Icon rendered in the copper-tinted tile. */
  icon: LucideIcon;
  /** Uppercase muted label, e.g. "Active Rentals". */
  label: string;
  /** Big brand-colored value, e.g. "3" or "$1,240". */
  value: string;
  /** Optional change indicator, e.g. "+12%". */
  delta?: string;
  /** Follows the delta, e.g. "vs last month". */
  deltaLabel?: string;
  trend?: "up" | "down";
}

/**
 * Dashboard statistic card — shadcn Card + RentZone copper accents,
 * matches the heading/label rhythm used across the marketing site.
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaLabel,
  trend = "up",
}: StatCardProps) {
  return (
    <Card className="p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[1.2px] text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-extrabold tracking-tight text-[var(--rz-heading)] md:text-3xl">
            {value}
          </p>
          {(delta || deltaLabel) && (
            <p
              className={cn(
                "flex flex-wrap items-center gap-1 text-xs font-semibold",
                trend === "up"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-destructive dark:text-red-400"
              )}
            >
              {delta &&
                (trend === "up" ? (
                  <TrendingUp className="size-3.5" />
                ) : (
                  <TrendingDown className="size-3.5" />
                ))}
              {delta && <span>{delta}</span>}
              {deltaLabel && (
                <span className="font-medium text-muted-foreground">
                  {deltaLabel}
                </span>
              )}
            </p>
          )}
        </div>

        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(166,83,46,0.20)] bg-[rgba(166,83,46,0.10)] text-[var(--rz-heading)]">
          <Icon className="size-5" />
        </span>
      </div>
    </Card>
  );
}
