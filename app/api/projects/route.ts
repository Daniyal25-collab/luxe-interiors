import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Project } from '@/lib/models';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  const query: any = { published: true };
  if (category && category !== 'All') query.category = category;
  if (featured === 'true') query.featured = true;

  const projects = await Project.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const body = await request.json();

  // Auto-generate slug
  if (!body.slug) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  try {
    const project = await Project.create(body);
    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
