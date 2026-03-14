import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Booking } from '@/lib/models';
import { sendBookingConfirmation } from '@/lib/email';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { plan, projectType, budget, timeline, name, email, phone, city, message } = body;

    if (!plan || !projectType || !budget || !timeline || !name || !email || !phone || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await Booking.create({
      plan,
      projectType,
      budget,
      timeline,
      name,
      email,
      phone,
      city,
      message: message || '',
    });

    // Send confirmation email (non-blocking)
    sendBookingConfirmation({ name, email, plan, projectType }).catch(console.error);

    return NextResponse.json({ success: true, id: booking._id }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Booking.countDocuments(query),
    ]);

    return NextResponse.json({ bookings, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
