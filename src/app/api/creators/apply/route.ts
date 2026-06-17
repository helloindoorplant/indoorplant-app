import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendCreatorWelcomeEmail, sendAdminCreatorNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, instagram, facebook, note, productId } = body;

    // Validate required fields
    if (!name || !email || !phone || !instagram || !productId) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Fetch the selected product to get its name and image
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { name: true, images: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Selected plant not found' },
        { status: 404 }
      );
    }

    // Parse the first image from the JSON string array
    let productImage: string | null = null;
    try {
      const imgs = JSON.parse(product.images);
      productImage = Array.isArray(imgs) && imgs.length > 0 ? imgs[0] : null;
    } catch {
      productImage = null;
    }

    // Check for duplicate applications (same email + same product)
    const existing = await prisma.creatorApplication.findFirst({
      where: {
        email,
        productId,
        status: { not: 'REJECTED' },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You already have a pending or approved application for this plant.' },
        { status: 409 }
      );
    }

    // Create the application
    const application = await prisma.creatorApplication.create({
      data: {
        name,
        email,
        phone,
        instagram: instagram.replace('@', ''),
        facebook: facebook || null,
        note: note || null,
        productId,
        productName: product.name,
        productImage,
        status: 'PENDING',
      },
    });

    // Send emails (non-blocking)
    Promise.all([
      sendCreatorWelcomeEmail(email, name, product.name),
      sendAdminCreatorNotification(name, instagram, product.name, email, phone, facebook || ''),
    ]).catch((err) => {
      console.error('Error sending creator emails:', err);
    });

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully!',
    });
  } catch (error: any) {
    console.error('Creator application error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
