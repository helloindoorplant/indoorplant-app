import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { 
      items, 
      shippingAddr, 
      totalAmount, 
      paymentId, 
      razorpayOrderId, 
      signature,
      email,
      name,
      isCreatorOrder,
      couponCode
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Resolve User ID
    let userId = session?.user?.id;

    if (!userId && email) {
      // Guest Checkout: Find or create user
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: name || 'Guest User',
          }
        });
      }
      userId = user.id;
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID or Email is required to create an order' }, { status: 400 });
    }

    // Construct shipping address string if it's an object
    const addressStr = typeof shippingAddr === 'string' 
      ? shippingAddr 
      : `${shippingAddr.fullName}, ${shippingAddr.address1}${shippingAddr.address2 ? ', ' + shippingAddr.address2 : ''}, ${shippingAddr.city}, ${shippingAddr.state} - ${shippingAddr.pincode}. Phone: ${shippingAddr.phone}`;

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        paymentId,
        orderId: razorpayOrderId,
        signature,
        shippingAddr: addressStr,
        isCreatorOrder: !!isCreatorOrder,
        couponCode,
        status: isCreatorOrder ? 'CONFIRMED' : (paymentId ? 'PAID' : 'PENDING'),
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            potColor: item.potColor
          }))
        }
      }
    });

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (error: any) {
    console.error('Failed to save order:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
