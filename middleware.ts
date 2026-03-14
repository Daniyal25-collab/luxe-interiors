import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const PROTECTED_PATHS = ['/admin/dashboard', '/admin/projects', '/admin/bookings', '/admin/inquiries', '/admin/analytics'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect admin routes (not login page)
  const isProtectedAdmin = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (isProtectedAdmin) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
