import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const hubs = await prisma.cityHub.findMany({ orderBy: { batchNumber: 'asc' } });
  return NextResponse.json(hubs);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { slug, ...data } = body;
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  const hub = await prisma.cityHub.update({ where: { slug }, data });
  revalidatePath(`/plants/${slug}`);
  return NextResponse.json(hub);
}
