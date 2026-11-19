import { Card } from "@/components/ui/card";

export interface BarChartDataPoint {
  /** X-axis label, e.g. "Jun". */
  label: string;
  /** Short value shown above the bar, e.g. "$2.2k". */
  value: string;
  /** Bar height as a percentage of the plot area (0–100). */
  height: number;
}

interface BarChartCardProps {
  title: string;
  description?: string;
  data: BarChartDataPoint[];
  className?: string;
}

/**
 * Lightweight CSS bar chart (no chart dependency) styled with the brand
 * copper token, used for earnings / booking trends in the dashboards.
 */
export function BarChartCard({
  title,
  description,
  data,
  className,
}: BarChartCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-card-foreground">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1.1px] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]">
          <span className="size-1.5 rounded-full bg-[var(--rz-heading)] dark:bg-[var(--rz-heading-hover)]" />
          Live
        </span>
      </div>

      <div
        className="mt-4 flex h-44 items-end gap-2 sm:gap-3"
        role="img"
        aria-label={`${title} bar chart`}
      >
        {data.map((point) => (
          <div
            key={point.label}
            className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
            title={`${point.label}: ${point.value}`}
          >
            <span className="text-[10px] font-bold text-muted-foreground">
              {point.value}
            </span>
            <div
              className="w-full rounded-t-md bg-[var(--rz-heading)] transition-opacity group-hover:opacity-80 dark:bg-[var(--rz-heading-hover)]"
              style={{ height: `${point.height}%` }}
            />
            <span className="text-[11px] font-medium text-muted-foreground">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
