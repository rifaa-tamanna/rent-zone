"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  Cog,
  Flag,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Package,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth-client";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Roles supported by the app (better-auth `role`, defaulting to customer). */
export type DashboardRole = "customer" | "owner" | "admin";

export interface DashboardMenuItem {
  /** Stable React key. */
  id: string;
  /** Visible menu label. */
  name: string;
  /**
   * Navigation target. Section entries use `<role-path>#<section-id>` and
   * scroll to a section on the role's dashboard page; every path referenced
   * here is an existing route in the app.
   */
  url: string;
  /** Lucide icon component. */
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */
/*  Menu definitions                                                  */
/* ------------------------------------------------------------------ */

const customerBase = "/dashboard/customer";
const ownerBase = "/dashboard/owner";
const adminBase = "/dashboard/admin";

export const menuItemsByRole: Record<DashboardRole, DashboardMenuItem[]> = {
  customer: [
    {
      id: "customer-overview",
      name: "Overview",
      url: `${customerBase}#overview`,
      icon: LayoutDashboard,
    },
    {
      id: "customer-bookings",
      name: "My Bookings",
      url: `${customerBase}#bookings`,
      icon: CalendarDays,
    },
    {
      id: "customer-favorites",
      name: "Favorites",
      url: `${customerBase}#favorites`,
      icon: Heart,
    },
    {
      id: "customer-payments",
      name: "Payments",
      url: `${customerBase}#payments`,
      icon: CreditCard,
    },
  ],
  owner: [
    {
      id: "owner-overview",
      name: "Overview",
      url: `${ownerBase}#overview`,
      icon: LayoutDashboard,
    },
    {
      id: "owner-listings",
      name: "My Listings",
      url: `${ownerBase}#listings`,
      icon: Package,
    },
    {
      id: "owner-requests",
      name: "Booking Requests",
      url: `${ownerBase}#bookings`,
      icon: CalendarCheck,
    },
    {
      id: "owner-earnings",
      name: "Earnings",
      url: `${ownerBase}#earnings`,
      icon: Wallet,
    },
    {
      id: "owner-reviews",
      name: "Reviews",
      url: `${ownerBase}#reviews`,
      icon: Star,
    },
  ],
  admin: [
    {
      id: "admin-overview",
      name: "Overview",
      url: `${adminBase}#overview`,
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users",
      url: `${adminBase}#users`,
      icon: Users,
    },
    {
      id: "admin-listings",
      name: "Listings",
      url: `${adminBase}#listings`,
      icon: ShieldCheck,
    },
    {
      id: "admin-bookings",
      name: "Bookings",
      url: `${adminBase}#bookings`,
      icon: CalendarDays,
    },
    {
      id: "admin-reports",
      name: "Reports",
      url: `${adminBase}#reports`,
      icon: Flag,
    },
  ],
};

/** Valid public routes shared by every role. */
const quickLinks: DashboardMenuItem[] = [
  { id: "quick-website", name: "RentZone Website", url: "/", icon: ArrowUpRight },
  { id: "quick-support", name: "Help & Support", url: "/contact", icon: LifeBuoy },
];

function normalizeRole(role: string | undefined): DashboardRole {
  return role === "owner" || role === "admin" ? role : "customer";
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  // better-auth's base user type doesn't declare the custom `role` field,
  // so narrow it defensively (defaults to "customer", matching auth.ts).
  const rawRole = (session?.user as { role?: string } | undefined)?.role;
  const role = normalizeRole(rawRole);
  const menuItems = menuItemsByRole[role];

  // Track the in-page hash so section links highlight like real routes.
  const [hash, setHash] = useState("");
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.slice(1));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isActive = (url: string): boolean => {
    const [path, anchor = ""] = url.split("#");
    if (path !== pathname) return false;
    if (!anchor) return true;
    // Default to the first section (overview) when no hash is present.
    return anchor === (hash || "overview");
  };

  const user = session?.user;

  const renderItem = (item: DashboardMenuItem) => {
    const active = isActive(item.url);

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          isActive={active}
          tooltip={item.name}
          className="gap-2.5"
          aria-current={active ? "page" : undefined}
          onClick={() => setOpenMobile(false)}
          render={<a href={item.url} />}
        >
          <item.icon />
          <span>{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar>
      <SidebarHeader className="md:pt-[82px] lg:pt-[90px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-opacity hover:opacity-85"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#B56D43,#914321)] text-[#F3DFC2] shadow-[0_4px_12px_rgba(116,61,33,0.18)]">
            <Cog size={22} strokeWidth={2.2} />
          </span>

          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-lg font-extrabold leading-tight tracking-[-0.5px] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]">
              RentZone
            </span>
            <span className="text-[7px] font-bold tracking-[1.25px] text-[var(--rz-tagline)]">
              RENT SMART. WORK BETTER.
            </span>
          </span>
        </Link>

        <span className="mx-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-[rgba(166,83,46,0.28)] bg-[rgba(166,83,46,0.08)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1.2px] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]">
          <ShieldCheck className="size-3" />
          {titleCase(role)}
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{menuItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{quickLinks.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {isPending ? (
          <div className="flex items-center gap-2.5 px-2 py-2">
            <Skeleton className="size-9 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
        ) : user ? (
          <div className="flex items-center gap-2.5 px-2 py-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#B56D43,#914321)] text-sm font-bold text-[#F3DFC2]">
              {(user.name || user.email || "?").charAt(0).toUpperCase()}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">
                {user.name || "RentZone User"}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/70">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={() => void signOut()}
              aria-label="Sign out"
              title="Sign out"
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-[var(--rz-heading)] transition-colors hover:bg-[rgba(166,83,46,0.10)] hover:text-[var(--rz-heading-hover)]"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-sm font-semibold text-[var(--rz-heading)] transition-colors hover:bg-[rgba(166,83,46,0.10)] dark:text-[var(--rz-heading-hover)]"
          >
            <ShieldCheck className="size-4" />
            Sign in to your account
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
