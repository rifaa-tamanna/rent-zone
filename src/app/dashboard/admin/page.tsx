"use client";

import Link from "next/link";
import {
  CalendarDays,
  CircleDollarSign,
  Flag,
  Package,
  ShieldCheck,
  Users,
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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/* ------------------------------------------------------------------ */
/*  Demo data                                                         */
/* ------------------------------------------------------------------ */

const stats = [
  {
    icon: Users,
    label: "Total Users",
    value: "1,284",
    delta: "+64",
    deltaLabel: "this month",
  },
  {
    icon: Package,
    label: "Active Listings",
    value: "342",
    delta: "+18",
    deltaLabel: "vs last month",
  },
  {
    icon: CalendarDays,
    label: "Bookings This Month",
    value: "89",
    delta: "+14%",
    deltaLabel: "vs last month",
  },
  {
    icon: CircleDollarSign,
    label: "Platform Revenue",
    value: "$12,450",
    delta: "+9.4%",
    deltaLabel: "vs last month",
  },
] as const;

const platformTrend = [
  { label: "Jun", value: "62", height: 48 },
  { label: "Jul", value: "71", height: 55 },
  { label: "Aug", value: "58", height: 45 },
  { label: "Sep", value: "84", height: 65 },
  { label: "Oct", value: "77", height: 60 },
  { label: "Nov", value: "89", height: 70 },
];

type UserRole = "Customer" | "Owner" | "Admin";

const users: Array<{
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: string;
  status: "Active" | "Invited";
}> = [
  {
    id: "u1",
    name: "Rakib Hasan",
    email: "rakib@rentzone.io",
    role: "Customer",
    joined: "Oct 12, 2026",
    status: "Active",
  },
  {
    id: "u2",
    name: "Sadia Islam",
    email: "sadia@rentzone.io",
    role: "Owner",
    joined: "Sep 28, 2026",
    status: "Active",
  },
  {
    id: "u3",
    name: "Tanvir Ahmed",
    email: "tanvir@gmail.com",
    role: "Customer",
    joined: "Nov 02, 2026",
    status: "Active",
  },
  {
    id: "u4",
    name: "Nusrat Jahan",
    email: "nusrat@gmail.com",
    role: "Owner",
    joined: "Aug 19, 2026",
    status: "Active",
  },
  {
    id: "u5",
    name: "Farhan Kabir",
    email: "farhan@gmail.com",
    role: "Customer",
    joined: "Nov 15, 2026",
    status: "Invited",
  },
  {
    id: "u6",
    name: "RentZone Admin",
    email: "admin@rentzone.io",
    role: "Admin",
    joined: "Jul 01, 2026",
    status: "Active",
  },
];

const moderatedListings = [
  {
    id: "m1",
    name: "Mini Excavator",
    owner: "Sadia Islam",
    price: "$85/day",
    status: "Live",
    tone: "success" as StatusTone,
  },
  {
    id: "m2",
    name: "Scaffolding Set",
    owner: "Nusrat Jahan",
    price: "$40/day",
    status: "Pending Review",
    tone: "warning" as StatusTone,
  },
  {
    id: "m3",
    name: "Concrete Mixer",
    owner: "Nusrat Jahan",
    price: "$60/day",
    status: "Live",
    tone: "success" as StatusTone,
  },
  {
    id: "m4",
    name: "Tower Light Kit",
    owner: "Farhan Kabir",
    price: "$12/day",
    status: "Flagged",
    tone: "danger" as StatusTone,
  },
];

const platformBookings = [
  {
    id: "b1",
    reference: "#RZ-1042",
    customer: "Rakib Hasan",
    item: "Mini Excavator",
    amount: "$420",
    status: "Completed",
    tone: "info" as StatusTone,
  },
  {
    id: "b2",
    reference: "#RZ-1041",
    customer: "Sadia Islam",
    item: "Power Drill Kit",
    amount: "$54",
    status: "Active",
    tone: "success" as StatusTone,
  },
  {
    id: "b3",
    reference: "#RZ-1040",
    customer: "Tanvir Ahmed",
    item: "Concrete Mixer",
    amount: "$240",
    status: "Pending",
    tone: "warning" as StatusTone,
  },
  {
    id: "b4",
    reference: "#RZ-1039",
    customer: "Nusrat Jahan",
    item: "Scaffolding Set",
    amount: "$200",
    status: "Completed",
    tone: "info" as StatusTone,
  },
  {
    id: "b5",
    reference: "#RZ-1038",
    customer: "Farhan Kabir",
    item: "Wheel Loader",
    amount: "$380",
    status: "Cancelled",
    tone: "danger" as StatusTone,
  },
];

const reports = [
  {
    id: "rep1",
    title: "Inaccurate listing photos",
    target: "Tower Light Kit",
    reporter: "Rakib Hasan",
    severity: "High",
    severityTone: "danger" as StatusTone,
    status: "Open",
    statusTone: "warning" as StatusTone,
    date: "Nov 16, 2026",
  },
  {
    id: "rep2",
    title: "Late return — equipment damaged",
    target: "Booking #RZ-1038",
    reporter: "Nusrat Jahan",
    severity: "Medium",
    severityTone: "warning" as StatusTone,
    status: "Reviewing",
    statusTone: "info" as StatusTone,
    date: "Nov 14, 2026",
  },
  {
    id: "rep3",
    title: "Duplicate listing",
    target: "Power Drill Kit #2",
    reporter: "Sadia Islam",
    severity: "Low",
    severityTone: "info" as StatusTone,
    status: "Resolved",
    statusTone: "success" as StatusTone,
    date: "Nov 10, 2026",
  },
];

const iconTile =
  "flex size-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(166,83,46,0.20)] bg-[rgba(166,83,46,0.10)] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]";

/* ------------------------------------------------------------------ */
/*  Role badge                                                        */
/* ------------------------------------------------------------------ */

function RoleBadge({ role }: { role: UserRole }) {
  if (role === "Owner") {
    return (
      <Badge
        variant="outline"
        className="border-[rgba(166,83,46,0.30)] bg-[rgba(166,83,46,0.10)] font-semibold text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]"
      >
        Owner
      </Badge>
    );
  }

  if (role === "Admin") {
    return (
      <Badge className="border-transparent bg-[#844225] font-semibold text-white">
        Admin
      </Badge>
    );
  }

  return <Badge variant="secondary">Customer</Badge>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function AdminDashboardPage() {
  const listingIconByIndex: LucideIcon[] = [Package, ShieldCheck, Flag];

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Admin Dashboard"
        description="Oversee users, listings and bookings across the platform and keep RentZone running smoothly."
        action={
          <>
            <a href="#reports" className={dashboardPrimaryCta}>
              Review Reports
            </a>
            <Link href="/" className={dashboardSecondaryCta}>
              View Website
            </Link>
          </>
        }
      />

      {/* ============ OVERVIEW ============ */}
      <DashboardSection
        id="overview"
        title="Overview"
        description="Platform health at a glance."
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
          title="Bookings overview"
          description="All platform bookings over the last 6 months"
          data={platformTrend}
        />
      </DashboardSection>

      {/* ============ USERS ============ */}
      <DashboardSection
        id="users"
        title="Users"
        description="Everyone registered on the platform."
        action={
          <span className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
            1,284 total
          </span>
        }
      >
        <Card className="p-0!">
          <ul className="divide-y divide-border">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex flex-wrap items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 sm:gap-4"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#B56D43,#914321)] text-xs font-bold text-[#F3DFC2]"
                  aria-hidden="true"
                >
                  {user.name.charAt(0)}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <span className="hidden text-xs text-muted-foreground lg:block">
                  Joined {user.joined}
                </span>
                <RoleBadge role={user.role} />
                <StatusBadge
                  label={user.status}
                  tone={user.status === "Active" ? "success" : "warning"}
                />
              </li>
            ))}
          </ul>
        </Card>
      </DashboardSection>

      {/* ============ LISTINGS ============ */}
      <DashboardSection
        id="listings"
        title="Listings"
        description="Moderate equipment published across RentZone."
      >
        <Card className="p-0!">
          <ul className="divide-y divide-border">
            {moderatedListings.map((listing, index) => {
              const ListingIcon =
                listingIconByIndex[index % listingIconByIndex.length];

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
                      Owner: {listing.owner}
                    </p>
                  </div>

                  <span className="text-sm font-bold tabular-nums">
                    {listing.price}
                  </span>
                  <StatusBadge label={listing.status} tone={listing.tone} />
                </li>
              );
            })}
          </ul>
        </Card>
      </DashboardSection>

      {/* ============ BOOKINGS ============ */}
      <DashboardSection
        id="bookings"
        title="Bookings"
        description="The latest bookings made on the platform."
      >
        <Card className="p-0!">
          <ul className="divide-y divide-border">
            {platformBookings.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-wrap items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 sm:gap-4"
              >
                <span className={iconTile} aria-hidden="true">
                  <CalendarDays className="size-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold tabular-nums">
                    {booking.reference}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {booking.customer} · {booking.item}
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

      {/* ============ REPORTS ============ */}
      <DashboardSection
        id="reports"
        title="Reports"
        description="User-submitted issues awaiting moderation."
        action={<StatusBadge label="3 open" tone="danger" />}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold leading-5 text-card-foreground">
                  {report.title}
                </h3>
                <StatusBadge label={report.severity} tone={report.severityTone} />
              </div>

              <div className="mt-3 space-y-1 text-xs leading-5">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Target:</span>{" "}
                  {report.target}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Reported by:
                  </span>{" "}
                  {report.reporter}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
                <StatusBadge label={report.status} tone={report.statusTone} />
                <span className="text-xs text-muted-foreground">
                  {report.date}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
