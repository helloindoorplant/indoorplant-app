import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { sendPaymentConfirmationEmail } from './src/lib/email';

async function test() {
  console.log("Sending Payment Confirmation Email...");
  
  const to = 'helloindoorplant@gmail.com';
  const result = await sendPaymentConfirmationEmail(
    to,
    'Suman',
    'ORD-778942',
    1298,
    [
      { name: 'Monstera Deliciosa', quantity: 1, price: 899 },
      { name: 'Ceramic Pot (White)', quantity: 1, price: 300 },
      { name: 'Plant Food (100ml)', quantity: 1, price: 99 }
    ]
  );
  
  console.log("Result:", result);
}

test();
