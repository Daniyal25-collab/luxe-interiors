import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Project } from '@/lib/models';
import { requireAuth } from '@/lib/auth';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const project = await Project.findById(params.id).lean();
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const body = await request.json();
  const project = await Project.findByIdAndUpdate(params.id, body, { new: true }).lean();
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { authenticated } = requireAuth(request);
  if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  await Project.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
