import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Visitor } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { sessionId, path, title, device, browser, os, referrer } = body;

    if (!sessionId) return NextResponse.json({ ok: true });

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const existing = await Visitor.findOne({ sessionId });

    if (existing) {
      // Add page visit
      existing.pages.push({
        path,
        title,
        enteredAt: new Date(),
        duration: 0,
      });
      existing.lastVisit = new Date();
      existing.totalVisits += 1;
      await existing.save();
    } else {
      // New visitor
      await Visitor.create({
        sessionId,
        ip,
        device: device || 'unknown',
        browser,
        os,
        referrer,
        pages: [{ path, title, enteredAt: new Date(), duration: 0 }],
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Silent fail — don't break user experience
    return NextResponse.json({ ok: true });
  }
}
