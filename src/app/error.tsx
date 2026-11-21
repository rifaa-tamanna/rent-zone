"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("RentZone app error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
        <AlertCircle className="size-9" />
      </div>

      <h2 className="mt-5 text-2xl font-extrabold text-foreground sm:text-3xl">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred while loading this page. Please try again."}
      </p>

      <div className="mt-6 flex gap-3">
        <Button
          onClick={() => reset()}
          className="gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] font-bold text-[#F3DFC2]"
        >
          <RefreshCw className="size-4" />
          Try Again
        </Button>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <Home className="size-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
