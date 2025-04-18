import { Request, Response } from 'express';
import { sendMail } from '../utils/sendMail'; // ✅ correct import

export const sendContactMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // @ts-ignore
    await sendMail({ name, email, subject: "Contact Form", message }); // ✅ pass subject
    res.status(200).json({ message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};
