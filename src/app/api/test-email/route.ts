import { NextResponse } from 'next/server';
import { sendWelcomeEmail, sendOrderConfirmationEmail } from '@/lib/email';

// Make sure to add RESEND_API_KEY to your .env.local file!

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to') || 'helloindoorplant@gmail.com';
  const type = searchParams.get('type') || 'welcome';

  try {
    let result;
    
    if (type === 'welcome') {
      result = await sendWelcomeEmail(to, 'Suman');
    } else if (type === 'order') {
      result = await sendOrderConfirmationEmail(to, 'Suman', 'ORD-123456', 1498, [
        { name: "Monstera Deliciosa", quantity: 1, price: 999 },
        { name: "Snake Plant", quantity: 1, price: 499 }
      ]);
    }

    if (result?.success) {
      return NextResponse.json({ message: `Successfully sent ${type} email to ${to}!`, data: result.data });
    } else {
      return NextResponse.json({ message: 'Failed to send email', error: result?.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
