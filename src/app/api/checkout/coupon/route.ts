import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { code, productId } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        creatorApplication: true,
      },
    });

    if (!coupon) {
      return NextResponse.json(
        { valid: false, error: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    if (coupon.isUsed) {
      return NextResponse.json(
        { valid: false, error: 'This coupon has already been used' },
        { status: 400 }
      );
    }

    // If a productId is provided, check the coupon is valid for that product
    if (productId && coupon.productId !== productId) {
      return NextResponse.json(
        { valid: false, error: 'This coupon is not valid for the selected product' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      couponCode: coupon.code,
      discountPercent: coupon.discountPercent,
      productId: coupon.productId,
      creatorName: coupon.creatorApplication?.name,
    });
  } catch (error: any) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
