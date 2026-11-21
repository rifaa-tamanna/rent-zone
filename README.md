# RentZone – Equipment Rental Platform

RentZone is a full-stack equipment rental platform that allows users to explore equipment, manage rental listings, and connect equipment owners with customers. The platform is designed to make equipment rental easier, more accessible, and more convenient.

## Live Website

- **Frontend:** https://rentt-zone.vercel.app/
- **Backend API:** https://rent-zone-server.vercel.app/

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- React Hot Toast / Sonner
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth JWT verification
- ImgBB API for image hosting

## Key Features

- User authentication and authorization
- Google authentication
- Role-based access for customers and equipment owners
- Browse and explore equipment listings
- Equipment listing management
- Add new equipment with multiple image uploads
- Edit and delete equipment listings
- View detailed equipment information
- Owner dashboard
- Search and manage personal equipment listings
- Protected routes and API endpoints
- Responsive user interface

## Owner Dashboard

Equipment owners can:
- Add new equipment listings
- Upload equipment images
- View their listed equipment
- Update equipment information
- Delete equipment listings
- View equipment details

## Authentication & Security

- Better Auth for authentication
- JWT-based API authorization
- Protected backend routes
- Role-based access control
- Secure owner-specific equipment management

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rifaa-tamanna/rent-zone
```

### 2. Frontend Setup

```bash
cd rent-zone
npm install
npm run dev
```

### 3. Backend Setup

Open another terminal:

```bash
cd rent-zone-server
npm install
index.js
```

## Environment Variables

Configure the required environment variables in the respective `.env` files.

**Frontend (`.env.local`)**

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_DB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Backend (`.env`)**

```env
PORT=
MONGODB_URI=
BETTER_AUTH_BASE_URL=
IMGBB_API_KEY=
```

Never commit your actual `.env` files or expose secret API keys.

## Project Structure

```text
rent-zone/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── public/
├── package.json
└── README.md

rent-zone-server/
├── middleware/
├── routes/
├── index.js
├── package.json
└── .env
```

## Important NPM Packages

### Frontend
- `next`
- `react`
- `react-dom`
- `better-auth`
- `mongodb`
- `sonner`
- `lucide-react`
- `tailwindcss`
- `next-themes`

### Backend
- `express`
- `mongodb`
- `jose`
- `multer`
- `dotenv`
- `cors`

## Author

**rifaa-tamanna**

---

*RentZone – Making Equipment Rental Simple and Accessible.*
