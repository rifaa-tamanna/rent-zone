"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Camera,
  CarFront,
  Construction,
  Laptop,
  Sprout,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const categories = [
  {
    id: "construction",
    name: "Construction Equipment",
    description: "Powerful tools and machinery for every construction project.",
    icon: Construction,
    number: "01",
    label: "Heavy Machinery",
  },
  {
    id: "photography",
    name: "Photography Equipment",
    description: "Professional cameras, lenses and studio essentials.",
    icon: Camera,
    number: "02",
    label: "Cameras & Accessories",
  },
  {
    id: "vehicles",
    name: "Vehicles & Transportation",
    description: "Reliable vehicles for your everyday transportation needs.",
    icon: CarFront,
    number: "03",
    label: "Cars & Vehicles",
  },
  {
    id: "agriculture",
    name: "Agriculture Equipment",
    description: "Modern equipment to make farming easier and more efficient.",
    icon: Sprout,
    number: "04",
    label: "Farming Tools",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Discover essential electronics and technical devices.",
    icon: Laptop,
    number: "05",
    label: "Electronic Devices",
  },
  {
    id: "events",
    name: "Event Equipment",
    description: "Sound systems, stage lighting and premium event gear.",
    icon: Sparkles,
    number: "06",
    label: "Audio & Stage",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const CategoriesSection = () => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleCategoryClick = (category: string) => {
    router.push(`/equipment?category=${category}`);
  };

  return (
    <section className="overflow-hidden bg-[#FAF7F3] py-16 text-[#4B382B] transition-colors duration-300 dark:bg-[#17120F] dark:text-[#F3DFC2] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-14 lg:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A6532E]/30 bg-[#A6532E]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#A6532E] dark:border-[#A6532E]/50 dark:bg-[#A6532E]/10 dark:text-[#D58B65]">
            <Construction className="size-3.5" />
            Explore RentZone
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Find Equipment by{" "}
            <span className="text-[#A6532E] dark:text-[#D58B65]">Category</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#806650] dark:text-[#B9A99A] sm:text-base">
            From heavy machinery to professional electronics, discover
            everything you need in one convenient place.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.button
                key={category.id}
                type="button"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-[#E9D9C9] bg-white p-6 text-left transition-colors duration-300 hover:border-[#A6532E]/50 hover:shadow-[0_18px_35px_rgba(75,56,43,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6532E] dark:border-[#4B382B] dark:bg-[#241B16] dark:hover:border-[#A6532E] sm:p-7"
              >
                {/* Decorative Number */}
                <span className="pointer-events-none absolute -right-1 -top-5 select-none text-[100px] font-black leading-none tracking-tighter text-[#A6532E]/[0.045] transition-all duration-500 group-hover:text-[#A6532E]/[0.10] dark:text-[#F3DFC2]/[0.035] dark:group-hover:text-[#D58B65]/[0.10]">
                  {category.number}
                </span>

                {/* Top Row */}
                <div className="relative flex w-full items-center justify-between">
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { rotate: -8, scale: 1.08 }
                    }
                    transition={{ duration: 0.3 }}
                    className="flex size-12 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E] transition-colors duration-300 group-hover:bg-[#A6532E] group-hover:text-white dark:bg-[#A6532E]/15 dark:text-[#D58B65] dark:group-hover:text-white"
                  >
                    <Icon size={23} strokeWidth={1.7} />
                  </motion.div>

                  <span className="flex size-9 items-center justify-center rounded-full border border-[#E9D9C9] text-[#806650] transition-all duration-300 group-hover:border-[#A6532E] group-hover:bg-[#A6532E] group-hover:text-white dark:border-[#806650]/40 dark:text-[#B9A99A]">
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                {/* Category Details */}
                <div className="relative mt-auto pt-7">
                  <h3 className="text-lg font-bold tracking-tight text-[#4B382B] transition-colors duration-300 group-hover:text-[#A6532E] dark:text-[#F3DFC2] dark:group-hover:text-[#D58B65] sm:text-xl">
                    {category.name}
                  </h3>

                  <p className="mt-2 max-w-[34ch] text-sm leading-6 text-[#806650] dark:text-[#B9A99A]">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E9D9C9] pt-4 dark:border-[#4B382B]">
                    <span className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#A6532E] dark:text-[#D58B65]">
                      {category.label}
                    </span>

                    <span className="text-xs font-semibold text-[#806650] dark:text-[#B9A99A]">
                      Explore
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
