import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Booking, Inquiry, Visitor, Project } from '@/lib/models';
import { requireAuth } from '@/lib/auth';
import { startOfDay, subDays } from 'date-fns';

export async function GET(request: NextRequest) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();

  const today = startOfDay(new Date());
  const sevenDaysAgo = subDays(today, 7);
  const thirtyDaysAgo = subDays(today, 30);

  const [
    totalVisitors,
    todayVisitors,
    totalBookings,
    pendingBookings,
    totalInquiries,
    unreadInquiries,
    totalProjects,
    recentBookings,
    // Revenue (paid bookings)
    paidBookings,
    // Visitor chart data (last 7 days)
    visitorChart,
  ] = await Promise.all([
    Visitor.countDocuments(),
    Visitor.countDocuments({ lastVisit: { $gte: today } }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ read: false }),
    Project.countDocuments({ published: true }),
    Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
    Booking.find({ paymentStatus: 'paid' }).lean(),
    // Group visitors by day for the last 7 days
    Visitor.aggregate([
      { $match: { lastVisit: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$lastVisit' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  // Calculate revenue
  const planPrices: Record<string, number> = {
    lite: 29999,
    pro: 79999,
    promax: 249999,
  };
  const totalRevenue = paidBookings.reduce(
    (sum: number, b: any) => sum + (planPrices[b.plan] || 0),
    0
  );

  return NextResponse.json({
    stats: {
      totalVisitors,
      todayVisitors,
      totalBookings,
      pendingBookings,
      totalInquiries,
      unreadInquiries,
      totalProjects,
      totalRevenue,
    },
    recentBookings,
    visitorChart,
  });
}
