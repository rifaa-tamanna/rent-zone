"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Cog,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Equipment", href: "/equipment" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({
  isLoggedIn = false,
  onLogout,
}: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setMenuOpen(false);

  const primaryButton =
    "inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-5 py-3 text-sm font-bold text-[#F3DFC2] shadow-[0_4px_10px_rgba(166,83,46,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_7px_18px_rgba(166,83,46,0.25)]";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between gap-5 px-[5%] md:h-[74px] lg:h-[82px]">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="inline-flex shrink-0 items-center gap-[11px]"
        >
          <span className="flex size-[41px] items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#B56D43,#914321)] text-[#F3DFC2] shadow-[0_4px_12px_rgba(116,61,33,0.18)] transition-transform duration-300 hover:-rotate-12 md:size-[45px]">
            <Cog size={27} strokeWidth={2.2} />
          </span>

          <span className="flex flex-col gap-0.5">
            <span className="text-[22px] font-extrabold leading-tight tracking-[-1px] text-[var(--rz-heading)] md:text-2xl">
              RentZone
            </span>
            <span className="text-[8px] font-bold tracking-[1.25px] text-[var(--rz-tagline)]">
              RENT SMART. WORK BETTER.
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 min-[701px]:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-[9px] px-2.5 py-2.5 text-[13px] font-semibold transition-colors duration-300 after:absolute after:bottom-[3px] after:left-2.5 after:right-2.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-[var(--rz-heading)] after:transition-transform after:duration-300 hover:text-[var(--rz-heading)] hover:after:scale-x-100 md:px-3.5 md:text-sm ${
                  active
                    ? "text-[var(--rz-heading)] after:scale-x-100"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 min-[701px]:flex">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-transparent text-[var(--rz-heading)] transition-all duration-300 hover:border-[var(--rz-heading-hover)] hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading-hover)]"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                aria-current={isActive("/dashboard") ? "page" : undefined}
                className="inline-flex items-center gap-2 rounded-[9px] bg-[rgba(166,83,46,0.10)] px-4 py-3 text-sm font-bold text-[var(--rz-heading)] transition-colors hover:text-[var(--rz-heading-hover)]"
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>

              <button
                type="button"
                onClick={onLogout}
                className="text-sm font-semibold text-[var(--rz-heading)] transition-colors hover:text-[var(--rz-heading-hover)]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-3 py-2.5 text-sm font-semibold text-[var(--rz-heading)] transition-colors hover:text-[var(--rz-heading-hover)]"
              >
                Login
              </Link>

              <Link href="/register" className={primaryButton}>
                Get Started
                <ArrowUpRight size={17} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex size-[42px] items-center justify-center text-[var(--rz-heading)] min-[701px]:hidden"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`absolute left-0 top-full w-full border-b border-border bg-background px-[5%] py-4 shadow-[0_12px_22px_rgba(60,40,25,0.08)] transition-all duration-300 min-[701px]:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between rounded-[9px] px-4 py-3 text-[15px] font-semibold transition-colors ${
                  active
                    ? "bg-[rgba(166,83,46,0.10)] text-[var(--rz-heading)]"
                    : "text-muted-foreground hover:bg-[rgba(166,83,46,0.08)] hover:text-[var(--rz-heading)]"
                }`}
              >
                {link.name}
                {active && (
                  <span className="size-2 rounded-full bg-[var(--rz-heading)]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex w-full items-center justify-center gap-2 rounded-[9px] border border-border px-3 py-3 font-semibold text-[var(--rz-heading)]"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className={primaryButton}
              >
                Dashboard
                <ArrowUpRight size={17} />
              </Link>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onLogout?.();
                }}
                className="w-full rounded-[9px] border border-border px-3 py-3 text-center font-semibold text-[var(--rz-heading)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={closeMenu}
                className="w-full rounded-[9px] border border-border px-3 py-3 text-center font-semibold text-[var(--rz-heading)]"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className={`${primaryButton} w-full`}
              >
                Get Started
                <ArrowUpRight size={17} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
