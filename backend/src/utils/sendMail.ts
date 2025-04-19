import nodemailer from 'nodemailer';

interface MailOptions {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendMail = async ({ name, email, subject, message }: MailOptions) => {
  console.log('Sending email...'); // Log the email sending process

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
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
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
