import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Inquiry } from '@/lib/models';
import { requireAuth } from '@/lib/auth';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const body = await request.json();
  const inquiry = await Inquiry.findByIdAndUpdate(params.id, body, { new: true }).lean();
  if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ inquiry });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  await Inquiry.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
