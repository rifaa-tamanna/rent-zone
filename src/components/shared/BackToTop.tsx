"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`
        fixed bottom-5 right-5 z-[100]
        flex size-12 items-center justify-center
        rounded-2xl
        border border-[#F3DFC2]/20
        bg-[linear-gradient(135deg,#B56D43,#914321)]
        text-[#F3DFC2]
        shadow-[0_8px_25px_rgba(145,67,33,0.35)]
        transition-all duration-500 ease-out
        hover:-translate-y-1.5
        hover:scale-105
        hover:shadow-[0_12px_30px_rgba(145,67,33,0.45)]
        active:scale-95
        sm:bottom-7 sm:right-7 sm:size-[54px]
        ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-75 opacity-0"
        }
      `}
    >
      <ArrowUp
        size={22}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:-translate-y-1"
      />

      {/* Subtle inner highlight */}
      <span className="pointer-events-none absolute inset-[3px] rounded-[13px] border border-white/15" />
    </button>
  );
}
