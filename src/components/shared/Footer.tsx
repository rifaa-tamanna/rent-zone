"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowRight,
  Heart,
  Cog,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Browse Equipment", href: "/equipment" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact Us", href: "/contact" },
];

const supportLinks = [
  { label: "FAQs", href: "/faq" },
  { label: "Help Center", href: "/help" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Become a Renter", href: "/signup" },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Footer() {
  const reduceMotion = !!useReducedMotion();

  const offset = reduceMotion ? 0 : 24;
  const dur = reduceMotion ? 0 : 0.6;

  // Footer grid: column gulo stagger hoye ashe
  const gridContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  // Ekta column er bhitorer item gulo stagger
  const columnContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
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

  // Link list item (bam theke halka slide)
  const listItem: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -14 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE },
    },
  };

  // Social icon pop
  const socialItem: Variants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 320, damping: 18 },
    },
  };

  const socialContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  // CTA card entrance
  const ctaCard: Variants = {
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

  // Separator line draw
  const lineDraw: Variants = {
    hidden: { scaleX: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 1, ease: EASE },
    },
  };

  // Bottom bar
  const bottomContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <footer
      className="
        relative overflow-hidden
        bg-[#211A15] text-[#F3DFC2]
        transition-colors duration-500
        dark:bg-[#F8F4EE] dark:text-[#2B211B]
      "
    >
      {/* Decorative floating glow */}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, 20, 0], x: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 -top-10 size-80 rounded-full bg-[#A6532E]/12 blur-[110px] dark:bg-[#A6532E]/8"
      />

      <div className="relative mx-auto max-w-[1440px] px-[5%] pt-12 sm:pt-14 md:pt-16 lg:pt-20">
        {/* Footer Grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={fadeUp}>
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-[11px]"
            >
              <motion.span
                whileHover={
                  reduceMotion ? undefined : { rotate: -12, scale: 1.05 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="
                  flex size-[41px] items-center justify-center
                  rounded-[13px]
                  bg-[linear-gradient(135deg,#B56D43,#914321)]
                  text-[#F3DFC2]
                  shadow-[0_4px_12px_rgba(116,61,33,0.18)]
                  md:size-[45px]
                "
              >
                <motion.span
                  aria-hidden="true"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-flex"
                >
                  <Cog size={27} strokeWidth={2.2} />
                </motion.span>
              </motion.span>

              <span className="flex flex-col gap-0.5">
                <span className="text-[22px] font-extrabold leading-tight tracking-[-1px] text-[var(--rz-heading)] md:text-2xl">
                  RentZone
                </span>
                <span className="text-[8px] font-bold tracking-[1.25px] text-[var(--rz-tagline)]">
                  RENT SMART. WORK BETTER.
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#C8B9AA] dark:text-[#74665B]">
              Your trusted rental partner. Find what you need, rent with
              confidence, and enjoy more without the cost of ownership.
            </p>

            {/* Social Links */}
            <motion.div
              variants={socialContainer}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.div
                    key={social.label}
                    variants={socialItem}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="
                        flex size-10 items-center justify-center
                        rounded-xl
                        border border-[#F3DFC2]/15
                        bg-[#F3DFC2]/5 text-[#D8C6B3]
                        transition-colors duration-300
                        hover:border-[#A6532E]
                        hover:bg-[#A6532E]
                        hover:text-white
                        dark:border-[#2B211B]/15
                        dark:bg-[#2B211B]/5
                        dark:text-[#665548]
                        dark:hover:border-[#A6532E]
                        dark:hover:bg-[#A6532E]
                        dark:hover:text-white
                      "
                    >
                      <Icon size={18} />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-6 text-base font-bold text-[#F3DFC2] dark:text-[#2B211B]">
              Quick Links
            </h3>

            <motion.ul variants={columnContainer} className="space-y-4">
              {quickLinks.map((link) => (
                <motion.li key={link.label} variants={listItem}>
                  <Link
                    href={link.href}
                    className="
                      group inline-flex items-center gap-1.5
                      text-sm text-[#C8B9AA]
                      transition-colors duration-300
                      hover:text-[#D99A70]
                      dark:text-[#74665B]
                      dark:hover:text-[#A6532E]
                    "
                  >
                    <ArrowUpRight
                      size={14}
                      className="
                        text-[#A6532E] opacity-0
                        transition-all duration-300
                        group-hover:translate-x-0.5
                        group-hover:opacity-100
                      "
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-6 text-base font-bold text-[#F3DFC2] dark:text-[#2B211B]">
              Customer Support
            </h3>

            <motion.ul variants={columnContainer} className="space-y-4">
              {supportLinks.map((link) => (
                <motion.li key={link.label} variants={listItem}>
                  <Link
                    href={link.href}
                    className="
                      group inline-flex items-center gap-1.5
                      text-sm text-[#C8B9AA]
                      transition-colors duration-300
                      hover:text-[#D99A70]
                      dark:text-[#74665B]
                      dark:hover:text-[#A6532E]
                    "
                  >
                    <ArrowUpRight
                      size={14}
                      className="
                        text-[#A6532E] opacity-0
                        transition-all duration-300
                        group-hover:translate-x-0.5
                        group-hover:opacity-100
                      "
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-6 text-base font-bold text-[#F3DFC2] dark:text-[#2B211B]">
              Get In Touch
            </h3>

            <p className="mb-5 text-sm leading-6 text-[#C8B9AA] dark:text-[#74665B]">
              Have questions or need assistance? We'd love to hear from you.
            </p>

            <motion.div variants={columnContainer} className="space-y-5">
              {/* Email */}
              <motion.div variants={listItem}>
                <Link href="/contact" className="group flex items-center gap-3">
                  <motion.div
                    whileHover={
                      reduceMotion ? undefined : { rotate: -8, scale: 1.08 }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="
                      flex size-10 shrink-0 items-center justify-center
                      rounded-xl bg-[#A6532E]/20 text-[#D99A70]
                      transition-colors
                      group-hover:bg-[#A6532E] group-hover:text-white
                    "
                  >
                    <Mail size={18} />
                  </motion.div>

                  <div>
                    <p className="text-xs text-[#AFA092] dark:text-[#88796D]">
                      Email Support
                    </p>
                    <p className="text-sm font-semibold text-[#F3DFC2] dark:text-[#2B211B]">
                      Contact Us
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Phone / Support */}
              <motion.div variants={listItem}>
                <Link href="/contact" className="group flex items-center gap-3">
                  <motion.div
                    whileHover={
                      reduceMotion ? undefined : { rotate: -8, scale: 1.08 }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="
                      flex size-10 shrink-0 items-center justify-center
                      rounded-xl bg-[#A6532E]/20 text-[#D99A70]
                      transition-colors
                      group-hover:bg-[#A6532E] group-hover:text-white
                    "
                  >
                    <Phone size={18} />
                  </motion.div>

                  <div>
                    <p className="text-xs text-[#AFA092] dark:text-[#88796D]">
                      Need Assistance?
                    </p>
                    <p className="text-sm font-semibold text-[#F3DFC2] dark:text-[#2B211B]">
                      Talk to Our Team
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Location */}
              <motion.div
                variants={listItem}
                className="flex items-center gap-3"
              >
                <div
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl bg-[#A6532E]/20 text-[#D99A70]
                  "
                >
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs text-[#AFA092] dark:text-[#88796D]">
                    Service
                  </p>
                  <p className="text-sm font-semibold text-[#F3DFC2] dark:text-[#2B211B]">
                    Online Rental Platform
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          variants={ctaCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
            my-10 flex flex-col items-start justify-between gap-5
            rounded-2xl border border-[#F3DFC2]/10
            bg-[#F3DFC2]/5 p-5
            sm:flex-row sm:items-center
            md:my-14 md:p-7
            dark:border-[#2B211B]/10
            dark:bg-[#2B211B]/5
          "
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-bold text-[#F3DFC2] dark:text-[#2B211B] md:text-xl">
              Ready to Rent Something?
            </h3>

            <p className="mt-1.5 text-sm text-[#C8B9AA] dark:text-[#74665B]">
              Explore our collection and find your perfect rental.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto sm:shrink-0"
          >
            <Link
              href="/equipment"
              className="
                group/btn inline-flex w-full items-center justify-center gap-2
                rounded-xl border border-[#A6532E]
                bg-[image:var(--rz-btn-gradient)]
                px-5 py-3 text-sm font-bold text-[#F3DFC2]
                shadow-lg shadow-black/10
                transition-[background-image,box-shadow] duration-300
                hover:bg-[image:var(--rz-btn-gradient-hover)]
                hover:shadow-xl
                sm:w-auto
              "
            >
              Explore Equipment
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          variants={lineDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ originX: 0 }}
        >
          <Separator className="bg-[#F3DFC2]/15 dark:bg-[#2B211B]/15" />
        </motion.div>

        <motion.div
          variants={bottomContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="
            flex flex-col items-center justify-between gap-4
            py-6 text-center
            sm:flex-row sm:text-left
          "
        >
          <motion.p
            variants={fadeUp}
            className="text-xs text-[#AFA092] dark:text-[#88796D] sm:text-sm"
          >
            © {new Date().getFullYear()} RentZone. All rights reserved.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="flex items-center gap-1.5 text-xs text-[#AFA092] dark:text-[#88796D] sm:text-sm"
          >
            Made with
            <motion.span
              aria-label="love"
              role="img"
              animate={
                reduceMotion ? undefined : { scale: [1, 1.25, 1, 1.2, 1] }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
              className="inline-flex"
            >
              <Heart size={14} fill="#A6532E" stroke="#A6532E" />
            </motion.span>
            for better renting.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 text-xs text-[#AFA092] dark:text-[#88796D]"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#D99A70] dark:hover:text-[#A6532E]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-[#D99A70] dark:hover:text-[#A6532E]"
            >
              Terms
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
