import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';



export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id } = await context.params;
    const body = await req.json();

    // Verify ownership
    const existing = await prisma.address.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Address not found or unauthorized' }, { status: 404 });
    }

    const updatedAddress = await prisma.address.update({
      where: { id },
      data: {
        label: body.label,
        fullName: body.fullName,
        phone: body.phone,
        street: body.street,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        country: body.country,
        isDefault: body.isDefault,
      }
    });

    // Handle default switch
    if (updatedAddress.isDefault && !existing.isDefault) {
      await prisma.address.updateMany({
        where: { userId, id: { not: updatedAddress.id } },
        data: { isDefault: false },
      });
    }

    return NextResponse.json({ message: 'Address updated', address: updatedAddress });
  } catch (error) {
    console.error('Address Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id } = await context.params;

    const existing = await prisma.address.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Address not found or unauthorized' }, { status: 404 });
    }

    await prisma.address.delete({ where: { id } });

    return NextResponse.json({ message: 'Address deleted' });
  } catch (error) {
    console.error('Address Delete Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
