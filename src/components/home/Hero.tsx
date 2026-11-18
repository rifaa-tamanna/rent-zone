"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides, heroSliderSettings } from "@/config";

export default function Hero() {
  const { autoplay, interval, transitionMs, pauseOnHover } =
    heroSliderSettings;

  const slideCount = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (next: number) => {
    setIndex((next + slideCount) % slideCount);
  };

  useEffect(() => {
    if (!autoplay || paused || slideCount <= 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, interval);

    return () => window.clearInterval(timer);
  }, [autoplay, paused, interval, slideCount]);

  if (!slideCount) return null;

  const transitionStyle = {
    transitionDuration: `${transitionMs}ms`,
  };

  return (
    <section
      aria-label="RentZone featured equipment"
      className="overflow-hidden"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocusCapture={() => pauseOnHover && setPaused(true)}
      onBlurCapture={() => pauseOnHover && setPaused(false)}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-[5%] py-[34px] md:gap-10 md:py-11 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-[54px] lg:pb-[66px]">
        {/* Text Column */}
        <div className="min-w-0">
          <div className="grid">
            {heroSlides.map((slide, i) => {
              const Heading = i === 0 ? "h1" : "h2";
              const active = i === index;

              return (
                <article
                  key={slide.id}
                  aria-hidden={!active}
                  className={`[grid-area:1/1] flex flex-col justify-center transition-all ease-in-out motion-reduce:transition-none ${
                    active
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-4 opacity-0"
                  }`}
                  style={transitionStyle}
                >
                  <span className="mb-4 inline-flex self-start items-center gap-2 rounded-full border border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-[13px] py-1.5 text-[11px] font-bold uppercase tracking-[1.4px] text-[var(--rz-heading)] md:mb-5 md:px-[15px] md:py-[7px] md:text-xs">
                    {slide.eyebrow}
                  </span>

                  <Heading className="mb-[18px] text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-1px] text-[var(--rz-heading)] md:text-[clamp(2.1rem,4vw,3.5rem)] md:tracking-[-1.5px]">
                    {slide.title}
                  </Heading>

                  <p className="mb-6 max-w-[52ch] text-[15px] leading-[1.7] text-muted-foreground md:mb-[30px] md:text-base">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5">
                    <Link
                      href={slide.ctaHref}
                      tabIndex={active ? 0 : -1}
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-[18px] py-3 text-sm font-bold text-[#F3DFC2] shadow-[0_6px_16px_rgba(166,83,46,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_10px_22px_rgba(166,83,46,0.3)] md:px-6 md:py-3.5 md:text-[15px]"
                    >
                      {slide.ctaLabel}
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>

                    <Link
                      href="/contact"
                      tabIndex={active ? 0 : -1}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-transparent px-[18px] py-3 text-sm font-semibold text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:text-[var(--rz-heading-hover)] md:px-[22px] md:py-3.5 md:text-[15px]"
                    >
                      Talk to an Expert
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Slider Controls */}
          <div className="mt-[26px] flex items-center gap-3.5 md:mt-9">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous slide"
              className="flex size-[42px] shrink-0 items-center justify-center rounded-full border border-border bg-transparent text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading-hover)]"
            >
              <ChevronLeft size={19} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next slide"
              className="flex size-[42px] shrink-0 items-center justify-center rounded-full border border-border bg-transparent text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading-hover)]"
            >
              <ChevronRight size={19} aria-hidden="true" />
            </button>

            <div
              className="ml-1.5 flex items-center gap-2"
              role="group"
              aria-label="Choose slide"
            >
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-current={i === index}
                  aria-label={`Slide ${i + 1}: ${slide.title}`}
                  onClick={() => goTo(i)}
                  className={`h-[9px] rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-[30px] bg-[var(--rz-heading)]"
                      : "w-[9px] bg-border hover:bg-[var(--rz-heading)]"
                  }`}
                />
              ))}
            </div>

            <span className="ml-auto hidden text-[13px] font-bold tracking-[1.5px] text-muted-foreground md:inline">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slideCount).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative grid aspect-[4/3.3] min-w-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_26px_54px_rgba(75,56,43,0.2)] md:aspect-[16/11] lg:rounded-[22px] lg:aspect-[4/3.3]">
          {heroSlides.map((slide, i) => {
            const active = i === index;

            return (
              <div
                key={slide.id}
                aria-hidden={!active}
                className={`relative [grid-area:1/1] transition-opacity ease-in-out motion-reduce:transition-none ${
                  active ? "opacity-100" : "opacity-0"
                }`}
                style={transitionStyle}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  className={`object-cover transition-transform ease-in-out motion-reduce:transition-none ${
                    active ? "scale-100" : "scale-[1.06]"
                  }`}
                  style={{
                    transitionDuration: `${transitionMs + 300}ms`,
                  }}
                />

                <span className="absolute bottom-3 right-3 inline-flex items-center gap-2.5 rounded-xl border border-[rgba(243,223,194,0.22)] bg-[rgba(33,26,21,0.72)] px-3.5 py-2.5 text-[13px] font-bold text-[#F3DFC2] shadow-lg backdrop-blur-[10px] md:bottom-[18px] md:right-[18px] md:px-[18px] md:py-3 md:text-sm">
                  <span className="size-2 rounded-full bg-[#B56D43]" />
                  {slide.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
