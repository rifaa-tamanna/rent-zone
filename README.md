# 🚜 RentZone — Equipment Rental Platform (Client)

> **Category:** Assignment 9 - Category 003  
> **Platform:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, BetterAuth  
> **Live Site:** [https://rent-zone.vercel.app](https://rent-zone.vercel.app) *(Replace with your live production URL)*

---

## 📌 Project Overview & Purpose
**RentZone** is a modern equipment rental marketplace designed to bridge the gap between equipment owners and renters. The platform allows equipment owners to list heavy machinery, vehicles, photography equipment, and industrial tools for rent, while enabling customers to seamlessly search, filter, book, and securely pay through Stripe Checkout.

### 🌟 Key Features
* **Role-Based Access Control (RBAC):** Distinct dashboards and routing permissions for **Customer**, **Owner**, and **Admin**.
* **Dynamic Server-Side Search & Filter (Challenge 1):** Real-time server-side search by title or location, filtering by category, rental type (daily/weekly/monthly), and price ranges, with multi-level sorting.
* **Framer Motion Animations:** Smooth, accessible micro-interactions across the Hero banner, featured cards, categories, and reviews.
* **Favorites System:** Save bookmarked equipment to the database and manage them from the customer dashboard.
* **Stripe Payment Gateway:** Integrated rental checkout calculation based on booking duration and quantity with real-time payment recording.
* **Owner Equipment Management:** Multi-image upload to ImgBB, status tracking, item updating, and deletion.
* **Admin Moderation & Dynamic Analytics (Challenge 3):** Platform-wide metrics, equipment approval/rejection workflows, and user role management.
* **Dark / Light Theme Toggle:** Instant theme switching stored in local storage.
* **Robust Error Handling:** Custom 404 page, loading skeletons, and sonner toast alerts.

---

## 🛠️ Tech Stack & NPM Packages
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4, Lucide React, TW Animate CSS
* **Animation:** Motion (`motion/react` & `framer-motion`)
* **Authentication:** BetterAuth, `@better-auth/mongo-adapter`, Jose JWT
* **UI Components:** Shadcn UI, Sonner Toaster, Next Themes

---

## 🔑 Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_DB_URI=your_mongodb_connection_uri
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🚀 Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
