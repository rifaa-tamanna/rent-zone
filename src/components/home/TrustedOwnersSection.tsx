"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  Package,
  Star,
  MapPin,
  Clock3,
  ArrowRight,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";

export interface TrustedOwner {
  id: string;
  name: string;
  email?: string;
  avatar?: string | null;
  location: string;
  totalListings: number;
  categories: string[];
  rating: number;
  reviewsCount: number;
  verified: boolean;
  responseRate?: string;
}

const fallbackOwners: TrustedOwner[] = [
  {
    id: "fallback-owner-1",
    name: "Rifaa Moni",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    location: "Dhaka, Bangladesh",
    totalListings: 16,
    categories: ["Construction", "Photography", "Vehicles"],
    rating: 4.9,
    reviewsCount: 56,
    verified: true,
    responseRate: "98%",
  },
  {
    id: "fallback-owner-2",
    name: "Anamika Rahman",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    location: "Dhaka, Bangladesh",
    totalListings: 7,
    categories: ["Industrial", "Electrical", "Tools"],
    rating: 4.9,
    reviewsCount: 29,
    verified: true,
    responseRate: "99%",
  },
  {
    id: "fallback-owner-3",
    name: "Nadia Sultana",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    location: "Chattogram, Bangladesh",
    totalListings: 5,
    categories: ["Vehicles", "Transportation"],
    rating: 4.8,
    reviewsCount: 22,
    verified: true,
    responseRate: "97%",
  },
  {
    id: "fallback-owner-4",
    name: "Tamanna Ahmed",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    location: "Sylhet, Bangladesh",
    totalListings: 4,
    categories: ["Power Equipment", "Lifting"],
    rating: 4.9,
    reviewsCount: 18,
    verified: true,
    responseRate: "100%",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

export default function TrustedOwnersSection() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [owners, setOwners] = useState<TrustedOwner[]>(fallbackOwners);

  useEffect(() => {
    apiFetch<{ success: boolean; owners: TrustedOwner[] }>(
      "/api/equipment/trusted-owners",
    )
      .then((data) => {
        if (data?.success && Array.isArray(data?.owners) && data.owners.length > 0) {
          // Merge dynamic database owners with complementary fallbacks to ensure 4 cards
          const dbOwners = data.owners;
          const combined = [...dbOwners];
          for (const fallback of fallbackOwners) {
            if (combined.length >= 4) break;
            const alreadyExists = combined.some(
              (o) =>
                o.name.toLowerCase() === fallback.name.toLowerCase() ||
                o.id === fallback.id,
            );
            if (!alreadyExists) {
              combined.push(fallback);
            }
          }
          setOwners(combined);
        }
      })
      .catch(() => {});
  }, []);

  const handleExploreOwner = (ownerName: string) => {
    router.push(`/equipment?search=${encodeURIComponent(ownerName)}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F3] py-16 text-[#4B382B] transition-colors duration-300 dark:bg-[#17120F] dark:text-[#F3DFC2] sm:py-20 lg:py-24">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 size-80 rounded-full bg-[#A6532E]/10 blur-[110px] dark:bg-[#A6532E]/8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-[#A6532E]/8 blur-[90px] dark:bg-[#A6532E]/6"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-4 gap-2 border-[#A6532E]/40 bg-[#A6532E]/10 px-3.5 py-1 text-xs font-bold text-[#A6532E] dark:border-[#D58B65]/40 dark:bg-[#A6532E]/20 dark:text-[#D58B65]"
            >
              <ShieldCheck className="size-3.5 fill-[#A6532E]/20" />
              VERIFIED PARTNERS
            </Badge>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Trusted Equipment{" "}
              <span className="text-[#A6532E] dark:text-[#D58B65]">Owners</span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#806650] dark:text-[#B9A99A] sm:text-base">
              Connect with top-rated, identity-verified equipment owners across
              Bangladesh. Guaranteed reliability, well-maintained machinery, and
              swift booking responses.
            </p>
          </div>

          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant="outline"
              onClick={() => router.push("/equipment")}
              className="group/btn w-fit gap-2 border-[#806650]/40 bg-transparent text-[#4B382B] hover:border-[#A6532E] hover:bg-[#A6532E]/10 hover:text-[#A6532E] dark:border-[#B9A99A]/30 dark:text-[#F3DFC2] dark:hover:border-[#D58B65] dark:hover:text-[#D58B65]"
            >
              Browse All Listings
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Owners Cards Grid */}
        <motion.div
          key={owners[0]?.id || "initial-owners"}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {owners.slice(0, 4).map((owner) => {
            const initials = owner.name
              .split(" ")
              .filter(Boolean)
              .map((part) => part[0]?.toUpperCase())
              .slice(0, 2)
              .join("") || "OW";

            return (
              <motion.div
                key={owner.id}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="min-w-0"
              >
                <Card className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#E9D9C9] bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#A6532E] hover:shadow-[0_20px_40px_rgba(166,83,46,0.12)] dark:border-[#4B382B] dark:bg-[#241B16] dark:hover:border-[#D58B65]/60 dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                  {/* Top Bar: Profile & Verification */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      {/* Avatar */}
                      <div className="relative">
                        {owner.avatar ? (
                          <div className="relative size-14 overflow-hidden rounded-2xl border-2 border-[#A6532E]/30 shadow-md">
                            <img
                              src={owner.avatar}
                              alt={owner.name}
                              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-[#A6532E]/30 bg-gradient-to-br from-[#B56D43] to-[#914321] text-base font-extrabold text-[#F3DFC2] shadow-md">
                            {initials}
                          </div>
                        )}

                        {/* Verified Badge Icon */}
                        {owner.verified && (
                          <span
                            title="Verified Owner"
                            className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-2 ring-white dark:ring-[#241B16]"
                          >
                            <CheckCircle2 className="size-3.5 fill-emerald-500 text-white" />
                          </span>
                        )}
                      </div>

                      {/* Pro Badge */}
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#A6532E]/25 bg-[#A6532E]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A6532E] dark:border-[#D58B65]/30 dark:bg-[#A6532E]/20 dark:text-[#D58B65]">
                        <Award className="size-3" />
                        Top Host
                      </span>
                    </div>

                    {/* Owner Details */}
                    <div className="mt-4">
                      <h3 className="truncate text-lg font-bold tracking-tight text-[#211A15] transition-colors group-hover:text-[#A6532E] dark:text-[#F3DFC2] dark:group-hover:text-[#D58B65]">
                        {owner.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-[#806650] dark:text-[#B9A99A]">
                        <MapPin className="size-3.5 shrink-0 text-[#A6532E] dark:text-[#D58B65]" />
                        <span className="truncate">{owner.location}</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-[#FAF7F3]/80 p-3 dark:bg-[#1C1511]/70">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#A6532E]/10 text-[#A6532E] dark:text-[#D58B65]">
                          <Package className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold leading-none text-[#211A15] dark:text-[#F3DFC2]">
                            {owner.totalListings}+
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Listings
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                          <Star className="size-4 fill-amber-400 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold leading-none text-[#211A15] dark:text-[#F3DFC2]">
                            {owner.rating}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            ({owner.reviewsCount} reviews)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category Tags */}
                    {owner.categories && owner.categories.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {owner.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="inline-flex rounded-md border border-border/80 bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom / Action */}
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <div className="mb-3 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="size-3 text-[#A6532E] dark:text-[#D58B65]" />
                        Response Rate
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {owner.responseRate || "98%"}
                      </span>
                    </div>

                    <Button
                      onClick={() => handleExploreOwner(owner.name)}
                      className="group/btn h-10 w-full gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] text-xs font-bold text-[#F3DFC2] shadow-sm transition-all duration-300 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_6px_16px_rgba(166,83,46,0.22)]"
                    >
                      View Equipment
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Banner: Become an Owner */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl border border-[#E9D9C9] bg-gradient-to-r from-[#2B211B] via-[#211A15] to-[#1A1410] p-6 text-white shadow-md dark:border-[#4B382B] sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#c58a63]/30 bg-[#a6532e]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#edbd91]">
                <Sparkles className="size-3.5" />
                JOIN AS AN OWNER
              </span>
              <h3 className="text-xl font-extrabold sm:text-2xl">
                Have idle equipment? Start earning today.
              </h3>
              <p className="mt-1.5 text-xs text-white/70 sm:text-sm">
                List your tools and machinery on RentZone. Set your own rental
                rates, connect with verified renters, and earn extra income
                securely.
              </p>
            </div>

            <Link
              href="/signup"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-6 py-3.5 text-sm font-bold text-[#F3DFC2] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_8px_20px_rgba(166,83,46,0.3)]"
            >
              <Users className="size-4" />
              Become an Owner
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
