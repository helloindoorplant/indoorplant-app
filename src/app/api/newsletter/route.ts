import { Resend } from 'resend';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: "A valid email is required" }), { status: 400 });
    }

    // 1. Find or create the audience named "Registered Users"
    let audienceId = null;
    const { data: audiences, error: listError } = await resend.audiences.list();
    
    if (listError) {
      console.error("Failed to list audiences:", listError);
    } else {
      const existingAudience = audiences?.data?.find(a => a.name === 'Registered Users');
      if (existingAudience) {
        audienceId = existingAudience.id;
      } else {
        const { data: newAudience, error: createError } = await resend.audiences.create({
          name: 'Registered Users',
        });
        if (createError) {
          console.error("Failed to create audience:", createError);
        } else if (newAudience) {
          audienceId = newAudience.id;
        }
      }
    }

    // 2. Add contact to the audience (if we successfully got an audienceId)
    if (audienceId) {
      const { error: contactError } = await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId,
      });

      if (contactError) {
        // We log the error, but we can still send the welcome email even if this fails 
        // (e.g. if they are already subscribed, it might return an error)
        console.error("Failed to add contact to audience:", contactError);
      }
    }

    // 3. Send the Welcome Email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'IndoorPlant.in <support@indoorplant.in>',
      to: email,
      subject: 'Welcome to IndoorPlant.in! 🌱',
      react: NewsletterTemplate(),
    });

    if (emailError) {
      console.error("Failed to send newsletter welcome email:", emailError);
      return new Response(JSON.stringify({ error: "Failed to send welcome email." }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data: emailData }), { status: 200 });

  } catch (error: any) {
    console.error("Newsletter API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to process newsletter subscription" }), { status: 500 });
  }
}
