
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "RentZone | Rent Smart. Work Better.",
  description:
    "Rent quality equipment with RentZone. Find the right equipment for every project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="rentzone-theme"
        >
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
