import { Request, Response } from 'express';
import { sendMail } from '../utils/sendMail';

export const contactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, description } = req.body;

    if (!name || !email || !subject || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await sendMail({ name, email, subject, description });
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
