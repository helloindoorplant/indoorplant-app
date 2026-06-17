import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { 
  sendCreatorApprovalEmail, 
  sendCreatorRejectionEmail, 
  sendCreatorPendingEmail 
} from '@/lib/email';
import { nanoid } from 'nanoid';

function generateCouponCode(productName: string): string {
  // Create a readable coupon: CREATOR-<first 4 chars of product>-<random 6 chars>
  const prefix = productName
    .replace(/[^a-zA-Z]/g, '')
    .substring(0, 4)
    .toUpperCase();
  const random = nanoid(6).toUpperCase();
  return `CREATOR-${prefix}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { applicationId, action } = body;

    if (!applicationId || !action) {
      return NextResponse.json(
        { error: 'applicationId and action are required' },
        { status: 400 }
      );
    }

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(action)) {
      return NextResponse.json(
        { error: 'action must be APPROVED, REJECTED, or PENDING' },
        { status: 400 }
      );
    }

    const application = await prisma.creatorApplication.findUnique({
      where: { id: applicationId },
      include: { coupon: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    if (action === 'REJECTED') {
      await prisma.creatorApplication.update({
        where: { id: applicationId },
        data: { status: 'REJECTED' },
      });

      sendCreatorRejectionEmail(
        application.email,
        application.name,
        application.productName
      ).catch((err) => {
        console.error('Error sending creator rejection email:', err);
      });

      return NextResponse.json({ success: true, status: 'REJECTED' });
    }

    if (action === 'PENDING') {
      await prisma.creatorApplication.update({
        where: { id: applicationId },
        data: { status: 'PENDING' },
      });

      sendCreatorPendingEmail(
        application.email,
        application.name,
        application.productName
      ).catch((err) => {
        console.error('Error sending creator pending email:', err);
      });

      return NextResponse.json({ success: true, status: 'PENDING' });
    }

    if (action === 'APPROVED') {
      // If coupon already exists, reuse it. Otherwise generate a new one.
      let couponCode = application.coupon?.code;
      if (!couponCode) {
        couponCode = generateCouponCode(application.productName);
        await prisma.$transaction([
          prisma.creatorApplication.update({
            where: { id: applicationId },
            data: { status: 'APPROVED' },
          }),
          prisma.coupon.create({
            data: {
              code: couponCode,
              discountPercent: 100,
              productId: application.productId,
              creatorApplicationId: applicationId,
            },
          }),
        ]);
      } else {
        await prisma.creatorApplication.update({
          where: { id: applicationId },
          data: { status: 'APPROVED' },
        });
      }

      // Send approval email
      sendCreatorApprovalEmail(
        application.email,
        application.name,
        application.productName,
        couponCode
      ).catch((err) => {
        console.error('Error sending creator approval email:', err);
      });

      return NextResponse.json({
        success: true,
        status: 'APPROVED',
        couponCode,
      });
    }

    return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
  } catch (error: any) {
    console.error('Creator status transition error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
