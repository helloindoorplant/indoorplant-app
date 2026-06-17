import { Resend } from 'resend';
import { WelcomeTemplate } from '@/emails/WelcomeTemplate';
import { OtpEmailTemplate } from '@/emails/OtpEmailTemplate';
import { OrderPlacedTemplate } from '@/emails/OrderPlacedTemplate';
import { OrderStatusTemplate } from '@/emails/OrderStatusTemplate';
import { PaymentConfirmationEmail } from '@/emails/PaymentConfirmationEmail';
import { CreatorWelcomeTemplate } from '@/emails/CreatorWelcomeTemplate';
import { CreatorApprovedTemplate } from '@/emails/CreatorApprovedTemplate';
import { CreatorRejectedTemplate } from '@/emails/CreatorRejectedTemplate';
import { CreatorPendingTemplate } from '@/emails/CreatorPendingTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'IndoorPlant.in <support@indoorplant.in>';
const REPLY_TO_EMAIL = 'support@indoorplant.in';
const ADMIN_EMAIL = 'helloindoorplant@gmail.com';

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

export const sendPaymentConfirmationEmail = async (
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
    subject: `Payment Successful - Order #${orderId}`,
    react: PaymentConfirmationEmail({ userFirstname, orderId, orderTotal, items }),
  });

  if (error) {
    console.error('Failed to send payment confirmation email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

// ---------------------------------------------------------
// Creator Program Emails
// ---------------------------------------------------------

export const sendCreatorWelcomeEmail = async (
  to: string,
  creatorName: string,
  plantName: string
) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: `We got your application, ${creatorName}! 🌿`,
    react: CreatorWelcomeTemplate({ creatorName, plantName }),
  });

  if (error) {
    console.error('Failed to send creator welcome email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const sendAdminCreatorNotification = async (
  creatorName: string,
  instagram: string,
  plantName: string,
  email: string,
  phone: string,
  facebook?: string
) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `🆕 New Creator Application: ${creatorName} (@${instagram.replace('@', '')})`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #1B4332; margin-bottom: 24px;">New Creator Application</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name</td><td style="padding: 8px 0; font-weight: bold; color: #111;">${creatorName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Instagram</td><td style="padding: 8px 0; font-weight: bold; color: #111;">@${instagram.replace('@', '')}</td></tr>
          ${facebook ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Facebook ID</td><td style="padding: 8px 0; font-weight: bold; color: #111;">fb.com/${facebook}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Plant Requested</td><td style="padding: 8px 0; font-weight: bold; color: #111;">${plantName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #111;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #111;">${phone}</td></tr>
        </table>
        <div style="margin-top: 28px;">
          <a href="https://indoorplant.in/admin/creators" style="background: #1B4332; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Review in Admin Panel →
          </a>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send admin creator notification:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const sendCreatorApprovalEmail = async (
  to: string,
  creatorName: string,
  plantName: string,
  couponCode: string
) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: `You're approved! Your free ${plantName} is waiting 🎉`,
    react: CreatorApprovedTemplate({ creatorName, plantName, couponCode }),
  });

  if (error) {
    console.error('Failed to send creator approval email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const sendCreatorRejectionEmail = async (
  to: string,
  creatorName: string,
  plantName: string
) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: `Update on your Creator Program application 🌿`,
    react: CreatorRejectedTemplate({ creatorName, plantName }),
  });

  if (error) {
    console.error('Failed to send creator rejection email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const sendCreatorPendingEmail = async (
  to: string,
  creatorName: string,
  plantName: string
) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO_EMAIL,
    subject: `Update: Your Creator Program application status is pending ⏳`,
    react: CreatorPendingTemplate({ creatorName, plantName }),
  });

  if (error) {
    console.error('Failed to send creator pending email:', error);
    return { success: false, error };
  }

  return { success: true, data };
};
