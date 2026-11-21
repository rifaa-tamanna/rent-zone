"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  CalendarCheck,
  Package,
  Clock,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
  User,
  Phone,
  Mail,
} from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

interface OwnerRentalRecord {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentImage?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  rentalDuration: string;
  requiredQuantity: number;
  totalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  createdAt: string;
}

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

export default function DashboardOwnerMyRentalsPage() {
  const [rentals, setRentals] = useState<OwnerRentalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRentals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await apiFetch<{
        success: boolean;
        rentals: OwnerRentalRecord[];
      }>("/api/bookings/owner/rentals");

      setRentals(result.rentals || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rented equipment records.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Owner Dashboard"
        description="Monitor all customer orders, rental periods, and payments for your listed machinery and equipment."
      />

      <Card className="overflow-hidden border-border bg-card shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">My Equipment Rental Orders</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Rental bookings received from verified customers across the platform.
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

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
            <p className="text-sm text-muted-foreground">Loading rental orders...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertCircle className="size-6" />
            </div>
            <h3 className="font-bold text-foreground">Could not load rental orders</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchRentals} className="mt-4 rounded-xl">
              Retry
            </Button>
          </div>
        ) : rentals.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#A6532E]/10 text-[#A6532E]">
              <CalendarCheck className="size-7" />
            </div>
            <h3 className="text-base font-bold text-foreground">No customer rentals yet</h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              When customers book your equipment items, their orders, contact information, and payments will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Customer Information</th>
                  <th className="px-5 py-3.5">Equipment Information</th>
                  <th className="px-5 py-3.5">Rental Duration</th>
                  <th className="px-5 py-3.5">Required Quantity</th>
                  <th className="px-5 py-3.5">Booking Amount</th>
                  <th className="px-5 py-3.5">Payment Status</th>
                  <th className="px-5 py-3.5">Booking Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rentals.map((rental) => (
                  <tr key={rental._id} className="transition-colors hover:bg-muted/30">
                    {/* Customer Information */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-foreground">{rental.customerName || "Customer"}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{rental.customerEmail}</p>
                        {rental.customerPhone && (
                          <p className="text-xs text-muted-foreground">{rental.customerPhone}</p>
                        )}
                      </div>
                    </td>

                    {/* Equipment Information */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        {rental.equipmentImage && (
                          <img
                            src={rental.equipmentImage}
                            alt={rental.equipmentName}
                            className="size-10 rounded-lg object-cover"
                          />
                        )}
                        <Link
                          href={`/equipment/${rental.equipmentId}`}
                          className="font-semibold text-foreground hover:text-[#A6532E] hover:underline"
                        >
                          {rental.equipmentName}
                        </Link>
                      </div>
                    </td>

                    {/* Rental Duration */}
                    <td className="px-5 py-4 text-xs font-medium text-foreground">
                      {rental.rentalDuration || "Custom"}
                    </td>

                    {/* Required Quantity */}
                    <td className="px-5 py-4 font-semibold text-foreground">
                      {rental.requiredQuantity || 1} unit(s)
                    </td>

                    {/* Booking Amount */}
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
