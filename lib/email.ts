import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingConfirmation(booking: {
  name: string;
  email: string;
  plan: string;
  projectType: string;
}) {
  const planNames: Record<string, string> = {
    lite: 'Lite Plan',
    pro: 'Pro Plan',
    promax: 'Pro Max Plan',
  };

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.email,
    subject: `Booking Confirmed — Luxe Interiors`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F2; padding: 40px;">
        <h1 style="font-size: 28px; font-weight: 300; color: #1A1A17; margin-bottom: 8px;">
          Thank you, ${booking.name.split(' ')[0]}.
        </h1>
        <p style="font-size: 13px; color: #9C8878; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 32px;">
          Your consultation request has been received
        </p>
        <p style="font-size: 15px; color: #3D3D37; line-height: 1.7; margin-bottom: 24px;">
          We've received your booking request for the <strong>${planNames[booking.plan] || booking.plan}</strong> 
          covering your <strong>${booking.projectType}</strong> project. 
          Our studio will reach out within 24 business hours to schedule your consultation.
        </p>
        <div style="border-top: 1px solid #EDE5D2; border-bottom: 1px solid #EDE5D2; padding: 24px 0; margin: 32px 0;">
          <p style="font-size: 11px; color: #9C8878; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">Studio Contact</p>
          <p style="font-size: 14px; color: #3D3D37; margin: 0;">hello@luxeinteriors.com · +91 99990 00111</p>
        </div>
        <p style="font-size: 13px; color: #9C8878;">Luxe Interiors · New Delhi</p>
      </div>
    `,
  });
}

export async function sendContactNotification(inquiry: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${inquiry.subject || 'Enquiry'} — ${inquiry.name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F2; padding: 40px;">
        <h2 style="font-size: 24px; font-weight: 300; color: #1A1A17;">New Contact Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr><td style="padding: 8px 0; color: #9C8878; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">From</td><td style="padding: 8px 0; color: #3D3D37;">${inquiry.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #9C8878; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Email</td><td style="padding: 8px 0; color: #3D3D37;">${inquiry.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #9C8878; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Subject</td><td style="padding: 8px 0; color: #3D3D37;">${inquiry.subject || '—'}</td></tr>
        </table>
        <div style="background: #EDE5D2; padding: 20px; border-left: 3px solid #C49A3C;">
          <p style="font-size: 14px; color: #3D3D37; line-height: 1.7; margin: 0;">${inquiry.message}</p>
        </div>
      </div>
    `,
  });
}
