import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { message, errorDetails } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'IndoorPlant.in <support@indoorplant.in>',
      to: 'helloindoorplant@gmail.com',
      subject: '🚨 New Chatbot Bug Report',
      html: `
        <h2>New Bug Report from AI Advisor</h2>
        <p><strong>User Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ff4444; margin-bottom: 20px;">
          ${message || 'No message provided.'}
        </blockquote>
        <p><strong>Technical Error Details:</strong></p>
        <pre style="background: #111; color: #fff; padding: 10px; border-radius: 4px; font-size: 12px; white-space: pre-wrap; overflow-x: auto;">
${errorDetails || 'No technical error logged.'}
        </pre>
        <hr style="margin-top: 30px;" />
        <p style="font-size: 12px; color: #666;">This is an automated message from the IndoorPlant.in AI Advisor Bug Reporter.</p>
      `,
    });

    if (error) {
      console.error("Bug report email failed:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error: any) {
    console.error("Bug report route failed:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to send bug report" }), { status: 500 });
  }
}
