// utils/sendMail.ts
import nodemailer from 'nodemailer';

// ✅ Define a clear custom type
type SendMailParams = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const sendMail = async ({
  name,
  email,
  subject,
  message,
}: SendMailParams) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    subject: `JustiFy Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  await transporter.sendMail(mailOptions);
};
