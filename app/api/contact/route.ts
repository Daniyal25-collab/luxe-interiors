import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Inquiry } from '@/lib/models';
import { sendContactNotification } from '@/lib/email';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }

    const inquiry = await Inquiry.create({ name, email, phone, subject, message });

    // Notify admin
    sendContactNotification({ name, email, subject, message }).catch(console.error);

    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query = read !== null ? { read: read === 'true' } : {};
    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Inquiry.countDocuments(query),
    ]);

    return NextResponse.json({ inquiries, total });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
