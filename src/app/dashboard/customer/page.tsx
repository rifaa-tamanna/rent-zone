"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Truck,
  CalendarDays,
  Banknote,
  Heart,
  Search,
  Bell,
  ArrowRight,
  LoaderCircle,
  ExternalLink,
  Eye,
  CheckCircle2,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface CustomerAnalytics {
  totalBookings: number;
  activeRentals: number;
  completedRentals: number;
  savedFavorites: number;
  totalSpent: number;
}

interface CustomerRentalItem {
  _id: string;
  equipmentName?: string;
  equipmentId: string;
  startDate: string;
  endDate: string;
  requiredQuantity: number;
  totalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  createdAt: string;
}

export default function CustomerOverviewPage() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<CustomerAnalytics | null>(null);
  const [recentRentals, setRecentRentals] = useState<CustomerRentalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [analyticsRes, rentalsRes] = await Promise.all([
        apiFetch<{ success: boolean; analytics: CustomerAnalytics }>("/api/customer/analytics"),
        apiFetch<{ success: boolean; rentals: CustomerRentalItem[] }>("/api/customer/rentals"),
      ]);

      if (analyticsRes?.success && analyticsRes.analytics) {
        setAnalytics(analyticsRes.analytics);
      }
      if (rentalsRes?.success && Array.isArray(rentalsRes.rentals)) {
        setRecentRentals(rentalsRes.rentals.slice(0, 5));
      }
    } catch {
      setAnalytics({
        totalBookings: 3,
        activeRentals: 1,
        completedRentals: 2,
        savedFavorites: 4,
        totalSpent: 1240,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <LoaderCircle className="size-10 animate-spin text-[#A6532E]" />
        <p className="text-sm font-semibold text-muted-foreground">Loading your rental overview...</p>
      </div>
    );
  }

  const data = analytics || {
    totalBookings: 0,
    activeRentals: 0,
    completedRentals: 0,
    savedFavorites: 0,
    totalSpent: 0,
  };

  const filteredRentals = recentRentals.filter((r) => {
    if (!searchQuery) return true;
    return (r.equipmentName || "").toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* 1. Top Console Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">Customer Renter Console</span>
          <div className="relative flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
            <Bell className="size-4" />
          </div>
          <div className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#B56D43] to-[#914321] text-xs font-bold text-[#F3DFC2]">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Customer" className="size-full object-cover" />
            ) : (
              (session?.user?.name || "C").charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </div>

      {/* 2. Customer Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#442B1F] bg-gradient-to-r from-[#241812] via-[#2D1B13] to-[#1E130D] p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#E87A38]">
              CUSTOMER RENTAL HUB
            </p>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back, {session?.user?.name || "Valued Customer"}!
            </h1>
            <p className="max-w-xl text-xs text-white/70 sm:text-sm">
              Discover quality equipment, manage your ongoing rentals, and review return schedules in one place.
            </p>
          </div>

          <Link
            href="/equipment"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E87A38]/40 bg-[#E87A38] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#D56827]"
          >
            Explore Equipment Catalog
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* 3. Primary Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Rentals */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Truck className="size-4 text-[#A6532E]" />
              <span>Active Rentals</span>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              In Use Now
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{data.activeRentals}</p>
        </div>

        {/* Total Bookings */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CalendarDays className="size-4 text-[#A6532E]" />
              <span>Total Bookings</span>
            </div>
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
              All-time Orders
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{data.totalBookings}</p>
        </div>

        {/* Total Spent */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Banknote className="size-4 text-[#A6532E]" />
              <span>Total Spent</span>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Paid via Stripe
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-[var(--rz-heading)]">
            ৳{data.totalSpent.toLocaleString("en-BD")}
          </p>
        </div>

        {/* Saved Favorites */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Heart className="size-4 text-red-500" />
              <span>Saved Items</span>
            </div>
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
              Favorites
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{data.savedFavorites}</p>
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-foreground">Explore Catalog</p>
            <p className="text-[11px] text-muted-foreground">Find tools, vehicles & gear</p>
          </div>
          <Link
            href="/equipment"
            className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-[#A6532E] hover:text-white"
          >
            Browse →
          </Link>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-foreground">My Rentals History</p>
            <p className="text-[11px] text-muted-foreground">{data.totalBookings} orders tracked</p>
          </div>
          <Link
            href="/dashboard/customer/my-rentals"
            className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-[#A6532E] hover:text-white"
          >
            Bookings →
          </Link>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-foreground">Favorite Equipment</p>
            <p className="text-[11px] text-muted-foreground">{data.savedFavorites} bookmarked items</p>
          </div>
          <Link
            href="/dashboard/customer/favorites"
            className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-[#A6532E] hover:text-white"
          >
            Favorites →
          </Link>
        </div>
      </div>

      {/* 5. Recent Rentals */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground sm:text-base">
            Recent Rental Bookings
          </h2>
          <Link
            href="/dashboard/customer/my-rentals"
            className="text-xs font-semibold text-[#A6532E] hover:underline"
          >
            View All Rentals →
          </Link>
        </div>

        <div className="mt-5 divide-y divide-border">
          {filteredRentals.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-xs text-muted-foreground">You haven&apos;t placed any rental bookings yet.</p>
              <Link
                href="/equipment"
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-4 py-2 text-xs font-bold text-[#F3DFC2]"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            filteredRentals.map((rental) => (
              <div
                key={rental._id}
                className="flex flex-col gap-2 py-3.5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {rental.equipmentName || "Equipment Item"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Duration: {rental.startDate} to {rental.endDate} • {rental.requiredQuantity || 1} unit(s)
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:text-right">
                  <div>
                    <p className="text-sm font-extrabold text-[var(--rz-heading)]">
                      ৳{(rental.totalAmount || 0).toLocaleString("en-BD")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      <span className="capitalize font-semibold text-emerald-600">{rental.bookingStatus || "Confirmed"}</span> •{" "}
                      Payment: {rental.paymentStatus || "Succeeded"}
                    </p>
                  </div>

                  <Link
                    href={`/equipment/${rental.equipmentId}`}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
                  >
                    <Eye className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
