"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendResetMail = async ({ name, email, subject, message }) => {
    //   console.log('Sending email...'); // Log the email sending process
    // console.log(`From: ${email}`); // Log the sender's email
    //   console.log(`To: ${process.env.ADMIN_EMAIL}`); // Log the recipient's email
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        replyTo: email,
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
exports.sendResetMail = sendResetMail;
