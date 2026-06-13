import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import WelcomeTemplate from '@/emails/WelcomeTemplate';


// We use a safe fallback so the server doesn't crash if RESEND_API_KEY is missing
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { 
        email, 
        passwordHash,
        name: name || email.split('@')[0] // Default name if not provided
      }
    });

    // Send Welcome Email
    if (process.env.RESEND_API_KEY) {
      resend.emails.send({
        from: 'IndoorPlant <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to IndoorPlant! Here is your 5% gift 🌿',
        react: WelcomeTemplate({ userFirstname: user.name as string }),
      }).catch(err => console.error("Failed to send welcome email", err));
    }

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
