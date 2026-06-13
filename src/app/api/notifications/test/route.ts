import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { sendWelcomeNotification, sendOrderConfirmation } from '@/lib/notifications';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, name, type } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // Upsert a dummy user to ensure DB relations work for the log
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name, passwordHash: 'test' },
    });

    let result;

    if (type === 'welcome') {
      result = await sendWelcomeNotification(user.id, email, name);
    } else if (type === 'order') {
      result = await sendOrderConfirmation(
        user.id,
        email,
        name,
        `TEST-${Math.floor(Math.random() * 10000)}`,
        2498,
        [
          { name: "Monstera Albo", quantity: 1, price: 1999 },
          { name: "Ceramic Pot", quantity: 1, price: 499 }
        ]
      );
    } else {
      return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Test notification failed:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
