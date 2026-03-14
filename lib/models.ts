import mongoose, { Schema, model, models } from 'mongoose';

// ─── Admin ────────────────────────────────────────────────────────────────────
const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Admin' },
  },
  { timestamps: true }
);
export const Admin = models.Admin || model('Admin', AdminSchema);

// ─── Booking ──────────────────────────────────────────────────────────────────
const BookingSchema = new Schema(
  {
    plan: { type: String, enum: ['lite', 'pro', 'promax'], required: true },
    projectType: { type: String, required: true },
    budget: { type: String, required: true },
    timeline: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    message: { type: String, default: '' },
    inspirationImages: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'contacted', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    stripeSessionId: { type: String },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);
export const Booking = models.Booking || model('Booking', BookingSchema);

// ─── Contact Inquiry ──────────────────────────────────────────────────────────
const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);

// ─── Project / Portfolio ──────────────────────────────────────────────────────
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Commercial', 'Full Home'],
      required: true,
    },
    location: { type: String, required: true },
    budget: { type: String },
    timeline: { type: String },
    description: { type: String, required: true },
    challenge: { type: String },
    images: [{ type: String }],
    beforeImage: { type: String },
    afterImage: { type: String },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export const Project = models.Project || model('Project', ProjectSchema);

// ─── Visitor Analytics ────────────────────────────────────────────────────────
const VisitorSchema = new Schema(
  {
    sessionId: { type: String, required: true },
    ip: { type: String },
    country: { type: String },
    city: { type: String },
    device: { type: String, enum: ['desktop', 'mobile', 'tablet', 'unknown'], default: 'unknown' },
    browser: { type: String },
    os: { type: String },
    pages: [
      {
        path: String,
        title: String,
        enteredAt: Date,
        duration: Number, // seconds
      },
    ],
    referrer: { type: String },
    firstVisit: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
    totalVisits: { type: Number, default: 1 },
  },
  { timestamps: true }
);
export const Visitor = models.Visitor || model('Visitor', VisitorSchema);

// ─── Testimonial ─────────────────────────────────────────────────────────────
const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    project: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    photo: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);

// ─── Pricing Plan ─────────────────────────────────────────────────────────────
const PricingPlanSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String },
    price: { type: String, required: true },
    period: { type: String },
    features: [{ type: String }],
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    stripeProductId: { type: String },
    stripePriceId: { type: String },
  },
  { timestamps: true }
);
export const PricingPlan = models.PricingPlan || model('PricingPlan', PricingPlanSchema);
