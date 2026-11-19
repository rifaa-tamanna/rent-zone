import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
}

/** Amber star rating used on favorites and reviews. */
export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "size-3.5",
            index < Math.round(rating)
              ? "fill-amber-400 text-amber-500"
              : "fill-muted text-muted-foreground/40"
          )}
        />
      ))}
    </span>
  );
}
