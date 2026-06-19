import { Resend } from 'resend';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const { data: audiences } = await resend.audiences.list();
  console.log("Audiences:", JSON.stringify(audiences, null, 2));
  const audience = audiences?.data?.find((a: any) => a.name === 'Newsletter Indoor Plants');
  if (!audience) return console.log("Audience not found");

  console.log("Audience ID:", audience.id);

  const result = await resend.contacts.create({
    email: 'contactsuman8@gmail.com',
    audienceId: audience.id,
    unsubscribed: false,
  });

  console.log("Create contact result:", JSON.stringify(result, null, 2));
}
main();
