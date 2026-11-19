"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Banknote, CalendarDays, Heart, Truck } from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { DashboardSection } from "@/app/components/dashboard/DashboardSection";
import { StarRating } from "@/app/components/dashboard/StarRating";
import { StatCard, type StatCardProps } from "@/app/components/dashboard/StatCard";
import {
  StatusBadge,
  type StatusTone,
} from "@/app/components/dashboard/StatusBadge";
import { dashboardPrimaryCta } from "@/app/components/dashboard/dashboard-cta";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Demo data                                                         */
/* ------------------------------------------------------------------ */

const stats: StatCardProps[] = [
  {
    icon: Truck,
    label: "Active Rentals",
    value: "3",
    delta: "+1",
    deltaLabel: "vs last week",
  },
  {
    icon: CalendarDays,
    label: "Upcoming Bookings",
    value: "2",
    deltaLabel: "Next pickup · Nov 20",
  },
  {
    icon: Banknote,
    label: "Total Spent",
    value: "$1,240",
    delta: "+8.2%",
    deltaLabel: "vs last month",
  },
  {
    icon: Heart,
    label: "Saved Items",
    value: "8",
    deltaLabel: "2 added recently",
  },
];

interface ActivityEntry {
  id: string;
  text: string;
  time: string;
  dot: string;
}

const activity: ActivityEntry[] = [
  {
    id: "a1",
    text: "Booking confirmed — Mini Excavator",
    time: "2 hours ago",
    dot: "bg-emerald-500",
  },
  {
    id: "a2",
    text: "Payment of $320 received",
    time: "Yesterday",
    dot: "bg-[var(--rz-heading)] dark:bg-[var(--rz-heading-hover)]",
  },
  {
    id: "a3",
    text: "New listing matches your favorites",
    time: "2 days ago",
    dot: "bg-muted-foreground/50",
  },
  {
    id: "a4",
    text: "Booking completed — Concrete Mixer",
    time: "Nov 12, 2026",
    dot: "bg-emerald-500",
  },
];

const bookings = [
  {
    id: "b1",
    item: "Mini Excavator",
    period: "Nov 12 – Nov 15, 2026",
    amount: "$420",
    status: "Confirmed",
    tone: "success" as StatusTone,
  },
  {
    id: "b2",
    item: "Scaffolding Set",
    period: "Nov 20 – Nov 24, 2026",
    amount: "$260",
    status: "Pending",
    tone: "warning" as StatusTone,
  },
  {
    id: "b3",
    item: "Concrete Mixer",
    period: "Nov 05 – Nov 08, 2026",
    amount: "$310",
    status: "Completed",
    tone: "info" as StatusTone,
  },
  {
    id: "b4",
    item: "Power Drill Kit",
    period: "Oct 28 – Oct 30, 2026",
    amount: "$75",
    status: "Completed",
    tone: "info" as StatusTone,
  },
  {
    id: "b5",
    item: "Wheel Loader",
    period: "Oct 15 – Oct 18, 2026",
    amount: "$380",
    status: "Cancelled",
    tone: "danger" as StatusTone,
  },
];

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

const favorites = [
  {
    id: "f1",
    name: "Mini Excavator",
    price: "$85/day",
    rating: 4.9,
    meta: "Verified owner · Heavy equipment",
    image: unsplash("photo-1580901368919-7738efb0f87e"),
    alt: "Mini excavator on a construction site",
  },
  {
    id: "f2",
    name: "Scaffolding Set",
    price: "$40/day",
    rating: 4.7,
    meta: "Verified owner · Site structures",
    image: unsplash("photo-1508450859948-4e04fabaa4ea"),
    alt: "Scaffolding on a multi-storey building",
  },
  {
    id: "f3",
    name: "Steel Framing Kit",
    price: "$32/day",
    rating: 4.8,
    meta: "Top rated · Structural steel",
    image: unsplash("photo-1504307651254-35680f356dfd"),
    alt: "Construction crew working with steel reinforcement",
  },
];

