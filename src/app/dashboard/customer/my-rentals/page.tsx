"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  CalendarDays,
  Package,
  Clock,
  LoaderCircle,
  AlertCircle,
  Truck,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import type { RentalBooking } from "@/types/booking";

const paymentStatusStyles: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  unpaid: "bg-red-500/10 text-red-600 border-red-500/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const bookingStatusStyles: Record<string, string> = {
  confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

export default function CustomerMyRentalsPage() {
  const [rentals, setRentals] = useState<RentalBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRentals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await apiFetch<{ success: boolean; rentals: RentalBooking[] }>(
        "/api/customer/rentals",
      );

      setRentals(result.rentals || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rental bookings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer Dashboard"
        description="View and track all your equipment rental bookings, rental periods, and payment receipts."
      />

      <Card className="overflow-hidden border-border bg-card shadow-sm">
        {/* Table Title Bar */}
        <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">My Rentals</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              A comprehensive record of your past and active equipment bookings.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchRentals}
            disabled={isLoading}
            className="gap-1.5 rounded-xl border-border"
          >
            <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
            <p className="text-sm text-muted-foreground">Loading your rentals...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertCircle className="size-6" />
            </div>
            <h3 className="font-bold text-foreground">Could not load bookings</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchRentals} className="mt-4 rounded-xl">
              Retry
            </Button>
          </div>
        ) : rentals.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#A6532E]/10 text-[#A6532E]">
              <Truck className="size-7" />
            </div>
            <h3 className="text-base font-bold text-foreground">No rental bookings yet</h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              When you reserve equipment from our catalog, your bookings and live status updates will appear here.
            </p>
            <Link
              href="/equipment"
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-4 py-2 font-bold text-[#F3DFC2]"
            >
              Browse Equipment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Equipment Name</th>
                  <th className="px-5 py-3.5">Rental Start</th>
                  <th className="px-5 py-3.5">Rental End</th>
                  <th className="px-5 py-3.5">Booking Date</th>
                  <th className="px-5 py-3.5">Total Amount</th>
                  <th className="px-5 py-3.5">Payment</th>
                  <th className="px-5 py-3.5">Booking Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rentals.map((rental) => (
                  <tr key={rental._id} className="transition-colors hover:bg-muted/30">
                    {/* Equipment Name */}
                    <td className="px-5 py-4 font-semibold text-foreground">
                      <Link
                        href={`/equipment/${rental.equipmentId}`}
                        className="hover:text-[#A6532E] hover:underline"
                      >
                        {rental.equipmentName}
                      </Link>
                    </td>

                    {/* Start Date */}
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {formatDate(rental.startDate)}
                    </td>

                    {/* End Date */}
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {formatDate(rental.endDate)}
                    </td>

                    {/* Booking Date */}
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {formatDate(rental.createdAt)}
                    </td>

                    {/* Total Amount */}
                    <td className="px-5 py-4 font-bold text-[var(--rz-heading)]">
                      ৳{Number(rental.totalAmount || 0).toLocaleString("en-BD")}
                    </td>

                    {/* Payment Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${
                          paymentStatusStyles[rental.paymentStatus] || "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {rental.paymentStatus || "paid"}
                      </span>
                    </td>

                    {/* Booking Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${
                          bookingStatusStyles[rental.bookingStatus] || "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {rental.bookingStatus || "confirmed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
