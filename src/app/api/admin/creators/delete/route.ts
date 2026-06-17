import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { applicationId } = body;

    if (!applicationId) {
      return NextResponse.json(
        { error: 'applicationId is required' },
        { status: 400 }
      );
    }

    const application = await prisma.creatorApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Delete application (Prisma Coupon relationship is set to Cascade on delete, so Coupon gets deleted automatically)
    await prisma.creatorApplication.delete({
      where: { id: applicationId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete creator application error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
