"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Heart,
  Calendar,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  User,
  Mail,
  LoaderCircle,
  BadgeAlert,
  Share2,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EquipmentDetail } from "@/types/equipment";

export default function EquipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();

  const [equipment, setEquipment] = useState<EquipmentDetail | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Booking Form States (Synced between Sidebar & Dialog)
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const later = new Date();
    later.setDate(later.getDate() + 2);
    return later.toISOString().split("T")[0];
  });
  const [rentalType, setRentalType] = useState("daily");
  const [requiredQuantity, setRequiredQuantity] = useState(1);
  const [contactNumber, setContactNumber] = useState("+880 1700 000000");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Fallback demo data if fresh MongoDB
  const fallbackDetail: EquipmentDetail = {
    _id: params.id,
    name: "Studio Light Set",
    description:
      "Professional studio light set with 3-point lighting system, softboxes and stands. Perfect for photography and video shoots.",
    category: "Event Equipment",
    location: "Dhaka, Bangladesh",
    rentalTypes: ["daily", "weekly"],
    rentalPrice: { daily: 60, weekly: 360, monthly: 1400 },
    availableQuantity: 2,
    condition: "Good",
    brand: "Godox",
    model: "SK400II 3-Light Kit",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=85",
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=1200&q=85",
    ],
    rentalTerms:
      "Handle with care. Any broken bulb will be charged at replacement cost.",
    ownerId: "owner-101",
    ownerName: "Nasrin Sultana",
    ownerEmail: "nasrin.sultana@rentalhub.com",
    status: "approved",
    createdAt: new Date().toISOString(),
  };

  // Private Route check
  useEffect(() => {
    if (!sessionPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, sessionPending, router]);

  // Fetch equipment item details
  const fetchEquipmentDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl.replace(/\/+$/, "")}/api/equipment/${params.id}`);
      const data = await res.json();

      if (data?.success && data?.equipment) {
        setEquipment(data.equipment);
        setActiveImage(data.equipment.image);
      } else {
        setEquipment(fallbackDetail);
        setActiveImage(fallbackDetail.image);
      }
    } catch {
      setEquipment(fallbackDetail);
      setActiveImage(fallbackDetail.image);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  // Check Favorite status
  const checkFavoriteStatus = useCallback(async () => {
    if (!session?.user) return;
    try {
      const data = await apiFetch<{ success: boolean; isFavorite: boolean }>(
        `/api/customer/favorites/check/${params.id}`,
      );
      if (data?.success) {
        setIsFavorite(data.isFavorite);
      }
    } catch {
      // ignore
    }
  }, [params.id, session]);

  useEffect(() => {
    fetchEquipmentDetails();
    checkFavoriteStatus();
  }, [fetchEquipmentDetails, checkFavoriteStatus]);

  // Favorite Toggle Handler
  const handleToggleFavorite = async () => {
    if (!session?.user) {
      router.push("/signin");
      return;
    }

    try {
      setFavoriteLoading(true);
      if (isFavorite) {
        await apiFetch(`/api/customer/favorites/${params.id}`, {
          method: "DELETE",
        });
        setIsFavorite(false);
        toast.success("Removed from your favorites.");
      } else {
        await apiFetch(`/api/customer/favorites/${params.id}`, {
          method: "POST",
        });
        setIsFavorite(true);
        toast.success("Saved to your favorites!");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update favorites.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Duration & Pricing Calculation
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.max(0, end.getTime() - start.getTime());
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const getDailyRate = () => {
    return equipment?.rentalPrice?.daily || 60;
  };

  const calculateTotal = () => {
    const totalDays = calculateDays();
    let unitPrice = getDailyRate();
    if (rentalType === "weekly" && equipment?.rentalPrice?.weekly) {
      unitPrice = equipment.rentalPrice.weekly / 7;
    } else if (rentalType === "monthly" && equipment?.rentalPrice?.monthly) {
      unitPrice = equipment.rentalPrice.monthly / 30;
    }

    return Math.round(unitPrice * totalDays * requiredQuantity);
  };

  // Booking Confirmation Handler
  const handleConfirmBooking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Please specify both start date and end date.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("Rental end date must be after start date.");
      return;
    }

    if (requiredQuantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    if ((equipment?.availableQuantity || 1) < requiredQuantity) {
      toast.error("Requested quantity exceeds available stock.");
      return;
    }

    try {
      setIsSubmittingBooking(true);
      const totalAmount = calculateTotal();

      const bookingPayload = {
        equipmentId: equipment?._id,
        startDate,
        endDate,
        rentalType,
        requiredQuantity,
        contactNumber,
        deliveryAddress: deliveryAddress || equipment?.location || "Customer Handover",
        additionalNotes,
        totalAmount,
      };

      const result = await apiFetch<{
        success: boolean;
        message: string;
        booking: { _id: string; transactionId: string };
      }>("/api/bookings/create-booking", {
        method: "POST",
        body: JSON.stringify(bookingPayload),
      });

      toast.success("Payment completed & Booking confirmed successfully!");
      setBookingModalOpen(false);

      // Redirect to payment success page
      router.push(
        `/payment/success?bookingId=${result.booking?._id || "confirmed"}&amount=${totalAmount}&item=${encodeURIComponent(equipment?.name || "Equipment")}`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to complete booking.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  if (sessionPending || isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <LoaderCircle className="size-10 animate-spin text-[#A6532E]" />
        <p className="text-sm font-semibold text-muted-foreground">Loading equipment details...</p>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center">
        <BadgeAlert className="mx-auto size-12 text-[#A6532E]" />
        <h2 className="mt-4 text-2xl font-bold">Equipment Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The equipment you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/equipment"
          className="mt-6 inline-flex items-center justify-center rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-5 py-2.5 font-bold text-[#F3DFC2]"
        >
          Browse All Equipment
        </Link>
      </div>
    );
  }

  const termsContent = equipment.rentalTerms
    ? Array.isArray(equipment.rentalTerms)
      ? equipment.rentalTerms.join(" ")
      : equipment.rentalTerms
    : "Handle with care. Any broken bulb or damaged accessories will be charged at standard replacement cost.";

  const allImages = equipment.images && equipment.images.length > 0 ? equipment.images : [equipment.image];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 pt-6 text-foreground dark:bg-[#191512]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Equipment</span>
          </Link>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              toast.success("Link copied to clipboard!");
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <Share2 className="size-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.55fr_1fr]">
          {/* ========================================================= */}
          {/* LEFT: PRODUCT DETAILS CONTAINER (EXACT MATCH TO DESIGN)    */}
          {/* ========================================================= */}
          <div className="space-y-6 rounded-3xl border border-[#EDE4DB] bg-white p-6 shadow-sm dark:border-[#382D26] dark:bg-[#1E1916] sm:p-8">
            {/* 1. Large Hero Image Viewport */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F0EBE5] dark:bg-[#251E19]">
              <img
                src={activeImage || equipment.image}
                alt={equipment.name}
                className="size-full object-cover transition-all duration-300"
              />

              {/* Favorite Action Button on Image */}
              <button
                type="button"
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
                aria-label="Save to favorites"
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/95 text-[#4B382B] shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95 dark:bg-[#221C18]/90 dark:text-[#E8956A]"
              >
                <Heart
                  className={`size-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-[#74351B] dark:text-[#E8956A]"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Row if Multiple Images */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      activeImage === img
                        ? "border-[#A6532E] ring-2 ring-[#A6532E]/30"
                        : "border-border/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`preview-${i}`} className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* 2. Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="rounded-full border border-[#A6532E]/25 bg-[#A6532E]/10 px-3 py-1 text-xs font-bold text-[#A6532E]">
                {equipment.category}
              </span>

              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Available ({equipment.availableQuantity} in stock)
              </span>

              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                Daily Rental
              </span>
            </div>

            {/* 3. Title & Location */}
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-[#74351B] dark:text-[#E8956A] sm:text-4xl">
                {equipment.name}
              </h1>

              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-[#A6532E]" />
                <span>{equipment.location}</span>
              </p>
            </div>

            {/* 4. Description Section */}
            <div className="border-t border-[#F0E6DC] pt-5 dark:border-[#382D26]">
              <h2 className="text-sm font-bold text-foreground">Description</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {equipment.description}
              </p>
            </div>

            {/* 5. Specifications Section */}
            <div className="border-t border-[#F0E6DC] pt-5 dark:border-[#382D26]">
              <h2 className="mb-3 text-sm font-bold text-foreground">Specifications</h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Brand */}
                <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-3.5 dark:border-[#382D26] dark:bg-[#251E19]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">BRAND</p>
                  <p className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                    {equipment.brand || "Godox"}
                  </p>
                </div>

                {/* Model */}
                <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-3.5 dark:border-[#382D26] dark:bg-[#251E19]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">MODEL</p>
                  <p className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                    {equipment.model || "SK400II 3-Light Kit"}
                  </p>
                </div>

                {/* Condition */}
                <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-3.5 dark:border-[#382D26] dark:bg-[#251E19]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">CONDITION</p>
                  <p className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                    {equipment.condition || "Good"}
                  </p>
                </div>

                {/* Available Stock */}
                <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-3.5 dark:border-[#382D26] dark:bg-[#251E19]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AVAILABLE STOCK</p>
                  <p className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                    {equipment.availableQuantity} units
                  </p>
                </div>

                {/* Rental Rate */}
                <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-3.5 dark:border-[#382D26] dark:bg-[#251E19]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">RENTAL RATE</p>
                  <p className="mt-1 text-xs font-bold text-[var(--rz-heading)] sm:text-sm">
                    ৳{getDailyRate()} / daily
                  </p>
                </div>

                {/* Rental Type */}
                <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-3.5 dark:border-[#382D26] dark:bg-[#251E19]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">RENTAL TYPE</p>
                  <p className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                    Daily
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Owner & Supplier Section */}
            <div className="border-t border-[#F0E6DC] pt-5 dark:border-[#382D26]">
              <h2 className="mb-3 text-sm font-bold text-foreground">Owner & Supplier</h2>

              <div className="flex items-center justify-between rounded-2xl border border-[#F0E6DC] bg-[#FAF6F0] p-4 dark:border-[#382D26] dark:bg-[#251E19]">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-[#A6532E] dark:bg-orange-950/40 dark:text-[#E8956A]">
                    <User className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground sm:text-sm">
                      {equipment.ownerName || "Nasrin Sultana"}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Mail className="size-3" />
                      <span>{equipment.ownerEmail || "nasrin.sultana@rentalhub.com"}</span>
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Verified Owner
                </span>
              </div>
            </div>

            {/* 7. Rental Terms & Conditions */}
            <div className="border-t border-[#F0E6DC] pt-5 dark:border-[#382D26]">
              <h2 className="mb-3 text-sm font-bold text-foreground">Rental Terms & Conditions</h2>
              <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-4 text-xs leading-relaxed text-muted-foreground dark:border-[#382D26] dark:bg-[#251E19] sm:text-sm">
                {termsContent}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: STICKY BOOKING CARD (MATCHING DESIGN & DIALOG FLOW) */}
          {/* ========================================================= */}
          <div className="space-y-4 rounded-3xl border border-[#EDE4DB] bg-white p-6 shadow-sm dark:border-[#382D26] dark:bg-[#1E1916] lg:sticky lg:top-24">
            {/* Price Header */}
            <div className="flex items-center justify-between border-b border-[#F0E6DC] pb-4 dark:border-[#382D26]">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#A6532E] dark:text-[#E8956A]">
                  ৳{getDailyRate()}
                </span>
                <span className="text-xs font-medium text-muted-foreground">/ daily</span>
              </div>

              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Instant Checkout
              </span>
            </div>

            {/* Inline Booking Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              setBookingModalOpen(true);
            }} className="space-y-3.5 pt-1">
              {/* Rental Start Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Rental Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[#EDE4DB] bg-[#FAF8F5] px-3 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E] dark:border-[#382D26] dark:bg-[#251E19]"
                />
              </div>

              {/* Rental End Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Rental End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[#EDE4DB] bg-[#FAF8F5] px-3 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E] dark:border-[#382D26] dark:bg-[#251E19]"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  Quantity (Max: {equipment.availableQuantity})
                </label>
                <input
                  type="number"
                  min="1"
                  max={equipment.availableQuantity || 1}
                  required
                  value={requiredQuantity}
                  onChange={(e) => setRequiredQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-10 w-full rounded-xl border border-[#EDE4DB] bg-[#FAF8F5] px-3 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E] dark:border-[#382D26] dark:bg-[#251E19]"
                />
              </div>

              {/* Contact Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1700 000000"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[#EDE4DB] bg-[#FAF8F5] px-3 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E] dark:border-[#382D26] dark:bg-[#251E19]"
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Delivery Address</label>
                <input
                  type="text"
                  placeholder="House/Plot, Road, Area, City"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[#EDE4DB] bg-[#FAF8F5] px-3 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E] dark:border-[#382D26] dark:bg-[#251E19]"
                />
              </div>

              {/* Special Instructions */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Special Instructions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Delivery instructions, operator needed, etc."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full rounded-xl border border-[#EDE4DB] bg-[#FAF8F5] p-3 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E] dark:border-[#382D26] dark:bg-[#251E19]"
                />
              </div>

              {/* Calculation Summary Box */}
              <div className="rounded-xl border border-[#F0E6DC] bg-[#FAF6F0] p-3.5 text-xs dark:border-[#382D26] dark:bg-[#251E19]">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    {calculateDays()} days × ৳{getDailyRate()}
                  </span>
                  <span className="font-semibold text-foreground">
                    ৳{calculateDays() * getDailyRate() * requiredQuantity}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-[#EDE4DB] pt-2 text-sm font-bold dark:border-[#382D26]">
                  <span className="text-foreground">Total Due</span>
                  <span className="text-base text-[var(--rz-heading)]">
                    ৳{calculateTotal().toLocaleString("en-BD")}
                  </span>
                </div>
              </div>

              {/* CTA Booking Button */}
              <Button
                type="submit"
                className="h-11 w-full gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] font-bold text-[#F3DFC2] shadow-sm transition-all hover:bg-[image:var(--rz-btn-gradient-hover)]"
              >
                <CreditCard className="size-4" />
                Book & Pay with Stripe
              </Button>
            </form>

            {/* Favorite Secondary Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleToggleFavorite}
              disabled={favoriteLoading}
              className="h-9 w-full gap-2 rounded-xl border-border text-xs"
            >
              <Heart className={`size-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              {isFavorite ? "Saved in Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DIALOG: SECURE STRIPE CHECKOUT CONFIRMATION (RETAINED AS IS) */}
      {/* ============================================================ */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Booking & Stripe Payment</DialogTitle>
            <DialogDescription>
              Review your rental period and delivery information to proceed with secure Stripe checkout.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmBooking} className="mt-3 space-y-4">
            {/* Equipment Banner */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
              <img src={equipment.image} alt={equipment.name} className="size-12 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{equipment.name}</p>
                <p className="text-xs text-muted-foreground">{equipment.location}</p>
              </div>
            </div>

            {/* Dates & Duration */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-muted/20 p-2.5">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Start Date</p>
                <p className="text-xs font-semibold text-foreground">{startDate}</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/20 p-2.5">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">End Date</p>
                <p className="text-xs font-semibold text-foreground">{endDate}</p>
              </div>
            </div>

            {/* Contact & Handover */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-semibold text-foreground">{requiredQuantity} Unit(s)</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground">Contact Phone:</span>
                <span className="font-semibold text-foreground">{contactNumber}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground">Delivery Address:</span>
                <span className="font-semibold text-foreground truncate max-w-[220px]">
                  {deliveryAddress || equipment.location}
                </span>
              </div>
              {additionalNotes && (
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-muted-foreground">Instructions:</span>
                  <span className="font-semibold text-foreground truncate max-w-[220px]">
                    {additionalNotes}
                  </span>
                </div>
              )}
            </div>

            {/* Final Amount */}
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Calculated Duration:</span>
                <span className="font-semibold text-foreground">{calculateDays()} Days</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-sm font-bold">
                <span>Total Payment:</span>
                <span className="text-base text-[var(--rz-heading)]">
                  ৳{calculateTotal().toLocaleString("en-BD")}
                </span>
              </div>
            </div>

            {/* Dialog Footer Actions */}
            <DialogFooter className="mt-5 flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmittingBooking}
                onClick={() => setBookingModalOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmittingBooking}
                className="gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] font-bold text-[#F3DFC2] shadow-sm hover:bg-[image:var(--rz-btn-gradient-hover)]"
              >
                {isSubmittingBooking ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="size-4" />
                    Pay with Stripe & Confirm
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
