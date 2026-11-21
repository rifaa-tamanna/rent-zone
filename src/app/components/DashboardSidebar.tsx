"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  Cog,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Package,
  PackagePlus,
  ShieldCheck,
  Users,
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

export type DashboardRole = "customer" | "owner" | "admin";

export interface DashboardMenuItem {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
}

const customerBase = "/dashboard/customer";
const ownerBase = "/dashboard/owner";
const adminBase = "/dashboard/admin";
const profileUrl = "/dashboard/profile";

export const menuItemsByRole: Record<DashboardRole, DashboardMenuItem[]> = {
  customer: [
    {
      id: "customer-overview",
      name: "Overview",
      url: `${customerBase}#overview`,
      icon: LayoutDashboard,
    },
    {
      id: "customer-rentals",
      name: "My Rentals",
      url: `${customerBase}/my-rentals`,
      icon: CalendarDays,
    },
    {
      id: "customer-favorites",
      name: "Favorites",
      url: `${customerBase}/favorites`,
      icon: Heart,
    },
    {
      id: "customer-profile",
      name: "My Profile",
      url: profileUrl,
      icon: Users,
    },
  ],

  owner: [
    {
      id: "owner-overview",
      name: "Overview",
      url: ownerBase,
      icon: LayoutDashboard,
    },
    {
      id: "owner-add-equipment",
      name: "Add Equipment",
      url: `${ownerBase}/add-equipment`,
      icon: PackagePlus,
    },
    {
      id: "owner-equipment",
      name: "My Equipment",
      url: `${ownerBase}/my-equipment`,
      icon: Package,
    },
    {
      id: "owner-rentals",
      name: "My Equipment Rental",
      url: `${ownerBase}/my-rentals`,
      icon: CalendarCheck,
    },
    {
      id: "owner-profile",
      name: "My Profile",
      url: profileUrl,
      icon: Users,
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
      name: "All Users",
      url: `${adminBase}/users`,
      icon: Users,
    },
    {
      id: "admin-equipment",
      name: "All Equipment",
      url: `${adminBase}/equipment`,
      icon: Package,
    },
    {
      id: "admin-rentals",
      name: "All Rentals",
      url: `${adminBase}/rentals`,
      icon: CalendarDays,
    },
    {
      id: "admin-profile",
      name: "My Profile",
      url: profileUrl,
      icon: Users,
    },
  ],
};

const quickLinks: DashboardMenuItem[] = [
  {
    id: "quick-website",
    name: "RentZone Website",
    url: "/",
    icon: ArrowUpRight,
  },
  {
    id: "quick-support",
    name: "Help & Support",
    url: "/contact",
    icon: LifeBuoy,
  },
];

