import nodemailer from 'nodemailer';

interface MailOptions {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export const sendMail = async ({ name, email, subject, description }: MailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    subject: `JustiFy Contact: ${subject}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${description}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
