import Image from "next/image";
import Link from "next/link";

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

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden">
      {/* ================= SECTION 01: ABOUT US ================= */}
      <section className="bg-white py-16 text-[#211A15] transition-colors duration-500 dark:bg-[#171310] dark:text-[#F3DFC2] md:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-[5%] lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]">
              <Sparkles size={15} />
              About RentZone
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.15] tracking-tight md:text-5xl lg:text-[58px]">
              Rent Smarter.
              <span className="block text-[#A6532E]">Live Better.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#71665D] dark:text-[#C8B9AA] md:text-lg">
              Welcome to RentZone, your trusted destination for convenient and
              affordable rentals. We believe you should have access to the
              things you need without the commitment and expense of ownership.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#887B70] dark:text-[#AFA092]">
              Whether you need something for work, everyday life, or a special
              occasion, RentZone makes discovering and renting easier. Our goal
              is to connect people with the right resources through a simple and
              reliable platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rentals"
                className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#B56D43,#914321)] px-6 py-3.5 text-sm font-bold text-[#F3DFC2] shadow-lg shadow-[#A6532E]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Explore Rentals
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[#A6532E]/25 px-6 py-3.5 text-sm font-bold text-[#A6532E] transition-all duration-300 hover:bg-[#A6532E] hover:text-white"
              >
                Contact Us
              </Link>
            </div>

            {/* Highlights */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#A6532E]/10 pt-7">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 size={18} className="text-[#A6532E]" />
                Simple Experience
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 size={18} className="text-[#A6532E]" />
                Reliable Service
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -right-5 -top-5 size-32 rounded-full bg-[#A6532E]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px]">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85"
                alt="Modern workspace representing RentZone"
                width={1200}
                height={1000}
                priority
                className="h-[350px] w-full object-cover sm:h-[440px] lg:h-[510px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#211A15]/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#211A15]/75 p-5 text-white backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#A6532E]">
                    <Heart size={22} className="fill-white" />
                  </div>

                  <div>
                    <h3 className="font-bold">More Access, Less Ownership</h3>
                    <p className="mt-1 text-xs text-white/75">
                      A smarter way to get what you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 -z-10 size-32 rounded-full bg-[#A6532E]/15 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ================= SECTION 02: MISSION & VISION ================= */}
      <section className="bg-[#F8F4EE] py-16 text-[#211A15] transition-colors duration-500 dark:bg-[#F3DFC2] dark:text-[#211A15] md:py-24">
        <div className="mx-auto max-w-[1440px] px-[5%]">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F3DFC2]/20 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#D99A70] dark:border-[#A6532E]/20 dark:text-[#A6532E]">
              <Target size={15} />
              What Drives Us
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              Our Mission & Vision
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#C8B9AA] dark:text-[#74665B] md:text-base">
              We are building a rental experience that makes access easier,
              ownership less necessary, and everyday life more convenient.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Mission Card */}
            <div className="group rounded-[24px] border border-[#F3DFC2]/10 bg-[#F3DFC2]/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#A6532E]/50 hover:bg-[#F3DFC2]/10 dark:border-[#211A15]/10 dark:bg-white/50 dark:hover:bg-white/80 sm:p-9">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#A6532E] text-[#F3DFC2] shadow-lg shadow-black/10">
                <Target size={27} />
              </div>

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
            </div>

            {/* Vision Card */}
            <div className="group rounded-[24px] border border-[#F3DFC2]/10 bg-[#F3DFC2]/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#A6532E]/50 hover:bg-[#F3DFC2]/10 dark:border-[#211A15]/10 dark:bg-white/50 dark:hover:bg-white/80 sm:p-9">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#A6532E] text-[#F3DFC2] shadow-lg shadow-black/10">
                <Eye size={27} />
              </div>

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
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 03: WHY RENTZONE ================= */}
      <section className="bg-white py-16 text-[#211A15] transition-colors duration-500 dark:bg-[#171310] dark:text-[#F3DFC2] md:py-24">
        <div className="mx-auto max-w-[1440px] px-[5%]">
          {/* Section Heading */}
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]">
              <Sparkles size={15} />
              The RentZone Advantage
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              Why Choose <span className="text-[#A6532E]">RentZone?</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#887B70] dark:text-[#C8B9AA] md:text-base">
              We focus on making your rental journey simple, affordable, and
              comfortable from beginning to end.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="
                    group rounded-2xl border border-[#A6532E]/10
                    bg-[#FDFBF8] p-6
                    transition-all duration-300
                    hover:-translate-y-2 hover:border-[#A6532E]/30
                    hover:shadow-[0_15px_40px_rgba(166,83,46,0.10)]
                    dark:border-[#F3DFC2]/10
                    dark:bg-[#211A15]
                    dark:hover:border-[#A6532E]/50
                  "
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-[#A6532E]/10 text-[#A6532E] transition-all duration-300 group-hover:bg-[#A6532E] group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <span className="mt-6 block text-xs font-bold tracking-widest text-[#A6532E]/60">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#211A15] dark:text-[#F3DFC2]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#887B70] dark:text-[#C8B9AA]">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 overflow-hidden rounded-[24px] bg-[linear-gradient(120deg,#A6532E,#71391F)] p-7 text-center text-[#F3DFC2] sm:p-10 md:p-12">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-2xl font-extrabold md:text-3xl">
                Ready to Experience Smarter Renting?
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
                Discover a convenient way to get what you need. Start exploring
                RentZone today.
              </p>

              <Link
                href="/rentals"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F3DFC2] px-6 py-3.5 text-sm font-bold text-[#71391F] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Browse Rentals
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
