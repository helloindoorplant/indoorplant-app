import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';



export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { 
        items: {
          include: {
            product: true
          }
        } 
      }
    });

    const formattedOrders = orders.map((order: any) => ({
      id: order.id.slice(-6).toUpperCase(), // Using last 6 chars for brevity
      date: order.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: order.status,
      total: order.totalAmount,
      items: order.items.map((item: any) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price
      })),
      trackingNo: order.paymentId || "Pending"
    }));

    return NextResponse.json({ orders: formattedOrders });

  } catch (error) {
    console.error('Orders Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
