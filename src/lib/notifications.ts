import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { WelcomeTemplate } from '@/emails/WelcomeTemplate';
import { OrderPlacedTemplate } from '@/emails/OrderPlacedTemplate';

// Initialize Resend
// In a real app, you would use process.env.RESEND_API_KEY
// Fallback is provided to prevent crashes during local dev without an API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');



/**
 * Helper to log notifications to the database
 */
async function logNotification(userId: string, type: string, subject: string, status: string) {
  try {
    await prisma.notificationLog.create({
      data: {
        userId,
        type,
        subject,
        status,
      }
    });
  } catch (error) {
    console.error('Failed to log notification:', error);
  }
}

/**
 * Helper to check user preferences
 */
async function canSend(userId: string, channel: 'emailEnabled' | 'pushEnabled') {
  try {
    const settings = await prisma.notificationSettings.findUnique({
      where: { userId }
    });
    
    // Default to true if settings don't exist yet
    if (!settings) return true;
    
    return settings[channel];
  } catch (error) {
    return true; // Failsafe
  }
}

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeNotification(userId: string, email: string, name: string) {
  const allowEmail = await canSend(userId, 'emailEnabled');
  
  if (!allowEmail) {
    console.log(`Email disabled for user ${userId}`);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'IndoorPlant.in <hello@indoorplant.in>', // Note: In production this must be a verified domain
      to: email,
      subject: 'Welcome to IndoorPlant.in! 🌱',
      react: WelcomeTemplate({ userFirstname: name.split(' ')[0] }) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      await logNotification(userId, 'EMAIL', 'Welcome Email', 'FAILED');
      return { success: false, error };
    }

    await logNotification(userId, 'EMAIL', 'Welcome Email', 'SENT');
    return { success: true, data };
  } catch (error) {
    console.error('Exception sending welcome email:', error);
    await logNotification(userId, 'EMAIL', 'Welcome Email', 'FAILED');
    return { success: false, error };
  }
}

/**
 * Send an order confirmation email
 */
export async function sendOrderConfirmation(
  userId: string, 
  email: string, 
  name: string,
  orderId: string,
  orderTotal: number,
  items: Array<{ name: string; quantity: number; price: number }>
) {
  const allowEmail = await canSend(userId, 'emailEnabled');
  
  if (!allowEmail) {
    console.log(`Email disabled for user ${userId}`);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'IndoorPlant.in <orders@indoorplant.in>',
      to: email,
      subject: `Order Confirmation #${orderId} 🌿`,
      react: OrderPlacedTemplate({ 
        userFirstname: name.split(' ')[0],
        orderId,
        orderTotal,
        items
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending order confirmation:', error);
      await logNotification(userId, 'EMAIL', `Order Confirmation #${orderId}`, 'FAILED');
      return { success: false, error };
    }

    await logNotification(userId, 'EMAIL', `Order Confirmation #${orderId}`, 'SENT');
    return { success: true, data };
  } catch (error) {
    console.error('Exception sending order confirmation:', error);
    await logNotification(userId, 'EMAIL', `Order Confirmation #${orderId}`, 'FAILED');
    return { success: false, error };
  }
}

/**
 * Push Notification Placeholder
 * In a real app, this would use Firebase Admin SDK to send to the FCM token
 */
export async function sendPushNotification(userId: string, title: string, body: string) {
  const allowPush = await canSend(userId, 'pushEnabled');
  
  if (!allowPush) {
    console.log(`Push disabled for user ${userId}`);
    return;
  }
  
  try {
    const settings = await prisma.notificationSettings.findUnique({
      where: { userId }
    });
    
    if (!settings?.fcmToken) {
      console.log(`No FCM token for user ${userId}`);
      return;
    }
    
    // Simulate FCM send
    console.log(`[FCM PUSH] To: ${settings.fcmToken} | Title: ${title} | Body: ${body}`);
    await logNotification(userId, 'PUSH', title, 'SENT');
    return { success: true };
    
  } catch (error) {
    console.error('Exception sending push notification:', error);
    await logNotification(userId, 'PUSH', title, 'FAILED');
    return { success: false, error };
  }
}
