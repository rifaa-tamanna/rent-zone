"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ahmed Rahman",
    role: "Construction Business Owner",
    image: "https://i.pravatar.cc/120?img=12",
    rating: 5,
    review:
      "RentZone made finding reliable construction equipment incredibly easy. The process was smooth, and the service was excellent.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Photography Professional",
    image: "https://i.pravatar.cc/120?img=47",
    rating: 5,
    review:
      "I found the camera equipment I needed at a reasonable price. The platform is easy to use and saves a lot of time.",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Equipment Renter",
    image: "https://i.pravatar.cc/120?img=11",
    rating: 5,
    review:
      "A great platform for renting equipment. I really appreciate the verified owners and the simple booking experience.",
  },
];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex((current) => (current + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const review = reviews[index];

  return (
    <section
      aria-label="Customer reviews"
      className="overflow-hidden py-[34px] transition-colors duration-300 md:py-11 lg:py-[54px]"
    >
      <div className="mx-auto max-w-[1440px] px-[5%]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Text Column */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-[13px] py-1.5 text-[11px] font-bold uppercase tracking-[1.4px] text-[var(--rz-heading)] md:text-xs">
              What People Say
            </span>

            <h2 className="mb-[18px] text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-1px] text-[var(--rz-heading)] md:text-[clamp(2.1rem,4vw,3.5rem)] md:tracking-[-1.5px]">
              Trusted by People.
              <span className="block">Loved for Service.</span>
            </h2>

            <p className="mb-6 max-w-[48ch] text-[15px] leading-[1.7] text-muted-foreground md:text-base">
              Discover what our customers say about their experience with
              RentZone. Your trust inspires us to do better.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevReview}
                aria-label="Previous review"
                className="flex size-[42px] items-center justify-center rounded-full border border-border text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)]"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={nextReview}
                aria-label="Next review"
                className="flex size-[42px] items-center justify-center rounded-full border border-border text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)]"
              >
                <ArrowRight size={18} />
              </button>

              <span className="ml-2 text-[13px] font-bold tracking-[1.5px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(reviews.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Review Card */}
          <div className="relative rounded-2xl border border-border bg-card p-6 shadow-[0_20px_45px_rgba(75,56,43,0.08)] transition-all duration-300 md:p-9 lg:rounded-[22px]">
            <div className="mb-6 flex items-center justify-between">
              <Quote
                size={38}
                strokeWidth={1.5}
                className="text-[var(--rz-heading)] opacity-70"
              />

              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={17} fill="#B56D43" stroke="#B56D43" />
                ))}
              </div>
            </div>

            <p
              key={review.id}
              className="mb-8 min-h-[100px] text-[16px] leading-[1.8] text-foreground md:text-[18px]"
            >
              “{review.review}”
            </p>

            <div className="flex items-center gap-3 border-t border-border pt-5">
              <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full border border-border">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  sizes="52px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-[var(--rz-heading)] md:text-base">
                  {review.name}
                </h3>
                <p className="text-xs text-muted-foreground md:text-sm">
                  {review.role}
                </p>
              </div>

              <span className="ml-auto hidden rounded-full border border-[rgba(166,83,46,0.25)] bg-[rgba(166,83,46,0.08)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--rz-heading)] sm:inline-flex">
                Customer
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
