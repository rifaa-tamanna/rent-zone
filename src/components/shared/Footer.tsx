import Link from "next/link";

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
  { label: "Browse Rentals", href: "/rentals" },
  { label: "How It Works", href: "/how-it-works" },
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

export default function Footer() {
  return (
    <footer
      className="
        overflow-hidden
        bg-[#211A15] text-[#F3DFC2]
        transition-colors duration-500
        dark:bg-[#F8F4EE] dark:text-[#2B211B]
      "
    >
      <div className="mx-auto max-w-[1440px] px-[5%] pt-12 sm:pt-14 md:pt-16 lg:pt-20">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12">
          {/* Brand Section */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-[11px]"
            >
              <span
                className="
                  flex size-[41px] items-center justify-center
                  rounded-[13px]
                  bg-[linear-gradient(135deg,#B56D43,#914321)]
                  text-[#F3DFC2]
                  shadow-[0_4px_12px_rgba(116,61,33,0.18)]
                  transition-transform duration-300
                  hover:-rotate-12
                  md:size-[45px]
                "
              >
                <Cog size={27} strokeWidth={2.2} />
              </span>

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
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      flex size-10 items-center justify-center
                      rounded-xl
                      border border-[#F3DFC2]/15
                      bg-[#F3DFC2]/5 text-[#D8C6B3]
                      transition-all duration-300
                      hover:-translate-y-1
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
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-base font-bold text-[#F3DFC2] dark:text-[#2B211B]">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
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
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-6 text-base font-bold text-[#F3DFC2] dark:text-[#2B211B]">
              Customer Support
            </h3>

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.label}>
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
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-6 text-base font-bold text-[#F3DFC2] dark:text-[#2B211B]">
              Get In Touch
            </h3>

            <p className="mb-5 text-sm leading-6 text-[#C8B9AA] dark:text-[#74665B]">
              Have questions or need assistance? We'd love to hear from you.
            </p>

            <div className="space-y-5">
              {/* Email */}
              <Link href="/contact" className="group flex items-center gap-3">
                <div
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl bg-[#A6532E]/20 text-[#D99A70]
                    transition-colors
                    group-hover:bg-[#A6532E] group-hover:text-white
                  "
                >
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs text-[#AFA092] dark:text-[#88796D]">
                    Email Support
                  </p>
                  <p className="text-sm font-semibold text-[#F3DFC2] dark:text-[#2B211B]">
                    Contact Us
                  </p>
                </div>
              </Link>

              {/* Phone / Support */}
              <Link href="/contact" className="group flex items-center gap-3">
                <div
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl bg-[#A6532E]/20 text-[#D99A70]
                    transition-colors
                    group-hover:bg-[#A6532E] group-hover:text-white
                  "
                >
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs text-[#AFA092] dark:text-[#88796D]">
                    Need Assistance?
                  </p>
                  <p className="text-sm font-semibold text-[#F3DFC2] dark:text-[#2B211B]">
                    Talk to Our Team
                  </p>
                </div>
              </Link>

              {/* Location */}
              <div className="flex items-center gap-3">
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
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div
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
          <div>
            <h3 className="text-lg font-bold text-[#F3DFC2] dark:text-[#2B211B] md:text-xl">
              Ready to Rent Something?
            </h3>

            <p className="mt-1.5 text-sm text-[#C8B9AA] dark:text-[#74665B]">
              Explore our collection and find your perfect rental.
            </p>
          </div>

          <Link
            href="/rentals"
            className="
              inline-flex w-full shrink-0 items-center justify-center gap-2
              rounded-xl border border-[#A6532E]
              bg-[image:var(--rz-btn-gradient)]
              px-5 py-3 text-sm font-bold text-[#F3DFC2]
              shadow-lg shadow-black/10
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[image:var(--rz-btn-gradient-hover)]
              sm:w-auto
            "
          >
            Explore Rentals
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Bottom Footer */}
        <Separator className="bg-[#F3DFC2]/15 dark:bg-[#2B211B]/15" />

        <div
          className="
            flex flex-col items-center justify-between gap-4
            py-6 text-center
            sm:flex-row sm:text-left
          "
        >
          <p className="text-xs text-[#AFA092] dark:text-[#88796D] sm:text-sm">
            © {new Date().getFullYear()} RentZone. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-[#AFA092] dark:text-[#88796D] sm:text-sm">
            Made with for better renting.
          </p>

          <div className="flex items-center gap-4 text-xs text-[#AFA092] dark:text-[#88796D]">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
