import { Resend } from 'resend';
import { WelcomeTemplate } from '@/emails/WelcomeTemplate';
import { OtpEmailTemplate } from '@/emails/OtpEmailTemplate';
import { OrderPlacedTemplate } from '@/emails/OrderPlacedTemplate';
import { OrderStatusTemplate } from '@/emails/OrderStatusTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'IndoorPlant.in <support@indoorplant.in>';
const REPLY_TO_EMAIL = 'support@indoorplant.in';

export const sendWelcomeEmail = async (to: string, userFirstname: string) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: 'Welcome to IndoorPlant.in! 🌱',
    react: WelcomeTemplate({ userFirstname }),
  });

  if (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const sendOtpEmail = async (to: string, otpCode: string) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: 'Your IndoorPlant.in Security Code',
    react: OtpEmailTemplate({ otpCode }),
  });

  if (error) {
    console.error('Failed to send OTP email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const sendOrderConfirmationEmail = async (
  to: string,
  userFirstname: string,
  orderId: string,
  orderTotal: number,
  items: { name: string; quantity: number; price: number }[]
) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: `Order Confirmation #${orderId} - IndoorPlant.in`,
    react: OrderPlacedTemplate({ userFirstname, orderId, orderTotal, items }),
  });

  if (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const sendOrderStatusUpdateEmail = async (
  to: string,
  userFirstname: string,
  orderId: string,
  status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered',
  trackingLink?: string,
  expectedDeliveryDate?: string
) => {
  const subjects = {
    processing: `We're preparing your order #${orderId}`,
    shipped: `Your order #${orderId} has shipped! 🚚`,
    out_for_delivery: `Your order #${orderId} is out for delivery today! 📦`,
    delivered: `Your order #${orderId} has been delivered! 🪴`,
  };

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: subjects[status],
    react: OrderStatusTemplate({
      userFirstname,
      orderId,
      status,
      trackingLink,
      expectedDeliveryDate,
    }),
  });

  if (error) {
    console.error('Failed to send order status update email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};
