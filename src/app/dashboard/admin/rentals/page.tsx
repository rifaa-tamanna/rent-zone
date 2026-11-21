"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  CalendarDays,
  Truck,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
  Search,
} from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

interface AdminRentalRecord {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  customerName: string;
  customerEmail: string;
  ownerName: string;
  ownerEmail?: string;
  rentalDuration: string;
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

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<AdminRentalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRentals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await apiFetch<{
        success: boolean;
        rentals: AdminRentalRecord[];
      }>("/api/admin/rentals");

      setRentals(result.rentals || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rental transactions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const filteredRentals = rentals.filter((r) => {
    const s = (searchTerm || "").trim().toLowerCase();
    if (!s) return true;
    const equipName = (r.equipmentName || "").toLowerCase();
    const custName = (r.customerName || "").toLowerCase();
    const ownName = (r.ownerName || "").toLowerCase();
    const custEmail = (r.customerEmail || "").toLowerCase();
    return (
      equipName.includes(s) ||
      custName.includes(s) ||
      ownName.includes(s) ||
      custEmail.includes(s)
    );
  });

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Admin Dashboard"
        description="Monitor and manage all equipment rental contracts, customer payments, and order statuses."
      />

      <Card className="overflow-hidden border-border bg-card shadow-sm">
        {/* Controls */}
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">All Rental Bookings</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Total {rentals.length} bookings executed across the marketplace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search rentals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-4 text-xs text-foreground outline-none focus:border-[#A6532E] sm:w-60"
              />
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
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
            <p className="text-sm text-muted-foreground">Loading platform bookings...</p>
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
        ) : filteredRentals.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">No rental records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Customer Information</th>
                  <th className="px-5 py-3.5">Owner Information</th>
                  <th className="px-5 py-3.5">Equipment Name</th>
                  <th className="px-5 py-3.5">Rental Duration</th>
                  <th className="px-5 py-3.5">Booking Amount</th>
                  <th className="px-5 py-3.5">Payment Status</th>
                  <th className="px-5 py-3.5">Booking Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRentals.map((rental) => (
                  <tr key={rental._id} className="transition-colors hover:bg-muted/30">
                    {/* Customer */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-foreground">{rental.customerName || "Customer"}</p>
                      <p className="text-xs text-muted-foreground">{rental.customerEmail}</p>
                    </td>

                    {/* Owner */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-foreground">{rental.ownerName || "Merchant"}</p>
                      {rental.ownerEmail && (
                        <p className="text-xs text-muted-foreground">{rental.ownerEmail}</p>
                      )}
                    </td>

                    {/* Equipment Name */}
                    <td className="px-5 py-4 font-semibold text-foreground">
                      <Link
                        href={`/equipment/${rental.equipmentId}`}
                        className="hover:text-[#A6532E] hover:underline"
                      >
                        {rental.equipmentName}
                      </Link>
                    </td>

                    {/* Rental Duration */}
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {rental.rentalDuration}
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
