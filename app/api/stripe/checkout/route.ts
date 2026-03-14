import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '@/lib/db';
import { Booking } from '@/lib/models';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

const planPrices: Record<string, { name: string; amount: number }> = {
  lite: { name: 'Lite Plan', amount: 2999900 },    // ₹29,999 in paise
  pro: { name: 'Pro Plan', amount: 7999900 },       // ₹79,999
  promax: { name: 'Pro Max Plan', amount: 24999900 }, // ₹2,49,999
};

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json();

    await connectDB();
    const booking = await Booking.findById(bookingId);
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

    const plan = planPrices[booking.plan];
    if (!plan) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: booking.email,
      metadata: { bookingId: bookingId.toString() },
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `Luxe Interiors — ${plan.name}`,
              description: `Interior design consultation for ${booking.projectType} in ${booking.city}`,
            },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking`,
    });

    // Save session ID
    booking.stripeSessionId = session.id;
    await booking.save();

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
