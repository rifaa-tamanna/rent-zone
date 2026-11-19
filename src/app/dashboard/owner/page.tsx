"use client";

import Link from "next/link";
import {
  Banknote,
  CalendarDays,
  Eye,
  Hammer,
  HardHat,
  Package,
  Star,
  TrendingUp,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { BarChartCard } from "@/app/components/dashboard/BarChartCard";
import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { DashboardSection } from "@/app/components/dashboard/DashboardSection";
import { StatCard } from "@/app/components/dashboard/StatCard";
import {
  StatusBadge,
  type StatusTone,
} from "@/app/components/dashboard/StatusBadge";
import {
  dashboardPrimaryCta,
  dashboardSecondaryCta,
} from "@/app/components/dashboard/dashboard-cta";
import { Card } from "@/components/ui/card";

/* ------------------------------------------------------------------ */
/*  Demo data                                                         */
/* ------------------------------------------------------------------ */

const stats = [
  {
    icon: Package,
    label: "Active Listings",
    value: "6",
    delta: "+1",
    deltaLabel: "this month",
  },
  {
    icon: CalendarDays,
    label: "Total Bookings",
    value: "24",
    delta: "+18%",
    deltaLabel: "vs last month",
  },
  {
    icon: Banknote,
    label: "Monthly Earnings",
    value: "$3,480",
    delta: "+11%",
    deltaLabel: "vs October",
  },
  {
    icon: TrendingUp,
    label: "Occupancy Rate",
    value: "78%",
    delta: "+4%",
    deltaLabel: "vs last month",
  },
] as const;

const listingIcons: Record<string, LucideIcon> = {
  excavator: Truck,
  drill: Wrench,
  scaffolding: HardHat,
  mixer: Hammer,
};

const listings = [
  {
    id: "l1",
    kind: "excavator",
    name: "Mini Excavator",
    meta: "$85/day · 12 bookings",
    views: "1.2k",
    status: "Active",
    tone: "success" as StatusTone,
  },
  {
    id: "l2",
    kind: "drill",
    name: "Power Drill Kit",
    meta: "$18/day · 9 bookings",
    views: "860",
    status: "Active",
    tone: "success" as StatusTone,
  },
  {
    id: "l3",
    kind: "scaffolding",
    name: "Scaffolding Set",
    meta: "$40/day · 6 bookings",
    views: "640",
    status: "Paused",
    tone: "warning" as StatusTone,
  },
  {
    id: "l4",
    kind: "mixer",
    name: "Concrete Mixer",
    meta: "$60/day · 4 bookings",
    views: "410",
    status: "Draft",
    tone: "neutral" as StatusTone,
  },
];

const requests = [
  {
    id: "r1",
    customer: "Rakib Hasan",
    item: "Mini Excavator",
    period: "Nov 22 – Nov 25, 2026",
    amount: "$340",
    status: "Pending",
    tone: "warning" as StatusTone,
  },
  {
    id: "r2",
    customer: "Sadia Islam",
    item: "Power Drill Kit",
    period: "Nov 24 – Nov 26, 2026",
    amount: "$54",
    status: "Pending",
    tone: "warning" as StatusTone,
  },
  {
    id: "r3",
    customer: "Tanvir Ahmed",
    item: "Concrete Mixer",
    period: "Dec 02 – Dec 05, 2026",
    amount: "$240",
    status: "Confirmed",
    tone: "success" as StatusTone,
  },
  {
    id: "r4",
    customer: "Nusrat Jahan",
    item: "Scaffolding Set",
    period: "Nov 12 – Nov 16, 2026",
    amount: "$200",
    status: "Completed",
    tone: "info" as StatusTone,
  },
];

const bookingTrend = [
  { label: "Jun", value: "14", height: 42 },
  { label: "Jul", value: "19", height: 56 },
  { label: "Aug", value: "17", height: 50 },
  { label: "Sep", value: "22", height: 65 },
  { label: "Oct", value: "21", height: 62 },
  { label: "Nov", value: "24", height: 72 },
];

const earningsTrend = [
  { label: "Jun", value: "$2.2k", height: 45 },
  { label: "Jul", value: "$2.9k", height: 58 },
  { label: "Aug", value: "$2.6k", height: 52 },
  { label: "Sep", value: "$3.0k", height: 62 },
  { label: "Oct", value: "$3.1k", height: 65 },
  { label: "Nov", value: "$3.5k", height: 72 },
];

const reviews = [
  {
    id: "v1",
    rating: 5,
    comment:
      "Impeccable condition and exactly as listed. Pickup was quick and the owner was super responsive.",
    author: "Rakib Hasan",
    date: "Nov 14, 2026",
  },
  {
    id: "v2",
    rating: 4,
    comment:
      "Great value for a weekend project. Would happily rent again from this owner.",
    author: "Sadia Islam",
    date: "Nov 08, 2026",
  },
  {
    id: "v3",
    rating: 5,
    comment:
      "Professional handover and clean equipment. Highly recommended for site work.",
    author: "Tanvir Ahmed",
    date: "Oct 30, 2026",
  },
];

const iconTile =
  "flex size-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(166,83,46,0.20)] bg-[rgba(166,83,46,0.10)] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]";

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function OwnerDashboardPage() {
  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Owner Dashboard"
        description="Manage your listings, respond to booking requests and keep track of your rental income."
        action={
          <>
            <a href="#listings" className={dashboardPrimaryCta}>
              Manage Listings
            </a>
            <Link href="/" className={dashboardSecondaryCta}>
              Preview Website
            </Link>
          </>
        }
      />

      {/* ============ OVERVIEW ============ */}
      <DashboardSection
        id="overview"
        title="Overview"
        description="How your rental business is performing this month."
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

        <BarChartCard
          className="mt-4"
          title="Booking trend"
          description="Confirmed bookings over the last 6 months"
          data={bookingTrend}
        />
      </DashboardSection>

      {/* ============ LISTINGS ============ */}
      <DashboardSection
        id="listings"
        title="My Listings"
        description="Every item you have published on RentZone."
      >
        <Card className="p-0!">
          <ul className="divide-y divide-border">
            {listings.map((listing) => {
              const ListingIcon = listingIcons[listing.kind] ?? Package;

              return (
                <li
                  key={listing.id}
                  className="flex flex-wrap items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 sm:gap-4"
                >
                  <span className={iconTile} aria-hidden="true">
                    <ListingIcon className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{listing.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {listing.meta}
                    </p>
                  </div>

                  <span className="hidden items-center gap-1.5 text-xs font-semibold text-muted-foreground sm:inline-flex">
                    <Eye className="size-3.5" />
                    {listing.views} views
                  </span>
                  <StatusBadge label={listing.status} tone={listing.tone} />
                </li>
              );
            })}
          </ul>
        </Card>
      </DashboardSection>

      {/* ============ BOOKING REQUESTS ============ */}
      <DashboardSection
        id="bookings"
        title="Booking Requests"
        description="New and upcoming requests for your equipment."
      >
        <Card className="p-0!">
          <ul className="divide-y divide-border">
            {requests.map((request) => (
              <li
                key={request.id}
                className="flex flex-wrap items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 sm:gap-4"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#B56D43,#914321)] text-xs font-bold text-[#F3DFC2]"
                  aria-hidden="true"
                >
                  {request.customer.charAt(0)}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{request.customer}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {request.item} · {request.period}
                  </p>
                </div>

                <span className="text-sm font-bold tabular-nums">
                  {request.amount}
                </span>
                <StatusBadge label={request.status} tone={request.tone} />
              </li>
            ))}
          </ul>
        </Card>
      </DashboardSection>

      {/* ============ EARNINGS ============ */}
      <DashboardSection
        id="earnings"
        title="Earnings"
        description="Your payout schedule and monthly income."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl bg-[image:var(--rz-btn-gradient)] p-5 text-[#F3DFC2] shadow-[0_6px_16px_rgba(166,83,46,0.22)]">
            <p className="text-xs font-bold uppercase tracking-[1.4px] text-[#F3DFC2]">
              Next payout
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#F3DFC2]">
              $1,850
            </p>
            <p className="mt-1 text-sm font-medium text-[#F3DFC2]">
              Scheduled Dec 01, 2026
            </p>

            <div className="mt-4 flex items-center justify-between gap-2 border-t border-[rgba(243,223,194,0.25)] pt-4 text-xs font-semibold">
              <span>4 bookings included</span>
              <span className="rounded-full bg-[rgba(243,223,194,0.18)] px-2.5 py-1">
                Autopay on
              </span>
            </div>
          </div>

          <BarChartCard
            className="lg:col-span-2"
            title="Monthly earnings"
            description="Gross income over the last 6 months"
            data={earningsTrend}
          />
        </div>
      </DashboardSection>

      {/* ============ REVIEWS ============ */}
      <DashboardSection
        id="reviews"
        title="Reviews"
        description="What renters say about your equipment and service."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-bold text-foreground">
            <Star className="size-4 fill-amber-400 text-amber-500" />
            4.8 average
          </span>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-sm font-bold tabular-nums">
                  <Star className="size-4 fill-amber-400 text-amber-500" />
                  {review.rating}.0
                </span>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6">“{review.comment}”</p>

              <div className="mt-4 flex items-center gap-2.5 border-t border-border pt-3">
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(166,83,46,0.12)] text-xs font-bold text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]"
                  aria-hidden="true"
                >
                  {review.author.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {review.author}
                  </p>
                  <p className="text-xs text-muted-foreground">Verified renter</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
