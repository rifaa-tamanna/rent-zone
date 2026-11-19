import Image from "next/image";

import { ArrowRight, Mail, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const subscriptionImage =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=85";

export default function Subscription() {
  return (
    <section className="px-[5%] py-12 md:py-16">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-border shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={subscriptionImage}
            alt="Modern workspace"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#211A15]/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 py-12 text-center md:px-10 md:py-16">
          <Badge
            variant="outline"
            className="mb-4 gap-2 rounded-full border-[#B56D43]/50 bg-[#A6532E]/20 px-4 py-1.5 text-[#F3DFC2]"
          >
            <Sparkles size={13} />
            STAY CONNECTED
          </Badge>

          <h2 className="text-2xl font-extrabold leading-tight text-[#F3DFC2] sm:text-3xl md:text-4xl">
            Get Exclusive Rental Deals!
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#E0D1C2] md:text-base">
            Subscribe to our newsletter and get the latest rental offers,
            updates, and special discounts.
          </p>

          {/* Subscription Form */}
          <form className="mt-7 flex w-full max-w-lg flex-col gap-3 rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:flex-row">
            <div className="relative flex-1">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A6532E]"
              />

              <Input
                type="email"
                placeholder="Enter your email address"
                required
                aria-label="Email address"
                className="h-12 border-0 bg-white pl-11 text-sm text-[#211A15] placeholder:text-[#8B8178] focus-visible:ring-2 focus-visible:ring-[#B56D43]"
              />
            </div>

            <Button
              type="submit"
              className="h-12 shrink-0 gap-2 rounded-lg border border-[#B56D43] bg-[image:var(--rz-btn-gradient)] px-6 font-bold text-[#F3DFC2] transition-all duration-300 hover:bg-[image:var(--rz-btn-gradient-hover)]"
            >
              Subscribe
              <ArrowRight size={17} />
            </Button>
          </form>

          <p className="mt-4 text-xs text-[#D0BFAF]">
            No spam, just great deals. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
