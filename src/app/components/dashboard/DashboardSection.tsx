import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  /** In-page anchor id — sidebar menu items scroll here (e.g. "bookings"). */
  id: string;
  title: string;
  description?: string;
  /** Optional right-aligned control (filter, link, badge…). */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * A titled dashboard section. The `id` doubles as the hash target for the
 * sidebar navigation, and `scroll-mt` clears the sticky site header.
 */
export function DashboardSection({
  id,
  title,
  description,
  action,
  children,
  className,
}: DashboardSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 scroll-smooth", className)}
      aria-labelledby={`${id}-title`}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2
            id={`${id}-title`}
            className="text-lg font-bold tracking-tight md:text-xl dark:text-[var(--rz-heading-hover)]"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>

      {children}
    </section>
  );
}
