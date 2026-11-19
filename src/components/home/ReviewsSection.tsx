"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  // 1 = next (right theke ashe), -1 = prev (left theke ashe)
  const [direction, setDirection] = useState(1);
  const reduceMotion = !!useReducedMotion();

  const nextReview = () => {
    setDirection(1);
    setIndex((current) => (current + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const review = reviews[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  const dur = reduceMotion ? 0 : 0.6;
  const offset = reduceMotion ? 0 : 24;

  // Left text column: children stagger hoy
  const textContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease: EASE },
    },
  };

  // Right review card entrance
  const cardEntrance: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 36,
      scale: reduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : 0.15,
        ease: EASE,
      },
    },
  };

  // Review slide (direction-aware)
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * 48,
      filter: reduceMotion ? "blur(0px)" : "blur(6px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0 : 0.5, ease: EASE },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * -48,
      filter: reduceMotion ? "blur(0px)" : "blur(6px)",
      transition: { duration: reduceMotion ? 0 : 0.3, ease: "easeIn" },
    }),
  };

  // Stars: ekta ekta kore pop kore
  const starsContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const starItem: Variants = {
    hidden: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0,
      rotate: reduceMotion ? 0 : -45,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 420, damping: 16 },
    },
  };

  // Slide er bhitorer content stagger
  const contentContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const contentItem: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE },
    },
  };

  return (
    <section
      aria-label="Customer reviews"
      className="overflow-hidden py-[34px] transition-colors duration-300 md:py-11 lg:py-[54px]"
    >
      <div className="mx-auto max-w-[1440px] px-[5%]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Text Column */}
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-[13px] py-1.5 text-[11px] font-bold uppercase tracking-[1.4px] text-[var(--rz-heading)] md:text-xs"
            >
              What People Say
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mb-[18px] text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-1px] text-[var(--rz-heading)] md:text-[clamp(2.1rem,4vw,3.5rem)] md:tracking-[-1.5px]"
            >
              Trusted by People.
              <span className="block">Loved for Service.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mb-6 max-w-[48ch] text-[15px] leading-[1.7] text-muted-foreground md:text-base"
            >
              Discover what our customers say about their experience with
              RentZone. Your trust inspires us to do better.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3"
            >
              <motion.button
                type="button"
                onClick={prevReview}
                aria-label="Previous review"
                whileHover={reduceMotion ? undefined : { scale: 1.08, x: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex size-[42px] items-center justify-center rounded-full border border-border text-[var(--rz-heading)] transition-colors duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)]"
              >
                <ArrowLeft size={18} />
              </motion.button>

              <motion.button
                type="button"
                onClick={nextReview}
                aria-label="Next review"
                whileHover={reduceMotion ? undefined : { scale: 1.08, x: 2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex size-[42px] items-center justify-center rounded-full border border-border text-[var(--rz-heading)] transition-colors duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)]"
              >
                <ArrowRight size={18} />
              </motion.button>

              {/* Counter (number flip) */}
              <span className="ml-2 inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[1.5px] text-muted-foreground">
                <span className="inline-flex overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.span
                      key={index}
                      custom={direction}
                      initial={
                        reduceMotion ? false : { y: direction * 12, opacity: 0 }
                      }
                      animate={{ y: 0, opacity: 1 }}
                      exit={
                        reduceMotion
                          ? undefined
                          : { y: direction * -12, opacity: 0 }
                      }
                      transition={{ duration: 0.25, ease: EASE }}
                      className="inline-block"
                    >
                      {pad(index + 1)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span>/ {pad(reviews.length)}</span>
              </span>
            </motion.div>

            {/* Progress dots */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-2"
              aria-hidden="true"
            >
              {reviews.map((r, i) => (
                <motion.span
                  key={r.id}
                  initial={false}
                  animate={{
                    width: i === index ? 30 : 9,
                    opacity: i === index ? 1 : 0.5,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className={`h-[9px] rounded-full ${
                    i === index ? "bg-[var(--rz-heading)]" : "bg-border"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Review Card */}
          <motion.div
            variants={cardEntrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-[0_20px_45px_rgba(75,56,43,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_56px_rgba(75,56,43,0.14)] md:p-9 lg:rounded-[22px]"
          >
            {/* Decorative glow */}
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[rgba(166,83,46,0.12)] blur-[50px]"
            />

            {/* Slide content (direction-aware) */}
            <div className="relative">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={review.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.div
                    variants={contentContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      variants={contentItem}
                      className="mb-6 flex items-center justify-between"
                    >
                      <motion.div
                        initial={
                          reduceMotion ? false : { scale: 0.6, rotate: -12, opacity: 0 }
                        }
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      >
                        <Quote
                          size={38}
                          strokeWidth={1.5}
                          className="text-[var(--rz-heading)] opacity-70"
                        />
                      </motion.div>

                      <motion.div
                        variants={starsContainer}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-1"
                        role="img"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <motion.span
                            key={i}
                            variants={starItem}
                            className="inline-flex"
                          >
                            <Star size={17} fill="#B56D43" stroke="#B56D43" />
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.p
                      variants={contentItem}
                      className="mb-8 min-h-[100px] text-[16px] leading-[1.8] text-foreground md:text-[18px]"
                    >
                      “{review.review}”
                    </motion.p>

                    <motion.div
                      variants={contentItem}
                      className="flex items-center gap-3 border-t border-border pt-5"
                    >
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
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}