import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { sendOtpEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't leak whether the user exists or not for security reasons
      return NextResponse.json({ message: 'If an account exists, an OTP was sent.' });
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Upsert OTP (Delete old one if exists, create new)
    await prisma.oTP.upsert({
      where: { email },
      update: { code: otpCode, expiresAt, createdAt: new Date() },
      create: { email, code: otpCode, expiresAt },
    });

    // Send email using centralized service
    await sendOtpEmail(email, otpCode);

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
