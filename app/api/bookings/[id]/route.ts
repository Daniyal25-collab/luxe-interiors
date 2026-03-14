import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Booking } from '@/lib/models';
import { requireAuth } from '@/lib/auth';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const body = await request.json();
  const booking = await Booking.findByIdAndUpdate(params.id, body, { new: true }).lean();
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ booking });
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { authenticated } = requireAuth(_);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const booking = await Booking.findById(params.id).lean();
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ booking });
}
