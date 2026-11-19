"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Wallet,
  Clock3,
  Headset,
  Target,
  Eye,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description:
      "We prioritize your safety and make every rental experience reliable and secure.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description:
      "Enjoy quality products and services without spending more than necessary.",
  },
  {
    icon: Clock3,
    title: "Flexible Rentals",
    description:
      "Choose rental durations that fit your schedule, lifestyle, and needs.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Our support team is here to help you throughout your rental journey.",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AboutUsPage() {
  const reduceMotion = !!useReducedMotion();

  const offset = reduceMotion ? 0 : 24;
  const dur = reduceMotion ? 0 : 0.6;

  // Generic stagger container
  const stagger = (child = 0.1, delay = 0.05): Variants => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : child,
        delayChildren: reduceMotion ? 0 : delay,
      },
    },
  });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease: EASE },
    },
  };

  const popIn: Variants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 18 },
    },
  };

  // Hero image (dan theke slide-in)
  const heroImage: Variants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 40,
      scale: reduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : 0.2,
        ease: EASE,
      },
    },
  };

  // Image er upor floating glass card
  const glassCard: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 18,
        delay: reduceMotion ? 0 : 0.7,
      },
    },
  };

  // Mission (bam theke) ar Vision (dan theke)
  const fromLeft: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE },
    },
  };

  const fromRight: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE },
    },
  };

  // Benefit card
  const benefitCard: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease: EASE },
    },
  };

  // CTA banner
  const ctaBanner: Variants = {
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
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const spring = { type: "spring", stiffness: 400, damping: 20 } as const;

  return (
    <main className="overflow-hidden">
      {/* ================= SECTION 01: ABOUT US ================= */}
      <section className="bg-white py-16 text-[#211A15] transition-colors duration-500 dark:bg-[#171310] dark:text-[#F3DFC2] md:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-[5%] lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            variants={stagger(0.11, 0.05)}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]"
            >
              <motion.span
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, 18, -12, 0], scale: [1, 1.2, 1] }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
                className="inline-flex"
              >
                <Sparkles size={15} />
              </motion.span>
              About RentZone
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-xl text-4xl font-extrabold leading-[1.15] tracking-tight md:text-5xl lg:text-[58px]"
            >
              Rent Smarter.
              <span className="block text-[#A6532E]">Live Better.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-[#71665D] dark:text-[#C8B9AA] md:text-lg"
            >
              Welcome to RentZone, your trusted destination for convenient and
              affordable rentals. We believe you should have access to the
              things you need without the commitment and expense of ownership.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-sm leading-7 text-[#887B70] dark:text-[#AFA092]"
            >
              Whether you need something for work, everyday life, or a special
              occasion, RentZone makes discovering and renting easier. Our goal
              is to connect people with the right resources through a simple and
              reliable platform.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                <Link
                  href="/rentals"
                  className="group/btn inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#B56D43,#914321)] px-6 py-3.5 text-sm font-bold text-[#F3DFC2] shadow-lg shadow-[#A6532E]/20 transition-shadow duration-300 hover:shadow-xl"
                >
                  Explore Rentals
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#A6532E]/25 px-6 py-3.5 text-sm font-bold text-[#A6532E] transition-colors duration-300 hover:bg-[#A6532E] hover:text-white"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={stagger(0.12, 0.1)}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#A6532E]/10 pt-7"
            >
              {["Simple Experience", "Reliable Service"].map((label) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <CheckCircle2 size={18} className="text-[#A6532E]" />
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-[560px]"
          >
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, 16, 0], opacity: [0.7, 1, 0.7] }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 -top-5 size-32 rounded-full bg-[#A6532E]/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[28px]">
              <motion.div
                initial={reduceMotion ? false : { scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 1.4, ease: EASE }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85"
                  alt="Modern workspace representing RentZone"
                  width={1200}
                  height={1000}
                  priority
                  className="h-[350px] w-full object-cover sm:h-[440px] lg:h-[510px]"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#211A15]/60 via-transparent to-transparent" />

              <motion.div
                variants={glassCard}
                initial="hidden"
                animate="visible"
                className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#211A15]/75 p-5 text-white backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#A6532E]">
                    <motion.span
                      aria-hidden="true"
                      animate={
                        reduceMotion
                          ? undefined
                          : { scale: [1, 1.25, 1, 1.2, 1] }
                      }
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut",
                      }}
                      className="inline-flex"
                    >
                      <Heart size={22} className="fill-white" />
                    </motion.span>
                  </div>

                  <div>
                    <h3 className="font-bold">More Access, Less Ownership</h3>
                    <p className="mt-1 text-xs text-white/75">
                      A smarter way to get what you need.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -16, 0], opacity: [0.7, 1, 0.7] }
              }
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 -z-10 size-32 rounded-full bg-[#A6532E]/15 blur-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 02: MISSION & VISION ================= */}
      <section className="bg-[#F8F4EE] py-16 text-[#211A15] transition-colors duration-500 dark:bg-[#F3DFC2] dark:text-[#211A15] md:py-24">
        <div className="mx-auto max-w-[1440px] px-[5%]">
          <motion.div
            variants={stagger(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#F3DFC2]/20 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#D99A70] dark:border-[#A6532E]/20 dark:text-[#A6532E]"
            >
              <Target size={15} />
              What Drives Us
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
            >
              Our Mission & Vision
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm leading-7 text-[#C8B9AA] dark:text-[#74665B] md:text-base"
            >
              We are building a rental experience that makes access easier,
              ownership less necessary, and everyday life more convenient.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Mission Card */}
            <motion.div
              variants={fromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group rounded-[24px] border border-[#F3DFC2]/10 bg-[#F3DFC2]/5 p-7 transition-[border-color,background-color] duration-300 hover:border-[#A6532E]/50 hover:bg-[#F3DFC2]/10 dark:border-[#211A15]/10 dark:bg-white/50 dark:hover:bg-white/80 sm:p-9"
            >
              <motion.div
                variants={popIn}
                whileHover={
                  reduceMotion ? undefined : { rotate: -8, scale: 1.06 }
                }
                className="flex size-14 items-center justify-center rounded-2xl bg-[#A6532E] text-[#F3DFC2] shadow-lg shadow-black/10"
              >
                <Target size={27} />
              </motion.div>

              <h3 className="mt-7 text-2xl font-bold">Our Mission</h3>

              <p className="mt-4 text-sm leading-8 text-[#C8B9AA] dark:text-[#74665B] md:text-base">
                Our mission is to simplify the way people access the things they
                need. We aim to provide a convenient, affordable, and
                trustworthy rental platform where everyone can find practical
                solutions for their everyday needs.
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-bold text-[#D99A70] dark:text-[#A6532E]">
                <CheckCircle2 size={17} />
                Making renting easier for everyone
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={fromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group rounded-[24px] border border-[#F3DFC2]/10 bg-[#F3DFC2]/5 p-7 transition-[border-color,background-color] duration-300 hover:border-[#A6532E]/50 hover:bg-[#F3DFC2]/10 dark:border-[#211A15]/10 dark:bg-white/50 dark:hover:bg-white/80 sm:p-9"
            >
              <motion.div
                variants={popIn}
                whileHover={
                  reduceMotion ? undefined : { rotate: 8, scale: 1.06 }
                }
                className="flex size-14 items-center justify-center rounded-2xl bg-[#A6532E] text-[#F3DFC2] shadow-lg shadow-black/10"
              >
                <Eye size={27} />
              </motion.div>

              <h3 className="mt-7 text-2xl font-bold">Our Vision</h3>

              <p className="mt-4 text-sm leading-8 text-[#C8B9AA] dark:text-[#74665B] md:text-base">
                Our vision is to become a trusted rental destination that
                encourages smarter consumption and better resource sharing. We
                want to create a community where people can access more, waste
                less, and make better everyday choices.
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-bold text-[#D99A70] dark:text-[#A6532E]">
                <CheckCircle2 size={17} />A smarter and more accessible future
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 03: WHY RENTZONE ================= */}
      <section className="bg-white py-16 text-[#211A15] transition-colors duration-500 dark:bg-[#171310] dark:text-[#F3DFC2] md:py-24">
        <div className="mx-auto max-w-[1440px] px-[5%]">
          {/* Section Heading */}
          <motion.div
            variants={stagger(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]"
            >
              <Sparkles size={15} />
              The RentZone Advantage
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
            >
              Why Choose <span className="text-[#A6532E]">RentZone?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm leading-7 text-[#887B70] dark:text-[#C8B9AA] md:text-base"
            >
              We focus on making your rental journey simple, affordable, and
              comfortable from beginning to end.
            </motion.p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={stagger(0.12, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  variants={benefitCard}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="
                    group rounded-2xl border border-[#A6532E]/10
                    bg-[#FDFBF8] p-6
                    transition-[border-color,box-shadow] duration-300
                    hover:border-[#A6532E]/30
                    hover:shadow-[0_15px_40px_rgba(166,83,46,0.10)]
                    dark:border-[#F3DFC2]/10
                    dark:bg-[#211A15]
                    dark:hover:border-[#A6532E]/50
                  "
                >
                  <motion.div
                    whileHover={
                      reduceMotion ? undefined : { rotate: -8, scale: 1.08 }
                    }
                    className="flex size-14 items-center justify-center rounded-2xl bg-[#A6532E]/10 text-[#A6532E] transition-colors duration-300 group-hover:bg-[#A6532E] group-hover:text-white"
                  >
                    <Icon size={26} strokeWidth={1.8} />
                  </motion.div>

                  <span className="mt-6 block text-xs font-bold tracking-widest text-[#A6532E]/60">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#211A15] dark:text-[#F3DFC2]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#887B70] dark:text-[#C8B9AA]">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={ctaBanner}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative mt-14 overflow-hidden rounded-[24px] bg-[linear-gradient(120deg,#A6532E,#71391F)] p-7 text-center text-[#F3DFC2] sm:p-10 md:p-12"
          >
            {/* Floating glow */}
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, 30, 0], y: [0, 16, 0], opacity: [0.4, 0.7, 0.4] }
              }
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/20 blur-[80px]"
            />

            <div className="relative mx-auto max-w-2xl">
              <motion.h3
                variants={fadeUp}
                className="text-2xl font-extrabold md:text-3xl"
              >
                Ready to Experience Smarter Renting?
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-sm leading-7 text-white/80 md:text-base"
              >
                Discover a convenient way to get what you need. Start exploring
                RentZone today.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 inline-flex">
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                >
                  <Link
                    href="/rentals"
                    className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#F3DFC2] px-6 py-3.5 text-sm font-bold text-[#71391F] shadow-lg transition-colors duration-300 hover:bg-white"
                  >
                    Browse Rentals
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
