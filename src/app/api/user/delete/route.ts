import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Hard Delete: Because Prisma Schema has `onDelete: Cascade` on relations like Address, Orders, etc.
    // Wait, let's check schema. Orders doesn't have Cascade in the schema.
    // If it doesn't have Cascade, we must delete related items first or Prisma will throw a foreign key constraint error.
    
    // Delete Reviews
    await prisma.review.deleteMany({ where: { userId } });
    
    // Delete Addresses
    await prisma.address.deleteMany({ where: { userId } });
    
    // Delete Notification Settings
    await (prisma as any).notificationSettings.deleteMany({ where: { userId } });
    
    // Delete Orders and OrderItems
    const orders = await prisma.order.findMany({ where: { userId } });
    const orderIds = orders.map((o: any) => o.id);
    await prisma.orderItem.deleteMany({ where: { orderId: { in: orderIds } } });
    await prisma.order.deleteMany({ where: { userId } });

    // Finally, Delete the User
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ message: 'Account permanently deleted' });

  } catch (error) {
    console.error('Account Deletion Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
