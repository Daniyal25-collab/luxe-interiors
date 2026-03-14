import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getAuthToken(): string | null {
  try {
    const cookieStore = cookies();
    return cookieStore.get('admin_token')?.value ?? null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;
  try {
    verifyToken(token);
    return true;
  } catch {
    return false;
  }
}

export function requireAuth(request: NextRequest): { authenticated: boolean; user?: any } {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return { authenticated: false };
  try {
    const user = verifyToken(token);
    return { authenticated: true, user };
  } catch {
    return { authenticated: false };
  }
}