function normalizeRole(role: string | undefined): DashboardRole {
  return role === "owner" || role === "admin" ? role : "customer";
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const rawRole = (session?.user as { role?: string } | undefined)?.role;
  const role = normalizeRole(rawRole);

  const menuItems = menuItemsByRole[role];
  const user = session?.user;

  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash.slice(1));
    };

    syncHash();

    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  const isActive = (url: string): boolean => {
    const [path, anchor = ""] = url.split("#");

    if (path !== pathname) return false;

    if (!anchor) return true;

    return anchor === (hash || "overview");
  };

  const renderItem = (item: DashboardMenuItem) => {
    const active = isActive(item.url);
    const Icon = item.icon;

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          isActive={active}
          tooltip={item.name}
          className={`
            group relative h-10 gap-3 rounded-xl px-3
            text-sm font-medium
            transition-all duration-200 ease-out
            group-data-[collapsible=icon]:justify-center

            ${
              active
                ? "bg-[rgba(166,83,46,0.12)] text-[var(--rz-heading)] shadow-sm hover:bg-[rgba(166,83,46,0.16)] dark:bg-[rgba(166,83,46,0.20)] dark:text-[var(--rz-heading-hover)]"
                : "text-sidebar-foreground/75 hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading)] dark:hover:bg-[rgba(166,83,46,0.14)] dark:hover:text-[var(--rz-heading-hover)]"
            }
          `}
          aria-current={active ? "page" : undefined}
          onClick={() => setOpenMobile(false)}
          render={<Link href={item.url} />}
        >
          {active && (
            <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-[#A6532E] dark:bg-[#D58A60]" />
          )}

          <Icon
            className={`
              size-[18px] shrink-0 transition-transform duration-200
              ${
                active
                  ? "text-[#A6532E] dark:text-[#D58A60]"
                  : "text-sidebar-foreground/60 group-hover:scale-105 group-hover:text-[#A6532E] dark:group-hover:text-[#D58A60]"
              }
            `}
          />

          <span className="truncate group-data-[collapsible=icon]:hidden">
            {item.name}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar font-sans"
    >
      {/* Header */}
      <SidebarHeader className="gap-5 px-4 pb-5 pt-5 md:pt-[82px] lg:pt-[90px] group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pb-3">
        <Link
          href="/"
          onClick={() => setOpenMobile(false)}
          className="group flex items-center gap-3 rounded-xl px-1 py-1.5 transition-opacity hover:opacity-85 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-0"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#B56D43] to-[#914321] text-[#F3DFC2] shadow-[0_4px_12px_rgba(116,61,33,0.18)] transition-transform duration-300 group-hover:scale-105 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-[10px]">
            <Cog size={22} strokeWidth={2.2} />
          </span>

          <span className="flex min-w-0 flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <span className="text-lg font-extrabold leading-tight tracking-[-0.5px] text-[var(--rz-heading)] dark:text-[var(--rz-heading-hover)]">
              RentZone
            </span>

            <span className="text-[8px] font-bold tracking-[1.25px] text-[var(--rz-tagline)]">
              RENT SMART. WORK BETTER.
            </span>
          </span>
        </Link>

        {/* Role Badge */}
        <div className="flex items-center group-data-[collapsible=icon]:hidden">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[rgba(166,83,46,0.25)] bg-[rgba(166,83,46,0.08)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.2px] text-[var(--rz-heading)] dark:border-[rgba(213,138,96,0.25)] dark:bg-[rgba(166,83,46,0.16)] dark:text-[var(--rz-heading-hover)]">
            <ShieldCheck className="size-3.5" />
            {titleCase(role)} Account
          </span>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="gap-2 px-3 group-data-[collapsible=icon]:px-0">
        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground/75">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground/75">
            Quick Links
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {quickLinks.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border bg-sidebar/80 p-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2">
        {isPending ? (
          <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
            <Skeleton className="size-9 shrink-0 rounded-xl group-data-[collapsible=icon]:size-8" />

            <div className="min-w-0 flex-1 space-y-2 group-data-[collapsible=icon]:hidden">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
        ) : user ? (
          <div className="flex items-center gap-2.5 rounded-xl border border-sidebar-border bg-background/60 px-2.5 py-2.5 transition-colors hover:bg-background group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:hover:bg-transparent">
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#B56D43] to-[#914321] text-sm font-bold text-[#F3DFC2] shadow-sm group-data-[collapsible=icon]:size-8">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="size-full object-cover"
                />
              ) : (
                (user.name || user.email || "?").charAt(0).toUpperCase()
              )}
            </span>

            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-bold text-sidebar-foreground">
                {user.name || "RentZone User"}
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                void signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.href = "/signin";
                    },
                  },
                });
              }}
              aria-label="Sign out"
              title="Sign out"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-[rgba(166,83,46,0.12)] hover:text-[var(--rz-heading)] dark:hover:text-[var(--rz-heading-hover)]"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            title="Sign in"
            className="flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-semibold text-[var(--rz-heading)] transition-colors hover:bg-[rgba(166,83,46,0.10)] dark:text-[var(--rz-heading-hover)] group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
          >
            <ShieldCheck className="size-4 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Sign in to your account
            </span>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}