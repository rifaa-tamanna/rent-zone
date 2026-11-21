"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  ArrowRight,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  BadgeAlert,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EquipmentItem } from "@/types/equipment";

const CATEGORIES = [
  "All",
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
];

const RENTAL_TYPES = ["All", "Daily", "Weekly", "Monthly"];

const SORT_OPTIONS = [
  { value: "newest", label: "Recently Added" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function AllEquipmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const shouldReduceMotion = useReducedMotion();

  // Search, Filter & Sort states
  const initialCategory = searchParams.get("category") || "All";
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [locationTerm, setLocationTerm] = useState(searchParams.get("location") || "");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRentalType, setSelectedRentalType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Data states
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fallback initial items for demonstration if DB is empty
  const fallbackItems: EquipmentItem[] = [
    {
      _id: "demo-1",
      name: "CAT Mini Excavator 301.7",
      description: "Compact hydraulic excavator designed for tough construction jobs and tight spaces.",
      category: "Construction Equipment",
      location: "Dhaka, Bangladesh",
      rentalTypes: ["daily", "weekly"],
      rentalPrice: { daily: 85, weekly: 520 },
      availableQuantity: 4,
      condition: "Like New",
      brand: "Caterpillar",
      model: "301.7 CR",
      image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=800&q=80",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "demo-2",
      name: "Sony Alpha A7 IV Kit",
      description: "Full-frame mirrorless camera paired with 24-70mm f/2.8 GM lens for pro shoot.",
      category: "Photography Equipment",
      location: "Chattogram, Bangladesh",
      rentalTypes: ["daily"],
      rentalPrice: { daily: 45 },
      availableQuantity: 6,
      condition: "New",
      brand: "Sony",
      model: "ILCE-7M4",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "demo-3",
      name: "Toyota Hilux 4x4 Double Cab",
      description: "Heavy-duty pickup truck ready for off-road site delivery and field surveys.",
      category: "Vehicles & Transportation",
      location: "Sylhet, Bangladesh",
      rentalTypes: ["daily", "weekly", "monthly"],
      rentalPrice: { daily: 95, weekly: 580, monthly: 2100 },
      availableQuantity: 3,
      condition: "Good",
      brand: "Toyota",
      model: "Hilux Revo",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "demo-4",
      name: "Kubota High-Power Tractor",
      description: "Efficient agricultural tractor with multi-terrain wheels and plough attachment.",
      category: "Agriculture Equipment",
      location: "Rajshahi, Bangladesh",
      rentalTypes: ["daily", "weekly"],
      rentalPrice: { daily: 120, weekly: 720 },
      availableQuantity: 2,
      condition: "Good",
      brand: "Kubota",
      model: "MU4501",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "demo-5",
      name: "JBL Professional Line Array Set",
      description: "Complete audio stage speaker system with digital mixer and dual wireless mics.",
      category: "Event Equipment",
      location: "Dhaka, Bangladesh",
      rentalTypes: ["daily"],
      rentalPrice: { daily: 180 },
      availableQuantity: 5,
      condition: "Like New",
      brand: "JBL",
      model: "SRX900",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "demo-6",
      name: "Apple MacBook Pro M3 Max Workstation",
      description: "High-spec 16-inch editing studio powerhouse with 64GB RAM and 4K external display.",
      category: "Electronics",
      location: "Dhaka, Bangladesh",
      rentalTypes: ["daily", "weekly"],
      rentalPrice: { daily: 55, weekly: 320 },
      availableQuantity: 8,
      condition: "New",
      brand: "Apple",
      model: "MacBook Pro 16",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
  ];

  // Fetch equipment from backend API with server-side filters & sorting
  const fetchEquipment = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();

      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (locationTerm.trim()) params.set("location", locationTerm.trim());
      if (selectedCategory && selectedCategory !== "All") params.set("category", selectedCategory);
      if (selectedRentalType && selectedRentalType !== "All") params.set("rentalType", selectedRentalType.toLowerCase());
      if (minPrice.trim()) params.set("minPrice", minPrice.trim());
      if (maxPrice.trim()) params.set("maxPrice", maxPrice.trim());
      if (sortBy) params.set("sort", sortBy);
      params.set("page", String(page));
      params.set("limit", "9");

      const data = await apiFetch<{
        success: boolean;
        equipment: EquipmentItem[];
        pagination?: { total: number; totalPages: number };
      }>(`/api/equipment?${params.toString()}`);

      if (data?.success && Array.isArray(data.equipment)) {
        setEquipmentList(data.equipment);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total ?? data.equipment.length);
      } else {
        setEquipmentList([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    } catch {
      // In development fallback if backend is offline
      setEquipmentList(fallbackItems);
      setTotalPages(1);
      setTotalCount(fallbackItems.length);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, locationTerm, selectedCategory, selectedRentalType, minPrice, maxPrice, sortBy, page]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setLocationTerm("");
    setSelectedCategory("All");
    setSelectedRentalType("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
    setPage(1);
  };

  const handleViewDetails = (id: string) => {
    if (!session?.user) {
      router.push("/signin");
      return;
    }
    router.push(`/equipment/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner Header */}
      <section className="relative overflow-hidden border-b border-border bg-[#211A15] py-12 text-[#F3DFC2] dark:bg-[#1A1410] md:py-16">
        <div className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-[#A6532E]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-[#A6532E]/15 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-[5%]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(243,223,194,0.25)] bg-[rgba(243,223,194,0.08)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#D58B65]">
              <Package className="size-3.5" />
              Verified Fleet
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Explore All <span className="text-[#D58B65]">Equipment</span>
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[#C8B9AA] sm:text-base">
              Browse top-quality industrial machinery, modern tools, vehicles, and electronics with transparent pricing and flexible rental terms.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <div className="mx-auto max-w-[1440px] px-[5%] py-8 md:py-12">
        {/* Top Control Bar: Search & Sort */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-5">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search equipment by name, brand, or model..."
              className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-[#A6532E] focus:ring-2 focus:ring-[#A6532E]/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Location quick filter */}
            <div className="relative min-w-[160px] flex-1 sm:flex-initial">
              <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={locationTerm}
                onChange={(e) => {
                  setLocationTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Location..."
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-[#A6532E] focus:ring-2 focus:ring-[#A6532E]/20"
              />
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-semibold text-muted-foreground sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="h-11 rounded-xl border border-input bg-background px-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-[#A6532E]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold text-foreground lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar + 3-Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden space-y-6 lg:block">
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-[#A6532E]" />
                  <h3 className="font-bold text-foreground">Filters</h3>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-[#A6532E]"
                >
                  <RotateCcw className="size-3" />
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mt-5 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Category
                </label>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setPage(1);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${
                        selectedCategory === cat
                          ? "bg-[#A6532E]/10 text-[#A6532E] font-bold"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <CheckCircle2 className="size-3.5 text-[#A6532E]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rental Type Filter */}
              <div className="mt-6 border-t border-border pt-5 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Rental Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {RENTAL_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedRentalType(type);
                        setPage(1);
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        selectedRentalType === type
                          ? "border-[#A6532E] bg-[#A6532E]/10 text-[#A6532E]"
                          : "border-border bg-background text-muted-foreground hover:border-[#A6532E]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mt-6 border-t border-border pt-5 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price Range ($)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-[#A6532E]"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-[#A6532E]"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Equipment Grid Area */}
          <div>
            {/* Active filters summary */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <div>
                Showing <span className="font-bold text-foreground">{equipmentList.length}</span> of{" "}
                <span className="font-bold text-foreground">{totalCount}</span> available equipment
              </div>

              {(selectedCategory !== "All" || selectedRentalType !== "All" || searchTerm || minPrice || maxPrice) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-semibold text-[#A6532E] hover:underline"
                >
                  Clear all active filters
                </button>
              )}
            </div>

            {/* 3-Column Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse overflow-hidden rounded-2xl border-border p-0">
                    <div className="aspect-[16/10] bg-muted" />
                    <div className="space-y-3 p-5">
                      <div className="h-5 w-3/4 rounded bg-muted" />
                      <div className="h-4 w-1/2 rounded bg-muted" />
                      <div className="h-8 w-full rounded bg-muted pt-4" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : equipmentList.length === 0 ? (
              <Card className="flex flex-col items-center justify-center rounded-2xl border-dashed border-border py-20 text-center shadow-none">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#A6532E]/10 text-[#A6532E]">
                  <BadgeAlert className="size-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No equipment matched your filters</h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Try adjusting your search keyword, category, or price range to find available equipment.
                </p>
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  className="mt-5 border-[#A6532E] text-[#A6532E] hover:bg-[#A6532E]/10"
                >
                  Reset All Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {equipmentList.map((item) => {
                  const dailyPrice = item.rentalPrice?.daily || item.rentalPrice?.weekly || item.rentalPrice?.monthly || 0;
                  const isAvailable = (item.availableQuantity || 0) > 0;

                  return (
                    <motion.div
                      key={item._id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="group flex flex-col"
                    >
                      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card p-0 text-card-foreground shadow-sm transition-all duration-300 hover:border-[#A6532E]/50 hover:shadow-lg">
                        {/* Equipment Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Availability Badge */}
                          <Badge
                            className={`absolute right-3 top-3 border-0 px-2.5 py-1 text-[11px] font-bold shadow-md ${
                              isAvailable
                                ? "bg-emerald-600 text-white"
                                : "bg-red-600 text-white"
                            }`}
                          >
                            {isAvailable ? "Available" : "Booked"}
                          </Badge>

                          {/* Rental Type Badge */}
                          <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-[#F3DFC2] backdrop-blur-sm">
                            {item.rentalTypes?.map((t) => t.toUpperCase()).join(" · ") || "DAILY"}
                          </span>
                        </div>

                        {/* Card Details */}
                        <div className="flex flex-1 flex-col p-5">
                          {/* Category Tag */}
                          <p className="text-xs font-bold uppercase tracking-wider text-[#A6532E]">
                            {item.category}
                          </p>

                          <h3 className="mt-1 line-clamp-1 text-base font-bold text-foreground transition-colors group-hover:text-[#A6532E]">
                            {item.name}
                          </h3>

                          {/* Location */}
                          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="size-3.5 shrink-0 text-[#A6532E]" />
                            <span className="truncate">{item.location}</span>
                          </p>

                          {/* Price & Action */}
                          <div className="mt-auto border-t border-border pt-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <span className="text-lg font-extrabold text-[var(--rz-heading)]">
                                  ৳{dailyPrice.toLocaleString("en-BD")}
                                </span>
                                <span className="text-xs text-muted-foreground"> / daily</span>
                              </div>

                              <Button
                                onClick={() => handleViewDetails(item._id)}
                                size="sm"
                                className="group/btn gap-1.5 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-3.5 font-bold text-[#F3DFC2] shadow-sm transition-all hover:bg-[image:var(--rz-btn-gradient-hover)]"
                              >
                                View Details
                                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2 border-t border-border pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="gap-1 rounded-xl"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPage(idx + 1)}
                    className={`size-9 rounded-xl text-xs font-bold transition-colors ${
                      page === idx + 1
                        ? "bg-[#A6532E] text-white"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="gap-1 rounded-xl"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
