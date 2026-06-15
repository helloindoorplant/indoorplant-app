import { Resend } from 'resend';
import { ContactUserAutoReply } from '@/emails/ContactUserAutoReply';
import { ContactAdminNotification } from '@/emails/ContactAdminNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, subject, orderId, message } = data;

    if (!email || !email.includes('@') || !message) {
      return new Response(JSON.stringify({ error: "Email and message are required" }), { status: 400 });
    }

    // 1. Find or create the "Contact Us" audience
    let audienceId = null;
    const { data: audiences, error: listError } = await resend.audiences.list();
    
    if (listError) {
      console.error("Failed to list audiences:", listError);
    } else {
      const existingAudience = audiences?.data?.find(a => a.name === 'Contact Us');
      if (existingAudience) {
        audienceId = existingAudience.id;
      } else {
        const { data: newAudience, error: createError } = await resend.audiences.create({
          name: 'Contact Us',
        });
        if (createError) {
          console.error("Failed to create Contact Us audience:", createError);
        } else if (newAudience) {
          audienceId = newAudience.id;
        }
      }
    }

    // 2. Add contact to the audience
    if (audienceId) {
      const { error: contactError } = await resend.contacts.create({
        email,
        firstName,
        lastName,
        unsubscribed: false,
        audienceId,
      });

      if (contactError) {
        console.error("Failed to add contact to audience:", contactError);
      }
    }

    // 3. Send Admin Notification Email
    const { error: adminEmailError } = await resend.emails.send({
      from: 'IndoorPlant.in <support@indoorplant.in>',
      to: 'helloindoorplant@gmail.com',
      subject: `New Contact Request: ${subject}`,
      react: ContactAdminNotification({
        firstName,
        lastName,
        email,
        phone,
        subject,
        orderId,
        message,
      }),
    });

    if (adminEmailError) {
      console.error("Failed to send admin notification:", adminEmailError);
    }

    // 4. Send User Auto-Reply Email
    const { data: emailData, error: userEmailError } = await resend.emails.send({
      from: 'IndoorPlant.in <support@indoorplant.in>',
      to: email,
      subject: 'We have received your message 🌱',
      react: ContactUserAutoReply({
        firstName: firstName || 'Plant Lover',
      }),
    });

    if (userEmailError) {
      console.error("Failed to send user auto-reply:", userEmailError);
      return new Response(JSON.stringify({ error: "Failed to send auto-reply email." }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data: emailData }), { status: 200 });

  } catch (error: any) {
    console.error("Contact API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to process contact submission" }), { status: 500 });
  }
}
