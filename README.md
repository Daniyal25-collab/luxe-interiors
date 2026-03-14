# Luxe Interiors — Luxury Interior Design Platform

A complete, production-ready website platform for an interior design studio. Built with Next.js 14, Tailwind CSS, Framer Motion, MongoDB, and Stripe.

## ✨ Features

### Public Website
- **Home Page** — Full-screen hero, featured projects, about, testimonials, pricing, Instagram gallery, CTA
- **Portfolio** — Masonry grid with category filters, before/after comparisons, individual project pages
- **Services & Pricing** — 3-tier pricing cards (Lite / Pro / Pro Max) with feature comparison table
- **Multi-Step Booking** — Plan → Project details → Personal info → Review & payment (Stripe)
- **Contact** — Form with WhatsApp integration and Google Maps embed
- **AI Room Visualizer** — Upload room photo + choose style → AI generates design proposal

### Admin Dashboard
- **Analytics** — Visitor counts, daily trend charts, device breakdown, top pages
- **Bookings Manager** — View, filter and update booking status
- **Projects CRUD** — Add/edit/delete portfolio entries with images
- **Inquiries** — Read contact messages, mark read, reply by email

### Technical
- JWT authentication with HTTP-only cookies
- Admin route protection via Next.js middleware
- Visitor analytics tracking (device, browser, pages)
- Stripe payment processing + webhook confirmation
- Transactional email via Nodemailer
- SEO: metadata, Open Graph, sitemap, robots.txt
- TypeScript throughout

## 🚀 Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in .env.local values
npm run dev
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the complete setup guide.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Database | MongoDB + Mongoose |
| Auth | JWT (bcryptjs) |
| Payments | Stripe |
| Email | Nodemailer |
| Charts | Recharts |
| AI | OpenAI GPT-4o |
| Hosting | Vercel |

## 📁 Structure

```
app/          → Pages and API routes
components/   → UI, layout, and section components
lib/          → DB, auth, models, email utilities
hooks/        → useAnalytics
middleware.ts → Admin route protection
```

## 🎨 Design System

- **Display font:** Cormorant Garamond (luxury serif)
- **Body font:** Jost (clean sans-serif)
- **Accent font:** Cinzel (architectural caps)
- **Palette:** Ivory · Charcoal · Gold · Mink

## 📄 License

Private — for use by the project owner only.
