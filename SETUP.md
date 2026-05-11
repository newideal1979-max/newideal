# New Ideal Stitching & Cutting Institute — Setup Guide

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Razorpay account (for payments)

---

## Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, Razorpay keys

# Seed initial data (admin user, courses, batches, testimonials)
npm run seed

# Start development server
npm run dev
# Server runs on http://localhost:5000
```

### .env values to fill:
| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Any random long string |
| `RAZORPAY_KEY_ID` | From Razorpay dashboard |
| `RAZORPAY_KEY_SECRET` | From Razorpay dashboard |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

---

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local

# Start development server
npm run dev
# Website runs on http://localhost:3000
```

---

## Quick Start (Both together)

```bash
# Terminal 1 — Backend
cd backend && npm install && npm run seed && npm run dev

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

---

## Project Structure

```
new-ideal-institute/
├── backend/
│   ├── server.js                    # Express app entry
│   ├── src/
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Enrollment.js
│   │   │   ├── Payment.js
│   │   │   ├── Testimonial.js
│   │   │   ├── Batch.js
│   │   │   └── AdminSettings.js
│   │   ├── routes/                  # API routes
│   │   │   ├── auth.js              # POST /signup, POST /login, GET /me
│   │   │   ├── courses.js           # GET /courses, GET /courses/:slug
│   │   │   ├── enrollments.js       # GET /my-enrollments
│   │   │   ├── payments.js          # POST /create-order, POST /verify
│   │   │   ├── testimonials.js      # GET /testimonials
│   │   │   ├── batches.js           # GET /batches
│   │   │   └── admin.js             # Admin analytics + management
│   │   └── middleware/
│   │       └── auth.js              # JWT protect + adminOnly
│
└── frontend/
    └── src/
        ├── app/
        │   ├── page.tsx             # Home page (all sections)
        │   ├── layout.tsx           # Root layout
        │   ├── globals.css          # Design system CSS
        │   ├── (auth)/
        │   │   ├── login/page.tsx   # Login page
        │   │   └── signup/page.tsx  # Signup page
        │   ├── dashboard/page.tsx   # Student dashboard
        │   └── admin/page.tsx       # Admin panel
        ├── components/sections/
        │   ├── Navbar.tsx           # Sticky glassmorphism navbar
        │   ├── Hero.tsx             # Cinematic hero section
        │   ├── Stats.tsx            # Animated stats counter
        │   ├── About.tsx            # Institute story
        │   ├── Courses.tsx          # Course cards (Men's + Women's)
        │   ├── Curriculum.tsx       # Accordion curriculum timeline
        │   ├── WhyNewIdeal.tsx      # Trust features grid
        │   ├── StudentResults.tsx   # Transformations + gallery
        │   ├── Instructor.tsx       # Tosif Ahmed Mansuri profile
        │   ├── BatchAnnouncement.tsx# Live countdown + seat tracker
        │   ├── Testimonials.tsx     # Auto-rotating slider
        │   ├── FAQ.tsx              # Accordion FAQ
        │   ├── Contact.tsx          # Map + inquiry form
        │   └── Footer.tsx           # Elegant dark footer
        ├── contexts/
        │   └── AuthContext.tsx      # JWT auth state
        └── lib/
            └── api.ts               # Axios client + all API calls
```

---

## Admin Panel
- URL: `http://localhost:3000/admin`
- Login: `admin@newideal.in` / `admin123`
- Features: Dashboard analytics, Students, Enrollments, Payments, Testimonials, Settings

## API Base URL
`http://localhost:5000/api`

### Key Endpoints:
- `POST /auth/signup` — Register new user
- `POST /auth/login` — Login → JWT token
- `GET /auth/me` — Get current user (auth required)
- `GET /courses` — All active courses
- `GET /batches?courseId=...` — Available batches
- `POST /payments/create-order` — Create Razorpay order
- `POST /payments/verify` — Verify payment + create enrollment
- `GET /enrollments/my-enrollments` — Student's enrollments
- `GET /admin/dashboard` — Admin stats + analytics

---

## Design System
| Token | Value |
|-------|-------|
| Background | `#020617` |
| Primary | `#0F172A` (Deep Navy) |
| Accent | `#D4AF37` (Luxury Gold) |
| Light | `#F8FAFC` (Soft White) |
| Font Heading | Poppins |
| Font Body | Inter |
