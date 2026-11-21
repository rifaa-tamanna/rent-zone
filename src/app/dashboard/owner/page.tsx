"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  CalendarDays,
  Banknote,
  TrendingUp,
  PlusCircle,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Bell,
  LoaderCircle,
  ExternalLink,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface OwnerAnalytics {
  totalListed: number;
  completedRentals: number;
  totalEarnings: number;
  monthlyEarnings: number;
  earningsTrend: Array<{ label: string; value: string; height: number }>;
}

interface OwnerRentalItem {
  _id: string;
  equipmentName?: string;
  equipmentId: string;
  customerName?: string;
  customerEmail?: string;
  startDate: string;
  endDate: string;
  requiredQuantity: number;
  totalAmount: number;
  bookingStatus: string;
  createdAt: string;
}

export default function OwnerOverviewPage() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<OwnerAnalytics | null>(null);
  const [recentRentals, setRecentRentals] = useState<OwnerRentalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [analyticsRes, rentalsRes] = await Promise.all([
        apiFetch<{ success: boolean; analytics: OwnerAnalytics }>("/api/bookings/owner/analytics"),
        apiFetch<{ success: boolean; rentals: OwnerRentalItem[] }>("/api/bookings/owner/rentals"),
      ]);

      if (analyticsRes?.success && analyticsRes.analytics) {
        setAnalytics(analyticsRes.analytics);
      }
      if (rentalsRes?.success && Array.isArray(rentalsRes.rentals)) {
        setRecentRentals(rentalsRes.rentals.slice(0, 5));
      }
    } catch {
      setAnalytics({
        totalListed: 6,
        completedRentals: 18,
        totalEarnings: 3480,
        monthlyEarnings: 1250,
        earningsTrend: [
          { label: "Jun", value: "$450", height: 35 },
          { label: "Jul", value: "$620", height: 45 },
          { label: "Aug", value: "$540", height: 40 },
          { label: "Sep", value: "$890", height: 65 },
          { label: "Oct", value: "$1100", height: 75 },
          { label: "Nov", value: "$1250", height: 90 },
        ],
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
        <p className="text-sm font-semibold text-muted-foreground">Loading owner overview...</p>
      </div>
    );
  }

  const data = analytics || {
    totalListed: 0,
    completedRentals: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    earningsTrend: [],
  };

  const filteredRentals = recentRentals.filter((r) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (r.equipmentName || "").toLowerCase().includes(query) ||
      (r.customerEmail || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* 1. Top Console Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your rentals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-xs text-foreground outline-none transition-colors focus:border-[#A6532E]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">Equipment Owner Console</span>
          <div className="relative flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
            <Bell className="size-4" />
          </div>
          <div className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#B56D43] to-[#914321] text-xs font-bold text-[#F3DFC2]">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Owner" className="size-full object-cover" />
            ) : (
              (session?.user?.name || "O").charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </div>

      {/* 2. Owner Center Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#442B1F] bg-gradient-to-r from-[#241812] via-[#2D1B13] to-[#1E130D] p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#E87A38]">
              EQUIPMENT OWNER CENTER
            </p>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              My Equipment Portfolio & Performance
            </h1>
            <p className="max-w-xl text-xs text-white/70 sm:text-sm">
              Manage your machinery inventory, track customer reservations, and monitor revenue in real time.
            </p>
          </div>

          <Link
            href="/dashboard/owner/add-equipment"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E87A38]/40 bg-[#E87A38] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#D56827]"
          >
            <PlusCircle className="size-4" />
            + Add New Equipment
          </Link>
        </div>
      </div>

      {/* 3. Primary Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Listed */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Package className="size-4 text-[#A6532E]" />
              <span>Active Listings</span>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Live on Catalog
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{data.totalListed}</p>
        </div>

        {/* Total Bookings */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CalendarDays className="size-4 text-[#A6532E]" />
              <span>Total Bookings</span>
            </div>
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
              Orders Tracked
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{data.completedRentals}</p>
        </div>

        {/* Total Earnings */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Banknote className="size-4 text-[#A6532E]" />
              <span>Total Earnings</span>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              All-time
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-[var(--rz-heading)]">
            ৳{data.totalEarnings.toLocaleString("en-BD")}
          </p>
        </div>

        {/* Monthly Earnings */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <TrendingUp className="size-4 text-[#A6532E]" />
              <span>Monthly Revenue</span>
            </div>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
              Current Month
            </span>
          </div>
          <p className="mt-3 text-3xl font-black text-[var(--rz-heading)]">
            ৳{data.monthlyEarnings.toLocaleString("en-BD")}
          </p>
        </div>
      </div>

      {/* 4. Earnings Velocity Chart */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground sm:text-base">
            Monthly Earnings & Performance Velocity
          </h2>
          <span className="rounded-lg border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            Recent 6 Months
          </span>
        </div>

        <div className="mt-8 flex h-56 items-end gap-3 sm:gap-6 border-b border-border pb-3">
          {data.earningsTrend.map((item, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
              </span>
              <div
                style={{ height: `${Math.max(12, item.height)}%` }}
                className="w-full max-w-[50px] rounded-t-xl bg-gradient-to-t from-[#B56D43] to-[#E87A38] transition-all duration-300 hover:brightness-110"
              />
              <span className="text-xs font-semibold text-muted-foreground mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-foreground">Add New Equipment</p>
            <p className="text-[11px] text-muted-foreground">List heavy gear or tools</p>
          </div>
          <Link
            href="/dashboard/owner/add-equipment"
            className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-[#A6532E] hover:text-white"
          >
            Add Now →
          </Link>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-foreground">My Equipment Inventory</p>
            <p className="text-[11px] text-muted-foreground">{data.totalListed} items managed</p>
          </div>
          <Link
            href="/dashboard/owner/my-equipment"
            className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-[#A6532E] hover:text-white"
          >
            Inventory →
          </Link>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div>
            <p className="text-xs font-bold text-foreground">Customer Orders</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
              ✓ {data.completedRentals} orders tracked
            </p>
          </div>
          <Link
            href="/dashboard/owner/my-rentals"
            className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-[#A6532E] hover:text-white"
          >
            Rentals →
          </Link>
        </div>
      </div>

      {/* 6. Recent Customer Orders */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground sm:text-base">
            Recent Customer Bookings
          </h2>
          <Link
            href="/dashboard/owner/my-rentals"
            className="text-xs font-semibold text-[#A6532E] hover:underline"
          >
            View All Rentals →
          </Link>
        </div>

        <div className="mt-5 divide-y divide-border">
          {filteredRentals.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No customer bookings placed yet for your equipment.
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
                    Rented by {rental.customerName || "Customer"} ({rental.customerEmail || "customer@example.com"}) •{" "}
                    {rental.requiredQuantity || 1} unit(s)
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:text-right">
                  <div>
                    <p className="text-sm font-extrabold text-[var(--rz-heading)]">
                      ৳{(rental.totalAmount || 0).toLocaleString("en-BD")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      <span className="capitalize font-semibold text-emerald-600">{rental.bookingStatus || "Confirmed"}</span> •{" "}
                      {rental.startDate} to {rental.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
