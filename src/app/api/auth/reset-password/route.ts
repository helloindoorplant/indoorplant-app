import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';



export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: 'Email, OTP, and new password are required' }, { status: 400 });
    }

    // Find OTP
    const otpRecord = await prisma.oTP.findUnique({ where: { email } });
    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Check expiration
    if (new Date() > otpRecord.expiresAt) {
      await prisma.oTP.delete({ where: { email } });
      return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Check match
    if (otpRecord.code !== otp) {
      return NextResponse.json({ error: 'Incorrect OTP' }, { status: 400 });
    }

    // Update password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { passwordHash },
    });

    // Delete OTP so it can't be reused
    await prisma.oTP.delete({ where: { email } });

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
