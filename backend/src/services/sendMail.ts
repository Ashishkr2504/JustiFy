import nodemailer from 'nodemailer';

export const sendMail = async ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;  
  message: string;
}) => {
  console.log('Email User:', process.env.ADMIN_EMAIL);
  console.log('Email Pass:', process.env.ADMIN_PASSWORD);

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
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  await transporter.sendMail(mailOptions);
};
