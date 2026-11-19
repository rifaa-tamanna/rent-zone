"use client";

import type { ReactNode } from "react";

import { useSession } from "@/lib/auth-client";

interface DashboardPageHeaderProps {
  /** Uppercase copper eyebrow pill, e.g. "Customer Dashboard". */
  eyebrow: string;
  /** Supporting copy under the greeting. */
  description: string;
  /** Right-aligned actions (primary/secondary CTAs). */
  action?: ReactNode;
}

/**
 * Shared page header for all role dashboards: brand eyebrow pill,
 * personalized greeting (brand heading color via the global h1 rule)
 * and muted description — same rhythm as the site's section headers.
 */
export function DashboardPageHeader({
  eyebrow,
  description,
  action,
}: DashboardPageHeaderProps) {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.trim().split(" ")[0];

  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[1.4px] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]">
          {eyebrow}
        </span>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          Welcome back{firstName ? `, ${firstName}` : ""}.
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      </div>

      {action && (
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {action}
        </div>
      )}
    </header>
  );
}
