"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Calendar, Package, Receipt, LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "RZ-CONFIRMED";
  const amount = searchParams.get("amount") || "0";
  const item = searchParams.get("item") || "Equipment Rental";

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Card className="overflow-hidden rounded-3xl border-border bg-card p-6 text-center shadow-xl sm:p-10">
          {/* Animated Success Badge */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="size-10" />
          </div>

          <span className="mt-5 inline-block rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Payment Succeeded
          </span>

          <h1 className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl">
            Booking Confirmed!
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Thank you! Your equipment rental has been scheduled and your payment was securely processed via Stripe.
          </p>

          {/* Receipt Info Box */}
          <div className="mt-8 space-y-3 rounded-2xl border border-border bg-muted/40 p-5 text-left text-xs">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-muted-foreground">Booking ID:</span>
              <span className="font-mono font-bold text-foreground truncate max-w-[180px]">{bookingId}</span>
            </div>

            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-muted-foreground">Item:</span>
              <span className="font-semibold text-foreground truncate max-w-[200px]">{item}</span>
            </div>

            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-semibold text-foreground">Stripe Payment Gateway</span>
            </div>

            <div className="flex items-center justify-between pt-1 text-sm font-bold">
              <span className="text-foreground">Total Paid:</span>
              <span className="text-base text-[var(--rz-heading)]">৳{Number(amount).toLocaleString("en-BD")}</span>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/customer/my-rentals"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-4 py-2.5 font-bold text-[#F3DFC2] hover:bg-[image:var(--rz-btn-gradient-hover)]"
            >
              <LayoutDashboard className="size-4" />
              View My Rentals
            </Link>

            <Link
              href="/equipment"
              className="flex flex-1 items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Browse More
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
