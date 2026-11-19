import Image from "next/image";
import Link from "next/link";

import {
  Search,
  CalendarCheck,
  PackageCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find What You Need",
    description:
      "Explore our wide range of rental products and find exactly what you're looking for.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book Your Rental",
    description:
      "Choose your preferred rental duration, check availability, and confirm your booking.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Get It & Enjoy",
    description:
      "Receive your rented item and enjoy a hassle-free experience. Return it when you're done.",
  },
];

const howItWorksImage =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=85";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="
        relative overflow-hidden
        bg-[#211A15] text-[#F3DFC2]
        transition-colors duration-500
        dark:bg-[#F8F4EE] dark:text-[#2B211B]
      "
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-[#A6532E]/15 blur-[100px] dark:bg-[#A6532E]/10" />

      <div className="relative mx-auto max-w-[1440px] px-[5%] py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="order-2 min-w-0 lg:order-1">
            {/* Badge */}
            <Badge
              variant="outline"
              className="
                mb-5 gap-2 rounded-full
                border-[#B56D43]/50
                bg-[#A6532E]/15 px-4 py-1.5
                text-[#E4B18D]
                dark:border-[#A6532E]/30
                dark:bg-[#A6532E]/10
                dark:text-[#A6532E]
              "
            >
              <Sparkles size={13} />
              HOW IT WORKS
            </Badge>

            {/* Heading */}
            <h2
              className="
              max-w-xl text-3xl font-extrabold
              leading-[1.15] tracking-tight
              text-[#F3DFC2]
              sm:text-4xl
              lg:text-[clamp(2.2rem,3.5vw,3.3rem)]
              dark:text-[#2B211B]
            "
            >
              Renting Made Simple,
              <span className="block text-[#C17B50] dark:text-[#A6532E]">
                Just Three Easy Steps.
              </span>
            </h2>

            {/* Description */}
            <p
              className="
              mt-5 max-w-xl text-sm leading-7
              text-[#C8B9AA] md:text-base
              dark:text-[#76685C]
            "
            >
              Getting what you need has never been easier. Follow these three
              simple steps and enjoy a smooth, convenient rental experience with
              RentZone.
            </p>

            {/* Steps */}
            <div className="mt-9 space-y-7">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group relative flex gap-4 sm:gap-5"
                  >
                    {/* Step Number & Icon */}
                    <div className="relative shrink-0">
                      <div
                        className="
                        flex size-12 items-center justify-center
                        rounded-xl border border-[#B56D43]/40
                        bg-[#A6532E]/15
                        text-[#D99A70]
                        transition-all duration-300
                        group-hover:-translate-y-1
                        group-hover:bg-[#A6532E]
                        group-hover:text-white
                        sm:size-14
                        dark:border-[#A6532E]/25
                        dark:bg-[#A6532E]/10
                        dark:text-[#A6532E]
                        dark:group-hover:bg-[#A6532E]
                        dark:group-hover:text-white
                      "
                      >
                        <Icon size={24} strokeWidth={1.8} />
                      </div>

                      {/* Connecting Line */}
                      {index !== steps.length - 1 && (
                        <div
                          className="
                          absolute left-1/2 top-14
                          h-10 w-px -translate-x-1/2
                          bg-[#B56D43]/35
                          sm:top-16 sm:h-12
                        "
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="pt-0.5">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span
                          className="
                          text-[11px] font-bold tracking-[1.5px]
                          text-[#C17B50]
                          dark:text-[#A6532E]
                        "
                        >
                          STEP {step.number}
                        </span>

                        {index === 0 && (
                          <span
                            className="
                            size-1.5 rounded-full bg-[#B56D43]
                          "
                          />
                        )}
                      </div>

                      <h3
                        className="
                        text-base font-bold text-[#F3DFC2]
                        transition-colors duration-300
                        group-hover:text-[#D99A70]
                        sm:text-lg
                        dark:text-[#2B211B]
                        dark:group-hover:text-[#A6532E]
                      "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                        mt-1.5 max-w-md text-sm leading-6
                        text-[#BDAE9F]
                        dark:text-[#76685C]
                      "
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                className="
                  h-12 gap-2 rounded-xl
                  border border-[#B56D43]
                  bg-[#F3DFC2] px-6
                  font-bold text-[#211A15]
                  shadow-lg shadow-black/15
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#E4C7A6]
                  dark:bg-[image:var(--rz-btn-gradient)]
                  dark:text-[#F3DFC2]
                  dark:hover:bg-[image:var(--rz-btn-gradient-hover)]
                "
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight size={18} />
                </Link>
              </Button>

              <div
                className="
                flex items-center gap-2 text-sm
                text-[#C8B9AA]
                dark:text-[#76685C]
              "
              >
                <CheckCircle2
                  size={17}
                  className="text-[#C17B50] dark:text-[#A6532E]"
                />
                Easy & Hassle-Free
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative order-1 mx-auto w-full max-w-[600px] lg:order-2">
            {/* Decorative Shape */}
            <div
              className="
              absolute -right-5 -top-5 size-28
              rounded-2xl border border-[#B56D43]/30
            "
            />

            {/* Main Image */}
            <div
              className="
              relative aspect-[4/3.5] overflow-hidden
              rounded-2xl border border-[#B56D43]/30
              bg-[#382A21]
              shadow-[0_26px_54px_rgba(0,0,0,0.25)]
              dark:bg-muted
            "
            >
              <Image
                src={howItWorksImage}
                alt="A modern workspace representing the easy RentZone rental process"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover transition-transform
                  duration-700 hover:scale-105
                "
              />

              {/* Image Overlay */}
              <div
                className="
                absolute inset-0
                bg-gradient-to-t
                from-[#211A15]/80 via-[#211A15]/10 to-transparent
              "
              />

              {/* Image Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
                <div
                  className="
                  mb-3 flex items-center gap-2
                  text-[#F3DFC2]
                "
                >
                  <CheckCircle2 size={18} />

                  <span
                    className="
                    text-xs font-bold uppercase
                    tracking-[1.5px]
                  "
                  >
                    Your Rental Journey
                  </span>
                </div>

                <h3
                  className="
                  max-w-sm text-2xl font-bold
                  leading-tight text-white md:text-3xl
                "
                >
                  Less Buying, More Enjoying.
                </h3>

                <p
                  className="
                  mt-2 max-w-sm text-sm leading-6
                  text-white/80
                "
                >
                  Everything you need, whenever you need it.
                </p>
              </div>
            </div>

            {/* Floating Step Card */}
            <div
              className="
              absolute -bottom-5 left-3
              flex items-center gap-3 rounded-xl
              border border-[#B56D43]/30
              bg-[#33271F] p-3 shadow-xl
              sm:-left-5 sm:p-4
              dark:bg-white dark:border-border
            "
            >
              <div
                className="
                flex size-11 items-center justify-center
                rounded-xl bg-[#A6532E]/20
                text-[#E4B18D]
                dark:bg-[#A6532E]/10
                dark:text-[#A6532E]
              "
              >
                <PackageCheck size={23} />
              </div>

              <div>
                <p
                  className="
                  text-sm font-bold text-[#F3DFC2]
                  dark:text-[#2B211B]
                "
                >
                  3 Simple Steps
                </p>

                <p
                  className="
                  text-xs text-[#C8B9AA]
                  dark:text-muted-foreground
                "
                >
                  That's all it takes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
