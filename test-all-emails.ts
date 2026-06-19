import { Resend } from 'resend';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { WelcomeTemplate } from './src/emails/WelcomeTemplate';
import { OtpEmailTemplate } from './src/emails/OtpEmailTemplate';
import { OrderPlacedTemplate } from './src/emails/OrderPlacedTemplate';
import { OrderStatusTemplate } from './src/emails/OrderStatusTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);
const to = 'helloindoorplant@gmail.com';
const from = 'IndoorPlant.in <support@indoorplant.in>';

async function testAll() {
  console.log("Sending Welcome Email...");
  await resend.emails.send({
    from,
    to,
    subject: '[Test 1/4] Welcome to IndoorPlant.in! 🌱',
    react: WelcomeTemplate({ userFirstname: 'Suman' }),
  });

  console.log("Sending OTP Email...");
  await resend.emails.send({
    from,
    to,
    subject: '[Test 2/4] Your Security Code',
    react: OtpEmailTemplate({ otpCode: '123456' }),
  });

  console.log("Sending Order Placed Email...");
  await resend.emails.send({
    from,
    to,
    subject: '[Test 3/4] Order Confirmation #ORD-TEST',
    react: OrderPlacedTemplate({
      userFirstname: 'Suman',
      orderId: 'ORD-TEST',
      orderTotal: 1498,
      items: [
        { name: "Monstera Deliciosa", quantity: 1, price: 999 },
        { name: "Snake Plant", quantity: 1, price: 499 }
      ]
    }),
  });

  console.log("Sending Order Status Email...");
  await resend.emails.send({
    from,
    to,
    subject: '[Test 4/4] Your order is Out for Delivery! 📦',
    react: OrderStatusTemplate({
      userFirstname: 'Suman',
      orderId: 'ORD-TEST',
      status: 'out_for_delivery',
      expectedDeliveryDate: 'Today'
    }),
  });

  console.log("All 4 test emails have been sent successfully!");
}

testAll();
