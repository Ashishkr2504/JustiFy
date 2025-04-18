import { Request, Response } from 'express';
import { handleChatQuery } from '../services/chatbot.service';

export const askChatbot = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const rawAnswer = await handleChatQuery(query, req.user?.id || 'anonymous');

    // Output already contains line breaks and tabs — just return it as-is
    res.status(200).json({ answer: rawAnswer.trim() });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Chatbot error occurred' });
  }
};
