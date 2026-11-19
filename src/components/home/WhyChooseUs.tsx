import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Wallet,
  Clock3,
  Headset,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description:
      "Rent with confidence with a safe and reliable rental experience every time.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description:
      "Enjoy quality rentals at competitive prices without breaking your budget.",
  },
  {
    icon: Clock3,
    title: "Flexible Rental",
    description:
      "Choose rental periods that perfectly fit your needs and schedule.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description: "Our friendly support team is always ready to help you.",
  },
];

const whyChooseUsImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85";

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-[5%]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Image Section */}
          <div className="relative mx-auto w-full max-w-[600px]">
            {/* Decorative Background */}
            <div className="absolute -left-5 -top-5 size-28 rounded-2xl bg-[rgba(166,83,46,0.10)]" />

            <div className="relative aspect-[4/3.5] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_26px_54px_rgba(75,56,43,0.2)]">
              <Image
                src={whyChooseUsImage}
                alt="Modern rental workspace at RentZone"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#211A15]/75 via-transparent to-transparent" />

              {/* Image Content */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8">
                <div className="flex items-center gap-2 text-[#F3DFC2]">
                  <Sparkles size={18} />

                  <span className="text-xs font-bold uppercase tracking-[1.5px]">
                    Rent smarter, live better
                  </span>
                </div>

                <h3 className="mt-3 max-w-sm text-2xl font-bold leading-tight text-white md:text-3xl">
                  Everything You Need, Just a Rental Away.
                </h3>
              </div>
            </div>

            {/* Floating Trust Card */}
            <Card className="absolute -bottom-5 right-3 flex items-center gap-3 border-border bg-card p-3 shadow-xl sm:-right-5 sm:p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(166,83,46,0.12)] text-[var(--rz-heading)]">
                <ShieldCheck size={24} />
              </div>

              <div>
                <p className="text-sm font-bold text-card-foreground">
                  Rent With Confidence
                </p>

                <p className="text-xs text-muted-foreground">
                  Quality you can trust
                </p>
              </div>
            </Card>
          </div>

          {/* Right Content Section */}
          <div className="min-w-0 pt-5 lg:pt-0">
            {/* Section Badge */}
            <Badge
              variant="outline"
              className="mb-5 gap-2 rounded-full border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-4 py-1.5 text-[var(--rz-heading)]"
            >
              <Sparkles size={13} />
              WHY CHOOSE RENTZONE
            </Badge>

            {/* Heading */}
            <h2 className="max-w-xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[var(--rz-heading)] sm:text-4xl lg:text-[clamp(2.2rem,3.5vw,3.3rem)]">
              The Smarter Way to
              <span className="block">Rent What You Need.</span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              At RentZone, we make renting simple, affordable, and hassle-free.
              Get access to the things you need without the commitment of buying
              them.
            </p>

            {/* Features Grid */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group flex items-start gap-3"
                  >
                    {/* Icon */}
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(166,83,46,0.20)] bg-[rgba(166,83,46,0.08)] text-[var(--rz-heading)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--rz-heading)] group-hover:text-[#F3DFC2]">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    {/* Feature Content */}
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        {feature.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button className="h-12 gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-6 font-bold text-[#F3DFC2] shadow-[0_6px_16px_rgba(166,83,46,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_10px_22px_rgba(166,83,46,0.3)]">
                <Link href="/about">
                  Discover More
                  <ArrowRight size={18} />
                </Link>
              </Button>

              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 size={17} className="text-[var(--rz-heading)]" />
                Simple. Secure. Affordable.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
