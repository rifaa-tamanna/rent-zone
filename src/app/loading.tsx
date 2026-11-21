import { LoaderCircle } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-[rgba(166,83,46,0.12)] text-[#A6532E]">
        <LoaderCircle className="size-8 animate-spin" />
      </div>
      <p className="font-sans text-sm font-bold text-[var(--rz-heading)]">
        Loading RentZone...
      </p>
      <p className="text-xs text-muted-foreground">Please wait a moment.</p>
    </div>
  );
}
