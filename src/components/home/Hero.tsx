"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

import { heroSlides, heroSliderSettings } from "@/config";

export default function Hero() {
  const { autoplay, interval, transitionMs, pauseOnHover } = heroSliderSettings;

  const slideCount = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const goTo = (next: number) => {
    setIndex((next + slideCount) % slideCount);
  };

  useEffect(() => {
    if (!autoplay || paused || slideCount <= 1 || shouldReduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, interval);

    return () => window.clearInterval(timer);
  }, [autoplay, paused, interval, slideCount, shouldReduceMotion]);

  if (!slideCount) return null;

  const activeSlide = heroSlides[index];

  const duration = shouldReduceMotion ? 0 : transitionMs / 1000;

  const textVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -12,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.06,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: {
          duration: shouldReduceMotion ? 0 : duration,
        },
        scale: {
          duration: shouldReduceMotion ? 0 : duration + 0.35,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.02,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.25,
      },
    },
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
            <AnimatePresence mode="wait">
              <motion.article
                key={activeSlide.id}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="[grid-area:1/1] flex flex-col justify-center"
              >
                <motion.span
                  variants={itemVariants}
                  className="mb-4 inline-flex self-start items-center gap-2 rounded-full border border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-[13px] py-1.5 text-[11px] font-bold uppercase tracking-[1.4px] text-[var(--rz-heading)] md:mb-5 md:px-[15px] md:py-[7px] md:text-xs"
                >
                  {activeSlide.eyebrow}
                </motion.span>

                <motion.h1
                  variants={itemVariants}
                  className="mb-[18px] text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-1px] text-[var(--rz-heading)] md:text-[clamp(2.1rem,4vw,3.5rem)] md:tracking-[-1.5px]"
                >
                  {activeSlide.title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mb-6 max-w-[52ch] text-[15px] leading-[1.7] text-muted-foreground md:mb-[30px] md:text-base"
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-3.5"
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={activeSlide.ctaHref}
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-[18px] py-3 text-sm font-bold text-[#F3DFC2] shadow-[0_6px_16px_rgba(166,83,46,0.22)] transition-all duration-300 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_10px_22px_rgba(166,83,46,0.3)] md:px-6 md:py-3.5 md:text-[15px]"
                    >
                      {activeSlide.ctaLabel}
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-transparent px-[18px] py-3 text-sm font-semibold text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:text-[var(--rz-heading-hover)] md:px-[22px] md:py-3.5 md:text-[15px]"
                    >
                      Talk to an Expert
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Slider Controls */}
          <div className="mt-[26px] flex items-center gap-3.5 md:mt-9">
            <motion.button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous slide"
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex size-[42px] shrink-0 items-center justify-center rounded-full border border-border bg-transparent text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading-hover)]"
            >
              <ChevronLeft size={19} aria-hidden="true" />
            </motion.button>

            <motion.button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next slide"
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex size-[42px] shrink-0 items-center justify-center rounded-full border border-border bg-transparent text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading-hover)]"
            >
              <ChevronRight size={19} aria-hidden="true" />
            </motion.button>

            <div
              className="ml-1.5 flex items-center gap-2"
              role="group"
              aria-label="Choose slide"
            >
              {heroSlides.map((slide, i) => (
                <motion.button
                  key={slide.id}
                  type="button"
                  aria-current={i === index}
                  aria-label={`Slide ${i + 1}: ${slide.title}`}
                  onClick={() => goTo(i)}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    width: i === index ? 30 : 9,
                    opacity: i === index ? 1 : 0.55,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.3,
                    ease: "easeInOut",
                  }}
                  className={`h-[9px] rounded-full ${
                    i === index
                      ? "bg-[var(--rz-heading)]"
                      : "bg-border hover:bg-[var(--rz-heading)]"
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
        <div className="relative grid aspect-[4/3.3] min-w-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_26px_54px_rgba(75,56,43,0.2)] md:aspect-[16/11] lg:aspect-[4/3.3] lg:rounded-[22px]">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeSlide.id}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                priority={index === 0}
                className="object-cover"
              />

              <span className="absolute bottom-3 right-3 inline-flex items-center gap-2.5 rounded-xl border border-[rgba(243,223,194,0.22)] bg-[rgba(33,26,21,0.72)] px-3.5 py-2.5 text-[13px] font-bold text-[#F3DFC2] shadow-lg backdrop-blur-[10px] md:bottom-[18px] md:right-[18px] md:px-[18px] md:py-3 md:text-sm">
                <motion.span
                  animate={shouldReduceMotion ? {} : { opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="size-2 rounded-full bg-[#B56D43]"
                />
                {activeSlide.tag}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
