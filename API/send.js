// api/send.js (Node.js environment)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      const data = await resend.emails.send({
        from: 'Halogen Web <onboarding@resend.dev>', // Update this after verifying your domain
        to: ['halogentechnologyindia@gmail.com'],
        subject: `New Inquiry from ${name}`,
        html: `
          <h3>New Website Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}