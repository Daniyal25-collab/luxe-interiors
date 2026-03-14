# Luxe Interiors — Complete Deployment Guide

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Local Development Setup](#2-local-development-setup)
3. [MongoDB Setup (Atlas)](#3-mongodb-setup-atlas)
4. [Stripe Integration](#4-stripe-integration)
5. [Email Setup (Gmail SMTP)](#5-email-setup-gmail-smtp)
6. [OpenAI Setup (AI Visualizer)](#6-openai-setup-ai-visualizer)
7. [Deploy to Vercel](#7-deploy-to-vercel)
8. [Post-Deploy Checklist](#8-post-deploy-checklist)
9. [Admin First Login](#9-admin-first-login)
10. [Folder Structure Reference](#10-folder-structure-reference)
11. [Database Schema Reference](#11-database-schema-reference)
12. [API Routes Reference](#12-api-routes-reference)

---

## 1. Prerequisites

Make sure you have installed:
- **Node.js** 18.x or 20.x
- **npm** 9+ or **pnpm** 8+
- **Git**

Accounts required:
- [MongoDB Atlas](https://cloud.mongodb.com) — free tier works
- [Stripe](https://stripe.com) — for payments
- [Vercel](https://vercel.com) — for hosting
- [Gmail](https://gmail.com) — for transactional email (or any SMTP)
- [OpenAI](https://platform.openai.com) — optional, for AI Visualizer

---

## 2. Local Development Setup

```bash
# 1. Clone / extract the project
cd luxe-interiors

# 2. Install dependencies
npm install

# 3. Copy env file
cp .env.example .env.local

# 4. Fill in .env.local (see sections below for each value)

# 5. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 3. MongoDB Setup (Atlas)

### Create a Free Cluster

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free **M0** cluster (region closest to your users)
3. Create a database user:
   - Username: `luxe_user`
   - Password: generate a secure password
4. Add your IP to the allowlist (or `0.0.0.0/0` for Vercel deploy)
5. Click **Connect → Drivers** and copy the connection string

```
mongodb+srv://luxe_user:<password>@cluster0.xxxxx.mongodb.net/luxe-interiors?retryWrites=true&w=majority
```

6. Add to `.env.local`:
```
MONGODB_URI=mongodb+srv://luxe_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/luxe-interiors
```

### Seed the Admin Account

```bash
# Install ts-node if needed
npm install -g ts-node

# Run the seed script
MONGODB_URI="your_connection_string" npx ts-node --project tsconfig.json scripts/seed.ts
```

This creates:
- **Email:** admin@luxeinteriors.com
- **Password:** Admin@Luxe2024!
- ⚠️ Change this password after first login!

---

## 4. Stripe Integration

### Setup Stripe Account

1. Create account at [stripe.com](https://stripe.com)
2. Go to **Developers → API Keys**
3. Copy your **Publishable key** and **Secret key**

```
STRIPE_SECRET_KEY=sk_live_...            # or sk_test_... for testing
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Stripe Webhooks (for payment confirmation)

1. In Stripe dashboard → **Developers → Webhooks**
2. Click **Add endpoint**
3. URL: `https://yourdomain.com/api/stripe/webhook`
4. Select event: `checkout.session.completed`
5. Copy the **Signing secret**

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Test with Stripe CLI (local)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local dev
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Test payment (use card: 4242 4242 4242 4242)
```

### Pricing Configuration

Prices are configured in `app/api/stripe/checkout/route.ts`:

```typescript
const planPrices = {
  lite:    { name: 'Lite Plan',     amount: 2999900  },  // ₹29,999
  pro:     { name: 'Pro Plan',      amount: 7999900  },  // ₹79,999
  promax:  { name: 'Pro Max Plan',  amount: 24999900 },  // ₹2,49,999
};
```

Update `amount` (in paise — multiply INR by 100) to change pricing.

---

## 5. Email Setup (Gmail SMTP)

### Enable App Password on Gmail

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** (required)
3. Go to **Security → App passwords**
4. Select **Mail** + **Other device** → Generate
5. Copy the 16-character password

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx    # 16-char app password (no spaces)
EMAIL_FROM=Luxe Interiors <noreply@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com
```

### Alternative: SendGrid / Resend

For production, consider [Resend](https://resend.com) (free 3k emails/month):

```typescript
// Replace nodemailer config in lib/email.ts:
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
```

---

## 6. OpenAI Setup (AI Visualizer)

1. Create account at [platform.openai.com](https://platform.openai.com)
2. Go to **API keys** → Create new key
3. Add to `.env.local`:

```
OPENAI_API_KEY=sk-proj-...
```

The AI Visualizer uses **GPT-4o** (supports vision). 
Cost: ~$0.01–0.05 per generation.

If you don't want to enable AI features, the page at `/ai-visualizer` can simply be removed from `Navbar.tsx`.

---

## 7. Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Luxe Interiors"
git remote add origin https://github.com/yourusername/luxe-interiors.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: leave empty (or `/`)

### Step 3 — Add Environment Variables

In Vercel dashboard → **Settings → Environment Variables**, add every variable from `.env.example`:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your Atlas connection string |
| `JWT_SECRET` | Random 64-char string |
| `STRIPE_SECRET_KEY` | sk_live_... |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | pk_live_... |
| `STRIPE_WEBHOOK_SECRET` | whsec_... |
| `SMTP_HOST` | smtp.gmail.com |
| `SMTP_PORT` | 587 |
| `SMTP_USER` | your@gmail.com |
| `SMTP_PASS` | app_password |
| `EMAIL_FROM` | Luxe Interiors \<noreply@domain.com\> |
| `ADMIN_EMAIL` | admin@domain.com |
| `NEXT_PUBLIC_APP_URL` | https://yourdomain.com |
| `OPENAI_API_KEY` | sk-proj-... (optional) |

Generate `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4 — Deploy

Click **Deploy**. First deploy takes ~2–3 minutes.

### Step 5 — Custom Domain

1. Vercel → **Settings → Domains**
2. Add your domain (e.g. `luxeinteriors.com`)
3. Update DNS records at your registrar:
   - `A` record → `76.76.21.21`
   - `CNAME www` → `cname.vercel-dns.com`

### Step 6 — Update Stripe Webhook URL

After deploying, update your Stripe webhook endpoint URL from `localhost:3000` to `https://yourdomain.com/api/stripe/webhook`.

---

## 8. Post-Deploy Checklist

```
□ MongoDB Atlas IP whitelist includes 0.0.0.0/0 (for Vercel)
□ Admin seeded via scripts/seed.ts
□ Admin password changed after first login
□ Stripe webhook pointing to production URL
□ All environment variables set in Vercel
□ Custom domain connected and SSL active
□ Test full booking flow (test mode Stripe card: 4242...)
□ Test contact form (check admin email notification)
□ Test admin login at /admin/login
□ Verify /sitemap.xml accessible
□ Update NEXT_PUBLIC_APP_URL to match real domain
□ Add real project images via admin dashboard
□ Update placeholder Instagram token (or remove InstagramGallery)
```

---

## 9. Admin First Login

1. Visit `https://yourdomain.com/admin/login`
2. Email: `admin@luxeinteriors.com`
3. Password: `Admin@Luxe2024!`

### First-time admin tasks:
- Upload portfolio projects via **Admin → Projects → Add Project**
- Review and mark-read any test bookings
- Verify analytics tracking is firing (visit the site then check **Admin → Analytics**)

---

## 10. Folder Structure Reference

```
luxe-interiors/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, analytics)
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # robots.txt
│   │
│   ├── portfolio/
│   │   ├── page.tsx              # Portfolio grid with filter
│   │   └── [id]/page.tsx         # Individual project page
│   │
│   ├── pricing/page.tsx          # Services & pricing page
│   ├── booking/
│   │   ├── page.tsx              # Multi-step booking form
│   │   └── success/page.tsx      # Post-payment success
│   ├── contact/page.tsx          # Contact form + map
│   ├── ai-visualizer/page.tsx    # AI room design tool
│   │
│   ├── admin/
│   │   ├── layout.tsx            # Admin sidebar layout
│   │   ├── login/page.tsx        # Admin login
│   │   ├── dashboard/page.tsx    # Stats overview
│   │   ├── projects/page.tsx     # CRUD portfolio projects
│   │   ├── bookings/page.tsx     # View + manage bookings
│   │   ├── inquiries/page.tsx    # Contact messages
│   │   └── analytics/page.tsx    # Visitor charts
│   │
│   └── api/
│       ├── admin/
│       │   ├── login/route.ts    # POST /api/admin/login
│       │   ├── logout/route.ts   # POST /api/admin/logout
│       │   └── analytics/route.ts # GET dashboard stats
│       ├── bookings/
│       │   ├── route.ts          # GET + POST bookings
│       │   └── [id]/route.ts     # GET + PATCH single booking
│       ├── contact/
│       │   ├── route.ts          # GET + POST inquiries
│       │   └── [id]/route.ts     # PATCH + DELETE inquiry
│       ├── projects/
│       │   ├── route.ts          # GET + POST projects
│       │   └── [id]/route.ts     # GET + PUT + DELETE project
│       ├── analytics/
│       │   └── track/route.ts    # POST visitor tracking
│       ├── stripe/
│       │   ├── checkout/route.ts # Create Stripe session
│       │   └── webhook/route.ts  # Stripe webhook handler
│       └── ai-visualizer/route.ts # AI design generation
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky nav with mobile menu
│   │   └── Footer.tsx            # Full footer with links
│   ├── sections/
│   │   ├── HeroSection.tsx       # Full-screen hero
│   │   ├── MarqueeStrip.tsx      # Scrolling text strip
│   │   ├── FeaturedProjects.tsx  # Masonry project grid
│   │   ├── AboutSection.tsx      # Designer bio
│   │   ├── TestimonialsSection.tsx # Carousel testimonials
│   │   ├── PricingSection.tsx    # 3-column pricing cards
│   │   ├── InstagramGallery.tsx  # Instagram-style grid
│   │   └── CtaSection.tsx        # Full-width CTA
│   ├── ui/
│   │   ├── Button.tsx            # Reusable button component
│   │   └── SectionHeading.tsx    # Reusable section header
│   └── AnalyticsProvider.tsx     # Client analytics wrapper
│
├── hooks/
│   └── useAnalytics.ts           # Visitor tracking hook
│
├── lib/
│   ├── db.ts                     # MongoDB connection
│   ├── auth.ts                   # JWT helpers
│   ├── models.ts                 # All Mongoose schemas
│   └── email.ts                  # Nodemailer email helpers
│
├── middleware.ts                 # Admin route protection
├── scripts/seed.ts               # Admin account seeder
├── styles/globals.css            # Global CSS + Tailwind
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── .env.example
```

---

## 11. Database Schema Reference

### Admin
```
email (String, unique)  password (hashed)  name (String)
```

### Booking
```
plan: 'lite' | 'pro' | 'promax'
projectType, budget, timeline
name, email, phone, city, message
status: 'pending' | 'contacted' | 'active' | 'completed' | 'cancelled'
paymentStatus: 'unpaid' | 'paid'
stripeSessionId
```

### Inquiry (Contact)
```
name, email, phone, subject, message
read: Boolean    replied: Boolean
```

### Project
```
title, slug (unique), category, location, budget, timeline
description, challenge
images: String[]    beforeImage, afterImage
featured: Boolean   published: Boolean   sortOrder: Number
```

### Visitor
```
sessionId (unique per session)
ip, country, city
device: 'desktop' | 'mobile' | 'tablet'
browser, os, referrer
pages: [{ path, title, enteredAt, duration }]
firstVisit, lastVisit, totalVisits
```

---

## 12. API Routes Reference

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/admin/login | — | Admin login, sets cookie |
| POST | /api/admin/logout | — | Clears auth cookie |
| GET | /api/admin/analytics | ✓ | Dashboard stats |
| GET | /api/bookings | ✓ | List bookings |
| POST | /api/bookings | — | Create booking |
| PATCH | /api/bookings/[id] | ✓ | Update booking status |
| GET | /api/contact | ✓ | List inquiries |
| POST | /api/contact | — | Submit contact form |
| PATCH | /api/contact/[id] | ✓ | Mark read/replied |
| GET | /api/projects | — | Public project list |
| POST | /api/projects | ✓ | Create project |
| PUT | /api/projects/[id] | ✓ | Update project |
| DELETE | /api/projects/[id] | ✓ | Delete project |
| POST | /api/analytics/track | — | Track page visit |
| POST | /api/stripe/checkout | — | Create Stripe session |
| POST | /api/stripe/webhook | — | Stripe events |
| POST | /api/ai-visualizer | — | AI design suggestion |

✓ = Requires admin JWT cookie

---

## Support & Customisation

### Changing Brand Name / Designer Name
- Search and replace `Luxe Interiors` → your studio name
- Replace `Priya Sharma` → your name  
- Update contact details in `Footer.tsx` and `contact/page.tsx`

### Changing Prices
- Update display prices in `components/sections/PricingSection.tsx`
- Update Stripe amounts in `app/api/stripe/checkout/route.ts` (values are in paise)

### Adding Instagram Live Feed
Replace mock data in `InstagramGallery.tsx` with real API call:
```typescript
const res = await fetch(
  `https://graph.instagram.com/me/media?fields=id,media_url,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
);
```

### Connecting a CMS (Contentful / Sanity)
The `Project` model in `lib/models.ts` maps directly to most CMS content models. Replace MongoDB queries in `app/api/projects/route.ts` with your CMS SDK calls.
