"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Camera,
  CarFront,
  Construction,
  Laptop,
  Sprout,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const categories = [
  {
    id: "construction",
    name: "Construction Equipment",
    description: "Tools and machinery for every construction project.",
    icon: Construction,
    count: "Heavy Machinery",
  },
  {
    id: "photography",
    name: "Photography Equipment",
    description: "Professional cameras, lenses and studio equipment.",
    icon: Camera,
    count: "Cameras & Accessories",
  },
  {
    id: "vehicles",
    name: "Vehicles & Transportation",
    description: "Find reliable vehicles for your transportation needs.",
    icon: CarFront,
    count: "Cars & Vehicles",
  },
  {
    id: "agriculture",
    name: "Agriculture Equipment",
    description: "Modern equipment to support your farming activities.",
    icon: Sprout,
    count: "Farming Tools",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Explore essential electronics and technical devices.",
    icon: Laptop,
    count: "Electronic Devices",
  },
];

const CategoriesSection = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/equipment?category=${category}`);
  };

  return (
    <section className="bg-[#FAF7F3] py-16 text-[#4B382B] transition-colors duration-300 dark:bg-[#17120F] dark:text-[#F3DFC2] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 max-w-2xl sm:mb-12">
          <Badge
            variant="outline"
            className="mb-4 gap-2 border-[#A6532E]/30 bg-[#A6532E]/5 px-3 py-1 text-[#A6532E] dark:border-[#A6532E]/50 dark:bg-[#A6532E]/10 dark:text-[#D58B65]"
          >
            <Construction className="size-3.5" />
            Browse Categories
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore by{" "}
            <span className="text-[#A6532E] dark:text-[#D58B65]">Category</span>
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#806650] dark:text-[#B9A99A] sm:text-base">
            Discover the right equipment for your needs. Browse popular
            categories and find everything in one place.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative cursor-pointer gap-0 overflow-hidden rounded-2xl border-[#E9D9C9] bg-white p-6 text-[#4B382B] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A6532E]/50 hover:shadow-xl dark:border-[#4B382B] dark:bg-[#241B16] dark:text-[#F3DFC2] dark:hover:border-[#A6532E] sm:p-7"
              >
                {/* Background Decoration */}
                <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#A6532E]/5 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex items-start justify-between">
                  {/* Category Icon */}
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-[#A6532E]/30 bg-[#A6532E]/10 text-[#A6532E] transition-all duration-300 group-hover:bg-[#A6532E] group-hover:text-white dark:text-[#D58B65] dark:group-hover:text-white">
                    <Icon className="size-7" strokeWidth={1.7} />
                  </div>

                  {/* Arrow */}
                  <div className="flex size-9 items-center justify-center rounded-full border border-[#E9D9C9] text-[#806650] transition-all duration-300 group-hover:border-[#A6532E] group-hover:bg-[#A6532E] group-hover:text-white dark:border-[#806650]/40 dark:text-[#B9A99A]">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Category Information */}
                <div className="relative mt-7">
                  <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-[#A6532E] dark:group-hover:text-[#D58B65] sm:text-xl">
                    {category.name}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-[#806650] dark:text-[#B9A99A]">
                    {category.description}
                  </p>

                  <div className="mt-5 border-t border-[#E9D9C9] pt-4 dark:border-[#4B382B]">
                    <span className="text-xs font-medium tracking-wide text-[#A6532E] dark:text-[#D58B65]">
                      {category.count}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
