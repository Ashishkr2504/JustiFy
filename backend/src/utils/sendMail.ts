import nodemailer from 'nodemailer';

interface MailOptions {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendMail = async ({ name, email, subject, message }: MailOptions) => {
//   console.log('Sending email...'); // Log the email sending process
// console.log(`From: ${email}`); // Log the sender's email
//   console.log(`To: ${process.env.ADMIN_EMAIL}`); // Log the recipient's email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,  // Keep this as your actual Gmail
    to: process.env.ADMIN_EMAIL,
    subject: `JustiFy Contact: ${subject}`,
    replyTo: email, // <-- This allows you to reply directly to the sender
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };
  

  await transporter.sendMail(mailOptions);
};
