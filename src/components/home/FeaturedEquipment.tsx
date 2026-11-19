"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { ArrowRight, Heart, MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const featuredEquipment = [
  {
    id: "equipment-1",
    name: "Toyota Corolla",
    category: "Vehicles & Transportation",
    rating: 4.7,
    reviews: 128,
    location: "Sylhet, Bangladesh",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85",
  },
  {
    id: "equipment-2",
    name: "CAT Excavator",
    category: "Heavy Machinery",
    rating: 4.9,
    reviews: 86,
    location: "Dhaka, Bangladesh",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=900&q=85",
  },
  {
    id: "equipment-3",
    name: "JCB Backhoe Loader",
    category: "Construction Equipment",
    rating: 4.8,
    reviews: 64,
    location: "Chattogram, Bangladesh",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=85",
  },
  {
    id: "equipment-4",
    name: "Industrial Generator",
    category: "Power Equipment",
    rating: 4.6,
    reviews: 52,
    location: "Sylhet, Bangladesh",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=85",
  },
  {
    id: "equipment-5",
    name: "Hydraulic Crane",
    category: "Lifting Equipment",
    rating: 4.9,
    reviews: 92,
    location: "Dhaka, Bangladesh",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=85",
  },
  {
    id: "equipment-6",
    name: "Forklift Truck",
    category: "Material Handling",
    rating: 4.7,
    reviews: 43,
    location: "Khulna, Bangladesh",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85",
  },
];

const FeaturedEquipment = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleViewDetails = (id: string) => {
    if (!session?.user) {
      router.push("/signin");
      return;
    }

    router.push(`/equipment/${id}`);
  };

  return (
    <section className="bg-[#17120F] py-16 text-[#F3DFC2] transition-colors duration-300 dark:bg-[#FAF7F3] dark:text-[#4B382B] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-4 gap-2 border-[#A6532E]/50 bg-[#A6532E]/10 px-3 py-1 text-[#D58B65] dark:border-[#A6532E]/30 dark:bg-[#A6532E]/5 dark:text-[#A6532E]"
            >
              <Star className="size-3.5 fill-current" />
              Featured Collection
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Featured{" "}
              <span className="text-[#D58B65] dark:text-[#A6532E]">
                Equipment
              </span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#B9A99A] dark:text-[#806650] sm:text-base">
              Find the right equipment for your next project. Quality rentals,
              reliable owners, and flexible pricing.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/equipment")}
            className="w-fit gap-2 border-[#806650]/50 bg-transparent text-[#F3DFC2] hover:border-[#D58B65] hover:bg-[#A6532E]/10 hover:text-[#D58B65] dark:border-[#A6532E]/30 dark:text-[#4B382B] dark:hover:border-[#A6532E] dark:hover:text-[#A6532E]"
          >
            Explore All
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEquipment.slice(0, 6).map((equipment) => {
            const isFavorite = favorites.includes(equipment.id);

            return (
              <Card
                key={equipment.id}
                className="group gap-0 overflow-hidden rounded-2xl border-[#4B382B] bg-[#241B16] py-0 text-[#F3DFC2] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A6532E] hover:shadow-xl dark:border-[#E9D9C9] dark:bg-white dark:text-[#4B382B] dark:hover:border-[#A6532E]/50"
              >
                {/* Equipment Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#30241D] dark:bg-[#F3EAE0]">
                  <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Favorite Button */}
                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    onClick={() => toggleFavorite(equipment.id)}
                    className="absolute left-4 top-4 size-10 rounded-full bg-[#F3DFC2]/95 text-[#4B382B] shadow-md backdrop-blur-sm hover:bg-white dark:bg-white/95 dark:text-[#4B382B] dark:hover:bg-white"
                  >
                    <Heart
                      className={`size-5 transition-colors ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-[#4B382B]"
                      }`}
                    />
                  </Button>

                  {/* Availability */}
                  <Badge className="absolute right-4 top-4 gap-1.5 rounded-full border-0 bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-500">
                    <span className="size-2 rounded-full bg-white" />
                    Available
                  </Badge>
                </div>

                {/* Equipment Information */}
                <div className="space-y-3.5 p-5 sm:p-6">
                  <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-[#D58B65] dark:group-hover:text-[#A6532E]">
                    {equipment.name}
                  </h3>

                  {/* Category */}
                  <Badge
                    variant="outline"
                    className="h-8 gap-2 border-[#A6532E]/30 bg-[#A6532E]/10 px-3 text-sm font-normal text-[#D8B99F] dark:text-[#806650]"
                  >
                    <span>📁</span>
                    {equipment.category}
                  </Badge>

                  {/* Rating */}
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{equipment.rating}</span>
                    <span className="text-[#B9A99A] dark:text-[#806650]">
                      ({equipment.reviews} reviews)
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-[#B9A99A] dark:text-[#806650]">
                    <MapPin className="size-4 text-[#D58B65] dark:text-[#A6532E]" />
                    <span>{equipment.location}</span>
                  </div>

                  {/* Price and Details */}
                  <div className="border-t border-[#4B382B] pt-4 dark:border-[#E9D9C9]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xl font-bold text-[#D58B65] dark:text-[#A6532E]">
                        ৳{equipment.price.toLocaleString("en-BD")}
                        <span className="ml-1 text-sm font-medium text-[#B9A99A] dark:text-[#806650]">
                          / daily
                        </span>
                      </p>

                      <Button
                        onClick={() => handleViewDetails(equipment.id)}
                        disabled={isPending}
                        className="shrink-0 gap-1.5 rounded-xl bg-[#4B382B] px-5 text-white shadow-sm hover:bg-[#634936] dark:bg-[#4B382B] dark:hover:bg-[#634936]"
                      >
                        View Details
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
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

export default FeaturedEquipment;
