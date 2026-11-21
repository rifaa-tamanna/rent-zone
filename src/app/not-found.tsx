"use client";

import Link from "next/link";
import { ArrowLeft, Home, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-[rgba(166,83,46,0.12)] text-[#A6532E] shadow-sm">
        <PackageSearch className="size-10" />
      </div>

      <span className="mt-6 rounded-full border border-[rgba(166,83,46,0.25)] bg-[rgba(166,83,46,0.08)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[var(--rz-heading)]">
        404 — Page Not Found
      </span>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        Looking for Equipment That Moved?
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-4 py-2 font-bold text-[#F3DFC2] shadow-sm hover:bg-[image:var(--rz-btn-gradient-hover)]"
        >
          <Home className="size-4" />
          Back to Home
        </Link>

        <Link
          href="/equipment"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Browse Equipment
        </Link>
      </div>
    </main>
  );
}
