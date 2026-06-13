import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';



export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' }, // Show default address first
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error('Addresses Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    
    // Check how many addresses exist
    const count = await prisma.address.count({ where: { userId } });
    const isFirstAddress = count === 0;

    const newAddress = await prisma.address.create({
      data: {
        userId,
        label: body.label || 'Home',
        fullName: body.fullName || '',
        phone: body.phone || '',
        street: body.street,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        country: body.country || 'India',
        isDefault: body.isDefault || isFirstAddress, // Auto default if first
      }
    });

    // If making this new address the default, unset the old default
    if (newAddress.isDefault && !isFirstAddress) {
      await prisma.address.updateMany({
        where: { userId, id: { not: newAddress.id } },
        data: { isDefault: false },
      });
    }

    return NextResponse.json({ message: 'Address created', address: newAddress }, { status: 201 });
  } catch (error) {
    console.error('Address Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
