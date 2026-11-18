// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";
// import {
//   Cog,
//   Menu,
//   X,
//   Sun,
//   Moon,
//   ArrowUpRight,
//   LayoutDashboard,
// } from "lucide-react";

// interface NavbarProps {
//   isLoggedIn?: boolean;
//   onLogout?: () => void;
// }

// const navLinks = [
//   { name: "Home", href: "/" },
//   { name: "All Equipment", href: "/equipment" },
//   { name: "About", href: "/about" },
//   { name: "Contact", href: "/contact" },
// ];

// export default function Navbar({ isLoggedIn = false, onLogout }: NavbarProps) {
//   const pathname = usePathname();
//   const { theme, setTheme } = useTheme();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === "/";
//     return pathname.startsWith(href);
//   };

//   const closeMenu = () => setMenuOpen(false);

//   return (
//     <header className="rz-header">
//       <nav className="rz-navbar">
//         {/* Logo */}

//         <Link
//           href="/"
//           className="rz-brand"
//           onClick={closeMenu}
//           style={{ textDecoration: "none" }}
//         >
//           <span
//             className="rz-logo-icon"
//             style={{
//               backgroundColor: "#A6532E",
//               color: "#F3DFC2",
//             }}
//           >
//             <Cog size={27} strokeWidth={2.2} />
//           </span>

//           <span className="rz-brand-text">
//             <span
//               className="rz-brand-name"
//               style={{
//                 color: "#A6532E",
//               }}
//             >
//               RentZone
//             </span>

//             <span
//               className="rz-brand-tagline"
//               style={{
//                 color: "#806650",
//               }}
//             >
//               RENT SMART. WORK BETTER.
//             </span>
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="rz-nav-links">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`rz-nav-link ${isActive(link.href) ? "active" : ""}`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* Right Actions */}
//         <div className="rz-nav-actions">
//           <button
//             type="button"
//             className="rz-theme-toggle"
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             aria-label="Toggle theme"
//           >
//             {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
//           </button>

//           {isLoggedIn ? (
//             <div className="rz-auth-actions">
//               <Link href="/dashboard" className="rz-dashboard-btn">
//                 <LayoutDashboard size={17} />
//                 Dashboard
//               </Link>

//               <button
//                 type="button"
//                 className="rz-logout-btn"
//                 onClick={onLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="rz-auth-actions">
//               <Link href="/login" className="rz-login-btn">
//                 Login
//               </Link>

//               <Link href="/register" className="rz-register-btn">
//                 Get Started
//                 <ArrowUpRight size={17} />
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           className="rz-mobile-toggle"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle navigation menu"
//           aria-expanded={menuOpen}
//         >
//           {menuOpen ? <X size={25} /> : <Menu size={25} />}
//         </button>
//       </nav>

//       {/* Mobile Navigation */}
//       <div className={`rz-mobile-menu ${menuOpen ? "open" : ""}`}>
//         <div className="rz-mobile-links">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={closeMenu}
//               className={`rz-mobile-link ${
//                 isActive(link.href) ? "active" : ""
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         <div className="rz-mobile-actions">
//           {isLoggedIn ? (
//             <>
//               <Link
//                 href="/dashboard"
//                 className="rz-register-btn"
//                 onClick={closeMenu}
//               >
//                 Dashboard <ArrowUpRight size={17} />
//               </Link>

//               <button
//                 type="button"
//                 className="rz-mobile-logout"
//                 onClick={() => {
//                   closeMenu();
//                   onLogout?.();
//                 }}
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="rz-mobile-login"
//                 onClick={closeMenu}
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/register"
//                 className="rz-register-btn"
//                 onClick={closeMenu}
//               >
//                 Get Started <ArrowUpRight size={17} />
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

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

export default function Navbar({ isLoggedIn = false, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="rz-header">
      <nav className="rz-navbar">
        {/* Logo */}
        <Link
          href="/"
          className="rz-brand"
          onClick={closeMenu}
          style={{ textDecoration: "none" }}
        >
          <span
            className="rz-logo-icon"
            style={{
              backgroundColor: "#A6532E",
              color: "#F3DFC2",
            }}
          >
            <Cog size={27} strokeWidth={2.2} />
          </span>

          <span className="rz-brand-text">
            <span
              className="rz-brand-name"
              style={{
                color: "#A6532E",
              }}
            >
              RentZone
            </span>

            <span
              className="rz-brand-tagline"
              style={{
                color: "#806650",
              }}
            >
              RENT SMART. WORK BETTER.
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="rz-nav-links">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rz-nav-link ${active ? "active" : ""}`}
              >
                <span className="rz-nav-link-text">{link.name}</span>
                {active && <span className="rz-active-dot" aria-hidden="true" />}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="rz-nav-actions">
          <button
            type="button"
            className="rz-theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {isLoggedIn ? (
            <div className="rz-auth-actions">
              <Link
                href="/dashboard"
                aria-current={isActive("/dashboard") ? "page" : undefined}
                className={`rz-dashboard-btn ${
                  isActive("/dashboard") ? "active" : ""
                }`}
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>

              <button
                type="button"
                className="rz-logout-btn"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="rz-auth-actions">
              <Link
                href="/login"
                aria-current={isActive("/login") ? "page" : undefined}
                className={`rz-login-btn ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Link>

              <Link href="/register" className="rz-register-btn">
                Get Started
                <ArrowUpRight size={17} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rz-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={`rz-mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="rz-mobile-links">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                className={`rz-mobile-link ${active ? "active" : ""}`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="rz-mobile-active-badge">Current</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="rz-mobile-actions">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className={`rz-register-btn ${
                  isActive("/dashboard") ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                Dashboard <ArrowUpRight size={17} />
              </Link>

              <button
                type="button"
                className="rz-mobile-logout"
                onClick={() => {
                  closeMenu();
                  onLogout?.();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`rz-mobile-login ${
                  isActive("/login") ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rz-register-btn"
                onClick={closeMenu}
              >
                Get Started <ArrowUpRight size={17} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}