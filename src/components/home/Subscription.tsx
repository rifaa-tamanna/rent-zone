"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { ArrowRight, Mail, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const subscriptionImage =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=85";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Subscription() {
  const reduceMotion = !!useReducedMotion();

  const offset = reduceMotion ? 0 : 24;
  const dur = reduceMotion ? 0 : 0.6;

  // Poro card entrance
  const cardEntrance: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 40,
      scale: reduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.8, ease: EASE },
    },
  };

  // Content container: children stagger hoy
  const contentContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.11,
        delayChildren: reduceMotion ? 0 : 0.3,
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

  // Form niche theke scale kore ashe
  const formItem: Variants = {
    hidden: {
      opacity: 0,
      y: offset,
      scale: reduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: dur, ease: EASE },
    },
  };

  // Background image slow zoom-out
  const bgZoom: Variants = {
    hidden: { scale: reduceMotion ? 1 : 1.12 },
    visible: {
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 1.6, ease: EASE },
    },
  };

  return (
    <section className="px-[5%] py-12 md:py-16">
      <motion.div
        variants={cardEntrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-border shadow-xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.div variants={bgZoom} className="absolute inset-0">
            <Image
              src={subscriptionImage}
              alt="Modern workspace"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[#211A15]/85" />

          {/* Floating glow orbs */}
          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, 30, 0], y: [0, 18, 0], opacity: [0.5, 0.8, 0.5] }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-[#A6532E]/30 blur-[90px]"
          />

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, -28, 0], y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }
            }
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-24 -right-20 size-72 rounded-full bg-[#B56D43]/25 blur-[100px]"
          />
        </div>

        {/* Content */}
        <motion.div
          variants={contentContainer}
          className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 py-12 text-center md:px-10 md:py-16"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="mb-4 gap-2 rounded-full border-[#B56D43]/50 bg-[#A6532E]/20 px-4 py-1.5 text-[#F3DFC2]"
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
                <Sparkles size={13} />
              </motion.span>
              STAY CONNECTED
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-2xl font-extrabold leading-tight text-[#F3DFC2] sm:text-3xl md:text-4xl"
          >
            Get Exclusive Rental Deals!
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-lg text-sm leading-6 text-[#E0D1C2] md:text-base"
          >
            Subscribe to our newsletter and get the latest rental offers,
            updates, and special discounts.
          </motion.p>

          {/* Subscription Form */}
          <motion.form
            variants={formItem}
            whileHover={
              reduceMotion
                ? undefined
                : { boxShadow: "0 18px 40px rgba(0,0,0,0.28)" }
            }
            transition={{ duration: 0.3 }}
            className="mt-7 flex w-full max-w-lg flex-col gap-3 rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-md transition-colors duration-300 focus-within:border-[#B56D43]/60 sm:flex-row"
          >
            <div className="group relative flex-1">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#A6532E] transition-transform duration-300 group-focus-within:scale-110"
              />

              <Input
                type="email"
                placeholder="Enter your email address"
                required
                aria-label="Email address"
                className="h-12 border-0 bg-white pl-11 text-sm text-[#211A15] placeholder:text-[#8B8178] focus-visible:ring-2 focus-visible:ring-[#B56D43]"
              />
            </div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="sm:shrink-0"
            >
              <Button
                type="submit"
                className="group/btn h-12 w-full gap-2 rounded-lg border border-[#B56D43] bg-[image:var(--rz-btn-gradient)] px-6 font-bold text-[#F3DFC2] transition-colors duration-300 hover:bg-[image:var(--rz-btn-gradient-hover)] sm:w-auto"
              >
                Subscribe
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            </motion.div>
          </motion.form>

          <motion.p variants={fadeUp} className="mt-4 text-xs text-[#D0BFAF]">
            No spam, just great deals. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
