"use server";
import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';



export async function submitReview(formData: FormData) {
  try {
    const productId = formData.get('productId') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const comment = formData.get('comment') as string;
    const path = formData.get('path') as string;

    if (!productId || !rating || rating < 1 || rating > 5) {
      return { success: false, message: 'Invalid review data. Please provide a rating between 1 and 5.' };
    }

    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return { success: false, message: 'You must be logged in to submit a review.' };
    }

    // Ensure user exists in database since we are using Credentials auth without a DB adapter
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {
        name: session.user.name,
        image: session.user.image,
      },
      create: {
        name: session.user.name || 'User',
        email: session.user.email,
        image: session.user.image,
        role: 'USER',
      }
    });

    await prisma.review.create({
      data: {
        rating,
        comment,
        productId,
        userId: user.id,
      }
    });

    // Revalidate the product page so the new review appears instantly
    if (path) {
      revalidatePath(path);
    }

    return { success: true, message: 'Review submitted successfully!' };

  } catch (error) {
    console.error('Failed to submit review:', error);
    return { success: false, message: 'Failed to submit review. Please try again.' };
  }
}