const payments = [
  {
    id: "p1",
    date: "Nov 12, 2026",
    description: "Mini Excavator · 3 days",
    method: "Visa •• 4242",
    amount: "$420",
    status: "Paid",
    tone: "success" as StatusTone,
  },
  {
    id: "p2",
    date: "Nov 05, 2026",
    description: "Concrete Mixer · 3 days",
    method: "Wallet credit",
    amount: "$310",
    status: "Paid",
    tone: "success" as StatusTone,
  },
  {
    id: "p3",
    date: "Oct 28, 2026",
    description: "Power Drill Kit · 2 days",
    method: "Visa •• 4242",
    amount: "$75",
    status: "Paid",
    tone: "success" as StatusTone,
  },
  {
    id: "p4",
    date: "Oct 15, 2026",
    description: "Wheel Loader · 3 days",
    method: "Bank transfer",
    amount: "$380",
    status: "Refunded",
    tone: "info" as StatusTone,
  },
];

const iconTile =
  "flex size-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(166,83,46,0.20)] bg-[rgba(166,83,46,0.10)] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]";

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Customer Dashboard"
        description="Track your rentals, manage bookings and review payments — everything for your RentZone journey in one place."
        action={
          <Link href="/" className={dashboardPrimaryCta}>
            Browse Equipment
            <ArrowUpRight size={17} />
          </Link>
        }
      />

      {/* ============ OVERVIEW ============ */}
      <DashboardSection
        id="overview"
        title="Overview"
        description="A quick snapshot of your rentals right now."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              deltaLabel={stat.deltaLabel}
            />
          ))}
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              The latest updates on your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activity.map((entry) => (
                <li key={entry.id} className="flex items-start gap-3">
                  <span
                    className={cn("mt-1.5 size-2 shrink-0 rounded-full", entry.dot)}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{entry.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {entry.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </DashboardSection>

      {/* ============ BOOKINGS ============ */}
      <DashboardSection
        id="bookings"
        title="My Bookings"
        description="All your current, upcoming and past rentals."
      >
        <Card className="p-0!">
          <ul className="divide-y divide-border">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-wrap items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 sm:gap-4"
              >
                <span className={iconTile} aria-hidden="true">
                  <Truck className="size-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{booking.item}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {booking.period}
                  </p>
                </div>

                <span className="text-sm font-bold tabular-nums">
                  {booking.amount}
                </span>
                <StatusBadge label={booking.status} tone={booking.tone} />
              </li>
            ))}
          </ul>
        </Card>
      </DashboardSection>

      {/* ============ FAVORITES ============ */}
      <DashboardSection
        id="favorites"
        title="Favorites"
        description="Equipment you saved for later."
        action={
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--rz-heading)] transition-colors hover:text-[var(--rz-heading-hover)] dark:text-[var(--rz-heading-hover)]"
          >
            Browse equipment →
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden p-0!">
              <div className="relative">
                <Image
                  src={favorite.image}
                  alt={favorite.alt}
                  width={800}
                  height={560}
                  className="h-44 w-full object-cover"
                />
                <span
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.90)] text-red-500 shadow-sm backdrop-blur"
                  aria-label="Saved to favorites"
                >
                  <Heart className="size-4 fill-current" />
                </span>
              </div>

              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-card-foreground">
                    {favorite.name}
                  </h3>
                  <span className="text-sm font-bold text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]">
                    {favorite.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating rating={favorite.rating} />
                  <span className="text-xs font-semibold text-muted-foreground">
                    {favorite.rating}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">{favorite.meta}</p>
              </div>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* ============ PAYMENTS ============ */}
      <DashboardSection
        id="payments"
        title="Payments"
        description="Upcoming dues and your transaction history."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl bg-[image:var(--rz-btn-gradient)] p-5 text-[#F3DFC2] shadow-[0_6px_16px_rgba(166,83,46,0.22)]">
            <p className="text-xs font-bold uppercase tracking-[1.4px] text-[#F3DFC2]">
              Next payment
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#F3DFC2]">$260</p>
            <p className="mt-1 text-sm font-medium text-[#F3DFC2]">
              Due Nov 20, 2026
            </p>

            <div className="mt-4 flex items-center justify-between gap-2 border-t border-[rgba(243,223,194,0.25)] pt-4 text-xs font-semibold">
              <span>Scaffolding Set</span>
              <span className="rounded-full bg-[rgba(243,223,194,0.18)] px-2.5 py-1">
                Autopay on
              </span>
            </div>
          </div>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Payment history</CardTitle>
              <CardDescription>Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {payments.map((payment) => (
                  <li
                    key={payment.id}
                    className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {payment.description}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {payment.date} · {payment.method}
                      </p>
                    </div>

                    <span className="text-sm font-bold tabular-nums">
                      {payment.amount}
                    </span>
                    <StatusBadge label={payment.status} tone={payment.tone} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>
    </div>
  );
}
