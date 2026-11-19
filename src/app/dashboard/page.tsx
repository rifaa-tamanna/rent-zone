"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";

/**
 * /dashboard — resolves the signed-in user's role and forwards them to
 * the matching dashboard (customer / owner / admin). Guests land on the
 * customer dashboard, mirroring the sidebar's default role.
 */
export default function DashboardIndexPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const rawRole = (session?.user as { role?: string } | undefined)?.role;
  const role = rawRole === "owner" || rawRole === "admin" ? rawRole : "customer";

  useEffect(() => {
    if (isPending) return;
    router.replace(`/dashboard/${role}`);
  }, [isPending, role, router]);

  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="space-y-3">
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="h-9 w-72 max-w-full rounded-lg" />
        <Skeleton className="h-4 w-96 max-w-full rounded-md" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-32 rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
